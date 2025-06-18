import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderLabel'
})
export class GenderLabelPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    switch (value?.toLowerCase()) {
      case 'male':
        return 'Masculino';
      case 'female':
        return 'Feminino';
      default:
        return 'Outro';
    }
  }
}
