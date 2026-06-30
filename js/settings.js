function saveSettings() {

    const settings = {
        companyName: document.getElementById("companyName").value,
        companyPhone: document.getElementById("companyPhone").value,
        companyEmail: document.getElementById("companyEmail").value,
        companyAddress: document.getElementById("companyAddress").value,

        standardRate: parseFloat(document.getElementById("standardRate").value) || 0,
        otRate: parseFloat(document.getElementById("otRate").value) || 0,
        dtRate: parseFloat(document.getElementById("dtRate").value) || 0,
        hoursPerWeek: parseFloat(document.getElementById("hoursPerWeek").value) || 40,

        taxRate: parseFloat(document.getElementById("taxRate").value) || 0,
        taxLabor: document.getElementById("taxLabor").checked,
        taxParts: document.getElementById("taxParts").checked,

        profitMargin: parseFloat(document.getElementById("profitMargin").value) || 0,
        overhead: parseFloat(document.getElementById("overhead").value) || 0
    };

    localStorage.setItem("bidSettings", JSON.stringify(settings));

    alert("Settings saved");
}

function loadSettings() {

    const data = JSON.parse(localStorage.getItem("bidSettings"));
    if (!data) return;

    document.getElementById("companyName").value = data.companyName || "";
    document.getElementById("companyPhone").value = data.companyPhone || "";
    document.getElementById("companyEmail").value = data.companyEmail || "";
    document.getElementById("companyAddress").value = data.companyAddress || "";

    document.getElementById("standardRate").value = data.standardRate || "";
    document.getElementById("otRate").value = data.otRate || "";
    document.getElementById("dtRate").value = data.dtRate || "";
    document.getElementById("hoursPerWeek").value = data.hoursPerWeek || 40;

    document.getElementById("taxRate").value = data.taxRate || "";
    document.getElementById("taxLabor").checked = data.taxLabor || false;
    document.getElementById("taxParts").checked = data.taxParts ?? true;

    document.getElementById("profitMargin").value = data.profitMargin || "";
    document.getElementById("overhead").value = data.overhead || "";
}

loadSettings();
