import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-love-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="love-bg">
      <div class="hearts-container">
        <span
          *ngFor="let heart of hearts"
          class="floating-heart"
          [style.animation-delay]="heart.delay + 's'"
          [style.left]="heart.left + '%'"
          [style.fontSize]="heart.size + 'px'"
        >
          {{ heart.emoji }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .love-bg {
      position: fixed;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    }
    .hearts-container {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .floating-heart {
      position: absolute;
      bottom: -50px;
      animation: floatUp linear infinite;
      opacity: 0.6;
      will-change: transform, opacity;
    }
    @keyframes floatUp {
      0% {
        transform: translateY(0) rotate(0deg) scale(0.8);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      90% {
        opacity: 0.4;
      }
      100% {
        transform: translateY(-110vh) rotate(720deg) scale(1.2);
        opacity: 0;
      }
    }
  `]
})
export class LoveBackgroundComponent {
  hearts: Array<{ emoji: string; left: number; delay: number; size: number }> = [];

  constructor() {
    this.hearts = Array.from({ length: 20 }, () => ({
      emoji: this.randomHeart(),
      left: Math.random() * 100,
      delay: Math.random() * 15,
      size: 16 + Math.random() * 24
    }));
  }

  private randomHeart(): string {
    const emojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '🥰', '😍'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }
}
