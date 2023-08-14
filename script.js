class Product {
    constructor(name, price, description, imgSrc, stock) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imgSrc = imgSrc;
        this.stock = stock;
    }
}

class CartItem {
    constructor(product, stock) {
        this.product = product;
        this.stock = stock;
    }

    getPrice() {
        return this.product.price * this.stock;
    }
}

class Account {
    constructor(nama, username, imgProfile, password) {
        this.nama = nama;
        this.username = username;
        this.imgProfile = imgProfile;
        this.password = password;
    }
}

class SystemCart {
    constructor() {
        this.items = [];
    }

    addItems(product, stock) {
        const existingItem = this.items.find(item => item.product === product);
        if (existingItem) {
            const availableStock = Math.min(product.stock, stock);
            existingItem.stock += availableStock;
            product.stock -= availableStock;
        } else {
            const newItem = new CartItem(product, stock);
            this.items.push(newItem);
            product.stock -= stock;
        }
        if (product.stock < 0) {
            product.stock = 0;
        }
    }

    removeItems(product) {
        this.items = this.items.filter(item => item.product !== product);
    }

    increaseItem(product) {
        const existingItem = this.items.find(item => item.product === product);
        if (existingItem && product.stock > 0) {
            existingItem.stock++;
            product.stock--;
        }
    }

    decreaseItem(product) {
        const existingItem = this.items.find(item => item.product === product);
        if (existingItem && existingItem.stock > 1) {
            existingItem.stock--;
            product.stock++;
        } else if (existingItem && existingItem.stock === 1) {
            product.stock++;
            this.removeItems(product);
        }
    }

    buy(product) {
        if (product.stock > 1) {
            product.stock--;
        } else if (product.stock === 1) {
            product.stock--;
            product.atock = 0;
        }
    }

    getItems() {
        return this.items;
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getPrice(), 0);
    }

    buyAll() {
        return this.items = [];
    }
}

const titleInput = document.querySelector(".nama");
const priceInput = document.querySelector(".harga");
const stockInput = document.querySelector(".stok");
const descriptionInput = document.querySelector(".descibtion");
const fileInput = document.querySelector(".input-file");
const submit = document.querySelector(".submit");
const btnAdd = document.querySelector(".btn-tambah");
const pageAdd = document.querySelector(".add-product-container");
const btnCart = document.querySelectorAll(".cartP");
const cartContainer = document.querySelector(".cart-blok");
const productsContainer = document.querySelector(".container");
const header = document.querySelector(".header");
const searchInput = document.querySelector("#search");
const acount1 = document.querySelector(".acount-tambah");
const closeAcount = document.querySelectorAll(".close-acount");
const body = document.body;

////////////////////////Cart Page/////////////////////////
btnCart.forEach((btn) => {
    btn.addEventListener("click", () => {
        cartContainer.classList.toggle("active");
    });
});

//////////////////////Acount Click Icon/////////////////////////
acount1.addEventListener("click", () => {
    pageAdd.style.display = "flex";
    var pageClose = document.querySelector(".close-add");
    pageClose.addEventListener("click", () => {
        pageAdd.style.display = "none";
    });
});

/////////////////////Add Product Input///////////////////////
submit.addEventListener("click", () => {
    const name = titleInput.value.trim();
    const price = parseFloat(priceInput.value);
    const stock = parseFloat(stockInput.value);
    const description = descriptionInput.value.trim();
    const img = fileInput.files[0];

    if (name && price && description && img && stock > 0) {
        const reader = new FileReader();
        reader.onload = (file) => {
            const imgSrc = file.target.result;
            addProduct(name, price, description, imgSrc, stock);
        };
        reader.readAsDataURL(img);
    } else {
        alert("Masukkan informasi produk yang lengkap.");
    }

    systemSearch();
    renderProduct();

    fileInput.value = "";
    titleInput.value = "";
    priceInput.value = "";
    descriptionInput.value = "";
    stockInput.value = "";
});

//////////////////////////Add Acount System////////////////////////
const accounts = [];

function addAccount(nama, username, imgProfile, password) {
    const account = new Account(nama, username, imgProfile, password)
    accounts.push(account);
}

addAccount("Local Account", "iqbalbtr045", "images/profile.png", "iqbal045")

//////////////
const cart = new SystemCart();

const productList = [];
/////////////

