import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { LoveBackgroundComponent } from '../../components/love-background/love-background.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, LoveBackgroundComponent],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <app-love-background></app-love-background>
    <div class="not-found-page">
      <div class="not-found-card" @fadeInUp>
        <div class="not-found-icon">😢</div>
        <h1 class="not-found-title">این لینک پیدا نشد!</h1>
        <p class="not-found-text">
          به نظر میاد لینکی که دنبالش هستی معتبر نیست یا حذف شده.
        </p>
        <a routerLink="/" class="home-link">بازگشت به صفحه اصلی 💕</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-page {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 25%, #f48fb1 50%, #ce93d8 75%, #f8bbd0 100%);
    }
    .not-found-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 24px;
      padding: 40px 28px;
      box-shadow: 0 8px 32px rgba(233, 30, 99, 0.15);
      text-align: center;
      max-width: 420px;
      width: 100%;
    }
    .not-found-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }
    .not-found-title {
      font-size: clamp(22px, 5vw, 28px);
      font-weight: 800;
      color: #2d1f2d;
      margin: 0 0 12px 0;
    }
    .not-found-text {
      font-size: clamp(14px, 3.5vw, 16px);
      color: #4a2c4a;
      margin: 0 0 28px 0;
      line-height: 1.6;
    }
    .home-link {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
      color: white;
      text-decoration: none;
      border-radius: 16px;
      font-size: 16px;
      font-weight: 700;
      transition: all 0.2s ease;
      box-shadow: 0 4px 15px rgba(238, 90, 111, 0.3);
    }
    .home-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(238, 90, 111, 0.4);
    }
  `]
})
export class NotFoundComponent {}
