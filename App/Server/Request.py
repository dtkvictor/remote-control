from App.Helpers.Validation.Validator import Validator

class Request():
    __payload = None
    
    def setPayload(self, payload):     
        self.__payload = payload
    
    def validate(self, object):
        validator = Validator()
        
        for field, value in object.items():
            for data in value:
                method = getattr(validator, data)
                method(self.__payload, field)
        
        errors = validator.errors() 

        if len(errors) >= 1:
            return errors
        else: 
            return False
    
    def get(self, name):
        return self.__payload.get(name)
    