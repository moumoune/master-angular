import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil/profil.component';



@NgModule({
  declarations: [
    ProfilComponent
  ],
  imports: [
    SharedModule,
    ProfilRoutingModule
  ]
})
export class ProfilModule { }
