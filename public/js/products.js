const container =
    document.getElementById("productsContainer");

const params =
    new URLSearchParams(window.location.search);

let selectedCategory =
    params.get("category") || "all";

let searchQuery =
    params.get("search") || "";

document.querySelectorAll(
    'input[name="category"]'
).forEach(radio => {

    radio.checked =
        radio.value === selectedCategory;

    radio.addEventListener("change", () => {

        selectedCategory = radio.value;

        renderProducts();

    });

});


document.getElementById(
    "sortProducts"
).addEventListener("change", renderProducts);


function renderProducts() {

    let filtered =
        [...products];

    if (selectedCategory !== "all") {

        filtered = filtered.filter(
            product =>
                product.category === selectedCategory
        );

    }

    if (searchQuery) {

        filtered = filtered.filter(product =>

            product.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())

        );

    }

    const priceRadio =
        document.querySelector(
            'input[name="price"]:checked'
        );

    if (priceRadio &&
        priceRadio.value !== "all") {

        filtered = filtered.filter(
            product =>
                product.price <=
                Number(priceRadio.value)
        );

    }

    const sort =
        document.getElementById(
            "sortProducts"
        ).value;

    if (sort === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    }

    if (sort === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    }

    if (sort === "rating") {

        filtered.sort(
            (a, b) => b.rating - a.rating
        );

    }

    document.getElementById(
        "resultsTitle"
    ).textContent =
        searchQuery
            ? `Search results for "${searchQuery}"`
            : selectedCategory === "all"
                ? "All Products"
                : selectedCategory;

    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>No products found</h2>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }

    container.innerHTML =
        filtered
            .map(createProductCard)
            .join("");

}


document.querySelectorAll(
    'input[name="price"]'
).forEach(radio => {

    radio.addEventListener(
        "change",
        renderProducts
    );

});


renderProducts();

updateCartCount();