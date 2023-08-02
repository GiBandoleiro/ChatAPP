import { app, analytics } from './firebase'
// Inicialize o Firebase com a configuração do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyApkKOMsz6I4gy5O6Y5VAnHt538qN9sJ3s",
  authDomain: "chatappaovivo.firebaseapp.com",
  projectId: "chatappaovivo",
  storageBucket: "chatappaovivo.appspot.com",
  messagingSenderId: "1050433533269",
  appId: "1:1050433533269:web:8079aaa95138fef059ebdc",
  measurementId: "G-RMCB2CS3RN",
};

firebase.initializeApp(firebaseConfig);

// Função para enviar uma mensagem ao pressionar Enter ou clicar no botão "Send"
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();
  if (message !== "") {
    // Salve a mensagem no Realtime Database
    const messagesRef = firebase.database().ref("messages");
    messagesRef.push({
      text: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });

    // Limpa o campo de input após enviar a mensagem
    messageInput.value = "";
  }
}

// Event listener para o botão de envio de mensagens
document.getElementById("send-button").addEventListener("click", sendMessage);
document
  .getElementById("message-input")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

// Função para exibir as mensagens no chat
function displayMessages(messages) {
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML = ""; // Limpa o conteúdo anterior para evitar duplicação

  messages.forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message.text;
    chatMessages.appendChild(messageElement);
  });

  // Rola o chat automaticamente para a última mensagem
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para ouvir as alterações no Realtime Database e atualizar a interface do usuário
function listenForMessages() {
  const messagesRef = firebase.database().ref("messages");
  messagesRef.on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const messagesArray = Object.values(data);
      displayMessages(messagesArray);
    }
  });
}

// Chama a função listenForMessages imediatamente para exibir as mensagens atuais
listenForMessages();
