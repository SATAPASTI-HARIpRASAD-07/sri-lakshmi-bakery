/**
 * SRI LAKSHMI BAKERY - Image Performance & Fallback Loader Module (js/image-loader.js)
 * Converts image URLs to WebP, generates responsive sizes/srcset, and handles fallbacks.
 */

window.SLBImageLoader = (function () {
    /**
     * Convert URL to WebP and apply target width & quality
     */
    function getOptimizedImageUrl(url, targetWidth = 400, quality = 80) {
        if (!url) return getFallbackPlaceholder('Bakery Product');

        // Unsplash optimization
        if (url.includes('images.unsplash.com')) {
            try {
                const parsed = new URL(url);
                parsed.searchParams.set('auto', 'format');
                parsed.searchParams.set('fit', 'crop');
                parsed.searchParams.set('format', 'webp');
                parsed.searchParams.set('w', targetWidth.toString());
                parsed.searchParams.set('q', quality.toString());
                return parsed.toString();
            } catch (e) {
                return url;
            }
        }

        return url;
    }

    /**
     * Generate Responsive srcset for Unsplash images
     */
    function getResponsiveSrcSet(url) {
        if (!url || !url.includes('images.unsplash.com')) return '';

        const w320 = getOptimizedImageUrl(url, 320, 75);
        const w480 = getOptimizedImageUrl(url, 480, 80);
        const w800 = getOptimizedImageUrl(url, 800, 85);

        return `${w320} 320w, ${w480} 480w, ${w800} 800w`;
    }

    /**
     * SVG Data URI Fallback Placeholder
     */
    function getFallbackPlaceholder(title = 'Sri Lakshmi Bakery') {
        const cleanTitle = String(title).replace(/"/g, "'");
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
            <rect width="400" height="400" fill="#FFF9F2"/>
            <rect x="10" y="10" width="380" height="380" rx="20" fill="#FFFFFF" stroke="#A94F20" stroke-width="2" stroke-dasharray="8 8" opacity="0.3"/>
            <circle cx="200" cy="170" r="45" fill="#5A2D1A" opacity="0.1"/>
            <path d="M175 185 Q200 145 225 185 Z" fill="#D9823B"/>
            <text x="200" y="240" font-family="'Playfair Display', serif" font-size="18" font-weight="bold" fill="#5A2D1A" text-anchor="middle">${cleanTitle}</text>
            <text x="200" y="265" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#A94F20" text-anchor="middle">SRI LAKSHMI BAKERY</text>
        </svg>`;

        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    }

    /**
     * Handle Image Load Failure Gracefully
     */
    function handleImageError(imgEl, title) {
        if (!imgEl) return;
        imgEl.onerror = null;
        imgEl.src = getFallbackPlaceholder(title || 'Bakery Item');
    }

    return {
        getOptimizedImageUrl,
        getResponsiveSrcSet,
        getFallbackPlaceholder,
        handleImageError
    };
})();
