import { Injectable } from '@angular/core';
import{ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

 
  constructor(private toastr:ToastrService) { }
  // Showsuccess(title:any,message:any){
  //   this.toastr.success(message,title);
  // }
  Showsuccess(message:any){
      this.toastr.success(message);
    }    
  Showerror(message:any){
      this.toastr.error(message);
    }
  Showwarning(message:any){
      this.toastr.warning(message);
    }
  Showinfo(message:any){
      this.toastr.info(message);
    }
}
