import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any={};
  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(user){
    var model = {
      email : user.email, 
      password : user.password
    }
    console.log(model);
    //console.log(this.model);
     this.authService.login(model).subscribe(data => {
        // this.alertify.success("Login success!");
     }, error => {
       console.log(error);
     }, ()=> {
       this.router.navigate(['/dashboard']);
     });
  }


}
