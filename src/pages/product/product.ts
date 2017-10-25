import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductService } from '../../app/service/product.service';
import { Product } from '../../app/models/product';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  products: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private productService: ProductService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  ngOnInit() {
  //   this.productService.getProducts().subscribe ( (products: Product[]) => {
  //     console.log('products ', products);
  //    this.products = products;
  //  });

 this.productService.getProductsOfflineMy().then ( (results: any) => {
    console.log('results ', results.rows.length);
    for(var i = 0 ; i< results.rows.length; i++) {
      console.log(results.rows.item(i).id)
      console.log(results.rows.item(i).name)
      let product = {
        id: results.rows.item(i).id,
        name: results.rows.item(i).name
    };
    this.products.push(product);
    };
    
})
.catch( (error: any) => {
    console.log("select failed ", error.message);
});;
 }

}
