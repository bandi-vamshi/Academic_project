document.addEventListener('DOMContentLoaded', () => {
    const trackingData = JSON.parse(localStorage.getItem('trackingData')) || {};
    
    const trackingInfo = document.getElementById('trackingInfo');
    const progressBar = document.getElementById('progressBar');

    if (Object.keys(trackingData).length === 0) {
        trackingInfo.innerHTML = '<p>No tracking information available.</p>';
    } else {
        trackingInfo.innerHTML = `
            <p><strong>Product Name:</strong> ${trackingData.name}</p>
            <p><strong>Price:</strong> Rs ${trackingData.price}</p>
            <p><strong>Description:</strong> ${trackingData.description}</p>
            <p><strong>Order Status:</strong> ${trackingData.status || 'Processing'}</p>
            <p><strong>Estimated Delivery:</strong> ${trackingData.estimatedDelivery || 'N/A'}</p>
        `;
        
        const status = trackingData.status || 'Processing';
        const statusMap = {
            'Order Placed': 20,
            'Processing': 40,
            'Shipped': 60,
            'Out for Delivery': 80,
            'Delivered': 100
        };
        progressBar.style.width = `${statusMap[status] || 20}%`;
    }
});