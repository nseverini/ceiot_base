import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { ErrorComponent } from './components/error/error.component';



@NgModule({
  declarations: [
    LayoutComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
