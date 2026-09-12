/* =========================================
   DATA MENU
========================================= */

const menu = [

    {
        id: 1,
        name: "Es Kopi Susu",
        price: 18000,
        description: "Kopi susu creamy dengan rasa manis yang pas.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735"
    },

    {
        id: 2,
        name: "Americano",
        price: 15000,
        description: "Kopi hitam dengan rasa kuat dan nikmat.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd"
    },

    {
        id: 3,
        name: "Cappuccino",
        price: 22000,
        description: "Perpaduan espresso dan foam susu lembut.",
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213"
    },

    {
        id: 4,
        name: "Cafe Latte",
        price: 22000,
        description: "Espresso dengan susu creamy yang lembut.",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772"
    },

    {
        id: 5,
        name: "Matcha Latte",
        price: 23000,
        description: "Matcha creamy dengan rasa yang menyegarkan.",
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7"
    },

    {
        id: 6,
        name: "Chocolate",
        price: 20000,
        description: "Minuman cokelat manis dan creamy.",
        image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed"
    },

    {
        id: 7,
        name: "French Fries",
        price: 16000,
        description: "Kentang goreng renyah dengan bumbu pilihan.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877"
    },

    {
        id: 8,
        name: "Croissant",
        price: 18000,
        description: "Croissant renyah dengan tekstur lembut.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a"
    }

];


/* =========================================
   DATA KERANJANG
========================================= */

let cart = [];


/* =========================================
   FORMAT RUPIAH
========================================= */

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(number);

}


/* =========================================
   MENAMPILKAN MENU
========================================= */

function displayMenu() {

    const menuContainer =
        document.getElementById("menuContainer");

    menuContainer.innerHTML = "";

    menu.forEach(item => {

        const card = document.createElement("div");

        card.className = "menu-card";

        card.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                class="menu-image"
            >

            <div class="menu-content">

                <h3>${item.name}</h3>

                <p class="menu-description">
                    ${item.description}
                </p>

                <p class="menu-price">
                    ${formatRupiah(item.price)}
                </p>

                <button
                    class="add-button"
                    onclick="addToCart(${item.id})"
                >
                    + Tambah ke Keranjang
                </button>

            </div>
        `;

        menuContainer.appendChild(card);

    });

}


/* =========================================
   TAMBAH KE KERANJANG
========================================= */

function addToCart(id) {

    const product = menu.find(item => item.id === id);

    const existingItem =
        cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1

        });

    }

    updateCart();

}


/* =========================================
   UPDATE JUMLAH
========================================= */

function changeQuantity(id, change) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }

    updateCart();

}


/* =========================================
   HAPUS ITEM
========================================= */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    updateCart();

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const subtotalElement =
        document.getElementById("subtotal");

    const serviceFeeElement =
        document.getElementById("serviceFee");

    const totalPriceElement =
        document.getElementById("totalPrice");


    /* JUMLAH BARANG */

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent = totalQuantity;


    /* JIKA KOSONG */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">
                Keranjang masih kosong 🛒
            </div>

        `;

    } else {

        cartItems.innerHTML = "";

        cart.forEach(item => {

            const cartItem =
                document.createElement("div");

            cartItem.className =
                "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p class="cart-item-price">
                        ${formatRupiah(item.price)}
                    </p>

                </div>


                <div class="quantity-control">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        -
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <strong>
                    ${formatRupiah(
                        item.price * item.quantity
                    )}
                </strong>


                <button
                    class="remove-button"
                    onclick="removeFromCart(${item.id})"
                >
                    Hapus
                </button>

            `;

            cartItems.appendChild(cartItem);

        });

    }


    /* HITUNG TOTAL */

    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        );


    let serviceFee = 0;

    if (subtotal > 0) {

        serviceFee = 2000;

    }


    const total =
        subtotal + serviceFee;


    subtotalElement.textContent =
        formatRupiah(subtotal);

    serviceFeeElement.textContent =
        formatRupiah(serviceFee);

    totalPriceElement.textContent =
        formatRupiah(total);

}


/* =========================================
   CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Keranjang masih kosong. Silakan pilih menu terlebih dahulu."
        );

        return;

    }


    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        );


    const serviceFee = 2000;

    const total =
        subtotal + serviceFee;


    /* BUAT ID TRANSAKSI */

    const transactionId =
        "TRX-" +
        Date.now().toString().slice(-6);


    /* TANGGAL */

    const date =
        new Date().toLocaleString(
            "id-ID",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );


    /* SIMPAN TRANSAKSI */

    const transaction = {

        id: transactionId,

        date: date,

        items: cart.map(item => ({

            name: item.name,

            price: item.price,

            quantity: item.quantity

        })),

        subtotal: subtotal,

        serviceFee: serviceFee,

        total: total

    };


    /* AMBIL RIWAYAT LAMA */

    let history =
        JSON.parse(
            localStorage.getItem(
                "kopikitaTransactions"
            )
        ) || [];


    /* TAMBAHKAN TRANSAKSI BARU */

    history.unshift(transaction);


    /* SIMPAN */

    localStorage.setItem(
        "kopikitaTransactions",
        JSON.stringify(history)
    );


    /* RESET KERANJANG */

    cart = [];

    updateCart();

    displayTransactionHistory();


    /* PESAN */

    alert(
        "Transaksi berhasil!\n\n" +
        "ID Transaksi: " +
        transactionId +
        "\nTotal: " +
        formatRupiah(total)
    );


    /* SCROLL KE RIWAYAT */

    document
        .getElementById("transaksi")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   TAMPILKAN RIWAYAT TRANSAKSI
========================================= */

function displayTransactionHistory() {

    const historyContainer =
        document.getElementById(
            "transactionHistory"
        );


    /* AMBIL DATA */

    const history =
        JSON.parse(
            localStorage.getItem(
                "kopikitaTransactions"
            )
        ) || [];


    /* JIKA BELUM ADA */

    if (history.length === 0) {

        historyContainer.innerHTML = `

            <div class="empty-history">

                Belum ada transaksi.

            </div>

        `;

        return;

    }


    /* KOSONGKAN */

    historyContainer.innerHTML = "";


    /* TAMPILKAN SEMUA */

    history.forEach(transaction => {

        const card =
            document.createElement("div");

        card.className =
            "transaction-card";


        /* HEADER */

        let itemsHTML = "";


        transaction.items.forEach(item => {

            itemsHTML += `

                <div class="transaction-item">

                    <span>
                        ${item.name}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${formatRupiah(
                            item.price *
                            item.quantity
                        )}
                    </strong>

                </div>

            `;

        });


        card.innerHTML = `

            <div class="transaction-header">

                <div>

                    <div class="transaction-id">

                        ${transaction.id}

                    </div>

                    <div class="transaction-date">

                        ${transaction.date}

                    </div>

                </div>

                <strong>
                    Selesai
                </strong>

            </div>


            <div>

                ${itemsHTML}

            </div>


            <div class="transaction-total">

                <span>Total Pembayaran</span>

                <strong>
                    ${formatRupiah(
                        transaction.total
                    )}
                </strong>

            </div>

        `;


        historyContainer.appendChild(card);

    });

}


/* =========================================
   SCROLL KE CART
========================================= */

function scrollToCart() {

    document
        .getElementById("cart")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   LOAD WEBSITE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayMenu();

        updateCart();

        displayTransactionHistory();

    }
);
