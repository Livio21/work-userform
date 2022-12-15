"use strict";

let users = [];

window.onload = function () {
  syncUser();
  displayUsers();
};

function addUser() {
  let user = getUserData();
  if (user === undefined) {
    return;
  } else {
    users.push(user);
    saveUser();
    console.log(users);
    displayUsers();
  }
}

function syncUser() {
  let data = localStorage.getItem("users");
  console.log(data);
  if (data === null) {
    users = [];
  } else {
    users = JSON.parse(data);
  }
}

function saveUser() {
  localStorage.setItem("users", JSON.stringify(users));
}

function getUserData() {
  let userData = {};
  const nameInput = document.getElementById("nameInput");
  const roleInput = document.getElementById("roleInput");
  const regex = /^[a-zA-Z]{2,}$/;
  if (nameInput.value === "" || roleInput.value === "") {
    document.getElementById("warning").innerText =
      "Ju lutem plotesoni te gjitha fushat.";
  } else {
    document.getElementById("warning").innerText = "";
    userData["id"] = users.length;
    if (regex.test(nameInput.value)) {
      userData["name"] = nameInput.value;
    } else {
      document.getElementById("warning").innerText =
        "Ju lutem shkruani emrin me te pakten 2 karaktere.";
      return;
    }
    userData["role"] = roleInput.value;
    nameInput.value = "";
    roleInput.value = "";
    console.log(userData);
    return userData;
  }
}
function addNewUserCard(user, index) {
  const usersDiv = document.getElementById("users");
  usersDiv.innerHTML += `
  <div id="user-${user.id}" class="userCard">
          <div class="avatar">
            <img
              src="avatar.png"
              alt="userIcon"
              srcset=""
              width="50"
              height="50"a
            />
            <div class="userInfo">
              <p id="name">${user.name}</p>
              <p id="role">${user.role}</p>
            </div>
          </div>
          <button id="deleteButton" onclick="removeUser(${index},${user.id})">🞮</button>
        </div>`;
}
function displayUsers() {
  const usersDiv = document.getElementById("users");
  usersDiv.innerHTML = "";
  filteredUser().forEach((user, index) => {
    addNewUserCard(user, index);
  });
}

function removeUser(index, id) {
  console.log(id, index);
  users.splice(index, 1);
  saveUser();
  document.getElementById("user-" + id).remove();
  console.log(users);
}

function filteredUser() {
  let search = document.getElementById("search");
  return users.filter((user) => {
    console.log(user);
    return user.name.toLowerCase().includes(search.value.toLowerCase());
  });
}
