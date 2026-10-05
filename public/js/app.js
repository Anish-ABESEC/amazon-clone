function getCart() {

    return JSON.parse(localStorage.getItem("cart")) || [];

}


function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.querySelectorAll("#cartCount").forEach(element => {

        element.textContent = count;

    });

}


function addToCart(productId) {

    const product = products.find(
        item => item.id === Number(productId)
    );

    if (!product) return;

    const cart = getCart();

    const existing = cart.find(
        item => item.id === product.id
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    alert("Product added to cart!");

}


function removeFromCart(productId) {

    let cart = getCart();

    cart = cart.filter(
        item => item.id !== Number(productId)
    );

    saveCart(cart);

    if (typeof renderCart === "function") {

        renderCart();

    }

    updateCartCount();

}


function changeQuantity(productId, change) {

    const cart = getCart();

    const item = cart.find(
        product => product.id === Number(productId)
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(productId);
        return;

    }

    saveCart(cart);

    if (typeof renderCart === "function") {

        renderCart();

    }

    updateCartCount();

}


function createProductCard(product) {

    return `

        <div class="product-card">

            <div
                class="product-image"
                onclick="location.href='product.html?id=${product.id}'">

                <img
                    src="${product.image}"
                    alt="${product.name}">

            </div>

            <div class="product-info">

                <h3
                    onclick="location.href='product.html?id=${product.id}'">

                    ${product.name}

                </h3>

                <div class="rating">

                    ⭐ ${product.rating}

                    <span>
                        (${product.reviews})
                    </span>

                </div>

                <div class="price">

                    <strong>
                        ₹${product.price.toLocaleString("en-IN")}
                    </strong>

                    <del>
                        ₹${product.oldPrice.toLocaleString("en-IN")}
                    </del>

                </div>

                <p class="discount">

                    ${Math.round(
                        ((product.oldPrice - product.price) /
                        product.oldPrice) * 100
                    )}% off

                </p>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        </div>

    `;

}


function searchProducts() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    const query =
        input.value.trim();

    if (query) {

        location.href =
            `products.html?search=${encodeURIComponent(query)}`;

    } else {

        location.href = "products.html";

    }

}


document.addEventListener(
    "DOMContentLoaded",
    updateCartCount
);