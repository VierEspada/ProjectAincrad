let weapons = [];

// 表示ラベル
const labels = {
  name: "Weapon Name",
  requiredLevel: "Required Level",
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
  })
  .catch(err => console.error("JSONエラー:", err));

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
      <p>Lv.${w.requiredLevel ?? "-"}</p>
    `;

    card.onclick = () => showDetail(w);

    container.appendChild(card);
  });
}

// 詳細表示（2カラム）
function showDetail(w) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  let right = `<h2>${w.name}</h2>`;

  order.forEach(key => {
    if (w[key] !== undefined) {
      let value = w[key];

      if (Array.isArray(value)) value = value.join(", ");
      if (value === true) value = "Yes";
      if (value === false) value = "No";

      if (key === "requiredLevel") value += " Lv";
      if (key === "buyPrice") value += " Col";
      if (key === "sellValue") value += " Col";
      if (key === "range") value += " m";
      if (key === "weight") value += " kg";

      right += `<p><strong>${labels[key] || key}:</strong> ${value}</p>`;
    }
  });

  content.innerHTML = `
    <div class="modal-left">
      <img src="${w.image}">
    </div>
    <div class="modal-right">
      ${right}
    </div>
  `;

  modal.classList.remove("hidden");
  modal.onclick = () => modal.classList.add("hidden");
}

// 🔥 検索バグ修正済み（0対応）
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  const filtered = weapons.filter(w =>
    (w.name || "").toLowerCase().includes(value) ||
    (w.category || "").toLowerCase().includes(value) ||
    String(w.requiredLevel ?? "").includes(value)
  );

  displayWeapons(filtered);
});
