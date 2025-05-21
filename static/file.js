$(document).ready(() => {
    // 直接开始初始化事件监听
    initEventListeners();

    // Create toast container
    $('body').append('<div class="toast-container"></div>');

    function initEventListeners() {
        $(document).on('paste', handlePasteUpload);
        $('.upload .content').on('click', () => $('#file').click());
        $('#file').on('change', () => upload($('#file')[0].files));
        $('#dragbox').on('dragover', e => e.preventDefault())
                     .on('dragenter', handleDragEnter)
                     .on('dragleave', handleDragLeave)
                     .on('drop', handleDropUpload);
    }
    
    // Enhanced drag and drop visual feedback
    function handleDragEnter(e) {
        e.preventDefault();
        $('.upload').addClass('dragenter');
        $('.upload .content .icon').css('transform', 'translateY(-15px) scale(1.1)');
        $('.upload .content .desc').css('transform', 'scale(1.05)');
    }
    
    function handleDragLeave(e) {
        e.preventDefault();
        $('.upload').removeClass('dragenter');
        $('.upload .content .icon').css('transform', '');
        $('.upload .content .desc').css('transform', '');
    }

    function handlePasteUpload(event) {
        const clipboardData = event.clipboardData || window.clipboardData || event.originalEvent.clipboardData;
        if (!clipboardData || !clipboardData.items) return showToast(_t('clipboard-empty'), 'error');
        const file = Array.from(clipboardData.items).find(item => item.type.indexOf('image') !== -1)?.getAsFile();
        if (!file) return showToast(_t('clipboard-no-file'), 'error');
        upload([file]);
    }

    function handleDropUpload(e) {
        e.preventDefault();
        $('.upload').removeClass('dragenter');
        $('.upload .content .icon').css('transform', '');
        $('.upload .content .desc').css('transform', '');
        upload(e.originalEvent.dataTransfer.files);
    }

    function upload(files) {
        const maxSize = 5242880 * 20; // 100MB
        const allowedExtensions = [
            // 图片格式
            '.JPG', '.JPEG', '.PNG', '.GIF', '.BMP', '.WEBP', '.ICO', '.SVG', '.TIFF', '.TIF', '.HEIC', '.AVIF',
            
            // 办公文档
            '.DOC', '.DOCX', '.XLS', '.XLSX', '.PPT', '.PPTX', '.PDF', '.ODF', '.ODS', '.ODT', 
            '.WPS', '.WPT', '.DOT', '.DOTX', '.XLT', '.XLTX', '.POT', '.POTX',
            
            // 文本文件
            '.TXT', '.MD', '.MARKDOWN', '.RTF', '.CSV', '.JSON', '.XML', '.YAML', '.YML',
            '.INI', '.CFG', '.CONF', '.LOG', '.NFO',
            '.LICENSE', '.README',
            
            // 视频文件
            '.MP4', '.WEBM', '.OGV', '.MKV', '.AVI', '.MOV', '.WMV', '.FLV', '.F4V', 
            '.M4V', '.MPG', '.MPEG', '.3GP', '.3G2', '.TS', '.MTS', '.M2TS',
            
            // 音频文件
            '.MP3', '.WAV', '.OGG', '.M4A', '.AAC', '.WMA', '.FLAC', '.APE', 
            '.OPUS', '.AIFF', '.DSD', '.DSF', '.CUE', '.MID', '.MIDI',
            
            // 字幕文件
            '.SRT', '.ASS', '.SSA', '.VTT', '.SUB', '.IDX',
            
            // 电子书格式
            '.EPUB', '.MOBI', '.AZW3', '.FB2', '.LIT', '.LRF', '.PDB', '.PRC',
            
            // 压缩文件
            '.ZIP', '.RAR', '.7Z', '.TAR', '.GZ', '.BZ2', '.XZ', '.TGZ', '.TBZ', '.TXZ',
            
            // 编程和开发文件
            '.HTML', '.HTM', '.CSS', '.JS', '.TS', '.PHP', '.ASP', '.ASPX', '.JSP', '.PY', '.RB', '.GO', '.JAVA', '.C', '.CPP', '.CS', '.H', '.M', '.SWIFT', '.VB', '.PL', '.LUA', '.R', '.DART', '.SQL', '.SH', '.BAT', '.PS1', '.CMD',
            
            // 3D模型和设计文件
            '.OBJ', '.STL', '.3DS', '.FBX', '.BLEND', '.SKP', '.STEP', '.STP', '.IGES', '.IGS',
            
            // 字体文件
            '.TTF', '.OTF', '.WOFF', '.WOFF2', '.EOT',
            
            // 图表和图形文件
            '.AI', '.EPS', '.PS', '.PSD', '.XCF', '.CDR', '.FIG',
            
            // 科学和研究数据
            '.MAT', '.HDF5', '.HDF', '.H5', '.FIT', '.FITS',
            
            // 演示和发布文件
            '.KEY', '.ODP', '.PPS', '.PPSX',
            
            // 地理数据
            '.KML', '.KMZ', '.SHP', '.DBF', '.SHX', '.GPX', '.OSM',
            
            // 数据库文件
            '.DB', '.SQLITE', '.SQLITE3', '.MDB', '.ACCDB',
            
            // 游戏和模拟器文件
            '.ROM', '.SAV', '.NES', '.GBA', '.N64', '.ISO', '.CUE', '.BIN',
            
            // CAD和工程文件
            '.DWG', '.DXF', '.DGN',
            
            // 其他常用文件
            '.TORRENT', '.ICS', '.VCF'
        ];

        Array.from(files).forEach(file => {
            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toUpperCase();

            if (!allowedExtensions.includes(fileExtension)) {
                showToast(_t('unsupported-type'), 'error');
                $('#file').val(null);
                return;
            }

            if (file.size >= maxSize) {
                showToast(_t('file-too-large', {size: maxSize / 1024 / 1024}), 'error');
                return;
            }

            uploadToImg2IPFS(file);
        });
    }

    function uploadToImg2IPFS(file) {
        document.querySelector('.container').classList.add('start');
        const apis = [
            'https://gw.ipfsbed.is-an.org/api/v0/add?pin=false',
            'https://2ipfs.zone.id/api/v0/add?pin=false',
            'https://api.img2ipfs.org/api/v0/add?pin=true'
            // 'https://ipfs.io/api/v0/add?pin=false',
            // 'https://ipfs.crossbell.io/api/v0/add?pin=false',
            // 'https://ipfs.4everland.xyz/api/v0/add?pin=false'
        ];
        const formData = new FormData();
        formData.append('file', file);
        const randomClass = Date.now().toString(36);
        
        $('.filelist .list').append(createFileItem(file, randomClass));
        
        // Add uploading class for animation
        $(`.${randomClass}`).addClass('uploading');
        
        // 添加重试机制
        const tryUpload = (apiIndex = 0, retryCount = 0) => {
            if (apiIndex >= apis.length) {
                handleError(randomClass, _t('all-apis-failed'));
                return;
            }
            
            $.ajax({
                url: apis[apiIndex],
                type: 'post',
                dataType: 'json',
                processData: false,
                contentType: false,
                data: formData,
                timeout: 120000, // 2分钟超时
                xhr: () => {
                    const xhr = $.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.addEventListener('progress', e => updateProgress(e, randomClass), false);
                    }
                    return xhr;
                },
                success: res => {
                    if (res.Hash) {
                        handleUploadSuccess(res, randomClass);
                        setTimeout(() => seeding(res), 1000);
                    } else {
                        if (retryCount < 2) {
                            setTimeout(() => tryUpload(apiIndex, retryCount + 1), 1000);
                        } else {
                            tryUpload(apiIndex + 1, 0);
                        }
                    }
                },
                error: (xhr, status) => {
                    if (status === 'timeout') {
                        tryUpload(apiIndex + 1, 0);
                    } else if (retryCount < 2) {
                        setTimeout(() => tryUpload(apiIndex, retryCount + 1), 1000);
                    } else {
                        tryUpload(apiIndex + 1, 0);
                    }
                }
            });
        };

        tryUpload();
    }

    function createFileItem(file, randomClass) {
        // Get file icon based on file type
        const fileIcon = getFileTypeIcon(file.name);
        
        return `
            <div class="item ${randomClass}">
                <div class="file">
                    ${fileIcon}
                    <div class="desc">
                        <div class="desc__name">${file.name}</div>
                        <div class="desc__size">${_t('file-size', {size: formatBytes(file.size)})}</div>
                    </div>
                    <a href="javascript:void(0);" class="link" title="复制链接" onclick="copyLinkUrl(this); return false;">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon-copy">
                            <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" fill="#909399"/>
                        </svg>
                    </a>
                    <a href="javascript:void(0);" class="link" title="复制CID" onclick="copyCID(this); return false;">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon-copy-cid">
                            <path d="M14,8H10V6H14V8M20,4V20C20,21.1 19.1,22 18,22H6C4.9,22 4,21.1 4,20V4C4,2.9 4.9,2 6,2H18C19.1,2 20,2.9 20,4M18,13H6V20H18V13M18,4H6V11H18V4M14,15H10V17H14V15Z" fill="#909399"/>
                        </svg>
                    </a>
                    <a title="删除" class="link" onclick="deleteItem(this); return false;">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon-delete">
                            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" fill="#909399"/>
                        </svg>
                    </a>
                </div>
                <div class="progress">
                    <div class="progress-bar">
                        <div class="progress-inner"></div>
                    </div>
                    <div class="progress-status">0%</div>
                </div>
                <!-- URL display text input -->
                <div class="url-display" style="display: none; margin-top: 8px;">
                    <input type="text" class="file-url-input" style="width: 100%; padding: 6px; border: 1px solid #dcdfe6; border-radius: 4px; box-sizing: border-box;" readonly>
                </div>
                <!-- Hidden inputs to store the data -->
                <input type="hidden" class="data-url" value="">
                <input type="hidden" class="data-cid" value="">
            </div>
        `;
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

    function updateProgress(e, randomClass) {
        const percent = Math.floor((e.loaded / e.total) * 100);
        $(`.${randomClass}`).find('.progress-inner').css('width', `${percent}%`);
        $(`.${randomClass}`).find('.progress-status').text(`${percent}%`);
    }

    function handleUploadSuccess(res, randomClass) {
        const gateway = $('#gatewaySelect').val() || 'https://cdn.ipfsscan.io';
        const fileName = encodeURIComponent(res.Name);
        const imgSrc = `${gateway}/ipfs/${res.Hash}?filename=${fileName}`;
        
        $('#file').val(null);
        $(`.${randomClass}`).find('.progress-inner').addClass('success');
        $(`.${randomClass}`).find('.progress').fadeOut(500, function() {
            $(`.${randomClass}`).removeClass('uploading');
            
            // Show and populate the URL display
            const urlDisplay = $(`.${randomClass}`).find('.url-display');
            const fileUrlInput = $(`.${randomClass}`).find('.file-url-input');
            fileUrlInput.val(imgSrc);
            urlDisplay.fadeIn(300);
        });
        
        // Store the URL and CID values in hidden inputs
        $(`.${randomClass}`).find('.data-url').val(imgSrc);
        $(`.${randomClass}`).find('.data-cid').val(res.Hash);
        
        // Make sure the copyall button is visible
        $('.copyall').fadeIn(300);
        
        // Success notification
        showToast(_t('upload-success'), 'success');
    }

    function handleError(randomClass, message = _t('upload-error')) {
        $(`.${randomClass}`).find('.progress-inner').addClass('error');
        $(`.${randomClass}`).find('.progress-status').text('Failed');
        $(`.${randomClass}`).removeClass('uploading');
        
        showToast(message, 'error');
        
        setTimeout(() => {
            $(`.${randomClass}`).find('.progress').fadeOut(500);
        }, 3000);
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
});

// Add subtle animation when deleting an item
function deleteItem(obj) {
    const item = $(obj).closest('.item');
    item.css('opacity', 0.5).slideUp(300, function() {
        $(this).remove();
    });
}

// Function to copy the URL link
function copyLinkUrl(button) {
    const item = button.closest('.item');
    const textToCopy = item.querySelector('.data-url').value;
    
    copyToClipboard(textToCopy);
    showToast(_t('copied-format', {format: 'URL'}), 'success');
    
    // Add visual feedback
    $(button).addClass('active');
    setTimeout(() => {
        $(button).removeClass('active');
    }, 300);
}

// Function to copy the CID
function copyCID(button) {
    const item = button.closest('.item');
    const textToCopy = item.querySelector('.data-cid').value;
    
    copyToClipboard(textToCopy);
    showToast(_t('copied-format', {format: 'CID'}), 'success');
    
    // Add visual feedback
    $(button).addClass('active');
    setTimeout(() => {
        $(button).removeClass('active');
    }, 300);
}

// Helper function for copying to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function changeGateway(obj) {
    const newUrlBase = obj.value;
    document.querySelectorAll('.item').forEach(item => {
        // 获取CID
        const cid = item.querySelector('.data-cid').value;
        if (!cid) return;
        
        // 获取当前URL以提取文件名参数
        const currentUrl = item.querySelector('.data-url').value;
        const filenameMatch = currentUrl.match(/[?&]filename=([^&]+)/);
        const filenameParam = filenameMatch ? `?filename=${filenameMatch[1]}` : '';
        
        // 更新URL
        const newUrl = `${newUrlBase}/ipfs/${cid}${filenameParam}`;
        item.querySelector('.data-url').value = newUrl;
        
        // Also update the visible URL input if it exists
        if (item.querySelector('.file-url-input')) {
            item.querySelector('.file-url-input').value = newUrl;
        }
    });
}

