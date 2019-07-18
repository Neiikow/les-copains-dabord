import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataFormatService {
  public frenchDate(data: string): string {
    const re = /^([0-9]{4})-([0-9]{2})-([0-9]{2})\s([0-9]{2}):([0-9]{2})(:[0-9]{2})*/;
    const monthList = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juill.', 'Aout', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

    const year = data.replace(re, '$1');
    const month = data.replace(re, '$2');
    const day = data.replace(re, '$3');
    const hour = data.replace(re, '$4');
    const min = data.replace(re, '$5');

    const monthString = monthList[Number(month) - 1];

    return  Number(day) + ' ' + monthString + ' ' + year + ' (' + hour + 'h' + min + ')';
  }
  public calendarDate(data: string): any {
    const re = /^([0-9]{4})-([0-9]{2})-([0-9]{2})\s([0-9]{2}):([0-9]{2})(:[0-9]{2})*/;
    const monthList = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juill.', 'Aout', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

    const year = data.replace(re, '$1');
    const month = data.replace(re, '$2');
    const day = data.replace(re, '$3');

    const monthString = monthList[Number(month) - 1];

    return  {
      'day': Number(day),
      'month': monthString,
      'year': year,
    };
  }
  public removeTags(data: string): any {
    const re = /(<([^>]+)>)/ig;
    const formated = data.replace(re, '');

    return formated;
  }
}
