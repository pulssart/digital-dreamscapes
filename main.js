/* ═══════════════════════════════════════════════════════════
   WALL — Main JavaScript
   ═══════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════
// IMAGE PROTECTION - Disable right-click on images
// ═══════════════════════════════════════════════════════════

// Prevent right-click context menu on all images
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || 
        e.target.closest('.gallery-item') || 
        e.target.closest('.lightbox') ||
        e.target.closest('.hero') ||
        e.target.closest('.detail-card') ||
        e.target.closest('.zoom-modal') ||
        window.getComputedStyle(e.target).backgroundImage !== 'none') {
        e.preventDefault();
        return false;
    }
});

// Block DevTools shortcuts
document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+C (Inspect element)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
    }
    // Ctrl+U (View source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
    }
    // Cmd+Option+I (Mac DevTools)
    if (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        return false;
    }
    // Cmd+Option+J (Mac Console)
    if (e.metaKey && e.altKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return false;
    }
    // Cmd+Option+U (Mac View source)
    if (e.metaKey && e.altKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
    }
    // Ctrl+S / Cmd+S (Save page)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return false;
    }
});

// Disable text selection on entire page (optional - more aggressive)
document.addEventListener('selectstart', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        // Allow selection only in inputs
        if (e.target.closest('.gallery-item') || 
            e.target.closest('.lightbox') ||
            e.target.closest('.hero') ||
            e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    }
});

// Prevent drag on images
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// Disable image selection
document.addEventListener('selectstart', (e) => {
    if (e.target.tagName === 'IMG' || 
        e.target.closest('.gallery-item') ||
        e.target.closest('.lightbox')) {
        e.preventDefault();
        return false;
    }
});

// Wallpaper collection
const wallpapers = [
    "Amber-Dreams.png",
    "Beneath-Crystal-Waters.jpeg",
    "Between-Shadow-and-Light.jpeg",
    "Beyond-the-Emerald-Veil.jpeg",
    "Born-From-Imagination.jpeg",
    "Council-of-the-Wild.png",
    "Dancing-Among-Clouds.jpeg",
    "Daughter-of-the-Rising-Sun.png",
    "Dreams-of-Electric-Souls.jpeg",
    "Echoes-of-Valor.jpeg",
    "Eyes-That-Hold-Wilderness.jpeg",
    "First-Light-Through-Mist.jpeg",
    "Friends-of-the-Forest.jpeg",
    "Gathering-of-Gentle-Souls.png",
    "Gentle-Earth-Whispers.jpeg",
    "Honor-in-Silence.jpeg",
    "Innocence-Guarded.png",
    "Innocence-Meets-Courage.jpeg",
    "Keeper-of-Autumn-Secrets.jpeg",
    "Longing-for-Stars.jpeg",
    "Lost-in-Wonder.jpeg",
    "Master-of-a-Thousand-Colors.jpeg",
    "Melodies-in-Shadows.jpeg",
    "Moonlight-and-Midnight.png",
    "Path-Reclaimed-by-Nature.jpeg",
    "Pearl-of-Another-World.png",
    "Petals-Like-Pink-Snow.jpeg",
    "Seasons-Last-Breath.png",
    "Silence-Between-Stars.jpeg",
    "Song-Before-Dawn.jpeg",
    "Soul-of-Loyalty.jpeg",
    "Stillness-at-Golden-Hour.png",
    "Symphony-of-the-Wild.jpeg",
    "Tears-of-the-Sky.jpeg",
    "Tiny-Heart-Big-Love.jpeg",
    "Unlikely-Kindred-Spirits.jpeg",
    "Waves-of-Amber-Light.png",
    "When-Gold-Falls-Softly.jpeg",
    "When-Stars-Remember.jpeg",
    "Where-Blossoms-Float.jpeg",
    "Where-Green-Breathes.jpeg",
    "Where-Horizons-Dream.jpeg",
    "Where-Leaves-Whisper.jpeg",
    "Where-Wild-Hearts-Gather.jpeg",
    "Woven-in-Silence.png"
];

// Helper function to get a clean title from filename
function getTitle(filename) {
    return filename
        .replace(/\.(jpeg|jpg|png|gif)$/i, '')
        .replace(/-/g, ' ')
        .trim();
}

// State
let currentIndex = 0;

// DOM Elements
const loader = document.querySelector('.loader');
const galleryGrid = document.getElementById('gallery-grid');
const heroPreview = document.getElementById('hero-preview');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxClose = document.querySelector('.lightbox-close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const buyBtn = document.getElementById('buy-btn');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// ═══════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// Add hover effect to interactive elements
const hoverElements = document.querySelectorAll('a, button, .gallery-item');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ═══════════════════════════════════════════════════════════
// LOADER
// ═══════════════════════════════════════════════════════════

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        // Start audio after loader with fade in
        initAudioPlayer();
    }, 2000);
});

// ═══════════════════════════════════════════════════════════
// AUDIO PLAYER
// ═══════════════════════════════════════════════════════════

const bgAudio = document.getElementById('bg-audio');
const audioPlayer = document.getElementById('audio-player');
const audioBtn = document.getElementById('audio-btn');
let isPlaying = false;

function initAudioPlayer() {
    // Show player with animation
    setTimeout(() => {
        audioPlayer.classList.add('visible');
    }, 500);
    
    // Try to autoplay with fade in
    setTimeout(() => {
        playAudioWithFade();
    }, 1000);
}

function playAudioWithFade() {
    bgAudio.volume = 0;
    
    // Try to play (may be blocked by browser autoplay policy)
    const playPromise = bgAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Autoplay started successfully
            isPlaying = true;
            audioPlayer.classList.add('playing');
            fadeAudioIn();
        }).catch((error) => {
            // Autoplay was prevented - wait for user interaction
            console.log('Autoplay blocked, waiting for user interaction');
            isPlaying = false;
            audioPlayer.classList.remove('playing');
        });
    }
}

function fadeAudioIn() {
    let volume = 0;
    const fadeInterval = setInterval(() => {
        volume += 0.02;
        if (volume >= 0.3) { // Max volume 30% for ambient music
            volume = 0.3;
            clearInterval(fadeInterval);
        }
        bgAudio.volume = volume;
    }, 50);
}

function fadeAudioOut(callback) {
    let volume = bgAudio.volume;
    const fadeInterval = setInterval(() => {
        volume -= 0.02;
        if (volume <= 0) {
            volume = 0;
            bgAudio.pause();
            clearInterval(fadeInterval);
            if (callback) callback();
        }
        bgAudio.volume = volume;
    }, 30);
}

function toggleAudio() {
    if (isPlaying) {
        fadeAudioOut(() => {
            isPlaying = false;
            audioPlayer.classList.remove('playing');
        });
    } else {
        bgAudio.volume = 0;
        bgAudio.play().then(() => {
            isPlaying = true;
            audioPlayer.classList.add('playing');
            fadeAudioIn();
        }).catch(err => {
            console.log('Playback failed:', err);
        });
    }
}

audioBtn.addEventListener('click', toggleAudio);

// ═══════════════════════════════════════════════════════════
// GALLERY GRID
// ═══════════════════════════════════════════════════════════

function renderGallery() {
    galleryGrid.innerHTML = wallpapers.map((filename, index) => `
        <div class="gallery-item" data-index="${index}" style="animation-delay: ${0.1 + (index % 9) * 0.05}s">
            <img src="wall/${encodeURIComponent(filename)}" alt="${getTitle(filename)}" loading="lazy">
            <div class="gallery-item-overlay">
                <div class="gallery-item-title">${getTitle(filename)}</div>
                <div class="gallery-item-price">$2.00</div>
            </div>
            <div class="gallery-item-index">${String(index + 1).padStart(2, '0')}</div>
        </div>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            openLightbox(parseInt(item.dataset.index));
        });
        
        // Add cursor hover effect
        item.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        item.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
    
    // Update count
    document.getElementById('count').textContent = wallpapers.length;
}

// ═══════════════════════════════════════════════════════════
// HERO PREVIEW
// ═══════════════════════════════════════════════════════════

function updateHeroPreview() {
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    heroPreview.style.backgroundImage = `url('wall/${encodeURIComponent(wallpapers[randomIndex])}')`;
    heroPreview.style.opacity = '0.15';
}

// Set random hero background
function setRandomHeroBackground() {
    const hero = document.querySelector('.hero');
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    hero.style.backgroundImage = `url('wall/${encodeURIComponent(wallpapers[randomIndex])}')`;
}

// Change preview on scroll
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (Math.abs(scrollY - lastScrollY) > 300) {
        updateHeroPreview();
        lastScrollY = scrollY;
    }
});

// ═══════════════════════════════════════════════════════════
// LIGHTBOX
// ═══════════════════════════════════════════════════════════

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightbox() {
    const filename = wallpapers[currentIndex];
    lightboxImage.src = `wall/${encodeURIComponent(filename)}`;
    lightboxImage.alt = getTitle(filename);
    lightboxTitle.textContent = getTitle(filename);
}

function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + wallpapers.length) % wallpapers.length;
    updateLightbox();
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => navigateLightbox(-1));
nextBtn.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ═══════════════════════════════════════════════════════════
// STRIPE INTEGRATION
// ═══════════════════════════════════════════════════════════

// IMPORTANT: Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_test_VOTRE_CLE_PUBLIQUE_STRIPE';

buyBtn.addEventListener('click', async () => {
    const filename = wallpapers[currentIndex];
    const title = getTitle(filename);
    
    // Check if Stripe is configured
    if (STRIPE_PUBLISHABLE_KEY === 'pk_test_VOTRE_CLE_PUBLIQUE_STRIPE') {
        // Demo mode - show alert
        alert(`🎨 Purchase: "${title}"\n\n💰 Price: $2.00\n\nTo enable real payments:\n1. Create a Stripe account\n2. Replace STRIPE_PUBLISHABLE_KEY in main.js\n3. Set up the payment backend`);
        return;
    }
    
    // Production mode - redirect to Stripe Checkout
    try {
        const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
        
        // In production, you'd call your backend to create a checkout session
        // For now, we'll use Stripe Payment Links or a simple checkout
        
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                wallpaper: filename,
                title: title,
                price: 200 // in cents
            }),
        });
        
        const session = await response.json();
        
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
        
        if (result.error) {
            alert(result.error.message);
        }
    } catch (error) {
        console.error('Payment error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Pack purchase button
const buyPackBtn = document.getElementById('buy-pack-btn');

buyPackBtn.addEventListener('click', async () => {
    // Check if Stripe is configured
    if (STRIPE_PUBLISHABLE_KEY === 'pk_test_VOTRE_CLE_PUBLIQUE_STRIPE') {
        // Demo mode - show alert
        alert(`🎨 COMPLETE BUNDLE — 45 Wallpapers\n\n💰 Price: $50.00 (instead of $90)\n📦 Savings: $40 (-44%)\n\n✅ 45 high-resolution wallpapers\n✅ Instant download\n✅ Unlimited personal use\n\nTo enable real payments:\n1. Create a Stripe account\n2. Replace STRIPE_PUBLISHABLE_KEY in main.js\n3. Set up the payment backend`);
        return;
    }
    
    // Production mode - redirect to Stripe Checkout
    try {
        const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
        
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: 'pack_complete',
                title: 'Pack Complet — 45 Wallpapers',
                price: 5000 // $50 in cents
            }),
        });
        
        const session = await response.json();
        
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
        
        if (result.error) {
            alert(result.error.message);
        }
    } catch (error) {
        console.error('Payment error:', error);
        alert('An error occurred. Please try again.');
    }
});

// ═══════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ═══════════════════════════════════════════════════════════
// INTERSECTION OBSERVER FOR ANIMATIONS
// ═══════════════════════════════════════════════════════════

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// ═══════════════════════════════════════════════════════════
// DETAIL ZOOM EFFECT & MODAL
// ═══════════════════════════════════════════════════════════

const zoomModal = document.getElementById('zoom-modal');
const zoomContainer = document.getElementById('zoom-container');
const zoomImage = document.getElementById('zoom-image');
const zoomModalClose = document.querySelector('.zoom-modal-close');

function initDetailZoom() {
    const detailZooms = document.querySelectorAll('.detail-zoom');
    
    detailZooms.forEach(zoom => {
        const lens = zoom.querySelector('.zoom-lens');
        
        // Hover effect for preview
        zoom.addEventListener('mousemove', (e) => {
            const rect = zoom.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Move lens
            lens.style.left = x + 'px';
            lens.style.top = y + 'px';
            
            // Calculate background position for zoom effect
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            zoom.style.backgroundPosition = `${percentX}% ${percentY}%`;
        });
        
        zoom.addEventListener('mouseleave', () => {
            zoom.style.backgroundPosition = 'center';
        });
        
        // Click to open zoom modal
        zoom.addEventListener('click', () => {
            const bgImage = zoom.style.backgroundImage;
            const imageUrl = bgImage.replace(/url\(['"]?/, '').replace(/['"]?\)/, '');
            openZoomModal(imageUrl);
        });
    });
}

function openZoomModal(imageUrl) {
    zoomImage.src = imageUrl;
    zoomModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Center the image initially
    zoomImage.style.left = '-100%';
    zoomImage.style.top = '-100%';
}

function closeZoomModal() {
    zoomModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Zoom modal mouse tracking
zoomContainer.addEventListener('mousemove', (e) => {
    const rect = zoomContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate position (image is 300% size, so we need to offset accordingly)
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    
    // Move image (opposite direction of mouse)
    const offsetX = -percentX * (zoomImage.offsetWidth - rect.width);
    const offsetY = -percentY * (zoomImage.offsetHeight - rect.height);
    
    zoomImage.style.left = offsetX + 'px';
    zoomImage.style.top = offsetY + 'px';
});

// Close zoom modal
zoomModalClose.addEventListener('click', closeZoomModal);

zoomModal.addEventListener('click', (e) => {
    if (e.target === zoomModal) closeZoomModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zoomModal.classList.contains('active')) {
        closeZoomModal();
    }
});

// ═══════════════════════════════════════════════════════════
// INITIALIZE
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    setRandomHeroBackground();
    renderGallery();
    updateHeroPreview();
    initDetailZoom();
    
    // Observe gallery items for animation
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
});

