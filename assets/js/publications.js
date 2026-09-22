/* Page behavior extracted from Publications.html. */
/*
      =========================
      DATA (merged + de-duplicated by title)
      =========================
    */
    if (!Array.isArray(window.ZHOU_PUBLICATIONS)) {
      throw new Error("Publications data was not loaded. Check assets/data/publications-data.js");
    }
    const papersRaw = window.ZHOU_PUBLICATIONS;
    /*
      =========================
      1) De-duplicate by title (case-insensitive)
      =========================
    */
    function normTitle(t){
      return (t || "").trim().toLowerCase().replace(/\s+/g, " ");
    }
    function richnessScore(p){
      let s = 0;
      s += (p.authors && p.authors.length) ? 2 : 0;
      s += (p.venue && p.venue.length) ? 2 : 0;
      s += (p.badges && p.badges.length) ? p.badges.length : 0;
      s += (p.links && p.links.length) ? p.links.length * 2 : 0;
      s += (p.year === null || p.year === undefined) ? 0 : 1;
      return s;
    }

    const dedupMap = new Map();
    for(const p of papersRaw){
      const key = normTitle(p.title);
      if(!key) continue;
      if(!dedupMap.has(key)){
        dedupMap.set(key, p);
      }else{
        const existing = dedupMap.get(key);
        if(richnessScore(p) > richnessScore(existing)){
          dedupMap.set(key, p);
        }
      }
    }
    const papers = Array.from(dedupMap.values());

    /*
      =========================
      2) Group by year (desc)
      =========================
    */
    function yearKey(y){
      if(y === null || y === undefined) return "Unknown year";
      return String(y);
    }

    const groups = new Map();
    for(const p of papers){
      const k = yearKey(p.year);
      if(!groups.has(k)) groups.set(k, []);
      groups.get(k).push(p);
    }

    const groupKeys = Array.from(groups.keys()).sort((a,b)=>{
      if(a === "Unknown year") return 1;
      if(b === "Unknown year") return -1;
      return Number(b) - Number(a);
    });

    for(const k of groupKeys){
      const arr = groups.get(k);
      arr.sort((p1,p2)=>{
        const v1 = (p1.venue || "").toLowerCase();
        const v2 = (p2.venue || "").toLowerCase();
        const pre1 = v1.includes("preprint") || v1.includes("arxiv");
        const pre2 = v2.includes("preprint") || v2.includes("arxiv");
        if(pre1 !== pre2) return pre1 ? 1 : -1;
        return (p1.title || "").localeCompare(p2.title || "");
      });
    }

    /*
      =========================
      3) Render & Magic Highlighting
      =========================
    */
    const root = document.getElementById("pubRoot");

    function escapeHTML(s){
      return (s || "").replace(/[&<>"]/g, c => ({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"
      }[c]));
    }

    // 自动高亮 PI 姓名的正则魔法

    // function highlightPI(authorsString) {
    //   if (!authorsString) return "";
    //   let safeStr = escapeHTML(authorsString);
    //   // 匹配 "Tong Zhou", "T Zhou", "T. Zhou", 以及带星号的情况
    //   const regex = /(Tong Zhou\s*\*?|T\.?\s*Zhou\s*\*?)/gi;
    //   return safeStr.replace(regex, '<strong style="color: #000000; font-weight: 900;">$&</strong>');
    // }

  function highlightAuthors(authorsString) {
  if (!authorsString) return "";
  let safeStr = escapeHTML(authorsString);

  // 1) PI（Tong Zhou）所有可能写法：更粗
  const PI_NAMES = ["Tong Zhou", "T Zhou", "T. Zhou"];

  // 2) 其他成员：黑色中等字重（你把名单补全）
  const OTHER_NAMES = [
    "Xiang Ji", "X Ji", "X. Ji",
    "Xianzhang Chen", "XZ Cheng", "X Cheng" , "X. Cheng",
    "Chenghao Shen", "CH Shen", "C Shen" , "C. Cheng",
    "Richang Huang", "RC Huang", "R Huang" , "R. Huang",
     "Ziye Zhu", "ZY Zhu", "Z Zhu" , "Z. Zhu",
    "Zhou Cui", "Z Cui", "Z. Cui",
    "Kang Yang", "K Yang", "K. Yang",
    "Yongliang Hu", "H Hu", "Y. Hu",
    "Xunkai Duan", "X Duan", "X. Duan",
    "Jiahui Qian", "J Qian", "J. Qian",
    "Shuang Li", "S Li", "S. Li",
    "Xiyu Chen", "X Chen", "X. Chen",
     "Linxuan Ji", "L Ji", "L. Ji",
    "Wei Tu", "Wei Tu", "Wei. Tu",
    "Bowen Hao", "B Hao", "B. Hao",
     "Jiayong Zhang", "J Zhang", "J. Zhang",
    // ...继续加
  ];

  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // 长的优先，避免短名抢匹配
  const buildPattern = (arr) =>
    arr.filter(Boolean)
      .sort((a, b) => b.length - a.length)
      .map(escapeRegex)
      .map(n => `\\b${n}\\b\\s*\\*?`)   // 允许带 *
      .join("|");

  const piRegex = new RegExp(`(${buildPattern(PI_NAMES)})`, "gi");
  const otherRegex = new RegExp(`(${buildPattern(OTHER_NAMES)})`, "gi");

  // 先处理 PI（更粗）
  safeStr = safeStr.replace(
    piRegex,
    '<strong style="color:#000000; font-weight:900;">$&</strong>'
  );

  // 再处理其他成员（中等字重）
  safeStr = safeStr.replace(
    otherRegex,
    '<span style="color:#000000; font-weight:600;">$&</span>'
  );

  return safeStr;
}

  function highlightPI(authorsString) {
  if (!authorsString) return "";
  let safeStr = escapeHTML(authorsString);

  const names = [
    "Xianzhang Chen", "XZ Cheng", "X Cheng" , "X. Cheng",
    "Chenghao Shen", "CH Shen", "C Shen" , "C. Cheng",
    "Richang Huang ", "RC Huang", "R Huang" , "R. Huang",
    "Ziye Zhu ", "ZY Zhu", "Z Zhu" , "Z. Zhu",
    "Zhou Cui ", "Z Cui", "Z. Cui",
    "Kang Yang", "K Yang", "K. Yang",
    "Yongliang Hu", "H Hu", "Y. Hu",
    "Xunkai Duan", "X Duan", "X. Duan",
    "Jiahui Qian", "J Qian", "J. Qian",
    "Shuang Li", "S Li", "S. Li",
    "Xiyu Chen", "X Chen", "X. Chen",
     "Linxuan Ji", "L Ji", "L. Ji",
    "Xiang Ji", "X Ji", "X. Ji",
    "Wei Tu", "Wei Tu", "Wei. Tu",
    "Bowen Hao", "B Hao", "B. Hao",
     "Jiayong Zhang", "J Zhang", "J. Zhang",
    "Tong Zhou", "T Zhou", "T. Zhou",
    // ...把课题组所有人加这里
  ];

  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = names
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex)
    .map(n => `\\b${n}\\b\\s*\\*?`)
    .join("|");

  const regex = new RegExp(`(${pattern})`, "gi");

  return safeStr.replace(regex, '<strong style="color:#000000; font-weight:900;">$&</strong>');
}



    function render(){
      root.innerHTML = groupKeys.map(k => {
        const yearLabel = k;
        const items = groups.get(k) || [];
        const id = (k === "Unknown year") ? "yUnknown" : ("y" + k);

        const lis = items.map(p => {
          const dataText = [
            p.title, p.authors, p.venue,
            (p.badges||[]).join(" "),
            (p.links||[]).map(x=>x.label).join(" ")
          ].join(" ");

          const badgesHTML = (p.badges && p.badges.length)
            ? `<div class="pub-badges">${p.badges.map(b=>`<span class="badge">${escapeHTML(b)}</span>`).join("")}</div>`
            : "";

          const linksHTML = (p.links && p.links.length)
            ? `<div class="pub-badges">${p.links.map(l=>{
                const href = l.href || "#";
                return `<a class="chip" href="${escapeHTML(href)}" ${href==="#" ? 'onclick="return false;"' : 'target="_blank" rel="noopener"'}>${escapeHTML(l.label)}</a>`;
              }).join("")}</div>`
            : "";

          const titleHref = (p.pdfUrl || "").trim();
          const articleHref = (p.paperUrl || "").trim();
          const venueHTML = p.venue
            ? `<div class="pub-venue">${
                articleHref
                  ? `<a href="${escapeHTML(articleHref)}" target="_blank" rel="noopener">${escapeHTML(p.venue)}</a>`
                  : escapeHTML(p.venue)
              }</div>`
            : "";

          return `
            <li class="pub-item" data-text="${escapeHTML(dataText)}">
              <div><div class="pub-no"></div></div>
              <div>
                <p class="pub-title">
                  ${titleHref
                    ? `<a class="pub-title-link" href="${escapeHTML(titleHref)}" target="_blank" rel="noopener">${escapeHTML(p.title)}</a>`
                    : `${escapeHTML(p.title)}`
                  }
                </p>
                
                ${p.authors ? `<div class="pub-authors">${highlightAuthors(p.authors)}  </div>` : ""}
                
                ${venueHTML}
                ${badgesHTML}
                ${linksHTML}
              </div>
            </li>
          `;
        }).join("");

        return `
          <div class="pub-year" data-year="${escapeHTML(yearLabel)}">
            <div class="pub-year-title" id="${escapeHTML(id)}">
              <span>${escapeHTML(yearLabel)}</span>
            </div>
            <ul class="pub-list">${lis}</ul>
          </div>
        `;
      }).join("");
    }

    render();

    /*
      =========================
      4) Search + numbering (reverse)
      =========================
    */
    const input = document.getElementById('pubSearch');

    function getAllItems(){
      return Array.from(document.querySelectorAll('.pub-item'));
    }
    function getAllYears(){
      return Array.from(document.querySelectorAll('.pub-year'));
    }

    function renumber(){
      const items = getAllItems();
      const visibleItems = items.filter(li => li.style.display !== 'none');
      const total = visibleItems.length;
      visibleItems.forEach((li, idx) => {
        const no = li.querySelector('.pub-no');
        if(no) no.textContent = (total - idx).toString();
      });
      // document.getElementById('pubTotal').textContent = total.toString();
    }

    function applyFilter(){
      const q = (input.value || '').trim().toLowerCase();
      const items = getAllItems();
      const years = getAllYears();

      items.forEach(li => {
        const text = (li.getAttribute('data-text') || li.innerText).toLowerCase();
        const show = !q || text.includes(q);
        li.style.display = show ? '' : 'none';
      });

      years.forEach(sec => {
        const anyVisible = Array.from(sec.querySelectorAll('.pub-item')).some(li => li.style.display !== 'none');
        sec.style.display = anyVisible ? '' : 'none';
      });

      renumber();
    }

    input.addEventListener('input', applyFilter);
    renumber();
