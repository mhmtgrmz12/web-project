// _unopendBoosters: contains the list of boosterpacks, opened and/or unopened
// for example: [0, 1, 2, 1, 3, 3] 
// this means: first booster is open and has the version 0 image, second is not open and has the version image, third one is not open and has the version 2 image, ...
// if you have an better/other solution here, you may implent your own!!!

let _unopendBoosters = [];

let openedCards = [];
const _MAX_BOOSTER_VERSIONS = 3;
let count = 0;


// ## GIVEN ##

function initBoostersPage() {


    const $boostersPage = document.querySelector('#boosters.page');
    $boostersPage.classList.remove('hidden');

    const $boosters = document.getElementById("number_of_boosters").value;
    const $choosedSet = document.querySelector('input[name="sets"]:checked');
    const $setName = $choosedSet.id;

    const $ul = document.getElementById("openedBooster");
    $ul.innerHTML = "";

    count = $boosters;
    makeRandomBoosters($boosters);
    renderUnOpenedBoostersList($setName);
    loadSet($setName);
    openBoosterPacks();
}


// ## YOUR ADDED FUNCTIONS ##

function renderUnOpenedBoostersList(set) {

    const $ul = document.getElementById('unopenedBoosters');
    $ul.innerHTML = "";

    for (const card of _unopendBoosters) {
        const $li = `<li><img src="images/${set}/booster_v${card}.jpg" alt="booster" title="booster"
                            data-booster="${card}" data-open="0"></li>`;
        $ul.insertAdjacentHTML('beforeend', $li);
    }
}

function renderOpenedCardsList() {
    const booster_cards = [];
    booster_cards.push(...getBooster());
    openedCards.push(...booster_cards);

    const $ul = document.getElementById("openedBooster");
    $ul.innerHTML = "";
    let count = 0;

    for (const card of getBooster()) {
        const $li = `<li><img class="card" src="${card.image}" alt="${card.name}" title="${card.name}" 
                            data-id="${card.id}"
                            data-sequence-id="${count}"></li>`;
        $ul.insertAdjacentHTML('beforeend', $li);
        count++;
    }
}

function makeRandomBoosters(number) {
    for (let i = 0; i < number; i++) {
        _unopendBoosters.push(getRandomNumber(3, 1));
    }
}


function openBoosterPacks() {

    let $cardList = document.getElementById('unopenedBoosters').getElementsByTagName('li');
    const $buildButton = document.querySelector('[data-target="deck-building"]');

    for (let i = 0; i < $cardList.length; i++) {
        if ($buildButton) {
            $buildButton.addEventListener('click', deckBuilding);
        }
        $cardList[i].addEventListener('click', function () {
            openBooster(this);
            count--;
        })
    }
}

function openBooster(element) {
    element.querySelector('img').dataset.open = '1';

    element.querySelector('img').src = 'images/ala/booster_v0.jpg';

    renderOpenedCardsList();
}

function deckBuilding() {

    for (let i = 0; i < count; i++){
        renderOpenedCardsList();
    }

    const $boostersPage = document.querySelector('#boosters.page');
    $boostersPage.classList.add('hidden');

    openedCards.push(...getBasicLands());
    addCardsToCardPool(openedCards);
    renderCardPool();
    initNavigation();

}