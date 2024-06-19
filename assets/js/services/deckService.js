// important: never use the variable directly in other javascript files!!!!
let _cardPool = [];

// important: never use the variable directly in other javascript files!!!!
let _deck = [];


// Retrieves a sorted list of cards from the card pool, filtered by a search string and types.
function getFilteredCardPool(search, types) {

}

// Retrieves a sorted list of cards from the deck, filtered by a search string and types.
function getFilteredDeck(search, types) {


}

// Retrieves the complete deck.
function getDeck() {
    return _deck;
}

// Retrieves the complete CardPool.
function getCardPool() {
    return _cardPool;
}


function defaultSort(cards) {

}

function addCardsToCardPool(cards) {
    _cardPool.push(...cards);
}

function getBiggestManaCostFromCardPool() {
    let biggestCmcCard = getCardPool()[0];

    for (const card of getCardPool()) {
        if (biggestCmcCard.cmc < card.cmc) {
            biggestCmcCard = card;
        }
    }
    return biggestCmcCard;
}

function getCardFromPool(cardId) {
    const $ul = document.getElementById('cardPoolList');
    const $liArray = Array.from($ul.getElementsByTagName('li'));

    for (const card of $liArray) {
        const listId = card.querySelector('img').getAttribute("data-id");

        if (listId === cardId) {
            card.parentNode.removeChild(card);
            break;
        }
    }
}

function getCardFromDeck(cardId) {
    const $ol = document.getElementById('deckList');

    const $liList = $ol.getElementsByTagName("li");

    for (const $li of $liList) {

        const $ul = $li.querySelector("ul");

        if (!$ul) {
            continue;
        }

        const $rowLists = $ul.getElementsByTagName("li");

        for (const card of $rowLists) {
            const listId = card.querySelector('img').getAttribute("data-id");

            if (listId === cardId) {
                card.parentNode.removeChild(card);
                break;
            }
        }
    }
    moveCardFromDeckToPool(cardId);
}


function moveCardFromPoolToDeck(cardId) {
    for (const card of getCardPool()) {
        const cardIndex = _cardPool.findIndex(card => card.id === cardId);

        if (cardIndex !== -1) {
            const card = _cardPool[cardIndex];
            if (!(card.type_line.toLowerCase().indexOf("Basic Land".toLowerCase()) !== -1)) {
                _cardPool.splice(cardIndex, 1);
            }
            _deck.push(card);

            break;
        }
    }
}

function moveCardFromDeckToPool(cardId) {
    const cardIndex = _deck.findIndex(card => card.id === cardId);

    if (cardIndex !== -1) {
        const card = _deck[cardIndex];
        _deck.splice(cardIndex, 1);
        if (!(card.type_line.toLowerCase().indexOf("Basic Land".toLowerCase()) !== -1)) {
            _cardPool.push(card);
            renderCardPool();
        }
    }
}

function getCreatureCount() {
    let creatureCount = 0;
    for (const card of getDeck()) {
        if (card.type_line.toLowerCase().indexOf("creature".toLowerCase()) !== -1) {
            creatureCount++;
        }
    }
    return creatureCount;
}

function getLandCount() {
    let landCount = 0;
    for (const card of getDeck()) {
        if (card.type_line.toLowerCase().indexOf("land".toLowerCase()) !== -1) {
            landCount++;
        }
    }
    return landCount;
}

function getNoneCreatureNoneLandCount() {
    let noneCreatureAndNoneLand = 0;

    for (const card of getDeck()) {
        if (!(card.type_line.toLowerCase().includes("land") || card.type_line.toLowerCase().includes("creature"))) {
            noneCreatureAndNoneLand++;
        }
    }

    return noneCreatureAndNoneLand;
}


// Counts the occurrence of each mana type in the deck.
function getManasCount() {
    const manaTypesCopy = [...config.mana_types];
    const manaData = {};

    manaTypesCopy.forEach(color => {
        manaData[color] = {manaCount: 0, percentage: 0};
    });
    let lastTypeCount = 0;


    const deck = getDeck();

    for (const type of Object.keys(manaData)) {
        for (const card of getDeck()) {
            if (card.colors.includes(type) || card.colors.length === 0 && type === "") {
                manaData[type].manaCount++;
            }
        }
        lastTypeCount = manaData[type].manaCount;
    }

    const lastColor = manaTypesCopy.pop();
    delete manaData[lastColor];
    manaData["A"].manaCount += lastTypeCount;

    for (const type of Object.keys(manaData)) {
        const totalCount = deck.length;
        const manaCount = manaData[type].manaCount;
        if (totalCount > 0 && manaCount > 0) {
            manaData[type].percentage = Math.round((manaCount / totalCount) * 100);
        }
    }
    return manaData;
}

