import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
    public confirmMatch(value: string, matchingValue: string): any {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[value];
            const matchingControl = formGroup.controls[matchingValue];
            if (matchingControl.errors && !matchingControl.errors.confirmMatch) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
    public getDate(): string {
        const day = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        const month = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juill.', 'Aout', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
        const currentMonth = month[new Date().getMonth()];
        const currentDay = day[new Date().getDay() - 1];
        return  currentDay + ' ' + new Date().getDate() + ' ' + currentMonth + ' ' + new Date().getFullYear();
    }
}
