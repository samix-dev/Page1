import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoveService } from '../../services/love.service';
import { LoveBackgroundComponent } from '../../components/love-background/love-background.component';
import { Question, QUESTIONS } from '../../models/love.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, LoveBackgroundComponent],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ],
  template: `
    <app-love-background></app-love-background>

    <div class="home-page">
      <div class="container">
        <div class="hero" @fadeInUp>
          <div class="hero-icon">❤️</div>
          <h1 class="hero-title">یه تست کوچولوی عاشقانه بساز ❤️</h1>
          <p class="hero-subtitle">اسم خودت و عشق زندگیت رو وارد کن تا یه پرسشنامه مخصوص شما بسازیم!</p>
        </div>

        <div class="form-card" @scaleIn>
          <div class="form-group">
            <label class="form-label">نام و نام خانوادگی شما</label>
            <input
              type="text"
              class="form-input"
              placeholder="مثلاً: سبحان"
              [(ngModel)]="creatorName"
              (keyup.enter)="createLink()"
            />
          </div>
          <div class="form-group">
            <label class="form-label">نام عشق زندگیت</label>
            <input
              type="text"
              class="form-input"
              placeholder="مثلاً: مریم"
              [(ngModel)]="loverName"
              (keyup.enter)="createLink()"
            />
          </div>

          <div class="form-group">
            <div class="questions-toggle" (click)="showQuestions.set(!showQuestions())">
              <span>{{ showQuestions() ? 'مخفی کردن سوالات' : 'انتخاب سوالات دلخواه' }}</span>
              <span class="selected-badge">{{ getSelectedQuestions().length }} سوال انتخاب شده</span>
              <span class="toggle-icon">{{ showQuestions() ? '▲' : '▼' }}</span>
            </div>

            <div *ngIf="showQuestions()" class="questions-list">
              <div class="questions-header">
                <span class="selected-count">{{ getSelectedQuestions().length }} سوال انتخاب شده</span>
              </div>
              <div class="questions-container">
                <div *ngFor="let q of getDisplayQuestions()" class="question-item" [class.selected]="isSelected(q.id)">
                  <label class="question-label">
                    <input type="checkbox" [checked]="isSelected(q.id)" (change)="toggleQuestion(q.id)" />
                    <span class="question-text">{{ q.text.replace('{creator}', creatorName || 'تو').replace('{lover}', loverName || 'عشق') }}</span>
                    <span class="question-number">#{{ q.id }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            class="create-btn"
            (click)="createLink()"
            [disabled]="!creatorName || !loverName"
          >
            ساخت لینک عاشقانه 💕
          </button>
        </div>

        <div *ngIf="link()" class="link-result" @scaleIn>
          <div class="success-icon">🎉</div>
          <h3 class="result-title">لینک با موفقیت ساخته شد!</h3>
          <div class="link-box">
            <input type="text" class="link-input" [value]="link()" readonly />
            <button class="copy-btn" (click)="copyLink()">کپی لینک 📋</button>
          </div>
          <button class="share-btn" (click)="shareLink()">اشتراک‌گذاری 💌</button>
          <div *ngIf="copied()" class="toast">لینک کپی شد! 🎉</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-page {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 25%, #f48fb1 50%, #ce93d8 75%, #f8bbd0 100%);
    }
    .container {
      width: 100%;
      max-width: 520px;
    }
    .hero {
      text-align: center;
      margin-bottom: 32px;
    }
    .hero-icon {
      font-size: 56px;
      margin-bottom: 16px;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    .hero-title {
      font-size: clamp(22px, 5vw, 32px);
      font-weight: 800;
      color: #fff;
      text-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin: 0 0 12px 0;
      line-height: 1.4;
    }
    .hero-subtitle {
      font-size: clamp(14px, 3.5vw, 18px);
      color: rgba(255, 255, 255, 0.95);
      margin: 0;
      line-height: 1.6;
      text-shadow: 0 1px 5px rgba(0,0,0,0.05);
    }
    .form-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 24px;
      padding: 32px 24px;
      box-shadow: 0 8px 32px rgba(233, 30, 99, 0.15);
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #4a2c4a;
      margin-bottom: 8px;
    }
    .form-input {
      width: 100%;
      padding: 14px 18px;
      border: 2px solid #f8bbd0;
      border-radius: 16px;
      font-size: 16px;
      font-family: inherit;
      background: #fff;
      color: #2d1f2d;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }
    .form-input:focus {
      outline: none;
      border-color: #ee5a6f;
      box-shadow: 0 0 0 4px rgba(238, 90, 111, 0.1);
    }
    .form-input::placeholder {
      color: #c9a0b0;
    }
    .create-btn {
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
      color: white;
      border: none;
      border-radius: 16px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
      box-shadow: 0 4px 15px rgba(238, 90, 111, 0.3);
    }
    .create-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(238, 90, 111, 0.4);
    }
    .create-btn:active:not(:disabled) {
      transform: translateY(0);
    }
    .create-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .link-result {
      margin-top: 24px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 24px;
      padding: 28px 24px;
      box-shadow: 0 8px 32px rgba(233, 30, 99, 0.15);
      text-align: center;
    }
    .success-icon {
      font-size: 48px;
      margin-bottom: 12px;
      animation: pulse 1.5s ease-in-out infinite;
    }
    .result-title {
      font-size: 20px;
      font-weight: 700;
      color: #2d1f2d;
      margin: 0 0 20px 0;
    }
    .link-box {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }
    .link-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #f8bbd0;
      border-radius: 12px;
      font-size: 14px;
      font-family: inherit;
      background: #fff;
      color: #2d1f2d;
      direction: ltr;
      text-align: left;
    }
    .copy-btn {
      padding: 12px 20px;
      background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
      white-space: nowrap;
    }
    .copy-btn:hover {
      transform: translateY(-1px);
    }
    .share-btn {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #ce93d8, #ba68c8);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .share-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(186, 104, 200, 0.3);
    }
    .toast {
      margin-top: 12px;
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      font-size: 14px;
      color: #e91e63;
      box-shadow: 0 4px 20px rgba(233, 30, 99, 0.2);
      display: inline-block;
    }
    .questions-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: linear-gradient(135deg, #fce4ec, #f8bbd0);
      border-radius: 12px;
      cursor: pointer;
      font-weight: 600;
      color: #4a2c4a;
      transition: all 0.2s ease;
    }
    .questions-toggle:hover {
      background: linear-gradient(135deg, #f8bbd0, #f48fb1);
    }
    .selected-badge {
      background: #e91e63;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
    }
    .toggle-icon {
      font-size: 12px;
      transition: transform 0.2s ease;
    }
    .questions-list {
      margin-top: 12px;
      padding: 16px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    .questions-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(233, 30, 99, 0.2);
    }
    .selected-count {
      font-size: 13px;
      color: #e91e63;
      font-weight: 600;
    }
    .questions-container {
      max-height: 280px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .question-item {
      transition: all 0.2s ease;
    }
    .question-item.selected {
      order: -1;
    }
    .question-label {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      background: #fff;
      border-radius: 10px;
      border: 2px solid #f8bbd0;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .question-label:hover {
      border-color: #ee5a6f;
      background: #fff5f6;
    }
    .question-item.selected .question-label {
      border-color: #e91e63;
      background: #fff0f3;
      box-shadow: 0 0 0 2px rgba(233, 30, 99, 0.1);
    }
    .question-label input[type="checkbox"] {
      width: 20px;
      height: 20px;
      accent-color: #e91e63;
      cursor: pointer;
      flex-shrink: 0;
    }
    .question-text {
      flex: 1;
      font-size: 13px;
      color: #2d1f2d;
      line-height: 1.4;
      text-align: right;
    }
    .question-number {
      font-size: 11px;
      color: #c9a0b0;
      font-weight: 600;
      background: #fce4ec;
      padding: 2px 8px;
      border-radius: 10px;
    }
    .questions-container::-webkit-scrollbar {
      width: 6px;
    }
    .questions-container::-webkit-scrollbar-track {
      background: transparent;
    }
    .questions-container::-webkit-scrollbar-thumb {
      background: #f8bbd0;
      border-radius: 3px;
    }
  `]
})
export class HomeComponent {
  creatorName = '';
  loverName = '';
  link = signal('');
  copied = signal(false);

