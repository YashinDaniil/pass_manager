import base64
import os
from Crypto.Cipher import DES


class HashCode():
    
    key = str.encode(os.environ.get('SECRET_HASH'))
    des = DES.new(key, DES.MODE_ECB)

    def pad(self, text):
        while len(text) % 8 != 0:
            text += b' '
        return text

    def encode(self, text):
        padded_text = self.pad(str.encode(text))
        encrypted_text = self.des.encrypt(padded_text)
        encoded = base64.b64encode(encrypted_text)
        return str(encoded)[2:-1]

    def decode(self, text):
        decoded = base64.b64decode(str.encode(text))
        decrypted = self.des.decrypt(decoded)
        return str(decrypted)[2:-1].replace(' ', '')