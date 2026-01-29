// 🦞 Lobster trail effect - Alex's idea!
function spawnLobster(x, y) {
    if (Math.random() > 0.85) { // Not every move, ~15% chance
        const lobster = document.createElement('div');
        lobster.textContent = '🦞';
        lobster.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            font-size: 20px;
            z-index: 9999;
            animation: lobsterFade 1s ease-out forwards;
        `;
        document.body.appendChild(lobster);
        setTimeout(() => lobster.remove(), 1000);
    }
}

// Mouse (Desktop)
document.addEventListener('mousemove', (e) => {
    spawnLobster(e.clientX, e.clientY);
});

// Touch (Mobile)
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    spawnLobster(touch.clientX, touch.clientY);
});

// Add the animation
const style = document.createElement('style');
style.textContent = `
    @keyframes lobsterFade {
        0% { opacity: 1; transform: scale(1) rotate(0deg); }
        100% { opacity: 0; transform: scale(0.5) rotate(20deg) translateY(-20px); }
    }
`;
document.head.appendChild(style);
