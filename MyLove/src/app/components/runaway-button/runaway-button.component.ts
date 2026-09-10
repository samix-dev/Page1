import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FUNNY_MESSAGES } from '../../models/love.model';

@Component({
  selector: 'app-runaway-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="runaway-wrapper">
      <button
        *ngIf="show"
        class="runaway-btn"
        [style.left.px]="x + 'px'"
        [style.top.px]="y + 'px'"
        disabled
        (mouseenter)="onHover($event)"
        (touchstart)="onTouch($event)"
      >
        {{ label }}
      </button>
    </div>
    <div *ngIf="message" class="funny-toast" [@fadeInOut]="message">
      {{ message }}
    </div>
  `,
  styles: [`
    .runaway-wrapper {
      position: relative;
      width: 100%;
      height: 140px;
      cursor: default;
    }
    .runaway-btn {
      position: absolute;
      background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(238, 90, 111, 0.4);
      transition: all 0.12s ease-out;
      font-family: inherit;
      z-index: 10;
      user-select: none;
      touch-action: manipulation;
    }
    .funny-toast {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 14px;
      color: #e91e63;
      box-shadow: 0 4px 20px rgba(233, 30, 99, 0.2);
      white-space: nowrap;
      z-index: 20;
      animation: fadeInOut 2s ease-in-out forwards;
    }
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
      20% { opacity: 1; transform: translateX(-50%) translateY(0); }
      80% { opacity: 1; transform: translateX(-50%) translateY(0); }
      100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
  `],
  animations: []
})
export class RunawayButtonComponent implements OnInit {
  @Input() label = 'خیر 😢';
  @Input() show = true;
  @Output() escaped = new EventEmitter<void>();

  message: string | null = null;
  x = 0;
  y = 0;
  private containerWidth = 0;
  private containerHeight = 140;
  private btnWidth = 100;
  private btnHeight = 44;
  private escapeCount = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.centerButton();
  }

  centerButton() {
    const container = this.el.nativeElement.querySelector('.runaway-wrapper');
    if (container) {
      this.containerWidth = container.offsetWidth;
      this.x = Math.max(0, (this.containerWidth - this.btnWidth) / 2);
      this.y = Math.max(0, (this.containerHeight - this.btnHeight) / 2);
    }
  }

  onHover(event: MouseEvent) {
    this.escape(event);
  }

  onTouch(event: TouchEvent) {
    event.preventDefault();
    this.escape(event.touches[0]);
  }

  private escape(event: MouseEvent | Touch) {
    const rect = this.el.nativeElement.querySelector('.runaway-wrapper')?.getBoundingClientRect();
    if (!rect) return;

    const container = this.el.nativeElement.querySelector('.runaway-wrapper');
    if (container) {
      this.containerWidth = container.offsetWidth;
      this.containerHeight = container.offsetHeight;
    }

    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;

    let newX = this.x;
    let newY = this.y;

    const angle = Math.atan2(cursorY - (this.y + this.btnHeight / 2), cursorX - (this.x + this.btnWidth / 2));
    const distance = 150 + Math.random() * 100;
    newX += Math.cos(angle) * distance;
    newY += Math.sin(angle) * distance;

    newX = Math.max(0, Math.min(newX, this.containerWidth - this.btnWidth));
    newY = Math.max(0, Math.min(newY, this.containerHeight - this.btnHeight));

    this.x = newX;
    this.y = newY;

    this.escapeCount++;
    if (this.escapeCount % 2 === 0) {
      this.showMessage();
    }
  }

  private showMessage() {
    const messages = FUNNY_MESSAGES;
    this.message = messages[Math.floor(Math.random() * messages.length)];
    setTimeout(() => {
      this.message = null;
    }, 2000);
  }
}
