// Title:
const titleElem = document.createElement('title');
titleElem.textContent = title;
document.head.appendChild(titleElem);

// Fixers:
document.body.style.touchAction  = 'none';
document.body.style.overflow     = 'hidden';

// Canvas:
const uiCanvasElem           = document.createElement('canvas');
uiCanvasElem.style.position  = 'fixed';
uiCanvasElem.style.left      = '0px';
uiCanvasElem.style.top       = '0px';
document.body.appendChild(uiCanvasElem);
const uiCanvasCtx = uiCanvasElem.getContext('2d', { alpha: false });
