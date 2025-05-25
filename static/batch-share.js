// JavaScript for the batch-share.html page

let batchFiles = [];
let downloadCancelled = false;

// Update page language elements specific to batch share page
function updateBatchSharePageLanguage() {
    document.getElementById('htmlLang').setAttribute('lang', window.currentLang || 'en');
    document.getElementById('batchLoadingText').textContent = _t('accessing-file');
    document.getElementById('batchPassphraseTitle').textContent = _t('batch-share-passphrase-title');
    document.getElementById('passphrase').placeholder = _t('batch-share-passphrase-placeholder');
    document.getElementById('unlockButton').title = _t('passphrase-submit');
    document.getElementById('batchUnlockBtnText').textContent = _t('passphrase-submit');
    document.getElementById('batchGatewaySelectLabel').innerHTML = _t('gateway-selector');
    document.getElementById('selectAllBtnText').textContent = _t('select-all');
    document.getElementById('deselectAllBtnText').textContent = _t('deselect-all-btn') || 'Deselect All';
    document.getElementById('downloadAllBtnText').textContent = _t('download-button') || 'Download';
    document.getElementById('copyAllBtnText').textContent = _t('copy-all');
    document.getElementById('batchReturnHomeText').textContent = _t('return-home');
    document.getElementById('downloadDialogTitle').textContent = _t('download-progress') || 'Downloading Files';
    document.getElementById('downloadCancel').textContent = _t('batch-share-cancel');
    
    // Update sponsor text elements
    document.querySelectorAll('.sponsors-section [data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = _t(key);
    });
    
    // Set password toggle button title
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordToggle) {
        passwordToggle.title = _t('show-password');
    }
}

// Function to parse URL parameters and process the batch share
function processBatchShare() {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('loadingIndicator').style.display = 'flex';
    
    if (urlParams.has('share')) {
        // Encrypted share (existing format)
        const encryptedPayload = urlParams.get('share');
        document.getElementById('passphraseForm').style.display = 'block';
        document.getElementById('loadingIndicator').style.display = 'none';
        document.getElementById('unlockButton').addEventListener('click', function() {
            const passphrase = document.getElementById('passphrase').value;
            if (!passphrase) {
                document.getElementById('errorMessage').textContent = _t('passphrase-placeholder');
                return;
            }
            const decrypted = decryptData(encryptedPayload, passphrase);
            if (decrypted && Array.isArray(decrypted)) {
                document.getElementById('errorMessage').textContent = '';
                document.getElementById('passphraseForm').style.display = 'none';
                displayBatchFiles(decrypted);
            } else {
                document.getElementById('errorMessage').textContent = _t('passphrase-incorrect');
                document.getElementById('passphrase').value = '';
            }
        });
        document.getElementById('passphrase').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('unlockButton').click();
            }
        });
    } else if (urlParams.has('d')) {
        // New compressed format
        try {
            const compressedData = urlParams.get('d');
            const decodedJson = base64UrlDecode(compressedData);
            const filesData = JSON.parse(decodedJson);
            if (Array.isArray(filesData) && filesData.length > 0) {
                displayBatchFiles(filesData);
            } else {
                showError(_t('selected-files-invalid'));
            }
        } catch (e) {
            showError(_t('decryption-failed'));
            console.error(e);
        }
    } else if (urlParams.has('files')) {
        // Legacy format (keep for backward compatibility)
        try {
            const filesData = JSON.parse(decodeURIComponent(urlParams.get('files')));
            if (Array.isArray(filesData) && filesData.length > 0) {
                displayBatchFiles(filesData);
            } else {
                showError(_t('selected-files-invalid'));
            }
        } catch (e) {
            showError(_t('decryption-failed'));
            console.error(e);
        }
    } else {
        showError(_t('selected-files-invalid'));
    }
}

// Add Base64URL functions
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

// Display error message when batch share is invalid
function showError(message) {
    document.getElementById('loadingIndicator').style.display = 'none';
    document.getElementById('passphraseForm').style.display = 'none';
    
    const batchFilesContainer = document.getElementById('batchFilesContainer');
    batchFilesContainer.innerHTML = `
        <div style="text-align:center; padding: 30px;">
            <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #f56c6c; margin-bottom: 15px;"></i>
            <h3 style="font-size: 18px; margin-bottom: 10px;">${message}</h3>
            <p style="font-size: 14px; line-height: 1.6;">The batch share link is invalid or corrupted.</p>
        </div>
    `;
    batchFilesContainer.style.display = 'block';
}

