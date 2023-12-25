const gamepad = document.getElementById('gamepad');
const buttons = [...gamepad.getElementsByTagName('button')];

const keyDown = (key) => {
    window.websocket.send(JSON.stringify({
        "type": "keyDown",
        "data": {
            "key": key
        }
    }))
}

const keyUp = (key) => {
    window.websocket.send(JSON.stringify({
        "type": "keyUp",
        "data": {
            "key": key
        }
    }))
}

export default () => {
    buttons.forEach(button => {
        button.addEventListener('touchstart', async () => {
            const keys = window.config.gamepad;
            const name = button.className;
            if(keys[name]) {
                keyDown(keys[name])
            }
        })             
        
        button.addEventListener('touchend', async () => {
            const keys = window.config.gamepad;
            const name = button.className;
            if(keys[name]) {
                keyUp(keys[name])
            }
        })                
    })
}