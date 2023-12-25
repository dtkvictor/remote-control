const gamepad = document.getElementById('gamepad');
const inputs = [...gamepad.getElementsByTagName('input')];

const getGamepadControls = async () => {
    return JSON.parse(await pywebview.api.fetch('gamepad'));
}

const setGamepadControls = (values) => {    
    if(!values) return;

    inputs.forEach(input => {        
        let key = input.className
        let value = values[key]
        if(value) input.value = value
    });    
}

const updateGamepadControls = () => {
    document.getElementById('btnGamepadSave').addEventListener('click', () => {
        const values = {}
        inputs.forEach(input => {
            values[input.className] = helpers.sanitize.removeHtmlTags(input.value);
        })
        if(!values) return 
        pywebview.api.update(JSON.stringify({"gamepad": values}))
        helpers.alert.success("Gamepad Controls Updated Successfully.")
    })    
}

const clearGamepadControls = () => {
    document.getElementById('btnGamepadClear').addEventListener('click', () => {        
        inputs.forEach(input => {
            input.value = ''
        })        
    })
}

export default async () => {
    setGamepadControls(await getGamepadControls())
    updateGamepadControls()
    clearGamepadControls()
}