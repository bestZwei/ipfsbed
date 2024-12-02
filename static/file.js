$(document).ready(() => {
    // 移除警告提示初始化
    initEventListeners();

    function upload(files) {
        const maxSize = 5242880 * 20;
        // 使用白名单方式限制文件类型
        const validExtensions = [
            // 图片格式
            '.BMP', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP', '.AVIF', '.APNG',
            // 文档格式
            '.PDF', '.TXT', '.MD',
            // 其他允许的格式
            '.ZIP', '.RAR'
        ];

        Array.from(files).forEach(file => {
            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toUpperCase();

            if (!validExtensions.includes(fileExtension)) {
                alert('不支持该文件类型');
                $('#file').val(null);
                return;
            }

            if (file.size >= maxSize) {
                alert(`文件大小不能超过${maxSize / 1024 / 1024}MB`);
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            const randomClass = Date.now().toString(36);

            // 添加上传UI
            $('.filelist .list').append(`
                // ... 原有的UI代码 ...
            `);

            // 直接发起上传请求
            $.ajax({
                url: 'https://cdn.ipfsscan.io/api/v0/add?pin=false',
                type: 'post',
                dataType: 'json',
                processData: false,
                contentType: false,
                data: formData,
                xhr: () => {
                    const xhr = $.ajaxSettings.xhr();
                    if (!xhr.upload) return;
                    xhr.upload.addEventListener('progress', e => {
                        const percent = Math.floor((e.loaded / e.total) * 100);
                        $(`.${randomClass}`).find('.progress-inner').css('width', `${percent}%`);
                    }, false);
                    return xhr;
                },
                success: res => {
                    if (res.Hash) {
                        const imgSrc = `https://cdn.ipfsscan.io/ipfs/${res.Hash}`;
                        // 立即进行seeding
                        seeding(res);
                        $('#file').val(null);
                        $(`.${randomClass}`).find('.progress-inner').addClass('success');
                        // ... 其他成功处理代码 ...
                    } else {
                        handleError(randomClass);
                    }
                },
                error: () => handleError(randomClass)
            });
        });
    }
});

// 优化seeding函数
function seeding(res) {
    const gateways = [
        'https://ipfs.blockframe.io/ipfs/',
        'https://ipfs.crossbell.io/ipfs/',
        'https://4everland.io/ipfs/',
        // ... 其他网关 ...
    ];
    
    // 并发请求所有网关
    Promise.all(gateways.map(gateway => 
        fetch(gateway + res.Hash)
            .then(response => console.log(`Seeding at ${gateway}: ${response.status}`))
            .catch(error => console.error(`Error seeding at ${gateway}:`, error))
    ));
}
