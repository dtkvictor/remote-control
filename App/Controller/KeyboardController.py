import pyautogui

class KeyboardController():

    def write(self, request, response):
        feedback = request.validate({
            "content": ['required', 'string', 'notNull']
        })
        if(feedback):
            return response.badRequest(feedback)
        pyautogui.write(request.get('content'))        
    
    def keypress(self, request, response):
        feedback = request.validate({
            "key": ['required', 'string', 'notNull']
        })
        if(feedback):
            return response.badRequest(feedback)
        pyautogui.press(request.get('key'))
    
    def keyDown(self, request, response):
        feedback = request.validate({
            "key": ['required', 'string', 'notNull']
        })
        if(feedback):
            return response.badRequest(feedback)
        pyautogui.keyDown(request.get('key'))
    
    def keyUp(self, request, response):
        feedback = request.validate({
            "key": ['required', 'string', 'notNull']
        })
        if(feedback):
            return response.badRequest(feedback)
        pyautogui.keyUp(request.get('key'))

    def move(self, request, response):          
        feedback = request.validate({
            "positionX": ['required', 'numeric', 'notNull'],
            "positionY": ['required', 'numeric', 'notNull']
        })        
        if(feedback):
            return response.badRequest(feedback)                     
        pyautogui.move(request.get('positionX'), request.get('positionY'))

    def moveTo(self, request, response):          
        feedback = request.validate({
            "positionX": ['required', 'numeric', 'notNull'],
            "positionY": ['required', 'numeric', 'notNull']
        })            
        if(feedback):
            return response.badRequest(feedback)        
        
        x, y = pyautogui.position()
        x = x + request.get('positionX')
        y = y + request.get('positionY')

        pyautogui.moveTo(x, y, .2)
    
    def scroll(self, request, response):
        feedback = request.validate({
            "position": ['required', 'numeric', 'notNull']            
        })
        if(feedback):
            return response.badRequest(feedback)
        pyautogui.scroll(request.get('position'))

    
    def click(self, request, response):
        feedback = request.validate({
            "button": ['required', 'string', 'notNull']
        })
        if(feedback):
            return response.badRequest(feedback)
        pyautogui.click(button=request.get('button'))

    def mouseDown(self, request, response):
        feedback = request.validate({
            "button": ['required', 'string', 'notNull']
        })
        if(feedback):
            return response.badRequest(feedback)
        pyautogui.mouseDown(button=request.get('button'))
    
    def mouseUp(self, request, response):
        feedback = request.validate({
            "button": ['required', 'string', 'notNull']
        })
        if(feedback):
            return response.badRequest(feedback)
        pyautogui.mouseUp(button=request.get('button'))