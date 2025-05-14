// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, switchMap, timer } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ImageGenerationService {
//   private replicateUrl = 'https://api.replicate.com/v1/predictions';
//   private replicateApiKey = 'r8_REPLACE_WITH_YOUR_TOKEN'; // Replace with your actual token
//   private modelVersion = 'db21e45e370d60d2f13d084f0b0c45b7186c403070c3ad37a1c3c3cf0e3f4994'; // SDXL model

//   constructor(private http: HttpClient) {}

//   generateImage(prompt: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Token ${this.replicateApiKey}`,
//       'Content-Type': 'application/json'
//     });

//     const body = {
//       version: this.modelVersion,
//       input: { prompt }
//     };

//     // Step 1: POST request to initiate image generation
//     return this.http.post<any>(this.replicateUrl, body, { headers }).pipe(
//       // Step 2: Poll the prediction URL until it's done
//       switchMap((response) => {
//         const predictionUrl = response.urls.get;

//         // Poll every 2 seconds
//         return new Observable<string>((observer) => {
//           const poll = timer(0, 2000).subscribe(() => {
//             this.http.get<any>(predictionUrl, { headers }).subscribe(result => {
//               if (result.status === 'succeeded') {
//                 poll.unsubscribe();
//                 observer.next(result.output[0]); // Final image URL
//                 observer.complete();
//               } else if (result.status === 'failed') {
//                 poll.unsubscribe();
//                 observer.error('Image generation failed');
//               }
//             });
//           });
//         });
//       })
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageGenerationService {
  private backendUrl = 'http://localhost:5050/api/image/generate-image';

  constructor(private http: HttpClient) {}

  generateImage(prompt: string): Observable<Blob> {
    return this.http.post(this.backendUrl, { prompt }, { responseType: 'blob' });
  }
  getImageHistory(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Or wherever you store your JWT
    return this.http.get<any[]>(`http://localhost:5050/api/image/image-history`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  // getImageHistory(): Observable<any[]> {
  //   return this.http.get<any[]>(`http://localhost:5050/api/image/image-history`);
  // }
}

