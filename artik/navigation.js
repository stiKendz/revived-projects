const ordersButton = document.getElementById('orders-button');
const profileButton = document.getElementById('profile-button');
const tomainPageButton = document.getElementById('tomainpage-button');

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

if (tomainPageButton) {
    tomainPageButton.addEventListener('click', () => {
        window.location.href = './index.html';
    });
};