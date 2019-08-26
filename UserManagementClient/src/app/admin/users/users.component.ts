import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;
  constructor(private authService: AuthService) { 
    this.getAllUsers();
  }

  ngOnInit() {
  }

  getAllUsers(){
    this.authService.getAllUser().subscribe(data => {
      console.log(data);
      this.users = data;
    })
  }

}
