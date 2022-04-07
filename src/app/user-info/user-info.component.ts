import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase from 'firebase/compat/app';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(public auth : AngularFireAuth){
  }
  connexion (){ 
   this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
 } 
 deconnexion(){ 
 this.auth.signOut()
 }

  ngOnInit(): void {
  }

}
