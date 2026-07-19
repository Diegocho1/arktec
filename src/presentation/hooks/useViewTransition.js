import { useNavigate } from 'react-router-dom';

// Module-level variable — persists across renders
// Saves the scroll position of the home page before navigating away
let savedScrollY = 0;

export function useViewTransition() {
  const navigateFn = useNavigate();

  const navigate = (to, imgElement) => {
    if (!imgElement) {
      navigateFn(to);
      return;
    }

    const rect      = imgElement.getBoundingClientRect();
    const goingBack = to === '/';

    // ─── Cover ───────────────────────────────────────────────
    // Created immediately as the first action so the current page
    // is hidden before any scroll or DOM manipulation happens.
    // Prevents the hero section from flashing during transition.
    const cover = document.createElement('div');
    cover.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9998;
      background: var(--color-bg);
      pointer-events: none;
    `;
    document.body.appendChild(cover);

    if (!goingBack) {
      // Save current scroll position so we can restore it when going back
      savedScrollY = window.scrollY;
      // Jump to top instantly so the project page starts at the top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // ─── Overlay ──────────────────────────────────────────────
    // A clone of the clicked image that animates independently
    // of React's render cycle, giving us full control over the
    // position and size transition.
    const overlay = document.createElement('div');

    if (goingBack) {
      // Going back: starts fullscreen, shrinks to the hero image position
      overlay.style.cssText = `
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        overflow: hidden;
        pointer-events: none;
        transition: top 500ms cubic-bezier(0.76, 0, 0.24, 1),
                    left 500ms cubic-bezier(0.76, 0, 0.24, 1),
                    width 500ms cubic-bezier(0.76, 0, 0.24, 1),
                    height 500ms cubic-bezier(0.76, 0, 0.24, 1),
                    opacity 500ms ease;
      `;
    } else {
      // Going forward: starts at the card's exact position on screen
      overlay.style.cssText = `
        position: fixed;
        top: ${rect.top}px;
        left: ${rect.left}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        z-index: 9999;
        overflow: hidden;
        pointer-events: none;
        transition: top 500ms cubic-bezier(0.76, 0, 0.24, 1),
                    left 500ms cubic-bezier(0.76, 0, 0.24, 1),
                    width 500ms cubic-bezier(0.76, 0, 0.24, 1),
                    height 500ms cubic-bezier(0.76, 0, 0.24, 1);
      `;
    }

    // Clone the image inside the overlay so it looks identical
    // to the original card image during the animation
    const img = document.createElement('img');
    img.src = imgElement.src;
    img.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    // Force reflow — required so the browser registers the initial
    // position before we change it, otherwise the transition won't play
    overlay.getBoundingClientRect();

    // ─── Animate ──────────────────────────────────────────────
    if (goingBack) {
      // Shrink the overlay from fullscreen to the hero image bounds,
      // and fade it out simultaneously
      overlay.style.top     = `${rect.top}px`;
      overlay.style.left    = `${rect.left}px`;
      overlay.style.width   = `${rect.width}px`;
      overlay.style.height  = `${rect.height}px`;
      overlay.style.opacity = '0';

      setTimeout(() => {
        // Navigate after animation completes (500ms)
        navigateFn(to);
        overlay.remove();

        // Restore the saved scroll position so the user lands
        // back where they were in the portfolio, not at the top
        setTimeout(() => {
          window.scrollTo({ top: savedScrollY, behavior: 'instant' });

          // Fade out the cover to reveal the home page
          cover.style.transition = 'opacity 400ms ease';
          cover.style.opacity    = '0';
          setTimeout(() => cover.remove(), 400);
        }, 200);
      }, 520);

    } else {
      // Expand the overlay from card position to fullscreen
      overlay.style.top    = '0px';
      overlay.style.left   = '0px';
      overlay.style.width  = '100vw';
      overlay.style.height = '100vh';

      setTimeout(() => {
        // Navigate after animation completes (500ms)
        navigateFn(to);

        // Short delay to let React render the project page,
        // then fade out overlay and cover together
        setTimeout(() => {
          overlay.style.opacity    = '0';
          overlay.style.transition += ', opacity 600ms ease';
          cover.style.transition   = 'opacity 600ms ease';
          cover.style.opacity      = '0';
          setTimeout(() => {
            overlay.remove();
            cover.remove();
          }, 650);
        }, 200);
      }, 520);
    }
  };

  return navigate;
}