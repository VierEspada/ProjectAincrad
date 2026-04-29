fetch("cpw1.json")
.then(response => {
    if (!response.ok) {
        throw new Error("JSONの読み込みに失敗しました");
    }
    return response.json();
})
.then(data => {

    const currency = "Col";

    // ===== ショップ情報 =====
    document.getElementById("shop-name").textContent = data.name || "ショップ名不明";
    document.getElementById("shop-description").textContent = data.description || "";
    document.title = data.name || "Shop";

    // ===== ショップ画像 =====
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

    // 数字フォーマット
    const format = num => {
        return (typeof num === "number") ? num.toLocaleString() : num;
    };

    data.items.forEach(item => {

        const div = document.createElement("div");
        div.classList.add("item");

        // ===== クリックでページ遷移 =====
        if (item.link) {
            div.addEventListener("click", () => {
                window.location.href = item.link;
            });
        }

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
                <span class="buy">買値: ${format(buy)} ${currency}</span>
                <span class="sell">売値: ${format(sell)} ${currency}</span>
            </div>
        `;

        itemList.appendChild(div);
    });

})
.catch(error => {
    console.error(error);
    document.getElementById("shop-name").textContent = "読み込みエラー";
});
