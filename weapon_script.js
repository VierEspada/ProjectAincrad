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
  })
  .catch(err => console.error("JSON error:", err));

// 一覧表示
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
    `;

    // チェック管理
    card.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) {
        selected.push(w);
      } else {
        selected = selected.filter(i => i !== w);
      }
    });

    // ★ 詳細表示（安定版）
    card.addEventListener("click", (e) => {
      if (e.target.closest("input")) return;
      showDetail(w);
    });

    container.appendChild(card);
  });
}

// ★ 詳細表示
function showDetail(w) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  let html = `
    <div class="compare-box">
      <h2>${w.name}</h2>
      <img src="${w.image}" onerror="this.style.display='none'" style="width:180px; display:block; margin:auto;">
  `;

  order.forEach(key => {
    if (w[key] !== undefined) {
      let value = w[key];

      if (typeof value === "boolean") {
        value = value ? "Yes" : "No";
      }

      html += `<p><strong>${key}:</strong> ${value}</p>`;
    }
  });

  html += `</div>`;

  content.innerHTML = html;
  modal.classList.remove("hidden");

  modal.onclick = () => modal.classList.add("hidden");
}

// 比較ボタン
document.getElementById("compareBtn").addEventListener("click", () => {
  if (selected.length < 2) {
    alert("2つ以上選んでください");
    return;
  }

  showCompare(selected);
});

// ★ 比較表示（安全版）
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

    // 数値変換（バグ対策）
    let numericValues = values
      .map(v => Number(v))
      .filter(v => !isNaN(v));

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

// 検索（0対応済み）
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  const filtered = weapons.filter(w =>
    (w.name || "").toLowerCase().includes(value) ||
    (w.category || "").toLowerCase().includes(value) ||
    String(w.requiredLevel ?? "").includes(value)
  );

  displayWeapons(filtered);
});
