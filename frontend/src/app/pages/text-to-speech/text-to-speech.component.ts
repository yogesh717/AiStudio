import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TtsService } from '../../services/tts.service';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-text-to-speech',
  imports: [CommonModule,

    FormsModule,

  ],
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.css'
})
export class TextToSpeechComponent  implements OnInit {

  language: string = 'english'; // default


    text: string = '';
    voiceId: string = '';
    voices: any[] = [];
    logs: any[] = [];

  languages = [
    { code: 'english', label: 'English' },
    { code: 'hindi', label: 'Hindi' }
  ];

    constructor(private ttsService: TtsService) {}

    ngOnInit() {
      this.fetchVoices();
      this.fetchLogs();
    }

    fetchVoices() {
      this.ttsService.getVoices().subscribe((data: any) => {
        this.voices = data.voices;
        if (this.voices.length > 0) this.voiceId = this.voices[0].voice_id;
      });
    }

    fetchLogs() {
      this.ttsService.getLogs().subscribe(data => {
        this.logs = data;
      });
    }

    onGenerate() {
      if (!this.text || !this.voiceId) return;

      // this.ttsService.generateSpeech(this.text, this.voiceId).subscribe((audioBlob: Blob) => {
      //   const audioUrl = URL.createObjectURL(audioBlob);
      //   const audio = new Audio(audioUrl);
      //   audio.play();
      // });
      this.ttsService.generateSpeech(this.text, this.voiceId, this.language).subscribe((audioBlob: Blob) => {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      });

    }
  }
