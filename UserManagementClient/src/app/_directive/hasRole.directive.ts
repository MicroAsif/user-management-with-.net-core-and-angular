import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';


@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
 

  @Input() appHasRole : string[];
  isVisible = false; 
  constructor(private viewContainerRef : ViewContainerRef, private templteRef:TemplateRef<any>,
              private auth: AuthService) { }

  ngOnInit(): void {
   const userRoles = this.auth.currentUserRoles(); 
   if (!userRoles){
     this.viewContainerRef.clear();
   }

   if (this.auth.roleMatch(this.appHasRole)){
      this.isVisible = true;
      this.viewContainerRef.createEmbeddedView(this.templteRef)
   }
   else{
     this.isVisible = false; 
     this.viewContainerRef.clear();
   }


  }

}
