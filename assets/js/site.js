const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// copy button
document.getElementById('copy').addEventListener('click', e => {
  const t = document.getElementById('pipcmd'); const b = e.currentTarget;
  const sel = () => { const r = document.createRange(); r.selectNodeContents(t); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
  try { navigator.clipboard.writeText(t.textContent).then(() => { b.textContent = 'Copied'; setTimeout(() => b.textContent = 'Copy', 1600); }, sel); } catch (_) { sel(); }
});

// 3D structures
(() => {
  if (!window.$3Dmol) return;
  const styles = {
    hydrogen: {sphere: {scale: .32, color: '#8FA3B8'}},
    hbn: {stick: {radius: .13, colorscheme: 'Jmol'}, sphere: {scale: .26, colorscheme: 'Jmol'}},
    iron: {sphere: {scale: .42, color: '#B4532A'}}
  };
  for (const key of Object.keys(styles)){
    const el = document.getElementById('v-' + key);
    const v = $3Dmol.createViewer(el, {backgroundColor: 'white', backgroundAlpha: 0, antialias: true});
    fetch('/assets/structures/' + key + '.xyz').then(r => r.text()).then(xyz => {
      v.addModel(xyz, 'xyz');
      v.setStyle({}, styles[key]);
      v.zoomTo(); v.rotate(key === 'hbn' ? -70 : -20, 'x'); v.zoom(key === 'hbn' ? 1.15 : 1.0);
      v.render();
      if (!reduce) v.spin('y', 0.35);
    });
  }
})();
