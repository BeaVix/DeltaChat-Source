//SCRIPT TO GENERATE A CHARACTER GRID WITH THE PORTRAITS

const characters = [
    {
        id: "pippins",
        name: "Pippins",
        image: "portrait_pippins.png"
    },
    {
        id: "green pippins",
        name: "Green Pippins",
        image: "portrait_green pippins.png"
    },
    {
        id: "kris",
        name: "Kris",
        image: "portrait_kris.png"
    },
    {
        id: "susie",
        name: "Susie",
        image: "portrait_susie.png"
    },
    {
        id: "ralsei",
        name: "Ralsei",
        image: "portrait_ralsei.png"
    },
     {
        id: "noelle",
        name: "Noelle",
        image: "portrait_noelle.png"
    },
     {
        id: "berdly",
        name: "Berdly",
        image: "portrait_berdly.png"
    },
    {
        id: "lancer",
        name: "Lancer",
        image: "portrait_lancer.png"
    },
    {
        id: "ruddin",
        name: "Ruddin",
        image: "portrait_ruddin.png"
    },
    {
        id: "rabbick",
        name: "Rabbick",
        image: "portrait_rabbick.png"
    },
    {
        id: "spamton",
        name: "Spamton",
        image: "portrait_spamton.png"
    },
    {
        id: "tenna",
        name: "Tenna",
        image: "portrait_tenna.png"
    },
    {
        id: "bibliox",
        name: "Bibliox",
        image: "portrait_bibliox.png"
    },
    {
        id: "flowery",
        name: "Flowery",
        image: "portrait_flowery.png"
    
    },
    {
        id: "aqua",
        name: "Aqua",
        image: "portrait_aqua.png"
    },
    {
        id: "pink",
        name: "Pink",
        image: "portrait_pink.png"
    },
    {
        id: "pink (ghost)",
        name: "Pink (Ghost)",
        image: "portrait_pink (ghost).png"
    },
    {
        id: "kawkaw",
        name: "KawKaw",
        image: "portrait_kawkaw.png"
    },
    {
        id: "friend",
        name: "Friend",
        image: "portrait_friend.png"
    },
    {
        id: "eram",
        name: "Eram",
        image: "portrait_eram.png"
    },
    {
        id: "frisk",
        name: "Frisk",
        image: "portrait_frisk.png"
    },
    {
        id: "flowey",
        name: "Flowey",
        image: "portrait_flowey.png"
    },
    {
        id: "chara",
        name: "Chara",
        image: "portrait_chara.png"
    },
    {
        id: "noyno",
        name: "Noyno",
        image: "portrait_noyno.png"
    },
    {
        id: "jackpins",
        name: "Jackpins",
        image: "portrait_jackpins.png"
    },
/*    {
        id: "lamen",
        name: "Lamen",
        image: "portrait_lamen.png"
    },
*/
    {
        id:"orange rabbick",
        name: "Orange Rabbick",
        image: "portrait_orange rabbick.png"
    }
];

// Default selected character
window.selectedAvatar = localStorage.getItem("selectedAvatar") || characters[0].id;

document.addEventListener("DOMContentLoaded", () => {

    const selectedCharacter =
    characters.find(c => c.id === window.selectedAvatar) || characters[0];

    const grid = document.getElementById("characterGrid");
    const portrait = document.getElementById("portrait");
    const characterName = document.getElementById("characterName");
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

            localStorage.setItem("selectedAvatar", character.id);

            window.selectedAvatar = character.id;

        });

        grid.appendChild(img);

    });

});