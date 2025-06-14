
const firebaseConfig = {
  apiKey: "AIzaSyCin7pX7iosUlrzQ_2fl6tPUvAhk1DYRCw",
  authDomain: "chat-app-ac510.firebaseapp.com",
  projectId: "chat-app-ac510",
  storageBucket: "chat-app-ac510.appspot.com",
  messagingSenderId: "654426447598",
  appId: "1:654426447598:web:9a22c998ba0231c2f4ddff"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const messagesRef = db.collection("messages");

let myName = "";
let chattingWith = "";
let unsubscribe = null;

window.onload = () => {
  myName = localStorage.getItem("chatName") || prompt("Enter your name:");
  if (!myName || myName.trim() === "") return alert("Name is required");
  localStorage.setItem("chatName", myName);
  loadUsers();
};

function startChat() {
  const user = document.getElementById("newUser").value.trim();
  if (!user || user === myName) return alert("Invalid user.");
  chattingWith = user;
  listenMessages();
}

function loadUsers() {
  const userSet = new Set();
  messagesRef.where("from", "==", myName).get().then(sent => {
    sent.forEach(doc => userSet.add(doc.data().to));
    messagesRef.where("to", "==", myName).get().then(received => {
      received.forEach(doc => userSet.add(doc.data().from));
      const list = document.getElementById("userList");
      list.innerHTML = "";
      userSet.forEach(user => {
        const div = document.createElement("div");
        div.className = "user";
        div.textContent = user;
        div.onclick = () => {
          chattingWith = user;
          listenMessages();
          switchToChatView(); // 👈 added
        };

        list.appendChild(div);
      });
    });
  });
}

function listenMessages() {
  if (!chattingWith) return;
  if (unsubscribe) unsubscribe();

  unsubscribe = messagesRef
    .where("participants", "array-contains", myName)
    .orderBy("timestamp")
    .onSnapshot(snapshot => {
      const box = document.getElementById("messages");
      box.innerHTML = "";
      snapshot.forEach(doc => {
        const msg = doc.data();
        const validChat =
          (msg.from === myName && msg.to === chattingWith) ||
          (msg.from === chattingWith && msg.to === myName);
        if (validChat) {
          const div = document.createElement("div");
          div.className = "msg " + (msg.from === myName ? "me" : "other");
          div.textContent = msg.text;
          box.appendChild(div);
        }
      });
      box.scrollTop = box.scrollHeight;
    });
}

function sendMessage() {
  const text = document.getElementById("message").value.trim();
  if (!text || !chattingWith) return alert("Choose a user to chat with.");
  messagesRef.add({
    from: myName,
    to: chattingWith,
    text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    participants: [myName, chattingWith]
  });
  document.getElementById("message").value = "";
}

function showAddFriendPrompt() {
  const user = prompt("Enter name to chat with:");
  if (!user || user.trim() === "" || user === myName) {
    alert("Invalid name.");
    return;
  }
  chattingWith = user.trim();
  listenMessages();
}
function switchToChatView() {
  if (window.innerWidth <= 768) {
    document.querySelector(".sidebar").classList.add("hidden");
    document.querySelector(".chat").classList.add("active");
  }
}

function goBack() {
  document.querySelector(".sidebar").classList.remove("hidden");
  document.querySelector(".chat").classList.remove("active");
}
