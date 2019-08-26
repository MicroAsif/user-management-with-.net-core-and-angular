import { NgModule } from '@angular/core';
import { ConfirmEqualValidatorDirective } from './_directive/ConfirmEqualValidator.directive';


@NgModule({
   declarations: [
      ConfirmEqualValidatorDirective
   ],
   exports: [
      ConfirmEqualValidatorDirective
   ],
   imports: [
     
   ],
  
})
export class SharedModule { }
