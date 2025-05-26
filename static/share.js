// JavaScript for the share.html page

let currentCid = null;
let currentFilename = null;
let currentFilesize = null;
let downloadAbortController = null; // Add abort controller for downloads

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
        // For folders, change the download button to browse folder only
        downloadButton.innerHTML = `<i class="fas fa-folder-open" style="margin-right: 8px;"></i><span>${_t('browse-folder') || '浏览文件夹'}</span>`;
        downloadButton.onclick = function(e) {
            e.preventDefault();
            window.open(fileUrl, '_blank');
            showToast(_t('folder-opened'), 'success');
        };
        downloadButton.removeAttribute('download');
        
        // Remove any existing ZIP download button
        const zipButton = document.getElementById('zipDownloadButton');
        if (zipButton) {
            zipButton.remove();
        }
    } else {
        // For files, keep original download behavior
        downloadButton.innerHTML = `<i class="fas fa-download" style="margin-right: 8px;"></i><span>${_t('download-button')}</span>`;
        downloadButton.onclick = function(e) {
            e.preventDefault();
            forceDownloadFile(fileUrl, currentFilename, this);
        };
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
        
        // Create new abort controller for this download
        downloadAbortController = new AbortController();
        
        // 显示loading with cancel button
        document.getElementById('loadingIndicator').style.display = 'flex';
        document.getElementById('cancelDownload').style.display = 'block';

        const response = await fetch(url, {
            signal: downloadAbortController.signal
        });
        
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
        if (e.name === 'AbortError') {
            showToast(_t('download-cancelled') || 'Download cancelled', 'info');
        } else {
            showToast(_t('download-error'), 'error');
        }
    } finally {
        btn.classList.remove('disabled');
        btn.querySelector('span').textContent = _t('download-button') || 'Download';
        document.getElementById('loadingIndicator').style.display = 'none';
        document.getElementById('cancelDownload').style.display = 'none';
        downloadAbortController = null;
    }
}

// Add function to cancel download
function cancelDownload() {
    if (downloadAbortController) {
        downloadAbortController.abort();
        downloadAbortController = null;
    }
}

// Check if the current file is a directory
function isDirectory(filename) {
    return filename.endsWith('/');
}

// Function to get appropriate icon based on file type
function getFileTypeIcon(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
    const docTypes = ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx', 'odf', 'ods', 'odt'];
    const videoTypes = ['mp4', 'webm', 'ogv', 'mkv', 'avi', 'mov', 'wmv', 'flv'];
    const audioTypes = ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'wma', 'flac'];
    const archiveTypes = ['zip', 'rar', '7z', 'tar', 'gz'];
    
    let iconPath;
    
    if (imageTypes.includes(extension)) {
        iconPath = '<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" fill="#909399"/></svg>';
    } else if (docTypes.includes(extension)) {
        iconPath = '<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" fill="#909399"/></svg>';
    } else if (videoTypes.includes(extension)) {
        iconPath = '<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V4H18M13,16V10H21V16H13Z" fill="#909399"/></svg>';
    } else if (audioTypes.includes(extension)) {
        iconPath = '<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" fill="#909399"/></svg>';
    } else if (archiveTypes.includes(extension)) {
        iconPath = '<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8A2,2 0 0,0 20,6M15,16H6V14H15V16M18,12H6V10H18V12Z" fill="#909399"/></svg>';
    } else {
        iconPath = '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M961.536 531.251c-0.614-3.481-1.843-7.168-3.891-10.445L827.392 306.79v-28.876c0-10.445 0-20.276 0.205-29.901 0.819-89.703 1.433-174.285-101.376-179.2H303.923c-33.587 0-58.368 8.601-76.185 26.624-30.72 30.925-30.31 79.257-29.696 140.288 0 8.601 0.204 17.408 0.204 26.419v38.093c-2.867 2.253-5.324 4.915-7.168 8.192L64.717 523.879c-1.639 2.867-2.663 5.734-3.277 8.806-6.144 12.288-9.626 26.01-9.626 40.345v290.407c0 50.585 41.984 91.75 93.594 91.75h733.184c51.61 0 93.594-41.165 93.594-91.75V573.03c-0.205-14.95-4.096-29.286-10.65-41.779zM861.389 481.28h-33.997v-55.91l33.997 55.91zM271.565 138.65c5.53-5.53 16.384-8.397 32.358-8.397h420.045c36.25 1.843 42.803 11.264 41.78 117.145 0 9.83-0.206 19.866-0.206 30.516V481.28H664.576c-16.998 0-30.925 13.722-30.925 30.925 0 64.307-54.681 116.736-122.06 116.736S389.53 576.512 389.53 512.205c0-16.999-13.722-30.925-30.925-30.925H259.89V262.144c0-9.42 0-18.432-0.205-27.034-0.41-43.008-0.819-83.558 11.879-96.46z m-73.523 279.552v63.078h-36.864l36.864-63.078z m712.294 445.44c0 16.179-14.54 30.105-31.949 30.105H145.203c-17.203 0-31.949-13.721-31.949-30.105V573.03c0-16.179 14.541-30.105 31.95-30.105h185.548c15.155 83.763 90.522 147.456 181.043 147.456s165.888-63.898 181.043-147.456h185.55c17.202 0 31.948 13.721 31.948 30.105v290.612z" fill="#909399"></path><path d="M385.638 278.528H655.77c16.998 0 30.924-13.722 30.924-30.925s-13.721-30.925-30.924-30.925H385.638c-16.998 0-30.924 13.722-30.924 30.925s13.926 30.925 30.924 30.925z m-30.924 70.451c0 16.999 13.721 30.925 30.924 30.925H655.77c16.998 0 30.924-13.722 30.924-30.925 0-17.203-13.721-30.925-30.924-30.925H385.638c-16.998 0-30.924 13.927-30.924 30.925z" fill="#909399"></path></svg>';
    }
    
    return iconPath;
}

// Handle directory browsing - simplified to browse only
function handleDirectoryBrowsing(cid, dirname, gatewayUrl) {
    // Create browse button for directories
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
    
    // Add cancel download button event listener
    document.getElementById('cancelDownload').addEventListener('click', cancelDownload);
});
