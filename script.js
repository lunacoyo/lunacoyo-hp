document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ハンバーガーメニュー ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
    });

    // リンククリック時にメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        });
    });

    // --- 2. ギャラリーフィルター ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // ボタンのアクティブ切り替え
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    item.style.opacity = '0';
                    setTimeout(() => item.style.opacity = '1', 50); // フェードアニメ
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

 const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.close-modal');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return; // 画像がない枠は何もしない（movie枠の404も止まる）

    const src = img.getAttribute('src');
    const caption = (item.querySelector('.caption')?.textContent || '').trim();

    modalImg.src = src;
    modalImg.alt = caption || '作品画像';
    modalCaption.textContent = caption;

    modal.classList.add('is-open');     // ← CSSと合わせる
    modal.setAttribute('aria-hidden', 'false');
    closeBtn?.focus();
  });
});

        
        // Enterキーでも開けるように（アクセシビリティ）
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') item.click();
        });
    });

    // 閉じる処理
    const closeModalFunc = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    };

    closeModal.addEventListener('click', closeModalFunc);
    
    // 背景クリックで閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunc();
    });

    // Escapeキーで閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });

    // --- 4. スムーススクロール調整（ヘッダーの高さ分ずらす） ---
    // CSSの scroll-behavior: smooth で基本対応していますが、
    // 固定ヘッダー被り防止のためJSで微調整が必要な場合に使用
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            const headerOffset = 70; // ヘッダーの高さ + 余白
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

});
// ===== Gallery Modal: show real images =====
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const closeBtn = document.querySelector(".close-modal");

  if (!modal || !modalImg || !modalCaption) return;

  const openModal = (src, caption) => {
    modalImg.src = src;
    modalImg.alt = caption || "作品画像";
    modalCaption.textContent = caption || "";
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  };

  // クリック/Enterで開く
  document.querySelectorAll(".gallery-item").forEach((item) => {
    const open = () => {
      // gallery-item内のimgを優先
      const img = item.querySelector("img");
      const src = img?.getAttribute("src") || item.getAttribute("data-img");
      const caption = item.querySelector(".caption")?.textContent?.trim() || "";

      if (!src) return; // 画像がない枠は何もしない
      openModal(src, caption);
    };

    item.addEventListener("click", open);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter") open();
    });
  });

  // 閉じるボタン
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // 背景クリックで閉じる（modal-content以外）
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Escで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
});


