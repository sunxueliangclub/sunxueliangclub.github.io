/* Page behavior extracted from Home.html. */
// --- 智能轮播图 (带平滑过渡与手动按钮) ---
    const slides = document.querySelectorAll('.hero .TopPhoto');
    const btnPrev = document.querySelector('.slider-btn--left');
    const btnNext = document.querySelector('.slider-btn--right');
    
    let currentSlide = 0; 
    let slideTimer;

    // 切换到指定索引的图片
    function showSlide(index) {
      // 移除所有图片的激活状态
      slides.forEach(slide => slide.classList.remove('is-active'));
      // 给目标图片加上激活状态（CSS会自动触发0.8秒淡入淡出）
      slides[index].classList.add('is-active');
    }

    // 下一张
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    // 上一张
    function prevSlide() {
      // 加 slides.length 是为了防止负数
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    // 启动自动播放
    function startAutoPlay() {
      slideTimer = setInterval(nextSlide, 4000); // 4秒自动切一张
    }

    // 重置自动播放（防止手动点击后马上又自动翻页）
    function resetAutoPlay() {
      clearInterval(slideTimer);
      startAutoPlay();
    }

    // 初始化运行
    if (slides.length > 0) {
      startAutoPlay();
      
      // 绑定左右按钮点击事件
      if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
        btnNext.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
      }
    }
