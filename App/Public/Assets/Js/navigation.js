const links = document.querySelector('.links').children;
const pages = {
    touchpad: document.getElementById('touchpadContent'),
    gamepad: document.getElementById('gamepadContent')
}

const selected = (name) => {
    for(let link of links) {        
        let page = pages[link.name];
    
        if(link.name === name) {
            link.setAttribute('selected', true)
            page.classList.remove('hidden')
        }else {
            link.setAttribute('selected', false);        
            page.classList.add('hidden')
        }
    }
}

for(let link of links) {
    link.addEventListener('click', () => selected(link.name))
}