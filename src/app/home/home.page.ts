import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Component, OnInit } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { interval } from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  stillBad = false;
  timeToWait = 2000;
  x: number;
  y: number;
  z: number;

  constructor(
    private deviceMotion: DeviceMotion,
    private vibration: Vibration,
    private backgroundMode: BackgroundMode,
    private localNotifications: LocalNotifications
  ) { }


  ngOnInit(): void {
    this.RecognizePosture();
    this.backgroundMode.enable();
    interval(this.timeToWait).subscribe(tick => {
      this.getPosition();
      if (this.RecognizePosture())
        this.alarm();

    })
  }

  getPosition() {
    // Get the device current acceleration
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => {
        this.x = acceleration.x;
        this.y = acceleration.y;
        this.z = acceleration.z;
      }
    );
  }

  RecognizePosture() {
    let isBadPosture = false;
    if (this.x > 2 && this.x < 9) {
      isBadPosture = true;
    }
    if (this.y > 2 && this.y < 9) {
      isBadPosture = true;
    }

    let continues = this.stillBad;
    this.stillBad = isBadPosture;

    return isBadPosture && continues;
  }

  alarm() {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
    })
      this.vibration.vibrate([100, 100, 100, 100, 100]);
   
  }
}
