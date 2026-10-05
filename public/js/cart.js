const cartContainer =
    document.getElementById(
        "cartContainer"
    );


function renderCart() {

    const cart = getCart();

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-state">

                <h2>Your cart is empty</h2>

                <p>
                    Add some products to your cart.
                </p>

                <button
                    onclick="location.href='products.html'">

                    Continue Shopping

                </button>

            </div>

        `;

        updateSummary(0);

        return;

    }

    cartContainer.innerHTML =
        cart.map(item => `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}">

                <div class="cart-item-info">

                    <h2>${item.name}</h2>

                    <div class="rating">
                        ⭐ ${item.rating}
                    </div>

                    <strong class="cart-price">
                        ₹${item.price.toLocaleString("en-IN")}
                    </strong>

                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(
                                ${item.id},
                                -1
                            )">

                            −

                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(
                                ${item.id},
                                1
                            )">

                            +

                        </button>

                    </div>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(
                            ${item.id}
                        )">

                        Remove

                    </button>

                </div>

            </div>

        `).join("");

    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

    updateSummary(total);

}


function updateSummary(total) {

    document.getElementById(
        "summaryItems"
    ).textContent =
        `₹${total.toLocaleString("en-IN")}`;

    document.getElementById(
        "summaryTotal"
    ).textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


function goToCheckout() {

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    location.href = "checkout.html";

}


renderCart();

updateCartCount();