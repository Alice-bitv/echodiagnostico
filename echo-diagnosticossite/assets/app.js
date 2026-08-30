/* =========================================================================
   LÓGICA COMPARTILHADA — todas as páginas carregam este arquivo.
   ========================================================================= */

function money(v){ if(v==null) return "—"; if(v===0) return "Grátis"; return "R$ " + v.toString().replace(".",","); }
function savePct(club, normal){
  if(club==null || !normal) return 0;
  return Math.max(6, Math.round((club/normal)*100));
}

/* Monta um link de WhatsApp com mensagem pronta.
   Trocar o número: edite WHATSAPP_NUMBER em data.js */
function waLink(text){
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
}
function waAgendarExame(nomeExame){
  return waLink("Olá! Gostaria de agendar o exame: " + nomeExame + ".");
}
function waAgendarConsulta(nomeEspecialidade){
  return waLink("Olá! Gostaria de agendar uma consulta com: " + nomeEspecialidade + ".");
}
function waAgendarGenerico(){
  return waLink("Olá! Gostaria de agendar um exame na Echo Diagnósticos.");
}
function waConsultaGenerico(){
  return waLink("Olá! Gostaria de agendar uma consulta na Echo Diagnósticos.");
}
function waClubEcho(){
  return waLink("Olá! Quero assinar o Club Echo (R$ 29,90/mês, para até 5 pessoas).");
}
function waFaleConosco(){
  return waLink("Olá! Gostaria de mais informações sobre a Echo Diagnósticos.");
}

/* ===================== APLICA LINKS DE WHATSAPP NA PÁGINA =====================
   Qualquer elemento com data-wa="agendar-exame" | "agendar-consulta" | "club" |
   "fale-conosco" vira automaticamente um link de WhatsApp. */
function wireWhatsAppButtons(){
  document.querySelectorAll('[data-wa]').forEach(el=>{
    const kind = el.getAttribute('data-wa');
    let href = "#";
    if(kind === 'agendar-exame') href = waAgendarGenerico();
    else if(kind === 'agendar-consulta') href = waConsultaGenerico();
    else if(kind === 'club') href = waClubEcho();
    else if(kind === 'fale-conosco') href = waFaleConosco();
    el.setAttribute('href', href);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });
}

/* ===================== MENU MOBILE ===================== */
function wireMobileMenu(){
  const drawer = document.getElementById('drawer');
  const menuBtn = document.getElementById('menuBtn');
  if(!drawer || !menuBtn) return;
  function openDrawer(){ drawer.classList.add('open'); menuBtn.setAttribute('aria-expanded','true'); }
  function closeDrawer(){ drawer.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); }
  menuBtn.addEventListener('click', openDrawer);
  const closeBtn = document.getElementById('closeDrawer');
  if(closeBtn) closeBtn.addEventListener('click', closeDrawer);
  const bg = document.getElementById('drawerBg');
  if(bg) bg.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeDrawer));
}

/* ===================== MARCA LINK ATIVO NO MENU ===================== */
function markCurrentNav(){
  const page = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('nav.primary a, .drawer-panel nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === page) a.classList.add('current');
  });
}

/* ===================== EXAM CARD BUILDER ===================== */
function buildExamCard(e, opts){
  opts = opts || {};
  const card = document.createElement('div');
  card.className = 'exam-card';
  card.id = 'exame-' + e.slug;
  const pct = savePct(e.club, e.normal);
  card.innerHTML = `
    <span class="cat">${e.cat}</span>
    <h4>${e.name}</h4>
    <p class="note">${e.note || (e.schedule ? "Necessário agendar" : "Não precisa agendar")}</p>
    <div class="price-compare">
      ${e.club!=null ? `<div class="price-rows club"><span class="lbl">Club Echo</span><span class="val">${money(e.club)}</span></div>` : ''}
      <div class="price-rows normal"><span class="lbl">${e.club!=null?'Sem Club Echo (dinheiro/Pix)':'Valor'}</span><span class="val">${money(e.normal)}</span></div>
      ${e.card!=null ? `<div class="price-rows normal"><span class="lbl">Débito/Crédito</span><span class="val">${money(e.card)}</span></div>` : ''}
      ${e.club!=null ? `<div class="bar-track"><div class="bar-fill" style="width:${pct}%;"></div></div>` : ''}
    </div>
    <div class="cta-row">
      ${opts.hideDetail ? '' : `<a class="btn btn-outline btn-sm" href="exames.html?exame=${e.slug}#exame-${e.slug}">Saiba Mais</a>`}
      <a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="${waAgendarExame(e.name)}">Agendar</a>
    </div>`;
  return card;
}

