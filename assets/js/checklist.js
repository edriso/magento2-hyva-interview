function toggleTopic(id) {
  document.getElementById(id).classList.toggle('open');
}

function markDone(e, id) {
  e.stopPropagation();
  document.getElementById(id).classList.toggle('checked');
  saveProgress();
  updateBar();
}

function saveProgress() {
  const done = [];
  for (let i = 1; i <= 15; i++) {
    const el = document.getElementById('t' + i);
    if (el && el.classList.contains('checked')) done.push(i);
  }
  localStorage.setItem('checklist-done', JSON.stringify(done));
}

function loadProgress() {
  const saved = localStorage.getItem('checklist-done');
  if (!saved) return;
  JSON.parse(saved).forEach(i => {
    const el = document.getElementById('t' + i);
    if (el) el.classList.add('checked');
  });
}

function updateBar() {
  let count = 0;
  for (let i = 1; i <= 15; i++) {
    const el = document.getElementById('t' + i);
    if (el && el.classList.contains('checked')) count++;
  }
  const pct = Math.round((count / 15) * 100);
  document.getElementById('bar').style.width = pct + '%';
  document.getElementById('bar-label').textContent = count + ' / 15 topics reviewed';
}

loadProgress();
updateBar();
