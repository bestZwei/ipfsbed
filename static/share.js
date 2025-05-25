// JavaScript for the share.html page

let currentCid = null;
let currentFilename = null;
let currentFilesize = null;

// Base64URL encoding/decoding functions for URL compression
function base64UrlEncode(str) {
    return btoa(unescape(encodeURIComponent(str)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function base64UrlDecode(str) {
    // Add padding
    str += '='.repeat((4 - str.length % 4) % 4);
    // Replace URL-safe characters
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(escape(atob(str)));
}

// Update page language elements specific to share page
function updateSharePageLanguage() {
    // Set html lang
    document.getElementById('htmlLang').setAttribute('lang', window.currentLang || 'en');
    // loading
    document.getElementById('loadingText').textContent = _t('accessing-file');
    // passphrase
    const passInput = document.getElementById('passphrase');
    if (passInput) passInput.placeholder = _t('passphrase-placeholder');
    document.getElementById('unlockButton').textContent = _t('passphrase-submit');
    document.getElementById('downloadButtonText').textContent = _t('download-button') || 'Download';
    document.getElementById('returnHomeText').textContent = _t('return-home');
    // Gateway selector label
    document.getElementById('shareGatewaySelectLabel').innerHTML = _t('gateway-selector');
    // fileUrlDisplay title
    document.getElementById('fileUrlDisplay').title = _t('copy-share-link');
    
    // Set password toggle button title
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordToggle) {
        passwordToggle.title = _t('show-password');
    }
    
    // Update sponsor text elements
    document.querySelectorAll('.sponsors-section [data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = _t(key);
    });
}

// Check URL parameters and determine if it's an encrypted share or direct CID
function processShareUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Show loading indicator
    document.getElementById('loadingIndicator').style.display = 'flex';
    
    if (urlParams.has('share')) {
        // Encrypted share
        const encryptedPayload = urlParams.get('share');
        document.getElementById('passphraseForm').style.display = 'block';
        
        // Handle unlock button click
        document.getElementById('unlockButton').addEventListener('click', function() {
            const passphrase = document.getElementById('passphrase').value;
            if (!passphrase) {
                document.getElementById('errorMessage').textContent = _t('passphrase-placeholder');
                return;
            }
            
            const decrypted = decryptData(encryptedPayload, passphrase);
            if (decrypted && decrypted.cid && decrypted.filename) {
                // Successfully decrypted
                document.getElementById('errorMessage').textContent = '';
                displayFileDetails(decrypted.cid, decrypted.filename, decrypted.size);
            } else {
                document.getElementById('errorMessage').textContent = _t('passphrase-incorrect');
                document.getElementById('passphrase').value = '';
            }
        });
        
        // Allow entering passphrase with Enter key
        document.getElementById('passphrase').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('unlockButton').click();
            }
        });
        
        document.getElementById('loadingIndicator').style.display = 'none';
        
    } else if (urlParams.has('d')) {
        // New compressed format: ?d=base64url_encoded_data
        try {
            const compressedData = urlParams.get('d');
            const decodedJson = base64UrlDecode(compressedData);
            const data = JSON.parse(decodedJson);
            
            if (data.c && data.f) { // cid and filename
                displayFileDetails(data.c, data.f, data.s || 0);
            } else {
                throw new Error('Invalid compressed data format');
            }
        } catch (e) {
            console.error('Failed to decode compressed share link:', e);
            // Fall back to error display
            document.getElementById('loadingIndicator').style.display = 'none';
            document.getElementById('passphraseForm').style.display = 'none';
            document.getElementById('fileDetails').style.display = 'block';
            document.getElementById('fileIcon').innerHTML = '<i class="fas fa-exclamation-circle" style="font-size: 60px; color: #f56c6c;"></i>';
            document.getElementById('fileName').textContent = _t('decryption-failed');
            document.getElementById('fileSize').textContent = _t('selected-files-invalid');
            document.getElementById('downloadButton').style.display = 'none';
        }
        
    } else if (urlParams.has('cid') && urlParams.has('filename')) {
        // Legacy public file format (keep for backward compatibility)
        const cid = urlParams.get('cid');
        const filename = decodeURIComponent(urlParams.get('filename'));
        const filesize = urlParams.get('size') || 0;
        
        // Display file details directly
        displayFileDetails(cid, filename, filesize);
    } else {
        // Invalid URL parameters
        document.getElementById('loadingIndicator').style.display = 'none';
        document.getElementById('passphraseForm').style.display = 'none';
        document.getElementById('fileDetails').style.display = 'block';
        document.getElementById('fileIcon').innerHTML = '<i class="fas fa-exclamation-circle" style="font-size: 60px; color: #f56c6c;"></i>';
        document.getElementById('fileName').textContent = _t('decryption-failed');
        document.getElementById('fileSize').textContent = _t('selected-files-invalid');
        document.getElementById('downloadButton').style.display = 'none';
    }
}

