document.addEventListener("DOMContentLoaded", function() {
    // Automatically update the year in the footer
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Live Background Animation (Water Bubbles/Particles)
    const canvas = document.getElementById('live-background');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 500;
            this.size = Math.random() * 15 + 8; // Slightly larger for better visibility
            this.speedY = Math.random() * 1 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.4 + 0.3; // Higher base opacity (0.3 to 0.7)
        }
        
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            
            // Reset particle if it goes off screen
            if (this.y < -this.size) {
                this.y = height + this.size;
                this.x = Math.random() * width;
            }
        }
        
        draw() {
            // Main bubble body
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 122, 255, ${this.opacity * 0.15})`; // Slight blue tint
            ctx.fill();
            
            // Distinct blue border
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = `rgba(0, 122, 255, ${this.opacity * 0.6})`; 
            ctx.stroke();
            ctx.closePath();
            
            // Bright highlight for bubble effect
            ctx.beginPath();
            ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.2})`;
            ctx.fill();
            ctx.closePath();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.min(window.innerWidth / 15, 60); // Responsive particle count
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        // Clear canvas with transparency for crisp rendering
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
});