import './navigation.js';
import gamepad from './gamepad.js';
import touchpad from './touchpad.js';

window.config = await (await fetch(location.origin + '/config')).json();
window.websocket = new WebSocket(`ws://${config.ether.ipv4}:${config.port.ws}`);

const actions = {
    update(data) {        
        for(let key in data) {            
            if(!config[key]) continue;            
            config[key] = data[key];                                
        }
    },
    error(data) {
        console.error(data)
    }
}

websocket.onmessage = message => {    
    const payload = JSON.parse(message.data)    
    const action = actions[payload.type]
    if(action) {        
        const data = JSON.parse(payload.data)
        action(data)
    }
    console.log(payload)
}
onbeforeunload = () => websocket.close()

setTimeout(() => {    
    touchpad()    
    gamepad()
}, 1000)