// Display file details and setup download button
function displayFileDetails(cid, filename, filesize) {
    currentCid = cid;
    currentFilename = filename;
    currentFilesize = filesize;

    // Hide passphrase form if it was shown
    document.getElementById('passphraseForm').style.display = 'none';
    document.getElementById('loadingIndicator').style.display = 'none';
    
    // Get icon based on file type or folder
    let fileIcon;
    if (filename.endsWith('/')) {
        fileIcon = '<svg class="icon" viewBox="0 0 24 24" width="48" height="48"><path d="M10 4H2v16h20V6H12l-2-2z" fill="#f7ba2a"/><path d="M2 20V4h8l2 2h10v14z" fill="none"/></svg>';
    } else {
        fileIcon = getFileTypeIcon(filename);
    }
    document.getElementById('fileIcon').innerHTML = fileIcon;
    
    // Set file details (strip trailing slash for display if folder)
    let displayName = filename.endsWith('/') ? filename.slice(0, -1) : filename;
    document.getElementById('fileName').textContent = displayName;
    if (filesize && filesize > 0) {
        document.getElementById('fileSize').textContent = _t('file-size', { size: formatBytes(filesize) });
    } else {
        document.getElementById('fileSize').textContent = '';
    }
    
    // Populate gateway selector
    const gatewaySelect = document.getElementById('shareGatewaySelect');
    gatewaySelect.innerHTML = ''; // Clear existing options
    commonGateways.forEach(gw => {
        const option = document.createElement('option');
        option.value = gw.value;
        option.textContent = gw.text;
        gatewaySelect.appendChild(option);
    });
    // Set default gateway
    if (commonGateways.length > 0) {
        gatewaySelect.value = commonGateways[1].value; // cdn.ipfsscan.io as default
    }
    
    // Update URL display and download button based on selected gateway
    updateFileAccessLinks();
    
    // Add event listener for gateway change
    gatewaySelect.addEventListener('change', updateFileAccessLinks);
    
    // Show file details
    document.getElementById('fileDetails').style.display = 'block';
    
    // Enable copy to clipboard for file URL
    document.getElementById('fileUrlDisplay').addEventListener('click', function() {
        this.select();
        copyToClipboard(this.value)
            .then(() => {
                showToast(_t('copied-format', {format: _t('copy-share-link')}), 'success');
            })
            .catch(() => {
                showToast(_t('clipboard-error'), 'error');
            });
    });
}

