import asyncio
from App.Server.HttpServer import HttpServer
from App.Server.Websocket import Websocket
from json import dumps, loads

class Api():

    def __init__(self, config, logger):        
        self.__config = config
        self.__logger = logger

        self.http = HttpServer(config, logger)
        self.ws = Websocket(config.find('port.ws'), logger)

        self.cancel_heavy_stuff_flag = False
    
    def start(self):
        self.http.start()                     
        self.ws.start()
    
    def stop(self):
        self.http.stop()
        self.ws.stop()
    
    def httpServerOn(self):
        ip = self.__config.find('ether.ipv4')
        port = self.__config.find('port.http')
        return f"{ip}:{port}"
    
    def wsServerOn(self):
        ip = self.__config.find('ether.ipv4')
        port = self.__config.find('port.ws')
        return f"{ip}:{port}"
    
    def logger(self, logger):
        self.__logger.add(logger)
    
    def fetch(self, field):        
        controls = self.__config.find(field)
        return dumps(controls)
    
    def update(self, json:str):
        data = loads(json)

        for field in data:            
            self.__config.update(field, data.get(field))        

        if(self.ws.connection):
            asyncio.run(
                self.ws.connection.send(
                    dumps({
                        "type": "update",
                        "data": json
                    })
                )
            )
    