import fetch from "node-fetch";

const url = "https://classtone-proxy.onrender.com/";
const interval = 9 * 60 * 1000; // every 9 minutes

setInterval(async () => {
    try {
        const res = await fetch(url);
        console.log(`[KeepAlive] Ping OK: ${res.status} at ${new Date().toISOString()}`);
    } catch (err) {
        console.log(`[KeepAlive] Ping failed: ${err.message}`);
    }
}, interval);
