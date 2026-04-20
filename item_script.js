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

    card.addEventListener("click", () => showDetail(item));

    container.appendChild(card);
  });
}

// 詳細表示
function showDetail(item) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  const bool = v => v ? "Yes" : "No";

  content.innerHTML = `
    <div class="detail-box">
      <img src="${item.image}" onerror="this.style.display='none'">
      <h2>${item.name}</h2>
      <p><strong>Buy Price:</strong> ${item.buyPrice}</p>
      <p><strong>Sell Value:</strong> ${item.sellValue}</p>
      <p><strong>Stack:</strong> ${item.stack}</p>
      <p><strong>Tradeable:</strong> ${bool(item.tradeable)}</p>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.onclick = () => modal.classList.add("hidden");
}

// 検索（名前のみ）
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  const filtered = items.filter(i =>
    (i.name || "").toLowerCase().includes(value)
  );

  displayItems(filtered);
});

// ホームへ
function goHome() {
  window.location.href = "index.html";
}
