class Logger():

    def __init__(self):        
        self.webview = None
        self.websocket = None

    def emit(self, logger):        
        if(self.webview):                         
            self.webview.evaluate_js(f"""
                const loggerContent = document.getElementById('logger');
                let span = document.createElement("span")
                    span.textContent = '{logger}'  
                loggerContent.appendChild(span)
                loggerContent.scrollTop = loggerContent.scrollHeight      
            """)
            
    def add(self, logger):        
        print(logger)
        self.emit(logger)