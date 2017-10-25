import { Injectable } from '@angular/core';

 
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const environment = {
    //for browser
    // apiEndPoint: 'http://localhost:7070',
    //for android emulator
    apiEndPoint: 'http://10.0.2.2:7070'
}

@Injectable()
export class ProductService {

    db: SQLiteObject;

  constructor(private http: Http, private sqlite: SQLite) {

   }


  createDB() {
    this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
            this.db = db;
      
          db.executeSql('create table if not exists products(id INTEGER, name VARCHAR(256))', {})
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log('Error in table creation ', e));
      
        })
        .catch(e => console.log(e));
  }
  
  sync() {
      this.getProducts().subscribe( (products: Product[]) => {
          products.forEach((product) => {
              let query = `
              insert into products(id, name) values(${product.id}, '${product.name}');
              `
              this.db.executeSql(query, {}).then(() => console.log('inserted Query', product.id))
                                            .catch(e => console.log('Error in inserting ', e))        

          });
      });
  }


  getProductsOfflineMy(): Promise<any> {
    return this.db.executeSql("select * from products", {});
  }

  getProductsOffline() {
    console.log("read data offline");

  this.db.executeSql("select * from products", {})
   .then ( (results: any) => {
       console.log('results ', results.rows.length);
       console.log(Object.keys(results));
        
       
       for(var i = 0; i < results.rows.length; i++) {
           

           console.log(results.rows.item(i).id);
            console.log(results.rows.item(i).name);

            let product = {
                id: results.rows.item(i).id,
                name: results.rows.item(i).name
            };
       }
   })
   .catch( (error: any) => {
       console.log("select failed ", error);
   });
}
 
  getProducts(): Observable<Product[]> {
     return this.http.get(environment.apiEndPoint + 
                         '/api/products')
            .map ( (response: Response) => {
              //convert & return response to json array
               return response.json();
            });
                         
  }
 

 getProduct(id: number): Observable<Product> {
  return this.http.get(environment.apiEndPoint + 
                      '/api/products/' + id)
         .map ( (response: Response) => {
           //convert & return response to json object
            return response.json();
         });
                      
}


    //PUT /api/products/1
    //Content-Type: application/json
    //{{data}}
    saveProduct(product: Product) {
      let headers: Headers = new Headers({
          "Content-Type": "application/json"
      })

      let requestOptions = new RequestOptions({
          'headers': headers
      });

      let jsonDataText = JSON.stringify(product);

      if (product.id) {
          //PUT /api/products/1
          return this.http.put(environment.apiEndPoint + "/api/products/" + product.id,
              jsonDataText,
              requestOptions
          )
          .map( (response : Response ) => response.json());
      } else {
          //POST /api/products
          return this.http.post(environment.apiEndPoint + "/api/products",
              jsonDataText,
              requestOptions
          )
          .map( (response : Response ) => response.json())
      }
  }

  deleteProduct(id: any) {
      return this.http.delete(environment.apiEndPoint + "/api/products/" + id)
             .map( (response : Response ) => response.json())
  }

  searchProducts(q: string)   {
       return this.http
              .get(environment.apiEndPoint + "/api/products?q=" + q)
              .map( (response: Response) => response.json())
  }



}
