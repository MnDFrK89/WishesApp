import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from './explore-container.component';
import { FinishedPipeModule } from '../pipes/finished-pipe/finished-pipe.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule,FinishedPipeModule],
  declarations: [ExploreContainerComponent],
  exports: [ExploreContainerComponent],
})
export class ExploreContainerComponentModule {}
