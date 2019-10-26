from picamera import PiCamera
import time

from modules.image_recognition import find_squirrel_confidence

def init_camera():
    camera = PiCamera()
    camera.resolution = (1024, 768)
    camera.start_preview()
    time.sleep(2)
    return camera

def look_for_squirrel(camera, i):
    filename = 'tmp-{}.jpg'.format(i)
    camera.capture(filename)
    confidence = find_squirrel_confidence(filename)

    print(i, filename)
    if confidence > 0:
        print('It\'s a squirrel ({:.2f}%)!'.format(confidence))
    else:
        print('Nope')
    print()


if __name__ == "__main__":
    camera = init_camera()

    for i in range(10):
        look_for_squirrel(camera, i)
        time.sleep(2)
