fetch("tob.json")
  .then(res => res.json())
  .then(data => {
    createList("shopList", data.shops);
    createList("npcList", data.npcs);
    createList("questList", data.quests);
    createList("chestList", data.chests);
    createList("innList", data.inns);
  });

function createList(id, items) {
  const list = document.getElementById(id);

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;

    li.onclick = () => {
      window.location.href = item.link;
    };

    list.appendChild(li);
  });
}
