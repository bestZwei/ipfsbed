const translations = {
    "zh-CN": {
        "title": "IPFS图床",
        "subtitle": "(文件传到ipfs星际文件系统)",
        "uploadDesc": "点击上传 / 粘贴上传 / 拖拽上传",
        "uploadNote": "永久的、去中心化保存和共享文件",
        "uploadListTitle": "上传列表",
        "gatewayButton": "网关",
        "gatewayTooltip": "ipfs.io官方网关已被GFW阻断| 其它几个都支持中国访问",
        "defaultGateway": "默认网关",
        "officialGateway": "官方网关",
        "gateway1": "网关1",
        "gateway2": "网关2",
        "gateway3": "网关3",
        "gateway4": "网关4",
        "gateway5": "网关5",
        "gateway6": "网关6",
        "gateway7": "网关7",
        "gateway8": "网关8",
        "gateway9": "网关9",
        "copyAll": "复制全部",
        "url": "URL",
        "html": "HTML",
        "ubb": "UBB",
        "markdown": "MD",
        "projectLink": "项目地址",
        "moreGateways": "更多网关"
    },
    "en": {
        "title": "IPFS Image Hosting",
        "subtitle": "(Files uploaded to IPFS)",
        "uploadDesc": "Click to upload / Paste to upload / Drag to upload",
        "uploadNote": "Permanently decentralized storage and sharing of files",
        "uploadListTitle": "Upload List",
        "gatewayButton": "Gateway",
        "gatewayTooltip": "ipfs.io official gateway is blocked by GFW | Others support access in China",
        "defaultGateway": "Default Gateway",
        "officialGateway": "Official Gateway",
        "gateway1": "Gateway 1",
        "gateway2": "Gateway 2",
        "gateway3": "Gateway 3",
        "gateway4": "Gateway 4",
        "gateway5": "Gateway 5",
        "gateway6": "Gateway 6",
        "gateway7": "Gateway 7",
        "gateway8": "Gateway 8",
        "gateway9": "Gateway 9",
        "copyAll": "Copy All",
        "url": "URL",
        "html": "HTML",
        "ubb": "UBB",
        "markdown": "MD",
        "projectLink": "Project Link",
        "moreGateways": "More Gateways"
    },
    "fr": {
        "title": "Hébergement d'images IPFS",
        "subtitle": "(Fichiers téléchargés sur IPFS)",
        "uploadDesc": "Cliquez pour télécharger / Coller pour télécharger / Glisser pour télécharger",
        "uploadNote": "Stockage et partage de fichiers de manière décentralisée et permanente",
        "uploadListTitle": "Liste de téléchargement",
        "gatewayButton": "Passerelle",
        "gatewayTooltip": "La passerelle officielle ipfs.io est bloquée par le GFW | D'autres prennent en charge l'accès en Chine",
        "defaultGateway": "Passerelle par défaut",
        "officialGateway": "Passerelle officielle",
        "gateway1": "Passerelle 1",
        "gateway2": "Passerelle 2",
        "gateway3": "Passerelle 3",
        "gateway4": "Passerelle 4",
        "gateway5": "Passerelle 5",
        "gateway6": "Passerelle 6",
        "gateway7": "Passerelle 7",
        "gateway8": "Passerelle 8",
        "gateway9": "Passerelle 9",
        "copyAll": "Copier tout",
        "url": "URL",
        "html": "HTML",
        "ubb": "UBB",
        "markdown": "MD",
        "projectLink": "Lien du projet",
        "moreGateways": "Plus de passerelles"
    },
    "pt": {
        "title": "Hospedagem de Imagens IPFS",
        "subtitle": "(Arquivos enviados para o IPFS)",
        "uploadDesc": "Clique para enviar / Cole para enviar / Arraste para enviar",
        "uploadNote": "Armazenamento e compartilhamento de arquivos de forma descentralizada e permanente",
        "uploadListTitle": "Lista de Upload",
        "gatewayButton": "Gateway",
        "gatewayTooltip": "O gateway oficial do ipfs.io é bloqueado pelo GFW | Outros suportam acesso na China",
        "defaultGateway": "Gateway Padrão",
        "officialGateway": "Gateway Oficial",
        "gateway1": "Gateway 1",
        "gateway2": "Gateway 2",
        "gateway3": "Gateway 3",
        "gateway4": "Gateway 4",
        "gateway5": "Gateway 5",
        "gateway6": "Gateway 6",
        "gateway7": "Gateway 7",
        "gateway8": "Gateway 8",
        "gateway9": "Gateway 9",
        "copyAll": "Copiar Tudo",
        "url": "URL",
        "html": "HTML",
        "ubb": "UBB",
        "markdown": "MD",
        "projectLink": "Link do Projeto",
        "moreGateways": "Mais Gateways"
    },
    "ar": {
        "title": "استضافة الصور عبر IPFS",
        "subtitle": "(الملفات المرفوعة إلى IPFS)",
        "uploadDesc": "انقر للتحميل / الصق للتحميل / اسحب للتحميل",
        "uploadNote": "تخزين ومشاركة الملفات بشكل دائم ولا مركزي",
        "uploadListTitle": "قائمة التحميل",
        "gatewayButton": "البوابة",
        "gatewayTooltip": "البوابة الرسمية لـ ipfs.io محظورة بواسطة GFW | الآخرون يدعمون الوصول في الصين",
        "defaultGateway": "البوابة الافتراضية",
        "officialGateway": "البوابة الرسمية",
        "gateway1": "البوابة 1",
        "gateway2": "البوابة 2",
        "gateway3": "البوابة 3",
        "gateway4": "البوابة 4",
        "gateway5": "البوابة 5",
        "gateway6": "البوابة 6",
        "gateway7": "البوابة 7",
        "gateway8": "البوابة 8",
        "gateway9": "البوابة 9",
        "copyAll": "نسخ الكل",
        "url": "رابط",
        "html": "HTML",
        "ubb": "UBB",
        "markdown": "MD",
        "projectLink": "رابط المشروع",
        "moreGateways": "المزيد من البوابات"
    }
};

function setLanguage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.innerText = translations[language][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', (event) => {
        setLanguage(event.target.value);
    });

    // Set default language
    setLanguage('zh-CN');
});
