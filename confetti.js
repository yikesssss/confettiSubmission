

// // Create a canvas for confetti
// function createCanvas() {
//     const canvas = document.createElement("canvas");
//     canvas.id = "confettiCanvas";
//     canvas.style.position = "fixed";
//     canvas.style.top = "0";
//     canvas.style.left = "0";
//     canvas.style.width = "100%";
//     canvas.style.height = "100%";
//     canvas.style.zIndex = "9999";
//     // canvas.style.pointerEvents = "none"; // Ignore pointer events
//     document.body.appendChild(canvas);
//     return canvas;
// }

// // Trigger confetti
// function triggerConfetti() {
//     const canvas = createCanvas();
//     const ctx = canvas.getContext("2d");

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const particles = [];
//     const particleCount = 150;
//     const colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#00ffff", "#ffff00"];
//     const lifetime = 5000; // Lifetime in milliseconds

//     // Particle definition
//     function createParticle() {
//         const size = Math.random() * 10 + 5; // Size between 5 and 15
//         const lifetime = Math.random() * 2 + 1; // Lifetime in seconds
//         return {
//             x: Math.random() * canvas.width,
//             y: Math.random() * canvas.height - canvas.height / 2,
//             width: size,
//             height: size * 0.5, // Rectangles are wider than tall
//             speedX: Math.random() * 4 - 2,
//             speedY: Math.random() * 4 + 2,
//             color: colors[Math.floor(Math.random() * colors.length)],
//             opacity: 1, // Initial opacity
//             lifetime: lifetime * 1000, // Lifetime in ms
//             created: performance.now(),
//         };
//     }

//     // Initialize particles
//     for (let i = 0; i < particleCount; i++) {
//         particles.push(createParticle());
//     }

//     // // Animation loop
//     // function animate() {
//     //     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     //     const now = performance.now();

//     //     particles.forEach((particle, index) => {
//     //         const age = now - particle.created;

//     //         // Update particle properties
//     //         particle.x += particle.speedX;
//     //         particle.y += particle.speedY;

//     //         // Calculate opacity based on age
//     //         particle.opacity = 1 - age / particle.lifetime;

//     //         // Draw particle if still alive
//     //         if (particle.opacity > 0) {
//     //             ctx.globalAlpha = particle.opacity;
//     //             ctx.fillStyle = particle.color;
//     //             ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
//     //         } else {
//     //             // Remove particle if it's too old
//     //             particles.splice(index, 1);
//     //         }
//     //     });

//     //     ctx.globalAlpha = 1; // Reset global alpha

//     //     // Continue animation if there are particles left
//     //     if (particles.length > 0) {
//     //         requestAnimationFrame(animate);
//     //     } else {
//     //         canvas.remove(); // Clean up canvas
//     //     }
//     // }

//     function animate() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

//         const now = performance.now();

//         // Gradually reduce the number of particles as time progresses
//         particles.forEach((particle, index) => {
//             const age = now - particle.created;

//             // Update particle position
//             particle.x += particle.speedX;
//             particle.y += particle.speedY;

//             // Calculate opacity based on age
//             particle.opacity = 1 - age / particle.lifetime;

//             // Remove particle if it has faded out or based on a decay probability
//             if (particle.opacity <= 0 || Math.random() < 0.02) {
//                 particles.splice(index, 1);
//             } else {
//                 // Draw particle
//                 ctx.globalAlpha = particle.opacity;
//                 ctx.fillStyle = particle.color;
//                 ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
//             }
//         });

//         ctx.globalAlpha = 1; // Reset global alpha

//         // Continue animation if there are particles left
//         if (particles.length > 0) {
//             requestAnimationFrame(animate);
//         } else {
//             canvas.remove(); // Cleanup canvas when done
//         }
//     }


//     animate();
// }

//make it so that on big screen the explosion is bigger than small screen

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
    // canvas.style.pointerEvents = "none"; // Ignore pointer events
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