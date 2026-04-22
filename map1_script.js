fetch('map1.json')
.then(res => res.json())
.then(data => {
    const map = document.getElementById('map');

    data.forEach(item => {
        const link = document.createElement('a');
        link.href = item.link;

        const icon = document.createElement('img');
        icon.src = getIcon(item.type);
        icon.className = `icon ${item.type}`;
        icon.style.top = item.y + '%';
        icon.style.left = item.x + '%';
        icon.dataset.name = item.name;

        link.appendChild(icon);
        map.appendChild(link);
    });
});


/* アイコン画像切り替え */
function getIcon(type) {
    switch(type) {
        case 'chest': return 'chest.png';
        case 'shop': return 'shop.png';
        case 'quest': return 'quest.png';
        default: return 'icon.png';
    }
}
