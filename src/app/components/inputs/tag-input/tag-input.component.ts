import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { TagComponent } from '../../tag/tag.component';

@Component({
  selector: 'app-tag-input',
  standalone: true,
  imports: [CommonModule, FormsModule, TagComponent],
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css'],
})
export class TagInputComponent {
  @Input() label = '';
  @Input() placeholder = 'Digite e pressione Enter...';
  @Input() description = '';
  @Input() error = '';
  @Input() disabled = false;

  @Input() model: string[] = [];
  @Output() modelChange = new EventEmitter<string[]>();

  newTag = '';

  addTag() {
    const tag = this.newTag.trim();

    if (!tag || this.disabled) return;
    if (this.model.includes(tag)) {
      this.error = 'Tag já adicionada.';
      return;
    };

    this.model = [...this.model, tag];
    this.modelChange.emit(this.model);
    this.error = '';
    this.newTag = '';
  }

  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addTag();
    }
  }

  removeTag(tag: string) {
    this.model = this.model.filter((t) => t !== tag);
    this.modelChange.emit(this.model);
  }
}
