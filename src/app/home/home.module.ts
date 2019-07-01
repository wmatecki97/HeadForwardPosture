import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
  providers:[DeviceMotion, Vibration,BackgroundMode,LocalNotifications
    ]
})
export class HomePageModule {}
