let weapons = [];
let selected = [];

// 表示順
const order = [
  "name",
  "requiredLevel",
  "attack",
  "buyPrice",
  "sellValue",
  "type",
  "category",
  "range",
  "weight",
  "strength",
  "agility",
  "unbreakable",
  "tradeable",
  "skin"
];

// 表示名
const labels = {
  name: "Name",
  requiredLevel: "Required Level",
  attack: "Attack",
  buyPrice: "Buy Price",
  sellValue: "Sell Value",
  type: "Type",
  category: "Category",
  range: "Range",
  weight: "Weight",
  strength: "Strength",
  agility: "Agility",
  unbreakable: "Unbreakable",
  tradeable: "Tradeable",
  skin: "Skin"
};

fetch("weapons.json")
  .then(res => res.json())
  .then(data => {
    weapons = data;
    displayWeapons(weapons);
  });

function displayWeapons(list) {
  const container = document.getElementById("weapon-list");
  container.innerHTML = "";

  list.forEach((w) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <input type="checkbox">
      <img src="${w.image}" onerror="this.style.display='none'">
      <h3>${w.name}</h3>
      <p>Lv.${w.requiredLevel}</p>
      <p>ATK ${w.attack}</p>
    `;

    card.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) {
        selected.push(w);
      } else {
        selected = selected.filter(i => i !== w);
      }
    });

    card.addEventListener("click", (e) => {
      if (e.target.closest("input")) return;
      showDetail(w);
    });

    container.appendChild(card);
  });
}

// 詳細表示
function showDetail(w) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  const bool = v => v ? "Yes" : "No";

  let stats = "";

  order.forEach(key => {
    if (w[key] !== undefined && w[key] !== null) {
      let value = w[key];

      if (typeof value === "boolean") {
        value = bool(value);
      }

      stats += `
        <p>
          <strong>${labels[key]}:</strong> ${value}
        </p>
      `;
    }
  });

  content.innerHTML = `
    <div class="compare-box">
      <div class="detail-flex">
        <img src="${w.image}" onerror="this.style.display='none'">

        <div class="detail-stats">
          <h2>${w.name}</h2>
          ${stats}
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.onclick = () => modal.classList.add("hidden");
}

// 比較
document.getElementById("compareBtn").addEventListener("click", () => {
  if (selected.length < 2) {
    alert("2つ以上選んでください");
    return;
  }

  showCompare(selected);
});

function showCompare(list) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  let html = `<div class="compare-box"><table><tr><th>Stat</th>`;

  list.forEach(w => {
    html += `<th>${w.name}</th>`;
  });

  html += `</tr>`;

  order.forEach(key => {
    html += `<tr><td>${labels[key]}</td>`;

    let values = list.map(w => w[key] ?? "-");
    let numericValues = values.map(v => Number(v)).filter(v => !isNaN(v));
    let max = numericValues.length ? Math.max(...numericValues) : null;

    values.forEach(v => {
      let num = Number(v);
      let cls = (max !== null && num === max) ? "better" : "";

      html += `<td class="${cls}">${v}</td>`;
    });

    html += `</tr>`;
  });

  html += `</table></div>`;

  content.innerHTML = html;

  modal.classList.remove("hidden");
  modal.onclick = () => modal.classList.add("hidden");
}

// 検索
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  const filtered = weapons.filter(w =>
    (w.name || "").toLowerCase().includes(value) ||
    (w.category || "").toLowerCase().includes(value) ||
    String(w.requiredLevel ?? "").includes(value) ||
    String(w.attack ?? "").includes(value)
  );

  displayWeapons(filtered);
});
