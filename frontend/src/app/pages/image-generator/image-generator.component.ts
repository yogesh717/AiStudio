import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageGenerationService } from '../../services/image-generation.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-image-generator',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,FormsModule

],
  templateUrl: './image-generator.component.html',
  styleUrl: './image-generator.component.css'
})
export class ImageGeneratorComponent  implements OnInit {

//   prompt: string = '';  // User input prompt
//   imageUrl: string | null = null;  // Generated image URL
//   isLoading: boolean = false;  // Loading state for the UI
//   errorMessage: string | null = null;  // Error handling

//   constructor(private imageGenerationService: ImageGenerationService) {}

//   // Generate the image based on the user input
//   generateImage(): void {
//     this.isLoading = true;
//     this.errorMessage = null;
//     this.imageUrl = null;

//     this.imageGenerationService.generateImage(this.prompt).subscribe({
//       next: (url: string) => {
//         this.imageUrl = url;
//         this.isLoading = false;
//       },
//       error: () => {
//         this.errorMessage = 'Failed to generate image. Please try again.';
//         this.isLoading = false;
//       }
//     });
//   }


//   // Reset the image and prompt
//   reset(): void {
//     this.imageUrl = null;
//     this.prompt = '';
//     this.errorMessage = null;
//   }

//   // Download the generated image
//   downloadImage(): void {
//     if (this.imageUrl) {
//       const link = document.createElement('a');
//       link.href = this.imageUrl;
//       link.download = 'generated-image.jpg';  // You can change the file name
//       link.click();
//     }
//   }
// }


  prompt: string = '';
  imageUrl: string | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  history: { imageUrl: string; prompt: string }[] = [];

  constructor(private imageService: ImageGenerationService) {}

  ngOnInit(): void {
    this.fetchHistory();
  }

  generateImage(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.imageService.generateImage(this.prompt).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.imageUrl = url;
        this.isLoading = false;
        this.fetchHistory(); // Update history after generating
      },
      error: (err) => {
        this.errorMessage = 'Failed to generate image. Please try again.';
        this.isLoading = false;
      },
    });
  }

  fetchHistory(): void {
    this.imageService.getImageHistory().subscribe({
      next: (res) => {
        this.history = res.reverse(); // newest first
      },
      error: () => {
        this.history = [];
        this.errorMessage = 'Failed to load image history. Please try again.';
      },
    });
  }

  reset(): void {
    this.imageUrl = null;
    this.prompt = '';
    this.errorMessage = null;
  }

  downloadImage(): void {
    if (this.imageUrl) {
      const link = document.createElement('a');
      link.href = this.imageUrl;
      link.download = 'generated-image.png'; // Default filename for the download
      link.click(); // Trigger the download
    }
  }

}
