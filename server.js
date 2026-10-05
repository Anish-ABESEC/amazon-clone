import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "products.html"));
});

app.get("/product", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "product.html"));
});

app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "cart.html"));
});

app.get("/checkout", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "checkout.html"));
});

app.get("/orders", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "orders.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});