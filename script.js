
const fetchBtn = document.getElementById("fetchBtn")
    .addEventListener("click", () => fetchData());

document.getElementById("pokemonName")
    .addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            fetchData();
        }
    });

    const pokemonListItems = document.querySelectorAll(".list ul li");
    pokemonListItems.forEach(item => {
        item.addEventListener("click", () => fetchData(item.textContent));
    });

async function fetchData(pokemonName = "") {
    try {
        console.log(pokemonName);
        

        if(!pokemonName){
            pokemonName = document.getElementById("pokemonName").value.toLowerCase();
            if(!pokemonName){
                alert("Please enter a valid Pokemon name");
                return;
            }
        }
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        console.log(pokemonName);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;

        const imgElem = document.getElementById("pokemonSprite");
        imgElem.src = pokemonSprite;
        imgElem.style.display = "block";

    }
    catch (error) {
        alert(error);
        const imgElem = document.getElementById("pokemonSprite");
        imgElem.src = "";
        imgElem.style.display = "none";
    }
}