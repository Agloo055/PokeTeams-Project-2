//DOM Elements

const gen1El = document.querySelector('#gen1')
const gen2El = document.querySelector('#gen2')
const gen3El = document.querySelector('#gen3')
const gen4El = document.querySelector('#gen4')
const gen5El = document.querySelector('#gen5')
const gen6El = document.querySelector('#gen6')
const gen7El = document.querySelector('#gen7')
const gen8El = document.querySelector('#gen8')
const gen9El = document.querySelector('#gen9')
const resultEl = document.querySelector('.pkChoice')

const changeEL = (e) => {
    if(!e.target.value.includes('Gen')) resultEl.value = e.target.value
}

//Event listeners
gen1El.addEventListener('change', (e) => changeEL(e))
gen2El.addEventListener('change', (e) => changeEL(e))
gen3El.addEventListener('change', (e) => changeEL(e))
gen4El.addEventListener('change', (e) => changeEL(e))
gen5El.addEventListener('change', (e) => changeEL(e))
gen6El.addEventListener('change', (e) => changeEL(e))
gen7El.addEventListener('change', (e) => changeEL(e))
gen8El.addEventListener('change', (e) => changeEL(e))
gen9El.addEventListener('change', (e) => changeEL(e))