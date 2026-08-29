//SCRIPT TO GENERATE A CHARACTER GRID WITH THE PORTRAITS
import characters from "./../characters.json"

// Default selected character
window.selectedAvatar = localStorage.getItem("selectedAvatar") || characters[0].id;

document.addEventListener("DOMContentLoaded", () => {

    const selectedCharacter =
    characters.find(c => c.id === window.selectedAvatar) || characters[0];

    const grid = document.getElementById("characterGrid");
    const portrait = document.getElementById("portrait");
    const characterName = document.getElementById("characterName");
    const characterCredit = document.getElementById("characterCredit");
    const savedAvatar = localStorage.getItem("selectedAvatar");

    if (!grid || !portrait || !characterName) return;

    /*
    portrait.src = characters[0].image;
    characterName.textContent = characters[0].name;
    */

    portrait.src = selectedCharacter.image;
    characterName.textContent = selectedCharacter.name;

    characters.forEach((character, index) => {

        const img = document.createElement("img");

        img.src = character.image;
        img.alt = character.name;
        img.title = character.name;

        img.classList.add("avatar");

        if (index === 0) {
            img.classList.add("selected");
        }

        img.addEventListener("click", () => {

            document.querySelectorAll(".avatar").forEach(a =>
                a.classList.remove("selected")
            );

            img.classList.add("selected");

            //show selected image with corresponding name
            portrait.src = character.image;
            characterName.textContent = character.name;

            if(character.by){
                characterCredit.parentNode.style.display = "block"
                characterCredit.textContent = character.by
            }else{
                characterCredit.parentNode.style.display = "none"
            }
            

            localStorage.setItem("selectedAvatar", character.id);

            window.selectedAvatar = character.id;

        });

        grid.appendChild(img);

    });

});