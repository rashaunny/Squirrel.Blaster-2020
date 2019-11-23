const perFrame = function perFrame(timeStamp) {

  if (ui.sizeX !== innerWidth || ui.sizeY !== innerHeight) {
    ui.sizeX  = innerWidth;
    ui.sizeY  = innerHeight;

    // Re-Layout:
    // 1. Fix the canvas:
    uiCanvasElem.style.width   = `${ui.sizeX}px`;
    uiCanvasElem.style.height  = `${ui.sizeY}px`;
    uiCanvasElem.width         = ui.sizeX * devicePixelRatio;
    uiCanvasElem.height        = ui.sizeY * devicePixelRatio;
    // 2. Set the display props:
    ui.scale_cx = ui.sizeX / 2;
    ui.scale_cy = ui.sizeY / 2;
    if (ui.sizeX / ui.sizeY >= screenRatio) {
      // "Too-wide" layout:
      ui.scale_l = 2 * screenHalfY / ui.sizeY;
    } else {
      // "Too-tall" layout:
      ui.scale_l = 2 * screenHalfX / ui.sizeX;
    }
    const xformScale = devicePixelRatio / ui.scale_l;
    // 3. Finish:
    uiCanvasCtx.setTransform(
      xformScale,
      0,
      0,
      xformScale,
      ui.scale_cx * devicePixelRatio,
      ui.scale_cy * devicePixelRatio,
    );
    ui.dirty = true;
  }

  if (ui.dirty) {
    paint(uiCanvasCtx);
    ui.dirty = false;
  }

};

const rafLooper = function rafLooper(timeStamp) {
  perFrame(timeStamp);
  requestAnimationFrame(rafLooper);
};
requestAnimationFrame(rafLooper); // To "kick it off".
