import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heart-animation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="heart-animation-container" #container>
      <div
        *ngFor="let h of burstHearts"
        class="hearts-burst"
        [style.left.px]="h.x + 'px'"
        [style.top.px]="h.y + 'px'"
        [style.animation-delay]="h.delay + 'ms'"
      >
        {{ h.emoji }}
      </div>
    </div>
  `,
  styles: [`
    .heart-animation-container {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 100;
      overflow: hidden;
    }
    .hearts-burst {
      position: absolute;
      font-size: 28px;
      animation: heartBurst 1.5s ease-out forwards;
      opacity: 0;
    }
    @keyframes heartBurst {
      0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
      50% { transform: translate(var(--dx), var(--dy)) scale(1.2); opacity: 1; }
      100% { transform: translate(var(--dx), var(--dy)) scale(0.8); opacity: 0; }
    }
  `]
})
export class HeartAnimationComponent implements OnChanges {
  @Input() trigger = false;
  @ViewChild('container', { static: true }) container!: ElementRef;

  burstHearts: Array<{ x: number; y: number; delay: number; emoji: string; dx: string; dy: string }> = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['trigger'] && this.trigger) {
      this.burstHearts = [];
      this.createBurst();
      setTimeout(() => {
        this.burstHearts = [];
      }, 2000);
    }
  }

  private createBurst() {
    const emojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '🥰', '😍'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 40; i++) {
      const dx = (Math.random() - 0.5) * 300;
      const dy = (Math.random() - 0.5) * 300;
      this.burstHearts.push({
        x: centerX,
        y: centerY,
        delay: i * 20,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        dx: dx + 'px',
        dy: dy + 'px'
      });
    }

    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#ee5a6f', '#ff8a80', '#ff4081', '#e91e63']
      });
    }).catch(() => {});
  }
}
