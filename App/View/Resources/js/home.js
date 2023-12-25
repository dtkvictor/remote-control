const buttonServer = document.querySelector('button[data-server]');
const qrcodeContent = document.getElementById('qrcode');

const options = {
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff"
}

const start = async () => {        
    const qrcode = new QRCode(qrcodeContent, options)
    const httpServerOn = await pywebview.api.httpServerOn()    

    pywebview.api.logger('Scan the QR code to control the device')                                
    pywebview.api.start()                            
    
    buttonServer.setAttribute('data-server', 'stop')
    qrcode.makeCode(`http://${httpServerOn}`)        
}

const stop = async () => {        
    qrcodeContent.innerHTML = ""
    pywebview.api.stop()
    buttonServer.setAttribute('data-server', 'start')
}

export default () => {
    buttonServer.addEventListener('click', () => {        
        const status = buttonServer.dataset.server;
        if(status === "start") start()
        else if(status === "stop") stop()        
    });
}