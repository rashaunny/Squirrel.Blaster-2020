from gpiozero import Button
from signal import pause

def btnDown():
    print("Button went down.")

def btnUp():
    print("Button went up.")

button = Button(2)

button.when_pressed = btnDown
button.when_released = btnUp

pause()
