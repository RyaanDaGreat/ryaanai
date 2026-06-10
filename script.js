async function sendMessage() {

    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    if (!message) return;

    // user message
    chatBox.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    input.value = "";

    // thinking bubble
    const thinking = document.createElement("div");
    thinking.className = "bot-message";
    thinking.innerText =
        "🧠 RyaanGPT GOD MODE thinking...";
    chatBox.appendChild(thinking);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch(
            "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: message
                })
            }
        );

        const data = await response.json();

        let reply =
            data.generated_text ||
            "⚡ My aura is too powerful. Try again 😎";

        thinking.innerText = reply;

    } catch (error) {

        thinking.innerText =
            "❌ GOD MODE connection failed 😭";
    }

    chatBox.scrollTop =
        chatBox.scrollHeight;
}

