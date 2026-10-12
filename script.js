/* ===== CUSTOM CURSOR ENGINE ===== */
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');
const isTouchDevice = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (cursorDot && cursorOutline && !isTouchDevice()) {
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .glass-card, .social-pill, .nav-link, .magnetic-btn, .mission-stage-card, .top-link-node').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ===== MAGNETIC BUTTON INTERACTION ===== */
if (!isTouchDevice()) {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'none';
    });
  });
}

/* ===== TYPEWRITER ENGINE ===== */
const roles = [
  'Enterprise Software Systems',
  'Rigorous Quality Assurance',
  'Scalable Cloud Architecture',
  'High-Performance Web Platforms',
  'Mission-Critical Digital Products'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('roleDynamic');

function typeWriter() {
  if (!roleEl) return;
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    roleEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    roleEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 35 : 75;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 450;
  }

  setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, 1200);

/* ===== INTERACTIVE TECHNICAL NETWORK CANVAS (LIGHT THEME) ===== */
const canvas = document.getElementById('heroNetworkCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let nodes = [];
  let packets = [];
  let mouse = { x: -1000, y: -1000, radius: 170 };
  const labels = ['CODE', 'DATA', 'SYSTEMS', 'QUALITY', 'ENGINEERING'];

  function resizeCanvas() {
    const parent = canvas.parentElement;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = parent ? parent.offsetWidth : window.innerWidth;
    height = parent ? parent.offsetHeight : window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.resetTransform();
    ctx.scale(dpr, dpr);

    initNodes();
  }

  function initNodes() {
    nodes = [];
    packets = [];
    const isMobile = window.innerWidth <= 768;
    const nodeCount = isMobile ? 18 : 36;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.5,
        label: labels[i % labels.length],
        showLabel: i % 4 === 0,
        pulse: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? 'rgba(124, 58, 237, ' : 'rgba(2, 132, 199, '
      });
    }
  }

  window.addEventListener('resize', resizeCanvas);
  
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  setInterval(() => {
    if (nodes.length < 2) return;
    const n1 = nodes[Math.floor(Math.random() * nodes.length)];
    let closest = null;
    let minDist = 140;

    nodes.forEach(n2 => {
      if (n1 !== n2) {
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.hypot(dx, dy);
        if (dist < minDist) {
          minDist = dist;
          closest = n2;
        }
      }
    });

    if (closest) {
      packets.push({
        from: n1,
        to: closest,
        progress: 0,
        speed: 0.02 + Math.random() * 0.02,
        color: n1.color
      });
    }
  }, 1000);

  function drawNetwork() {
    ctx.clearRect(0, 0, width, height);

    nodes.forEach((node, i) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      const dxMouse = mouse.x - node.x;
      const dyMouse = mouse.y - node.y;
      const distMouse = Math.hypot(dxMouse, dyMouse);

      if (distMouse < mouse.radius) {
        const force = (mouse.radius - distMouse) / mouse.radius;
        node.x -= (dxMouse / distMouse) * force * 1.5;
        node.y -= (dyMouse / distMouse) * force * 1.5;
      }

      node.pulse += 0.03;
      const alpha = 0.5 + Math.sin(node.pulse) * 0.25;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${node.color}${alpha})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `${node.color}${alpha * 0.2})`;
      ctx.fill();

      if (node.showLabel && window.innerWidth > 768) {
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = `${node.color}0.7)`;
        ctx.fillText(node.label, node.x + 8, node.y + 3);
      }

      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.hypot(dx, dy);
        const maxDist = 135;

        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * 0.28;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (distMouse < mouse.radius) {
        const mouseAlpha = (1 - distMouse / mouse.radius) * 0.5;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(2, 132, 199, ${mouseAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    });

    for (let p = packets.length - 1; p >= 0; p--) {
      const pkt = packets[p];
      pkt.progress += pkt.speed;

      if (pkt.progress >= 1) {
        packets.splice(p, 1);
        continue;
      }

      const px = pkt.from.x + (pkt.to.x - pkt.from.x) * pkt.progress;
      const py = pkt.from.y + (pkt.to.y - pkt.from.y) * pkt.progress;

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `${pkt.color}0.95)`;
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(drawNetwork);
  }

  resizeCanvas();
  drawNetwork();
}

/* ===== NAVIGATION SCROLL ENGINE & ACTIVE STATES ===== */
const nav = document.getElementById('nav');
const navLinksAnchors = document.querySelectorAll('.nav-link, .nav-btn');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  if (!nav) return;
  
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop;
    if (window.pageYOffset >= sectionTop - 220) {
      current = sec.getAttribute('id');
    }
  });

  navLinksAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ===== MOBILE MENU TOGGLE & ACCESSIBILITY ===== */
const menuToggle = document.getElementById('menuToggle');
const navLinksUl = document.getElementById('navLinks');

if (menuToggle && navLinksUl) {
  const toggleMenu = (openState) => {
    const isActive = openState !== undefined ? openState : !navLinksUl.classList.contains('active');
    navLinksUl.classList.toggle('active', isActive);
    menuToggle.classList.toggle('open', isActive);
    menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    document.body.classList.toggle('no-scroll', isActive);
  };

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', (e) => {
    if (navLinksUl.classList.contains('active') && nav && !nav.contains(e.target)) {
      toggleMenu(false);
    }
  });

  navLinksAnchors.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinksUl.classList.contains('active')) {
      toggleMenu(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinksUl.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* ===== VISION PATH SEQUENTIAL SCROLL ANIMATION ===== */
const visionPathContainer = document.querySelector('.vision-path-container');
const visionPathProgress = document.getElementById('visionPathProgress');
const visionSteps = document.querySelectorAll('.vision-path-step');

if (visionPathContainer) {
  const visionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (visionPathProgress) {
          visionPathProgress.style.width = '100%';
        }
        
        visionSteps.forEach((step, index) => {
          setTimeout(() => {
            step.classList.add('active');
          }, index * 300);
        });
        
        visionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  visionObserver.observe(visionPathContainer);
}

/* ===== MISSION STAGE INTERACTION ===== */
const stageCards = document.querySelectorAll('.mission-stage-card');
const visualPanels = document.querySelectorAll('.visual-panel');

stageCards.forEach(card => {
  const activateStage = () => {
    const targetStage = card.dataset.stage;
    
    stageCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    
    visualPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === `panel${targetStage.charAt(0).toUpperCase() + targetStage.slice(1)}`) {
        panel.classList.add('active');
      }
    });
  };

  card.addEventListener('mouseenter', activateStage);
  card.addEventListener('click', activateStage);
});

