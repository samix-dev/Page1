import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoveService } from '../../services/love.service';
import { LoveQuestionnaire, Question, QUESTIONS } from '../../models/love.model';
import { LoveQuestionComponent } from '../../components/love-question/love-question.component';
import { HeartAnimationComponent } from '../../components/heart-animation/heart-animation.component';
import { LoveBackgroundComponent } from '../../components/love-background/love-background.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { animate, style, transition, trigger } from '@angular/animations';

type Step = 'welcome' | 'question' | 'result';

  @Component({
    selector: 'app-questionnaire',
    standalone: true,
    imports: [CommonModule, RouterModule, LoveQuestionComponent, HeartAnimationComponent, LoveBackgroundComponent, NotFoundComponent],
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
      <app-heart-animation [trigger]="showHearts()"></app-heart-animation>

      <div class="questionnaire-page" *ngIf="questionnaire; else notFound">
        <div class="container">
          <div *ngIf="step() === 'welcome'" class="welcome-section" @fadeInUp>
            <div class="welcome-icon">👋</div>
            <h1 class="welcome-title">سلام!</h1>
            <p class="welcome-text">
              {{ questionnaire.creatorName }} برای {{ questionnaire.loverName }} یه سوالایی داره... 😍
            </p>
            <button class="start-btn" (click)="startQuestions()">
              شروع پرسشنامه 💕
            </button>
          </div>

          <div *ngIf="step() === 'question' && currentQuestion()" class="question-section" @fadeInUp>
            <app-love-question
              [question]="currentQuestion()"
              [current]="currentIndex() + 1"
              [total]="questions.length"
              (answered)="onAnswered($event)"
            ></app-love-question>
          </div>

          <div *ngIf="step() === 'result'" class="result-section" @fadeInUp>
            <div class="result-card">
              <div class="result-icon">❤️</div>
              <h1 class="result-title">نتیجه مشخص شد! ❤️</h1>
              <p class="result-text">
                {{ questionnaire.loverName }}، ظاهراً {{ questionnaire.creatorName }} اینجا خیلی دوستت داره 😍
              </p>
              <p class="result-subtitle">
                تبریک! به نظر میاد عشق بین شما دوطرفه‌ست! 💕
              </p>
              <button class="home-btn" routerLink="/">
                منم یه لینک عاشقانه بسازم 💕
              </button>
            </div>
          </div>
        </div>
      </div>

      <ng-template #notFound>
        <app-not-found></app-not-found>
      </ng-template>
    `,
  styles: [`
    .questionnaire-page {
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
    .welcome-section {
      text-align: center;
    }
    .welcome-icon {
      font-size: 64px;
      margin-bottom: 16px;
      animation: wave 1.5s ease-in-out infinite;
    }
    @keyframes wave {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(20deg); }
      75% { transform: rotate(-20deg); }
    }
    .welcome-title {
      font-size: clamp(28px, 6vw, 40px);
      font-weight: 800;
      color: #fff;
      text-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin: 0 0 16px 0;
    }
    .welcome-text {
      font-size: clamp(16px, 4vw, 20px);
      color: rgba(255, 255, 255, 0.95);
      margin: 0 0 32px 0;
      line-height: 1.6;
      text-shadow: 0 1px 5px rgba(0,0,0,0.05);
    }
    .start-btn {
      padding: 16px 40px;
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
    .start-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(238, 90, 111, 0.4);
    }
    .question-section {
      display: flex;
      justify-content: center;
    }
    .result-section {
      display: flex;
      justify-content: center;
    }
    .result-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 24px;
      padding: 40px 28px;
      box-shadow: 0 8px 32px rgba(233, 30, 99, 0.15);
      text-align: center;
      width: 100%;
      max-width: 480px;
    }
    .result-icon {
      font-size: 64px;
      margin-bottom: 16px;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }
    .result-title {
      font-size: clamp(24px, 5vw, 32px);
      font-weight: 800;
      color: #2d1f2d;
      margin: 0 0 16px 0;
    }
    .result-text {
      font-size: clamp(16px, 4vw, 20px);
      color: #4a2c4a;
      margin: 0 0 12px 0;
      line-height: 1.6;
    }
    .result-subtitle {
      font-size: clamp(14px, 3.5vw, 18px);
      color: #e91e63;
      margin: 0 0 32px 0;
      font-weight: 600;
    }
    .home-btn {
      padding: 14px 32px;
      background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
      color: white;
      border: none;
      border-radius: 16px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
      text-decoration: none;
      display: inline-block;
      box-shadow: 0 4px 15px rgba(238, 90, 111, 0.3);
    }
    .home-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(238, 90, 111, 0.4);
    }
  `]
})
export class QuestionnaireComponent implements OnInit {
  questionnaire: LoveQuestionnaire | null = null;
  step = signal<Step>('welcome');
  currentIndex = signal(0);
  showHearts = signal(false);
  questions: Question[] = [];
  isAnswering = signal(false);

  constructor(
    private route: ActivatedRoute,
    private loveService: LoveService
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('id');
    if (token) {
      this.questionnaire = this.loveService.parseToken(decodeURIComponent(token));
      if (this.questionnaire) {
        const count = this.questionnaire.questionCount || 10;
        const selectedIds = this.questionnaire.selectedQuestionIds || [];
        let selectedQuestions = QUESTIONS.filter(q => selectedIds.includes(q.id));
        const remainingQuestions = QUESTIONS.filter(q => !selectedIds.includes(q.id));
        selectedQuestions = [...selectedQuestions, ...remainingQuestions].slice(0, count);
        this.questions = selectedQuestions.map((q: Question) => ({
          ...q,
          text: q.text
            .replace('{creator}', this.questionnaire!.creatorName)
            .replace('{lover}', this.questionnaire!.loverName)
        }));
      }
    }
  }

  get currentQuestion(): () => Question | null {
    return () => this.questions[this.currentIndex()] || null;
  }

  startQuestions() {
    this.step.set('question');
    this.currentIndex.set(0);
  }

  onAnswered(answer: string) {
    if (this.isAnswering()) return;
    this.isAnswering.set(true);

    this.showHearts.set(true);
    setTimeout(() => {
      this.showHearts.set(false);
    }, 1500);

    setTimeout(() => {
      if (this.currentIndex() < this.questions.length - 1) {
        this.currentIndex.update(i => i + 1);
      } else {
        this.step.set('result');
      }
      this.isAnswering.set(false);
    }, 1200);
  }
}
