import socket 
import subprocess
import re
from random import randint

class SocketUtilities():
    
    @staticmethod
    def randomPort():
        localhost = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)    
        localhost.settimeout(1)
        
        while True:            
            try:
                port = randint(1024, 10000)
                localhost.bind(('localhost', port))
                localhost.close()
                return port
            except socket.error:                   
                continue
            
    @staticmethod
    def checkIpAddress(ip, port):    
        try:
            with socket.create_connection((ip, port), timeout=5) as s:
                pass
            return True
        except (socket.timeout, socket.error):
            return False        
        
    @staticmethod
    def getIpAddress():        
        output = subprocess.run(['ipconfig'], capture_output=True, text=True)                        
        if output.returncode == 0:
            ipv4 = re.search(r'IPv4.*?(\d+\.\d+\.\d+\.\d+)', output.stdout)            
            if ipv4 and len(ipv4.groups()) > 0:
                return ipv4.group(1)
        return None
            
if __name__ == '__main__':
    print(SocketUtilities.randomPort())    
    print(SocketUtilities.getIpAddress())