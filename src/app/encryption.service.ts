// encryption.service.ts
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {
    private secretKey = 'p#0W8x@vR2H%3nKj$J9qT6dE1mF7bLz!'; // Thay thế bằng khóa bí mật của bạn

    constructor() {}

    // Phương thức để mã hóa dữ liệu
    encrypt(data: string): string {
        return CryptoJS.AES.encrypt(data, this.secretKey).toString();
    }

    // Phương thức để giải mã dữ liệu
    decrypt(ciphertext: string): string {
        const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
