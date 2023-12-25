import os
from json import load, dump

class DataService():
    path = None
    __content = None
    
    def __init__(self, fileName:str) -> None:
        self.path = f'./App/Database/Json/{fileName}.json'        
    
    def fileExists(self) -> bool:
        return os.path.isfile(self.path)
    
    def read(self) -> "DataService":
        if self.fileExists():
            with open(self.path) as content:            
                self.__content = load(content)
        return self

    def content(self) -> dict:
        return self.__content
    
    def define(self, content:dict) -> "DataService":
        if not self.__content:
            self.__content = content
        else:
            self.__content.update(content)
        return self
    
    def save(self) -> None:
        with open(self.path, 'w') as file:
            dump(self.__content, file, indent=2)
        
if __name__ == "__main__":
    service = DataService('teste')    
    content = service.read().content()

    if(content):                    
        print(f"content read: {content}")

        service.define({"name": "mousepad", "content": ""}).save()                        
        print(f"content fill: {service.content()}")
    else: 
        service.define({ "name": "gamepad", "content": { "key": 1, "key2": 2 } }).save()
        print(f"Created database: {service.path}, with content: {service.content()}")
