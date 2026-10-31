// film-gallery.js
// Lightbox for the Film Photography pages. Each [data-gallery] grid holds
// <figure class="photo-card"> cards whose .photo-link points at the full image.
// Without JS the link simply opens the full image; with JS it opens here.
(function () {
    'use strict';

    const grids = document.querySelectorAll('[data-gallery]');
    if (!grids.length) return;

    // Build the lightbox once
    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Photo viewer');
    dialog.innerHTML =
        '<div class="lightbox-stage">' +
            '<img class="lightbox-image" alt="">' +
            '<div class="lightbox-details">' +
                '<span class="frame-label"></span>' +
                '<h2 class="photo-title"></h2>' +
                '<p class="photo-caption"></p>' +
                '<p class="photo-note"></p>' +
            '</div>' +
        '</div>' +
        '<button type="button" class="lightbox-button lightbox-close" aria-label="Close">&times;</button>' +
        '<button type="button" class="lightbox-button lightbox-prev" aria-label="Previous photo">&larr;</button>' +
        '<button type="button" class="lightbox-button lightbox-next" aria-label="Next photo">&rarr;</button>';
    document.body.appendChild(dialog);

    const stage = dialog.querySelector('.lightbox-stage');
    const image = dialog.querySelector('.lightbox-image');
    const fields = {
        label: dialog.querySelector('.lightbox-details .frame-label'),
        title: dialog.querySelector('.lightbox-details .photo-title'),
        caption: dialog.querySelector('.lightbox-details .photo-caption'),
        note: dialog.querySelector('.lightbox-details .photo-note')
    };
    const closeButton = dialog.querySelector('.lightbox-close');
    const prevButton = dialog.querySelector('.lightbox-prev');
    const nextButton = dialog.querySelector('.lightbox-next');

    let cards = [];      // cards in the grid that was opened
    let index = 0;
    let opener = null;   // card link to return focus to on close
    let loader = null;   // Image preloading the current full-size photo

    function text(card, selector) {
        const el = card.querySelector(selector);
        return el ? el.textContent.trim() : '';
    }

    function show(i) {
        index = (i + cards.length) % cards.length;
        const card = cards[index];
        const link = card.querySelector('.photo-link');
        const thumb = link.querySelector('img');

        opener = link;   // close returns focus to the card being shown

        // Show the (cached) thumbnail at once, and request the full image only
        // now that it's needed, swapping it in when it arrives
        image.alt = thumb ? thumb.alt : '';
        if (thumb) image.src = thumb.currentSrc || thumb.src;
        dialog.classList.add('is-loading');
        const full = new Image();
        loader = full;
        full.onload = full.onerror = function () {
            if (loader !== full) return;   // user already moved on
            if (full.naturalWidth) image.src = full.src;
            dialog.classList.remove('is-loading');
        };
        full.src = link.getAttribute('href');

        fields.label.textContent = text(card, '.frame-label');
        fields.title.textContent = text(card, '.photo-title');
        fields.caption.textContent = text(card, '.photo-caption');
        fields.note.textContent = text(card, '.photo-note');
    }

    function open(card) {
        cards = Array.from(card.closest('[data-gallery]').querySelectorAll('.photo-card'));
        const single = cards.length < 2;
        prevButton.hidden = single;
        nextButton.hidden = single;
        show(cards.indexOf(card));
        document.documentElement.classList.add('lightbox-open');
        dialog.showModal();
        closeButton.focus();
    }

    function close() {
        if (dialog.open) dialog.close();
    }

    // Fires for the close button, Esc and clicks outside the photo alike
    dialog.addEventListener('close', function () {
        document.documentElement.classList.remove('lightbox-open');
        loader = null;
        image.removeAttribute('src');
        if (opener) opener.focus();
    });

    closeButton.addEventListener('click', close);
    prevButton.addEventListener('click', function () { show(index - 1); });
    nextButton.addEventListener('click', function () { show(index + 1); });

    // Click on the dark surround (not the photo, caption or buttons) closes
    dialog.addEventListener('click', function (e) {
        if (e.target === dialog || e.target === stage) close();
    });

    dialog.addEventListener('keydown', function (e) {
        if (cards.length < 2) return;
        if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    });

    // Swipe left/right on touch screens
    let touchX = null;
    dialog.addEventListener('touchstart', function (e) {
        touchX = e.touches.length === 1 ? e.touches[0].clientX : null;
    }, { passive: true });
    dialog.addEventListener('touchend', function (e) {
        if (touchX === null || cards.length < 2) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) show(dx < 0 ? index + 1 : index - 1);
        touchX = null;
    });

    // Open from a click anywhere on a card (Enter on the focused link is a click too),
    // but let other links in the card, like the roll label, work normally
    grids.forEach(function (grid) {
        grid.addEventListener('click', function (e) {
            const card = e.target.closest('.photo-card');
            if (!card) return;
            const link = e.target.closest('a');
            if (link && !link.classList.contains('photo-link')) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            open(card);
        });
    });
})();
