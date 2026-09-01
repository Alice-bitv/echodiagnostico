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
  const samePrice = e.club!=null && e.club===e.normal;
  card.innerHTML = `
    <span class="cat">${e.cat}</span>
    <h4>${e.name}</h4>
    <p class="note">${e.note || (e.schedule ? "Necessário agendar" : "Não precisa agendar")}</p>
    <div class="price-compare">
      ${samePrice ? `<div class="price-rows club"><span class="lbl">Valor</span><span class="val">${money(e.club)}</span></div>` : `
      ${e.club!=null ? `<div class="price-rows club"><span class="lbl">Club Echo</span><span class="val">${money(e.club)}</span></div>` : ''}
      <div class="price-rows normal"><span class="lbl">${e.club!=null?'Sem Club Echo (dinheiro/Pix)':'Valor'}</span><span class="val">${money(e.normal)}</span></div>
      ${e.card!=null ? `<div class="price-rows normal"><span class="lbl">Débito/Crédito</span><span class="val">${money(e.card)}</span></div>` : ''}
      `}
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
/* Estado do catálogo: categoria ativa + termo de busca, combinados */
const _catalogState = { cat: 'Todos', q: '' };

function _catalogFilteredExams(){
  return EXAMS.filter(e=>{
    const matchesCat = _catalogState.cat === 'Todos' || e.cat === _catalogState.cat;
    const matchesQ = !_catalogState.q || e.name.toLowerCase().includes(_catalogState.q);
    return matchesCat && matchesQ;
  });
}

function _paintCatalog(gridId, countId){
  const el = document.getElementById(gridId);
  if(!el) return;
  el.innerHTML = '';
  const results = _catalogFilteredExams();
  const countEl = countId ? document.getElementById(countId) : null;
  if(countEl) countEl.textContent = results.length + (results.length===1 ? ' resultado' : ' resultados');
  if(!results.length){
    el.innerHTML = '<p style="color:var(--gray-600);grid-column:1/-1;">Nenhum exame encontrado. Fale com a gente pelo WhatsApp para confirmar.</p>';
    return;
  }
  results.forEach(e=>el.appendChild(buildExamCard(e)));
}

function renderExamCatalog(gridId, filtersId, searchInputId, countId){
  const el = document.getElementById(gridId);
  if(!el) return;

  // filtros de categoria (chips)
  if(filtersId){
    const filtersEl = document.getElementById(filtersId);
    if(filtersEl){
      function paintFilters(){
        filtersEl.innerHTML = '';
        const all = document.createElement('button');
        all.className = 'exam-tab' + (_catalogState.cat==='Todos' ? ' active' : '');
        all.textContent = 'Todos';
        all.onclick = ()=>{ _catalogState.cat = 'Todos'; paintFilters(); _paintCatalog(gridId, countId); };
        filtersEl.appendChild(all);
        CATEGORIES.forEach(c=>{
          const b = document.createElement('button');
          b.className = 'exam-tab' + (_catalogState.cat===c ? ' active' : '');
          b.textContent = c;
          b.onclick = ()=>{ _catalogState.cat = c; paintFilters(); _paintCatalog(gridId, countId); };
          filtersEl.appendChild(b);
        });
      }
      paintFilters();
    }
  }

  // a busca por texto é ligada separadamente por wireExamAutocomplete()

  // destaca e rola até o exame se veio de um link "Saiba mais"
  const params = new URLSearchParams(location.search);
  const target = params.get('exame');
  if(target){
    const targetExam = EXAMS.find(x=>x.slug===target);
    if(targetExam) _catalogState.cat = 'Todos';
  }

  _paintCatalog(gridId, countId);

  if(target){
    setTimeout(()=>{
      const card = document.getElementById('exame-' + target);
      if(card){
        card.classList.add('highlight');
        card.scrollIntoView({behavior:'smooth', block:'center'});
      }
    }, 100);
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
    const list = items.map(e=>{
      const samePrice = e.club!=null && e.club===e.normal;
      return `
      <div class="price-line">
        <div class="exname">${e.name}${e.note ? `<span class="flag">${e.note}</span>`:''}</div>
        ${samePrice ? `<div><span class="col-lbl">Valor</span><span class="club-p">${money(e.club)}</span></div><div></div>` : `
        ${e.club!=null ? `<div><span class="col-lbl">Club Echo</span><span class="club-p">${money(e.club)}</span></div>` : '<div></div>'}
        <div><span class="col-lbl">Sem Club Echo</span><span class="normal-p">${money(e.normal)}${e.card!=null ? ` <span style="color:var(--gray-400);font-weight:400;">· Débito/Créd. ${money(e.card)}</span>` : ''}</span></div>
        `}
        <a class="agendar-mini" target="_blank" rel="noopener" href="${waAgendarExame(e.name)}">Agendar</a>
      </div>`;
    }).join('');
    group.innerHTML = `<h3>${cat}</h3><div class="price-list">${list}</div>`;
    groupsEl.appendChild(group);
  });
}

/* ===================== RENDER: TABELA DE CONSULTAS (aba Consultas) ===================== */
function renderConsultasTable(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  const list = SPECIALTIES.map(s=>{
    const samePrice = s.club!=null && s.club===s.normal;
    return `
      <div class="price-line">
        <div class="exname">${s.name}<span class="flag">${s.days}</span></div>
        ${samePrice ? `<div><span class="col-lbl">Valor</span><span class="club-p">${money(s.club)}</span></div><div></div>` : `
        ${s.club!=null ? `<div><span class="col-lbl">Club Echo</span><span class="club-p">${money(s.club)}</span></div>` : '<div></div>'}
        <div><span class="col-lbl">Sem Club Echo</span><span class="normal-p">${money(s.normal)}${s.card!=null ? ` <span style="color:var(--gray-400);font-weight:400;">· Débito/Créd. ${money(s.card)}</span>` : ''}</span></div>
        `}
        <a class="agendar-mini" target="_blank" rel="noopener" href="${waAgendarConsulta(s.name)}">Agendar</a>
      </div>`;
  }).join('');
  el.innerHTML = `<div class="price-group"><h3>Consultas</h3><div class="price-list">${list}</div></div>`;
}

/* ===================== ALTERNA ABAS EXAMES / CONSULTAS ===================== */
function wireMainTabs(examsBtnId, consultasBtnId, examsPanelId, consultasPanelId, onConsultasFirstShow){
  const examsBtn = document.getElementById(examsBtnId);
  const consultasBtn = document.getElementById(consultasBtnId);
  const examsPanel = document.getElementById(examsPanelId);
  const consultasPanel = document.getElementById(consultasPanelId);
  if(!examsBtn || !consultasBtn || !examsPanel || !consultasPanel) return;
  let consultasLoaded = false;
  examsBtn.addEventListener('click', ()=>{
    examsBtn.classList.add('active'); consultasBtn.classList.remove('active');
    examsPanel.style.display = ''; consultasPanel.style.display = 'none';
  });
  consultasBtn.addEventListener('click', ()=>{
    consultasBtn.classList.add('active'); examsBtn.classList.remove('active');
    consultasPanel.style.display = ''; examsPanel.style.display = 'none';
    if(!consultasLoaded && onConsultasFirstShow){ onConsultasFirstShow(); consultasLoaded = true; }
  });
}

/* ===================== RENDER: PACKAGES ===================== */
function renderPackages(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  PACKAGES.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'exam-card';
    card.innerHTML = `
      <span class="cat">${p.cat}</span>
      <h4>${p.name}</h4>
      <p class="note">${p.items.join(', ')}${p.note ? ' — ' + p.note : ''}.</p>
      <div class="price-compare">
        <div class="price-rows club"><span class="lbl">Club Echo</span><span class="val">${money(p.club)}</span></div>
        ${p.normal!=null && p.club!==p.normal ? `<div class="price-rows normal"><span class="lbl">Sem Club Echo</span><span class="val">${money(p.normal)}</span></div>` : ''}
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
    const isXray = e.cat.indexOf('Raio-X') === 0;
    card.innerHTML = `
      <span class="cat">${isXray ? 'Sem agendamento · imagem na hora' : 'Resultado na hora'}</span>
      <h4>${e.name}</h4>
      <p class="note">${isXray ? 'Resultado em até 48 horas.' : e.note}</p>
      <div class="price-rows club"><span class="lbl">A partir de</span><span class="val">${money(e.club)}</span></div>
      <div class="cta-row"><a class="btn btn-primary btn-sm btn-block" target="_blank" rel="noopener" href="${waAgendarExame(e.name)}">Agendar</a></div>`;
    el.appendChild(card);
  });
}

