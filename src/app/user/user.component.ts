import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
  FormGroupDirective,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';
import { UserModel } from './user';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserdialogComponent } from '../userdialog/userdialog.component';
import { ConfirmdialogService } from '../services/confirmdialog.service';
import { UserdetailComponent } from '../userdetail/userdetail.component';
import { NotifierService } from '../services/notifier.service';

// export interface UserInfo{
//   uname:string,
//   uemail:string,
//   umobile:number,
//   uaddress:string
// }
// const userinfo: UserInfo[] = [];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  // @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  displayedColumns: string[] = ['name', 'email', 'mobile', 'address', 'action'];
  UserData: any = [];
  // dataSource = new MatTableDataSource<any>(this.UserData);********
  // dataSource!:MatTableDataSource<UserInfo>
  userform!: FormGroup;
  UserModelObj: UserModel = new UserModel();
  formDirective!: FormGroupDirective;
  constructor(
    private fb: FormBuilder,
    private userapi: UserService,
    public dialog: MatDialog,
    private confirmdialog: ConfirmdialogService,
    public toast: NotifierService
  ) {}

  ngOnInit(): void {
    this.getUser();
    // this.dataSource=new MatTableDataSource(userinfo);
    this.userform = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      address: new FormControl(''),
    });
  }
  // ****** adduser(){
  //   console.log(this.userform.value.name)

  //    this.UserData.push(
  //       this.userform.value
  //     //   uname:this.userform.value.name,
  //     //   uemail:this.userform.value.email,
  //     //   umobile:this.userform.value.mobile,
  //     //  uaddress:this.userform.value.address
  //      );

  //      console.log(this.UserData)

  //    this.dataSource = new MatTableDataSource<any>(this.UserData);

  // } ***************
  addUser(formDirective: FormGroupDirective) {
    if (this.userform.valid) {
      this.UserModelObj = this.userform.value;
      this.formDirective = formDirective;
      this.userapi.Adduser(this.UserModelObj).subscribe(
        (res) => {
          if (this.userform.valid) {
            console.log(res);
            this.toast.Showsuccess('User Added Successfully');
            this.formDirective.resetForm();
            this.userform.reset();
            this.getUser();
          }
        },
        (err) => {
          this.toast.Showerror('Something went wrong');
          console.log(err);
        }
      );
    }
  }

  getUser() {
    this.userapi.Getuser().subscribe((res) => (this.UserData = res));
  }

  editUser(element: any) {
    this.dialog.open(UserdialogComponent, {
      width: '30%',
      data: element,
    });
  }
  yesNoDialog(id: number, element: any) {
    this.confirmdialog
      .confirmDialog({
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete' + ' ' + element.name + '?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((yes) => {
        if (yes) {
          console.log('The user said YES');
          this.userapi.deleteUser(id).subscribe((res) => {
            console.log(res);
            this.toast.Showsuccess('User Deleted Successfully');
            this.getUser();
          });
        }
      });
  }
  additionaldetail(id: number) {
    this.dialog.open(UserdetailComponent, {
      width: '30%',
      data: id,
    });

    console.log(id);
  }
}
