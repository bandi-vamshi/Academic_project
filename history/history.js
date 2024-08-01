document.addEventListener('DOMContentLoaded', () => {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const historyContainer = document.getElementById('orderHistory');

    if (orderHistory.length === 0) {
        historyContainer.innerHTML = '<p>No order history available.</p>';
    } else {
        orderHistory.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'orderItem';
            orderElement.innerHTML = `
                <p><strong>Product Name:</strong> ${order.name}</p>
                <p><strong>Price:</strong> Rs ${order.price}</p>
                <p><strong>Description:</strong> ${order.description}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Estimated Delivery:</strong> ${order.estimatedDelivery}</p>
                <p><strong>Order Date:</strong> ${new Date(order.timestamp).toLocaleDateString()}</p>
            `;
            historyContainer.appendChild(orderElement);
        });
    }
});
