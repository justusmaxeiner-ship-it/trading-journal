import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// Damit wir später ein Frontend anzeigen können
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../../public");

app.use(express.static(publicPath));

/*
SUPER einfache Fake-Datenbank :)
Speichert Trades im RAM.
Für später ersetzen wir das durch eine echte DB.
*/
let trades = [];

// TEST ROUTE
app.get("/api/health", (req, res) => {
    res.json({ status: "Server läuft 🚀" });
});

// TRADE erstellen
app.post("/api/trades", (req, res) => {
    const trade = {
        id: Date.now(),
        symbol: req.body.symbol,
        pnl: req.body.pnl
    };

    trades.push(trade);
    res.json(trade);
});

// TRADES holen
app.get("/api/trades", (req, res) => {
    res.json(trades);
});

// WICHTIG für Render später!
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server läuft auf Port " + PORT);
});
