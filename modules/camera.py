from picamera import PiCamera
import time
import os
import shutil

from modules.image_recognition import find_squirrel_confidence

def get_squirrel_confidence():
    global picture_id

    filename = '{}/tmp-{}.jpg'.format(PICTURE_DIR, picture_id)
    picture_id += 1
    
    CAMERA.capture(filename)
    confidence = find_squirrel_confidence(filename)
    return confidence

PICTURE_DIR = 'CameraPictures'
picture_id = 0

# Initialize camera
CAMERA = PiCamera()
CAMERA.resolution = (1024, 768)
CAMERA.start_preview()
time.sleep(2)

# Delete old camera pictures
try:
    shutil.rmtree(PICTURE_DIR)
except FileNotFoundError:
    pass
os.makedirs(PICTURE_DIR, exist_ok=True)
