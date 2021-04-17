const BASE_URL = "http://localhost:3000/pups";
const dogBar = document.getElementById("dog-bar")

function fetchPups() {
    return fetch(BASE_URL)
            .then(response => response.json())
}

function createPupSpan(pup){
    const span = document.createElement("span");
    span.textContent = pup.name;
    return span;
}

function appendPupsToBar(pups) {
    
    pups.forEach((pup) => {
        const pupSpan = createPupSpan(pup);
        pupSpan.addEventListener('click',() => showPup(pup));
        dogBar.appendChild(pupSpan);
    })
    
}

function showPup(pup) {
    pupDiv = createPupDiv(pup);
    const dogInfo = document.getElementById("dog-info");
    dogInfo.innerHTML = "";
    dogInfo.appendChild(pupDiv);

}

function createPupDiv(pup) {
    const pupDiv = document.createElement('div');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const button = document.createElement('button');

    img.src = pup.image;
    img.alt = pup.name;
    h2.textContent = pup.name;
    button.type = 'button';
    if (pup.isGoodDog)
        button.textContent = "Good Dog!";
    else {
        button.textContent = "Bad Dog!";
    }

    button.addEventListener('click', () => toggleGoodDog(pup));
    button.id = "good-dog"

    pupDiv.appendChild(img);
    pupDiv.appendChild(h2);
    pupDiv.append(button);

    return pupDiv;
}


function toggleGoodDog(pup) {
    const button = document.getElementById("good-dog");
    if (button.textContent === 'Good Dog!') {
        button.textContent = "Bad Dog!"
        patchGoodDog(pup,false);
    }
    else{
        button.textContent = "Good Dog!"
        patchGoodDog(pup,true);
    }
        
}

function patchGoodDog(pup,goodDog) {
    configObj = {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"isGoodDog": goodDog})
    }
    fetch(`${BASE_URL}/${pup.id}`,configObj)
        //.then(resp => resp.json())
        //.then(console.log)
}

function addFilterToButton() {
    const filterButton = document.getElementById('good-dog-filter');
    filterButton.addEventListener('click', () => {
        
        if (filterButton.textContent === "Filter good dogs: OFF") {
            filterButton.textContent = "Filter good dogs: ON"
            
            fetchPups().then(filterGoodDogs);
        }
        else {
            dogBar.innerHTML = "";
            fetchPups().then(appendPupsToBar);
            
            filterButton.textContent = "Filter good dogs: OFF";
            
            
        }
    });
}

function filterGoodDogs(pups) {
    const filteredDogs = pups.filter(pup => pup.isGoodDog);
    dogBar.innerHTML = "";
    appendPupsToBar(filteredDogs);
}

fetchPups().then(appendPupsToBar);
addFilterToButton();

