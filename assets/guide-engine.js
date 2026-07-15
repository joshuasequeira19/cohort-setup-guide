/* Shared engine for interactive step-guide pages.
   Each guide page defines `GUIDE_ID` and `steps` before loading this file. */

const STORAGE_KEY = 'guide-progress-' + GUIDE_ID;
const COMPLETE_KEY = 'guide-completed-' + GUIDE_ID;
let state = { history: ['start'] };
let showResumeBanner = false;

function cmd(label, code){
  const escaped = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `<div class="cmdblock"><div class="cmdhead"><span class="cmdlabel">${label}</span><button class="copy-btn" onclick="copyCmd(this)">Copy</button></div><pre><code>${escaped}</code></pre></div>`;
}

function linkChip(url){
  return `<span class="link-chip" onclick="copyLink(this)" data-url="${url}">${url}<svg class="chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg></span>`;
}

function copyLink(el){
  const url = el.getAttribute('data-url');
  navigator.clipboard.writeText(url).then(()=>{
    el.classList.add('copied');
    setTimeout(()=>{el.classList.remove('copied');}, 1400);
  });
}

function copyCmd(btn){
  const code = btn.closest('.cmdblock').querySelector('code').innerText;
  navigator.clipboard.writeText(code).then(()=>{
    const old = btn.textContent;
    btn.textContent = 'Copied';
    setTimeout(()=>{btn.textContent = old;}, 1400);
  });
}

function iconWindows(){
  return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="8" height="8"/><rect x="13" y="4" width="8" height="8"/><rect x="3" y="14" width="8" height="6"/><rect x="13" y="14" width="8" height="6"/></svg>';
}
function iconMac(){
  return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="12" rx="1.5"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg>';
}
function iconLinux(){
  return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3"/><line x1="12" y1="15" x2="16" y2="15"/></svg>';
}

function loadState(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(saved && Array.isArray(saved.history) && saved.history.length && saved.history.every(id => steps[id])){
      if(saved.history.length > 1) showResumeBanner = true;
      return { history: saved.history };
    }
  } catch(e){}
  return { history: ['start'] };
}

function saveState(){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e){}
  const stepId = state.history[state.history.length - 1];
  if(steps[stepId] && steps[stepId].endGood){
    try { localStorage.setItem(COMPLETE_KEY, '1'); } catch(e){}
  }
}

state = loadState();

function buildSummary(){
  const lines = [];
  state.history.forEach(id => {
    const s = steps[id];
    lines.push(`# ${s.title}`);
    const tmp = document.createElement('div');
    tmp.innerHTML = s.body;
    const text = tmp.textContent.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
    if(text) lines.push(text);
    lines.push('');
  });
  return lines.join('\n');
}

function copySummary(btn){
  navigator.clipboard.writeText(buildSummary()).then(()=>{
    const old = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(()=>{btn.textContent = old;}, 1600);
  });
}

function render(){
  const stepId = state.history[state.history.length - 1];
  const step = steps[stepId];
  const card = document.getElementById('card');

  let html = '';
  if(showResumeBanner){
    html += `<div class="callout info">Picking up where you left off. <a href="#" onclick="restart(); return false;" style="color:inherit;">Start over instead</a></div>`;
    showResumeBanner = false;
  }
  html += `<p class="step-tag">${step.tag}</p><h2 class="step-title">${step.title}</h2><div class="step-body">${step.body}</div>`;

  if(step.options){
    html += `<div class="options">`;
    step.options.forEach(opt => {
      html += `<button class="opt-btn" onclick="goTo('${opt.to}')">${opt.icon || ''}<span>${opt.label}</span><span class="arrow">→</span></button>`;
    });
    html += `</div>`;
  }

  if(step.next){
    html += `<div class="nav-row"><span></span><button class="btn primary" onclick="goTo('${step.next}')">${step.nextLabel}</button></div>`;
  }

  if(step.end || step.endGood){
    html += `<div class="nav-row"><button class="btn" onclick="restart()">Start over</button><button class="btn ghost" onclick="copySummary(this)">Copy my steps as notes</button></div>`;
  }

  card.innerHTML = html;

  if(state.history.length > 1 && !step.options){
    const backRow = document.createElement('div');
    backRow.className = 'nav-row';
    backRow.style.marginTop = '1rem';
    backRow.innerHTML = `<button class="btn ghost" onclick="goBack()">← Back</button>`;
    card.prepend(backRow);
  }

  renderTrail();
  window.scrollTo({top:0, behavior:'smooth'});
}

function renderTrail(){
  const trail = document.getElementById('trail');
  let html = `<span class="prompt">student@setup:~$</span>`;
  const crumbs = [];
  state.history.forEach((id, i) => {
    const s = steps[id];
    if(s.crumb) crumbs.push({label: s.crumb, index: i});
  });
  if(crumbs.length === 0){
    html += `<span class="crumb active">start</span>`;
  } else {
    crumbs.forEach((c, i) => {
      html += `<span class="sep">/</span><button class="crumb ${i === crumbs.length-1 ? 'active' : ''}" onclick="jumpTo(${c.index})">${c.label}</button>`;
    });
  }
  trail.innerHTML = html;
}

function goTo(id){
  state.history.push(id);
  saveState();
  render();
}

function goBack(){
  if(state.history.length > 1){
    state.history.pop();
    saveState();
    render();
  }
}

function jumpTo(index){
  state.history = state.history.slice(0, index + 1);
  saveState();
  render();
}

function restart(){
  state.history = ['start'];
  saveState();
  render();
}

render();