function filterCards(cards, search, types) {

}

function filterPoolCardsByType(cards, types) {
    const button = event.target;
    const $ul = document.getElementById("cardPoolList");
    const $li = $ul.getElementsByTagName("li");

    let count = 0;

    if (!button.classList.contains("selected")) {
        button.classList.add("selected");

        for (const card of cards) {
            const imageId = $li[count].querySelector("img").getAttribute("data-id");

            if (card.id === imageId &&
                card.colors.indexOf(types) !== -1 || (card.colors.length === 0 && types === "")) {
                $li[count].classList.remove('hidden');
            }
            count++;
        }

    } else if (button.classList.contains("selected")) {
        button.classList.remove("selected");

        for (const card of cards) {
            const imageId = $li[count].querySelector("img").getAttribute("data-id");

            if (card.id === imageId && card.colors.indexOf(types) !== -1 || (card.colors.length === 0 && types === "")) {
                $li[count].classList.add('hidden');
            }
            count++;
        }

    }

}

function filterPoolCardsBySearch(cards, search) {
    const $ul = document.getElementById("cardPoolList");
    const $li = $ul.getElementsByTagName("li");

    let count = 0;

    for (const card of cards) {
        const listId = $li[count].querySelector("img").getAttribute("data-id");

        if (
            (listId === card.id) && (
                card.type_line.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                card.rarity.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                card.card_face.oracle_text.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                card.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
        ) {
            if ($li[count].classList.contains('hidden')) {
                $li[count].classList.remove('hidden');
            }
        } else {
            $li[count].classList.add('hidden');
        }
        count++;
    }
}

// ## YOUR ADDED FUNCTIONS ##

function filterDeckCardsBySearch(cards, search) {
    const $ol = document.getElementById("deckList");
    const $liList = $ol.getElementsByTagName("li");

    for (const $li of $liList) {
        const $ul = $li.querySelector("ul");

        if (!$ul) {
            continue;
        }
        const $rowLists = $ul.getElementsByTagName("li");
        for (const liRow of $rowLists) {
            const listId = liRow.querySelector("img").getAttribute("data-id");
            const card = cards.find(card => card.id === listId);

            if (card) {
                if (
                    (listId === card.id) && (
                        card.type_line.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                        card.rarity.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                        card.card_face.oracle_text.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                        card.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
                    )
                ) {
                    if (liRow.classList.contains('hidden')) {
                        liRow.classList.remove('hidden');
                    }
                } else {
                    liRow.classList.add('hidden');
                }
            }
        }
    }
}

function filterDeckCardsByType(cards, types) {

    const button = event.target;
    const $ol = document.getElementById("deckList");
    const $liList = $ol.getElementsByTagName("li");


    if (!button.classList.contains("selected")) {
        button.classList.add("selected");

        for (const $li of $liList) {
            const $ul = $li.querySelector("ul");

            if (!$ul) {
                continue;
            }
            const $rowLists = $ul.getElementsByTagName("li");
            for (const liRow of $rowLists) {
                const listId = liRow.querySelector("img").getAttribute("data-id");
                const card = cards.find(card => card.id === listId);

                if (card) {
                    const cardManaValues = card.colors;
                    const filteredCards = cardManaValues.filter(color => color === types);

                    if (filteredCards.length > 0 || (types === "" && cardManaValues.length === 0)) {
                        liRow.classList.remove('hidden');
                    }
                }
            }
        }
    } else if (button.classList.contains("selected")) {
        button.classList.remove("selected");

        for (const $li of $liList) {
            const $ul = $li.querySelector("ul");

            if (!$ul) {
                continue;
            }
            const $rowLists = $ul.getElementsByTagName("li");
            for (const liRow of $rowLists) {
                const listId = liRow.querySelector("img").getAttribute("data-id");
                const card = cards.find(card => card.id === listId);

                if (card) {
                    const cardManaValues = card.colors;

                    const filteredCards = cardManaValues.filter(color => color === types);

                    if (filteredCards.length > 0 || (types === "" && cardManaValues.length === 0)) {
                        liRow.classList.add('hidden');
                    }
                }
            }
        }

    }
}
