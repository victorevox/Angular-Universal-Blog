import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// var imageProfile = require("./../../../../assets/img/profile-placeholder.jpg");
import { FileUploader } from 'ng2-file-upload';
// import { AuthenticationService } from './../../../services';
import { AuthenticationService } from "@app/services";
import { AlertsService } from '@app/services/alerts.service';
import { IUser } from '@shared/interfaces/user.interface';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user-image-profile',
  templateUrl: './user-image-profile.component.html',
  styleUrls: ['user-image-profile.component.scss']
})
export class UserImageProfileComponent implements OnInit, AfterViewInit {

  @ViewChild('filePicker') filePicker: ElementRef;
  public imageSrc: string = ''/* imageProfile */;
  public defaultSource: string = 'assets/img/profile-placeholder.jpg';
  public readyToUpload = false;
  public get user() {
    return this._authService.getUser();
  }
  public uploader = new FileUploader({authToken: this._authService.getToken(), url: '/api/user', headers: [{name: "X-HTTP-Method-Override", value: "PUT"}] });
  private _file: File = null;

  // public uploader:FileUploader = new FileUploader({url: URL});

  constructor(private _authService: AuthenticationService, private _alerts: AlertsService, private _notifications: NotificationsService) {

  }

  ngOnInit() {
    this.imageSrc = this.user.profileImg;
    console.log(this.defaultSource)
    this.imageSrc = this.imageSrc ? this.imageSrc : this.defaultSource;
    this.filePicker.nativeElement.onchange = (event) => {
      this.fileChange(event);
    }
  }

  ngAfterViewInit() {
  }

  upload($event) {
    console.log("Uploading");
    if(this._file) {
      this.uploader.addToQueue([this._file]);
      setInterval(() => {
        console.log(this.uploader.progress);
      },400);
      this.uploader.uploadAll();
      this.uploader.response.subscribe((response: string) => {
        try {
          let res = <IimageUpdateResponse>JSON.parse(response);
          if(res.token && res.user) {
            this._authService.saveToken(res.token);
            this.imageSrc = res.user.profileImg;
            this._notifications.success("Image updated", "Your profile's image was updated successfully");
          }
        } catch (error) {
          console.error(error);
          this._notifications.error("Error", "Something went wrong while updating your profile's image");
        }
      })
    }
  }

  removeImage() {
    this.imageSrc = this.defaultSource;
    this.readyToUpload = false;
  }

  showImagePicker() {
    // Check for the various File API support.
    // if (window.File && window.FileReader && window.FileList && window.Blob) {
    //   // Great success! All the File APIs are supported.
    // } else {
    //   alert('The File APIs are not fully supported in this browser.');
    // }
  }

  check_multifile_logo(file) {
    var extension;
    if(file.substr) {
      extension = file.substr((file.lastIndexOf('.') + 1))
    } else {
      extension = file.type.substr((file.type.lastIndexOf('/') + 1))
    }
    if (extension === 'jpg' || extension === 'jpeg' || extension === 'gif' || extension === 'png' /* || extension === 'bmp' */) {
      return true;
    } else {
      return false;
    }
  }

  fileChange(event) {
    console.log(event);
    try {
      let files = this.filePicker.nativeElement.files;
      let file = files[0];
      if(this.check_multifile_logo(file)) {
        if (file && FileReader) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          this._file = file;
          reader.onload = (e) => {
            let r: any = <any>e.target;
            r = r.result;
            if (r) {
              this.imageSrc = r;
              this.readyToUpload = true;
            }
          };
        }
      } else {
        this._alerts.create("error", "File type not supported", "Sorry!");
      }
    } catch (err) {
      console.log(err);
    }
  }

}


export interface IimageUpdateResponse {
  message: string;
  token: string;
  user: IUser
}