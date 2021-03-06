import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientService } from './services/http-client.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorsService } from './services/interceptors.service';


@NgModule({
  declarations: [
    AppComponent,
    TodosListComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [HttpClientService,HttpClient,AuthService,{
    provide: HTTP_INTERCEPTORS, 
    useClass: InterceptorsService, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
