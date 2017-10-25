import { Injectable } from '@angular/core';

import {Http, Response, Headers, RequestOptions} from '@angular/http';

 
import 'rxjs/add/operator/map';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

const environment = {
    //for browser
    //apiEndPoint: 'http://localhost:7070',
    //for android emulator
    apiEndPoint: 'http://10.0.2.2:7070',
    authEndPoint: 'http://10.0.2.2:7070/oauth/token'
}

@Injectable()
export class AuthService {

  storage: SecureStorageObject;

  constructor(private http: Http,
      private secureStorage: SecureStorage  
) { 
    this.secureStorage.create('secure')
    .then((storage: SecureStorageObject) => {
        this.storage = storage;
    });
  }

  getToken() : Promise<string> {
    
    let promise:Promise<string> = new Promise( function(resolve, reject){

            this.storage.get('token')
            .then ( (token: string) => {
                resolve(token);
            })
            .catch( (error) => {
                reject(error);
            })

    });

    return promise;
  }

  

  login(username: string, password: string) {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json'
    });

    const requestOptions = new RequestOptions({
        'headers': headers
    });

    const data = {
      username: username,
      password: password
    };

  const jsonDataText = JSON.stringify(data);

   
      //POST /oauth/token
    return this.http.post(environment.authEndPoint,
        jsonDataText,
        requestOptions
    )
    .map( (response : Response ) => {
      let serverData = response.json();
      console.log(serverData);
      //todo: store token

      this.storage.set('token', serverData.token);

    });

  }
  
  logout() {
    this.storage.remove("token");
    this.storage.clear(); //clear all items
  }

}



