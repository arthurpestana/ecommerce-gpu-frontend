import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';
import { FilePreviewPipe } from '../../lib/utils/file-preview/file-preview-pipe';
import { FileDownloadService } from '../../services/file-download/file-download.service';

export type RemoteFile = {
  id: string;
  url: string;
  altText: string;
  isRemote: true;
};

export type FileItem = File | RemoteFile;

@Component({
  selector: 'app-file-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideIconComponent, FilePreviewPipe],
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.css'],
})
export class FileItemComponent {
  private readonly fileDownloadService = inject(FileDownloadService);

  @Input({ required: true }) item!: FileItem;
  @Input() isLocal = false;
  @Input() showPreview = true;
  @Input() disableDelete = false;
  @Input() hideDownload = false;

  @Output() remove = new EventEmitter<FileItem>();
  @Output() download = new EventEmitter<FileItem>();

  isFile(): boolean {
    return this.isLocal && this.item instanceof File;
  }

  isRemote(): boolean {
    return !this.isLocal;
  }

  getName(): string {
    return this.isFile()
      ? (this.item as File).name
      : (this.item as RemoteFile).altText;
  }

  getRemoteUrl(): string | null {
    return this.isRemote() ? (this.item as RemoteFile).url : null;
  }

  hasDownload(): boolean {
    return this.isRemote() && !!(this.item as RemoteFile).url;
  }

  onRemove() {
    if (!this.disableDelete) this.remove.emit(this.item);
  }

  onDownload() {
    if (this.hasDownload()) {
      this.download.emit(this.item)
    };
  }

  get fileAsLocal(): File | null {
    return this.isFile() ? (this.item as File) : null;
  }

  get remoteUrl(): string | null {
    return this.isRemote() ? (this.item as RemoteFile).url : null;
  }
}
