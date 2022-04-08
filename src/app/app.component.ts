import { Component } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { TodoItem, TodolistService, TodoList } from './todolist.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'l3m-tpX-todolist-angular-y2022';
   constructor(public TDL:TodolistService,public afs:AngularFirestore,public auth : AngularFireAuth){
     TDL.observable.subscribe(l => this.saveInBase(l))
   }

  get obsTodolist(): Observable<TodoList>{
    return this.TDL.observable
  } 
create(label : string): void {
  this.TDL.create(label)
}

updateItem(item: TodoItem, u: Partial<TodoItem>) : void{
  this.TDL.update(u,item)
}
remove(item : TodoItem) : void{
  this.TDL.delete(item)
}

// 1
async saveInBase(todolist:TodoList){
  var User = await this.auth.currentUser
  if(User !== null && User.email !== null){
    this.afs.collection<TodoList>("maliste").doc(User.email).set(todolist)

  }
}
// 2
async getBd(){
  var User = await this.auth.currentUser
  console.log("aaaa")
  var todo:TodoList | undefined;
  if(User !== null && User.email !== null){
    this.afs.collection<TodoList>("maliste").doc(User.email).get().subscribe(l => {
      todo = l.data()
      if(todo!== undefined)
        this.TDL.imporforbd(todo)
  })
 
}
}
}
