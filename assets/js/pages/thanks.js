
// ## GIVEN ##

function initThankYouPage(){
    const $thanksPage = document.getElementById('thanks');
    $thanksPage.classList.remove('hidden');

    renderMessage();
}

// ## YOUR ADDED FUNCTIONS ##

function renderMessage(){
    const $p = document.querySelector("#thanks p");
    const $name = document.querySelector("#name").value;
    const $choosedSet = document.querySelector('input[name="sets"]:checked').id;

    const selectedSet = config.sets[$choosedSet];


    $p.innerHTML=`<p>Good luck and have fun ${$name} with ${selectedSet}!</p>`;
}

//<p>Good luck and have fun Dim with Shards of Alara!</p>