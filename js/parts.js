function getParts() {
    return JSON.parse(localStorage.getItem("partsLibrary")) || [];
}

function saveParts(parts) {
    localStorage.setItem("partsLibrary", JSON.stringify(parts));
    render();
}

function addPart() {

    const name = document.getElementById("partName").value;
    const cost = document.getElementById("partCost").value;
    const tax = document.getElementById("partTax").value;

    const parts = getParts();

    parts.push({
        name,
        cost,
        tax
    });

    saveParts(parts);
}

function render() {

    const list = document.getElementById("partsList");
    if (!list) return;

    const parts = getParts();

    list.innerHTML = "";

    parts.forEach((p, i) => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${p.name} - $${p.cost} - ${p.tax}%
            <button onclick="deletePart(${i})">X</button>
        `;

        list.appendChild(li);
    });
}

function deletePart(index) {

    const parts = getParts();
    parts.splice(index, 1);
    saveParts(parts);
}

render();
