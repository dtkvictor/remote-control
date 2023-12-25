import os
import webview 
from App.View.Api import Api
from App.View.Logger import Logger
from App.Helpers.Config import Config

class Interface(): 

    def __init__(self) -> None:
        self.__title = ""
        
        self.__debug = False
        self.__window = None

        self.__config = Config()
        self.__logger = Logger()
    
    def title(self, title:str) -> None:
        self.__title = title
    
    def debug(self, state:bool) -> None:
        self.__debug = state
    
    def view(self) -> str:
        current_path = os.path.dirname(os.path.abspath(__file__))        
        return f"{current_path}/Resources/index.html"

    def build(self) -> None:        
        self.__window = webview.create_window(
            url=self.view(),
            title=self.__title,                        
            js_api=Api(self.__config, self.__logger)
        )        

    def start(self) -> None:                        
        self.__logger.webview = self.__window
        webview.start(debug=self.__debug)
