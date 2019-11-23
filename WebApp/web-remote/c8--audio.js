const au_ac = new AudioContext();
const au_sr = au_ac.sampleRate;

const au_spn = au_ac.createScriptProcessor(auBufSize, 0, 1);
au_spn.onaudioprocess = (ape) => {

  const pull = () => {
    if (ui.playing) {
      const ps = ui.playSample++;
      if (ps < 50000) {
        const wave = ps % 70 < 50 ? -1 : 1;
        const pulse = 1 - (ps % 5000 / 5000);
        return wave * pulse;
      } else return 0;
    } else return 0;
  };

  const buffer = ape.outputBuffer.getChannelData(0);
  for (let i = 0; i < auBufSize; i++) {
    buffer[i] = pull();
  }
};
au_spn.connect(au_ac.destination);
