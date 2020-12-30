import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IndicatorService} from '../../services/indicator.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-indicatoredit',
  templateUrl: './indicatoredit.component.html',
  styleUrls: ['./indicatoredit.component.css']
})
export class IndicatoreditComponent implements OnInit {
  errors: string[] = [];

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<IndicatoreditComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private indService: IndicatorService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]),
      minValue: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(5000)]),
      maxValue: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(5000)]),
      value: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(5000)])
    });
  }

  getMinValueErrorMessage(): string {
    return 'ddd';
  }
  onClose(): void {
    this.dialogRef.close();
  }
  onSave() {
    this.errors = [];
    let state_oper: string = '';

    if (this.data.oper === 'delete_oper') {
      this.indService.deleteIndicator(this.data.indicator)
        .subscribe(
          response => {
            console.log(response);
            state_oper = 'Индикатор удален.';
            this.openSnackBar(state_oper, 'Понятно');
            this.dialogRef.close(this.data.indicator);
          },
          error => {
            console.log(error);
          });
    }

    if (this.data.oper === 'edit_oper') {
      if (this.data.indicator.id == null ||
        this.data.indicator.id === '' ) {
        this.errors.push('Код индикатора не может быть пустым.');
      }
      if (this.data.indicator.title === null ||
        this.data.indicator.title === '' ) {
        this.errors.push('Наименование индикатора не может быть пустым.');
      }
      if ( !(this.data.indicator.value >= this.data.indicator.minValue &&
            this.data.indicator.value <= this.data.indicator.maxValue)) {
        this.errors.push('Значение индикатора доджно быть >= мин. значения и <= макс. значения.');
      }

      if (this.errors.length === 0) {
        state_oper = 'Индикатор изменен.';
        this.indService.editIndicator(this.data.indicator)
          .subscribe(
            response => {
              console.log(response);
              state_oper = 'Индикатор изменен.';
              this.openSnackBar(state_oper, 'Понятно');
              this.dialogRef.close(this.data.indicator);
            },
            error => {
              console.log(error);
            });
      }
    }

    if (this.data.oper === 'entry_oper') {
      if (this.data.indicator.title === null ||
        this.data.indicator.title === '' ) {
        this.errors.push('Наименование индикатора не может быть пустым.');
      }
      if ( !(this.data.indicator.value >= this.data.indicator.minValue &&
        this.data.indicator.value <= this.data.indicator.maxValue)) {
        this.errors.push('Значение индикатора доджно быть >= мин. значения и <= макс. значения.');
      }
      this.indService.addIndicator(this.data.indicator)
        .subscribe(
          response => {
            console.log(response);
            state_oper = 'Индикатор добавлен.';
            this.openSnackBar(state_oper, 'Понятно');
            this.dialogRef.close(this.data.indicator);
          },
          error => {
            console.log(error);
          });
    }

    if (this.data.oper === 'view_oper') {
    }

    if (this.errors.length > 0) {
      this.openSnackBar('Необходимо заполнить: ' + this.errors.toString(), 'Понятно');

    }

  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
