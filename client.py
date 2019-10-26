#!/usr/bin/env python3

from gpiozero import LED
import socketio
import json
import time

from modules.camera import get_squirrel_confidence

alert_led = LED(4) # green
fire_led = LED(24) # red

sio = socketio.Client()

syncedState = {}

@sio.event
def connect():
    print('connection established')
    sio.start_background_task(task)

@sio.event
def syncedState_update(data):
    data = json.loads(data)
    syncedState.update(data)
    # print('syncedState_update:', syncedState)

@sio.event
def disconnect():
    print('disconnected from server')

def alert_server(header, data):
    data_str = json.dumps(data)
    sio.emit('syncedState_change', data_str)

def look_for_squirrel():
    confidence = get_squirrel_confidence()
    alert_server(
        'syncedState_change',
        {'squirrelConfidence': confidence},
    )
    if confidence > 60:
        print('IT\'S A SQUIRREL!')
        alert_led.blink()
        alert_server(
            'syncedState_change',
            {'squirrelAlert': time.time()},
        )
    else:
        print('Nope.')
        alert_led.off()
        alert_server(
            'syncedState_change',
            {'squirrelAlert': False},
        )

def task():
    while True:
        print('Looking for squirrel...')
        look_for_squirrel()

        # Turn water gun on/off
        if syncedState.get('buttonSquirt'):
            fire_led.on()
        else:
            fire_led.off()
        
        time.sleep(1)

if __name__ == '__main__':
    sio.connect('http://138.197.142.143')
    sio.wait()