/* ===================== RENDER: SPECIALTIES ===================== */
function renderSpecialties(containerId, limit, activeGroup){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = '';
  let list = SPECIALTIES;
  if(activeGroup && activeGroup !== 'Todas') list = list.filter(s=>s.group===activeGroup);
  if(limit) list = list.slice(0, limit);
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
  if(!list.length){
    el.innerHTML = '<p style="color:var(--gray-600);grid-column:1/-1;">Nenhuma especialidade nesse grupo.</p>';
  }
}

/* ===================== RENDER: FILTROS DE ESPECIALIDADE (por grupo) ===================== */
function renderSpecialtyFilters(filtersId, gridId){
  const filtersEl = document.getElementById(filtersId);
  if(!filtersEl) return;
  function paint(active){
    filtersEl.innerHTML = '';
    const all = document.createElement('button');
    all.className = 'exam-tab' + (active==='Todas' ? ' active' : '');
    all.textContent = 'Todas';
    all.onclick = ()=>{ paint('Todas'); renderSpecialties(gridId, null, 'Todas'); };
    filtersEl.appendChild(all);
    SPECIALTY_GROUPS.forEach(g=>{
      const b = document.createElement('button');
      b.className = 'exam-tab' + (active===g ? ' active' : '');
      b.textContent = g;
      b.onclick = ()=>{ paint(g); renderSpecialties(gridId, null, g); };
      filtersEl.appendChild(b);
    });
  }
  paint('Todas');
}

