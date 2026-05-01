fetch("horunka.json")
  .then(res => res.json())
  .then(data => {
    createList("wshopList", data.wshop);
    createList("ishopList", data.ishop);
    createList("zakkaList", data.zakka);
    createList("questList", data.quests);
    createList("chestList", data.chests);
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
