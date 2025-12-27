/**
 * Canvas Animation Utilities
 *
 * A collection of canvas-based animation functions for portfolio effects
 */

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
}

interface ParticleConfig {
  count: number;
  size: { min: number; max: number };
  speed: { min: number; max: number };
  colorPalette: string[];
  opacity?: number;
}

export class ParticleAnimation {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: ParticleProps[] = [];
  private animationFrame: number | null = null;
  private config: ParticleConfig;
  private mousePosition: { x: number; y: number } | null = null;

  constructor(config: Partial<ParticleConfig>) {
    this.config = {
      count: config.count ?? 50,
      size: config.size ?? { min: 1, max: 5 },
      speed: config.speed ?? { min: 0.1, max: 0.5 },
      colorPalette: config.colorPalette ?? [
        '#3b82f6',
        '#8b5cf6',
        '#ec4899',
        '#f97316',
      ],
      opacity: config.opacity ?? 0.7,
    };
  }

  public init(canvasEl: HTMLCanvasElement): void {
    this.canvas = canvasEl;
    this.ctx = this.canvas.getContext('2d');

    // Set canvas to full screen
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);

    // Create mouse tracking
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave);

    // Create particles
    this.createParticles();

    // Start animation
    this.animate();
  }

  public destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    if (this.canvas) {
      this.canvas.removeEventListener('mousemove', this.handleMouseMove);
      this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    }

    window.removeEventListener('resize', this.resizeCanvas);
  }

  private resizeCanvas = (): void => {
    if (!this.canvas) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Recreate particles on resize
    this.createParticles();
  };

  private handleMouseMove = (e: MouseEvent): void => {
    if (!this.canvas) return;

    this.mousePosition = {
      x: e.offsetX,
      y: e.offsetY,
    };
  };

  private handleMouseLeave = (): void => {
    this.mousePosition = null;
  };

  private createParticles(): void {
    if (!this.canvas) return;

    this.particles = [];
    const { count, size, speed, colorPalette } = this.config;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * (size.max - size.min) + size.min,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        speedX: (Math.random() - 0.5) * (speed.max - speed.min) + speed.min,
        speedY: (Math.random() - 0.5) * (speed.max - speed.min) + speed.min,
      });
    }
  }

  private animate = (): void => {
    if (!this.ctx || !this.canvas) return;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around edges
      if (particle.x > this.canvas!.width) particle.x = 0;
      if (particle.x < 0) particle.x = this.canvas!.width;
      if (particle.y > this.canvas!.height) particle.y = 0;
      if (particle.y < 0) particle.y = this.canvas!.height;

      // Draw particle
      this.ctx!.beginPath();
      this.ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx!.fillStyle = particle.color;
      this.ctx!.globalAlpha = this.config.opacity || 0.7;
      this.ctx!.fill();
      this.ctx!.globalAlpha = 1;

      // Connect particles within range
      this.connectParticles(particle, index);

      // Add mouse interaction
      this.handleMouseInteraction(particle);
    });

    // Continue animation loop
    this.animationFrame = requestAnimationFrame(this.animate);
  };

  private connectParticles(
    currentParticle: ParticleProps,
    index: number
  ): void {
    if (!this.ctx) return;

    const maxDistance = 120;

    for (let i = index + 1; i < this.particles.length; i++) {
      const otherParticle = this.particles[i];
      const dx = currentParticle.x - otherParticle.x;
      const dy = currentParticle.y - otherParticle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        // Opacity based on distance
        const opacity = 1 - distance / maxDistance;

        this.ctx.beginPath();
        this.ctx.strokeStyle = currentParticle.color;
        this.ctx.globalAlpha = opacity * 0.5;
        this.ctx.lineWidth = 0.5;
        this.ctx.moveTo(currentParticle.x, currentParticle.y);
        this.ctx.lineTo(otherParticle.x, otherParticle.y);
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
      }
    }
  }

  private handleMouseInteraction(particle: ParticleProps): void {
    if (!this.mousePosition || !this.ctx) return;

    const dx = particle.x - this.mousePosition.x;
    const dy = particle.y - this.mousePosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 150;

    if (distance < maxDistance) {
      // Repel particles from mouse
      const force = (maxDistance - distance) / maxDistance;
      const directionX = dx / distance || 0;
      const directionY = dy / distance || 0;

      particle.x += directionX * force * 2;
      particle.y += directionY * force * 2;

      // Draw line to mouse
      this.ctx.beginPath();
      this.ctx.strokeStyle = particle.color;
      this.ctx.globalAlpha = (1 - distance / maxDistance) * 0.3;
      this.ctx.lineWidth = 0.5;
      this.ctx.moveTo(particle.x, particle.y);
      this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;
    }
  }
}

