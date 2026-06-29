function addPart() {
  const tbody = document.getElementById("partsBody");

  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input class="name"></td>
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

function calc() {

  // LABOR
  const rate = +document.getElementById("rate").value || 0;
  const weeks = +document.getElementById("weeks").value || 0;
  const hours = +document.getElementById("hoursPerWeek").value || 0;

  const laborHours = weeks * hours;
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

  document.getElementById("partsTotal").innerText = partsTotal.toFixed(2);

  // PROFIT
  const profit = +document.getElementById("profit").value || 0;

  const baseTotal = laborCost + partsTotal;
  const grand = baseTotal + (baseTotal * profit / 100);

  document.getElementById("grandTotal").innerText = grand.toFixed(2);
}

document.querySelectorAll("input").forEach(i =>
  i.addEventListener("input", calc)
);

calc();
