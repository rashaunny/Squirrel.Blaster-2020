####  TOP CONFIG  ####

serverAddress = ("138.197.142.143", 55005)
streamWaitTime = 1/25  # so, 25hz
print("-- Welcome to the tc-plus-button test!")


####  IMPORTS & SETUP  ####

import threading
import socket
from time import sleep
from gpiozero import Button
from signal import pause

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
triggers = {"button":False}


####  LIB FNS  ####

def sendStartingHello():
    # Form a starting "connection" by sending a "hello":
    messageBytes = '{"hello":true}'.encode('utf-8')
    sock.sendto(messageBytes, serverAddress)
    print("---- 1. StartingHello has been sent.")

def listenerThreadMain():
    print("---- 2. ListenerThread has kicked off.")
    while True:
        data = sock.recv(4096)  # buffer size
        print("Received message: ", data)

def streamSenderThreadMain():
    print("---- 3. StreamSenderThread has kicked off.")
    while True:
        if triggers["button"]:
            messageBytes = '{"buttonStream":true}'.encode('utf-8')
            sock.sendto(messageBytes, serverAddress)
        sleep(streamWaitTime)

def btnDown():
    triggers["button"] = True
    print("-- (Button went down.)")

def btnUp():
    triggers["button"] = False
    print("-- (Button went up.)")


####  MAIN  ####

sendStartingHello()
threading.Thread(target=listenerThreadMain, daemon=True).start()
threading.Thread(target=streamSenderThreadMain, daemon=True).start()
print("---- 4. ThreadCommTest is now set up.")

button = Button(2)
button.when_pressed = btnDown
button.when_released = btnUp
print("---- 5. GPIO Button is now set up.")

pause()
