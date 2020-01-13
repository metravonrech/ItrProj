import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textParagraph'
})
export class TextParagraphPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
