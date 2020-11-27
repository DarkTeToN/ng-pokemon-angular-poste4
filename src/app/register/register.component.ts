import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { RegisterService } from './register.service';
import { UserInfo } from './user-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  userInfoList: any;

  constructor(
    private formBuilder: FormBuilder,
    private _registerService: RegisterService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9àéèç]{1,25}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this._registerService.getAll().snapshotChanges().pipe(map(items => {
      return items.map(a => {
        // Firebase met la key a part dans la liste...
        // Donc il faut remapper l'objet avec la clé
        const data = a.payload.val();
        const key = a.payload.key;
        return  { key, ...data }
      })
    })).subscribe(data => this.userInfoList = data);
  }

  get form() { return this.registerForm.controls }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    var userInfos = new UserInfo();
    userInfos = {
      ...this.registerForm.value
    };
    this._registerService.create(userInfos).then(() => {
      console.log('Utilisateur créé');
      this.submitted = false;
    }
    );
  }

}
