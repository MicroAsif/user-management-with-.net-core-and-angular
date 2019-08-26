import { LoginGuard } from './_guard/login.guard';
import { AuthGuard } from './_guard/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from './_services/auth.service';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';
import { routes } from './app.router';
import { IndexComponent } from './index/index.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent, 
    IndexComponent
   
  
  ],
  imports: [
    BrowserModule, 
    AdminModule, 
    IndexModule, 
    RouterModule.forRoot(routes),
    //AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }, 
        whitelistedDomains:  ['localhost:18856']
      }
    })
  ],
  providers: [
    AuthService, 
    AuthGuard, 
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
