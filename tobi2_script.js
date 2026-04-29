fetch("tobi2.json")
.then(response => {
    if (!response.ok) throw new Error("JSONの読み込みに失敗");
    return response.json();
})
.then(data => {

    const currency = "Col";

    // ===== ショップ情報 =====
    document.getElementById("shop-name").textContent = data.name;
    document.getElementById("shop-description").textContent = data.description;
    document.title = data.name;

    const shopImage = document.getElementById("shop-image");
    if (data.image) {
        shopImage.src = data.image;
    } else {
        shopImage.style.display = "none";
    }

    const itemList = document.getElementById("item-list");

    if (!data.items || data.items.length === 0) {
        itemList.innerHTML = "<p>商品がありません</p>";
        return;
    }

    const format = num => typeof num === "number" ? num.toLocaleString() : num;

    // ===== カテゴリごとの箱 =====
    const categories = {
        weapon: {
            title: "武器",
            container: document.createElement("div")
        },
        item: {
            title: "アイテム",
            container: document.createElement("div")
        }
    };

    // ===== タイトル追加 =====
    Object.values(categories).forEach(cat => {
        const h2 = document.createElement("h2");
        h2.textContent = cat.title;
        cat.container.appendChild(h2);
    });

    // ===== アイテム生成 =====
    data.items.forEach(item => {

        const div = document.createElement("div");
        div.classList.add("item");

        if (item.link) {
            div.addEventListener("click", () => {
                window.location.href = item.link;
            });
        }

        div.innerHTML = `
            <img src="${item.image || ""}">
            <div class="item-info">
                <strong>${item.name}</strong>
                <span class="buy">買値: ${format(item.buy)} ${currency}</span>
                <span class="sell">売値: ${format(item.sell)} ${currency}</span>
            </div>
        `;

        // ===== カテゴリ振り分け =====
        if (categories[item.category]) {
            categories[item.category].container.appendChild(div);
        }

    });

    // ===== 表示 =====
    Object.values(categories).forEach(cat => {
        itemList.appendChild(cat.container);
    });

})
.catch(err => {
    console.error(err);
    document.getElementById("shop-name").textContent = "読み込みエラー";
});
