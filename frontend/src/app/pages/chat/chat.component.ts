
import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService} from '../../services/chat.service';
import { HeaderComponent } from "../../components/header/header.component";



@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  chatId: string = '';
  messages: any[] = [];
  chatsList: string[] = [];
  userInput: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.startNewChat();
  }

  startNewChat() {
    this.chatId = Date.now().toString();
    this.messages = [];
    this.chatsList.push(this.chatId);
  }

  loadChatHistory(id: string) {
    this.chatId = id;
    this.chatService.getChatHistory(id).subscribe({
      next: (history) => this.messages = history,
      error: (err) => console.error('Failed to load chat history:', err)
    });
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ role: 'user', content: this.userInput });

    this.chatService.sendMessage(this.userInput, this.chatId).subscribe({
      next: (res) => {
        this.messages.push({ role: 'ai', content: res.response });
        this.userInput = '';
      },
      error: () => {
        this.messages.push({ role: 'ai', content: 'Something went wrong.' });
      }
    });
  }
}
