import {Component, OnInit,} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskTypeType} from "../../types/task-type.type";


@Component({
  selector: 'app-task-card-dialog',
  templateUrl: './task-card-dialog.component.html',
  styleUrls: ['./task-card-dialog.component.scss']
})
export class TaskCardDialogComponent implements OnInit {
  data: TaskTypeType | null = null;
  taskForm = this.fb.group({
    title: [''],
    assignee: [''],
    deadline: [''],
    projects: [''],
    priority: [''],
    status: [''],
    description: ['']
  });

  assignees = [
    { id: 1, name: 'Иван' },
    { id: 2, name: 'Мария' },
    { id: 3, name: 'Петр' }
  ];

  projects = [
    { id: 1, name: 'Проект 1' },
    { id: 2, name: 'Проект 2' },
    { id: 3, name: 'Проект 3' }
  ];

  priorities = [
    { id: 1, name: 'high' },
    { id: 2, name: 'medium' },
    { id: 3, name: 'low' }
  ];

  status = [
    {id: 1, name: 'Новая'},
    {id: 2, name: 'В работе'},
    {id: 3, name: 'На утверждении'},
    {id: 4, name: 'Завершена'},
    {id: 5, name: 'Отложена'},
    {id: 6, name: 'Отменена'},
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params['data']) {
        this.data = JSON.parse(params['data']);
        if (this.data) {
          this.taskForm.patchValue({
            title: this.data.title,
            assignee: this.data.assignee,
            deadline: this.data.deadline,
            projects: this.data.projects,
            priority: this.data.priority,
            status: this.data.status,
            description: this.data.description
          });
        }

      }
    });
  }

  onCancelClick(): void {
    this.router.navigate([''],);
  }

  deleteTask(taskId: string | undefined) {
    let tasks: any[] = JSON.parse(localStorage.getItem('userData') || '[]');
    tasks = tasks.filter(task => task.id !== taskId);
    // Сохранение обновленного списка задач в LocalStorage
    localStorage.setItem('userData', JSON.stringify(tasks));
    this.router.navigate([''],);

  }

  saveTask(taskId: string | undefined) {
    if (this.taskForm.valid && taskId !== undefined) {
      // Retrieve tasks from local storage
      let tasks: TaskTypeType[] = JSON.parse(localStorage.getItem('userData') || '[]');

      // Find the index of the task to be updated
      const taskIndex = tasks.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        // Update the task in the array
        tasks[taskIndex].title = this.taskForm.value.title ?? '';
        tasks[taskIndex].assignee = this.taskForm.value.assignee ?? '';
        tasks[taskIndex].deadline = this.taskForm.value.deadline ?? '';
        tasks[taskIndex].projects = this.taskForm.value.projects ?? '';
        tasks[taskIndex].priority = this.taskForm.value.priority ?? '';
        tasks[taskIndex].status = this.taskForm.value.status ?? '';
        tasks[taskIndex].description = this.taskForm.value.description ?? '';

        // Save the updated tasks array back to local storage
        localStorage.setItem('userData', JSON.stringify(tasks));

        // Redirect to the task list page
        this.router.navigate(['']);
      }
    }
  }
}
