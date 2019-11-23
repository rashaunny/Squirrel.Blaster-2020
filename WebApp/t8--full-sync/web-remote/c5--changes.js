const aChangeHappened = function aChangeHappened() {
  ui.dirty = true;
  if (Number.isFinite(syncedState.squirrelAlert) && syncedState.squirrelAlert !== ui.prevSA) {
    ui.playing = true;
    ui.playSample = 0;
  }
  ui.prevSA = syncedState.squirrelAlert;
};
