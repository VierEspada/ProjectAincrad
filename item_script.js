let items = [];

// URLから name を取得
const params = new URLSearchParams(window.location.search);
const itemName = decodeURIComponent(params.get("name") || "");

// データ取得
fetch("item.json")
  .then(res => res.json())
  .then(data => {
    items = data;
    showDetail();
  });

function showDetail() {
  const container = document.getElementById("detail");

  // 完全一致じゃなくトリムして比較（バグ防止）
  const item = items.find(i => (i.name || "").trim() === itemName.trim());

  if (!item) {
    container.innerHTML = "<p>アイテムが見つかりません</p>";
    return;
  }

  const bool = v => v ? "Yes" : "No";

  container.innerHTML = `
    <div class="detail-box">
      <img src="${item.image}" onerror="this.style.display='none'">
      <h2>${item.name}</h2>
      <p><strong>Buy Price:</strong> ${item.buyPrice}</p>
      <p><strong>Sell Value:</strong> ${item.sellValue}</p>
      <p><strong>Stack:</strong> ${item.stack}</p>
      <p><strong>Tradeable:</strong> ${bool(item.tradeable)}</p>
    </div>
  `;
}

// ホームへ
function goHome() {
  window.location.href = "index.html";
}
