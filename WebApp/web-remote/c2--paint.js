const someText = function someText(ctx, text, size, px, py) {
  ctx.save();
  ctx.textAlign  = 'center';
  ctx.font       = `italic bold 24px sans-serif`;
  ctx.transform(size, 0, 0, size, px, py);
  ctx.fillText(text, 0, 0);
  ctx.restore();
};

const paint = function paint(ctx) {

  // Background:
  ctx.fillStyle = `rgb(100, 200, 100)`;
  ctx.fillRect(-10, -10, 20, 20);
  //... and to test the "screen"
  ctx.fillStyle = `rgba(255, 255, 255, 0.5)`;
  ctx.fillRect(-screenHalfX, -screenHalfY, 2*screenHalfX, 2*screenHalfY);
  ctx.fillStyle = `rgba(0, 0, 0, 0.15)`;
  ctx.fillRect(-screenHalfX + 0.02, -screenHalfY + 0.02, 2*screenHalfX - 0.04, 2*screenHalfY - 0.04);

  // Title text:
  ctx.fillStyle  = 'rgba(100, 0, 0, 0.6)';
  someText(ctx, 'Squirrel Blaster 2020', 0.0035, 0, -0.85);
  const cval = Number.isFinite(syncedState.squirrelConfidence) ? syncedState.squirrelConfidence.toFixed(1) : '0.0';
  ctx.fillStyle  = 0 + syncedState.squirrelConfidence >= 60 ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0, 0, 255, 0.7)';
  someText(ctx, `C: ${cval}%`, 0.0045, 0, -0.7);

  // Buttons:
  buttonRects.forEach((r) => {
    ctx.fillStyle  = 'rgb(255, 255, 255)';
    ctx.fillRect(r.px, r.py, r.sx, r.sy);
    if (syncedState[r.name]) {
      ctx.fillStyle  = 'rgba(255, 0, 155, 0.4)';
    } else {
      ctx.fillStyle  = 'rgba(0, 0, 0, 0.3)';
    }
    ctx.fillRect(r.px + 0.01, r.py + 0.01, r.sx - 0.02, r.sy - 0.02);
    ctx.fillStyle  = 'rgba(0, 0, 0, 0.4)';
    someText(ctx, r.name, 0.0015, r.px + r.sx/2, r.py + r.sy/2);
  });

};
