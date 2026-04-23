fetch("map1.json")
  .then(res => res.json())
  .then(data => {
    createList("townList", data.towns);
    createList("regionList", data.regions);
    createList("chestList", data.chests);
    createList("questList", data.quests);
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
