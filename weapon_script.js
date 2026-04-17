let weapons = [];
let selected = [];

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
  "agility"
];

// データ読み込み
fetch("weapons.json")
  .then(res => res.json())
  .then(data => {
    weapons = data;
    displayWeapons(weapons);
  });

// 一覧
function displayWeapons(list) {
  const container = document.getElementById("weapon-list");
  container.innerHTML = "";

  list.forEach((w, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <input type="checkbox" data-index="${index}">
      <img src="${w.image}">
      <h3>${w.name}</h3>
      <p>Lv.${w.requiredLevel}</p>
    `;

    // チェック管理
    card.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) {
        selected.push(w);
      } else {
        selected = selected.filter(i => i !== w);
      }
    });

    container.appendChild(card);
  });
}

// 比較ボタン
document.getElementById("compareBtn").addEventListener("click", () => {
  if (selected.length < 2) {
    alert("2つ以上選んでください");
    return;
  }

  showCompare(selected);
});

// 比較表示
function showCompare(list) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  let html = `<div class="compare-box"><table><tr><th>Stat</th>`;

  list.forEach(w => {
    html += `<th>${w.name}</th>`;
  });

  html += `</tr>`;

  order.forEach(key => {
    html += `<tr><td>${key}</td>`;

    let values = list.map(w => w[key] ?? "-");
    let max = Math.max(...values.filter(v => typeof v === "number"));

    values.forEach(v => {
      let cls = (typeof v === "number" && v === max) ? "better" : "";
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
    String(w.requiredLevel ?? "").includes(value)
  );

  displayWeapons(filtered);
});
