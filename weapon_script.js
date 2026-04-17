let weapons = [];

// ラベル
const labels = {
  name: "Weapon Name",
  requiredLevel: "Required Level",
  buyPrice: "Buy Price",
  sellValue: "Sell Value",
  category: "Category",
  range: "Range",
  weight: "Weight",
  strength: "Strength",
  agility: "Agility",
  unbreakable: "Unbreakable",
  tradeable: "Tradeable",
  skin: "Skin"
};

// 表示順
const order = [
  "name",
  "requiredLevel",
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

// データ読み込み
fetch("weapons.json")
  .then(res => res.json())
  .then(data => {
    weapons = data;
    displayWeapons(weapons);
  });

// 一覧表示
function displayWeapons(list) {
  const container = document.getElementById("weapon-list");
  container.innerHTML = "";

  list.forEach(w => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${w.image}">
      <h3>${w.name}</h3>
      <p>Lv.${w.requiredLevel || "-"}</p>
    `;

    card.onclick = () => showDetail(w);

    container.appendChild(card);
  });
}

// 詳細表示
function showDetail(w) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  let html = `<h2>${w.name}</h2>`;
  html += `<img src="${w.image}" style="width:100%">`;

  // 指定項目（順番固定）
  order.forEach(key => {
    if (w[key] !== undefined) {
      let value = w[key];

      if (Array.isArray(value)) {
        value = value.join(", ");
      }

      // true/false変換
      if (key === "requiredLevel") value = value + " Lv";
      if (key === "buyPrice") value = value + " Col";
      if (key === "sellValue") value = value + " Col";
      if (key === "range") value = value + " m";
      if (value === true) value = "Yes";
      if (value === false) value = "No";

      html += `<p><strong>${labels[key]}:</strong> ${value}</p>`;
    }
  });

  // 追加項目（自由）
  for (let key in w) {
    if (!order.includes(key) && key !== "image") {
      let value = w[key];

      if (Array.isArray(value)) {
        value = value.join(", ");
      }

      html += `<p><strong>${key}:</strong> ${value}</p>`;
    }
  }

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
    (w.requiredLevel || "").toString().includes(value)
  );

  displayWeapons(filtered);
});
