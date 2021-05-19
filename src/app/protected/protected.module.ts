import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProtectedRoutingModule } from './protected-routing.module';
import { WorkdayModule } from './workday/workday.module';
import { ProtectedComponent } from './protected.component';


@NgModule({
  declarations: [
    ProtectedComponent
  ],
  imports: [
    SharedModule,
    ProtectedRoutingModule,
    WorkdayModule
  ]
})
export class ProtectedModule { }
