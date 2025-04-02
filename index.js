import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://pretzl-maker-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const cartDB = ref(database, "cart");

const inputFieldEl = document.getElementById("input-field");
const btnAddEl = document.getElementById("btn-add");
const listEl = document.getElementById("list");

// Add mobile-friendly CSS styles programmatically
const style = document.createElement('style');
style.textContent = `
  li {
    padding: 12px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s;
    min-height: 48px;
    line-height: 1.5;
    margin: 4px 0;
    border-bottom: 1px solid #eee;
  }
  li:active {
    background-color: #f0f0f0;
  }
`;
document.head.appendChild(style);

function appendItemToListEl(itemValue, itemId) {
  const li = document.createElement("li");
  li.textContent = itemValue;
  li.dataset.id = itemId;
  
  // Use pointerdown for both mouse and touch devices
  li.addEventListener("pointerdown", function(e) {
    e.preventDefault();
    if (confirm("Delete this item?")) {
      const itemRef = ref(database, `cart/${itemId}`);
      remove(itemRef)
        .then(() => console.log("Item deleted"))
        .catch((error) => console.error("Error deleting item:", error));
    }
  });
  
  listEl.appendChild(li);
}

function clearInputEl() {
  inputFieldEl.value = "";
}

function clearListEl() {
  listEl.innerHTML = "";
}

onValue(cartDB, function(snapshot) {
  clearListEl();
  
  if (snapshot.exists()) {
    Object.entries(snapshot.val()).forEach(([id, value]) => {
      appendItemToListEl(value, id);
    });
  }
});

btnAddEl.addEventListener("click", function() {
  const inputValue = inputFieldEl.value.trim();
  if (inputValue !== "") {
    push(cartDB, inputValue)
      .then(() => clearInputEl())
      .catch((error) => console.error("Error adding item:", error));
  }
});

// Add viewport meta tag if it doesn't exist (for mobile responsiveness)
if (!document.querySelector('meta[name="viewport"]')) {
  const meta = document.createElement('meta');
  meta.name = "viewport";
  meta.content = "width=device-width, initial-scale=1";
  document.head.appendChild(meta);
}