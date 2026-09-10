import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { Question } from '../../models/love.model';
import { FUNNY_MESSAGES } from '../../models/love.model';

@Component({
  selector: 'app-love-question',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ],
  template: `
    <div class="question-card" @fadeInUp>
      <div class="question-header">
        <span class="question-number">سؤال {{ current + 1 }} از {{ total }}</span>
      </div>
      <h2 class="question-text">{{ question?.text }}</h2>
      <div class="answers-container">
        <button
          *ngFor="let answer of question?.positiveAnswers"
          class="answer-btn positive"
          (click)="select(answer)"
        >
          {{ answer }}
        </button>
        <button class="answer-btn negative" (click)="showNoMessage()">خیر 😢</button>
        <div *ngIf="noMessageData" class="funny-toast" @fadeInUp>
          {{ noMessageData.text }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .question-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 24px;
      padding: 32px 28px;
      box-shadow: 0 8px 32px rgba(233, 30, 99, 0.15);
      width: 100%;
      max-width: 480px;
      text-align: center;
      position: relative;
      overflow: visible;
    }
    .question-header {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }
    .question-number {
      background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
      color: white;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
    }
    .question-text {
      font-size: 20px;
      font-weight: 700;
      color: #2d1f2d;
      margin: 0 0 28px 0;
      line-height: 1.6;
    }
    .answers-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
    .answer-btn {
      padding: 14px 24px;
      border: none;
      border-radius: 16px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .answer-btn.positive {
      background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
      color: white;
      box-shadow: 0 4px 15px rgba(238, 90, 111, 0.3);
    }
    .answer-btn.positive:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(238, 90, 111, 0.4);
    }
    .answer-btn.positive:active {
      transform: translateY(0);
    }
    .answer-btn.negative {
      background: #f5f5f5;
      color: #666;
      border: 2px solid #e0e0e0;
      box-shadow: none;
    }
    .answer-btn.negative:hover {
      background: #eeeeee;
      border-color: #d0d0d0;
    }
    .funny-toast {
      margin-top: 10px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 14px;
      color: #e91e63;
      box-shadow: 0 4px 20px rgba(233, 30, 99, 0.2);
      white-space: nowrap;
      text-align: center;
    }
  `]
})
export class LoveQuestionComponent {
  @Input() question: Question | null = null;
  @Input() current = 0;
  @Input() total = 1;
  @Output() answered = new EventEmitter<string>();

  noMessageData: { text: string } | null = null;
  private _noMsgTimer: any;

  select(answer: string) {
    this.answered.emit(answer);
  }

  showNoMessage() {
    clearTimeout(this._noMsgTimer);
    const messages = FUNNY_MESSAGES;
    this.noMessageData = { text: messages[Math.floor(Math.random() * messages.length)] };
    this._noMsgTimer = setTimeout(() => {
      this.noMessageData = null;
    }, 2000);
  }
}
