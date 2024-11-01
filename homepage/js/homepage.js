// script.js
document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'Tai Nghe Bluetooth Sony WF-1000XM4', price: 4990000, image: '../img/tainghe1.jpg' },
        { id: 2, name: 'Tai Nghe AirPods Pro', price: 5290000, image: '../img/tainghe2.jpg' },
        { id: 3, name: 'Cáp Sạc Anker Powerline+ II', price: 299000, image: '../img/capsac1.jpg' },
        { id: 4, name: 'Cáp Sạc Type-C Ugreen', price: 199000, image: '../img/capsac2.jpg' },
        { id: 5, name: 'Ốp Lưng Silicon iPhone 14 Pro', price: 250000, image: '../img/oplung1.jpg' },
        { id: 6, name: 'Ốp Lưng Chống Sốc Samsung Galaxy S23', price: 320000, image: '../img/oplung2.jpg' },
        { id: 7, name: 'Sạc Dự Phòng Xiaomi 10000mAh', price: 399000, image: '../img/sacdp1.jpg' },
        { id: 8, name: 'Sạc Dự Phòng Anker PowerCore 20000mAh', price: 799000, image: '../img/sacdp2.jpg' }
    ];

    const productsContainer = document.querySelector('#featured-products .row');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users')) || [];

    function updateCart() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    function addToCart(product) {
        if (!currentUser) {
            showDialog();
            return;
        }

        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({...product, quantity: 1 });
        }
        updateCart();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function showDialog() {
        document.getElementById('customDialog').style.display = 'block';
    }

    function closeDialog() {
        document.getElementById('customDialog').style.display = 'none';
    }
    document.querySelector('#customDialog button').addEventListener('click', closeDialog);

    function updateUserInterface() {
        const authLinks = document.querySelector('.auth-links');
        const userInfo = document.getElementById('userInfo');

        if (currentUser) {
            authLinks.style.display = 'none';
            userInfo.style.display = 'block';
            userInfo.innerHTML = `
                <div class="user" style="display: inline;">
                    <span class="navbar-text me-3">
                        <img src="../img/anhdaidien.jpg" alt="User Avatar"  style="width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; background-size: cover; background-position: center; class="rounded-circle me-2">
                    ${currentUser.name}
                    </span>
                    <button class="btn btn-outline-secondary btn-sm" id="logoutButton"   style = "margin-top: -50px; margin-left: 10px;">Đăng xuất</button>
                </div>
            `;
            document.getElementById('logoutButton').addEventListener('click', logout);
        } else {
            authLinks.style.display = 'flex';
            userInfo.style.display = 'none';
        }
    }

    function login(email, password) {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = { name: user.name, email: user.email };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUserInterface();
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
            alert('Đăng nhập thành công!');
        } else {
            alert('Email hoặc mật khẩu không đúng. Vui lòng thử lại hoặc đăng ký nếu bạn chưa có tài khoản.');
        }
    }

    function register(name, email, password) {
        if (users.some(u => u.email === email)) {
            alert('Email đã được sử dụng. Vui lòng chọn email khác.');
            return false;
        }
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        return true;
    }

    function logout() {
        currentUser = null;
        localStorage.removeItem('currentUser');
        cartItems = [];
        localStorage.removeItem('cartItems');
        updateUserInterface();
        updateCart();
    }

    // Render sản phẩm
    function renderProducts() {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'col-md-3 mb-4';
            productElement.innerHTML = `
                <div class="card product-card">
                    <h5 class="card-title product-name">${product.name}</h5>
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <p class="card-text product-price">${product.price.toLocaleString('vi-VN')} đ</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productElement);
        });
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                addToCart(product);
            });
        });
    }
    // Xử lý hiển thị giỏ hàng
    const cartButton = document.getElementById('cartButton');
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));

    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (!currentUser) {
            showDialog();
            return;
        }
        // Chuyển hướng đến trang giỏ hàng 
        window.location.href = "../../shopppingcard/html/shopping cart.html";
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        let totalPrice = 0;

        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });

        cartTotal.textContent = totalPrice.toLocaleString('vi-VN') + ' đ';
        cartModal.show();
    });

    // Xử lý đăng nhập
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        login(email, password);
    });
    // Xử lý đăng ký
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        if (register(name, email, password)) {
            bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).show();
        }
    });

    // Xử lý thanh toán
    const checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.addEventListener('click', function() {
        alert('Chức năng thanh toán sẽ được triển khai sau!');
        cartModal.hide();
    });

    // Khởi tạo giao diện người dùng và render sản phẩm
    updateUserInterface();
    renderProducts();
    updateCart();
});