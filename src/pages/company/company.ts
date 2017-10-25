import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddressPage } from '../address/address';
import { Calendar } from '@ionic-native/calendar';
import { Device } from '@ionic-native/device';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProductService } from '../../app/service/product.service';
import { AuthService } from '../../app/service/auth.service';

/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {

  //navParams contains information about the navigataion
  //NavController used for navigation
  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar, private device: Device, private camera: Camera, private productService: ProductService
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyPage');

   
  }

  openCalendar() {

    this.calendar.createCalendar("mycalendar").then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );

    this.calendar.openCalendar(new Date());

  }

  showAddress1() {
    //show the address page on top of company page
    console.log("show address");
    console.log('Device UUID is: ' + this.device.uuid);
    console.log('Device Model is: ' + this.device.model);
    this.navCtrl.push(AddressPage, {address: {city:'BLR', state: 'KA'}});
    // this.navCtrl.push("tab3Root");
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  openDB() {
    this.productService.createDB();

  }

  sync() {
    this.productService.sync();
  }

  // login() {
  //   this.authService.login("admin", "admin");

  // }

  // getToken() {
  //   this.authService.getToken().then( (token: string) => {
  //     alert("token " + token);
  //   });
  // }
}
