import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AlertComponent } from './components/alert/alert.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [AlertComponent, ConfirmationComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [AlertComponent, ConfirmationComponent],
})
export class SharedModule {}
