// DOM Element

const btnEl = document.querySelector('.reveal')
const passwordEl = document.querySelector('.password')

const reveal = () => {
    if(passwordEl.type === 'password'){
        passwordEl.type = 'text'
    } else {
        passwordEl.type = 'password'
    }
}

btnEl.addEventListener('click', reveal)