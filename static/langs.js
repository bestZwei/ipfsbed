const translations = {
    'zh-CN': {
        // Meta information
        'meta-title': 'IPFSBED - 去中心化IPFS文件托管服务 | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,IPFS文件托管,IPFS,去中心化存储,星际文件系统,文件托管,免费存储,文件上传,云存储',
        'meta-description': 'IPFSBED是一个基于IPFS(星际文件系统)的去中心化的文件托管服务。支持拖拽上传、粘贴上传等多种上传方式,提供多个可靠的访问网关。',
        
        // UI elements
        'upload-text': '点击上传 / 粘贴上传 / 拖拽上传',
        'upload-description': '去中心化保存和共享文件',
        'file-list': '上传列表',
        'copy-all': '复制全部',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>访问网关：',
        'footer-project': '项目地址',
        'footer-more-gateways': '更多网关',
        'footer-copyright': '© 2021-2025 IPFSBED - 基于IPFS的去中心化文件托管服务',
        
        // Toast messages
        'clipboard-empty': '当前浏览器不支持粘贴上传',
        'clipboard-no-file': '剪切板内无内容或不支持桌面文件',
        'unsupported-type': '不支持该文件类型，仅支持图片、文档、文本等常见文件格式',
        'file-too-large': '上传的文件不能超过{size}MB',
        'upload-error': '上传出错！请稍后重试',
        'upload-success': '上传成功！',
        'copied-format': '已复制{format}格式的链接到剪贴板',
        'copied-all': '所有链接已复制到剪贴板',
        'all-apis-failed': '所有API尝试失败',
        
        // File info
        'file-size': 'SIZE: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': '口令（可选）',
        'passphrase-prompt-title': '输入口令访问文件',
        'passphrase-prompt-label': '口令：',
        'passphrase-submit': '解锁',
        'passphrase-incorrect': '口令错误。',
        'copy-share-link': '复制分享链接',
        'encryption-failed': '加密失败，请重试。',
        'decryption-failed': '解密失败。链接可能已损坏或口令错误。',
        'accessing-file': '正在访问文件...',
        'file-will-be-public': '文件将公开。',
        // Batch sharing
        'select-for-batch-sharing': '选择批量分享',
        'share-selected': '批量分享',
        'select-all': '全选',
        'no-files-selected': '未选择文件',
        'selected-files-invalid': '所选文件包含无效数据',
        'batch-encryption-failed': '批量分享加密失败',
        'batch-share-link-copied': '批量分享链接已复制到剪贴板',
        'batch-share-passphrase-title': '为批量分享设置口令',
        'batch-share-passphrase-placeholder': '口令（可选）',
        'batch-share-confirm-copy': '确认并复制链接',
        'batch-share-cancel': '取消',
        'return-home': '返回主页',
        
        // Download and Batch operations
        'download-button': '下载文件',
        'download-progress': '下载文件中',
        'deselect-all-btn': '取消全选',
        
        // Add any missing keys for password visibility
        'show-password': '显示密码',
        'hide-password': '隐藏密码',
        'meta-title-share-page': 'IPFSBED - 文件分享',
        'meta-description-share-page': '通过IPFSBED安全访问共享文件 - 基于IPFS的去中心化文件托管服务',
        'batch-share-title': 'IPFSBED - 批量文件分享',
        'batch-share-description': '通过IPFSBED访问多个共享文件 - 基于IPFS的去中心化文件托管服务'
    },
    'en': {
        // Meta information
        'meta-title': 'IPFSBED - Decentralized IPFS File Hosting | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,IPFS file hosting,IPFS,decentralized storage,InterPlanetary File System,file hosting,free storage,file upload,cloud storage',
        'meta-description': 'IPFSBED is a decentralized file hosting service based on IPFS (InterPlanetary File System). It supports multiple upload methods including drag-and-drop and paste, and provides multiple reliable access gateways.',
        
        // UI elements
        'upload-text': 'Click to Upload / Paste / Drag and Drop',
        'upload-description': 'Decentralized store and share files',
        'file-list': 'Upload List',
        'copy-all': 'Copy All',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>Access Gateway:',
        'footer-project': 'Project',
        'footer-more-gateways': 'More Gateways',
        'footer-copyright': '© 2021-2025 IPFSBED - IPFS-based Decentralized File Hosting',
        
        // Toast messages
        'clipboard-empty': 'Current browser does not support paste upload',
        'clipboard-no-file': 'No content in clipboard or desktop file not supported',
        'unsupported-type': 'Unsupported file type, only common formats like images, documents, and text files are supported',
        'file-too-large': 'Uploaded file cannot exceed {size}MB',
        'upload-error': 'Upload error! Please try again later',
        'upload-success': 'Upload successful!',
        'copied-format': '{format} format link copied to clipboard',
        'copied-all': 'All links copied to clipboard',
        'all-apis-failed': 'All API attempts failed',
        
        // File info
        'file-size': 'SIZE: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': 'Passphrase (optional)',
        'passphrase-prompt-title': 'Enter Passphrase to Access File',
        'passphrase-prompt-label': 'Passphrase:',
        'passphrase-submit': 'Unlock',
        'passphrase-incorrect': 'Incorrect passphrase.',
        'copy-share-link': 'Copy Share Link',
        'encryption-failed': 'Encryption failed. Please try again.',
        'decryption-failed': 'Decryption failed. Link might be corrupted or passphrase incorrect.',
        'accessing-file': 'Accessing file...',
        'file-will-be-public': 'File will be public.',
        // Batch sharing
        'select-for-batch-sharing': 'Select for batch sharing',
        'share-selected': 'Share Selected',
        'select-all': 'Select All',
        'no-files-selected': 'No files selected',
        'selected-files-invalid': 'Selected files have invalid data',
        'batch-encryption-failed': 'Failed to encrypt batch share',
        'batch-share-link-copied': 'Batch share link copied to clipboard',
        'batch-share-passphrase-title': 'Set Passphrase for Batch Share',
        'batch-share-passphrase-placeholder': 'Passphrase (optional)',
        'batch-share-confirm-copy': 'Confirm & Copy Link',
        'batch-share-cancel': 'Cancel',
        'return-home': 'Return Home',
        
        // Download and Batch operations
        'download-button': 'Download File',
        'download-progress': 'Downloading Files',
        'deselect-all-btn': 'Deselect All',
        
        // Add any missing keys:
        'show-password': 'Show Password',
        'hide-password': 'Hide Password',
        'meta-title-share-page': 'IPFSBED - File Share',
        'meta-description-share-page': 'Access shared files securely via IPFSBED - a decentralized file hosting service based on IPFS',
        'batch-share-title': 'IPFSBED - Batch File Share',
        'batch-share-description': 'Access multiple shared files via IPFSBED - a decentralized file hosting service based on IPFS'
    },
    'de': {
        // Meta information
        'meta-title': 'IPFSBED - Dezentralisiertes IPFS-Dateihosting | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,IPFS-Dateihosting,IPFS,dezentralisiertes Dateihosting,InterPlanetary File System,Dateihosting,kostenloses Dateihosting,Datei-Upload',
        'meta-description': 'IPFSBED ist ein dezentraler Dateihosting-Dienst, der auf IPFS (InterPlanetary File System) basiert. Es unterstützt mehrere Upload-Methoden, einschließlich Drag-and-Drop und Einfügen, und bietet mehrere zuverlässige Zugangs-Gateways.',
        
        // UI elements
        'upload-text': 'Zum Hochladen klicken / Einfügen / Drag and Drop',
        'upload-description': 'Dateien dezentralisiert speichern und teilen',
        'file-list': 'Upload-Liste',
        'copy-all': 'Alle kopieren',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>Zugangs-Gateway:',
        'footer-project': 'Projekt',
        'footer-more-gateways': 'Mehr Gateways',
        'footer-copyright': '© 2021-2025 IPFSBED - IPFS-basiertes dezentralisiertes Dateihosting',
        
        // Toast messages
        'clipboard-empty': 'Aktueller Browser unterstützt keinen Einfüge-Upload',
        'clipboard-no-file': 'Kein Inhalt in der Zwischenablage oder Desktop-Datei wird nicht unterstützt',
        'unsupported-type': 'Nicht unterstützter Dateityp, nur gängige Formate wie Bilder, Dokumente und Textdateien werden unterstützt',
        'file-too-large': 'Hochgeladene Datei darf {size}MB nicht überschreiten',
        'upload-error': 'Upload-Fehler! Bitte versuchen Sie es später erneut',
        'upload-success': 'Upload erfolgreich!',
        'copied-format': 'Link im {format}-Format in die Zwischenablage kopiert',
        'copied-all': 'Alle Links in die Zwischenablage kopiert',
        'all-apis-failed': 'Alle API-Versuche fehlgeschlagen',
        
        // File info
        'file-size': 'GRÖSSE: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': 'Passwort (optional)',
        'passphrase-prompt-title': 'Passwort zum Zugriff auf Datei eingeben',
        'passphrase-prompt-label': 'Passwort:',
        'passphrase-submit': 'Entsperren',
        'passphrase-incorrect': 'Falsches Passwort.',
        'copy-share-link': 'Share-Link kopieren',
        'encryption-failed': 'Verschlüsselung fehlgeschlagen. Bitte versuchen Sie es erneut.',
        'decryption-failed': 'Entschlüsselung fehlgeschlagen. Link könnte beschädigt sein oder Passwort falsch.',
        'accessing-file': 'Datei wird aufgerufen...',
        'file-will-be-public': 'Datei wird öffentlich sein.',
        // Batch sharing
        'select-for-batch-sharing': 'Wählen Sie für die Batch-Freigabe',
        'share-selected': 'Ausgewählte teilen',
        'select-all': 'Alle auswählen',
        'no-files-selected': 'Keine Dateien ausgewählt',
        'selected-files-invalid': 'Ausgewählte Dateien enthalten ungültige Daten',
        'batch-encryption-failed': 'Fehler beim Verschlüsseln der Batch-Freigabe',
        'batch-share-link-copied': 'Batch-Freigabelink in die Zwischenablage kopiert',
        'batch-share-passphrase-title': 'Passwort für Batch-Freigabe festlegen',
        'batch-share-passphrase-placeholder': 'Passwort (optional)',
        'batch-share-confirm-copy': 'Bestätigen & Link kopieren',
        'batch-share-cancel': 'Abbrechen',
        'return-home': 'Zurück zur Startseite',
        
        // Download and Batch operations
        'download-button': 'Datei herunterladen',
        'download-progress': 'Dateien werden heruntergeladen',
        'deselect-all-btn': 'Alle abwählen',
        
        // Add missing keys:
        'show-password': 'Passwort anzeigen',
        'hide-password': 'Passwort verstecken',
        'meta-title-share-page': 'IPFSBED - Datei teilen',
        'meta-description-share-page': 'Greifen Sie sicher auf gemeinsam genutzte Dateien über IPFSBED zu - ein dezentraler Dateihosting-Dienst basierend auf IPFS',
        'batch-share-title': 'IPFSBED - Batch-Dateifreigabe',
        'batch-share-description': 'Zugriff auf mehrere freigegebene Dateien über IPFSBED - ein dezentraler Dateihosting-Dienst basierend auf IPFS'
    },
    'ru': {
        // Meta information
        'meta-title': 'IPFSBED - Децентрализованный хостинг файлов IPFS | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,хостинг файлов IPFS,IPFS,децентрализованный хостинг файлов,межпланетная файловая система,хостинг файлов,бесплатный хостинг файлов,загрузка файлов',
        'meta-description': 'IPFSBED - это децентрализованная служба хостинга файлов на основе IPFS (межпланетная файловая система). Она поддерживает несколько методов загрузки, включая перетаскивание и вставку, и предоставляет несколько надежных шлюзов доступа.',
        
        // UI elements
        'upload-text': 'Нажмите для загрузки / Вставьте / Перетащите',
        'upload-description': 'Децентрализованно храните и делитесь файлами',
        'file-list': 'Список загрузок',
        'copy-all': 'Копировать все',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>Шлюз доступа:',
        'footer-project': 'Проект',
        'footer-more-gateways': 'Больше шлюзов',
        'footer-copyright': '© 2021-2025 IPFSBED - Децентрализованный хостинг файлов на основе IPFS',
        
        // Toast messages
        'clipboard-empty': 'Текущий браузер не поддерживает загрузку вставкой',
        'clipboard-no-file': 'Нет содержимого в буфере обмена или настольный файл не поддерживается',
        'unsupported-type': 'Неподдерживаемый тип файла, поддерживаются только распространенные форматы, такие как изображения, документы и текстовые файлы',
        'file-too-large': 'Загружаемый файл не может превышать {size}МБ',
        'upload-error': 'Ошибка загрузки! Пожалуйста, повторите попытку позже',
        'upload-success': 'Загрузка успешна!',
        'copied-format': 'Ссылка в формате {format} скопирована в буфер обмена',
        'copied-all': 'Все ссылки скопированы в буфер обмена',
        'all-apis-failed': 'Все попытки API не удались',
        
        // File info
        'file-size': 'РАЗМЕР: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': 'Пароль (необязательно)',
        'passphrase-prompt-title': 'Введите пароль для доступа к файлу',
        'passphrase-prompt-label': 'Пароль:',
        'passphrase-submit': 'Разблокировать',
        'passphrase-incorrect': 'Неверный пароль.',
        'copy-share-link': 'Копировать ссылку для обмена',
        'encryption-failed': 'Ошибка шифрования. Пожалуйста, попробуйте еще раз.',
        'decryption-failed': 'Ошибка расшифровки. Ссылка может быть повреждена или пароль неверен.',
        'accessing-file': 'Доступ к файлу...',
        'file-will-be-public': 'Файл будет общедоступным.',
        // Batch sharing
        'select-for-batch-sharing': 'Выбрать для пакетного обмена',
        'share-selected': 'Поделиться выбранным',
        'select-all': 'Выбрать все',
        'no-files-selected': 'Нет выбранных файлов',
        'selected-files-invalid': 'Выбранные файлы имеют недопустимые данные',
        'batch-encryption-failed': 'Не удалось зашифровать пакетный обмен',
        'batch-share-link-copied': 'Ссылка на пакетный обмен скопирована в буфер обмена',
        'batch-share-passphrase-title': 'Установить пароль для пакетного обмена',
        'batch-share-passphrase-placeholder': 'Пароль (необязательно)',
        'batch-share-confirm-copy': 'Подтвердить и скопировать ссылку',
        'batch-share-cancel': 'Отмена',
        'return-home': 'На главную',
        
        // Download and Batch operations
        'download-button': 'Скачать файл',
        'download-progress': 'Загрузка файлов',
        'deselect-all-btn': 'Отменить все',
        
        // Add missing keys:
        'show-password': 'Показать пароль',
        'hide-password': 'Скрыть пароль',
        'meta-title-share-page': 'IPFSBED - Общий доступ к файлу',
        'meta-description-share-page': 'Безопасный доступ к общим файлам через IPFSBED - децентрализованная служба хостинга файлов на основе IPFS',
        'batch-share-title': 'IPFSBED - Пакетный общий доступ к файлам',
        'batch-share-description': 'Доступ к нескольким общим файлам через IPFSBED - децентрализованная служба хостинга файлов на основе IPFS'
    },
    'fr': {
        // Meta information
        'meta-title': 'IPFSBED - Hébergement de fichiers IPFS décentralisé | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,hébergement de fichiers IPFS,IPFS,hébergement de fichiers décentralisé,système de fichiers interplanétaire,hébergement de fichiers,hébergement de fichiers gratuit,téléchargement de fichiers',
        'meta-description': 'IPFSBED est un service d\'hébergement de fichiers décentralisé basé sur IPFS (système de fichiers interplanétaire). Il prend en charge plusieurs méthodes de téléchargement, y compris le glisser-déposer et le collage, et fournit plusieurs passerelles d\'accès fiables.',
        
        // UI elements
        'upload-text': 'Cliquez pour télécharger / Collez / Glissez-déposez',
        'upload-description': 'Stockez et partagez des fichiers de manière décentralisée',
        'file-list': 'Liste des téléchargements',
        'copy-all': 'Tout copier',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>Passerelle d\'accès :',
        'footer-project': 'Projet',
        'footer-more-gateways': 'Plus de passerelles',
        'footer-copyright': '© 2021-2025 IPFSBED - Hébergement de fichiers décentralisé basé sur IPFS',
        
        // Toast messages
        'clipboard-empty': 'Le navigateur actuel ne prend pas en charge le téléchargement par collage',
        'clipboard-no-file': 'Pas de contenu dans le presse-papiers ou fichier de bureau non pris en charge',
        'unsupported-type': 'Type de fichier non pris en charge, seuls les formats courants comme les images, les documents et les fichiers texte sont pris en charge',
        'file-too-large': 'Le fichier téléchargé ne peut pas dépasser {size}MB',
        'upload-error': 'Erreur de téléchargement ! Veuillez réessayer plus tard',
        'upload-success': 'Téléchargement réussi!',
        'copied-format': 'Lien au format {format} copié dans le presse-papiers',
        'copied-all': 'Tous les liens copiés dans le presse-papiers',
        'all-apis-failed': 'Toutes les tentatives d\'API ont échoué',
        
        // File info
        'file-size': 'TAILLE: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': 'Mot de passe (optionnel)',
        'passphrase-prompt-title': 'Entrez le mot de passe pour accéder au fichier',
        'passphrase-prompt-label': 'Mot de passe :',
        'passphrase-submit': 'Déverrouiller',
        'passphrase-incorrect': 'Mot de passe incorrect.',
        'copy-share-link': 'Copier le lien de partage',
        'encryption-failed': 'Échec du chiffrement. Veuillez réessayer.',
        'decryption-failed': 'Échec du déchiffrement. Le lien est peut-être corrompu ou le mot de passe incorrect.',
        'accessing-file': 'Accès au fichier...',
        'file-will-be-public': 'Le fichier sera public.',
        // Batch sharing
        'select-for-batch-sharing': 'Sélectionner pour le partage en masse',
        'share-selected': 'Partager la sélection',
        'select-all': 'Tout sélectionner',
        'no-files-selected': 'Aucun fichier sélectionné',
        'selected-files-invalid': 'Les fichiers sélectionnés contiennent des données invalides',
        'batch-encryption-failed': 'Échec de la cryptographie en masse',
        'batch-share-link-copied': 'Lien de partage en masse copié dans le presse-papiers',
        'batch-share-passphrase-title': 'Définir un mot de passe pour le partage en masse',
        'batch-share-passphrase-placeholder': 'Mot de passe (optionnel)',
        'batch-share-confirm-copy': 'Confirmer et copier le lien',
        'batch-share-cancel': 'Annuler',
        'return-home': 'Retour à l\'accueil',
        
        // Download and Batch operations
        'download-button': 'Télécharger le fichier',
        'download-progress': 'Téléchargement des fichiers',
        'deselect-all-btn': 'Tout désélectionner',
        
        // Add missing keys:
        'show-password': 'Afficher le mot de passe',
        'hide-password': 'Masquer le mot de passe',
        'meta-title-share-page': 'IPFSBED - Partage de fichiers',
        'meta-description-share-page': 'Accédez en toute sécurité aux fichiers partagés via IPFSBED - un service d\'hébergement de fichiers décentralisé basé sur IPFS',
        'batch-share-title': 'IPFSBED - Partage de fichiers par lots',
        'batch-share-description': 'Accédez à plusieurs fichiers partagés via IPFSBED - un service d\'hébergement de fichiers décentralisé basé sur IPFS'
    },
    'es': {
        // Meta information
        'meta-title': 'IPFSBED - Alojamiento de archivos IPFS descentralizado | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,alojamiento de archivos IPFS,IPFS,alojamiento de archivos descentralizado,sistema de archivos interplanetario,alojamiento de archivos,alojamiento de archivos gratuito,carga de archivos',
        'meta-description': 'IPFSBED es un servicio de alojamiento de archivos descentralizado basado en IPFS (sistema de archivos interplanetario). Admite múltiples métodos de carga, incluido arrastrar y soltar y pegar, y proporciona múltiples puertas de enlace de acceso confiables.',
        
        // UI elements
        'upload-text': 'Haga clic para cargar / Pegar / Arrastrar y soltar',
        'upload-description': 'Almacene y comparta archivos de forma descentralizada',
        'file-list': 'Lista de cargas',
        'copy-all': 'Copiar todo',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>Puerta de enlace de acceso:',
        'footer-project': 'Proyecto',
        'footer-more-gateways': 'Más puertas de enlace',
        'footer-copyright': '© 2021-2025 IPFSBED - Alojamiento de archivos descentralizado basado en IPFS',
        
        // Toast messages
        'clipboard-empty': 'El navegador actual no admite la carga mediante pegado',
        'clipboard-no-file': 'No hay contenido en el portapapeles o el archivo de escritorio no es compatible',
        'unsupported-type': 'Tipo de archivo no compatible, solo se admiten formatos comunes como imágenes, documentos y archivos de texto',
        'file-too-large': 'El archivo cargado no puede exceder los {size}MB',
        'upload-error': '¡Error de carga! Por favor, inténtelo de nuevo más tarde',
        'upload-success': '¡Carga exitosa!',
        'copied-format': 'Enlace en formato {format} copiado al portapapeles',
        'copied-all': 'Todos los enlaces copiados al portapapeles',
        'all-apis-failed': 'Todos los intentos de API fallaron',
        
        // File info
        'file-size': 'TAMAÑO: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': 'Contraseña (opcional)',
        'passphrase-prompt-title': 'Ingrese la contraseña para acceder al archivo',
        'passphrase-prompt-label': 'Contraseña:',
        'passphrase-submit': 'Desbloquear',
        'passphrase-incorrect': 'Contraseña incorrecta.',
        'copy-share-link': 'Copiar enlace para compartir',
        'encryption-failed': 'Falló el cifrado. Por favor, inténtelo de nuevo.',
        'decryption-failed': 'Falló el descifrado. El enlace podría estar dañado o la contraseña incorrecta.',
        'accessing-file': 'Accediendo al archivo...',
        'file-will-be-public': 'El archivo será público.',
        // Batch sharing
        'select-for-batch-sharing': 'Seleccionar para compartir en grupo',
        'share-selected': 'Compartir seleccionado',
        'select-all': 'Seleccionar todo',
        'no-files-selected': 'No se seleccionaron archivos',
        'selected-files-invalid': 'Los archivos seleccionados tienen datos inválidos',
        'batch-encryption-failed': 'Error al encriptar el compartir en grupo',
        'batch-share-link-copied': 'Enlace para compartir en grupo copiado al portapapeles',
        'batch-share-passphrase-title': 'Establecer contraseña para compartir en grupo',
        'batch-share-passphrase-placeholder': 'Contraseña (opcional)',
        'batch-share-confirm-copy': 'Confirmar y copiar enlace',
        'batch-share-cancel': 'Cancelar',
        'return-home': 'Volver al inicio',
        
        // Download and Batch operations
        'download-button': 'Descargar archivo',
        'download-progress': 'Descargando archivos',
        'deselect-all-btn': 'Deseleccionar todo',
        
        // Add missing keys:
        'show-password': 'Mostrar contraseña',
        'hide-password': 'Ocultar contraseña',
        'meta-title-share-page': 'IPFSBED - Compartir archivo',
        'meta-description-share-page': 'Acceda de forma segura a archivos compartidos a través de IPFSBED - un servicio de alojamiento de archivos descentralizado basado en IPFS',
        'batch-share-title': 'IPFSBED - Compartir archivos por lotes',
        'batch-share-description': 'Acceda a varios archivos compartidos a través de IPFSBED - un servicio de alojamiento de archivos descentralizado basado en IPFS'
    },
    'ar': {
        // Meta information
        'meta-title': 'IPFSBED - خدمة استضافة ملفات IPFS اللامركزية | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,استضافة ملفات IPFS,IPFS,استضافة ملفات لامركزية,نظام الملفات بين الكواكب,استضافة الملفات,استضافة ملفات مجانية,تحميل الملفات',
        'meta-description': 'IPFSBED هي خدمة استضافة ملفات لامركزية تعتمد على IPFS (نظام الملفات بين الكواكب). تدعم طرق تحميل متعددة بما في ذلك السحب والإفلات واللصق، وتوفر بوابات وصول موثوقة متعددة.',
        
        // UI elements
        'upload-text': 'انقر للتحميل / لصق / سحب وإفلات',
        'upload-description': 'تخزين ومشاركة الملفات بشكل لامركزي',
        'file-list': 'قائمة التحميل',
        'copy-all': 'نسخ الكل',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>بوابة الوصول:',
        'footer-project': 'المشروع',
        'footer-more-gateways': 'المزيد من البوابات',
        'footer-copyright': '© 2021-2025 IPFSBED - استضافة ملفات لامركزية تعتمد على IPFS',
        
        // Toast messages
        'clipboard-empty': 'المتصفح الحالي لا يدعم التحميل باللصق',
        'clipboard-no-file': 'لا يوجد محتوى في الحافظة أو ملف سطح المكتب غير مدعوم',
        'unsupported-type': 'نوع الملف غير مدعوم، يتم دعم التنسيقات الشائعة فقط مثل الصور والمستندات وملفات النصوص',
        'file-too-large': 'لا يمكن أن يتجاوز حجم الملف المحمّل {size} ميغابايت',
        'upload-error': 'خطأ في التحميل! يرجى المحاولة مرة أخرى لاحقًا',
        'upload-success': 'تم التحميل بنجاح!',
        'copied-format': 'تم نسخ رابط بتنسيق {format} إلى الحافظة',
        'copied-all': 'تم نسخ جميع الروابط إلى الحافظة',
        'all-apis-failed': 'فشلت جميع محاولات API',
        
        // File info
        'file-size': 'الحجم: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': 'كلمة مرور (اختياري)',
        'passphrase-prompt-title': 'أدخل كلمة المرور للوصول إلى الملف',
        'passphrase-prompt-label': 'كلمة المرور:',
        'passphrase-submit': 'فتح',
        'passphrase-incorrect': 'كلمة مرور خاطئة.',
        'copy-share-link': 'نسخ رابط المشاركة',
        'encryption-failed': 'فشل التشفير. يرجى المحاولة مرة أخرى.',
        'decryption-failed': 'فشل فك التشفير. قد يكون الرابط تالفًا أو كلمة المرور غير صحيحة.',
        'accessing-file': 'جار الوصول إلى الملف...',
        'file-will-be-public': 'سيكون الملف عامًا.',
        // Batch sharing
        'select-for-batch-sharing': 'اختر للمشاركة الجماعية',
        'share-selected': 'شارك المحدد',
        'select-all': 'حدد الكل',
        'no-files-selected': 'لا توجد ملفات محددة',
        'selected-files-invalid': 'تحتوي الملفات المحددة على بيانات غير صالحة',
        'batch-encryption-failed': 'فشل تشفير المشاركة الجماعية',
        'batch-share-link-copied': 'تم نسخ رابط المشاركة الجماعية إلى الحافظة',
        'batch-share-passphrase-title': 'تعيين كلمة مرور للمشاركة الجماعية',
        'batch-share-passphrase-placeholder': 'كلمة مرور (اختياري)',
        'batch-share-confirm-copy': 'تأكيد ونسخ الرابط',
        'batch-share-cancel': 'إلغاء',
        'return-home': 'العودة إلى الصفحة الرئيسية',
        
        // Download and Batch operations
        'download-button': 'تنزيل الملف',
        'download-progress': 'جاري تنزيل الملفات',
        'deselect-all-btn': 'إلغاء تحديد الكل',
        
        // Add missing keys:
        'show-password': 'إظهار كلمة المرور',
        'hide-password': 'إخفاء كلمة المرور',
        'meta-title-share-page': 'IPFSBED - مشاركة الملف',
        'meta-description-share-page': 'الوصول بأمان إلى الملفات المشتركة عبر IPFSBED - خدمة استضافة ملفات لامركزية تعتمد على IPFS',
        'batch-share-title': 'IPFSBED - مشاركة الملفات المجمعة',
        'batch-share-description': 'الوصول إلى ملفات متعددة مشتركة عبر IPFSBED - خدمة استضافة ملفات لامركزية تعتمد على IPFS'
    },
    'fa': {
        // Meta information
        'meta-title': 'IPFSBED - سرویس میزبانی فایل‌های غیرمتمرکز IPFS | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,میزبانی فایل‌های IPFS,IPFS,میزبانی فایل‌های غیرمتمرکز,سیستم فایل بین سیاره‌ای,میزبانی فایل‌ها,میزبانی فایل‌های رایگان,آپلود فایل',
        'meta-description': 'IPFSBED یک سرویس میزبانی فایل‌های غیرمتمرکز بر اساس IPFS (سیستم فایل بین سیاره‌ای) است. از روش‌های آپلود متعدد از جمله کشیدن و رها کردن و چسباندن پشتیبانی می‌کند و دروازه‌های دسترسی قابل اعتماد متعددی ارائه می‌دهد.',
        
        // UI elements
        'upload-text': 'برای آپلود کلیک کنید / بچسبانید / بکشید و رها کنید',
        'upload-description': 'ذخیره و اشتراک‌گذاری فایل‌ها به صورت غیرمتمرکز',
        'file-list': 'لیست آپلود',
        'copy-all': 'کپی همه',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>دروازه دسترسی:',
        'footer-project': 'پروژه',
        'footer-more-gateways': 'دروازه‌های بیشتر',
        'footer-copyright': '© 2021-2025 IPFSBED - میزبانی فایل‌های غیرمتمرکز بر اساس IPFS',
        
        // Toast messages
        'clipboard-empty': 'مرورگر فعلی از آپلود چسباندن پشتیبانی نمی‌کند',
        'clipboard-no-file': 'محتوایی در کلیپ‌بورد وجود ندارد یا فایل دسکتاپ پشتیبانی نمی‌شود',
        'unsupported-type': 'نوع فایل پشتیبانی نمی‌شود، فقط فرمت‌های رایج مانند تصاویر، اسناد و فایل‌های متنی پشتیبانی می‌شوند',
        'file-too-large': 'فایل آپلود شده نمی‌تواند از {size}MB بیشتر باشد',
        'upload-error': 'خطای آپلود! لطفاً بعداً دوباره امتحان کنید',
        'upload-success': 'آپلود موفق!',
        'copied-format': 'پیوند با فرمت {format} در کلیپ‌بورد کپی شد',
        'copied-all': 'تمام پیوندها در کلیپ‌بورد کپی شدند',
        'all-apis-failed': 'همه تلاش‌های API ناموفق بودند',
        
        // File info
        'file-size': 'اندازه: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': 'گذرواژه (اختیاری)',
        'passphrase-prompt-title': 'برای دسترسی به فایل، گذرواژه را وارد کنید',
        'passphrase-prompt-label': 'گذرواژه:',
        'passphrase-submit': 'باز کردن',
        'passphrase-incorrect': 'گذرواژه نادرست است.',
        'copy-share-link': 'کپی پیوند اشتراک‌گذاری',
        'encryption-failed': 'رمزگذاری ناموفق بود. لطفاً دوباره امتحان کنید.',
        'decryption-failed': 'رمزگشایی ناموفق بود. پیوند ممکن است خراب باشد یا گذرواژه نادرست باشد.',
        'accessing-file': 'درحال دسترسی به فایل...',
        'file-will-be-public': 'فایل عمومی خواهد بود.',
        // Batch sharing
        'select-for-batch-sharing': 'انتخاب برای اشتراک‌گذاری گروهی',
        'share-selected': 'اشتراک‌گذاری انتخاب شده',
        'select-all': 'انتخاب همه',
        'no-files-selected': 'هیچ فایلی انتخاب نشده است',
        'selected-files-invalid': 'فایل‌های انتخاب شده دارای داده‌های نامعتبر هستند',
        'batch-encryption-failed': 'خطا در رمزنگاری اشتراک‌گذاری گروهی',
        'batch-share-link-copied': 'لینک اشتراک‌گذاری گروهی در کلیپ‌بورد کپی شد',
        'batch-share-passphrase-title': 'تنظیم گذرواژه برای اشتراک‌گذاری گروهی',
        'batch-share-passphrase-placeholder': 'گذرواژه (اختیاری)',
        'batch-share-confirm-copy': 'تأیید و کپی پیوند',
        'batch-share-cancel': 'لغو',
        'return-home': 'بازگشت به خانه',
        
        // Download and Batch operations
        'download-button': 'دانلود فایل',
        'download-progress': 'در حال دانلود فایل‌ها',
        'deselect-all-btn': 'لغو انتخاب همه',
        
        // Add missing keys:
        'show-password': 'نمایش گذرواژه',
        'hide-password': 'پنهان کردن گذرواژه',
        'meta-title-share-page': 'IPFSBED - اشتراک‌گذاری فایل',
        'meta-description-share-page': 'دسترسی امن به فایل‌های اشتراک‌گذاری شده از طریق IPFSBED - یک سرویس میزبانی فایل غیرمتمرکز بر اساس IPFS',
        'batch-share-title': 'IPFSBED - اشتراک‌گذاری گروهی فایل‌ها',
        'batch-share-description': 'دسترسی به چندین فایل اشتراک‌گذاری شده از طریق IPFSBED - یک سرویس میزبانی فایل غیرمتمرکز بر اساس IPFS'
    },
    'tr': {
        // Meta information
        'meta-title': 'IPFSBED - Merkeziyetsiz IPFS Dosya Barındırma | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,IPFS dosya barındırma,IPFS,merkeziyetsiz dosya barındırma,Gezegenler Arası Dosya Sistemi,dosya barındırma,ücretsiz dosya barındırma,dosya yükleme',
        'meta-description': 'IPFSBED, IPFS (Gezegenler Arası Dosya Sistemi) tabanlı merkeziyetsiz bir dosya barındırma hizmetidir. Sürükle-bırak ve yapıştırma dahil çoklu yükleme yöntemlerini destekler ve birden fazla güvenilir erişim ağ geçidi sağlar.',
        
        // UI elements
        'upload-text': 'Yüklemek için Tıklayın / Yapıştırın / Sürükleyip Bırakın',
        'upload-description': 'Dosyaları merkeziyetsiz olarak depolayın ve paylaşın',
        'file-list': 'Yükleme Listesi',
        'copy-all': 'Tümünü Kopyala',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>Erişim Ağ Geçidi:',
        'footer-project': 'Proje',
        'footer-more-gateways': 'Daha Fazla Ağ Geçidi',
        'footer-copyright': '© 2021-2025 IPFSBED - IPFS tabanlı Merkeziyetsiz Dosya Barındırma',
        
        // Toast messages
        'clipboard-empty': 'Mevcut tarayıcı yapıştırarak yüklemeyi desteklemiyor',
        'clipboard-no-file': 'Panoda içerik yok veya masaüstü dosyası desteklenmiyor',
        'unsupported-type': 'Desteklenmeyen dosya türü, yalnızca resimler, belgeler ve metin dosyaları gibi yaygın formatlar desteklenir',
        'file-too-large': 'Yüklenen dosya {size}MB\'ı aşamaz',
        'upload-error': 'Yükleme hatası! Lütfen daha sonra tekrar deneyin',
        'upload-success': 'Yükleme başarılı!',
        'copied-format': '{format} biçimindeki bağlantı panoya kopyalandı',
        'copied-all': 'Tüm bağlantılar panoya kopyalandı',
        'all-apis-failed': 'Tüm API denemeleri başarısız oldu',
        
        // File info
        'file-size': 'BOYUT: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': 'Parola (isteğe bağlı)',
        'passphrase-prompt-title': 'Dosyaya Erişmek İçin Parolayı Girin',
        'passphrase-prompt-label': 'Parola:',
        'passphrase-submit': 'Kilidi Aç',
        'passphrase-incorrect': 'Yanlış parola.',
        'copy-share-link': 'Paylaşım Bağlantısını Kopyala',
        'encryption-failed': 'Şifreleme başarısız oldu. Lütfen tekrar deneyin.',
        'decryption-failed': 'Şifre çözme başarısız oldu. Bağlantı bozuk olabilir veya parola yanlış olabilir.',
        'accessing-file': 'Dosyaya erişiliyor...',
        'file-will-be-public': 'Dosya herkese açık olacak.',
        // Batch sharing
        'select-for-batch-sharing': 'Toplu paylaşım için seçin',
        'share-selected': 'Seçilenleri Paylaş',
        'select-all': 'Tümünü Seç',
        'no-files-selected': 'Hiçbir dosya seçilmedi',
        'selected-files-invalid': 'Seçilen dosyalar geçersiz verilere sahip',
        'batch-encryption-failed': 'Toplu paylaşım şifrelemesi başarısız oldu',
        'batch-share-link-copied': 'Toplu paylaşım bağlantısı panoya kopyalandı',
        'batch-share-passphrase-title': 'Toplu Paylaşım İçin Parola Ayarla',
        'batch-share-passphrase-placeholder': 'Parola (isteğe bağlı)',
        'batch-share-confirm-copy': 'Onayla ve Bağlantıyı Kopyala',
        'batch-share-cancel': 'İptal',
        'return-home': 'Ana Sayfaya Dön',
        
        // Download and Batch operations
        'download-button': 'Dosyayı İndir',
        'download-progress': 'Dosyalar İndiriliyor',
        'deselect-all-btn': 'Tüm Seçimleri Kaldır',
        
        // Add missing keys:
        'show-password': 'Parolayı Göster',
        'hide-password': 'Parolayı Gizle',
        'meta-title-share-page': 'IPFSBED - Dosya Paylaşımı',
        'meta-description-share-page': 'IPFSBED aracılığıyla paylaşılan dosyalara güvenli bir şekilde erişin - IPFS tabanlı merkeziyetsiz bir dosya barındırma hizmeti',
        'batch-share-title': 'IPFSBED - Toplu Dosya Paylaşımı',
        'batch-share-description': 'IPFSBED aracılığıyla birden fazla paylaşılan dosyaya erişin - IPFS tabanlı merkeziyetsiz bir dosya barındırma hizmeti'
    },
    'pt': {
        // Meta information
        'meta-title': 'IPFSBED - Hospedagem de Arquivos IPFS Descentralizada | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,hospedagem de arquivos IPFS,IPFS,hospedagem de arquivos descentralizada,Sistema de Arquivos Interplanetário,hospedagem de arquivos,hospedagem de arquivos gratuita,upload de arquivos',
        'meta-description': 'IPFSBED é um serviço de hospedagem de arquivos descentralizado baseado no IPFS (Sistema de Arquivos Interplanetário). Suporta múltiplos métodos de upload, incluindo arrastar e soltar e colar, e fornece múltiplos gateways de acesso confiáveis.',
        
        // UI elements
        'upload-text': 'Clique para Enviar / Colar / Arrastar e Soltar',
        'upload-description': 'Armazene e compartilhe arquivos de forma descentralizada',
        'file-list': 'Lista de Uploads',
        'copy-all': 'Copiar Tudo',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>Gateway de Acesso:',
        'footer-project': 'Projeto',
        'footer-more-gateways': 'Mais Gateways',
        'footer-copyright': '© 2021-2025 IPFSBED - Hospedagem de Arquivos Descentralizada baseada em IPFS',
        
        // Toast messages
        'clipboard-empty': 'O navegador atual não suporta upload por colagem',
        'clipboard-no-file': 'Nenhum conteúdo na área de transferência ou arquivo de desktop não suportado',
        'unsupported-type': 'Tipo de arquivo não suportado, apenas formatos comuns como imagens, documentos e arquivos de texto são suportados',
        'file-too-large': 'O arquivo enviado não pode exceder {size}MB',
        'upload-error': 'Erro no upload! Por favor, tente novamente mais tarde',
        'upload-success': 'Upload bem-sucedido!',
        'copied-format': 'Link no formato {format} copiado para a área de transferência',
        'copied-all': 'Todos os links copiados para a área de transferência',
        'all-apis-failed': 'Todas as tentativas de API falharam',
        
        // File info
        'file-size': 'TAMANHO: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': 'Senha (opcional)',
        'passphrase-prompt-title': 'Digite a senha para acessar o arquivo',
        'passphrase-prompt-label': 'Senha:',
        'passphrase-submit': 'Desbloquear',
        'passphrase-incorrect': 'Senha incorreta.',
        'copy-share-link': 'Copiar Link de Compartilhamento',
        'encryption-failed': 'A criptografia falhou. Por favor, tente novamente.',
        'decryption-failed': 'A descriptografia falhou. O link pode estar corrompido ou a senha incorreta.',
        'accessing-file': 'Acessando arquivo...',
        'file-will-be-public': 'O arquivo será público.',
        // Batch sharing
        'select-for-batch-sharing': 'Selecionar para compartilhamento em massa',
        'share-selected': 'Compartilhar Selecionado',
        'select-all': 'Selecionar Tudo',
        'no-files-selected': 'Nenhum arquivo selecionado',
        'selected-files-invalid': 'Os arquivos selecionados têm dados inválidos',
        'batch-encryption-failed': 'Falha ao criptografar compartilhamento em massa',
        'batch-share-link-copied': 'Link de compartilhamento em massa copiado para a área de transferência',
        'batch-share-passphrase-title': 'Definir Senha para Compartilhamento em Massa',
        'batch-share-passphrase-placeholder': 'Senha (opcional)',
        'batch-share-confirm-copy': 'Confirmar e Copiar Link',
        'batch-share-cancel': 'Cancelar',
        'return-home': 'Voltar para a página inicial',
        
        // Download and Batch operations
        'download-button': 'Baixar Arquivo',
        'download-progress': 'Baixando Arquivos',
        'deselect-all-btn': 'Desmarcar Tudo',
        
        // Add missing keys:
        'show-password': 'Mostrar Senha',
        'hide-password': 'Ocultar Senha',
        'meta-title-share-page': 'IPFSBED - Compartilhamento de Arquivo',
        'meta-description-share-page': 'Acesse arquivos compartilhados com segurança via IPFSBED - um serviço de hospedagem de arquivos descentralizado baseado em IPFS',
        'batch-share-title': 'IPFSBED - Compartilhamento em Lote',
        'batch-share-description': 'Acesse múltiplos arquivos compartilhados via IPFSBED - um serviço de hospedagem de arquivos descentralizado baseado em IPFS'
    },
    'ko': {
        // Meta information
        'meta-title': 'IPFSBED - 탈중앙화 IPFS 파일 호스팅 | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,IPFS 파일 호스팅,IPFS,탈중앙화 파일 호스팅,행성간 파일 시스템,파일 호스팅,무료 파일 호스팅,파일 업로드',
        'meta-description': 'IPFSBED는 IPFS(행성간 파일 시스템)를 기반으로 한 탈중앙화된 파일 호스팅 서비스입니다. 드래그 앤 드롭 및 붙여넣기를 포함한 다양한 업로드 방법을 지원하며 여러 신뢰할 수 있는 액세스 게이트웨이를 제공합니다.',
        
        // UI elements
        'upload-text': '클릭하여 업로드 / 붙여넣기 / 드래그 앤 드롭',
        'upload-description': '탈중앙화된 방식으로 파일 저장 및 공유',
        'file-list': '업로드 목록',
        'copy-all': '모두 복사',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>접근 게이트웨이:',
        'footer-project': '프로젝트',
        'footer-more-gateways': '더 많은 게이트웨이',
        'footer-copyright': '© 2021-2025 IPFSBED - IPFS 기반 탈중앙화 파일 호스팅',
        
        // Toast messages
        'clipboard-empty': '현재 브라우저는 붙여넣기 업로드를 지원하지 않습니다',
        'clipboard-no-file': '클립보드에 내용이 없거나 데스크톱 파일이 지원되지 않습니다',
        'unsupported-type': '지원되지 않는 파일 유형입니다. 이미지, 문서, 텍스트 파일과 같은 일반적인 형식만 지원됩니다',
        'file-too-large': '업로드된 파일은 {size}MB를 초과할 수 없습니다',
        'upload-error': '업로드 오류! 나중에 다시 시도해 주세요',
        'upload-success': '업로드 성공!',
        'copied-format': '{format} 형식 링크가 클립보드에 복사되었습니다',
        'copied-all': '모든 링크가 클립보드에 복사되었습니다',
        'all-apis-failed': '모든 API 시도가 실패했습니다',
        
        // File info
        'file-size': '크기: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': '암호 (선택 사항)',
        'passphrase-prompt-title': '파일에 액세스하려면 암호를 입력하십시오',
        'passphrase-prompt-label': '암호:',
        'passphrase-submit': '잠금 해제',
        'passphrase-incorrect': '잘못된 암호입니다.',
        'copy-share-link': '공유 링크 복사',
        'encryption-failed': '암호화에 실패했습니다. 다시 시도하십시오.',
        'decryption-failed': '복호화에 실패했습니다. 링크가 손상되었거나 암호가 잘못되었을 수 있습니다.',
        'accessing-file': '파일에 액세스하는 중...',
        'file-will-be-public': '파일이 공개됩니다.',
        // Batch sharing
        'select-for-batch-sharing': '배치 공유를 위해 선택',
        'share-selected': '선택한 항목 공유',
        'select-all': '모두 선택',
        'no-files-selected': '선택된 파일이 없습니다',
        'selected-files-invalid': '선택한 파일에 잘못된 데이터가 있습니다',
        'batch-encryption-failed': '배치 공유 암호화 실패',
        'batch-share-link-copied': '배치 공유 링크가 클립보드에 복사되었습니다',
        'batch-share-passphrase-title': '배치 공유용 암호 설정',
        'batch-share-passphrase-placeholder': '암호 (선택 사항)',
        'batch-share-confirm-copy': '확인 및 링크 복사',
        'batch-share-cancel': '취소',
        'return-home': '홈으로 돌아가기',
        
        // Download and Batch operations
        'download-button': '파일 다운로드',
        'download-progress': '파일 다운로드 중',
        'deselect-all-btn': '모두 선택 해제',
        
        // Add missing keys:
        'show-password': '비밀번호 표시',
        'hide-password': '비밀번호 숨기기',
        'meta-title-share-page': 'IPFSBED - 파일 공유',
        'meta-description-share-page': 'IPFSBED를 통해 공유 파일에 안전하게 접근하세요 - IPFS 기반 탈중앙화 파일 호스팅 서비스',
        'batch-share-title': 'IPFSBED - 일괄 파일 공유',
        'batch-share-description': 'IPFSBED를 통해 여러 공유 파일에 접근하세요 - IPFS 기반 탈중앙화 파일 호스팅 서비스'
    },
    'ja': {
        // Meta information
        'meta-title': 'IPFSBED - 分散型IPFSファイルホスティング | ipfsbed.is-an.org',
        'meta-keywords': 'IPFSBED,IPFSファイルホスティング,IPFS,分散型ファイルホスティング,惑星間ファイルシステム,ファイルホスティング,無料ファイルホスティング,ファイルアップロード',
        'meta-description': 'IPFSBEDは、IPFS（惑星間ファイルシステム）に基づいた分散型のファイルホスティングサービスです。ドラッグアンドドロップや貼り付けなど複数のアップロード方法をサポートし、複数の信頼性の高いアクセスゲートウェイを提供します。',
        
        // UI elements
        'upload-text': 'クリックしてアップロード / 貼り付け / ドラッグアンドドロップ',
        'upload-description': '分散型でファイルを保存・共有',
        'file-list': 'アップロードリスト',
        'copy-all': 'すべてコピー',
        'gateway-selector': '<i class="fas fa-server" style="margin-right: 5px;"></i>アクセスゲートウェイ:',
        'footer-project': 'プロジェクト',
        'footer-more-gateways': 'その他のゲートウェイ',
        'footer-copyright': '© 2021-2025 IPFSBED - IPFSベースの分散型ファイルホスティング',
        
        // Toast messages
        'clipboard-empty': '現在のブラウザは貼り付けアップロードをサポートしていません',
        'clipboard-no-file': 'クリップボードに内容がないか、デスクトップファイルがサポートされていません',
        'unsupported-type': 'サポートされていないファイル形式です。画像、ドキュメント、テキストファイルなどの一般的な形式のみサポートされています',
        'file-too-large': 'アップロードされたファイルは{size}MBを超えることはできません',
        'upload-error': 'アップロードエラー！後でもう一度お試しください',
        'upload-success': 'アップロード成功！',
        'copied-format': '{format}形式のリンクがクリップボードにコピーされました',
        'copied-all': 'すべてのリンクがクリップボードにコピーされました',
        'all-apis-failed': 'すべてのAPIの試行が失敗しました',
        
        // File info
        'file-size': 'サイズ: {size}',
        
        // Passphrase feature
        'passphrase-placeholder': 'パスフレーズ（任意）',
        'passphrase-prompt-title': 'ファイルにアクセスするためのパスフレーズを入力してください',
        'passphrase-prompt-label': 'パスフレーズ:',
        'passphrase-submit': 'ロック解除',
        'passphrase-incorrect': 'パスフレーズが正しくありません。',
        'copy-share-link': '共有リンクをコピー',
        'encryption-failed': '暗号化に失敗しました。もう一度お試しください。',
        'decryption-failed': '復号に失敗しました。リンクが破損しているか、パスフレーズが間違っている可能性があります。',
        'accessing-file': 'ファイルにアクセスしています...',
        'file-will-be-public': 'ファイルは公開されます。',
        // Batch sharing
        'select-for-batch-sharing': 'バッチ共有のために選択',
        'share-selected': '選択したものを共有',
        'select-all': 'すべて選択',
        'no-files-selected': '選択されたファイルはありません',
        'selected-files-invalid': '選択したファイルに無効なデータがあります',
        'batch-encryption-failed': 'バッチ共有の暗号化に失敗しました',
        'batch-share-link-copied': 'バッチ共有リンクがクリップボードにコピーされました',
        'batch-share-passphrase-title': 'バッチ共有のパスフレーズを設定',
        'batch-share-passphrase-placeholder': 'パスフレーズ（任意）',
        'batch-share-confirm-copy': '確認してリンクをコピー',
        'batch-share-cancel': 'キャンセル',
        'return-home': 'ホームに戻る',
        
        // Download and Batch operations
        'download-button': 'ファイルをダウンロード',
        'download-progress': 'ファイルのダウンロード中',
        'deselect-all-btn': 'すべて選択解除',
        
        // Add missing keys:
        'show-password': 'パスワードを表示',
        'hide-password': 'パスワードを隠す',
        'meta-title-share-page': 'IPFSBED - ファイル共有',
        'meta-description-share-page': 'IPFSBEDを通じて共有ファイルに安全にアクセス - IPFSベースの分散型ファイルホスティングサービス',
        'batch-share-title': 'IPFSBED - バッチファイル共有',
        'batch-share-description': 'IPFSBEDを通じて複数の共有ファイルにアクセス - IPFSベースの分散型ファイルホスティングサービス'
    }
};