// Gradient Text Animation
export class GradientTextEffect {
  private element: HTMLElement | null = null;
  private colors: string[];
  private speed: number;
  private isRunning: boolean = false;

  constructor(
    colors: string[] = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316'],
    speed: number = 3000
  ) {
    this.colors = colors;
    this.speed = speed;
  }

  public init(element: HTMLElement): void {
    this.element = element;
    this.isRunning = true;
    this.animate();
  }

  public destroy(): void {
    this.isRunning = false;
  }

  private animate(): void {
    if (!this.element || !this.isRunning) return;

    const colorString = this.colors.join(', ');

    // Animated gradient
    this.element.style.backgroundImage = `linear-gradient(90deg, ${colorString})`;
    this.element.style.backgroundSize = '200% 200%';
    this.element.style.backgroundClip = 'text';
    this.element.style.color = 'transparent';
    this.element.style.animation = `gradient ${this.speed}ms ease infinite alternate`;

    // Add CSS if not present
    if (!document.getElementById('gradient-animation-css')) {
      const style = document.createElement('style');
      style.id = 'gradient-animation-css';
      style.textContent = `
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// 3D tilt effect
export function createTiltEffect(element: HTMLElement, intensity: number = 15) {
  let rect = element.getBoundingClientRect();

  const handleMouseMove = (e: MouseEvent) => {
    if (!element) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = x / rect.width - 0.5;
    const yPercent = y / rect.height - 0.5;

    const rotateX = yPercent * intensity * -1; // Invert for natural feel
    const rotateY = xPercent * intensity;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!element) return;
    element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    element.style.transition = 'transform 0.5s ease';
  };

  const handleMouseEnter = () => {
    if (!element) return;
    element.style.transition = 'transform 0.1s ease';
    // Update rectangle on enter in case of page resize
    rect = element.getBoundingClientRect();
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  element.addEventListener('mouseenter', handleMouseEnter);

  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
    element.removeEventListener('mouseenter', handleMouseEnter);
  };
}

// Typing effect
export class TypeWriter {
  private element: HTMLElement | null = null;
  private words: string[];
  private typingSpeed: number;
  private deletingSpeed: number;
  private pauseTime: number;
  private isRunning: boolean = false;
  private currentWordIndex: number = 0;
  private isDeleting: boolean = false;
  private text: string = '';
  private typeTimeout: NodeJS.Timeout | null = null;

  constructor(
    words: string[],
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseTime = 1500
  ) {
    this.words = words;
    this.typingSpeed = typingSpeed;
    this.deletingSpeed = deletingSpeed;
    this.pauseTime = pauseTime;
  }

  public init(element: HTMLElement): void {
    this.element = element;
    this.isRunning = true;
    this.type();
  }

  public destroy(): void {
    this.isRunning = false;
    if (this.typeTimeout) {
      clearTimeout(this.typeTimeout);
    }
  }

  private type(): void {
    if (!this.element || !this.isRunning) return;

    const currentWord = this.words[this.currentWordIndex];
    const speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

    if (this.isDeleting) {
      this.text = currentWord.substring(0, this.text.length - 1);
    } else {
      this.text = currentWord.substring(0, this.text.length + 1);
    }

    this.element.textContent = this.text;

    // Cursor effect
    this.element.classList.toggle('typing');

    // Determine next steps
    if (!this.isDeleting && this.text === currentWord) {
      // Word completed, pause before deleting
      this.isDeleting = true;
      this.typeTimeout = setTimeout(() => this.type(), this.pauseTime);
    } else if (this.isDeleting && this.text === '') {
      // Deletion completed, move to next word
      this.isDeleting = false;
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
      this.typeTimeout = setTimeout(() => this.type(), 500);
    } else {
      // Continue typing or deleting
      this.typeTimeout = setTimeout(() => this.type(), speed);
    }
  }
}
