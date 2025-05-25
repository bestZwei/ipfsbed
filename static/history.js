// History management for IPFSBED

class HistoryManager {
    constructor() {
        this.storageKey = 'ipfsbed_upload_history';
        this.maxHistoryItems = 1000; // 最大保存记录数
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.currentFilter = 'all';
        this.currentSort = 'newest';
        this.searchQuery = '';
    }

    // 添加上传记录
    addRecord(fileData) {
        if (!fileData || !fileData.filename || !fileData.cid) {
            console.error('Invalid file data provided to addRecord:', fileData);
            return null;
        }

        const history = this.getHistory();
        const record = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            filename: fileData.filename,
            cid: fileData.cid,
            size: fileData.size || 0,
            type: this.getFileType(fileData.filename),
            shareUrl: fileData.shareUrl || '',
            isEncrypted: fileData.isEncrypted || false,
            gateway: fileData.gateway || 'Unknown',
            uploadDuration: fileData.uploadDuration || 0,
            tags: this.generateTags(fileData.filename)
        };

        history.unshift(record);

        // 限制历史记录数量
        if (history.length > this.maxHistoryItems) {
            history.splice(this.maxHistoryItems);
        }

        this.saveHistory(history);
        return record;
    }

    // 获取历史记录
    getHistory() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to load history:', e);
            return [];
        }
    }

    // 保存历史记录
    saveHistory(history) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(history));
        } catch (e) {
            console.error('Failed to save history:', e);
        }
    }

    // 删除记录
    deleteRecord(id) {
        const history = this.getHistory();
        const index = history.findIndex(record => record.id === id);
        if (index !== -1) {
            history.splice(index, 1);
            this.saveHistory(history);
            return true;
        }
        return false;
    }

    // 批量删除记录
    deleteMultipleRecords(ids) {
        const history = this.getHistory();
        const filteredHistory = history.filter(record => !ids.includes(record.id));
        this.saveHistory(filteredHistory);
        return history.length - filteredHistory.length;
    }

    // 清空历史记录
    clearHistory() {
        localStorage.removeItem(this.storageKey);
    }

    // 导出历史记录
    exportHistory() {
        const history = this.getHistory();
        const exportData = {
            exportDate: new Date().toISOString(),
            version: '1.0',
            records: history
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ipfsbed_history_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // 导入历史记录
    importHistory(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importData = JSON.parse(e.target.result);
                    if (importData.records && Array.isArray(importData.records)) {
                        const currentHistory = this.getHistory();
                        const mergedHistory = [...importData.records, ...currentHistory];
                        
                        // 去重并限制数量
                        const uniqueHistory = this.removeDuplicates(mergedHistory);
                        if (uniqueHistory.length > this.maxHistoryItems) {
                            uniqueHistory.splice(this.maxHistoryItems);
                        }
                        
                        this.saveHistory(uniqueHistory);
                        resolve(importData.records.length);
                    } else {
                        reject(new Error('Invalid file format'));
                    }
                } catch (e) {
                    reject(e);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    // 去重
    removeDuplicates(history) {
        const seen = new Set();
        return history.filter(record => {
            const key = `${record.cid}-${record.filename}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    // 搜索和过滤
    searchAndFilter(query = '', filter = 'all', sort = 'newest') {
        let history = this.getHistory();

        // 搜索
        if (query) {
            const lowerQuery = query.toLowerCase();
            history = history.filter(record => 
                record.filename.toLowerCase().includes(lowerQuery) ||
                record.cid.toLowerCase().includes(lowerQuery) ||
                record.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
            );
        }

        // 过滤
        if (filter !== 'all') {
            history = history.filter(record => {
                switch (filter) {
                    case 'folders':
                        return record.type === 'folder';
                    case 'images':
                        return record.type === 'image';
                    case 'videos':
                        return record.type === 'video';
                    case 'documents':
                        return record.type === 'document';
                    case 'archives':
                        return record.type === 'archive';
                    case 'encrypted':
                        return record.isEncrypted;
                    case 'today':
                        return Date.now() - record.timestamp < 24 * 60 * 60 * 1000;
                    case 'week':
                        return Date.now() - record.timestamp < 7 * 24 * 60 * 60 * 1000;
                    case 'month':
                        return Date.now() - record.timestamp < 30 * 24 * 60 * 60 * 1000;
                    default:
                        return true;
                }
            });
        }

        // 排序
        history.sort((a, b) => {
            switch (sort) {
                case 'newest':
                    return b.timestamp - a.timestamp;
                case 'oldest':
                    return a.timestamp - b.timestamp;
                case 'name':
                    return a.filename.localeCompare(b.filename);
                case 'size':
                    return (b.size || 0) - (a.size || 0);
                default:
                    return b.timestamp - a.timestamp;
            }
        });

        return history;
    }

    // 分页
    paginate(history, page = 1, itemsPerPage = 20) {
        const totalPages = Math.ceil(history.length / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        return {
            items: history.slice(startIndex, endIndex),
            currentPage: page,
            totalPages,
            totalItems: history.length,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        };
    }

    // 获取统计数据
    getStatistics() {
        const history = this.getHistory();
        const now = Date.now();
        
        const stats = {
            total: history.length,
            totalSize: history.reduce((sum, record) => sum + (record.size || 0), 0),
            today: 0,
            thisWeek: 0,
            thisMonth: 0,
            byType: {},
            byGateway: {},
            avgUploadTime: 0,
            encryptedCount: 0
        };

        let totalUploadTime = 0;
        let uploadTimeCount = 0;

        history.forEach(record => {
            const timeDiff = now - record.timestamp;
            
            // 时间统计
            if (timeDiff < 24 * 60 * 60 * 1000) stats.today++;
            if (timeDiff < 7 * 24 * 60 * 60 * 1000) stats.thisWeek++;
            if (timeDiff < 30 * 24 * 60 * 60 * 1000) stats.thisMonth++;

            // 类型统计
            stats.byType[record.type] = (stats.byType[record.type] || 0) + 1;

            // 网关统计
            stats.byGateway[record.gateway] = (stats.byGateway[record.gateway] || 0) + 1;

            // 加密文件统计
            if (record.isEncrypted) stats.encryptedCount++;

            // 上传时间统计
            if (record.uploadDuration && record.uploadDuration > 0) {
                totalUploadTime += record.uploadDuration;
                uploadTimeCount++;
            }
        });

        if (uploadTimeCount > 0) {
            stats.avgUploadTime = totalUploadTime / uploadTimeCount;
        }

        return stats;
    }

    // 获取文件类型
    getFileType(filename) {
        // Check if it's a folder first (ends with '/')
        if (filename.endsWith('/')) {
            return 'folder';
        }
        
        const extension = filename.split('.').pop().toLowerCase();
        const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
        const videoTypes = ['mp4', 'webm', 'ogv', 'mkv', 'avi', 'mov', 'wmv', 'flv'];
        const documentTypes = ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'md'];
        const archiveTypes = ['zip', 'rar', '7z', 'tar', 'gz'];
        const audioTypes = ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'wma', 'flac'];

        if (imageTypes.includes(extension)) return 'image';
        if (videoTypes.includes(extension)) return 'video';
        if (documentTypes.includes(extension)) return 'document';
        if (archiveTypes.includes(extension)) return 'archive';
        if (audioTypes.includes(extension)) return 'audio';
        return 'other';
    }

    // 生成标签
    generateTags(filename) {
        const tags = [];
        
        // Check if it's a folder first
        if (filename.endsWith('/')) {
            tags.push('folder', 'directory');
            const folderName = filename.slice(0, -1).toLowerCase();
            if (folderName.includes('image') || folderName.includes('photo')) tags.push('media');
            if (folderName.includes('document') || folderName.includes('doc')) tags.push('documents');
            if (folderName.includes('video') || folderName.includes('movie')) tags.push('video');
            if (folderName.includes('backup')) tags.push('backup');
            return [...new Set(tags)];
        }
        
        const extension = filename.split('.').pop().toLowerCase();
        const type = this.getFileType(filename);
        
        tags.push(extension, type);
        
        // 根据文件名生成额外标签 - Fix: sanitize filename input
        const name = filename.toLowerCase().replace(/[<>"/\\|?*]/g, ''); // Remove potentially dangerous characters
        if (name.includes('screenshot') || name.includes('screen')) tags.push('screenshot');
        if (name.includes('photo') || name.includes('img')) tags.push('photo');
        if (name.includes('backup')) tags.push('backup');
        if (name.includes('temp') || name.includes('tmp')) tags.push('temporary');
        
        return [...new Set(tags)]; // 去重
    }
}

// 全局历史管理器实例
window.historyManager = new HistoryManager();