// Check and set user preferred language or browser default
function initializeLanguage() {
    // Try to get saved language preference
    let userLang = localStorage.getItem('ipfsbed-language');
    
    if (!userLang) {
        // If no saved preference, detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Check if we support the full browser language code
        if (translations[browserLang]) {
            userLang = browserLang;
        } else {
            // Try to match just the primary language code (e.g., "en" from "en-US")
            const primaryLang = browserLang.split('-')[0];
            
            if (translations[primaryLang]) {
                userLang = primaryLang;
            } else {
                // Default to English if no match
                userLang = 'en';
            }
        }
        
        // Save the detected language preference
        localStorage.setItem('ipfsbed-language', userLang);
    }
    
    return userLang;
}

// Current language
let currentLang = initializeLanguage();

// Function to get translation string
function _t(key, replacements = {}) {
    // Get the translation for the current language
    const translation = translations[currentLang]?.[key] || translations['en'][key] || key;
    
    // Replace any placeholders with their values
    let result = translation;
    Object.entries(replacements).forEach(([placeholder, value]) => {
        result = result.replace(`{${placeholder}}`, value);
    });
    
    return result;
}

// Change the language and update UI
function changeLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('ipfsbed-language', lang);
        updatePageLanguage();
        return true;
    }
    return false;
}

