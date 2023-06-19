import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from '../services/notifier.service';
import { UserService } from '../services/user.service';
import { UserDetailModel } from '../userdetail/userdetail';

@Component({
  selector: 'app-userdetaildialog',
  templateUrl: './userdetaildialog.component.html',
  styleUrls: ['./userdetaildialog.component.css']
})
export class UserdetaildialogComponent implements OnInit {
  userdetailform!: FormGroup;
  UserDetailModelObj: UserDetailModel = new UserDetailModel();
  UserdetailData: any;
  username: any;
  userid: any;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    public dialogref: MatDialogRef<UserdetaildialogComponent>,
    private userapi:UserService,
    private http: HttpClient,
    public toast:NotifierService
  ) {
    dialogref.disableClose = true;
  }
  ngOnInit(): void {
      
    this.userdetailform = this.fb.group({
      education: new FormControl('', [Validators.required]),
      profession: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      additional: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
    });
    if (this.editUser) {
      this.userdetailform.controls['education'].setValue(this.editUser.education);
      this.userdetailform.controls['profession'].setValue(this.editUser.profession);
      this.userdetailform.controls['experience'].setValue(this.editUser.experience);
      this.userdetailform.controls['additional'].setValue(this.editUser.additional);
      this.userdetailform.controls['gender'].setValue(this.editUser.gender);
      this.userdetailform.value.userid=this.editUser.userid;
    }
    console.log(this.userdetailform.value)

    this.getUserdetail();
  }
  onClose() {
    this.dialogref.close();

  } 
  updateUser() {
  
    console.log(this.userdetailform.value)
    this.userdetailform.value.userid=this.editUser.userid;
    console.log(this.userdetailform.value)

    this.userapi.putUserdetail( this.userdetailform.value, this.editUser.id).subscribe(
      (res) => {
        console.log(res); 
        this.toast.Showsuccess('User detail Updated succesfully');
        window.location.reload();
        this.userdetailform.reset();
        this.dialogref.close('update'); 
        this.getUserdetail();
      },
      (err) => {
        this.toast.Showerror('Something went wrong');
        console.log(err);
      }  
    );

  }
  
getUserdetail(){
  this.userapi.getuserdetail().subscribe((res) => (
        this.UserdetailData = res
    ));
  }

}
