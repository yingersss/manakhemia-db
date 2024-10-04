/* JavaScript: item-detail.js */
const itemDetail = document.getElementById('item-detail');
const item = JSON.parse(localStorage.getItem('itemDetail'));

if (item) {
    let details = `
        <div class="item-detail-header">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h2>${item.name}</h2>
                <p>Type: ${item.type}</p>
            </div>
        </div>
        <div class="item-detail-content">
            <p>Description: ${item.description}</p>
            ${item.quality !== undefined ? `<div class="category-info"><p>Quality: ${item.quality}</p></div>` : ''}
            ${item['gathering spot'] ? `<div class="category-info"><p>Gathering Spot: ${item['gathering spot']}</p></div>` : ''}
            ${item.tools ? `<div class="category-info"><p>Tools: ${item.tools}</p></div>` : ''}
            ${item['e-effect'] ? `<div class="category-info"><p>Effect: ${item['e-effect']}</p></div>` : ''}
        </div>
    `;
    itemDetail.innerHTML = details;
}