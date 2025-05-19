$(document).ready(() => {
    // 直接开始初始化事件监听
    initEventListeners();

    function initEventListeners() {
        $(document).on('paste', handlePasteUpload);
        $('.upload .content').on('click', () => $('#file').click());
        $('#file').on('change', () => upload($('#file')[0].files));
        $('#dragbox').on('dragover', e => e.preventDefault())
                     .on('dragenter', () => $('.upload').addClass('dragenter'))
                     .on('dragleave', () => $('.upload').removeClass('dragenter'))
                     .on('drop', handleDropUpload);
    }

    function handlePasteUpload(event) {
        const clipboardData = event.clipboardData || window.clipboardData || event.originalEvent.clipboardData;
        if (!clipboardData || !clipboardData.items) return alert('当前浏览器不支持粘贴上传');
        const file = Array.from(clipboardData.items).find(item => item.type.indexOf('image') !== -1)?.getAsFile();
        if (!file) return alert('剪切板内无内容或不支持桌面文件');
        upload([file]);
    }

    function handleDropUpload(e) {
        e.preventDefault();
        $('.upload').removeClass('dragenter');
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
            '.ZIP', '.RAR', '.7Z', '.TAR', '.GZ'
        ];

        Array.from(files).forEach(file => {
            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toUpperCase();

            if (!allowedExtensions.includes(fileExtension)) {
                alert('不支持该文件类型，仅支持图片、文档、文本等常见文件格式');
                $('#file').val(null);
                return;
            }

            if (file.size >= maxSize) {
                alert(`上传的文件不能超过${maxSize / 1024 / 1024}MB`);
                return;
            }

            uploadToImg2IPFS(file);
        });
    }

    function uploadToImg2IPFS(file) {
        document.querySelector('.container').classList.add('start');
        const apis = [
            'https://2ipfs.zone.id/api/v0/add?pin=false',
            'https://cdn.ipfsscan.io/api/v0/add?pin=false',
            'https://api.img2ipfs.org/api/v0/add?pin=false',
            // 'https://ipfs.io/api/v0/add?pin=false',
            // 'https://ipfs.crossbell.io/api/v0/add?pin=false',
            // 'https://ipfs.4everland.xyz/api/v0/add?pin=false'
        ];
        const formData = new FormData();
        formData.append('file', file);
        const randomClass = Date.now().toString(36);
        
        $('.filelist .list').append(createFileItem(file, randomClass));
        
        // 添加重试机制
        const tryUpload = (apiIndex = 0, retryCount = 0) => {
            if (apiIndex >= apis.length) {
                handleError(randomClass, '所有API尝试失败');
                return;
            }
            
            $.ajax({
                url: apis[apiIndex],
                type: 'post',
                dataType: 'json',
                processData: false,
                contentType: false,
                data: formData,
                timeout: 30000, // 30秒超时
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
        return `
            <div class="item ${randomClass}">
                <div class="file">
                    <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path d="M961.536 531.251c-0.614-3.481-1.843-7.168-3.891-10.445L827.392 306.79v-28.876c0-10.445 0-20.276 0.205-29.901 0.819-89.703 1.433-174.285-101.376-179.2H303.923c-33.587 0-58.368 8.601-76.185 26.624-30.72 30.925-30.31 79.257-29.696 140.288 0 8.601 0.204 17.408 0.204 26.419v38.093c-2.867 2.253-5.324 4.915-7.168 8.192L64.717 523.879c-1.639 2.867-2.663 5.734-3.277 8.806-6.144 12.288-9.626 26.01-9.626 40.345v290.407c0 50.585 41.984 91.75 93.594 91.75h733.184c51.61 0 93.594-41.165 93.594-91.75V573.03c-0.205-14.95-4.096-29.286-10.65-41.779zM861.389 481.28h-33.997v-55.91l33.997 55.91zM271.565 138.65c5.53-5.53 16.384-8.397 32.358-8.397h420.045c36.25 1.843 42.803 11.264 41.78 117.145 0 9.83-0.206 19.866-0.206 30.516V481.28H664.576c-16.998 0-30.925 13.722-30.925 30.925 0 64.307-54.681 116.736-122.06 116.736S389.53 576.512 389.53 512.205c0-16.999-13.722-30.925-30.925-30.925H259.89V262.144c0-9.42 0-18.432-0.205-27.034-0.41-43.008-0.819-83.558 11.879-96.46z m-73.523 279.552v63.078h-36.864l36.864-63.078z m712.294 445.44c0 16.179-14.54 30.105-31.949 30.105H145.203c-17.203 0-31.949-13.721-31.949-30.105V573.03c0-16.179 14.541-30.105 31.95-30.105h185.548c15.155 83.763 90.522 147.456 181.043 147.456s165.888-63.898 181.043-147.456h185.55c17.202 0 31.948 13.721 31.948 30.105v290.612z" fill="#909399"></path>
                        <path d="M385.638 278.528H655.77c16.998 0 30.924-13.722 30.924-30.925s-13.721-30.925-30.924-30.925H385.638c-16.998 0-30.924 13.722-30.924 30.925s13.926 30.925 30.924 30.925z m-30.924 70.451c0 16.999 13.721 30.925 30.924 30.925H655.77c16.998 0 30.924-13.722 30.924-30.925 0-17.203-13.721-30.925-30.924-30.925H385.638c-16.998 0-30.924 13.927-30.924 30.925z" fill="#909399"></path>
                    </svg>
                    <div class="desc">
                        <div class="desc__name">${file.name}</div>
                        <div class="desc__size">SIZE: ${formatBytes(file.size)}</div>
                    </div>
                    <a id="url" href="javascript:void(0);" class="link">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon-open">
                            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" fill="#909399"/>
                        </svg>
                    </a>
                    <a title="删除" class="link" onclick="deleteItem(this); return false;">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon-delete">
                            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" fill="#909399"/>
                        </svg>
                    </a>
                </div>
                <!-- Copy buttons group -->
                <div class="copy-buttons-group" style="display:none">
                    <button class="copy-btn" data-type="url" onclick="copySpecificFormat(this)">URL</button>
                    <button class="copy-btn" data-type="cid" onclick="copySpecificFormat(this)">CID</button>
                    <button class="copy-btn" data-type="html" onclick="copySpecificFormat(this)">HTML</button>
                    <button class="copy-btn" data-type="ubb" onclick="copySpecificFormat(this)">UBB</button>
                    <button class="copy-btn" data-type="markdown" onclick="copySpecificFormat(this)">MD</button>
                </div>
                <!-- Hidden inputs to store the data -->
                <input type="hidden" class="data-url" value="">
                <input type="hidden" class="data-cid" value="">
                <input type="hidden" class="data-html" value="">
                <input type="hidden" class="data-ubb" value="">
                <input type="hidden" class="data-markdown" value="">
            </div>
        `;
    }

    function updateProgress(e, randomClass) {
        const percent = Math.floor((e.loaded / e.total) * 100);
        $(`.${randomClass}`).find('.progress-inner').css('width', `${percent}%`);
    }

    function handleUploadSuccess(res, randomClass) {
        const gateway = $('#gatewaySelect').val() || 'https://cdn.ipfsscan.io';
        const imgSrc = `${gateway}/ipfs/${res.Hash}`;
        
        $('#file').val(null);
        $(`.${randomClass}`).find('.progress-inner').addClass('success');
        $(`.${randomClass}`).find('.status-success').show();
        $(`.${randomClass}`).find('#url').attr({ href: imgSrc, target: '_blank' });
        
        // Store the various format values in hidden inputs
        $(`.${randomClass}`).find('.data-url').val(imgSrc);
        $(`.${randomClass}`).find('.data-cid').val(res.Hash);
        $(`.${randomClass}`).find('.data-html').val(`<img src="${imgSrc}"/>`);
        $(`.${randomClass}`).find('.data-ubb').val(`[img]${imgSrc}[/img]`);
        $(`.${randomClass}`).find('.data-markdown').val(`![](${imgSrc})`);
        
        // 显示复制按钮组
        $(`.${randomClass}`).find('.copy-buttons-group').show();
        
        $('.copyall').show();
    }

    function handleError(randomClass, message = '上传出错！请稍后重试') {
        $(`.${randomClass}`).find('.progress-inner').addClass('error');
        $(`.${randomClass}`).find('.status-error').show();
        $(`.${randomClass}`).find('#show').show().val(message);
        
        setTimeout(() => {
            $(`.${randomClass}`).find('.status-error').hide();
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

function deleteItem(obj) {
    const item = obj.closest('.item');
    item.parentNode.removeChild(item);
}

// Add this function to create toast notifications
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add to container
    container.appendChild(toast);
    
    // Remove after animation completes
    setTimeout(() => {
        toast.remove();
        // Remove container if empty
        if (container.children.length === 0) {
            container.remove();
        }
    }, 3000);
}

// Replace copySpecificFormat function
function copySpecificFormat(button) {
    const item = button.closest('.item');
    const formatType = button.getAttribute('data-type');
    let textToCopy;
    
    switch(formatType) {
        case 'url':
            textToCopy = item.querySelector('.data-url').value;
            break;
        case 'cid':
            textToCopy = item.querySelector('.data-cid').value;
            break;
        case 'html':
            textToCopy = item.querySelector('.data-html').value;
            break;
        case 'ubb':
            textToCopy = item.querySelector('.data-ubb').value;
            break;
        case 'markdown':
            textToCopy = item.querySelector('.data-markdown').value;
            break;
        default:
            textToCopy = item.querySelector('.data-url').value;
    }
    
    // 创建临时textarea来执行复制操作
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // 显示复制成功提示 - 使用 toast 而不是 alert
    showToast(`已复制${button.innerText}格式的链接到剪贴板`);
}

function changeGateway(obj) {
    const newUrlBase = obj.value;
    document.querySelectorAll('.item').forEach(item => {
        // 获取CID
        const cid = item.querySelector('.data-cid').value;
        if (!cid) return;
        
        // 更新URL
        const newUrl = `${newUrlBase}/ipfs/${cid}`;
        item.querySelector('.data-url').value = newUrl;
        item.querySelector('.data-html').value = `<img src="${newUrl}"/>`;
        item.querySelector('.data-ubb').value = `[img]${newUrl}[/img]`;
        item.querySelector('.data-markdown').value = `![](${newUrl})`;
        
        // 更新预览链接
        item.querySelector(".file #url").href = newUrl;
    });
}

// 不再需要这个函数，被copySpecificFormat替代
// function copyToClipboard(obj) { ... }

function seeding(res) {
    const gateways = [
        'https://cdn.ipfsscan.io/ipfs/',
        'https://ipfs.io/ipfs/',
        'https://i0.img2ipfs.com/ipfs/',
        'https://gateway.ipfsscan.io/ipfs/',
        'https://ipfs.cyou/ipfs/',
        'https://gateway.pinata.cloud/ipfs/',
        'https://hardbin.com/ipfs/',
        'https://dlunar.net/ipfs/',
        'https://w3s.link/ipfs/',
        'https://dweb.link/ipfs/'
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
    const textarea = document.createElement('textarea');
    textarea.value = allLinks;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('链接已复制到剪贴板');
}
