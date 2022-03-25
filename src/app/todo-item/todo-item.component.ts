import { Component, OnInit, ChangeDetectionStrategy,EventEmitter } from '@angular/core';
import { TodoListComponent, } from '../todo-list/todo-list.component';
import { TodoItem } from '../todolist.service';
import { TodoList } from '../todolist.service';
import { Input,Output } from '@angular/core';
import { TodolistService } from '../todolist.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() data!:TodoItem;
  @Output() remove = new EventEmitter<TodoItem>()
  @Output() update = new EventEmitter<Partial<TodoItem>>();
  constructor(public tdls : TodolistService) { }

  ngOnInit(): void {
  }
cocher =false;
  supprime(elel: TodoItem){
    this.remove.emit(this.data)
  }
  updateItem(item: TodoItem, u: Partial<TodoItem>){
    this.update.emit(u);
  }
  cotcher(){
    this.cocher=true;
  }
  create(label : string): void {
    this.tdls.create(label)
  }

}
