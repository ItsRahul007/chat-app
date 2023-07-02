const socket = io("http://localhost:8080");

const form = document.getElementById("form");
const msgInput = document.getElementById("msg-input");
const msgContainer = document.querySelector(".msg-con");

function append(massage, position){
  const msg = document.createElement("div")
  msg.innerText = massage;
  msg.classList.add("message");
  msg.classList.add(position);
  msgContainer.append(msg);
};

const userName = prompt("enter your name");
socket.emit("new-user-join", userName);

socket.on("user-join", name =>{
    append(`${name} join the chat`, "left");
});

socket.on("recive-msg", e =>{
    append(`${e.name}: ${e.message}`, "left");
});

socket.on("user-offline", name =>{
    append(`${name} left the chat`, "left");
});

form.addEventListener("submit", e =>{
    e.preventDefault();
    socket.emit("send-msg", msgInput.value);
    append(`you: ${ msgInput.value}`, "right");
    msgInput.value = '';
});

