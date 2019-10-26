#!/usr/bin/env python3

import socketio
import json
import time

from modules.camera import find_squirrel_confidence

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
    
    # device_state.update(new_state)
    data = json.dumps(new_state)
    sio.emit('syncedState_change', data)
    print('[Client] Sent update to server: ', data)


def look_for_squirrel():
    confidence = find_squirrel_confidence()
    data = json.dumps({'squirrelConfidence': confidence})
    sio.emit('syncedState_change', data)

    if confidence > 0:
        print('IT\'S A SQUIRREL!')
        data = json.dumps({'alertTime': time.time()})
        sio.emit('squirrelAlert', data)
    else:
        print('Nope.')


def task():
    while True:
        # handle_input()
        print('Looking for squirrel...')
        look_for_squirrel()
        time.sleep(5)

if __name__ == '__main__':
    sio.connect('http://138.197.142.143')
    sio.wait()
