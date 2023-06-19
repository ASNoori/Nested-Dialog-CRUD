import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from '../services/notifier.service';
import { UserService } from '../services/user.service';
import { UserDetailModel } from './userdetail';
import { ConfirmdialogService } from '../services/confirmdialog.service';
import { UserdetaildialogComponent } from '../userdetaildialog/userdetaildialog.component';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
})
export class UserdetailComponent implements OnInit {
  displayedColumns: string[] = [
    'education',
    'profession',
    'experience',
    'gender','action'
  ];
  UserDetail: any = [];
  userdetailform!: FormGroup;
  userform: any;
  username!: string;
  userid: any;
  UserDetailModelObj: UserDetailModel = new UserDetailModel();
  userformname: any;
  UserData: any;
  UserDetails: any = [];
  msg: any;

  constructor(
    private fb: FormBuilder,
    public dialogref: MatDialogRef<UserdetailComponent>,
    @Inject(MAT_DIALOG_DATA) public addDetail: any,
    public dialog: MatDialog,
    private userapi: UserService,
    public toast: NotifierService,
    private confirmdialog: ConfirmdialogService
  ) {
    dialogref.disableClose = true;
  }

  ngOnInit(): void {
    this.getuserdetail();
    //  this.getuserdetailbyuserid(this.addDetail.id);

    
    console.log(this.addDetail.id);
    this.userdetailform = this.fb.group({
      education: new FormControl('', [Validators.required]),
      profession: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      additional: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
    });
    if (this.addDetail) {
      this.username = this.addDetail.name;
      this.userid = this.addDetail.id;

      // this.userdetailform.controls['name'].setValue(this.addDetail.id);
    }
  }
  onClose() {
    this.dialogref.close();
  }
  adduserdetail() {
    this.UserDetailModelObj = this.userdetailform.value;
    console.log(this.UserDetailModelObj);
    this.UserDetailModelObj.userid = this.userid;
    this.UserDetailModelObj.username = this.username;

    console.log(this.UserDetailModelObj);

    this.userapi.Adduserdetail(this.UserDetailModelObj).subscribe(
      (res) => {
        if (this.userdetailform.valid) {
          console.log(res);
          this.toast.Showsuccess('User detail Added Successfully');

          this.userdetailform.reset();
          // this.dialogref.close('save')
          this.getuserdetail();
        }
      },
      (err) => {
        this.toast.Showerror('Something went wrong');
        console.log(err);
      }
    );
  }
 
  getuserdetail() {
    this.userapi.Getuserdetail().subscribe((res) => {
      this.UserDetail = res;
      console.log(this.UserDetail.length);
  
    let userdetfilter_array = this.UserDetail.filter((value:any) => {
      return value.userid == this.userid });
  
  console.log(userdetfilter_array);
  this.UserDetail = userdetfilter_array;
    });
    console.log(this.UserDetail);
  }
  yesNoDialog(id: number,element:any) {
    this.confirmdialog
      .confirmDialog({
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete'+' '+ element.education+'?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((yes) => {
        if (yes) {
          console.log('The user said YES');
          this.userapi.deleteUserdetail(id).subscribe((res) => {
            console.log(res);
            this.toast.Showsuccess('User Deleted Successfully');
            this.getuserdetail();
          });
        }
      });
  }

  editUserdetail(element: any) {
    this.dialog.open(UserdetaildialogComponent, {
      width: '30%',
      data: element,
    });
  }
}
