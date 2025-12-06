import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cepMask' })
export class CepMaskPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');

    return digits.replace(
      /^(\d{5})(\d{3})$/,
      '$1-$2'
    );
  }
}
