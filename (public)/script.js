// Inicialize o Firebase (certifique-se de já ter configurado o Firebase no seu projeto)
firebase.initializeApp(firebaseConfig);

function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (message !== '') {
    // Salve a mensagem no Realtime Database
    const messagesRef = firebase.database().ref('messages');
    messagesRef.push({
      text: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP // Adiciona o timestamp da mensagem
    });

    // Limpa o campo de input após enviar a mensagem
    messageInput.value = '';
  }
}

// Event listener para o botão de envio de mensagens
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

// Função para exibir as mensagens no chat
function displayMessages(messages) {
  const chatMessages = document.querySelector('.chat-messages');
  chatMessages.innerHTML = ''; // Limpa o conteúdo anterior para evitar duplicação

  messages.forEach((message) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message.text;
    chatMessages.appendChild(messageElement);
  });

  // Rola o chat automaticamente para a última mensagem
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para ouvir as alterações no Realtime Database e atualizar a interface do usuário
function listenForMessages() {
  const messagesRef = firebase.database().ref('messages');
  messagesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const messagesArray = Object.values(data);
      displayMessages(messagesArray);
    }
  });
}

// Chama a função listenForMessages imediatamente para exibir as mensagens atuais
listenForMessages();