// Function to update file URL display and download button link
function updateFileAccessLinks() {
    if (!currentCid || !currentFilename) return;

    const selectedGatewayBase = document.getElementById('shareGatewaySelect').value;
    const encodedFilename = encodeURIComponent(currentFilename);
    const fileUrl = `${selectedGatewayBase}/ipfs/${currentCid}?filename=${encodedFilename}`;
    
    document.getElementById('fileUrlDisplay').value = fileUrl;
    
    // Check if this is a folder (filename ends with /)
    const isFolder = currentFilename && currentFilename.endsWith('/');
    const downloadButton = document.getElementById('downloadButton');
    
    if (isFolder) {
        // For folders, change the download button to browse folder
        downloadButton.innerHTML = `<i class="fas fa-folder-open" style="margin-right: 8px;"></i><span>${_t('browse-folder') || '浏览文件夹'}</span>`;
        downloadButton.onclick = function(e) {
            e.preventDefault();
            // Open folder in new tab for browsing
            window.open(fileUrl, '_blank');
        };
        downloadButton.removeAttribute('download');
        
        // Add ZIP download button for folders
        const fileDetails = document.getElementById('fileDetails');
        let zipButton = document.getElementById('zipDownloadButton');
        
        if (!zipButton) {
            zipButton = document.createElement('button');
            zipButton.id = 'zipDownloadButton';
            zipButton.className = 'download-button';
            zipButton.style.marginTop = '10px';
            zipButton.style.backgroundColor = '#67c23a';
            zipButton.innerHTML = `<i class="fas fa-download" style="margin-right: 8px;"></i><span>${_t('download-as-zip')}</span>`;
            zipButton.onclick = function(e) {
                e.preventDefault();
                downloadDirectoryAsZip(currentCid, currentFilename, selectedGatewayBase);
            };
            
            // Insert after the main download button
            downloadButton.parentNode.insertBefore(zipButton, downloadButton.nextSibling);
        } else {
            // Update existing button text
            zipButton.querySelector('span').textContent = _t('download-as-zip');
        }
    } else {
        // For files, keep original download behavior
        downloadButton.innerHTML = `<i class="fas fa-download" style="margin-right: 8px;"></i><span>${_t('download-button')}</span>`;
        downloadButton.onclick = function(e) {
            e.preventDefault();
            forceDownloadFile(fileUrl, currentFilename, this);
        };
        
        // Remove ZIP button if it exists
        const zipButton = document.getElementById('zipDownloadButton');
        if (zipButton) {
            zipButton.remove();
        }
    }
}

// 强制下载文件的函数
async function forceDownloadFile(url, filename, btn) {
    // Check if this is a folder
    if (filename && filename.endsWith('/')) {
        // For folders, just open in new tab
        window.open(url, '_blank');
        return;
    }
    
    try {
        btn.classList.add('disabled');
        btn.querySelector('span').textContent = _t('download-progress') || 'Downloading...';
        // 显示loading
        document.getElementById('loadingIndicator').style.display = 'flex';

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network error');
        const blob = await response.blob();

        // 创建临时a标签下载
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            URL.revokeObjectURL(a.href);
            document.body.removeChild(a);
        }, 100);

    } catch (e) {
        showToast(_t('download-error'), 'error');
    } finally {
        btn.classList.remove('disabled');
        btn.querySelector('span').textContent = _t('download-button') || 'Download';
        document.getElementById('loadingIndicator').style.display = 'none';
    }
}

// Check if the current file is a directory
function isDirectory(filename) {
    return filename.endsWith('/');
}

// Handle directory browsing
function handleDirectoryBrowsing(cid, dirname, gatewayUrl) {
    // Create browse button instead of download for directories
    const browseUrl = `${gatewayUrl}/ipfs/${cid}`;
    
    // Update download button for directory browsing
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.innerHTML = '<i class="fas fa-folder-open" style="margin-right: 8px;"></i><span>' + _t('browse-folder') + '</span>';
    downloadButton.href = browseUrl;
    downloadButton.target = '_blank';
    downloadButton.onclick = function(e) {
        e.preventDefault();
        window.open(browseUrl, '_blank');
        showToast(_t('folder-opened'), 'success');
    };
    
    // Add download as ZIP option
    const fileDetails = document.getElementById('fileDetails');
    const zipDownloadButton = document.createElement('a');
    zipDownloadButton.className = 'download-button';
    zipDownloadButton.style.marginTop = '10px';
    zipDownloadButton.innerHTML = '<i class="fas fa-download" style="margin-right: 8px;"></i><span>' + _t('download-as-zip') + '</span>';
    zipDownloadButton.onclick = function(e) {
        e.preventDefault();
        downloadDirectoryAsZip(cid, dirname, gatewayUrl);
    };
    
    fileDetails.appendChild(zipDownloadButton);
}

