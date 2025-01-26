// Create a canvas for confetti
function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = "confettiCanvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);
    return canvas;
}

// Trigger confetti
function triggerConfetti() {
    const canvas = createCanvas();
    const ctx = canvas.getContext("2d");
    let raf;
    const flag = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let w = canvas.width;
    let h = canvas.height;

    const cannonX = w / 2;
    const cannonY = h * 0.1;
    const cannonSpread = 75;

    let size = 10;
    let colours = ["Tomato", "Orange", "MediumSeaGreen", "Violet", "DodgerBlue", "gold", "MediumPurple"];
    let gravity = 0.18;
    let drag = 0.97;

    const particles = [];
    let numOfParticles = 120;

    for (let i = 0; i < numOfParticles; i++) {
        let angle = Math.random() * 2 * Math.PI
        let speed = getRandomInt(3, 15);

        particles.push({

            x: cannonX + Math.random(),
            y: cannonY + Math.random(),
            vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2 * (getRandomInt(0, 1) > 1 ? 1 : -1),
            vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 2,
            angle: getRandomInt(0, 360) * Math.PI / 180,
            rotationSpeed: getRandomInt(-4, 7) * Math.PI / 180,
            sizex: size,
            sizey: size + getRandomInt(4, 10),
            colour: colours[getRandomInt(0, colours.length)],
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = this.colour;
                ctx.rotate(this.angle);

                ctx.fillRect(0, 0, this.sizex, this.sizey);
                ctx.restore();
            },
        });

    }


    function animate() {
        ctx.clearRect(0, 0, w, h);

        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];

            particle.vy += gravity;
            particle.vy *= drag;
            particle.vx *= drag;

            particle.x += particle.vx;
            particle.y += particle.vy;

            particle.angle += particle.rotationSpeed;

            if (particle.y > h || particle.x < 0 || particle.x > w) {
                particles.splice(i, 1); // Safely remove the particle
            } else {
                particle.draw();
            }
        }


        if (particles.length > 0) {
            raf = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(raf);
            canvas.remove();

        }
    }

    animate();


}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)); // The maximum is exclusive and the minimum is inclusive
}


chrome.storage.local.get("showConfetti", (data) => {
    
    if (data.showConfetti) {
        chrome.storage.local.set({ showConfetti: false });
        triggerConfetti();
    }

});

document.addEventListener('click', (e) => {
    if (e.target.id === 'id_submitbutton') {
        chrome.storage.local.set({showConfetti: true});
    }
});
