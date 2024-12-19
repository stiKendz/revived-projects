const ordersButton = document.getElementById('orders-button');
const profileButton = document.getElementById('profile-button');

if (ordersButton) {
    ordersButton.addEventListener('click', () => {
        window.location.href = './order.html';
    });
};

if (profileButton) {
    profileButton.addEventListener('click', () => {
        window.location.href = './profile.html';
    });
};