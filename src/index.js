let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// my code below 
const toyCollection = document.getElementById("toy-collection");
const newToy = document.querySelector(".add-toy-form");
fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => {
    Object.values(data).forEach((toy) => {
      let div = document.createElement("div")
      div.className = "card"
      div.innerHTML = `<h2>${toy.name}</h2><img src=${toy.image}id= toy-header img class=toy-avatar /><p>${toy.likes}</p><button class=like-btn id=${toy.id}>Like ❤️</button>`
      toyCollection.appendChild(div);
      div.querySelector(".like-btn").addEventListener("click", () => {
        toy.likes++
        div.querySelector("p").textContent = toy.likes
        patch(toy)
      })
    })
  })

function post() {
  newToy.addEventListener("submit", (e) => {
    const toyData = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(toyData)
    })
      .then(res => res.json())
      .then((toy) => {
        let div = document.createElement("div")
        div.className = "card"
        div.innerHTML = `<h2>${toy.name}</h2><img src="${toy.image}" id="toy-header" class="toy-avatar" /><p>${toy.likes}</p><button class="like-btn" id="${toy.id}">Like ❤️</button>`;
        toyCollection.appendChild(div);
        div.querySelector(".like-btn").addEventListener("click", () => {
          toy.likes++
          div.querySelector("p").textContent = toy.likes
          patch(toy)
        })
      })
      .catch(e => alert(e.message))
    e.preventDefault();
  })
}
function patch(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  })
    .then(res => res.json())
    .then(data => console.log(data))
}
post();
