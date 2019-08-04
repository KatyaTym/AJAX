const API = 'https://test-users-api.herokuapp.com/';

const list = createUsersList();

getUsers();
createAddBtnOnClickEvent();

function addUserToList(user) {
    const name = user.name;
    const age = user.age;
    const id = user.id;

    const element = document.createElement("li");

    console.log(name + " " + age + " " + id);
    element.textContent = name + " " + age;
    list.append(element);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.onclick = function() {
        deleteUser(id);
        element.parentNode.removeChild(element);
        deleteBtn.parentNode.removeChild(deleteBtn);
    };
    deleteBtn.textContent = "Delete";
    list.appendChild(deleteBtn);
}

function addUsersToList(users) {
    users.data.forEach(addUserToList);
}

function createUsersList() {
    const div = document.createElement("div");
    const list = document.createElement("ul");
    div.append(list);
    document.body.append(div);
    return list;
};

function getJson(res) {
    return res.json();
};

function getUsers() {
    let response = fetch(API + 'users');
    let response_json = response.then(getJson);
    response_json.then(addUsersToList);
}

function addUser(name, age) {
    const user = {
        name: name,
        age: age
    };

    const request_options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const add_user_data_to_list = function(user) {
        const u = {
            name: user.data.name,
            age: user.data.age,
            id: user.data._id
        };
        addUserToList(u);
    }

    fetch(API + 'users', request_options).then(getJson).then(add_user_data_to_list);
}

function deleteUser(id) {
    const request_options = {
        method: 'DELETE'
    };

    fetch(API + 'users/' + id, request_options);
}

function createAddBtnOnClickEvent() {
    const addBtn = document.getElementById("addBtn");
    const name = document.getElementById("name");
    const age = document.getElementById("age");
    addBtn.onclick = function() {
        addUser(name.value, age.value);
        name.value = "";
        age.value = "";
    };
}