function seeding(res) {
    const gateways = [
        // 主流公共网关
        'https://i0.img2ipfs.com/ipfs/',
        'https://cdn.ipfsscan.io/ipfs/',
        'https://gateway.ipfsscan.io/ipfs/',
        'https://ipfs.io/ipfs/',
        'https://ipfs.crossbell.io/ipfs/',
        'https://gateway.pinata.cloud/ipfs/',
        'https://w3s.link/ipfs/',
        'https://dweb.link/ipfs/',
        // QuickNode gateways
        'https://cake-volume-phrase.quicknode-ipfs.com/ipfs/',
        'https://dswap.quicknode-ipfs.com/ipfs/',
        'https://daa.quicknode-ipfs.com/ipfs/',
        'https://hashscan-ipfs.quicknode-ipfs.com/ipfs/',
        'https://resto.quicknode-ipfs.com/ipfs/',
        'https://within-herd-pitch.quicknode-ipfs.com/ipfs/',
        // ETH related gateways
        'https://eth.sucks/ipfs/',
        'https://ipfs-01.ethquokkaops.io/ipfs/',
        'https://ipfs-02.ethquokkaops.io/ipfs/',
        'https://filebase.truffle.wtf/ipfs/',
        // Other gateways
        'https://ipfs-gateway.gifted.art/ipfs/',
        'https://ipfs.forma.art/ipfs/',
        'https://i18n.opendreamnet.com/ipfs/',
        'https://gateway.ipfs.anarchiststickersarchive.org/ipfs/',
        'https://ipfs.ftso.best/ipfs/',
        'https://ipfs.distri.ai/ipfs/',
        'https://ipfs.dekart.io/ipfs/',
        'https://ipfs.allgram.best/ipfs/',
        'https://ipfs.metaversis.io/ipfs/',
        'https://ipfs-internal.xnftdata.com/ipfs/',
        'https://ipfs-12.yoghourt.cloud/ipfs/',
        'https://ipfs.fleek.co/ipfs/'
,
    ];
    gateways.forEach(gateway => {
        fetch(gateway + res.Hash)
            .then(response => console.log(`Seeding at ${gateway}: ${response.status}`))
            .catch(error => console.error(`Error seeding at ${gateway}:`, error));
    });
}

function copyAllLinks() {
    let allLinks = '';
    document.querySelectorAll('.data-url').forEach(input => {
        if (input.value) {
            allLinks += `${input.value}\n`;
        }
    });
    
    copyToClipboard(allLinks);
    showToast(_t('copied-all'), 'success');
}

// Enhanced toast notification function
function showToast(message, type = 'info', duration = 3000) {
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
    
    const toast = `
        <div id="${toastId}" class="toast ${type}">
            <span class="toast-message">${icon}${message}</span>
            <span class="toast-close">×</span>
        </div>
    `;
    
    $('.toast-container').append(toast);
    
    // Attach close event
    $(`#${toastId} .toast-close`).on('click', function() {
        $(`#${toastId}`).addClass('hide');
        setTimeout(() => {
            $(`#${toastId}`).remove();
        }, 700);
    });
    
    // Auto remove after duration
    setTimeout(() => {
        if ($(`#${toastId}`).length) {
            $(`#${toastId}`).addClass('hide');
            setTimeout(() => {
                $(`#${toastId}`).remove();
            }, 700);
        }
    }, duration);
}
