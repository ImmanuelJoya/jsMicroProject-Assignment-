document.addEventListener('DOMContentLoaded', () => {
    const fetchBtn = document.getElementById('fetchBtn');
    const itemsContainer = document.getElementById('itemsContainer');

    if (!fetchBtn || !itemsContainer) {
        console.error('Required elements are missing from the DOM.');
        return;
    }

    fetchBtn.addEventListener('click', async () => {
        // Disable button to prevent multiple clicks
        fetchBtn.disabled = true;
        fetchBtn.textContent = 'Loading...';
        itemsContainer.innerHTML = '<p>Loading items...</p>';

        try {
            const response = await fetch('/api/items');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const items = await response.json();
            
            // Clear loading message
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
            itemsContainer.innerHTML = '<p>Error loading items. Please try again.</p>';
            console.error('Error:', error);
        } finally {
            // Re-enable button
            fetchBtn.disabled = false;
            fetchBtn.textContent = 'Load Items';
        }
    });
});