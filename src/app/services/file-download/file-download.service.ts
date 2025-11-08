import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  private readonly httpClient = inject(HttpClient);

  downloadFile(url: string, fileName: string, fileType: string): Promise<File> {
    return firstValueFrom(
      this.httpClient
        .get(url, { responseType: 'blob' })
        .pipe(map((blob) => new File([blob], fileName, { type: fileType })))
    );
  }
}
