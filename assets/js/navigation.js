// ## GIVEN ##

const NR_OF_BACKGROUNDS = 3;
function initNavigation(){

    const $body = document.querySelector("body");
    const currentClass = Array.from($body.classList).find(className => className.startsWith('background-'));
    if (currentClass) {
        $body.classList.remove(currentClass);
    }

    $body.classList.add(`background-0${getRandomNumber(NR_OF_BACKGROUNDS, 1)}`);

    navigate();
}

function navigate(e){

    const targetId = event.target.getAttribute('data-target');
    navigateToPage(targetId);
}

function navigateToPage(targetId){
    switch (targetId) {
        case 'boosters':
            initBoostersPage();
            break;
        case 'deck-building':
            initDeckbuildingPage();
            break;
        case 'stats':
            initStatsPage();
            break;
        case 'thanks':
            initThankYouPage();
            break;
        default:
            break;
    }
}


// ## YOUR ADDED FUNCTIONS ##
