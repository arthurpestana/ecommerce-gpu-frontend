import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileDownloadService {
    download(url: string, filename: string) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