////////////////////Create Acount Input//////////////////////
const userInput = document.querySelector(".user");
const inputName = document.querySelector(".name-user");
const passInput = document.querySelector(".password");
const imgProfile = document.querySelector('.imgProfile');
const btnCreate = document.querySelector(".btn-create");
btnCreate.addEventListener("click", () => {
    const nama = inputName.value.trim();
    const user = userInput.value.trim();
    const pass = passInput.value.trim();
    const img = imgProfile.files[0];
    if (nama.length >= 6 && user.length >= 6 && user === user.toLowerCase() && !user.includes(" ") && img && pass.length >= 6) {
        const reader = new FileReader();
        reader.onload = (file) => {
            const profleSrc = file.target.result;
            addAccount(nama, user, profleSrc, pass);
            alert("Akun berhasil dibuat.");
        }
        reader.readAsDataURL(img);
    } else if (user && pass && nama && img) {
        alert("Username harus diisi dengan huruf kecil semua.")

    }
    else {
        alert("Minimal 6 huruf.")
    }
    userInput.value = "";
    passInput.value = "";
    imgProfile.value = "";
    inputName.value = "";
});

/////////////////Login Acount Input////////////////////
const userPhoto = document.querySelector(".user-profile");
const sideName = document.querySelector(".name-sidebar")
const logUserInput = document.querySelector(".user-log");
const logPassInput = document.querySelector(".pass-log");
const logBtn = document.querySelector(".log-sub");
const poto = document.querySelector(".user-poto");
const panelName = document.querySelector("#name-profile");
const userProfile = document.querySelector("#username-profile");
let acountActive = false;
logBtn.addEventListener('click', () => {
    const logUser = logUserInput.value.trim();
    const logPass = logPassInput.value.trim();
    let found = false;
    accounts.forEach((account) => {
        if (logUser === account.username && logPass === account.password) {
            userPhoto.src = account.imgProfile;
            poto.src = account.imgProfile;
            panelName.textContent = account.nama;
            sideName.textContent = account.nama;
            sideName.style.display = "block";
            userProfile.textContent = `@${account.username}`;
            btnAdd.style.display = "none";
            userPhoto.style.display = "block";
            found = true;
            accountBtn.forEach((btn) => {
                btn.style.display = "none";
            });
            alert("Berhasil masuk.")
            createBlok.classList.remove("active");
            body.classList.remove("fix");
            acountActive = true;
        }
    });
    if (!found) {
        alert('Password atau username tidak ditemukan.')
    }

    logPassInput.value = "";
});

////////////////Log Out Acount////////////////
const logOut = document.querySelector(".log-out");
logOut.addEventListener("click", () => {
    sideName.style.display = "none";
    btnAdd.style.display = "block";
    accountBtn.forEach((btn) => {
        btn.style.display = "block";
    });
    body.classList.remove("fix");
    pageAdd.style.display = "none";
    userPhoto.style.display = "none";
    acountActive = false;
});

function addProduct(name, price, description, imgSrc, stock) {
    const product = new Product(name, price, description, imgSrc, stock);
    productList.push(product);
    renderProduct();
}

////////////Crate Login Page Click/////////////////////
const createBlok = document.querySelector(".create-blok");
const accountBtn = document.querySelectorAll(".acount-add");
accountBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        createBlok.classList.add("active");
        body.classList.add("fix");
    })
});

closeAcount.forEach((btn) => {
    btn.addEventListener("click", () => {
        createBlok.classList.remove("active");
        body.classList.remove("fix");
        userPhoto.style.display = "none";
    });
});


