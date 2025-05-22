// Common functions used across the IPFSBED application

// Function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text)
            .then(() => true)
            .catch(err => {
                console.error('Clipboard API failed:', err);
                return fallbackCopyToClipboard(text);
            });
    } else {
        return Promise.resolve(fallbackCopyToClipboard(text));
    }
}

// Fallback clipboard copy for browsers without Clipboard API
function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom
    document.body.appendChild(textarea);
    textarea.select();
    let success = false;
    try {
        success = document.execCommand('copy');
    } catch (err) {
        console.error('Fallback clipboard copy failed:', err);
    }
    document.body.removeChild(textarea);
    return success;
}

// Show toast notification
function showToast(message, type = 'info', duration = 3000) {
    if (!document.querySelector('.toast-container')) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toastId = 'toast-' + Date.now();
    let icon = '';
    
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle" style="margin-right: 8px;"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle" style="margin-right: 8px;"></i>';
            break;
    }
    
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-message">${icon}${message}</span>
        <span class="toast-close">×</span>
    `;
    
    document.querySelector('.toast-container').appendChild(toast);
    
    // Attach close event
    toast.querySelector('.toast-close').addEventListener('click', function() {
        toast.classList.add('hide');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 700);
    });
    
    // Auto remove after duration
    setTimeout(() => {
        if (document.getElementById(toastId)) {
            toast.classList.add('hide');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 700);
        }
    }, duration);
    
    return toastId;
}

// Format bytes to human readable format
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Toggle password visibility for any password input
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.nextElementSibling;
    const icon = toggleButton.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        toggleButton.title = _t('hide-password');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        toggleButton.title = _t('show-password');
    }
}

// CryptoJS wrapper functions for consistent encryption/decryption
function encryptData(data, passphrase) {
    if (!window.CryptoJS) {
        console.error("CryptoJS not loaded!");
        showToast(_t('encryption-failed'), 'error');
        return null;
    }
    try {
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), passphrase).toString();
        return encrypted;
    } catch (e) {
        console.error("Encryption failed:", e);
        showToast(_t('encryption-failed'), 'error');
        return null;
    }
}

function decryptData(encryptedData, passphrase) {
    if (!window.CryptoJS) {
        console.error("CryptoJS not loaded!");
        showToast(_t('decryption-failed'), 'error');
        return null;
    }
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, passphrase);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedString) {
            return null; // Decryption failed (e.g., wrong key)
        }
        return JSON.parse(decryptedString);
    } catch (e) {
        // This catch is important for invalid JSON after "successful" decryption with wrong key
        console.error("Decryption resulted in invalid data or failed:", e);
        return null;
    }
}

// Get file type icon based on extension
function getFileTypeIcon(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff', 'tif', 'heic', 'avif'];
    const docTypes = ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx', 'odf', 'ods', 'odt', 'txt', 'md', 'rtf'];
    const videoTypes = ['mp4', 'webm', 'ogv', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'm4v', 'mpg', 'mpeg'];
    const audioTypes = ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'wma', 'flac', 'opus'];
    const archiveTypes = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];
    
    // File type icons mapping
    const fileTypeIcons = {
        image: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" fill="#409eff"/></svg>',
        document: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" fill="#409eff"/></svg>',
        video: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V4H18M13,16V10H21V16H13Z" fill="#409eff"/></svg>',
        audio: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" fill="#409eff"/></svg>',
        archive: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8A2,2 0 0,0 20,6M15,16H6V14H15V16M18,12H6V10H18V12Z" fill="#409eff"/></svg>',
        default: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M961.536 531.251c-0.614-3.481-1.843-7.168-3.891-10.445L827.392 306.79v-28.876c0-10.445 0-20.276 0.205-29.901 0.819-89.703 1.433-174.285-101.376-179.2H303.923c-33.587 0-58.368 8.601-76.185 26.624-30.72 30.925-30.31 79.257-29.696 140.288 0 8.601 0.204 17.408 0.204 26.419v38.093c-2.867 2.253-5.324 4.915-7.168 8.192L64.717 523.879c-1.639 2.867-2.663 5.734-3.277 8.806-6.144 12.288-9.626 26.01-9.626 40.345v290.407c0 50.585 41.984 91.75 93.594 91.75h733.184c51.61 0 93.594-41.165 93.594-91.75V573.03c-0.205-14.95-4.096-29.286-10.65-41.779zM861.389 481.28h-33.997v-55.91l33.997 55.91zM271.565 138.65c5.53-5.53 16.384-8.397 32.358-8.397h420.045c36.25 1.843 42.803 11.264 41.78 117.145 0 9.83-0.206 19.866-0.206 30.516V481.28H664.576c-16.998 0-30.925 13.722-30.925 30.925 0 64.307-54.681 116.736-122.06 116.736S389.53 576.512 389.53 512.205c0-16.999-13.722-30.925-30.925-30.925H259.89V262.144c0-9.42 0-18.432-0.205-27.034-0.41-43.008-0.819-83.558 11.879-96.46z m-73.523 279.552v63.078h-36.864l36.864-63.078z m712.294 445.44c0 16.179-14.54 30.105-31.949 30.105H145.203c-17.203 0-31.949-13.721-31.949-30.105V573.03c0-16.179 14.541-30.105 31.95-30.105h185.548c15.155 83.763 90.522 147.456 181.043 147.456s165.888-63.898 181.043-147.456h185.55c17.202 0 31.948 13.721 31.948 30.105v290.612z" fill="#409eff"></path><path d="M385.638 278.528H655.77c16.998 0 30.924-13.722 30.924-30.925s-13.721-30.925-30.924-30.925H385.638c-16.998 0-30.924 13.722-30.924 30.925s13.926 30.925 30.924 30.925z m-30.924 70.451c0 16.999 13.721 30.925 30.924 30.925H655.77c16.998 0 30.924-13.722 30.924-30.925 0-17.203-13.721-30.925-30.924-30.925H385.638c-16.998 0-30.924 13.927-30.924 30.925z" fill="#409eff"></path></svg>'
    };
    
    if (imageTypes.includes(extension)) {
        return fileTypeIcons.image;
    } else if (docTypes.includes(extension)) {
        return fileTypeIcons.document;
    } else if (videoTypes.includes(extension)) {
        return fileTypeIcons.video;
    } else if (audioTypes.includes(extension)) {
        return fileTypeIcons.audio;
    } else if (archiveTypes.includes(extension)) {
        return fileTypeIcons.archive;
    } else {
        return fileTypeIcons.default;
    }
}

// Common gateway list used across the application
const commonGateways = [
    { value: "https://i0.img2ipfs.com", text: "img2ipfs" },
    { value: "https://cdn.ipfsscan.io", text: "cdn-ipfsscan" },
    { value: "https://gateway.ipfsscan.io", text: "ipfsscan" },
    { value: "https://ipfs.io", text: "ipfs.io" },
    { value: "https://ipfs.crossbell.io", text: "crossbell" },
    { value: "https://gateway.pinata.cloud", text: "pinata" },
    { value: "https://w3s.link", text: "w3s" },
    { value: "https://dweb.link", text: "dweb" },
    { value: "https://cake-volume-phrase.quicknode-ipfs.com", text: "quicknode-cake" },
    { value: "https://dswap.quicknode-ipfs.com", text: "quicknode-dswap" },
    { value: "https://daa.quicknode-ipfs.com", text: "quicknode-daa" },
    { value: "https://hashscan-ipfs.quicknode-ipfs.com", text: "quicknode-hashscan" },
    { value: "https://resto.quicknode-ipfs.com", text: "quicknode-resto" },
    { value: "https://within-herd-pitch.quicknode-ipfs.com", text: "quicknode-within" },
    { value: "https://eth.sucks", text: "eth.sucks" },
    { value: "https://ipfs-01.ethquokkaops.io", text: "ethquokkaops-01" },
    { value: "https://ipfs-02.ethquokkaops.io", text: "ethquokkaops-02" },
    { value: "https://filebase.truffle.wtf", text: "truffle-filebase" }
];

// Initialize common elements and listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Set the language
    initializeLanguage();
    
    // Update password toggle button titles
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.title = _t('show-password');
    });
    
    // Initialize language dropdown if it exists
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    
    if (langToggle && langDropdown) {
        // Set active language in dropdown
        const langLinks = langDropdown.querySelectorAll('a');
        langLinks.forEach(link => {
            if (link.getAttribute('data-lang') === currentLang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Toggle dropdown visibility
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });
        
        // Handle language selection
        langLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                
                // Update active class
                langLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Change language
                changeLanguage(lang);
                
                // Hide dropdown
                langDropdown.classList.remove('show');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!langDropdown.contains(e.target) && !langToggle.contains(e.target)) {
                langDropdown.classList.remove('show');
            }
        });
    }
});
