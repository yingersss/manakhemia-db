/* JavaScript: script.js */
const itemList = document.getElementById('item-list');
const searchBar = document.getElementById('searchBar');
let itemData = [];
let synthesisData = [];
let weaponsData = [];
let armorData = [];
let accessoryData = [];
let useableData = [];
let recipeData = [];

// Load material JSON file
fetch('material.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load material.json');
        }
        return response.json();
    })
    .then(data => {
        itemData = data;
        return fetch('synthesis.json');
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load synthesis.json');
        }
        return response.json();
    })
    .then(data => {
        synthesisData = data;
        itemData = itemData.concat(synthesisData);
		return fetch('weapons.json');
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Failed to load weapons.json');
		}
		return response.json();
	})
	.then(data => {
		weaponsData = data;
		itemData = itemData.concat(weaponsData);
		return fetch('armor.json');
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Failed to load armor.json');
		}
		return response.json();
	})
	.then(data => {
		armorData = data;
		itemData = itemData.concat(armorData);
		return fetch('accessory.json');
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Failed to load accessory.json');
		}
		return response.json();
	})
	.then(data => {
		accessoryData = data;
		itemData = itemData.concat(accessoryData);
		return fetch('useable.json');
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Failed to load useable.json');
		}
		return response.json();
	})
	.then(data => {
		useableData = data;
		itemData = itemData.concat(useableData);
		displayItems(itemData);
        // Search Functionality
        searchBar.addEventListener('input', () => {
            const query = searchBar.value.toLowerCase();
            const filteredItems = itemData.filter(item => item.name.toLowerCase().includes(query));
            displayItems(filteredItems);
        });
    })
    .catch(error => {
        console.error('Error loading item data:', error);
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
        });
        itemList.appendChild(itemElement);
    });
}