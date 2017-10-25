import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  address: any = {};


  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
    console.log(this.navParams.data);
    console.log(this.navParams.get);

    this.address = this.navParams.data['address'];
  }

  next() {
    this.navCtrl.push(AddressPage, {address: {city: 'Mysore', state: 'karnataka'}});
  }

  backAll() {

// going to very first page
 this.navCtrl.popToRoot();

  }

  back() {
    // one level back
    this.navCtrl.pop({animate: true, direction: 'right-to-left'});

    
    // this.navCtrl.pop({ status: {value: 'checked address'});
  }
}
