import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, X } from 'lucide-angular';
import { SearchFilterComponent } from '../../search-filter/search-filter.component';
import { LucideIconComponent } from '../../lucide-icon/lucide-icon.component';
import { ButtonComponent } from '../../button/button.component';
import { TagComponent } from '../../tag/tag.component';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-input-multi',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    SearchFilterComponent,
    LucideIconComponent,
    ButtonComponent,
    TagComponent,
  ],
  templateUrl: './select-input-multi.component.html',
  styleUrls: ['./select-input-multi.component.css'],
})
export class SelectInputMultiComponent {
  readonly chevronIcon = ChevronDown;
  readonly clearIcon = X;

  @Input() label = '';
  @Input() placeholder = 'Selecione...';
  @Input() description = '';
  @Input() error = '';
  @Input() disabled = false;

  @Input() options: SelectOption[] = [];
  filteredOptions: SelectOption[] = [];

  @Input() model: string[] = [];
  @Output() modelChange = new EventEmitter<string[]>();

  isOpen = false;

  @ViewChild('dropdownRoot') dropdownRoot!: ElementRef;

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  handleSearch(text: string) {
    this.filteredOptions = this.options.filter((o) =>
      o.label.toLowerCase().includes(text.toLowerCase())
    );
  }

  isSelected(value: string): boolean {
    return this.model.includes(value);
  }

  toggleSelection(option: SelectOption) {
    if (this.isSelected(option.value)) {
      this.model = this.model.filter((v) => v !== option.value);
    } else {
      this.model = [...this.model, option.value];
    }

    this.modelChange.emit(this.model);
  }

  removeTag(value: string) {
    this.model = this.model.filter((v) => v !== value);
    this.modelChange.emit(this.model);
  }

  clearAll() {
    this.model = [];
    this.modelChange.emit(this.model);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.dropdownRoot && !this.dropdownRoot.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  get selectedLabels(): string[] {
    return this.options.filter((o) => this.model.includes(o.value)).map((o) => o.label);
  }

  removeTagByLabel(label: string) {
    const option = this.options.find((o) => o.label === label);
    if (!option) return;

    this.removeTag(option.value);
  }
}
