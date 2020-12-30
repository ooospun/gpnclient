import {Component, OnInit} from '@angular/core';
import {indicator} from '../../models/indicator';
import {IndicatorService} from '../../services/indicator.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IndicatoreditComponent} from '../indicatoredit/indicatoredit.component';
import {SelectionModel} from '@angular/cdk/collections';
import {customization} from '../../models/customization';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-indicatorlist',
  templateUrl: './indicatorlist.component.html',
  styleUrls: ['./indicatorlist.component.css']
})
export class IndicatorlistComponent implements OnInit {

  listIndicators: indicator[] = [];
  displayedColumns = ['select', 'id', 'title', 'value', 'minValue', 'maxValue'];
  selectIndicator: indicator = new indicator();
  selection = new SelectionModel<indicator>(false, []);

  towers: customization[] = [
    {
      y: 280,
      height: 342,
      percent: 98,
      percentline: 'st828',
      title: 'Уровень карналита в силосной башне № 1',
      massatitle: 'Масса карналита',
      massa: 1065,
      massaline: 'st828'
    },
    {
      y: 280,
      height: 342,
      percent: 60,
      percentline: 'st828',
      title: 'Уровень карналита в силосной башне № 2',
      massatitle: 'Масса карналита',
      massa: 998,
      massaline: 'st828'
    },
    {
      y: 280,
      height: 342,
      percent: 38,
      percentline: 'st828',
      title: 'Уровень карналита в силосной башне № 3',
      massatitle: 'Масса карналита',
      massa: 578,
      massaline: 'st828'
    },
    {
      y: 280,
      height: 342,
      percent: 79,
      percentline: 'st828',
      title: 'Уровень карналита в силосной башне № 4',
      massatitle: 'Масса карналита',
      massa: 967,
      massaline: 'st828'
    },
    {
      y: 280,
      height: 342,
      percent: 99,
      percentline: 'st828',
      title: 'Уровень карналита в силосной башне № 5',
      massatitle: 'Масса карналита',
      massa: 1365,
      massaline: 'st828'
    },
    {
      y: 280,
      height: 342,
      percent: 60,
      percentline: 'st828',
      title: 'Уровень карналита в силосной башне № 6',
      massatitle: 'Масса карналита',
      massa: 143,
      massaline: 'st828'
    },
    {
      y: 280,
      height: 342,
      percent: 51,
      percentline: 'st828',
      title: 'Уровень карналита в силосной башне № 7',
      massatitle: 'Масса карналита',
      massa: 865,
      massaline: 'st828'
    },
    {
      y: 280,
      height: 342,
      percent: 60,
      percentline: 'st828',
      title: 'Уровень карналита в силосной башне № 8',
      massatitle: 'Масса карналита',
      massa: 965,
      massaline: 'st828'
    }

  ];


  rect01y: number = 280;
  rect01height: number = 342;
  rect01percent: number = 98;
  rect01title: string = 'Уровень карналита в силосной башне № 1';
  rect01massatitle: string = 'Масса карналита';
  rect01massa: number = 1065;


