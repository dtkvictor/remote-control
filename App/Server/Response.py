class Response():
                
    def success(self, data):
        return {
            "type": "success",
            "code": 200,
            "data": data
         }
    
    def noContent(self):
        return {
            "type": "no content",
            "code": 204,        
         }
    
    def created(self): 
        return {
            "type": "created",
            "code": 201
        }
    
    def badRequest(self, errors):
        return {
            "type": "bad request",
            "code": 400,
            "data": {
                "errors": errors
            }
        }

    def notFound(self):
        return {
            "type": "not found",
            "code": 404,        
        }
        
    def internalServerError(self):
        return {
            "type": "internal server error",
            "code": 500,
        }