#!/usr/bin/env python3

from gpiozero import LED
import socketio
import json
import time

from modules.camera import get_squirrel_confidence

alert_led = LED(4)
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
    print('syncedState_update:', syncedState)

@sio.event
def disconnect():
    print('disconnected from server')

def handle_input():
    line = input().strip()
    # sio.emit('my_message', line)

    new_state = {}

    if line == 'w':
        new_state['buttonUp'] = True
    elif line == 's':
        new_state['buttonDown'] = True
    elif line == 'a':
        new_state['buttonLeft'] = True
    elif line == 'd':
        new_state['buttonRight'] = True
    elif line == 'f':
        new_state['buttonSquirt'] = True
    elif line == 'x':
        new_state['weightSensor'] = True
    elif line == 'r':
        new_state['buttonUp'] = False
        new_state['buttonDown'] = False
        new_state['buttonLeft'] = False
        new_state['buttonRight'] = False
        new_state['buttonSquirt'] = False
        new_state['weightSensor'] = False
    else:
        print('Invalid input')
        return
    
    alert_server(
        'syncedState_change',
        new_state,
    )

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
        # handle_input()
        print('Looking for squirrel...')
        look_for_squirrel()
        time.sleep(1)

if __name__ == '__main__':
    sio.connect('http://138.197.142.143')
    sio.wait()
