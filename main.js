const API = 'https://test-users-api.herokuapp.com/';  

let list;

function addUserToList(name, age, id) { 
    const element = document.createElement("li");

    console.log(name + " " + age);
    element.textContent = name + " " + age;
    list.append(element);

    const deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.onclick = function() {
    	deleteUser(id);
    	element.parentNode.removeChild(element);
    	deleteBtn.parentNode.removeChild(deleteBtn);
    };
    deleteBtn.value = "Delete";
    list.appendChild(deleteBtn);
}

function createUsersList(users) {
    list = document.createElement("ul");
    users.data.forEach((user) => {
        addUserToList(user.name, user.age, user.id);
    });
    document.body.append(list);
};

function getUsers() {
    fetch(API + 'users').then(res => {
        return res.json();
    }).then(users => {
        createUsersList(users);
    });
}

function addUser(name, age) {
    const user = {
        name: name,
        age: age
    };
    fetch(API + 'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            return res.json();
        })
        .then(users => {
            console.log(users);
            addUserToList(users.data.name, users.data.age);
        });
}

function deleteUser(id) {
    fetch(API + 'users/' + id, {
        method: 'DELETE'
    });
}

function createAddBtnOnClickEvent() {
	const addBtn = document.getElementById("addBtn");
	const name = document.getElementById("name");
	const age = document.getElementById("age");
	addBtn.onclick = function() {
		//console.log(name.value + " " + age.value);
		addUser(name.value, age.value);
	};
}

getUsers();
createAddBtnOnClickEvent();