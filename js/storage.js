function getSettings() {
    return JSON.parse(localStorage.getItem("bidSettings")) || {};
}
