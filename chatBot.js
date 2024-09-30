(function () {
    // Wait until the DOM is fully loaded before executing
    window.onload = function () {
        // Check if the chatbot is already present to prevent duplication
        if (document.querySelector('.chatbot-bubble')) return;

        // Add chatbot styles dynamically
        const style = document.createElement('style');
        style.innerHTML = `
            .chatbot-bubble {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background-color: #007bff;
                border-radius: 50%;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 1.5rem;
                z-index: 1000;
            }
            .chat-container {
                display: none;
                position: fixed;
                bottom: 80px;
                right: 20px;
                width: 300px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            .chat-header {
                background-color: #007bff;
                color: white;
                padding: 10px;
                text-align: center;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
            .chat-box {
                height: 300px;
                overflow-y: auto;
                padding: 10px;
                background-color: #f9f9f9;
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
            }
            .chat-input-container {
                display: flex;
                padding: 10px;
            }
            .chat-input-container input {
                flex: 1;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .chat-input-container button {
                background-color: #007bff;
                color: white;
                padding: 10px;
                border: none;
                margin-left: 5px;
                border-radius: 5px;
                cursor: pointer;
            }
            .chat-input-container button:hover {
                background-color: #0056b3;
            }
            .message {
                margin-bottom: 10px;
            }
            .user {
                text-align: right;
                color: blue;
            }
            .bot {
                text-align: left;
                color: green;
            }
        `;
        document.head.appendChild(style);

        // Create the chatbot bubble
        const chatbotBubble = document.createElement('div');
        chatbotBubble.classList.add('chatbot-bubble');
        chatbotBubble.innerHTML = '&#x1F916;';
        document.body.appendChild(chatbotBubble);

        // Create the chat container
        const chatContainer = document.createElement('div');
        chatContainer.classList.add('chat-container');

        const chatHeader = document.createElement('div');
        chatHeader.classList.add('chat-header');
        chatHeader.innerText = 'Chatbot';
        chatContainer.appendChild(chatHeader);

        const chatBox = document.createElement('div');
        chatBox.classList.add('chat-box');
        chatContainer.appendChild(chatBox);

        const chatInputContainer = document.createElement('div');
        chatInputContainer.classList.add('chat-input-container');
        const chatInput = document.createElement('input');
        chatInput.setAttribute('placeholder', 'Type a message...');
        const sendButton = document.createElement('button');
        sendButton.innerText = 'Send';
        chatInputContainer.appendChild(chatInput);
        chatInputContainer.appendChild(sendButton);
        chatContainer.appendChild(chatInputContainer);

        document.body.appendChild(chatContainer);


        // Initial state: make sure the chatbox is hidden
        let chatVisible = false;

        // Toggle chatbox visibility
        chatbotBubble.addEventListener('click', () => {
            console.log("clicked");
            chatVisible = !chatVisible;
            chatContainer.style.display = chatVisible ? 'block' : 'none';
        });

        // Predefined responses
        const responses = {
            "hello": "Hi! How can I help you?",
            "hi": "Hello! What can I do for you?",
            "how are you": "I'm a bot, doing well! How about you?",
            "bye": "Goodbye! Have a great day!",
            "default": "I'm not sure how to respond to that. Can you rephrase?"
        };

        // Handle sending messages
        sendButton.addEventListener('click', () => {
            const userMessage = chatInput.value.trim().toLowerCase();
            if (userMessage) {
                appendMessage(`You: ${userMessage}`, 'user');
                setTimeout(() => {
                    const botResponse = responses[userMessage] || responses["default"];
                    appendMessage(`Bot: ${botResponse}`, 'bot');
                }, 500);
                chatInput.value = '';
            }
        });

        // Function to append message to the chatbox
        function appendMessage(message, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', sender);
            messageDiv.innerText = message;
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    };
})();

