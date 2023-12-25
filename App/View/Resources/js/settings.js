const formConfig = document.getElementById("configuration");
const buttonUpdateConfigData = document.getElementById('update-config-data')
const inputs = [...formConfig.getElementsByTagName('input')];

const rules = {    
    'touchpad-cursor-speed': {
        min(input) {
            return helpers.validate.min(
                input.value, 
                input.min,
                () => helpers.alert.error(
                    helpers.feedback.min('cursor speed', input.min)
                )
            )
        }, 
        max(input) {
            return helpers.validate.max(
                input.value, 
                input.max,
                () => helpers.alert.error(
                    helpers.feedback.max('cursor speed', input.max)
                )
            )
        }
    },
    'touchpad-scroll-speed': {
        min(input) {
            return helpers.validate.min(
                input.value, 
                input.min,
                () => helpers.alert.error(
                    helpers.feedback.min('scroll speed', input.min)
                )
            )
        }, 
        max(input) {
            return helpers.validate.max(
                input.value, 
                input.max,
                () => helpers.alert.error(
                    helpers.feedback.max('scroll speed', input.max)
                )
            )
        }
    },
    'websocket': {
        number(input) {
            return helpers.validate.number(
                input.value, 
                () => helpers.alert.error(
                    helpers.feedback.number('websocket')
                )
            )
        }, 
        min(input) {
            return helpers.validate.min(
                input.value, 
                input.min,
                () => helpers.alert.error(
                    helpers.feedback.min('websocket', input.min)
                )
            )
        }, 
        max(input) {
            return helpers.validate.max(
                input.value, 
                input.max,
                () => helpers.alert.error(
                    helpers.feedback.max('websocket', input.max)
                )
            )
        }
    },
    'http-server': {
        number(input) {
            return helpers.validate.number(
                input.value, 
                () => helpers.alert.error(
                    helpers.feedback.number('http-server')
                )
            )
        }, 
        min(input) {
            return helpers.validate.min(
                input.value, 
                input.min,
                () => helpers.alert.error(
                    helpers.feedback.min('http-server', input.min)
                )
            )
        }, 
        max(input) {
            return helpers.validate.max(
                input.value, 
                input.max,
                () => helpers.alert.error(
                    helpers.feedback.max('http-server', input.max)
                )
            )
        }
    },

}

const validateInputs = () => {
    let cancelValidation = false;

    for(let input of inputs) {
        let validate = rules[input.id];
        for(let method in validate) {
            let result = validate[method](input);
            if(!result) {
                cancelValidation = true;
                break;
            }
        }            
        if(cancelValidation) return false;
    }
    return true;
}

const updateValues = () => {
    const groups = {};

    for(let input of inputs) {
        let group = input.getAttribute('group');    
        let name = input.name;
        let value = helpers.sanitize.removeHtmlTags(input.value);                    

        if(!groups[group]) groups[group] = {}
        groups[group][name] = value;
    }       

    pywebview.api.update(JSON.stringify(groups))
    helpers.alert.success("Updated Successfully.")
}


const setInputValue = () => {
    inputs.forEach(async input => {
        let group = input.getAttribute('group');    
        let name = input.name;        
        let data = await pywebview.api.fetch(`${group}.${name}`);
        input.value = JSON.parse(data);
    });
}

export default () => {
    setInputValue()

    buttonUpdateConfigData.addEventListener('click', () => {        
        if(validateInputs()) {
            updateValues();
        }
    })
}