// Display the batch files in the UI
function displayBatchFiles(files) {
    batchFiles = files;
    
    // Hide loading indicator
    document.getElementById('loadingIndicator').style.display = 'none';
    
    // Update file count
    document.getElementById('filesCount').textContent = files.length + ' ' + _t('file-list');
    
    // Populate gateway selector
    const gatewaySelect = document.getElementById('batchGatewaySelect');
    gatewaySelect.innerHTML = ''; // Clear existing options
    commonGateways.forEach(gw => {
        const option = document.createElement('option');
        option.value = gw.value;
        option.textContent = gw.text;
        gatewaySelect.appendChild(option);
    });
    
    // Set default gateway
    gatewaySelect.value = commonGateways[1].value; // cdn.ipfsscan.io as default
    
    // Generate file list
    const filesList = document.getElementById('filesList');
    filesList.innerHTML = ''; // Clear existing list
    
    files.forEach((file, index) => {
        const fileIcon = getFileTypeIcon(file.filename);
        const fileSize = file.size ? formatBytes(file.size) : 'Unknown size';

        // Check if this is a folder by checking if filename ends with '/'
        const isFolder = file.filename.endsWith('/');
        // Remove trailing slash for display if folder
        const displayName = isFolder ? file.filename.slice(0, -1) : file.filename;

        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <input type="checkbox" class="file-checkbox" data-index="${index}" ${isFolder ? 'disabled title="' + (_t('folders-cannot-download') || 'Folders cannot be downloaded in batch') + '"' : 'checked'}>
            <div class="file-icon">${fileIcon}</div>
            <div class="file-details">
                <div class="file-name">${displayName}${isFolder ? ' <i class="fas fa-folder" style="margin-left: 5px; color: #f7ba2a;" title="' + (_t('folder-type') || 'Folder') + '"></i>' : ''}</div>
                <div class="file-size">${fileSize}</div>
            </div>
            <div class="file-actions">
                <button class="file-action-btn" onclick="copyFileUrl(${index})" title="${_t('copy-link')}">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="file-action-btn" onclick="${isFolder ? 'browseSingleFolder' : 'downloadSingleFile'}(${index})" title="${isFolder ? (_t('browse-folder') || 'Browse Folder') : (_t('download-button') || 'Download')}">
                    <i class="fas fa-${isFolder ? 'folder-open' : 'download'}"></i>
                </button>
            </div>
        `;
        
        filesList.appendChild(fileItem);
    });
    
    // Set up event listeners for batch actions
    document.getElementById('selectAllBtn').addEventListener('click', selectAllFiles);
    document.getElementById('deselectAllBtn').addEventListener('click', deselectAllFiles);
    document.getElementById('downloadAllBtn').addEventListener('click', downloadSelectedFiles);
    document.getElementById('copyAllBtn').addEventListener('click', copyAllFileUrls);
    
    // Show the files container
    document.getElementById('batchFilesContainer').style.display = 'block';
    
    // Set up download dialog cancel button
    document.getElementById('downloadCancel').addEventListener('click', function() {
        downloadCancelled = true;
        document.getElementById('downloadStatus').textContent = 'Cancelling download...';
    });
}

// Get file URL based on selected gateway
function getFileUrl(file) {
    const gateway = document.getElementById('batchGatewaySelect').value;
    const encodedFilename = encodeURIComponent(file.filename);
    return `${gateway}/ipfs/${file.cid}?filename=${encodedFilename}`;
}

// Copy a single file URL
function copyFileUrl(index) {
    if (index < 0 || index >= batchFiles.length) return;
    
    const fileUrl = getFileUrl(batchFiles[index]);
    copyToClipboard(fileUrl)
        .then(() => {
            showToast(`URL for "${batchFiles[index].filename}" copied to clipboard!`, 'success');
        })
        .catch(err => {
            console.error('Failed to copy URL: ', err);
            showToast('Failed to copy URL', 'error');
        });
}

// Copy all selected file URLs
function copyAllFileUrls() {
    const selectedFiles = getSelectedFiles();
    if (selectedFiles.length === 0) {
        showToast('No files selected!', 'error');
        return;
    }
    
    const urls = selectedFiles.map(file => getFileUrl(file));
    copyToClipboard(urls.join('\n'))
        .then(() => {
            showToast(`URLs for ${selectedFiles.length} files copied to clipboard!`, 'success');
        })
        .catch(err => {
            console.error('Failed to copy URLs: ', err);
            showToast('Failed to copy URLs', 'error');
        });
}

// Select all files
function selectAllFiles() {
    document.querySelectorAll('.file-checkbox').forEach(checkbox => {
        checkbox.checked = true;
    });
}

// Deselect all files
function deselectAllFiles() {
    document.querySelectorAll('.file-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
}

// Get all selected files - exclude folders from batch downloads
function getSelectedFiles() {
    const selected = [];
    document.querySelectorAll('.file-checkbox:checked').forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index);
        if (!isNaN(index) && index >= 0 && index < batchFiles.length) {
            const file = batchFiles[index];
            // Exclude folders (files ending with /) from batch downloads
            if (!file.filename.endsWith('/')) {
                selected.push(file);
            }
        }
    });
    return selected;
}

// Download a single file
async function downloadSingleFile(index) {
    if (index < 0 || index >= batchFiles.length) return;
    
    const file = batchFiles[index];
    
    // Check if this is a folder - if so, redirect to browse instead
    if (file.filename.endsWith('/')) {
        browseSingleFolder(index);
        return;
    }
    
    const fileUrl = getFileUrl(file);
    
    try {
        // Show loading indicator
        document.getElementById('loadingIndicator').style.display = 'flex';
        
        // Fetch the file
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Network error');
        const blob = await response.blob();

        // Create a temporary link and click it to start download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            URL.revokeObjectURL(a.href);
            document.body.removeChild(a);
        }, 100);
        
        showToast(_t('download-started') || 'Download started', 'success');
    } catch (e) {
        console.error('Download error:', e);
        showToast(_t('upload-error') || 'Download failed', 'error');
    } finally {
        // Hide loading indicator
        document.getElementById('loadingIndicator').style.display = 'none';
    }
}

// Add function to browse single folder
function browseSingleFolder(index) {
    if (index < 0 || index >= batchFiles.length) return;
    
    const file = batchFiles[index];
    const fileUrl = getFileUrl(file);
    
    window.open(fileUrl, '_blank');
    showToast(_t('folder-opened') || 'Folder opened in new tab', 'success');
}

// Download all selected files as zip
async function downloadSelectedFiles() {
    const selectedFiles = getSelectedFiles();
    if (selectedFiles.length === 0) {
        showToast(_t('no-files-selected'), 'error');
        return;
    }
    
    // Reset download cancelled flag
    downloadCancelled = false;
    
    // Show download dialog
    const downloadDialog = document.getElementById('downloadDialog');
    const progressBar = document.getElementById('downloadProgressBar');
    const statusText = document.getElementById('downloadStatus');
    downloadDialog.style.display = 'flex';
    progressBar.style.width = '0%';
    statusText.textContent = _t('preparing-download');
    
    // Create a new zip file
    const zip = new JSZip();
    let completedFiles = 0;
    
    // Set up progress tracking
    const updateProgress = () => {
        completedFiles++;
        const percentage = Math.round((completedFiles / selectedFiles.length) * 100);
        progressBar.style.width = `${percentage}%`;
        statusText.textContent = `${_t('download-progress')}: ${completedFiles}/${selectedFiles.length} (${percentage}%)`;
    };
    
    try {
        // Download each file and add to zip - only process files, not folders
        for (let i = 0; i < selectedFiles.length; i++) {
            if (downloadCancelled) {
                throw new Error('Download cancelled by user');
            }
            
            const file = selectedFiles[i];
            
            // Skip folders completely in ZIP creation
            if (file.filename.endsWith('/')) {
                updateProgress();
                continue;
            }
            
            const fileUrl = getFileUrl(file);
            
            statusText.textContent = `${_t('download-progress')}: ${i + 1}/${selectedFiles.length}: ${file.filename}`;
            
            try {
                const response = await fetch(fileUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const blob = await response.blob();
                zip.file(file.filename, blob);
                updateProgress();
                
            } catch (error) {
                console.error(`Error downloading ${file.filename}:`, error);
                // Continue with the next file even if one fails
                updateProgress();
            }
        }
        
        if (downloadCancelled) {
            throw new Error('Download cancelled by user');
        }
        
        // Generate zip file
        statusText.textContent = _t('preparing-download') + '...';
        const zipBlob = await zip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 }
        }, metadata => {
            progressBar.style.width = `${metadata.percent}%`;
            statusText.textContent = `${_t('preparing-download')}: ${Math.round(metadata.percent)}%`;
        });
        
        // Download the zip file
        saveAs(zipBlob, 'ipfsbed_files.zip');
        
        // Hide dialog after successful download
        setTimeout(() => {
            downloadDialog.style.display = 'none';
        }, 1000);
        
    } catch (error) {
        console.error('Error creating zip file:', error);
        
        if (downloadCancelled) {
            statusText.textContent = _t('batch-share-cancel');
        } else {
            statusText.textContent = `${_t('download-error')}: ${error.message || 'Failed to download files'}`;
        }
        
        // Hide dialog after a few seconds on error
        setTimeout(() => {
            downloadDialog.style.display = 'none';
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    if (window.initializeLanguage) {
        window.currentLang = window.initializeLanguage();
    }
    updateBatchSharePageLanguage();
    processBatchShare();
});