// Update all translatable elements on the page
function updatePageLanguage() {
    // Update meta tags
    document.title = _t('meta-title');
    document.querySelector('meta[name="keywords"]').setAttribute('content', _t('meta-keywords'));
    document.querySelector('meta[name="description"]').setAttribute('content', _t('meta-description'));
    
    // Update Open Graph and Twitter meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', _t('meta-title'));
    document.querySelector('meta[property="og:description"]').setAttribute('content', _t('meta-description'));
    document.querySelector('meta[name="twitter:title"]').setAttribute('content', _t('meta-title'));
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', _t('meta-description'));
    
    // Update UI elements
    document.querySelector('.upload .content .desc:nth-child(2)').textContent = _t('upload-text');
    document.querySelector('.upload .content .desc:nth-child(3)').textContent = _t('upload-description');
    document.querySelector('.filelist .title .title-text').textContent = _t('file-list');
    document.querySelector('.copyall').textContent = _t('copy-all');
    
    // Update footer
    document.querySelector('#footer .info a:nth-child(1)').textContent = _t('footer-project');
    document.querySelector('#footer .info a:nth-child(2)').textContent = _t('footer-more-gateways');
    document.querySelector('#footer div').childNodes[2].textContent = _t('footer-copyright');
    
    // Update language selector to show current language
    document.querySelector('#langSelect').value = currentLang;

    // Update dynamic placeholders and elements
    const passphraseInput = document.getElementById('passphraseInput');
    if (passphraseInput) {
        passphraseInput.placeholder = _t(passphraseInput.dataset.translatePlaceholder);
    }
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (key) {
            el.textContent = _t(key);
        }
    });
}

// Export functions and data
window.translations = translations;
window._t = _t;
window.changeLanguage = changeLanguage;
window.updatePageLanguage = updatePageLanguage;
window.currentLang = currentLang;
