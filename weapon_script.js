let weapons = [];

fetch("weapons.json")
  .then(res => res.json())
  .then(data => {
    weapons = data;
    displayWeapons(weapons);
  });

function displayWeapons(list) {
  const container = document.getElementById("weapon-list");
  container.innerHTML = "";

  list.forEach(w => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${w.image}">
      <h3>${w.name}</h3>
      <p>Lv.${w.level}</p>
      <p>ATK ${w.atk}</p>
    `;

    card.onclick = () => showDetail(w);

    container.appendChild(card);
  });
}

function showDetail(w) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  content.innerHTML = `
    <h2>${w.name}</h2>
    <img src="${w.image}" style="width:100%">
    <p>Level: ${w.level}</p>
    <p>Attack: ${w.atk}</p>
    <p>Category: ${w.category}</p>
    <p>${w.description || ""}</p>
    <p>スキル: ${(w.skills || []).join(", ")}</p>
  `;

  modal.classList.remove("hidden");

  modal.onclick = () => modal.classList.add("hidden");
}

/* 検索機能 */
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  const filtered = weapons.filter(w =>
    w.name.toLowerCase().includes(value) ||
    w.category.toLowerCase().includes(value) ||
    w.level.toString().includes(value)
  );

  displayWeapons(filtered);
});
