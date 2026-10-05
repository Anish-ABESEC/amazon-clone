const cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );

const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );


function renderCheckout() {

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <p>Your cart is empty.</p>

        `;

        checkoutTotal.textContent = "₹0";

        return;

    }

    let total = 0;

    checkoutItems.innerHTML =
        cart.map(item => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            return `

                <div class="checkout-item">

                    <img src="${item.image}">

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <p>
                            Qty: ${item.quantity}
                        </p>

                        <strong>
                            ₹${itemTotal.toLocaleString("en-IN")}
                        </strong>

                    </div>

                </div>

            `;

        }).join("");

    checkoutTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


function placeOrder() {

    const name =
        document.getElementById(
            "name"
        ).value.trim();

    const phone =
        document.getElementById(
            "phone"
        ).value.trim();

    const address =
        document.getElementById(
            "address"
        ).value.trim();

    const city =
        document.getElementById(
            "city"
        ).value.trim();

    const pincode =
        document.getElementById(
            "pincode"
        ).value.trim();

    if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {

        alert(
            "Please fill all delivery details."
        );

        return;

    }

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );

    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    const order = {

        id:
            "SZ" +
            Date.now(),

        date:
            new Date().toLocaleString(),

        customer: {

            name,
            phone,
            address,
            city,
            pincode

        },

        items: cart,

        total: total

    };

    orders.push(order);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    localStorage.removeItem("cart");

    alert(
        "Order placed successfully!"
    );

    location.href = "orders.html";

}


renderCheckout();
