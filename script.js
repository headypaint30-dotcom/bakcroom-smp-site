// Chatbot CréaBot (avec Groq, remplace par ta clé)
const API_KEY = "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"; // ← Change !
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: `Tu es CréaBot pour Bakcroom SMP (Minecraft). Réponds en français, style pixel, humour, idées builds. Message: ${text}` }],
        temperature: 0.7,
        max_tokens: 300
      })
    });
    const data = await res.json();
    addMessage(data.choices[0].message.content, "bot");
  } catch (e) {
    addMessage("Erreur : Vérifie ta clé Groq !", "bot");
  }
}

function addMessage(text, sender) {
  const messages = document.getElementById("messages");
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

document.getElementById("userInput").addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

// Support form
document.getElementById("supportForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Message envoyé ! On te répond sur Discord. 👋");
  e.target.reset();
});
