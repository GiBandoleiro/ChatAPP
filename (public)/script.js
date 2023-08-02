// Inicialize o Firebase (certifique-se de já ter configurado o Firebase no seu projeto)
firebase.initializeApp(firebaseConfig);

// Event listener para o botão de envio de mensagens
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

document.getElementById('message-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message !== '') {
      sendMessage();
      saveMessage(message); // Chama a função saveMessage() para salvar a mensagem no Realtime Database
      messageInput.value = '';
    }
  }
});

function saveMessage(message) {
  const messagesRef = firebase.database().ref('messages');
  messagesRef.push({
    text: message,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
}

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

  // Primeiro, vamos buscar todas as mensagens existentes
  messagesRef.once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.values(data);
        displayMessages(messagesArray);
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar as mensagens:', error);
    });

  // Agora, vamos ouvir novas mensagens adicionadas
  messagesRef.on('child_added', (snapshot) => {
    const newMessage = snapshot.val();
    displayMessages([newMessage]);
  });
}
// Chama a função listenForMessages imediatamente para exibir as mensagens atuais
listenForMessages();
