from App.View.Interface import Interface

if __name__ == "__main__":
    interface = Interface()
    interface.title("Remote Controll")
    interface.debug(False)
    interface.build()
    interface.start()