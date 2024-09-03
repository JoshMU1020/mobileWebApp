import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase,
    ref,
    push,
    onValue,
    remove } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-8d0f1-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

function render(arr) {
    let listItems = "";
    for (let i = 0; i < arr.length; i++) {
        listItems += `
        <li>
            <a href="${arr[i]}" target="_blank">
                ${arr[i]}
            </a>
        </il>`;
    }
    ulEl.innerHTML = listItems;
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists();
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val();
        const leads = Object.values(snapshotValues);
        render(leads);
    }
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value);
    inputEl.value = "";
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB);
    ulEl.innerHTML = "";
})