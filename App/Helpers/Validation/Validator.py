from App.Helpers.Exceptions.InvalidPayloadException import InvalidPayloadException as InvalidPayload

class Validator():
    __errors = []
    
    @staticmethod
    def isValidPayload(payload):        
        if not "type" in payload or payload.get("type") is None:
            raise InvalidPayload()
        elif not "data" in payload or payload.get("data") is None:
            raise InvalidPayload()
        else:
            return payload
    
    def string(self, data, field):
        if type(data.get(field)) != str:
            self.__errors.append(f"The field {field} must be a string.")
        
    def required(self, data, field):
        if data.get(field) is None:
            self.__errors.append(f"The field {field} is required.")
    
    def notNull(self, data, field):
        if data.get(field) is None:
            self.__errors.append(f"The field {field} cannot be null.")
    
    def numeric(self, data, field):
        if not isinstance(data.get(field), (int, float, complex)):
            self.__errors.append(f"The field {field} must be a numeric value")

    def errors(self):       
        errors = self.__errors.copy()
        self.__errors.clear()        
        return errors
        