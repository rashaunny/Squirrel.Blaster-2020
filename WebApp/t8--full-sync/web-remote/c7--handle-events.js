const touchHandler = function touchHandler(e) {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen({ navigationUI: "hide" }).
      then(() => {
        //console.log('FS IS WORKING.');
      }).catch((err) => {
        //console.error(`An error occurred while trying to switch into full-screen mode: ${err.message} (${err.name})`);
      });
  }
  e.preventDefault();

  //console.log('touch e--', e);
  const downButtons = {};
  for (let i = 0; i < e.touches.length; i++) {
    const t = e.touches.item(i);
    //console.log('touch i:', i, t);
    const { clientX, clientY } = t;
    const cx = ((clientX + 0.5) - ui.scale_cx) * ui.scale_l;
    const cy = ((clientY + 0.5) - ui.scale_cy) * ui.scale_l;
    // Check if buttons:
    buttonRects.forEach((r) => {
      if (r.px <= cx && cx <= r.px + r.sx && r.py <= cy && cy <= r.py + r.sy) {
        downButtons[r.name] = true;
      }
    });
  }
  // Check changes:
  let    changed = false;
  const  changes = {};
  Object.keys(downButtons).forEach((dbName) => {
    if (!syncedState[dbName]) {
      changes[dbName] = true;
      changed = true;
    }
  });
  Object.keys(syncedState).forEach((ssName) => {
    if (allButtonNames[ssName] && !downButtons[ssName]) {
      changes[ssName] = false;
      changed = true;
    }
  });
  if (changed) {
    socket.emit('syncedState_change', JSON.stringify(changes));
    console.log(`CHANGE SENT: ${JSON.stringify(changes)}`);
  }
};

const aelOptions = { capture: true, passive: false };
addEventListener('touchstart',   touchHandler, aelOptions);
addEventListener('touchend',     touchHandler, aelOptions);
addEventListener('touchmove',    touchHandler, aelOptions);
addEventListener('touchcancel',  touchHandler, aelOptions);
