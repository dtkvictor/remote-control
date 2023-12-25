import "./iziToast.js"

const alert = {
    /**     
     * @param {string} message 
     */
    success(message) {  
        iziToast.success({
            title: 'Success!',
            message: message
        })
    },
    /**     
     * @param {string} message 
     */
    error(message) {
        iziToast.error({
            title: 'Error!',
            message: message
        })
    }
}

const validate = {
    /**
     * @param {string} value
     * @param {Function} callback
     * @returns {boolean}
    */
    null(value, callback = null) {
        if(!value || value == '') return true;
        if(callback) callback();
        return false;
    },

    /**
     * @param {number} value
     * @param {Function} callback
     * @returns {boolean}
    */
    number(value, callback = null) {
        let pattern = /^\d+$/;       
        if(pattern.test(value)) return true;
        if(callback) callback();
        return false
    },

    /**
     * @param {number} value
     * @param {number} min
     * @param {Function} callback
     * @returns {boolean}
    */
    min(value, min, callback = null) {        
        value = parseInt(value);    
        min = parseInt(min);        
        if(value >= min) return true 
        if(callback) callback();
        return false
    },

    /**
     * @param {number} value
     * @param {number} max
     * @param {Function} callback
     * @returns {boolean}
    */
    max(value, max, callback = null) {
        value = parseInt(value);    
        max = parseInt(max);
        if(value <= max) return true;
        if(callback) callback();
        return false
    }
}

const feedback = {   
        /**
         * @param {string} name         
         * @returns {string}
        */
        number(name) {
            return `The ${name} field must be a numeric value.`
        },

        /**
         * @param {string} name    
         * @param {number} min     
         * @returns {string}
        */
        min(name, min) {        
            return `The ${name} field must be greater than ${min}.`
        },
    
        /**
         * @param {string} name         
         * @param {number} max
         * @returns {string}
        */
        max(name, max) {
            return `The ${name} field must be less than ${max}.`
        }
}



const sanitize = {
    /**
     * @param {string} value
     * @returns {string}
    */
    removeHtmlTags(value) {
        return value.replace(/<\/?[^>]+(>|$)/g, "");
    }
}

window.helpers = {
    alert: alert,
    validate: validate, 
    feedback: feedback,
    sanitize: sanitize
}