  allQuestions = QUESTIONS;
  selectedQuestionIds = signal<number[]>([]);
  showQuestions = signal(false);

  constructor(private loveService: LoveService, private router: Router) {}

  getSelectedQuestions() {
    return this.selectedQuestionIds();
  }

  getDisplayQuestions(): Question[] {
    const selected = new Set(this.selectedQuestionIds());
    return [...this.allQuestions].sort((a, b) => {
      const aSel = selected.has(a.id);
      const bSel = selected.has(b.id);
      if (aSel && !bSel) return -1;
      if (!aSel && bSel) return 1;
      return a.id - b.id;
    });
  }

  isSelected(id: number) {
    return this.selectedQuestionIds().includes(id);
  }

  toggleQuestion(id: number) {
    const current = this.selectedQuestionIds();
    if (current.includes(id)) {
      this.selectedQuestionIds.set(current.filter(x => x !== id));
    } else {
      this.selectedQuestionIds.set([...current, id]);
    }
  }

  createLink() {
    if (!this.creatorName.trim() || !this.loverName.trim()) return;
    const token = this.loveService.create(this.creatorName, this.loverName, this.selectedQuestionIds().length, this.selectedQuestionIds());
    const baseHref = typeof document !== 'undefined' ? (document.querySelector('base')?.getAttribute('href') || '/') : '/';
    const path = baseHref.replace(/\/$/, '') + '/love/' + encodeURIComponent(token);
    this.link.set(window.location.origin + path);
  }

  copyLink() {
    if (!this.link()) return;
    navigator.clipboard.writeText(this.link()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    });
  }

  shareLink() {
    if (!this.link()) return;
    if (navigator.share) {
      navigator.share({
        title: 'تست عاشقانه',
        text: 'برای من یه تست عاشقانه بساز! ❤️',
        url: this.link()
      }).catch(() => {});
    } else {
      this.copyLink();
    }
  }
}
