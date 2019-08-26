import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  roles:any = []; 
  userName:any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    var roles = this.authService.currentUserRoles();
    if (Array.isArray(roles))
      this.roles = roles;
    else 
      this.roles.push(roles);
    

    console.log(this.roles.length);
    this.userName = this.authService.currentUserName();

  }
  

}
