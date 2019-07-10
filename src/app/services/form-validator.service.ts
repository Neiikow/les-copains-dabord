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
    public confirmDiscord(control: any): any {
        if (control.value) {
            if (control.value.match(/^[0-9]{4}$/)) {
                return null;
            } else {
                return { confirmDiscord: true };
            }
        }
    }
}
