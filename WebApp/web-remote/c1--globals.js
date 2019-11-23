const title = 'Squirrel Blaster 2020 (prototype)';

const screenHalfX = 0.5;
const screenHalfY = 1.0;
const screenRatio = screenHalfX / screenHalfY;

const ui = {
  sizeX:       0,
  sizeY:       0,
  dirty:       false,
  scale_cx:    0,
  scale_cy:    0,
  scale_l:     1,
  playing:     false,
  playSample:  0,
};

const ccyt   = -0.1;
const dirbt  = 0.3;

const buttonRects = [
  {
    name:  'buttonLeft',
    px:    -0.15 - dirbt,
    py:    -0.15 + ccyt,
    sx:    0.3,
    sy:    0.3,
  },
  {
    name:  'buttonRight',
    px:    -0.15 + dirbt,
    py:    -0.15 + ccyt,
    sx:    0.3,
    sy:    0.3,
  },
  {
    name:  'buttonUp',
    px:    -0.15,
    py:    -0.15 + ccyt - dirbt,
    sx:    0.3,
    sy:    0.3,
  },
  {
    name:  'buttonDown',
    px:    -0.15,
    py:    -0.15 + ccyt + dirbt,
    sx:    0.3,
    sy:    0.3,
  },
  {
    name:  'buttonSquirt',
    px:    -0.35,
    py:    0.45,
    sx:    0.7,
    sy:    0.3,
  },
];
const allButtonNames = {};
buttonRects.forEach((r) => {
  allButtonNames[r.name] = true;
});

const syncedState = {}; // Blank for now.

const auBufSize = 2048;
