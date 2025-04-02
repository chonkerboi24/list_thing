import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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

function appendItemToListEl(itemValue, itemId) {
  const li = document.createElement("li");
  li.textContent = itemValue;
  li.dataset.id = itemId; // Store the Firebase ID as a data attribute
  listEl.appendChild(li);

  // Add click event to delete
  li.addEventListener("click", function () {
    const itemRef = ref(database, `cart/${itemId}`);
    remove(itemRef)
      .then(() => {
        console.log("Item removed successfully");
      })
      .catch((error) => {
        console.error("Error removing item: ", error);
      });
  });
}

function clearInputEl() {
  inputFieldEl.value = "";
}

function clearListEl() {
  listEl.innerHTML = "";
}

onValue(cartDB, function (snapshot) {
  if (snapshot.exists()) {
    clearListEl();
    // Get both the key (ID) and value for each item
    Object.entries(snapshot.val()).forEach(([id, value]) => {
      appendItemToListEl(value, id);
    });
  } else {
    clearListEl(); // Clear list if database is empty
  }
});

btnAddEl.addEventListener("click", function () {
  if (inputFieldEl.value !== "") {
    let inputValue = inputFieldEl.value;
    push(cartDB, inputValue);
    clearInputEl();
  }
});
