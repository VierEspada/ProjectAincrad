fetch("tob.json")
.then(res => {
    if (!res.ok) throw new Error("JSON読み込み失敗");
    return res.json();
})
.then(data => {

    // ===== 汎用リスト生成関数 =====
    const createList = (id, items) => {
        const ul = document.getElementById(id);
        if (!ul || !items) return;

        items.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");

            a.textContent = item.name;
            a.href = item.link;

            li.appendChild(a);
            ul.appendChild(li);
        });
    };

    // ===== 各カテゴリ =====
    createList("shopList", data.shops);
    createList("npcList", data.npcs);
    createList("zakkaList", data.zakka);
    createList("questList", data.quests);
    createList("chestList", data.chests);
    createList("innList", data.inns);

})
.catch(err => {
    console.error(err);
});
