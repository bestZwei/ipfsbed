// JavaScript for the share.html page

// Function to update page language elements specific to share page
function updateSharePageLanguage() {
    document.getElementById('htmlLang').setAttribute('lang', window.currentLang || 'en');
    document.getElementById('shareHeaderTitle').textContent = 'IPFSBED';
    document.getElementById('loadingText').textContent = _t('accessing-file');
    document.getElementById('passphrase').placeholder = _t('passphrase-placeholder');
    document.getElementById('unlockButton').textContent = _t('passphrase-submit');
    document.getElementById('shareGatewaySelectLabel').textContent = _t('gateway-selector');
    document.getElementById('downloadButtonText').textContent = _t('download-button');
    document.getElementById('returnHomeText').textContent = _t('return-home');
    
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

// Function to process the share link and display file details
function processShare() {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('loadingIndicator').style.display = 'flex';
    
    if (urlParams.has('share')) {
        // Encrypted share (legacy format)
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
            if (decrypted && decrypted.c && decrypted.f) {
                document.getElementById('errorMessage').textContent = '';
                document.getElementById('passphraseForm').style.display = 'none';
                displayFileDetails(decrypted);
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
            const fileData = JSON.parse(decodedJson);
            
            if (fileData.c && fileData.f) {
                displayFileDetails(fileData);
            } else {
                showError(_t('invalid-share-link'));
            }
        } catch (e) {
            showError(_t('decryption-failed'));
            console.error(e);
        }
    } else {
        showError(_t('invalid-share-link'));
    }
}

// Display error message when share is invalid
function showError(message) {
    document.getElementById('loadingIndicator').style.display = 'none';
    document.getElementById('passphraseForm').style.display = 'none';
    
    const fileDetails = document.getElementById('fileDetails');
    fileDetails.innerHTML = `
        <div style="text-align:center; padding: 30px;">
            <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #f56c6c; margin-bottom: 15px;"></i>
            <h3 style="font-size: 18px; margin-bottom: 10px;">${message}</h3>
            <p style="font-size: 14px; line-height: 1.6;">The share link is invalid or corrupted.</p>
        </div>
    `;
    fileDetails.style.display = 'block';
}

// Display the file details in the UI
function displayFileDetails(fileData) {
    document.getElementById('loadingIndicator').style.display = 'none';
    
    const fileName = fileData.f;
    const cid = fileData.c;
    const fileSize = fileData.s || 0;
    
    // Check if this is a folder
    const isFolder = fileName.endsWith('/');
    const displayName = isFolder ? fileName.slice(0, -1) : fileName;
    
    // Set file icon
    document.getElementById('fileIcon').innerHTML = getFileTypeIcon(fileName);
    document.getElementById('fileName').textContent = displayName;
    document.getElementById('fileSize').textContent = formatBytes(fileSize);
    
    // Populate gateway selector
    const gatewaySelect = document.getElementById('shareGatewaySelect');
    gatewaySelect.innerHTML = '';
    commonGateways.forEach(gw => {
        const option = document.createElement('option');
        option.value = gw.value;
        option.textContent = gw.text;
        gatewaySelect.appendChild(option);
    });
    
    // Set default gateway
    gatewaySelect.value = commonGateways[1].value; // cdn.ipfsscan.io as default
    
    // Update file URL when gateway changes
    gatewaySelect.addEventListener('change', updateFileUrl);
    
    // Initial URL update
    updateFileUrl();
    
    // Set up download button
    const downloadButton = document.getElementById('downloadButton');
    if (isFolder) {
        downloadButton.innerHTML = '<i class="fas fa-folder-open" style="margin-right: 8px;"></i>' + (_t('browse-folder') || 'Browse Folder');
        downloadButton.onclick = function() {
            window.open(getFileUrl(), '_blank');
        };
    } else {
        downloadButton.innerHTML = '<i class="fas fa-download" style="margin-right: 8px;"></i>' + _t('download-button');
        downloadButton.onclick = function() {
            downloadFile();
        };
    }
    
    document.getElementById('fileDetails').style.display = 'block';
}

// Get file URL based on selected gateway
function getFileUrl() {
    const gateway = document.getElementById('shareGatewaySelect').value;
    const cid = window.currentFileData.c;
    const filename = window.currentFileData.f;
    const encodedFilename = encodeURIComponent(filename);
    return `${gateway}/ipfs/${cid}?filename=${encodedFilename}`;
}

// Update the displayed file URL
function updateFileUrl() {
    const fileUrl = getFileUrl();
    const urlInput = document.getElementById('fileUrlDisplay');
    urlInput.value = fileUrl;
    urlInput.title = _t('click-to-copy');
    
    // Make URL input clickable to copy
    urlInput.onclick = function() {
        copyToClipboard(fileUrl)
            .then(() => showToast(_t('copied-format', {format: _t('copy-link')}), 'success'))
            .catch(() => showToast(_t('copy-failed'), 'error'));
    };
}

// Download the file
async function downloadFile() {
    const fileUrl = getFileUrl();
    
    try {
        showToast(_t('download-started'), 'success');
        
        // Create a temporary link and click it
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = window.currentFileData.f;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Download error:', error);
        showToast(_t('download-error'), 'error');
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

// Store current file data globally for access by other functions
window.currentFileData = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    if (window.initializeLanguage) {
        window.currentLang = window.initializeLanguage();
    }
    updateSharePageLanguage();
    processShare();
});
