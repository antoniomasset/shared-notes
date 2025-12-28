const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Store in memory (IP -> text)
const notes = {};

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Get IP 
function getClientIP(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return forwarded ? forwarded.split(",")[0] : req.socket.remoteAddress;
}

// Get note
app.get("/note", (req, res) => {
  const ip = getClientIP(req);
  if (!notes[ip]) {
    notes[ip] = "";
  }
  res.json({ text: notes[ip] });
});

// Save note
app.post("/note", (req, res) => {
  const ip = getClientIP(req);
  notes[ip] = req.body.text || "";
  res.json({ ok: true });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando en la red en el puerto ${PORT}`);
});
