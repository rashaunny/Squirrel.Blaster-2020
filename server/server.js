"use strict";

const app            = require('express')();
const http           = require('http').createServer(app);
const io             = require('socket.io')(http);

const syncedState    = require('./syncedState.js');

const requireQuick   = require('require-quick');
const quickTemplate  = requireQuick('quick-template');


//==  WEB SETUP  ==//

app.get('/', (req, res) => {
  res.redirect(307, '/ssview');
});

app.get('/ssview', (req, res) => {
  res.send(quickTemplate('t8--full-sync/web-ssview/client.thtml'));
});

app.get('/remote', (req, res) => {
  res.send(quickTemplate('t8--full-sync/web-remote/client.thtml'));
});

app.use((req, res, next) => {
  res.redirect(307, '/');
});


//==  SOCKETIO CODE  ==//

io.on('connection', (socket) => {

  // Sent the starting update to the new client:
  socket.emit('syncedState_update', JSON.stringify(syncedState));
  console.log(`-- A client just connected; Its starting update was sent.`);

  socket.on('syncedState_change', (changeStr) => {
    console.log(`-- A change came in; The client said:  ${changeStr}  -- (as:  ${typeof changeStr})`);
    const changeJsonObj = JSON.parse(changeStr);

    // Update the central copy:
    Object.assign(syncedState, changeJsonObj);
    console.log(`== Updated syncedState:`);
    console.dir(syncedState);

    // Broadcast the same update to all connected clients:
    io.emit('syncedState_update', changeStr);

  });

  socket.on('disconnect', (reason) => {
    console.log(`-- A client just disconnected; Reason:  ${reason}`);
  });

});


//==  MAIN CODE  ==//

http.listen(80, () => {
  console.log(`-- "Full Sync Server" is now listening.`);
});
