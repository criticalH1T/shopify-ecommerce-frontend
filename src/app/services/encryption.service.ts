import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private secretKey: string = 'Sd2e6eM6BGrM8blmgmyv9gMu7NGvnfahNeX7hfZqsopJLM0wFU1nBogYJHZ573jU';

  constructor() { }

  encryptData(data: string) {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  decryptData(data: string) {
    return CryptoJS.AES.decrypt(data, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

}
