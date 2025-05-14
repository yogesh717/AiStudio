
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
  import { SignupComponent } from './components/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';

import { authGuard } from './guards/auth.guard';

// import { TtsComponent } from './pages/tts/tts.component';
import { ImageGeneratorComponent } from './pages/image-generator/image-generator.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { loginSignupGuard } from './guards/login-signup.guard';
import { TextToSpeechComponent } from './pages/text-to-speech/text-to-speech.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginSignupGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [loginSignupGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  // { path: 'tts', component: TtsComponent, canActivate: [authGuard] },
  { path: 'image-generator', component: ImageGeneratorComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'tts', component: TextToSpeechComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' }
];






