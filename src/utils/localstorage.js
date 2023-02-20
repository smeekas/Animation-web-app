export function getLocalStorageData() {
    return JSON.parse(localStorage.getItem('pixelmate'));
}
export function setLocalStorageData(data) {
    return localStorage.setItem('pixelmate', JSON.stringify(data))
}