/* ===== CAPABILITY MAP TOPOLOGY INTERACTION ===== */
const capabilityCards = document.querySelectorAll('.capability-map-card');
const topLinkNodes = document.querySelectorAll('.top-link-node');

capabilityCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const group = card.dataset.group;
    topLinkNodes.forEach(node => {
      if (node.dataset.target === group) {
        node.classList.add('active-link');
      } else {
        node.classList.remove('active-link');
      }
    });
  });

  card.addEventListener('mouseleave', () => {
    topLinkNodes.forEach(node => node.classList.remove('active-link'));
  });
});

topLinkNodes.forEach(node => {
  node.addEventListener('mouseenter', () => {
    const target = node.dataset.target;
    topLinkNodes.forEach(n => n.classList.remove('active-link'));
    node.classList.add('active-link');
    
    capabilityCards.forEach(card => {
      if (card.dataset.group === target) {
        card.style.borderColor = 'var(--cyan-glow)';
        card.style.transform = 'translateY(-6px)';
      }
    });
  });

  node.addEventListener('mouseleave', () => {
    topLinkNodes.forEach(n => n.classList.remove('active-link'));
    capabilityCards.forEach(card => {
      card.style.borderColor = '';
      card.style.transform = '';
    });
  });
});

/* ===== REVEAL ON SCROLL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      const progressFills = entry.target.querySelectorAll('.progress-fill');
      progressFills.forEach(fill => {
        setTimeout(() => {
          fill.style.width = fill.dataset.width + '%';
        }, 300);
      });
      
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

/* ===== 3D TILT & LIGHT GLARE EFFECT (DESKTOP ONLY) ===== */
if (!isTouchDevice()) {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.transition = 'none';
      
      let glare = card.querySelector('.glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'glare';
        glare.style.position = 'absolute';
        glare.style.inset = '0';
        glare.style.pointerEvents = 'none';
        glare.style.zIndex = '10';
        glare.style.borderRadius = 'inherit';
        card.appendChild(glare);
      }
      
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(124,58,237,0.08) 0%, transparent 60%)`;
      glare.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      const glare = card.querySelector('.glare');
      if (glare) glare.style.opacity = '0';
    });
  });
}

/* ===== CONVERGING CTA CANVAS BACKGROUND (LIGHT THEME) ===== */
const ctaCanvas = document.getElementById('ctaNetworkCanvas');
if (ctaCanvas) {
  const ctaCtx = ctaCanvas.getContext('2d');
  let ctaWidth, ctaHeight, ctaDpr;
  let ctaNodes = [];

  function resizeCtaCanvas() {
    const parent = ctaCanvas.parentElement;
    if (!parent) return;
    ctaDpr = Math.min(window.devicePixelRatio || 1, 2);
    ctaWidth = parent.clientWidth;
    ctaHeight = parent.clientHeight;

    ctaCanvas.width = ctaWidth * ctaDpr;
    ctaCanvas.height = ctaHeight * ctaDpr;
    ctaCanvas.style.width = `${ctaWidth}px`;
    ctaCanvas.style.height = `${ctaHeight}px`;

    ctaCtx.resetTransform();
    ctaCtx.scale(ctaDpr, ctaDpr);

    initCtaNodes();
  }

  function initCtaNodes() {
    ctaNodes = [];
    const count = window.innerWidth <= 768 ? 14 : 26;
    for (let i = 0; i < count; i++) {
      ctaNodes.push({
        x: Math.random() * ctaWidth,
        y: Math.random() * ctaHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.2 + 1,
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  function drawCtaNetwork() {
    ctaCtx.clearRect(0, 0, ctaWidth, ctaHeight);
    const centerX = ctaWidth / 2;
    const centerY = ctaHeight / 2;

    ctaNodes.forEach(node => {
      const dxCenter = centerX - node.x;
      const dyCenter = centerY - node.y;
      node.vx += dxCenter * 0.00003;
      node.vy += dyCenter * 0.00003;

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > ctaWidth) node.vx *= -1;
      if (node.y < 0 || node.y > ctaHeight) node.vy *= -1;

      ctaCtx.beginPath();
      ctaCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctaCtx.fillStyle = `rgba(124, 58, 237, ${node.alpha * 0.7})`;
      ctaCtx.fill();

      ctaNodes.forEach(other => {
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const lineAlpha = (1 - dist / 120) * 0.25;
          ctaCtx.beginPath();
          ctaCtx.moveTo(node.x, node.y);
          ctaCtx.lineTo(other.x, other.y);
          ctaCtx.strokeStyle = `rgba(2, 132, 199, ${lineAlpha})`;
          ctaCtx.lineWidth = 0.8;
          ctaCtx.stroke();
        }
      });
    });

    requestAnimationFrame(drawCtaNetwork);
  }

  window.addEventListener('resize', resizeCtaCanvas);
  resizeCtaCanvas();
  drawCtaNetwork();
}
