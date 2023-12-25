class InvalidPayloadException(Exception):
    def __init__(self, message = "The payload is not valid."):
        self.message = message
        super().__init__(self.message)