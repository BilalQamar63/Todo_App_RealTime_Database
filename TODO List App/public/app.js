var firebaseConfig = {
    apiKey: "AIzaSyBGcru0vrM5zUM1wwu-KksXYQzkdGqNR7c",
    authDomain: "todoapp123-9a93f.firebaseapp.com",
    databaseURL: "https://todoapp123-9a93f-default-rtdb.firebaseio.com",
    projectId: "todoapp123-9a93f",
    storageBucket: "todoapp123-9a93f.appspot.com",
    messagingSenderId: "36526884914",
    appId: "1:36526884914:web:2a1ef1a6d2b1499e98d42b"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
//   console.log(app)




firebase.database().ref('todos').on('child_added',function(data){
    
    // ====CREATE ''LI'' TAG WITH TAX NODE====
    var liElement = document.createElement("li");
    var liText = document.createTextNode(data.val().value);
    liElement.appendChild(liText);

    // ====CREATE ''DEL'' BUTTON====
    var delBtn = document.createElement("button");
    var delText = document.createTextNode("Delete");
    delBtn.appendChild(delText);
    delBtn.setAttribute('id',data.val().key)
    delBtn.setAttribute("onclick", "delItem(this)");
    delBtn.classList.add("delButton");

    liElement.appendChild(delBtn);

    // ====CREATE ''EDIT'' BUTTON====
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("Edit");
    editBtn.appendChild(editText);
    editBtn.setAttribute('id',data.val().key)
    editBtn.setAttribute("onclick", "editItem(this)");
    editBtn.classList.add("editButton");
    liElement.appendChild(editBtn);


    // ====CREATE ''LIST'' ====
    var list = document.getElementById("list");
    list.appendChild(liElement);
    console.log(liElement)
    
})

function addItem() {
    var input = document.getElementById("inputField");
    console.log(input.value)

    var key = firebase.database().ref('todos').push().key

    var todo = {
        value: input.value,
        key: key
    }

    firebase.database().ref('todos').child(key).set(todo)
    input.value = "";


}

function deletAll() {
    var list = document.getElementById("list");
    firebase.database().ref('todos').remove()
    list.innerHTML = "";
}

// =====DELETE FROM TODO APP /// REALTIME DATABASE===

function delItem(d) {
    firebase.database().ref('todos').child(d.id).remove()
    // console.log(d.id)
    console.log(d.parentNode.remove());
}

function editItem(e) {
    var input = prompt("Enter your's Updated value", e.parentNode.firstChild.nodeValue);
    var editTodo = {
        value:input,
        key:e.id
    }

    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue=input
}