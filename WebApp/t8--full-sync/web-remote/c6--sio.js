const socket = io();

socket.on('syncedState_update', (changeStr) => {
  //console.log(`-- A change came in:  ${changeStr}`);
  const changeJsonObj = JSON.parse(changeStr);

  // Update the local copy:
  Object.assign(syncedState, changeJsonObj);
  //console.log(`== Updated syncedState:`);
  //console.dir(syncedState);

  aChangeHappened();
});
