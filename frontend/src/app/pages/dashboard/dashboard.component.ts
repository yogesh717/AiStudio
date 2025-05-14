import { Component } from '@angular/core';
  import { AuthService } from '../../services/auth.service';
// import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService: AuthService) {}
  feature = [
    { icon: 'image', title: 'Image Generator', description: 'Generate stunning AI images.' },
    { icon: 'text_fields', title: 'Text to Speech', description: 'Convert text into realistic voice.' },
    { icon: 'videocam', title: 'Video Creator', description: 'Create videos from images and audio.' }
  ];

  cards = [
    {
      title: "Generate prototypes",
      description: "Generate multi-screens, editable prototypes in seconds using simple text.",
      extra: `<button class="btn btn-outline-light btn-sm mt-2">Try example</button>`
    },
    {
      title: "Modify any component",
      description: "Select any component, describe the change, and let AI do the rest.",
      extra: `<img src="assets/modify.png" class="img-fluid rounded mt-3" alt="Modify Component">`
    },
    {
      title: "Generate screens",
      description: "Quickly expand your design project with multiple screens.",
      extra: `<img src="assets/screens.png" class="img-fluid rounded mt-3" alt="Generate Screens">`
    },
    {
      title: "Screenshot Scanner",
      description: "Convert screenshots into editable UIs with design intelligence.",
      extra: `<img src="assets/scanner.png" class="img-fluid rounded mt-3" alt="Screenshot Scanner">`
    },
    {
      title: "Wireframe scanner",
      description: "Convert your hand-drawn sketches into digital wireframes.",
      extra: `<img src="assets/wireframe.png" class="img-fluid rounded mt-3" alt="Wireframe Scanner">`
    },
    {
      title: "Generate themes",
      description: "Easily switch your project's appearance by generating new themes.",
      extra: `<img src="assets/themes.png" class="img-fluid rounded mt-3" alt="Generate Themes">`
    }
  ];



}

//

//     logout() {
//       this.authService.logout();
//     }

//   feature = [
//     { title: 'Image Generator', description: 'Generate AI-based HD images using simple prompts.' },
//     { title: 'Voice Cloning', description: 'Clone voices using advanced speech technology.' },
//     { title: 'AI With Chat', description: 'Create AI-powered videos with your media & voice.' }
//   ];
// }
