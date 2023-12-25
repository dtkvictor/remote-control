const touchpad = document.getElementById('touchpad');
const writeContent = document.getElementById('touchpad-write-area'); 
const scroll = {
    top: document.getElementById('touchpad-scroll-top'),
    bottom: document.getElementById('touchpad-scroll-bottom'),
}
const buttons = {
    left: document.getElementById('touchpad-button-left'),
    right: document.getElementById('touchpad-button-right'),
    write: document.getElementById('touchpad-write-button')
}

const move = (x, y) => {    
    window.websocket.send(JSON.stringify({
        "type": 'moveTo',
        "data": {
            "positionX": parseInt(x),
            "positionY": parseInt(y)
        }
    }))
}

const rollScroll = (position) => {    
    window.websocket.send(JSON.stringify({
        "type": "scroll",
        "data": {
            "position": parseInt(position),            
        }
    }))
}

const click = (button) => {    
    window.websocket.send(JSON.stringify({
        "type": "click",
        "data": {
            "button": button
        }
    }))
}

const mouseDowm = (button) => {    
    window.websocket.send(JSON.stringify({
        "type": "mouseDown",
        "data": {
            "button": button
        }
    }))
}

const mouseUp = (button) => {    
    window.websocket.send(JSON.stringify({
        "type": "mouseUp",
        "data": {
            "button": button
        }
    }))
}

const keypress = (key) => {
    window.websocket.send(JSON.stringify({
        "type": "keypress",
        "data": {
            "key": key
        }
    }))
}

const write = (content) => {
    window.websocket.send(JSON.stringify({
        "type": "write",
        "data": {
            "content": content
        }
    }))
}


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @param {number} deltaX 
 * @param {number} deltaY 
 * @returns {Array}
 */
const defineTouchMoveDirection = (deltaX, deltaY) => {
    let direction = null;
    const threshold = 25;    

    // Movimento diagonal
    if (Math.abs(deltaX) > threshold && Math.abs(deltaY) > threshold) {
        direction = [deltaX, deltaY];
    // Movimento horizontal
    } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = [deltaX, 0]
    // Movimento vertical
    } else {
        direction = [0, deltaY]
    }

    return direction;
}

/**
 * @param {number} touchX 
 * @param {number} touchY 
 * @returns {Array}
 */
const defineMovementIntensity = (touchX, touchY) => {        
    const { offsetWidth, offsetHeight } = touchpad;    
    const percentageX = (touchX / offsetWidth) * 100;
    const percentageY = (touchY / offsetHeight) * 100;
    return [percentageX, percentageY];
}

/**
 * @param {number} touchX 
 * @param {number} touchY 
 * @returns {Array}
 */
const defineMousePosition = (touchX, touchY) => {
    const cursorSpeed = window.config.touchpad["cursor-speed"];
    const positionX = (touchX / 100) * cursorSpeed;
    const positionY = (touchY / 100) * cursorSpeed;
    return [positionX, positionY];
}

const emitToupadEvent = () => {
    let lastTouchX,
        lastTouchY,
        direction;
    
    const reset = () => {
        lastTouchX = null;
        lastTouchY = null;
        direction = null;        
    }
    
    touchpad.addEventListener('touchstart', event => {        
        lastTouchX = event.touches[0].clientX;
        lastTouchY = event.touches[0].clientY;
        event.preventDefault();
        event.stopPropagation();
    })

    touchpad.addEventListener('touchmove', event => {                       
        const currentTouchX = event.touches[0].clientX;
        const currentTouchY = event.touches[0].clientY;
        const deltaX = currentTouchX - lastTouchX;
        const deltaY = currentTouchY - lastTouchY;        
        direction = defineTouchMoveDirection(deltaX, deltaY)
    })

    touchpad.addEventListener('touchend', () => {    
        if(!direction) return;
        const intensity = defineMovementIntensity(...direction);
        const position = defineMousePosition(...intensity);
        move(...position);                
        reset();
    })
}

const emitScrollEvent = () => {
    let scrollEventStatus;    
    
    let position = {
        top: () => window.config.touchpad['scroll-speed'],
        bottom: () => -window.config.touchpad['scroll-speed']
    };

    for(let button in scroll) {
        scroll[button].addEventListener('touchstart', async () => {            
            scrollEventStatus = true;

            while(scrollEventStatus) {                    
                rollScroll(position[button]());                
                await sleep(100);
            }                        
        })

        scroll[button].addEventListener('touchend', () => {            
            scrollEventStatus = false;            
        })
    }
}

const emitButtonEvent = () => {    
    let lastTouchX,        
        currentTouchX;        

    buttons.left.addEventListener('touchstart', event => {
        lastTouchX = event.touches[0].clientX;
    })
    buttons.left.addEventListener('touchmove', event => {
        currentTouchX = event.touches[0].clientX;        
    })
    buttons.left.addEventListener('touchend', () => {
        const deltaX = currentTouchX - lastTouchX;    
        const threshold = 25;

        if(deltaX > threshold) {
            buttons.left.setAttribute('locked', true);
            mouseDowm('left');
        }                        
        else if(deltaX < -threshold) {
            buttons.left.setAttribute('locked', false);
            mouseUp('left');
        }
    })

    buttons.left.addEventListener('click', () => click('left'))
    buttons.right.addEventListener('click', () => click('right'));    
}

const emitWriteEvent = () => { 
    const changeIcon = (value) => {
        if(value == '') {
            buttons.write.setAttribute('type', 'enter')
        }else{
            buttons.write.setAttribute('type', 'send')
        }
    }       
    writeContent.addEventListener('keyup', event => {
        changeIcon(event.target.value);
    })

    buttons.write.addEventListener('click', () => {        
        if(writeContent.value) {
            write(writeContent.value);        
            writeContent.value = '';
            changeIcon(writeContent.value);
        }else {                                    
            keypress('enter');            
        }           
    })
}

export default () => {
    emitToupadEvent();
    emitScrollEvent();
    emitButtonEvent();
    emitWriteEvent();
}