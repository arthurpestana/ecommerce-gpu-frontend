import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { LucideIconComponent } from '../../lucide-icon/lucide-icon.component';
import { FilePreviewPipe } from '../../../lib/utils/file-preview/file-preview-pipe';
import { FileItem, FileItemComponent } from '../../file-item/file-item.component';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideIconComponent, FilePreviewPipe, FileItemComponent],
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
})
export class FileInputComponent {
  @Input() label = '';
  @Input() description = '';
  @Input() error = '';
  @Input() disabled = false;

  @Input() accept: string = '*/*';
  @Input() multiple: boolean = false;
  @Input() preview: boolean = true;

  @Input() model: File[] = [];
  @Output() modelChange = new EventEmitter<File[]>();

  @ViewChild('fileInputElement') fileInputElement!: ElementRef<HTMLInputElement>;

  reset() {
    this.model = [];
    if (this.fileInputElement?.nativeElement) {
      this.fileInputElement.nativeElement.value = '';
    }
  }

  onFileChange(event: any) {
    if (this.disabled) return;

    const files = Array.from(event.target.files || []) as File[];

    this.model = this.multiple ? files : files.slice(0, 1);
    this.modelChange.emit(this.model);
  }

  removeFile(file: FileItem) {
    const asFile = file as File;
    this.model = this.model.filter((f) => f !== asFile);
    this.modelChange.emit(this.model);
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }
}
