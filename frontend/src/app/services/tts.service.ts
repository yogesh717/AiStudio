import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TtsService {
  private apiUrl = 'http://localhost:5050/api/tts'; // adjust if hosted

  constructor(private http: HttpClient) {}

  getVoices() {
    return this.http.get<any>(`${this.apiUrl}/voices`);
  }

  // generateSpeech(text: string, voiceId: string) {
  //   const headers = new HttpHeaders({ responseType: 'blob' as 'json' });
  //   return this.http.post(`${this.apiUrl}/generate`, { text, voiceId }, { headers, responseType: 'blob' });
  // }
  generateSpeech(text: string, voiceId: string, language: string) {
    const headers = new HttpHeaders({ responseType: 'blob' as 'json' });
    return this.http.post(
      `${this.apiUrl}/generate`,
      { text, voiceId, language },
      { headers, responseType: 'blob' }
    );
  }

  getLogs() {
    return this.http.get<any[]>(`${this.apiUrl}/logs`);
  }
}
