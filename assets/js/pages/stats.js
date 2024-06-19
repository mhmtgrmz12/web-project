// ## GIVEN ##

function initStatsPage() {
    const $statsPage = document.getElementById('stats');
    $statsPage.classList.remove('hidden');

    renderStatsType();
    renderManaStats();

    document.querySelector("#stats div a").addEventListener('click', () => {
        $statsPage.classList.add('hidden');
        initNavigation();
    })
}


// ## YOUR ADDED FUNCTIONS ##

function renderStatsType() {
    const $ul = document.getElementById('type-stats');
    $ul.innerHTML = "";

    let total = getNoneCreatureNoneLandCount() + getLandCount() + getCreatureCount();

    $ul.insertAdjacentHTML("beforeend", `<li><p><span>Creatures: </span>${getCreatureCount()}</p></li>`);
    $ul.insertAdjacentHTML("beforeend", `<li><p><span>None creatures: </span>${getNoneCreatureNoneLandCount()}</p></li>`);
    $ul.insertAdjacentHTML("beforeend", `<li><p><span>Lands: </span>${getLandCount()}</p></li>`);
    $ul.insertAdjacentHTML("beforeend", `<li><p><span>Total: </span>${total}</p></li>`);

}

function renderManaStats() {
    const colors = ["white", "blue", "black", "red", "green", "colorless"];
    let count = 0;
    const manaData = getManasCount();
    const $ul = document.getElementById('mana-stats');
    $ul.innerHTML = "";

    for (const type of Object.keys(manaData)){
        const $li = `<li><div class="mana ${colors[count]}" data-mana="${type}"></div>
                            <p>${manaData[type].manaCount}<br>${manaData[type].percentage}%</p></li>`;

        $ul.insertAdjacentHTML("beforeend", $li);
        count++;
    }
}