import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { map, catchError, } from 'rxjs/operators';

@Injectable()
export class AuthService {

    baseUrl = environment.apiUrl;
    decodedToken: any;
    constructor(private http: HttpClient) { }

    login(model: any) {
        const helper = new JwtHelperService();
        return this.http.post(this.baseUrl + 'auth/login', model, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
        })
            .pipe(map((user: any) => {
                if (user) {
                    this.decodedToken = helper.decodeToken(user.tokenString);
                    localStorage.setItem('token', user.tokenString);
                }
            }))
    }
    register(model:any){
      return this.http.post(this.baseUrl + 'auth/register', model);
    }

    getAllUser(){
      return this.http.get(this.baseUrl + 'auth/all');
    }

    loggedIn(): boolean {
        const helper = new JwtHelperService();
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        return true;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    currentUserRoles(){
        const helper = new JwtHelperService();
        var token = localStorage.getItem('token'); 
        var decodedToken = helper.decodeToken(token);
        var userRoles = decodedToken.role as Array<string>;
        return userRoles;
      }
    
      currentUserId(){
        const helper = new JwtHelperService();
        var token = localStorage.getItem('token'); 
        var decodedToken = helper.decodeToken(token);
        var userId = decodedToken.nameid;
        return userId;
      }
      currentUserName(){
        const helper = new JwtHelperService();
        var token = localStorage.getItem('token'); 
        var decodedToken = helper.decodeToken(token);
        var userName = decodedToken.email;
        return userName;
      }

      roleMatch(allowedRoles):boolean {
        let roleMatch = false;
        var userRoles = this.currentUserRoles();
        allowedRoles.forEach(element => {
          if (userRoles.includes(element)){
            roleMatch = true;
            return;
          }
        });
        return roleMatch;
      }

}

