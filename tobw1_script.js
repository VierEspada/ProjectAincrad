fetch("tobw1.json")
.then(response => {
    if (!response.ok) {
        throw new Error("JSONの読み込みに失敗しました");
    }
    return response.json();
})
.then(data => {

    // ===== ショップ情報 =====
    document.getElementById("shop-name").textContent = data.name || "ショップ名不明";
    document.getElementById("shop-description").textContent = data.description || "";

    // タイトル変更
    document.title = data.name || "Shop";

    // 画像（なければ非表示）
    const shopImage = document.getElementById("shop-image");
    if (data.image) {
        shopImage.src = data.image;
        shopImage.alt = data.name;
    } else {
        shopImage.style.display = "none";
    }

    // ===== アイテム一覧 =====
    const itemList = document.getElementById("item-list");

    if (!data.items || data.items.length === 0) {
        itemList.innerHTML = "<p>商品がありません</p>";
        return;
    }

    data.items.forEach(item => {

        const div = document.createElement("div");
        div.classList.add("item");

        // 値の安全処理
        const attack = item.attack || "-";
        const buy = item.buy ?? "-";
        const sell = item.sell ?? "-";

        div.innerHTML = `
            <img src="${item.image || ""}" alt="${item.name || "item"}">
            <div class="item-info">
                <strong>${item.name || "名称不明"}</strong>
                <span>レベル: ${item.level ?? "-"}</span>
                <span>攻撃力: ${attack}</span>
                <span>攻撃方法: ${item.type || "-"}</span>
                <span class="buy">買値: ${buy}G</span>
                <span class="sell">売値: ${sell}G</span>
            </div>
        `;

        itemList.appendChild(div);
    });

})
.catch(error => {
    console.error(error);
    document.getElementById("shop-name").textContent = "読み込みエラー";
});
