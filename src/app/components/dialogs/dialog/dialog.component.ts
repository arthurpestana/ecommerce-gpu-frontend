import { Component, EventEmitter, Input, Output, HostListener, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

    @Input() open = false;
    @Input() title: string = '';
    @Input() subtitle: string = '';
    @Input() width: string = '550px';
    @Input() disableBackdropClose: boolean = false;

    @Output() closed = new EventEmitter<void>();

    zIndex: number = 1000;

    private static dialogCount = 0;

    constructor() {
        DialogComponent.dialogCount++;
        this.zIndex = 1000 + DialogComponent.dialogCount;
    }

    closeDialog() {
        this.closed.emit();
        DialogComponent.dialogCount--;
    }

    @HostListener('document:keydown.escape')
    onEscKey() {
        if (this.open) this.closeDialog();
    }
}
