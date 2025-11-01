import express from "express";
import fetch from "node-fetch";
import "./keepalive.js"; // keep-alive runs in the background

const app = express();
app.use(express.json());

// Catch all routes and forward them to Heroku
app.all("*", async (req, res) => {
    try {
        console.log(`[Proxy] ${req.method} ${req.path}`);

        const target =
            "https://edgic-server-8e791b431018.herokuapp.com" + req.path;

        const response = await fetch(target, {
            method: req.method,
            headers: { "Content-Type": "application/json" },
            body: req.method === "GET" ? undefined : JSON.stringify(req.body),
        });

        const text = await response.text();
        res.set("Content-Type", "application/json");
        res.status(response.status).send(text);
    } catch (err) {
        console.error("Proxy error:", err);
        res
            .status(500)
            .json({ success: false, error: "Proxy failure", details: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