/* ===================== RENDER: TOP EXAMS (home) ===================== */
function renderTopExams(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  TOP_EXAM_SLUGS.forEach(slug=>{
    const e = EXAMS.find(x=>x.slug===slug);
    if(e) el.appendChild(buildExamCard(e));
  });
}

/* ===================== RENDER: FULL EXAM CATALOG (exames.html) ===================== */
function renderExamCatalog(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  EXAMS.forEach(e=>el.appendChild(buildExamCard(e)));
  // destaca e rola até o exame se veio de um link "Saiba mais"
  const params = new URLSearchParams(location.search);
  const target = params.get('exame');
  if(target){
    const card = document.getElementById('exame-' + target);
    if(card){
      card.classList.add('highlight');
      setTimeout(()=>card.scrollIntoView({behavior:'smooth', block:'center'}), 150);
    }
  }
}

/* ===================== RENDER: PRICE TABLE (precos.html) ===================== */
function renderPriceTable(active){
  const filtersEl = document.getElementById('priceFilters');
  const groupsEl = document.getElementById('priceGroups');
  if(!filtersEl || !groupsEl) return;
  active = active || 'Todos';
  filtersEl.innerHTML = '';
  const all = document.createElement('button');
  all.className = 'exam-tab' + (active==='Todos' ? ' active' : '');
  all.textContent = 'Todos';
  all.onclick = ()=>renderPriceTable('Todos');
  filtersEl.appendChild(all);
  CATEGORIES.forEach(c=>{
    const b = document.createElement('button');
    b.className = 'exam-tab' + (active===c ? ' active' : '');
    b.textContent = c;
    b.onclick = ()=>renderPriceTable(c);
    filtersEl.appendChild(b);
  });

  groupsEl.innerHTML = '';
  const cats = active==='Todos' ? CATEGORIES : [active];
  cats.forEach(cat=>{
    const items = EXAMS.filter(e=>e.cat===cat);
    if(!items.length) return;
    const group = document.createElement('div');
    group.className = 'price-group';
    group.id = 'cat-' + cat.replace(/[^a-zA-Z0-9]+/g,'-').toLowerCase();
    const list = items.map(e=>`
      <div class="price-line">
        <div class="exname">${e.name}${e.note ? `<span class="flag">${e.note}</span>`:''}</div>
        ${e.club!=null ? `<div><span class="col-lbl">Club Echo</span><span class="club-p">${money(e.club)}</span></div>` : '<div></div>'}
        <div><span class="col-lbl">Sem Club Echo</span><span class="normal-p">${money(e.normal)}${e.card!=null ? ` <span style="color:var(--gray-400);font-weight:400;">· Débito/Créd. ${money(e.card)}</span>` : ''}</span></div>
        <a class="agendar-mini" target="_blank" rel="noopener" href="${waAgendarExame(e.name)}">Agendar</a>
      </div>`).join('');
    group.innerHTML = `<h3>${cat}</h3><div class="price-list">${list}</div>`;
    groupsEl.appendChild(group);
  });
}

/* ===================== RENDER: PACKAGES ===================== */
function renderPackages(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  PACKAGES.forEach(p=>{
    const pct = p.club===p.normal ? 100 : savePct(p.club, p.normal);
    const card = document.createElement('div');
    card.className = 'exam-card';
    card.innerHTML = `
      <span class="cat">${p.cat}</span>
      <h4>${p.name}</h4>
      <p class="note">${p.items.join(', ')}${p.note ? ' — ' + p.note : ''}.</p>
      <div class="price-compare">
        <div class="price-rows club"><span class="lbl">Club Echo</span><span class="val">${money(p.club)}</span></div>
        ${p.club!==p.normal ? `<div class="price-rows normal"><span class="lbl">Sem Club Echo</span><span class="val">${money(p.normal)}</span></div><div class="bar-track"><div class="bar-fill" style="width:${pct}%;"></div></div>` : ''}
      </div>
      <div class="cta-row"><a class="btn btn-primary btn-sm btn-block" target="_blank" rel="noopener" href="${waAgendarExame(p.name)}">Agendar Pacote</a></div>`;
    el.appendChild(card);
  });
}