/* ===================== AUTOCOMPLETE DE EXAMES (dropdown de sugestões) ===================== */
function wireExamAutocomplete(inputId, dropdownId, filtersId, gridId, countId){
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if(!input || !dropdown) return;

  function closeDropdown(){ dropdown.classList.remove('show'); dropdown.innerHTML=''; }

  function setActiveFilterToTodos(){
    const filtersEl = document.getElementById(filtersId);
    if(!filtersEl) return;
    filtersEl.querySelectorAll('.exam-tab').forEach(b=>{
      b.classList.toggle('active', b.textContent === 'Todos');
    });
  }

  function goToExam(e){
    _catalogState.cat = 'Todos';
    _catalogState.q = '';
    setActiveFilterToTodos();
    _paintCatalog(gridId, countId);
    closeDropdown();
    input.value = '';
    setTimeout(()=>{
      const card = document.getElementById('exame-' + e.slug);
      if(card){
        card.classList.add('highlight');
        card.scrollIntoView({behavior:'smooth', block:'center'});
        setTimeout(()=>card.classList.remove('highlight'), 2500);
      }
    }, 60);
  }

  input.addEventListener('input', ()=>{
    const q = input.value.trim().toLowerCase();
    // mantém o filtro em tempo real na grade, igual antes
    _catalogState.q = q;
    _paintCatalog(gridId, countId);
    // e também mostra o dropdown de sugestões clicáveis
    if(!q){ closeDropdown(); return; }
    const matches = EXAMS.filter(e=>e.name.toLowerCase().includes(q)).slice(0, 8);
    if(!matches.length){
      dropdown.innerHTML = '<div class="autocomplete-empty">Nenhum exame encontrado.</div>';
    } else {
      dropdown.innerHTML = matches.map(e=>`
        <button type="button" class="autocomplete-item" data-slug="${e.slug}">
          <span>${e.name}</span>
          <span class="autocomplete-group">${e.cat}</span>
        </button>`).join('');
      dropdown.querySelectorAll('.autocomplete-item').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          const ex = EXAMS.find(x=>x.slug===btn.getAttribute('data-slug'));
          if(ex) goToExam(ex);
        });
      });
    }
    dropdown.classList.add('show');
  });

  input.addEventListener('keydown', ev=>{
    if(ev.key==='Enter'){
      const q = input.value.trim().toLowerCase();
      const first = EXAMS.find(e=>e.name.toLowerCase().includes(q));
      if(first) goToExam(first);
    }
    if(ev.key==='Escape') closeDropdown();
  });

  document.addEventListener('click', ev=>{
    if(!dropdown.contains(ev.target) && ev.target !== input) closeDropdown();
  });
}

