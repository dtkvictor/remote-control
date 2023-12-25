import asyncio
import websockets
from json import JSONDecodeError, loads, dumps
from App.Controller.KeyboardController import KeyboardController
from App.Helpers.Exceptions.InvalidPayloadException import InvalidPayloadException as InvalidPayload
from App.Helpers.Validation.Validator import Validator
from App.Server.Response import Response
from App.Server.Request import Request       
        
class Websocket():        
    def __init__(self, port, logger):    
        self.connection = None                    
        self.state = False        
        self.port = port
        self.logger = logger
        self.controller = KeyboardController()
        self.response = Response()
        self.request = Request()           
    
    def start(self):
        self.logger.add(f"Websocket on port {self.port}.")
        self.state = True
        try:            
            asyncio.run(self.main())
        except OSError as e:
            if e.errno == 10048:
                pass                        
        
    def stop(self):
        self.logger.add("Websocket stopped.")
        self.state = False
    
    def callMethodByName(self, name):        
        try:
            controller = getattr(self.controller, name)            
            return controller(self.request, self.response)
        except AttributeError: 
            return self.response.notFound()
        
    async def handler(self, websocket):
        self.connection = websocket
        self.logger.add(f"User: {websocket.remote_address[0]} connected.")
        
        while(self.state):
            response = None                        
            try:
                message = await websocket.recv()                
                payload = Validator.isValidPayload(loads(message))                                
                self.request.setPayload(payload.get('data'))                
                response = self.callMethodByName(payload.get('type'))                                        
                
            except (JSONDecodeError, InvalidPayload) as error:                
                if isinstance(error, JSONDecodeError):
                    feedback = ["The payload is not a valid JSON."]                    
                elif isinstance(error, InvalidPayload):
                    feedback = ["The payload is not valid."]
                response = self.response.badRequest(feedback)    

            except websockets.exceptions.ConnectionClosedOK:
                break            
                
            except Exception as e:                
                self.logger.add(f"Error: {e}")
                response = self.response.internalServerError() 
                
            finally:
                if(response and type(response) is dict): 
                    await websocket.send(dumps(response))
                
    async def main(self):
        async with websockets.serve(self.handler, "0.0.0.0", int(self.port)):
            await asyncio.Future()