// Download directory as ZIP
async function downloadDirectoryAsZip(cid, dirname, gatewayUrl) {
    try {
        showToast(_t('preparing-download'), 'info');
        document.getElementById('loadingIndicator').style.display = 'flex';
        
        // Get directory listing
        const listUrl = `${gatewayUrl}/ipfs/${cid}?format=json`;
        const response = await fetch(listUrl);
        
        if (!response.ok) {
            throw new Error('Failed to get directory listing');
        }
        
        const listing = await response.json();
        
        if (!Array.isArray(listing.Links) || listing.Links.length === 0) {
            showToast(_t('empty-folder'), 'warning');
            document.getElementById('loadingIndicator').style.display = 'none';
            return;
        }
        
        // Create ZIP file
        const zip = new JSZip();
        let downloadedFiles = 0;
        const totalFiles = listing.Links.length;
        
        for (const link of listing.Links) {
            try {
                const fileUrl = `${gatewayUrl}/ipfs/${link.Hash}`;
                const fileResponse = await fetch(fileUrl);
                
                if (fileResponse.ok) {
                    const blob = await fileResponse.blob();
                    zip.file(link.Name, blob);
                }
                
                downloadedFiles++;
                
                // Update progress
                const progressText = `${_t('download-progress')}: ${downloadedFiles}/${totalFiles}`;
                if (document.getElementById('loadingText')) {
                    document.getElementById('loadingText').textContent = progressText;
                }
                
            } catch (error) {
                console.error(`Failed to download ${link.Name}:`, error);
            }
        }
        
        // Generate and download ZIP
        const cleanDirname = dirname.replace('/', '') || 'ipfs_folder';
        const zipBlob = await zip.generateAsync({type: 'blob'});
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(zipBlob);
        downloadLink.download = cleanDirname + '.zip';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        showToast(_t('download-started'), 'success');
        
    } catch (error) {
        console.error('Error downloading directory:', error);
        showToast(_t('download-error'), 'error');
    } finally {
        document.getElementById('loadingIndicator').style.display = 'none';
    }
}

// Show progress toast
function showProgressToast(message, current, total) {
    const toastId = 'progress-toast-' + Date.now();
    const toast = `
        <div id="${toastId}" class="toast info progress-toast">
            <span class="toast-message">${message}: ${current}/${total}</span>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(current/total)*100}%"></div>
            </div>
        </div>
    `;
    
    $('.toast-container').append(toast);
    return toastId;
}

// Update progress toast
function updateProgressToast(toastId, current, total) {
    const toast = $(`#${toastId}`);
    if (toast.length) {
        toast.find('.toast-message').text(_t('download-progress') + `: ${current}/${total}`);
        toast.find('.progress-fill').css('width', `${(current/total)*100}%`);
    }
}

// Hide progress toast
function hideProgressToast(toastId) {
    $(`#${toastId}`).fadeOut(500, function() {
        $(this).remove();
    });
}

// Modified processFileAccess function
function processFileAccess() {
    // ...existing code...
    
    // After successful file access, check if it's a directory
    if (isDirectory(fileName)) {
        // Handle directory
        handleDirectoryBrowsing(fileCid, fileName, gatewayUrl);
        
        // Update file icon for directory
        document.getElementById('fileIcon').innerHTML = `
            <svg viewBox="0 0 24 24" width="64" height="64">
                <path d="M10 4H2v16h20V6H12l-2-2z" fill="#f7ba2a"/>
            </svg>
        `;
    } else {
        // Handle regular file
        // ...existing download button setup...
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language first to ensure _t is ready
    if (window.initializeLanguage) {
        window.currentLang = window.initializeLanguage();
    }
    updateSharePageLanguage();
    processShareUrl();

    // Add download button event listener
    document.getElementById('downloadButton').addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('data-url');
        const filename = currentFilename;
        if (url && filename) {
            forceDownloadFile(url, filename, this);
        }
    });
});
