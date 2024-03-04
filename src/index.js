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
document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById("toy-collection");

  // Step 2: Make a 'GET' request
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {
      // Step 3: Render toy cards
      toys.forEach(toy => {
        const card = createToyCard(toy);
        toyCollection.appendChild(card);
      });
    });

  // Helper function to create a toy card
  function createToyCard(toy) {
    const card = document.createElement("div");
    card.classList.add("card");

    const h2 = document.createElement("h2");
    h2.textContent = toy.name;

    const img = document.createElement("img");
    img.classList.add("toy-avatar");
    img.src = toy.image;

    const p = document.createElement("p");
    p.textContent = `${toy.likes} Likes`;

    const button = document.createElement("button");
    button.classList.add("like-btn");
    button.textContent = "Like ❤️";
    button.id = toy.id;

    // Step 4: Add event listener to the like button
    button.addEventListener("click", () => {
      // Update likes
      toy.likes++;
      // Update DOM
      p.textContent = `${toy.likes} Likes`;

      // Step 5: Update likes on the server
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ likes: toy.likes })
      });
    });

    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);

    return card;
  }
});
