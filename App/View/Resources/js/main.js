import './helpers.js';
import home from "./home.js";
import gamepad from "./gamepad.js";
import settings from './settings.js';

const links = document.querySelector('.links').children;
const pages = document.querySelectorAll('.content');

const selected = (name) => {
    for(let link of links) {
        link.setAttribute('selected', false)
        if(link.name === name) link.setAttribute('selected', true)
    }
}

const showPage = (name) => {
    pages.forEach(page => {
        page.classList.add('hidden')
        if(page.id === name) page.classList.remove('hidden')        
    })
}

for(let link of links) {
    link.addEventListener('click', () => {
        selected(link.name)
        showPage(link.name)
    })
}

setTimeout(() => {        
    home()
    gamepad()
    settings()    
}, 1000)