import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { ErrorComponent } from './core/components/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'devices',
        loadChildren: () =>
          import('./features/devices/devices.module').then(
            (m) => m.DevicesModule
          ),
      },
      {
        path: 'error/:code',
        component: ErrorComponent,
      },
      { path: '**', redirectTo: '/error/404' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
