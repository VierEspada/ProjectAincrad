let items = [];

// データ取得
fetch("item.json")
  .then(res => res.json())
  .then(data => {
    items = data;
    displayItems(items);
  });

// 一覧表示
function displayItems(list) {
  const container = document.getElementById("item-list");
  container.innerHTML = "";

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}" onerror="this.style.display='none'">
      <h3>${item.name}</h3>
    `;

    card.addEventListener("click", () => {
      if (item.page) {
        window.location.href = item.page;
      }
    });

    container.appendChild(card);
  });
}

// 検索（ここが重要）
const search = document.getElementById("search");

if (search) {
  search.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    const filtered = items.filter(i =>
      (i.name || "").toLowerCase().includes(value)
    );

    displayItems(filtered);
  });
}

// ホーム
function goHome() {
  window.location.href = "index.html";
}
