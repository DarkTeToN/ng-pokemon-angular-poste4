import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { UserInfo } from './user-info';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private dbPath = '/userinfos';
  ref: AngularFireList<UserInfo> = null;

  constructor(private db: AngularFireDatabase) {
    this.ref = db.list(this.dbPath);
  }

  getAll(): AngularFireList<UserInfo> {
    return this.ref;
  }

  create(userInfo: UserInfo) {
    return this.ref.push(userInfo);
  }

  update(key: string, value: any) {
    return this.ref.update(key, value);
  }

  delete(key: string) {
    return this.ref.remove(key);
  }
}
