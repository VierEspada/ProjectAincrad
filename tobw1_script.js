fetch("tobw1.json")
.then(response => response.json())
.then(data => {

    // ショップ情報
    document.getElementById("shop-name").textContent = data.name;
    document.getElementById("shop-image").src = data.image;
    document.getElementById("shop-description").textContent = data.description;

    // アイテム一覧
    const itemList = document.getElementById("item-list");

    data.items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
            <img src="${item.image}">
            <div class="item-info">
                <strong>${item.name}</strong>
                <span>レベル: ${item.level}</span>
                <span>攻撃力: ${item.attack}</span>
                <span>攻撃方法: ${item.type}</span>
                <span>買値: ${item.buy}G</span>
                <span>売値: ${item.sell}G</span>
            </div>
        `;

        itemList.appendChild(div);
    });

});
