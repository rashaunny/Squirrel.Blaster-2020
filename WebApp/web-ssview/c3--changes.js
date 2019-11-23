const aChangeHappened = function aChangeHappened() {

  const divElem = document.createElement('div');
  divElem.style.border = '1px solid black';
  divElem.style.backgroundColor = 'rgb(230, 255, 230)';
  divElem.style.padding = '10px';
  divElem.textContent = 'A change came in. New SyncedState:';

  Object.keys(syncedState).forEach((key) => {
    const preElem = document.createElement('pre');
    preElem.style.padding = '0px';
    preElem.style.margin = '0px';
    preElem.textContent = `  • ${key}:  ${JSON.stringify(syncedState[key])}`;
    divElem.appendChild(preElem);
  });

  updatesHolder.insertBefore(divElem, updatesHolder.firstChild);
};
