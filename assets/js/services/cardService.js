// ## GIVEN ##

// important: never use the variable directly in other javascript files!!!!
const _cards = [];

// important: never use the variable directly in other javascript files!!!!
let _rarityList;


// Loads a set of cards into the _cards array
function loadSet(set) {
    _cards.push(..._allCards[set]);
}

// Retrieves the current list of cards stored in _cards.
function getCards() {
    return _cards;
}

// Searches for a card by its ID in the _cards array. If found, returns the card object; otherwise, returns null.
function findCardById(id) {
    for (const card of _cards) {
        if (card.id === id) {
            return card;
        }
    }
}

// Generates a booster pack of cards based on a predefined structure from the config object. It selects unique and random cards based on rarity and adds them to the booster pack.
// An array of (unqiue and random) card objects representing a booster pack.
function getBooster() {
    let boosterPack = [];

    const randomIndex = Math.floor(Math.random() * config.rarities.length);
    const randomRarity = config.rarities[randomIndex];

    boosterPack.push(...getRandomCards('rare', 1));
    boosterPack.push(...getRandomCards(randomRarity, 1));
    boosterPack.push(...getRandomCards('uncommon', 3));
    boosterPack.push(...getRandomCards('common', 10));




    return boosterPack;
}

// Selects a random set of cards based on rarity. It ensures that no duplicates or basic land  are included .

function getRandomCards(rarity, nrOfCards) {
    let possibleCards = _cards.filter(card => card.rarity === rarity && !isBasicLand(card));


    possibleCards.sort(() => Math.random() - 0.5);

    let selectedCards = [];


    let count = 0;
    for (const card of possibleCards) {
        selectedCards.push(card);
        count++;
        if (count === nrOfCards) {
            break;
        }
    }

    return selectedCards;
}


// Organizes all cards from _cards by their rarity. If this has been done before, it returns the previously created list.
function getCardListByRarity(a, b) {

    const rarityOrder = {common: 0, uncommon: 1, rare: 2};
    return rarityOrder[a.rarity] - rarityOrder[b.rarity];
}

function isBasicLand(card) {
    const basicLands = config.basic_lands.map(land => land.toLowerCase());
    const cardName = card.name.toLowerCase();

    return basicLands.includes(cardName);

}

//  Retrieves all basic land cards from _cards.
function getBasicLands() {
    let listBasicLands = [];
    for (const card of _cards) {
        if (card.card_face.type_line.main === 'Basic Land') {
            listBasicLands.push(card);
        }
    }
    return listBasicLands;
}


// ## YOUR ADDED FUNCTIONS ##
function cardControl(cards1, cards2) {

    for (const card of cards1) {
        if (cards2.includes(card)) {
            return false;
        }
    }
    return true;
}
