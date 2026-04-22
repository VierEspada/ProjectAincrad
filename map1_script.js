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

        // ⭐ 中心基準で配置
        icon.style.left = item.x + '%';
        icon.style.top = item.y + '%';

        icon.dataset.name = item.name;

        link.appendChild(icon);
        map.appendChild(link);
    });
});

/* アイコン画像 */
function getIcon(type) {
    switch(type) {
        case 'chest': return 'chest.png';
        case 'shop': return 'shop.png';
        case 'quest': return 'quest.png';
        default: return 'icon.png';
    }
}

/* ⭐ クリックで座標取得（開発用） */
const map = document.getElementById('map');

map.addEventListener('click', function(e) {
    const rect = map.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    console.log(`x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`);
});
