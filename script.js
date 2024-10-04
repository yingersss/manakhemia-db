/* JavaScript: script.js */
const itemList = document.getElementById('item-list');
const searchBar = document.getElementById('searchBar');

// Load material JSON file
fetch('material.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load material.json');
        }
        return response.json();
    })
    .then(data => {
        // Search Functionality
        searchBar.addEventListener('input', () => {
            const query = searchBar.value.toLowerCase();
            const filteredItems = data.filter(item => item.name.toLowerCase().includes(query));
            if (query.length > 0 && filteredItems.length > 0) {
                itemList.classList.remove('hidden');
            } else {
                itemList.classList.add('hidden');
            }
            displayItems(filteredItems);
        });
    })
    .catch(error => {
        console.error('Error loading material.json:', error);
    });

// Display Items Function
function displayItems(items) {
    itemList.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            ${item.quality !== undefined ? `<p>Quality: ${item.quality}</p>` : ''}
        `;
        itemElement.addEventListener('click', () => {
            window.location.href = `item-detail.html?name=${encodeURIComponent(item.name)}`;
            localStorage.setItem('itemDetail', JSON.stringify(item));
        });
        itemList.appendChild(itemElement);
    });
}