from gpiozero import LED
from time import sleep

myLed = LED(17)


print("LED demo has been set up.")

while True:
    
    myLed.on()
    print("-- LED on.")
    sleep(1)
    
    myLed.off()
    print("-- LED off.")
    sleep(1)
    
