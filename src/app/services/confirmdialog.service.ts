import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogData } from '../confirmdialog/confirmdialog';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmdialogService {

  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmdialogComponent, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }
}
