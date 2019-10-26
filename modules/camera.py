from picamera import PiCamera
import time

from modules.image_recognition import find_squirrel_confidence

def init_camera():
    camera = PiCamera()
    camera.resolution = (1024, 768)
    camera.start_preview()
    time.sleep(2)
    return camera

CAMERA = init_camera()
picture_id = 0

def find_squirrel():
    global picture_id
    
    filename = 'tmp-{}.jpg'.format(picture_id)
    picture_id += 1
    
    camera.capture(filename)
    confidence = find_squirrel_confidence(filename)
    return confidence > 0
