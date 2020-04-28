export const setPreference = (key, value) => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
};

export const clearPreference = (key) => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.removeItem(key);
}

export const getPreference = (key, defaultValue) => {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    const value = window.localStorage.getItem(key);
    if (value === null) {
        return defaultValue;
    }
    return JSON.parse(value);
};
