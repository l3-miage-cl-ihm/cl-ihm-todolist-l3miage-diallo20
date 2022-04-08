import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase from 'firebase/compat/app';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Output() importBase = new EventEmitter()

  constructor(public auth : AngularFireAuth){
  }
  async connexion (){ 
   await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
   this.demandedata()
 } 
 deconnexion(){ 
 this.auth.signOut()
 }

  ngOnInit(): void {
  }

demandedata(){
  this.importBase.emit()
}

}
