const images = [
  "LoadMap1.png",
  "LoadMap2.png",
  "LoadMap3.png",
  "LoadMap4.png"
];

const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const close = document.getElementById("close");

images.forEach(file => {
  const img = document.createElement("img");
  img.src = "images/" + file;

  img.onclick = () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  };

  gallery.appendChild(img);
});

close.onclick = () => {
  modal.style.display = "none";
};
