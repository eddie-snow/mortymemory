
const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form')

const validateInput = ({ target }) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
    }
    else{
        button.setAttribute('disabled', ''); //o primeiro parametro é o atributo(disabled) e o segundo  é o valor desse atributo ''(pq n precissa - o disabled ja  é o nosso atributo)
    }
}

const handleSubmit = (event) => {
    event.preventDefault(); //pois o comportamento padrao e recarregar pagina
    
    localStorage.setItem('player', input.value); //fica guardao em dev tools/application/local storge/na porta local https://...

    window.location = 'pages/game.html'
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);