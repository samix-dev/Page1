import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EncryptionService {
  private static readonly SECRET_KEY = 'MyLove2024SecretKey';

  encrypt(text: string): string {
    const key = EncryptionService.SECRET_KEY;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const encrypted = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      encrypted[i] = data[i] ^ key.charCodeAt(i % key.length);
    }
    return EncryptionService.arrayToBase64(encrypted);
  }

  decrypt(base64: string): string {
    const key = EncryptionService.SECRET_KEY;
    const data = EncryptionService.base64ToArray(base64);
    const decrypted = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      decrypted[i] = data[i] ^ key.charCodeAt(i % key.length);
    }
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }

  private static arrayToBase64(arr: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < arr.length; i++) {
      binary += String.fromCharCode(arr[i]);
    }
    return btoa(binary);
  }

  private static base64ToArray(base64: string): Uint8Array {
    const binary = atob(base64);
    const arr = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      arr[i] = binary.charCodeAt(i);
    }
    return arr;
  }
}
