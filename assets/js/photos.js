/* Page behavior extracted from Photos.html. */
// ==========================================
    // 1. 沉浸式灯箱 (Lightbox) 交互逻辑
    // ==========================================
    const cards = Array.from(document.querySelectorAll('.photos-page .photo'));
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');

    // 点击卡片，把原图 src 塞入灯箱并显示
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        if(img) {
          lbImg.src = img.src;
          lightbox.classList.add('is-active');
        }
      });
    });

    // 点击背景或关闭按钮，隐藏灯箱
    lightbox.addEventListener('click', (e) => {
      if (e.target !== lbImg) {
        lightbox.classList.remove('is-active');
        // 动画结束后清空图片，防止下次闪烁
        setTimeout(() => lbImg.src = '', 300);
      }
    });

    // ==========================================
    // 2. 丝滑过滤动画逻辑 (Filter with Transition)
    // ==========================================
    const filterLinks = Array.from(document.querySelectorAll('[data-filter-link]'));
    const countEl = document.getElementById('photoCount');

    function setActive(filter){
      filterLinks.forEach(a => {
        // 给当前选中的标签加上高亮类名
        a.classList.toggle('is-active', a.dataset.filterLink === filter);
      });
    }

    function applyFilter(filter){
      setActive(filter);
      let shown = 0;
      
      // 第一步：将不需要显示的图片加上 is-hiding (透明度变0，缩小)
      cards.forEach(card => {
        const cat = card.getAttribute('data-cat') || '';
        const ok = (filter === 'all') || (cat === filter);
        if (!ok) {
          card.classList.add('is-hiding');
        }
      });

      // 第二步：等待 300ms（CSS 淡出时间），进行重排并淡入需要的图片
      setTimeout(() => {
        cards.forEach(card => {
          const cat = card.getAttribute('data-cat') || '';
          const ok = (filter === 'all') || (cat === filter);
          
          if (ok) {
            // 移除 display:none，让它回到网格布局
            card.classList.remove('is-hidden');
            // 强制浏览器重绘，保证动画生效
            void card.offsetWidth;
            // 移除透明度限制，开始淡入和放大
            card.classList.remove('is-hiding');
            shown++;
          } else {
            // 彻底隐藏不需要的卡片，释放位置
            card.classList.add('is-hidden');
          }
        });
        // 更新计数器
        countEl.textContent = shown.toString();
      }, 300); // 这个时间必须和 CSS 中 opacity/transform 的过渡时间一致
    }

    // 绑定点击事件
    filterLinks.forEach(a => a.addEventListener('click', (e) => {
      e.preventDefault();
      applyFilter(a.getAttribute('data-filter-link'));
    }));

    // 初始化显示所有
    applyFilter('all');
