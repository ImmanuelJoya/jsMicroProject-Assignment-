document.addEventListener('DOMContentLoaded', () => {
    const fetchBtn = document.getElementById('fetchBtn');
    const itemsContainer = document.getElementById('itemsContainer');

    if (!fetchBtn || !itemsContainer) {
        console.error('Required elements are missing from the DOM.');
        return;
    }

    fetchBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/items');
            const items = await response.json();
            
        // Clear previous content
        itemsContainer.innerHTML = '';

            // Display items
        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                `;
            itemsContainer.appendChild(itemCard);
            });
        } catch (error) {
            itemsContainer.innerHTML = '<p>Error loading items</p>';
            console.error('Error:', error);
        }
    });
});
