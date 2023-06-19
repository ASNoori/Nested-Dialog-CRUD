import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { UserdialogComponent } from './userdialog/userdialog.component';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { ToastrModule } from 'ngx-toastr';
import { UserdetaildialogComponent } from './userdetaildialog/userdetaildialog.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserdialogComponent,
    ConfirmdialogComponent,
    UserdetailComponent,
    UserdetaildialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates:true,
      timeOut:10000
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
