import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user:any= {};
  constructor(private authService: AuthService, private router:Router) { 
    this.user.role = "";
  }

  ngOnInit() {
  }
  saveUser(){
    this.authService.register(this.user).subscribe(data => {
      this.router.navigate(['/users']);
    });
  }

}