////////// product yang ditambahkan  ////////////////////
addProduct("Apple Premium Gold version", 99999999999999, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/apple-prem.png", 1);
addProduct("apple", 1000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/apple.png", 200);
addProduct("Baju L size", 59000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/baju.png", 11);
addProduct("Celana Ukuran 27", 170000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/celana.png", 33);
addProduct("Jaket L Size Merah", 250000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/jaket.png", 12);
addProduct("Sabuk Cokelat Wanita", 60000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/sabuk.png", 10);
addProduct("Celana Biru ukuran 29", 120000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/celana-biru.png", 42);
addProduct("Celana Pendek Allsize", 60000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/celana-pendek.png", 11);
addProduct("Jaket Warna Putih ", 300000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/jaket-putoh.png", 32);
addProduct("Jaket Biru All size", 190000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/jaket2.png", 33);
addProduct("Jaket Kulit Premium", 2000000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/jaket3.png", 22);
addProduct("Jaket No Brand", 200000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/jaket4.png", 22);
addProduct("Topi Koboi", 99000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/topi-koboi.png",);
addProduct("Topi Rajutan merah Muda", 119000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/topi-rajutan.png", 22);
addProduct("Topi Casual Hitam", 50000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/topi2.png", 16);
addProduct("apple standart", 1000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/apple.png", 200);
addProduct("Baju M size", 59000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/baju.png", 11);
addProduct("Celana Ukuran 23", 170000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/celana.png", 33);
addProduct("Jaket M Size Merah", 250000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/jaket.png", 12);
addProduct("Sabuk Cokelat", 60000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/sabuk.png", 10);
addProduct("Celana Biru ukuran 26", 120000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/celana-biru.png", 42);
addProduct("Celana Pendek L size", 60000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/celana-pendek.png", 11);
addProduct("Jaket Warna Putih All Size ", 300000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/jaket-putoh.png", 32);
addProduct("Jaket Biru M size", 190000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/jaket2.png", 33);
addProduct("Jaket Kulit Premium version 2", 2000000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/jaket3.png", 22);
addProduct("Jaket No Brand + Bundle", 200000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/jaket4.png", 22);
addProduct("Topi Koboi Coklat", 99000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/topi-koboi.png",);
addProduct("Topi merah Muda", 119000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/topi-rajutan.png", 22);
addProduct("Topi Casual Hitam All Size", 50000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error, impedit optio quasi id delectus asperiores corporis fugiat. Voluptas repellat aliquid tempora. Similique, officia sit est ipsa ab nesciunt quae.", "images/topi2.png", 16);



function renderProduct() {
    productsContainer.innerHTML = "";
    productList.forEach((product) => {
        const productPanel = document.createElement("div");
        const rupiah = product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
        productPanel.innerHTML = `
        <div class="product" data-name="${product.name}" >
        <img src="${product.imgSrc}" alt="${product.name}">
        <div class="bottom-product">
            <span class="product-name">${product.name}</span>
            <span>Stock: ${product.stock}</span>
            <span>${rupiah}</span>
        </div>
        </div>
        `;
        productsContainer.prepend(productPanel);

        productPanel.addEventListener("click", () => {
            previewPanel(product);
            cartContainer.classList.remove("active");
            renderCart();
            listProduct.style.display = "none";
        });
    });
}

function previewPanel(product) {
    const productName = document.querySelector("#product-name");
    const productPrice = document.querySelector("#product-harga");
    const productStock = document.querySelector("#product-stock");
    const productImg = document.querySelector("#img-product");
    const productDescription = document.querySelector("#deskti");
    const btnProduct = document.querySelector(".button-product");

    const keranjang = document.createElement("button");
    keranjang.classList.add("keranjang");
    keranjang.textContent = "Keranjang";
    keranjang.addEventListener("click", () => {
        cart.addItems(product, 1);
        renderCart();
        renderProduct();
        productStock.textContent = product.stock;
    });
    const beli = document.createElement("button");
    beli.classList.add("beli");
    beli.textContent = "beli";
    beli.addEventListener("click", () => {
        if (acountActive) {
            cart.buy(product);
            renderCart();
            renderProduct();
            productStock.textContent = product.stock;
        } else {
            showDelayedAlert();
        }
    });

    btnProduct.innerHTML = "";

    document.querySelector(".priview-product").style.display = "flex";

    const rupiah = product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
    productName.textContent = product.name;
    productPrice.textContent = rupiah;
    productStock.textContent = product.stock;
    productDescription.textContent = product.description;
    const imgProduct = product.imgSrc;
    btnProduct.appendChild(keranjang);
    btnProduct.appendChild(beli);
    productImg.src = imgProduct;
}

let alertTimeout;

function showDelayedAlert() {
    if (!alertTimeout) {
        alertTimeout = setTimeout(function () {
            alert("Masukan akun terlebih dahulu.");
            clearTimeout(alertTimeout);
            alertTimeout = null;
        }, 100);
    }
}

function renderCart() {
    const cartList = document.querySelector(".cart-list");
    cartList.innerHTML = "";
    const total = document.getElementById("total");
    const rupiah = cart.getTotal().toLocaleString("id-ID", { style: "currency", currency: "IDR" });
    total.textContent = rupiah
    const buyAll = document.querySelector(".buy-all");
    buyAll.addEventListener("click", () => {
        if (acountActive) {
            cart.buyAll();
            renderCart();
            renderProduct();
        } else {
            showDelayedAlert();
        }
    });



    cart.getItems().forEach((item) => {
        const cartPanel = document.createElement("div");
        const rupiah = item.product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
        cartPanel.innerHTML = `
        <div class="cart-product">
        <img src="${item.product.imgSrc}" alt="">
        <div class="cart-product-right">
          <span>${item.product.name}</span>
          <span>Harga: ${rupiah}</span>
          <div class="butt-cart">
            <span>Stock :</span>
            <button class="increase-btn">+</button>
            <span>${item.stock}</span>
            <button class="decrease-btn">-</button>
          </div>
        </div>
      </div>
        `;
        cartList.prepend(cartPanel);

        const increaseBtn = cartPanel.querySelector(".increase-btn");
        increaseBtn.addEventListener("click", () => {
            cart.increaseItem(item.product);
            renderCart();
            renderProduct();
        });

        const decreaseBtn = cartPanel.querySelector(".decrease-btn");
        decreaseBtn.addEventListener("click", () => {
            cart.decreaseItem(item.product);
            renderCart();
            renderProduct();
        });
    });
}

///////////////Close Btn Priview Product///////////////////////
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".priview-product").style.display = "none";
    listProduct.style.display = "flex";
});

/////////////////Dark Mode Toggle/////////////////////
const btnMode = document.querySelectorAll(".btn-mode");
const darkMode = document.querySelector(".dark-mode");
const sunMode = document.querySelector(".sun-mode");
btnMode.forEach((btn) => {
    btn.addEventListener("click", () => {
        body.classList.toggle("dark");
    });
})

//////////////Enter Input Add product//////////
function addProductEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const allProductInput = document.querySelectorAll(".nama, .harga, .descibtion, .stok");
        const currentIndex = Array.from(allProductInput).indexOf(event.target);

        if (currentIndex !== -1 && currentIndex < allProductInput.length - 1) {
            const nextInput = allProductInput[currentIndex + 1];
            nextInput.focus();
        } else if (currentIndex === allProductInput.length - 1) {
            const submitButton = document.querySelector(".submit");
            submitButton.click();
        }
    }
}

document.addEventListener("DOMContentLoaded",() => {
    const allProductInput = document.querySelectorAll(".nama, .harga, .descibtion, .stok");
    allProductInput.forEach(input => {
        input.addEventListener("keypress", addProductEnter);
    });
});
//////////////// AddInput create akun enter ////////////////////

function addCreateAkunEnter(event){
    const createInput = document.querySelectorAll(".name-user, .user, .password");
    const currentInput = Array.from(createInput).indexOf(event.target);

    if(event.key === "Enter") {
        if(currentInput !== -1 && currentInput < createInput.length - 1){
            const nextInput = createInput[currentInput + 1];
            nextInput.focus();
        } else if (currentInput === createInput.length - 1) {
            const submitBtn = document.querySelector("#huk08");
            submitBtn.click();
        }
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
    const createInput = document.querySelectorAll(".name-user, .user, .password");
    createInput.forEach(input => {
        input.addEventListener("keypress", addCreateAkunEnter)
    });
});

////////////////Input Login Enter/////////////////
function logInEnter(event){
    const logInInput = document.querySelectorAll(".user-log, .pass-log");
    const currentInput = Array.from(logInInput).indexOf(event.target);

    if(event.key === "Enter"){
        if(currentInput !== - 1 && currentInput < logInInput.length - 1){
            const nextInput = logInInput[currentInput + 1];
            nextInput.focus();
        } else if (currentInput === logInInput.length - 1){
            const submit = document.querySelector(".log-sub");
            submit.click();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const logInInput = document.querySelectorAll(".user-log, .pass-log");
    logInInput.forEach((input) => {
        input.addEventListener("keypress", logInEnter)
    })
})

///////////Lisproduct Window FIxed////////////////
const listProduct = document.querySelector(".list-product");
window.addEventListener("scroll", () => {

    if (window.scrollY > header.offsetHeight) {
        listProduct.classList.add("active");
        productsContainer.style.marginTop = "4.5rem";
    } else {
        listProduct.classList.remove("active");
        productsContainer.style.marginTop = "1rem";
    }
});

function systemSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const noProduct = document.querySelector('.blok-no-product')
    let found = 0;
    productList.forEach((product) => {
        const productPanel = productsContainer.querySelector(`[data-name="${product.name}"]`);
        if (product.name.toLowerCase().includes(searchTerm)) {
            productPanel.style.display = "flex";
            found++;
        } else {
            productPanel.style.display = "none";
        }
    });
    if (found > 0) {
        noProduct.style.display = "none";
    } else {
        noProduct.style.display = "flex";
    }
}

const searchIcon = document.querySelector(".search");
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        systemSearch();
    }
});
searchIcon.addEventListener("click", () => {
    systemSearch();
});
