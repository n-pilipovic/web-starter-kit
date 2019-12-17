import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule, DropdownModule, InputSwitchModule, ToolbarModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

const angularModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
];

const primengModules = [
  ChartModule,
  EditorModule,
  TableModule,
  InputTextModule,
  ButtonModule,
  ToolbarModule,
  DropdownModule,
  InputSwitchModule,
  CalendarModule,
  ToastModule
];

@NgModule({
  imports: [
    ...angularModules,

    // PrimeNG modules
    ...primengModules
  ],
  exports: [
    ...angularModules,
    ...primengModules
  ]
})
export class UiSharedModule {}