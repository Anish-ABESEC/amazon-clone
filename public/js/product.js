const productParams =
    new URLSearchParams(
        window.location.search
    );

const productId =
    Number(productParams.get("id"));

const product =
    products.find(
        item => item.id === productId
    );

const detail =
    document.getElementById(
        "productDetail"
    );

if (!product) {

    detail.innerHTML = `

        <div class="empty-state">

            <h1>Product not found</h1>

            <button onclick="location.href='products.html'">
                Back to Products
            </button>

        </div>

    `;

} else {

    detail.innerHTML = `

        <div class="detail-image">

            <img
                src="${product.image}"
                alt="${product.name}">

        </div>

        <div class="detail-info">

            <h1>${product.name}</h1>

            <div class="detail-rating">

                ⭐ ${product.rating}

                <span>
                    ${product.reviews} ratings
                </span>

            </div>

            <hr>

            <p class="detail-description">
                ${product.description}
            </p>

            <div class="detail-price">

                <strong>
                    ₹${product.price.toLocaleString("en-IN")}
                </strong>

                <del>
                    ₹${product.oldPrice.toLocaleString("en-IN")}
                </del>

                <span>
                    ${Math.round(
                        ((product.oldPrice - product.price) /
                        product.oldPrice) * 100
                    )}% off
                </span>

            </div>

            <p class="delivery">
                🚚 FREE Delivery
            </p>

            <p class="stock">
                ✓ In Stock
            </p>

            <div class="quantity">

                <button onclick="changeDetailQuantity(-1)">
                    −
                </button>

                <span id="detailQuantity">1</span>

                <button onclick="changeDetailQuantity(1)">
                    +
                </button>

            </div>

            <button
                class="buy-cart"
                onclick="addProductToCart()">

                Add to Cart

            </button>

            <button
                class="buy-now"
                onclick="buyNow()">

                Buy Now

            </button>

        </div>

    `;

    const related =
        document.getElementById(
            "relatedProducts"
        );

    related.innerHTML =
        products
            .filter(
                item =>
                    item.category ===
                    product.category &&
                    item.id !== product.id
            )
            .slice(0, 4)
            .map(createProductCard)
            .join("");

}


let detailQuantity = 1;


function changeDetailQuantity(change) {

    detailQuantity += change;

    if (detailQuantity < 1) {

        detailQuantity = 1;

    }

    document.getElementById(
        "detailQuantity"
    ).textContent = detailQuantity;

}


function addProductToCart() {

    const cart = getCart();

    const existing =
        cart.find(
            item => item.id === product.id
        );

    if (existing) {

        existing.quantity += detailQuantity;

    } else {

        cart.push({
            ...product,
            quantity: detailQuantity
        });

    }

    saveCart(cart);

    updateCartCount();

    alert("Product added to cart!");

}


function buyNow() {

    addProductToCart();

    location.href = "checkout.html";

}

updateCartCount();