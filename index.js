import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://pretzl-maker-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const cartDB = ref(database, "cart");

const inputFieldEl = document.getElementById("input-field");
const btnAddEl = document.getElementById("btn-add");
const listEl = document.getElementById("list");

function appendItemToListEl(itemValue) {
  listEl.innerHTML += `<li>${itemValue}</li>`;
}

function clearInputEl() {
  inputFieldEl.value = "";
}

function clearListEl(){
    listEl.innerHTML = "";
}

onValue(cartDB, function (snapshot) {
  if (snapshot.val() != null) {
    let listArray = Object.values(snapshot.val());
    clearListEl();
    for (let i = 0; i < listArray.length; i++) {
      appendItemToListEl(listArray[i]);
    }
  }
});

btnAddEl.addEventListener("click", function () {
  if (inputFieldEl.value !== "") {
    let inputValue = inputFieldEl.value;
    console.log(inputValue);
    push(cartDB, inputValue);
    clearInputEl();
  }
});
