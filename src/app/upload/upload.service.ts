import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  sendFile(file: File) {
    console.log("Fichier envoyé");
  }
}
