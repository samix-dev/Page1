import { Injectable } from '@angular/core';
import { LoveQuestionnaire } from '../models/love.model';
import { EncryptionService } from './encryption.service';

@Injectable({ providedIn: 'root' })
export class LoveService {
  constructor(private encryptionService: EncryptionService) {}

  create(creatorName: string, loverName: string, questionCount = 10, selectedQuestionIds?: number[]): string {
    const trimmedCreator = creatorName.trim();
    const trimmedLover = loverName.trim();
    const payload = `${trimmedCreator}|${trimmedLover}|${questionCount}|${(selectedQuestionIds || []).join(',')}`;
    return this.encryptionService.encrypt(payload);
  }

  parseToken(token: string): LoveQuestionnaire | null {
    try {
      const decrypted = this.encryptionService.decrypt(token);
      const parts = decrypted.split('|');
      if (parts.length < 2) return null;
      const creatorName = parts[0];
      const loverName = parts[1];
      const questionCount = parts[2] ? parseInt(parts[2], 10) : 10;
      const selectedQuestionIds = parts[3] ? parts[3].split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id)) : undefined;
      if (!creatorName || !loverName) return null;
      return { creatorName, loverName, questionCount, selectedQuestionIds };
    } catch {
      return null;
    }
  }
}
