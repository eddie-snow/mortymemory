const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer'
];

const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card'); //pega todos os elementos e salva em um array

    if (disabledCards.length === 20) {
        clearInterval(this.loop); //stop timer
        alert(`you won ${spanPlayer.innerHTML}! time:${timer.innerHTML}`);
    }

}

const checkCards = () =>{

    const firstCharacter = firstCard.getAttribute('character-data');
    const secondCharacter = secondCard.getAttribute('character-data');

    if (firstCharacter === secondCharacter){
        
        firstCard.firstChild.classList.add('disabled-card'); //firstChild so it doesnt flip
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    }
    else{

        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500); //wait 500 miliseconds before turning them back

    }

}
const revealCard = ({ target}) =>{ //target is the clicked element

    if (target.parentNode.className.includes('reveal-card')) {
        return; //se a carta ja foi revelada, nao fazemos nada
    }

    if (firstCard === ''){ //meaning is the first time the user is clicking
        target.parentNode.classList.add('reveal-card'); //appending revel-card div to card div
        firstCard = target.parentNode;
    }
    else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
    
}

const createCard = (character) =>{

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`; //``allows js code inside a string 

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('character-data', character);

    return card;

    /* essentialy this is what is being created
    <div class="card">
        <div class="face front"></div>
        <div class="face back"></div>
    </div>*/
}

const loadGame = () =>{

    const duplicateChraracters = [ ...characters, ...characters ]; //... expalha o array

    const shuffledArray = duplicateChraracters.sort(()=> Math.random() -0.5); //Math.random -> random number between 0 and 1, - 0,5 pois nos interessa ter um numero positivo ou negativo

    shuffledArray.forEach((character) =>{

        const card = createCard(character);
        grid.appendChild(card)

    });

}

const startTimer = () =>{

    //setInterval espera dois parametros
    this.loop = setInterval(()=>{

        const currentTIme = Number(timer.innerHTML); //you could also use +timer.innerHTML is a shorter way of converting str to numbers
        timer.innerHTML = currentTIme + 1;

    }, 1000); //1000 ms == 1s

}

window.onload = () =>{ //vai executar a funcao quando a janela for carregada    

    spanPlayer.innerHTML = localStorage.getItem('player'); //pegando o key:player-value:guardado no login;

    loadGame();

    startTimer();

}

