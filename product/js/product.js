document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'Tai Nghe Bluetooth Sony WF-1000XM4', price: 4990000, image: '../img/tainghe1.jpg' },
        { id: 2, name: 'Tai Nghe AirPods Pro', price: 5290000, image: '../img/tainghe2.jpg' },
        { id: 3, name: 'Cáp Sạc Anker Powerline+ II', price: 299000, image: '../img/capsac1.jpg' },
        { id: 4, name: 'Cáp Sạc Type-C Ugreen', price: 199000, image: '../img/capsac2.jpg' },
        { id: 5, name: 'Ốp Lưng Silicon iPhone 14 Pro', price: 250000, image: '../img/oplung1.jpg' },
        { id: 6, name: 'Ốp Lưng Chống Sốc Samsung Galaxy S23', price: 320000, image: '../img/oplung2.jpg' },
        { id: 7, name: 'Sạc Dự Phòng Xiaomi 10000mAh', price: 399000, image: '../img/sacdp1.jpg' },
        { id: 8, name: 'Sạc Dự Phòng Anker PowerCore 20000mAh', price: 799000, image: '../img/sacdp2.jpg' },
        { id: 9, name: 'Tai Nghe Bluetooth JBL Live 300', price: 2290000, image: '../img/tainghe3.jpg' },
        { id: 10, name: 'Tai Nghe Gaming Logitech G435', price: 1490000, image: '../img/tainghe4.jpg' },
        { id: 11, name: 'Cáp Sạc Lightning Baseus', price: 159000, image: '../img/capsac3.jpg' },
        { id: 12, name: 'Cáp Sạc Type-C Aukey Braided', price: 189000, image: '../img/capsac4.jpg' },
        { id: 13, name: 'Ốp Lưng Samsung Galaxy', price: 220000, image: '../img/oplung3.jpg' },
        { id: 14, name: 'Ốp Lưng Silicone Huawei P50 Pro', price: 180000, image: '../img/oplung4.jpg' },
        { id: 15, name: 'Sạc Dự Phòng Samsung 25000mAh', price: 1099000, image: '../img/sacdp3.jpg' },
        { id: 16, name: 'Sạc Dự Phòng Energizer 20000mAh', price: 899000, image: '../img/sacdp4.jpg' },
        { id: 17, name: 'Tai Nghe Bluetooth Bose QuietComfort Earbuds II', price: 6900000, image: '../img/tainghe5.jpg' },
        { id: 18, name: 'Tai Nghe Sony WH-1000XM5', price: 7990000, image: '../img/tainghe6.jpg' },
        { id: 19, name: 'Tai nghe Lightning MFI Ugreen', price: 299000, image: '../img/tainghe9.jpg' },
        { id: 20, name: 'Tai nghe Baseus 1.5m', price: 259000, image: '../img/tainghe10.jpg' },
        { id: 21, name: 'Ốp Lưng Samsung 14', price: 450000, image: '../img/oplung5.jpg' },
        { id: 22, name: 'Ốp Lưng Samsung Mini', price: 290000, image: '../img/oplung6.jpg' },
        { id: 23, name: 'Sạc Dự Phòng ZMI 20000mAh', price: 749000, image: '../img/sacdp5.jpg' },
        { id: 24, name: 'Sạc Dự Phòng Mophie 10000mAh', price: 599000, image: '../img/sacdp6.jpg' },
        { id: 25, name: 'Tai Nghe True Wireless Samsung Galaxy Buds Pro', price: 3990000, image: '../img/tainghe7.jpg' },
        { id: 26, name: 'Tai Nghe In-Ear Sennheiser Momentum 2', price: 6490000, image: '../img/tainghe8.jpg' },
        { id: 27, name: 'Pin sạc dự phòng Anker Powerline III', price: 499000, image: '../img/sacdp7.jpg' },
        { id: 28, name: 'Pin sạc dự phòng Belkin', price: 329000, image: '../img/sacdp8.jpg' }
    ];

    const productsContainer = document.getElementById('productContainer');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Thêm phần tử auth-links vào header
    const navbarCollapse = document.querySelector('.collapse.navbar-collapse');
    if (!document.querySelector('.auth-links')) {
        const authLinks = document.createElement('div');
        authLinks.className = 'auth-links';
        authLinks.innerHTML = `
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</a>
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Đăng ký</a>
        `;
        navbarCollapse.insertBefore(authLinks, document.querySelector('.navbar-nav.ms-2'));
    }

    // Thêm các modal đăng nhập và đăng ký 
    if (!document.getElementById('loginModal')) {
        const loginModal = document.createElement('div');
        loginModal.innerHTML = `
            <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="loginModalLabel">Đăng nhập</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="loginForm">
                                <div class="mb-3">
                                    <label for="loginEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="loginEmail" required>
                                </div>
                                <div class="mb-3">
                                    <label for="loginPassword" class="form-label">Mật khẩu</label>
                                    <input type="password" class="form-control" id="loginPassword" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Đăng nhập</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(loginModal);
    }

    if (!document.getElementById('registerModal')) {
        const registerModal = document.createElement('div');
        registerModal.innerHTML = `
            <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="registerModalLabel">Đăng ký</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="registerForm">
                                <div class="mb-3">
                                    <label for="registerName" class="form-label">Họ và tên</label>
                                    <input type="text" class="form-control" id="registerName" required>
                                </div>
                                <div class="mb-3">
                                    <label for="registerEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="registerEmail" required>
                                </div>
                                <div class="mb-3">
                                    <label for="registerPassword" class="form-label">Mật khẩu</label>
                                    <input type="password" class="form-control" id="registerPassword" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Đăng ký</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(registerModal);
    }

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
                        <img src="../img/anhdaidien.jpg" alt="User Avatar" style="width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; background-size: cover; background-position: center;" class="rounded-circle me-2">
                        ${currentUser.name}
                    </span>
                    <button class="btn btn-outline-secondary btn-sm" id="logoutButton"   style = "margin-top: -50px; margin-left: 10px; width: 80px; height: 30px; border: 1px solid gray; border-radius: 5px;">Đăng xuất</button>
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

        // Thêm sự kiện cho các nút "Thêm vào giỏ"
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
    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (!currentUser) {
            showDialog();
            return;
        }
        window.location.href = "../../shopppingcard/html/shopping cart.html";
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

    // Khởi tạo giao diện người dùng và render sản phẩm
    updateUserInterface();
    renderProducts();
    updateCart();
});