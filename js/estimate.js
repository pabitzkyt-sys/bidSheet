const settings = getSettings();

// ---------- LOAD DEFAULTS ----------
document.getElementById("laborRate").value =
    settings.standardRate || 0;

document.getElementById("hoursPerWeek").value =
    settings.hoursPerWeek || 40;

document.getElementById("profit").value =
    settings.profitMargin || 20;


// ---------- PARTS ----------
function addPart() {

    const tbody = document.getElementById("partsBody");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input class="partName"></td>
        <td><input type="number" class="qty" value="1"></td>
        <td><input type="number" class="cost" value="0"></td>
        <td><input type="number" class="tax" value="0"></td>
        <td class="total">0</td>
        <td><button onclick="this.parentElement.parentElement.remove(); calc()">X</button></td>
    `;

    tbody.appendChild(row);

    row.querySelectorAll("input").forEach(i =>
        i.addEventListener("input", calc)
    );

    calc();
}

//--------LOAD CUSTOMER----------
function loadCustomersIntoDropdown() {

    const select = document.getElementById("customerSelect");
    if (!select) return;

    const customers = getCustomers();

    select.innerHTML = `<option value="">Select Customer</option>`;

    customers.forEach((c, i) => {

        const opt = document.createElement("option");

        opt.value = i;
        opt.textContent = c.name;

        select.appendChild(opt);
    });

    select.addEventListener("change", () => {

        const c = customers[select.value];

        if (!c) return;

        document.getElementById("address").value = c.address || "";
        document.getElementById("contact").value = c.phone || "";
    });
}

loadCustomersIntoDropdown();

//---- save estimate------
function saveEstimate() {

    const estimate = {
        jobName: document.getElementById("jobName").value,
        customer: document.getElementById("customer").value,
        address: document.getElementById("address").value,
        contact: document.getElementById("contact").value,
        elevators: document.getElementById("elevators").value,
        groups: document.getElementById("groups").value
    };

    const saved = JSON.parse(localStorage.getItem("estimates")) || [];
    saved.push(estimate);

    localStorage.setItem("estimates", JSON.stringify(saved));

    alert("Estimate saved");
}
// ---------- CALCULATIONS ----------
function calc() {

    const weeks = +document.getElementById("weeks").value || 0;
    const hoursWeek = +document.getElementById("hoursPerWeek").value || 0;
    const rate = +document.getElementById("laborRate").value || 0;

    const laborHours = weeks * hoursWeek;
    const laborCost = laborHours * rate;

    document.getElementById("laborHours").innerText = laborHours.toFixed(2);
    document.getElementById("laborCost").innerText = laborCost.toFixed(2);

    // PARTS
    let partsTotal = 0;

    document.querySelectorAll("#partsBody tr").forEach(row => {

        const qty = +row.querySelector(".qty").value || 0;
        const cost = +row.querySelector(".cost").value || 0;
        const tax = +row.querySelector(".tax").value || 0;

        const base = qty * cost;
        const taxAmt = base * (tax / 100);
        const total = base + taxAmt;

        row.querySelector(".total").innerText = total.toFixed(2);

        partsTotal += total;
    });

    document.getElementById("partsTotal").innerText =
        partsTotal.toFixed(2);

    // SUMMARY
    const subtotal = laborCost + partsTotal;
    const profitPct = +document.getElementById("profit").value || 0;

    const profitValue = subtotal * (profitPct / 100);
    const grandTotal = subtotal + profitValue;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("profitValue").innerText = profitValue.toFixed(2);
    document.getElementById("grandTotal").innerText = grandTotal.toFixed(2);
}


// auto run
document.querySelectorAll("input").forEach(i =>
    i.addEventListener("input", calc)
);

calc();
