import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'al-workday-form-tasks',
  templateUrl: './workday-form-tasks.component.html',
  styles: []
})
export class WorkdayFormTasksComponent implements OnInit {

  @Input() tasks: FormArray;
  @Input() workdayForm: FormGroup;

  taskControlList: FormGroup[];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskControlList = this.tasks.controls as FormGroup[];
  }

  createTaskForm(): FormGroup {
    const taskForm: FormGroup = this.fb.group({
     'title': ['', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(150)
     ]],
     'todo': [1, [
      Validators.required,
      Validators.min(1),
      Validators.max(5)
     ]],
     'done': 0
    });

    return taskForm;
   }

  onAddedTask() {
    const task: FormGroup = this.createTaskForm();
    this.tasks.push(task);
   }

   onRemovedTask(index: number) {
    this.tasks.removeAt(index);
   }

}
