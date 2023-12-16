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
  public finishedTask:number=-0;
  public isInputError:boolean=false

  public constructor(private formBuilder: FormBuilder) {
    this.toDoListForm = this.formBuilder.group({
      taskName: ['', Validators.required]
    })
  }

  /** 
   * Method to add new task 
   */
  public addTask() {
    const taskName = document.querySelector('.task-item');
    taskName?.classList.toggle('show-delay');
  
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

// Below 2 methods need modification in logic, behaviour is slight incorrect to show completed and total tasks
   /**
   * Method to delete task
   */
   public deleteTask(index: number) {
    // Adjusting the logic to update finishedTask and totalTasks
    if (this.finishedTask > 0) {
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
    if (!ele[index].classList.contains('active')) {
      this.finishedTask++;
    } else {
      this.finishedTask--;
    }
    ele[index].classList.toggle('active');
  }
}






