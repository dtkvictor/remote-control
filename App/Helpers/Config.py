from App.Database.DataService import DataService;
from App.Helpers.SocketUtilities import SocketUtilities;

class Config():

    def __init__(self):
        self.__data = DataService('config')
        self.__content = self.__data.read().content()

        if not self.__content:
            self.__data.define(self.defaultConfiguration()).save()
            self.__content = self.__data.content()

    def content(self) -> dict:
        return self.__content
    
    def find(self, field:str):
        keys = field.split('.')
        content = self.__content
        
        if not keys:
            return content[field]
        try:
            for key in keys:                
                content = content[key]
            return content
        except: 
            raise KeyError(key)
    
    def update(self, field, value) -> None:
        self.__content.update({field: value})    
        self.__data.define(self.__content)
        self.__data.save()

    def defaultConfiguration(self) -> dict:
        return {
            "title": "Remote Controll",
            "author": "dtkvictor",
            "version": "development",
            "ether": {
                "ipv4": SocketUtilities.getIpAddress()
            },                
            "port": {
                "http": SocketUtilities.randomPort(),
                "ws": SocketUtilities.randomPort(),
            },
            "touchpad": {},
            "gamepad": {}           
        }