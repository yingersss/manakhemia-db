/* JavaScript: item-detail.js 
test */
const itemDetail = document.getElementById('item-detail');
const params = new URLSearchParams(window.location.search);
const itemName = params.get('name');

// Load material JSON file
fetch('material.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load material.json');
        }
        return response.json();
    })
    .then(data => {
        const item = data.find(i => i.name === itemName);
        if (item) {
            displayItemDetails(item);
        } else {
            loadSynthesisItem();
        }
    })
    .catch(error => {
        console.error('Error loading item details:', error);
    });

// Load synthesis item if not found in materials
function loadSynthesisItem() {
    fetch('synthesis.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load synthesis.json');
            }
            return response.json();
        })
        .then(data => {
            const item = data.find(i => i.name === itemName);
            if (item) {
                displayItemDetails(item);
            } else {
                loadWeapons();
            }
        })
        .catch(error => {
            console.error('Error loading synthesis item details:', error);
        });
}
// Load weapon items if not found in synthesis
function loadWeapons() {
    fetch('weapons.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load weapons.json');
            }
            return response.json();
        })
        .then(data => {
            const item = data.find(i => i.name === itemName);
            if (item) {
                displayItemDetails(item);
            } else {
                loadArmor();
            }
        })
        .catch(error => {
            console.error('Error loading weapon item details:', error);
        });
}
// Load synthesis items if not found in weapons
function loadArmor() {
    fetch('armor.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load armor.json');
            }
            return response.json();
        })
        .then(data => {
            const item = data.find(i => i.name === itemName);
            if (item) {
                displayItemDetails(item);
            } else {
                loadAccessories();
            }
        })
        .catch(error => {
            console.error('Error loading armor item details:', error);
        });
}
// Load accessory item if not found in synthesis
function loadAccessories() {
    fetch('accessory.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load accessory.json');
            }
            return response.json();
        })
        .then(data => {
            const item = data.find(i => i.name === itemName);
            if (item) {
                displayItemDetails(item);
            } else {
                loadUsableItem();
            }
        })
        .catch(error => {
            console.error('Error loading accessory item details:', error);
        });
}

// Load usable items if not found in other categories
function loadUsableItem() {
    fetch('useable.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load useable.json');
            }
            return response.json();
        })
        .then(data => {
            const item = data.find(i => i.name === itemName);
            if (item) {
                displayItemDetails(item);
            } else {
                itemDetail.innerHTML = '<p>Item not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading usable item details:', error);
        });
}


function displayItemDetails(item) {
    let details = `
        <div class="item-detail-header">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h2>${item.name}</h2>
                <p>Type: ${item.type}</p>
            </div>
        </div>
        <div class="item-detail-content">
			${item.description ? `<div class = "category-info"><p>${item.description}</p></div>` : ''}
			${item.original_recipe ? `<div class="category-info"><p>Original Recipe: ${item.original_recipe.reference}</p></div>` : ''}
            ${item.quality !== undefined ? `<div class="category-info"><p>Quality: ${item.quality}</p></div>` : ''}
			${item.effect ? `<div class="category-info"><p>Effect: ${item.effect}</p></div>` : ''}
			${item.target ? `<div class="category-info"><p>Target: ${item.target}</p></div>` : ''}
            ${item['gathering spot'] ? `<div class="category-info"><p>${item['gathering spot']}</p></div>` : ''}
            ${item.tools ? `<div class="category-info"><p>Tools: ${item.tools}</p></div>` : ''}
            ${item['e-effect'] ? `<div class="category-info"><p>Effect: ${item['e-effect']}</p></div>` : ''}
            ${item.items_needed ? displayItemsNeeded(item.items_needed) : ''}
            ${item.stats ? displayStats(item.stats) : ''}
			${item.idea_trigger ? `<div class="category-info"><p>Idea Trigger: ${item.idea_trigger}</p></div>` : ''}
        </div>`;
    itemDetail.innerHTML = details;
}

function displayItemsNeeded(itemsNeeded) {
    let itemsHTML = '<div class="category-info"><p>Items Needed:</p><ul>';
    itemsNeeded.forEach(needed => {
        if (needed.reference) {
            itemsHTML += `<li><a href="item-detail.html?name=${encodeURIComponent(needed.reference)}">${needed.reference}</a></li>`;
        } else if (needed.alternatives) {
            itemsHTML += '<li>';
            itemsHTML += needed.alternatives.map(alt => {
                return `<a href="item-detail.html?name=${encodeURIComponent(alt.reference)}">${alt.reference}</a>`;
            }).join(', ');
            itemsHTML += '</li>';
        }
    });
    itemsHTML += '</ul></div>';
    return itemsHTML;
}


function displayStats(stats) {
    let statsHTML = '<div class="category-info"><p>Stats:</p><ul>';
    for (const [key, value] of Object.entries(stats)) {
        statsHTML += `<li>${key}: ${value}</li>`;
    }
    statsHTML += '</ul></div>';
    return statsHTML;
}