import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { TodolistService } from '../todolist.service';
import { TodoList,TodoItem } from '../todolist.service';

type FctFilter = (item: TodoItem) => boolean;
interface TodoListPlus extends TodoList {
  remaining: number;
  filter: FctFilter;
  displayedItems: readonly TodoItem[];
  allDone: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() data!: TodoList;

  readonly fAll: FctFilter = () => true;
  readonly fCompleted: FctFilter = (item) => item.isDone;
  readonly fActive: FctFilter = (item) => !item.isDone;

  private fc = new BehaviorSubject<FctFilter>(this.fAll);

  readonly tdlObs: Observable<TodoListPlus>;

  constructor(public tdls: TodolistService) { this.tdlObs = combineLatest([tdls.observable, this.fc]).pipe(
    map( ([L, f]) => ({
      ...L, // je recopie ma TodoList
      remaining: L.items.reduce( (nb, item) => item.isDone ? nb : nb + 1, 0),
      filter: f,
      displayedItems: L.items.filter(f),
      // allDone: !L.items.find( it => !it.isDone ),
    }) ),
    map( inter => ({
      ...inter,
      allDone: inter.remaining === 0
    }) )
  );
}
setFilter(f: FctFilter): void {
  this.fc.next(f);
}
updateAllDone(done: boolean, L: readonly TodoItem[]): void {
  this.update({isDone: done},...L); //update all items as done
  //utilisation d'un booleen en parametre et non pas juste "true" pour pouvoir décocher aussi
}

supprimerAllDone(L: readonly TodoItem[]): void {
  let completedItems = L.filter(this.fCompleted);
  completedItems.map(item => this.remove(item));
  //supprimer all the done items
}
  ngOnInit(): void {
  }
  get obsTodolist(): Observable<TodoList>{
    return this.tdls.observable
  } 
  create(label : string): void {
    this.tdls.create(label)
  }
  
  updateItem(item: TodoItem, u: Partial<TodoItem>) : void{
    this.tdls.update(u,item)
  }
  remove(item : TodoItem) : void{
    this.tdls.delete(item)
  }
  update(up: Partial<TodoItem>, ...items: TodoItem[]): void {
    this.tdls.update(up, ...items);
  }
  trackById(id:number,item : TodoItem){
return item.id
  }

}
