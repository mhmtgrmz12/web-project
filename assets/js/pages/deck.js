// ## GIVEN ##
let eventListeners = {};

function initDeckbuildingPage() {
    const $deckBulding = document.querySelector('#deck-building.page');
    $deckBulding.classList.remove('hidden');
    const $cardDetail = document.querySelector("aside.card-detail");
    $cardDetail.classList.remove('hidden');


    renderFilter();
    renderDeck();
    renderDeckZones();


    document.querySelectorAll('.card-pool button').forEach(button => {
        button.addEventListener('click', filterPoolByType)
    });

    document.getElementById('search-pool').addEventListener('input', filterPoolBySearch);

    document.querySelectorAll(".deck button").forEach(button => {
        button.addEventListener("click", filterDeckByType);
    })

    document.getElementById("search-deck").addEventListener("input", filterDeckBySearch);

    document.querySelector('a[data-target="stats"]').addEventListener("click", toNavigation);


    document.querySelector('button[data-target="thanks"]').addEventListener("click", () => {
        $deckBulding.classList.add('hidden');
        initNavigation();
    })
}


function renderCardPool() {

    const $ul = document.querySelector("#cardPoolList");
    $ul.innerHTML = "";
    let count = 0;


    for (const card of getCardPool()) {
        const $li = `<li><img class="card"
                src="${card.image}"
                alt="${card.name}" title="${card.name}"
                data-id="${card.id}"
                data-sequence-id="${count}"></li>`;
        $ul.insertAdjacentHTML('beforeend', $li);
        count++;
    }
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseover', showCardDetail)
    });
    document.querySelectorAll('#cardPoolList .card').forEach(card => {
        card.addEventListener('dblclick', moveCardToDeck)
    });
    poolCardCount();
}

function renderDeck() {
    const $ol = document.querySelector("#deckList");
    $ol.innerHTML = "";


    for (let i = 0; i <= 8; i++) {
        const $li = `<li data-cmc="${i}"><h4>${i}</h4><ul></ul></li>`;
        $ol.insertAdjacentHTML("beforeend", $li);
    }
}


function renderDeckZones() {
    const $ol = document.getElementById("deckList");
    $ol.innerHTML = "";

    for (let i = 0; i <= 8; i++) {
        const $li = document.createElement("li");
        $li.setAttribute("data-cmc", i);

        const $h4 = document.createElement("h4");
        $h4.textContent = i;
        $li.appendChild($h4);

        const $ul = document.createElement("ul");

        appendCardsToUl($ul, i);
        $li.appendChild($ul);
        $ol.appendChild($li);
    }
    deckCardCount();

    const deckCards = document.querySelectorAll('#deckList .card');
    deckCards.forEach(card => {
        card.addEventListener('mouseover', showCardDetail);
    });

    document.querySelectorAll('#deckList .card').forEach(card => {
        card.addEventListener('dblclick', moveCardToPool)
    });
}


function showCardDetail(e) {
    e.preventDefault();
    let card = e.currentTarget;

    let $cardDetail = document.querySelector('.card-detail div img');
    $cardDetail.src = `${card.src}`;
    $cardDetail.alt = `${card.alt}`;
    $cardDetail.title = `${card.title}`;

}

function moveCardToDeck(e) {
    e.preventDefault();

    const cardId = event.target.getAttribute("data-id");

    for (const card of getCardPool()) {
        if (card.id === cardId && !(card.type_line.toLowerCase().indexOf("Basic Land".toLowerCase()) !== -1)) {
            getCardFromPool(cardId);
            break;
        }
    }
    moveCardFromPoolToDeck(cardId);
    renderDeckZones();
    poolCardCount();
    deckCardCount();
    const $divFilter = document.querySelector(".deck .manas");
    addSelectedToFilter($divFilter);
}

function moveCardToPool(e) {
    e.preventDefault();

    const cardId = event.target.getAttribute("data-id");

    for (const card of getDeck()) {
        if (card.id === cardId) {
            getCardFromDeck(cardId);
            break;
        }
    }
    poolCardCount();
    deckCardCount();
    const $divFilter = document.querySelector(".card-pool .manas");
    addSelectedToFilter($divFilter);
}


// ## YOUR ADDED FUNCTIONS ##

function renderFilter() {
    const $divFilter = document.querySelector("form .manas");
    $divFilter.innerHTML = "";
    //WUBRGA""
    const colors = ["white", "blue", "black", "red", "green", "colorless", "land"];
    let count = 0;


    for (const mana of config.mana_types) {
        const $button = `<button type="button" class="mana ${colors[count]} selected"
        data-mana="${mana}"></button>`;
        $divFilter.insertAdjacentHTML("beforeend", $button);
        count++;
    }
}

function filterPoolByType() {
    const button = event.target;
    const type = button.getAttribute("data-mana");
    filterPoolCardsByType(getCardPool(), type);
    poolCardCount();
}

function filterPoolBySearch() {
    const searchValue = this.value.toLowerCase();
    filterPoolCardsBySearch(getCardPool(), searchValue);
    poolCardCount();
}

function filterDeckByType() {
    const button = event.target;
    const type = button.getAttribute("data-mana");
    filterDeckCardsByType(getDeck(), type);
    deckCardCount();
}

function filterDeckBySearch() {
    const searchValue = this.value.toLowerCase();
    filterDeckCardsBySearch(getDeck(), searchValue);
    deckCardCount();
}

function appendCardsToUl($ul, cmc) {
    const deck = getDeck();

    for (const card of deck) {
        if (card.cmc === cmc) {
            const $liCard = document.createElement("li");
            $liCard.innerHTML = `<img class="card"
                src="${card.image}"
                alt="${card.name}" title="${card.name}"
                data-id="${card.id}">`;
            $ul.appendChild($liCard);
        }
    }
}


function toNavigation() {
    const $deckBulding = document.querySelector('#deck-building.page');
    $deckBulding.classList.add('hidden');
    document.querySelector('a[data-target="stats"]').removeEventListener("click", toNavigation);
    initNavigation();
}

function poolCardCount() {
    const poolCount = document.querySelector('.card-pool header h3');
    poolCount.innerHTML="";
    let count = 0;
    const $ul = document.getElementById('cardPoolList');
    const $li = $ul.getElementsByTagName('li');

    for (const card of $li) {
        const cardClass = card.classList;
        if (!cardClass.contains('hidden')){
            count++;
        }
    }
    poolCount.insertAdjacentHTML('beforeend', `<h3>card pool: <span>${count}</span></h3>`);
}

function deckCardCount() {
    const poolCount = document.querySelector('.deck header h3');
    poolCount.innerHTML="";
    const $ol = document.getElementById("deckList");
    const $liList = $ol.getElementsByTagName("li");
    let count = 0;
    for (const $li of $liList) {
        const $ul = $li.querySelector('ul');

        if (!$ul){
            continue;
        }

        const rowLists = $ul.getElementsByTagName("li");
        for (const liRow of rowLists) {
            if (!liRow.classList.contains("hidden")) {
                count++;
            }
        }
    }
    poolCount.insertAdjacentHTML('beforeend', `<h3>deck: <span>${count}</span></h3>`);
}
function addSelectedToFilter(target){

    const $buttons = target.getElementsByTagName('button');

    for (const $button of $buttons) {
        if (!$button.classList.contains('selected')) {
            $button.classList.add('selected');
        }
    }
}
