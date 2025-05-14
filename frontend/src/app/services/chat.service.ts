import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {


  private apiUrl = 'http://localhost:5050/api/chat';

  constructor(private http: HttpClient) {}

sendMessage(message: string, chatId: string): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  });
  return this.http.post(this.apiUrl, { message, chatId }, { headers });
}

getChatHistory(chatId: string): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  });
  return this.http.get(`${this.apiUrl}/history/${chatId}`, { headers });
}




}