  constructor(
    private indService: IndicatorService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.indService.getIndicators()
      .subscribe(res => {
        this.listIndicators = res;
        this.setTowersData(); }
        );
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = !this.listIndicators ? 0 : this.listIndicators.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.listIndicators.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: indicator): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  addIndicator(): void {
    const dialogConfig = new MatDialogConfig();
    let ind: indicator = new indicator();
    ind.id = '00000000-0000-0000-0000-000000000000';
    ind.title = null;
    ind.minValue = 0;
    ind.maxValue = 2000;
    ind.value = 1000;

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
//    dialogConfig.height = '750px';
    dialogConfig.data = {
      indicator: ind,
      oper: 'entry_oper'
    };
    const dialogRef = this.dialog.open(IndicatoreditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      ind = result;
      this.indService.getIndicators()
        .subscribe(res => {
          this.listIndicators = res;
          this.setTowersData(); }
        );
    });
  }

  viewIndicator(): void {
    let ind: indicator;

    if (this.selection.selected.length === 1) {
      this.selection.selected.forEach(item => {
        ind = item;
      });
    }

    if (ind != null) {
      this.selectIndicator = ind;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '450px';
//      dialogConfig.height = '650px';
      dialogConfig.data = {
        indicator: ind,
        oper: 'view_oper'
      };
      const dialogRef = this.dialog.open(IndicatoreditComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        ind = result;
      });
    } else {
      this.openSnackBar('Необходимо выбрать индикатор для просмотра', 'Понятно');
    }
  }

  editIndicator(): void {
    let ind: indicator;

    if (this.selection.selected.length === 1) {
      this.selection.selected.forEach(item => {
        ind = item;
      });
    }

    if (ind != null) {
      this.selectIndicator = ind;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '450px';
//      dialogConfig.height = '650px';
      dialogConfig.data = {
        indicator: ind,
        oper: 'edit_oper'
      };
      const dialogRef = this.dialog.open(IndicatoreditComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        ind = result;
        this.indService.getIndicators()
          .subscribe(res => {
            this.listIndicators = res;
            this.setTowersData(); }
          );
      });
    } else {
      this.openSnackBar('Необходимо выбрать индикатор для просмотра', 'Понятно');
    }

  }

  deleteIndicator(): void {
    let ind: indicator;

    if (this.selection.selected.length === 1) {
      this.selection.selected.forEach(item => {
        ind = item;
      });
    }

    if (ind != null) {
      this.selectIndicator = ind;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '450px';
//      dialogConfig.height = '650px';
      dialogConfig.data = {
        indicator: ind,
        oper: 'delete_oper'
      };
      const dialogRef = this.dialog.open(IndicatoreditComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        ind = result;
        this.indService.getIndicators()
          .subscribe(res => {
            this.listIndicators = res;
            this.setTowersData(); }
          );
      });
    } else {
      this.openSnackBar('Необходимо выбрать индикатор для просмотра', 'Понятно');
    }
  }

  setIndicator(): void {
    this.towers[7].percentline = 'stred';
  }

  getStringPart(text: string, partNum: number): string {
    var arr = [];
    const partLength = 20;

    while (text !== '') {
      arr.push(text.slice(0, partLength));
      text = text.slice(partLength);
    }
    if (partNum < arr.length) {
      return arr[partNum];
    }
    return '';
  }

  getStringPartX(text: string, partNum: number): number {
    const width = 35;
    const partLength = 20;


    let arr: string[] = [];
    while (text !== '') {
      arr.push(text.slice(0, partLength));
      text = text.slice(partLength);
    }
    if (partNum < arr.length) {
      return -15 + (width - arr[partNum].length) * 2;
    }
    return -15;
  }

  setTowersData(): void {
    for (var i = 0; i < this.towers.length; i++) {
      this.towers[i].massa = 0;
      this.towers[i].title = 'Уровень карналита в силосной башне № ' + i;
      this.towers[i].percent = 0;
      this.towers[i].percentline = 'st828';
      this.towers[i].massaline = 'st828';

      if (i < this.listIndicators.length) {
        this.towers[i].massa = this.listIndicators[i].value;
        this.towers[i].title = this.listIndicators[i].title;
        this.towers[i].percent = Math.round(100 * this.listIndicators[i].value / (this.listIndicators[i].maxValue -
          this.listIndicators[i].minValue));
        if (this.listIndicators[i].value >= this.listIndicators[i].minValue &&
          this.listIndicators[i].value <= this.listIndicators[i].maxValue) {
          this.towers[i].percentline = 'st828';
          this.towers[i].massaline = 'st828';
        } else {
          this.towers[i].percentline = 'stred';
          this.towers[i].massaline = 'stred';
        }
      }
//      this.towers[i].y = 229;
      if ( this.towers[i].percent > 100 ) {
        this.towers[i].height = Math.round(100 * 396.3 / 100);
      } else {
        this.towers[i].height = Math.round(this.towers[i].percent * 396.3 / 100);
      }
//      this.towers[i].height = Math.round(this.towers[i].percent * 396.3 / 100);
      this.towers[i].y = 625.3 - this.towers[i].height;
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
