const textarea = document.getElementById("note");
let timeout = null;

// Load notes
fetch("/note")
  .then(res => res.json())
  .then(data => {
    textarea.value = data.text;
  });

// Store with debounce
textarea.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    fetch("/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: textarea.value })
    });
  }, 300);
});
