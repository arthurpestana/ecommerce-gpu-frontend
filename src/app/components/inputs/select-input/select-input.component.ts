import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';
import { SearchFilterComponent } from '../../search-filter/search-filter.component';

export interface SelectOption {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SearchFilterComponent],
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
})
export class SelectInputComponent {
  readonly chevronIcon = ChevronDown;

  @Input() label = '';
  @Input() placeholder = 'Selecione...';
  @Input() description = '';
  @Input() error = '';
  @Input() disabled = false;

  @Input() options: SelectOption[] = [];
  filteredOptions: SelectOption[] = [];

  @Input() model: string | number | null = null;
  @Output() modelChange = new EventEmitter<string | number | null>();

  isOpen = false;

  @ViewChild('dropdownRoot') dropdownRoot!: ElementRef;

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  onToggle() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(option: SelectOption) {
    this.model = option.value;
    this.modelChange.emit(this.model);
    this.isOpen = false;
  }

  handleSearch(text: string) {
    this.filteredOptions = this.options.filter((o) =>
      o.label.toLowerCase().includes(text.toLowerCase())
    );
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.dropdownRoot && !this.dropdownRoot.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  get selectedLabel(): string {
    if (!this.model) return this.placeholder;

    const found = this.options.find((o) => o.value === this.model);
    return found?.label || this.placeholder;
  }
}
