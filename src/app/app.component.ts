import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem, TodolistService, TodoList } from './todolist.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'l3m-tpX-todolist-angular-y2022';
   constructor(public TDL:TodolistService){
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

}
