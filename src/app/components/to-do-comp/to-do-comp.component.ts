import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-do-comp',
  templateUrl: './to-do-comp.component.html',
  styleUrls: ['./to-do-comp.component.css']
})
export class ToDoCompComponent {
  public taskList: string[] = []
  public deletedTaskList: string[] = []
  public toDoListForm: FormGroup = new FormGroup({});
  public totalTasks: number = 0;
  public finishedTask: number = -0;
  public isInputError: boolean = false;
  public tasksCompleted: boolean = false;
  public dashOffset: string = '125, 125'; // Initially set to open loop

  public constructor(private formBuilder: FormBuilder) {
    this.toDoListForm = this.formBuilder.group({
      taskName: ['', Validators.required]
    })
  }

  /** 
   * Method to add new task 
   */
  public addTask() {
    if (!this.toDoListForm.valid) {
      this.isInputError = true;
    } else {
      this.isInputError = false;
      this.taskList.push(this.toDoListForm.controls['taskName'].value);
      this.totalTasks = this.taskList.length;
      console.log(this.taskList);

      setTimeout(() => {
        const listItems = document.querySelector('.list-items');

        if (listItems) {
          const newTaskItem = listItems.lastElementChild as HTMLElement | null;

          if (newTaskItem) {
            // Triggering a reflow to ensure the transition starts
            // by accessing the computed style property
            newTaskItem.style.opacity = '1';
            getComputedStyle(newTaskItem).opacity;
            newTaskItem.style.opacity = '1';
          }
        }
      }, 100);
    }
  }

  /**
  * Method to delete task
  */
  public deleteTask(index: number) {
    const ele = document.getElementsByClassName('task-name');
    if (this.finishedTask > 0 && ele[index].classList.contains('active')) {
      this.finishedTask--;
    }
    this.totalTasks--;
    this.taskList.splice(index, 1);
  }

  /**
   * Method to strike out finished task
   * @param index 
   */
  public strikeOut(index: number) {
    const ele = document.getElementsByClassName('task-name');
    // Toggle the 'active' class
    ele[index].classList.toggle('active');
    // Update tasksCompleted based on finishedTask and totalTasks
    this.finishedTask = document.querySelectorAll('.task-name.active').length;
    this.tasksCompleted = this.finishedTask === this.totalTasks;
    this.dashOffset = '0, 125'; // Full circle when all tasks are completed
  }
}






