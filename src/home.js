export default function initDrawer() {
    var drawer = document.getElementById('drawer');
    var handle = document.getElementById('handle');
    var bio   = document.getElementById('bioText');
    if (!drawer || !handle) return;
    
    var PEEK = 140;
    var isExpanded = false;
    var isDragging = false;
    var moved = false;
    var startY = 0;
    var startTranslateY = 0;
    var currentTranslateY = 0;
    
    /* collapsed = push drawer down so only PEEK px remain visible */
    function getCollapsedY() {
        return drawer.offsetHeight - PEEK;
    }
    
    /* apply transform immediately (no transition) */
    function setTransform(y) {
        currentTranslateY = y;
        drawer.style.transform = 'translateY(' + y + 'px)';
    }
    
    /* expand: translateY(0) → drawer sits at bottom, full height visible */
    function expand() {
        isExpanded = true;
        drawer.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
        setTransform(0);
        if (bio) {
            bio.style.transition = 'opacity 0.4s ease 0.15s';
            bio.style.opacity = '1';
        }
    }
    
    /* collapse: translateY(height - peek) → only peek shows */
    function collapse() {
        isExpanded = false;
        drawer.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
        setTransform(getCollapsedY());
        if (bio) {
            bio.style.transition = 'opacity 0.2s ease';
            bio.style.opacity = '0.3';
        }
    }
    
    /* ---- Toggle on click ---- */
    function onHandleClick() {
        if (!moved) {
            isExpanded ? collapse() : expand();
        }
        moved = false;
    }

    handle.addEventListener('click', onHandleClick);
    
    /* ---- Touch drag ---- */
    function onTouchStart(e) {
        isDragging = true;
        moved = false;
        startY = e.touches[0].clientY;
        startTranslateY = currentTranslateY;
        drawer.style.transition = 'none';
    }

    handle.addEventListener('touchstart', onTouchStart, { passive: true });
    
    function onTouchMove(e) {
        if (!isDragging) return;
        moved = true;
        var dy = e.touches[0].clientY - startY;
        var newY = startTranslateY + dy;
        /* clamp between 0 (expanded) and collapsedY (collapsed) */
        if (newY < 0) newY = 0;
        var collapsedY = getCollapsedY();
        if (newY > collapsedY) newY = collapsedY;
        setTransform(newY);
    }

    document.addEventListener('touchmove', onTouchMove, { passive: true });
    
    function onTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        /* snap past midpoint */
        var threshold = getCollapsedY() / 2;
        if (currentTranslateY < threshold) {
            expand();
        } else {
            collapse();
        }
    }

    document.addEventListener('touchend', onTouchEnd);
    
    /* ---- Tap drawer peek area to expand ---- */
    function onDrawerClick(e) {
        if (e.target === handle || handle.contains(e.target)) return;
        if (e.target.closest('a') || e.target.closest('nav')) return;
        if (!isExpanded) expand();
    }

    drawer.addEventListener('click', onDrawerClick);

    collapse();

    return () => {
        handle.removeEventListener('click', onHandleClick);
        handle.removeEventListener('touchstart', onTouchStart);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        drawer.removeEventListener('click', onDrawerClick);
    };
}