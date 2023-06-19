import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from '../services/notifier.service';
import { UserService } from '../services/user.service';
import { UserModel } from '../user/user';

@Component({
  selector: 'app-userdialog',
  templateUrl: './userdialog.component.html',
  styleUrls: ['./userdialog.component.css'],
})
export class UserdialogComponent implements OnInit {
  userform!: FormGroup;
  UserModelObj: UserModel = new UserModel();
  UserData: any=[];
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editProduct: any,
    public dialogref: MatDialogRef<UserdialogComponent>,
    private userapi:UserService,
    private http: HttpClient,
    public toast:NotifierService
  ) {
    dialogref.disableClose = true;
  }

  ngOnInit(): void {
    
    this.userform = this.fb.group({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      mobile: new FormControl('',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      address: new FormControl(),
    });
    if (this.editProduct) {
      this.userform.controls['name'].setValue(this.editProduct.name);
      this.userform.controls['email'].setValue(this.editProduct.email);
      this.userform.controls['mobile'].setValue(this.editProduct.mobile);
      this.userform.controls['address'].setValue(this.editProduct.address);
    }
    this.getUser();
  }
  onClose() {
    this.dialogref.close();

  } 
  // postproductDetails() {
  //   if (!this.editProduct) {
    
  //     this.UserModelObj = this.userform.value;
      
  //     if (!this.userform.valid) {
  //       return;
  //     }

  //     this.userapi.Adduser(this.UserModelObj).subscribe(
  //       (res) => {
  //         console.log(res);
  //         // alert('Product Added Successfully');
  //         // this.toast.Showsuccess('Product Added succesfully')
  //         this.userform.reset();
  //         this.dialogref.close('Save');
         
  //       },
  //       (err) => {
  //         // alert('Something went wrong');
  //         // this.toast.Showerror('Something went wrong')
  //         console.log(err);
  //       }
  //     );
  //     }
  //   else {
  //     this.updateUser();
  //   }
  // }
  updateUser() {
    console.log(this.getUser())
    this.userapi.putUser(this.userform.value, this.editProduct.id).subscribe(
      (res) => {
        console.log(res); 
        this.toast.Showsuccess('User Updated succesfully');
        window.location.reload();
        this.userform.reset();
        this.dialogref.close('update');
        console.log(this.getUser())

        
      },
      (err) => {
        this.toast.Showerror('Something went wrong');
        console.log(err);
      }
      
    );

  }
  
getUser(){
  this.userapi.Getuser().subscribe((res) => (
        this.UserData = res
    ));
  }

}
