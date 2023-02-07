import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User, UserLogin } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged = false;
  loginChange$ = new ReplaySubject<boolean>(1);

  constructor(private readonly http: HttpClient) {}

  login(userLogin :UserLogin): Observable<void>{
    this.http.post(`${SERVER}/auth/login`, userLogin);
    this.logged = true;
    //emit true within loginChange$
  }

  logout(){
    //remove token from local
    this.logged = false;
    //emit false within loginChange$
  }

  tokenCheck():boolean{
    let hasToken = false;

    if(localStorage.getItem("token")!==""){
      hasToken = true;
    }

    return hasToken;
  }

  isLogged(): Observable<boolean>{
    if(!this.logged && !this.tokenCheck()){
      //return observable false
    } else if (!this.logged && this.tokenCheck()){
      if (/* call to auth validate and all is okay */){
        //return observable true
        this.logged = true;
        //emit true value with loginChange$
      } else {
        //return observable false
        //remove token from local storage
      }
    } else{
      //return observable true
    }
  }


}
