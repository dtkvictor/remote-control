import http.server
import socketserver
import threading
import json

class Handler(http.server.SimpleHTTPRequestHandler):  
    config = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='App/Public', **kwargs)

    def do_GET(self):
        if(self.path == '/config'):                        
            self.send_response(200)
            self.send_header('Content-type', 'application/json')        
            self.end_headers()                           
            self.wfile.write(json.dumps(self.config).encode('utf-8'))
        else:
            super().do_GET()
            self.end_headers()

class HttpServer():    
    def __init__(self, config, logger):                
        self.port = config.find('port.http')
        self.logger = logger

        self.handler = Handler
        self.handler.config = config.content()
    
    def build(self):
        self.httpd = socketserver.TCPServer(("0.0.0.0", int(self.port)), self.handler)
        self.thread = threading.Thread(target=self.httpd.serve_forever)
    
    def stop(self):
        self.logger.add("Server stopped")
        self.httpd.shutdown()
        self.httpd.server_close()
        self.thread.join()
    
    def start(self):                
        try:        
            self.logger.add(f"Serving on port {self.port}.")
            self.build()            
            self.thread.start()
        except OSError as e:
            if e.errno == 10048:
                self.logger.add("Error starting http server, wait a few minutes and try again.")