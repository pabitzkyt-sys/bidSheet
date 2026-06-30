function getSettings() {
    return JSON.parse(localStorage.getItem("bidSettings")) || {};
}

function getCustomers() {
    return JSON.parse(localStorage.getItem("customers")) || [];
}

function getParts() {
    return JSON.parse(localStorage.getItem("partsLibrary")) || [];
}

function getEstimates() {
    return JSON.parse(localStorage.getItem("estimates")) || [];
}

function saveEstimates(data) {
    localStorage.setItem("estimates", JSON.stringify(data));
}