/* ===================== RENDER: QUICK RESULT EXAMS ===================== */
function renderQuickResults(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  QUICK_RESULT_SLUGS.forEach(slug=>{
    const e = EXAMS.find(x=>x.slug===slug);
    if(!e) return;
    const card = document.createElement('div');
    card.className = 'exam-card';
    card.innerHTML = `
      <span class="cat">Resultado na hora</span>
      <h4>${e.name}</h4>
      <div class="price-rows club"><span class="lbl">A partir de</span><span class="val">${money(e.club)}</span></div>
      <div class="cta-row"><a class="btn btn-primary btn-sm btn-block" target="_blank" rel="noopener" href="${waAgendarExame(e.name)}">Agendar</a></div>`;
    el.appendChild(card);
  });
}

/* ===================== RENDER: SPECIALTIES ===================== */
function renderSpecialties(containerId, limit){
  const el = document.getElementById(containerId);
  if(!el) return;
  const list = limit ? SPECIALTIES.slice(0, limit) : SPECIALTIES;
  list.forEach(s=>{
    const c = document.createElement('div');
    c.className = 'spec-card';
    c.id = 'esp-' + s.slug;
    c.innerHTML = `
      <h4>${s.name}</h4>
      <div class="days">${s.days}</div>
      <div class="prices">
        ${s.club!=null ? `<span class="c">${money(s.club)}</span>` : '<span></span>'}
        <span class="n">${money(s.normal)}</span>
      </div>
      ${s.card!=null ? `<div style="font-size:11.5px;color:var(--gray-600);">Débito/Crédito: ${money(s.card)}</div>` : ''}
      <a class="btn btn-outline btn-sm btn-block" target="_blank" rel="noopener" href="${waAgendarConsulta(s.name)}">Agendar Consulta</a>`;
    el.appendChild(c);
  });
}

/* ===================== BUSCA DE EXAMES ===================== */
function wireExamSearch(inputId, btnId, resultsId){
  const searchInput = document.getElementById(inputId);
  const searchResults = document.getElementById(resultsId);
  if(!searchInput || !searchResults) return;
  function runSearch(){
    const q = searchInput.value.trim().toLowerCase();
    if(!q){ searchResults.classList.remove('show'); searchResults.innerHTML=''; return; }
    const matches = EXAMS.filter(e=>e.name.toLowerCase().includes(q));
    if(!matches.length){
      searchResults.innerHTML = '<p style="color:var(--gray-600);font-size:14px;padding:8px 4px;">Nenhum exame encontrado com esse nome. Fale com a gente pelo WhatsApp para confirmar.</p>';
    } else {
      searchResults.innerHTML = matches.map(e=>`
        <div class="search-result-row">
          <div>
            <div class="name">${e.name}</div>
            <div class="meta">${e.note || (e.schedule ? 'Necessário agendar' : 'Não precisa agendar')}</div>
          </div>
          <div style="text-align:right;">
            ${e.club!=null ? `<div class="price">${money(e.club)} <span style="color:var(--gray-400);font-weight:400;">Club Echo</span></div>`:''}
            <div style="font-size:12px;color:var(--gray-600);">${money(e.normal)} sem Club Echo</div>
            <a class="btn btn-primary btn-sm" style="margin-top:6px;" target="_blank" rel="noopener" href="${waAgendarExame(e.name)}">Agendar</a>
          </div>
        </div>`).join('');
    }
    searchResults.classList.add('show');
  }
  const btn = document.getElementById(btnId);
  if(btn) btn.addEventListener('click', runSearch);
  searchInput.addEventListener('keydown', ev=>{ if(ev.key==='Enter') runSearch(); });
  searchInput.addEventListener('input', runSearch);
}

/* ===================== REVEAL ON SCROLL ===================== */
function wireRevealBlocks(){
  const blocks = document.querySelectorAll('.reveal-block');
  if(!blocks.length) return;
  if(!('IntersectionObserver' in window)){
    blocks.forEach(b=>b.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.3});
  blocks.forEach(b=>io.observe(b));
}

/* ===================== INIT COMUM A TODAS AS PÁGINAS ===================== */
document.addEventListener('DOMContentLoaded', function(){
  wireWhatsAppButtons();
  wireMobileMenu();
  markCurrentNav();
  wireRevealBlocks();
});
