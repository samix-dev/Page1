import { Injectable } from '@angular/core';
import { LoveQuestionnaire } from '../models/love.model';
import { EncryptionService } from './encryption.service';

@Injectable({ providedIn: 'root' })
export class LoveService {
  constructor(private encryptionService: EncryptionService) {}

  create(creatorName: string, loverName: string): string {
    const trimmedCreator = creatorName.trim();
    const trimmedLover = loverName.trim();
    const payload = `${trimmedCreator}|${trimmedLover}`;
    return this.encryptionService.encrypt(payload);
  }

  parseToken(token: string): LoveQuestionnaire | null {
    try {
      const decrypted = this.encryptionService.decrypt(token);
      const separatorIndex = decrypted.indexOf('|');
      if (separatorIndex === -1) return null;
      const creatorName = decrypted.slice(0, separatorIndex);
      const loverName = decrypted.slice(separatorIndex + 1);
      if (!creatorName || !loverName) return null;
      return { creatorName, loverName };
    } catch {
      return null;
    }
  }
}
