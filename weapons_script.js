const searchBox = document.getElementById("searchBox");
const cards = document.querySelectorAll(".weapon-card");

searchBox.addEventListener("keyup", function () {

let text = searchBox.value.toLowerCase();

cards.forEach(card => {

let name = card.innerText.toLowerCase();

if(name.includes(text)){
card.style.display = "block";
}else{
card.style.display = "none";
}

});

});
