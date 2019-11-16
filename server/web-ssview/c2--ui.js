const titleElem = document.createElement('title');
titleElem.textContent = title;
document.head.appendChild(titleElem);

document.body.style.backgroundColor = 'rgb(230,210,220)';

const h1Elem = document.createElement('h1');
h1Elem.textContent = title;
document.body.appendChild(h1Elem);

const inputElem = document.createElement('input');
inputElem.style.font = 'bold 14pt monospaced';
inputElem.style.padding = '10px';
inputElem.style.width = 'calc(100% - 250px)';
inputElem.value = '{}';
document.body.appendChild(inputElem);

const sendButtonElem = document.createElement('button');
sendButtonElem.style.border = '1px solid rgb(255, 255, 0)';
sendButtonElem.style.font = 'bold 14pt sans-serif';
sendButtonElem.style.padding = '10px';
sendButtonElem.style.margin = '20px';
sendButtonElem.style.width = '180px';
sendButtonElem.textContent = 'Send Change';
document.body.appendChild(sendButtonElem);

const hrElem = document.createElement('hr');
document.body.appendChild(hrElem);

sendButtonElem.onclick = () => {
  socket.emit('syncedState_change', inputElem.value);
};

const updatesHolder = document.createElement('div');
document.body.appendChild(updatesHolder);
