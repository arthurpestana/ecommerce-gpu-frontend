import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

@Component({
  selector: 'app-container-div',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container-div.component.html',
  styleUrls: ['./container-div.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContainerDivComponent {
  @Input() direction: FlexDirection = 'column';
  @Input() justify: JustifyContent = 'flex-start';
  @Input() align: AlignItems = 'stretch';
  @Input() wrap: FlexWrap = 'nowrap';

  @Input() gap: string = '0';
  @Input() padding: string = '0';
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
  @Input() background: string = 'transparent';
  @Input() border: string = 'none';
  @Input() radius: string = 'var(--radius-md)';
  @Input() full: boolean = false;

  get containerStyles() {
    return {
      display: 'flex',
      flexDirection: this.direction,
      justifyContent: this.justify,
      alignItems: this.align,
      flexWrap: this.wrap,
      gap: this.gap,
      padding: this.padding,
      width: this.full ? '100%' : this.width,
      height: this.height,
      background: this.background,
      border: this.border,
      borderRadius: this.radius,
    };
  }
}