/* ===================== BUSCA DE ESPECIALIDADES (com autocomplete) ===================== */
function wireSpecialtySearch(inputId, dropdownId, filtersId, gridId){
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if(!input || !dropdown) return;

  function closeDropdown(){ dropdown.classList.remove('show'); dropdown.innerHTML=''; }

  function goToSpecialty(s){
    // garante que o grupo dela esteja visível antes de rolar até o card
    const filtersEl = document.getElementById(filtersId);
    if(filtersEl){
      filtersEl.querySelectorAll('.exam-tab').forEach(b=>b.classList.remove('active'));
      const allBtn = Array.from(filtersEl.querySelectorAll('.exam-tab')).find(b=>b.textContent==='Todas');
      if(allBtn) allBtn.classList.add('active');
    }
    renderSpecialties(gridId, null, 'Todas');
    closeDropdown();
    input.value = '';
    setTimeout(()=>{
      const card = document.getElementById('esp-' + s.slug);
      if(card){
        card.classList.add('highlight');
        card.scrollIntoView({behavior:'smooth', block:'center'});
        setTimeout(()=>card.classList.remove('highlight'), 2500);
      }
    }, 60);
  }

  input.addEventListener('input', ()=>{
    const q = input.value.trim().toLowerCase();
    if(!q){ closeDropdown(); return; }
    const matches = SPECIALTIES.filter(s=>s.name.toLowerCase().includes(q)).slice(0, 8);
    if(!matches.length){
      dropdown.innerHTML = '<div class="autocomplete-empty">Nenhuma especialidade encontrada.</div>';
    } else {
      dropdown.innerHTML = matches.map(s=>`
        <button type="button" class="autocomplete-item" data-slug="${s.slug}">
          <span>${s.name}</span>
          <span class="autocomplete-group">${s.group}</span>
        </button>`).join('');
      dropdown.querySelectorAll('.autocomplete-item').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          const s = SPECIALTIES.find(x=>x.slug===btn.getAttribute('data-slug'));
          if(s) goToSpecialty(s);
        });
      });
    }
    dropdown.classList.add('show');
  });

  input.addEventListener('keydown', ev=>{
    if(ev.key==='Enter'){
      const q = input.value.trim().toLowerCase();
      const first = SPECIALTIES.find(s=>s.name.toLowerCase().includes(q));
      if(first) goToSpecialty(first);
    }
    if(ev.key==='Escape') closeDropdown();
  });

  document.addEventListener('click', ev=>{
    if(!dropdown.contains(ev.target) && ev.target !== input) closeDropdown();
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
      searchResults.innerHTML = matches.map(e=>{
        const samePrice = e.club!=null && e.club===e.normal;
        return `
        <div class="search-result-row">
          <div>
            <div class="name">${e.name}</div>
            <div class="meta">${e.note || (e.schedule ? 'Necessário agendar' : 'Não precisa agendar')}</div>
          </div>
          <div style="text-align:right;">
            ${samePrice ? `<div class="price">${money(e.club)}</div>` : `
            ${e.club!=null ? `<div class="price">${money(e.club)} <span style="color:var(--gray-400);font-weight:400;">Club Echo</span></div>`:''}
            <div style="font-size:12px;color:var(--gray-600);">${money(e.normal)} sem Club Echo</div>
            `}
            <a class="btn btn-primary btn-sm" style="margin-top:6px;" target="_blank" rel="noopener" href="${waAgendarExame(e.name)}">Agendar</a>
          </div>
        </div>`;
      }).join('');
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

/* ===================== AVISO DE VIGÊNCIA DO FLYER ===================== */
function addFlyerValidityNotice(){
  const page = location.pathname.split('/').pop() || 'index.html';
  const pricingPages = ['exames.html','precos.html','especialidades.html','club-echo.html'];
  if(!pricingPages.includes(page)) return;
  const pageHeader = document.querySelector('.page-header, main > .club');
  if(!pageHeader || document.querySelector('.page-source-notice')) return;
  const noticeWrap = document.createElement('div');
  noticeWrap.className = 'wrap page-source-notice';
  noticeWrap.innerHTML = '<div class="source-notice" role="note"><strong>Vigência do flyer</strong><span>Valores da 2ª quinzena de julho de 2026. Confirme preço, preparo e disponibilidade antes do atendimento.</span></div>';
  pageHeader.insertAdjacentElement('afterend', noticeWrap);
}

/* A faixa animada é um destaque exclusivo da página inicial. */
function keepPromoTickerOnHome(){
  const page = location.pathname.split('/').pop() || 'index.html';
  if(page === 'index.html') return;
  const ticker = document.querySelector('.promo-ticker');
  if(ticker) ticker.remove();
}

/* ===================== MOVIMENTO E PROFUNDIDADE ===================== */
function wirePageMotion(){
  const items = document.querySelectorAll('.section-head, .qa-item, .exam-card, .spec-card, .info-card, .source-notice');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!items.length || !('IntersectionObserver' in window) || reducedMotion){
    items.forEach(item=>item.classList.add('motion-in'));
  } else {
    items.forEach((item,index)=>{
      item.classList.add('motion-ready');
      item.style.setProperty('--motion-delay', Math.min(index % 6, 5) * 55 + 'ms');
    });
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('motion-in');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.12, rootMargin:'0px 0px -40px'});
    items.forEach(item=>observer.observe(item));
  }

  const header = document.querySelector('header.site');
  if(header){
    const updateHeader = ()=>header.classList.toggle('is-scrolled', window.scrollY > 16);
    updateHeader();
    window.addEventListener('scroll', updateHeader, {passive:true});
  }
}

/* ===================== INIT COMUM A TODAS AS PÁGINAS ===================== */
document.addEventListener('DOMContentLoaded', function(){
  wireWhatsAppButtons();
  wireMobileMenu();
  markCurrentNav();
  keepPromoTickerOnHome();
  wireRevealBlocks();
  addFlyerValidityNotice();
  requestAnimationFrame(wirePageMotion);
});
