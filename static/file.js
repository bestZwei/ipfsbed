$(document).ready(() => {
    // 初始化事件监听
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
        const maxSize = 5242880 * 20;
        const restrictedExtensions = [
            '.EXE', '.BAT', '.CMD', '.COM', '.SCR', '.PIF', '.MSI', '.MSP', '.JAR',
            '.JS', '.VBS', '.VBE', '.WSF', '.WSH', '.PS1', '.PSM1', '.SH', '.BASH', '.CSH', '.KSH', '.ZSH', '.TCSH', '.PL', '.CGI', '.PHP', '.ASP', '.ASPX', '.CER', '.CSR', '.JSP', '.JSPX', '.HTML', '.HTM'
        ];

        Array.from(files).forEach(file => {
            if (isRestrictedFile(file, restrictedExtensions)) {
                alert('文件类型错误,不支持该文件类型');
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

    function isRestrictedFile(file, restrictedExtensions) {
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toUpperCase();
        return restrictedExtensions.includes(fileExtension);
    }

    function uploadToImg2IPFS(file) {
        document.querySelector('.container').classList.add('start');
        const api = 'https://cdn.ipfsscan.io/api/v0/add?pin=false';
        const formData = new FormData();
        formData.append('file', file);
        const randomClass = Date.now().toString(36);

        $('.filelist .list').append(createFileItem(file, randomClass));

        $.ajax({
            url: api,
            type: 'post',
            dataType: 'json',
            processData: false,
            contentType: false,
            data: formData,
            xhr: () => {
                const xhr = $.ajaxSettings.xhr();
                if (!xhr.upload) return;
                xhr.upload.addEventListener('progress', e => updateProgress(e, randomClass), false);
                return xhr;
            },
            success: res => handleUploadSuccess(res, randomClass),
            error: () => handleError(randomClass)
        });
    }

    function createFileItem(file, randomClass) {
        return `
            <div class="item ${randomClass}">
                <div class="file">
                    <!-- SVG图标及文件信息 -->
                    <div class="desc">
                        <div class="desc__name">${file.name}</div>
                        <div class="desc__size">SIZE: ${formatBytes(file.size)}</div>
                    </div>
                    <a id="url" href="javascript:void(0);" class="link">
                        <!-- 链接图标 -->
                    </a>
                    <a title="删除" class="link" onclick="deleteItem(this); return false;">
                        <!-- 删除图标 -->
                    </a>
                </div>
                <div class="progress">
                    <div class="progress-bar">
                        <div class="progress-inner"></div>
                    </div>
                    <div class="progress-status">
                        <!-- 状态图标 -->
                    </div>
                </div>
                <div class="result" style="display:none">
                    <input value="" id="Imgs_url">URL</input>
                    <input value="" id="Imgs_html">HTML</input>
                    <input value="" id="Imgs_Ubb">BBCode</input>
                    <input value="" id="Imgs_markdown">Markdown</input>
                </div>
                <input id="show" name="show" onclick="copyToClipboard(this)" type="text" value="" readonly style="display:none">
            </div>
        `;
    }

    function updateProgress(e, randomClass) {
        const percent = Math.floor((e.loaded / e.total) * 100);
        $(`.${randomClass}`).find('.progress-inner').css('width', `${percent}%`);
    }

    function handleUploadSuccess(res, randomClass) {
        if (res.Hash) {
            const imgSrc = `https://i0.img2ipfs.com/ipfs/${res.Hash}`;
            $('#file').val(null);
            $(`.${randomClass}`).find('.progress-inner').addClass('success');
            $(`.${randomClass}`).find('.status-success').show();
            $(`.${randomClass}`).find('#url').attr({ href: imgSrc, target: '_blank' });
            $(`.${randomClass}`).find('#Imgs_url').val(imgSrc);
            $(`.${randomClass}`).find('#Imgs_html').val(`<img src="${imgSrc}"/>`);
            $(`.${randomClass}`).find('#Imgs_Ubb').val(`[img]${imgSrc}[/img]`);
            $(`.${randomClass}`).find('#Imgs_markdown').val(`![](${imgSrc})`);
            $(`.${randomClass}`).find('#show').show().val(imgSrc);
            $('.copyall').show();
            const title = $('.filelist .title').html().replace('上传列表', '');
            $('.filelist .title').html(title);
            setTimeout(() => seeding(res), 3000);
        } else {
            handleError(randomClass);
        }
    }

    function handleError(randomClass) {
        $(`.${randomClass}`).find('.progress-inner').addClass('error');
        $(`.${randomClass}`).find('.status-error').show();
        $(`.${randomClass}`).find('#show').show().val("上传出错！");
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

function selectFormat(obj) {
    const format = obj.id.replace('_', '');
    document.querySelectorAll('.item').forEach(item => {
        const url = item.querySelector('#Imgs_url').value;
        let formattedText;
        switch (format) {
            case 'url':
                formattedText = url;
                break;
            case 'html':
                formattedText = `<img src="${url}"/>`;
                break;
            case 'Ubb':
                formattedText = `[img]${url}[/img]`;
                break;
            case 'markdown':
                formattedText = `![](${url})`;
                break;
            default:
                formattedText = url;
        }
        item.querySelector('#show').value = formattedText;
    });
}

function changeGateway(obj) {
    const newUrlBase = obj.value;
    document.querySelectorAll("#show").forEach(input => {
        const currentUrl = input.value;
        const newUrl = currentUrl.replace(/https:\/\/[^\/]+/, newUrlBase);
        input.value = newUrl;
        input.closest('.item').querySelector(".file #url").href = newUrl;
    });
}

function copyToClipboard(obj) {
    obj.select();
    document.execCommand("Copy");
    alert('链接已复制到剪贴板');
}

function seeding(res) {
    const gateways = [
        'https://cdn.ipfsscan.io/ipfs/',
        'https://ipfs.io/ipfs/',
        'https://i0.img2ipfs.com/ipfs/',
        'https://ipfs.crossbell.io/ipfs/',
        'https://gateway.ipfsscan.io/ipfs/',
        'https://ipfs.cyou/ipfs/',
        'https://gateway.pinata.cloud/ipfs/',
        'https://hardbin.com/ipfs/',
        'https://dlunar.net/ipfs/',
        'https://w3s.link/ipfs/',
        'https://dweb.link/ipfs/',
        'https://ipfs.infura-ipfs.io/ipfs/'
    ];
    gateways.forEach(gateway => {
        fetch(gateway + res.Hash)
            .then(response => console.log(`Seeding at ${gateway}: ${response.status}`))
            .catch(error => console.error(`Error seeding at ${gateway}:`, error));
    });
}
