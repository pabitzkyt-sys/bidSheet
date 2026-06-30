function getCustomers() {
    return JSON.parse(localStorage.getItem("customers")) || [];
}

function saveCustomers(data) {
    localStorage.setItem("customers", JSON.stringify(data));
    render();
}

function addCustomer() {

    const name = document.getElementById("custName").value;
    const address = document.getElementById("custAddress").value;
    const phone = document.getElementById("custPhone").value;

    const data = getCustomers();

    data.push({ name, address, phone });

    saveCustomers(data);
}

function render() {

    const list = document.getElementById("customerList");
    if (!list) return;

    const data = getCustomers();

    list.innerHTML = "";

    data.forEach((c, i) => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${c.name} - ${c.phone}
            <button onclick="deleteCustomer(${i})">X</button>
        `;

        list.appendChild(li);
    });
}

function deleteCustomer(i) {
    const data = getCustomers();
    data.splice(i, 1);
    saveCustomers(data);
}

render();
