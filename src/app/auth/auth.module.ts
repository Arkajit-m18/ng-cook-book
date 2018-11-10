import { NgModule } from "@angular/core";

import { AuthRoutingModule } from "./auth-routing.module";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule
  ]
})

export class AuthModule {
}
