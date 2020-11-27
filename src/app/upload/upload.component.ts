import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  isSubmitted = false;
  public fileToUpload: File = null;

  constructor(private _uploadService: UploadService) { }

  ngOnInit(): void {
  }

  setInputFile(files: FileList) {
    this.fileToUpload = files.item(0);
    
}

onSubmit(form: NgForm) {
  this.isSubmitted = true;
  if(!form.valid || !this.fileToUpload) {
    return false;
  }
  this.isSubmitted = false;
  this._uploadService.sendFile(this.fileToUpload);
}

}
