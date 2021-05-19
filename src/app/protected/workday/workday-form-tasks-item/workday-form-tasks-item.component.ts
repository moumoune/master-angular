import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'al-workday-form-tasks-item',
  templateUrl: './workday-form-tasks-item.component.html',
  styleUrls: ['./workday-form-tasks-item.component.scss']
})
export class WorkdayFormTasksItemComponent implements OnInit {

  @Input() task: FormGroup;
  @Input() index: number;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;

  @Output() removedTask = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  get todo() {
    return this.task.get('todo') as FormControl;
  }

  removeTask(index: number) {
    this.removedTask.emit(index);
  }

  selectTodo(todo: number) {
    this.task.patchValue({todo: todo});
   }

}