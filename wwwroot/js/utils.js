export const apiFetch = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        let data = null;
        try {
            data = await response.json();
        } catch { }
        return { status: response.status, data };
    } catch (error) {
        console.error(`[API Error] ${url}:`, error);
        return { status: 500, data: { error: 'Server connection failed.' } };
    }
};

export const getStorageItem = (key, fallback = null) => {
    const item = sessionStorage.getItem(key);
    try { return item ? JSON.parse(item) : fallback; } 
    catch { return item || fallback; }
};

export const setStorageItem = (key, value) => {
    sessionStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
};
