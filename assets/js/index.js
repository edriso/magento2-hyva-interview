function toggleQA(el) {
  el.closest('.qa').classList.toggle('open');
}

function toggleCheck(item) {
  const cb = item.querySelector('input[type="checkbox"]');
  cb.checked = !cb.checked;
  item.classList.toggle('done', cb.checked);
  saveChecklist();
}

function saveChecklist() {
  const state = Array.from(document.querySelectorAll('.checklist-item'))
    .map(i => i.querySelector('input').checked);
  localStorage.setItem('interview-checklist', JSON.stringify(state));
}

function loadChecklist() {
  const saved = localStorage.getItem('interview-checklist');
  if (!saved) return;
  JSON.parse(saved).forEach((checked, i) => {
    const items = document.querySelectorAll('.checklist-item');
    if (checked && items[i]) {
      items[i].querySelector('input').checked = true;
      items[i].classList.add('done');
    }
  });
}

document.querySelectorAll('.checklist-item input').forEach(cb => {
  cb.addEventListener('click', e => e.stopPropagation());
});

loadChecklist();
