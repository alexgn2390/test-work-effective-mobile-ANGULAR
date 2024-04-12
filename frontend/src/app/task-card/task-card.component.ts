import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LocalStorageService} from "../services/local-storage.service";
import {MatDialogRef} from "@angular/material/dialog";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})

export class TaskCardComponent implements OnInit {
  selectedAssignees: number[] = [];
  selectedProjects: number[] = [];
  selectedPriority: number[] = [];
  selectedStatus: number[] = [];

  showDropdown: boolean = false;

  assignees = [
    {id: 1, name: 'Иван'},
    {id: 2, name: 'Мария'},
    {id: 3, name: 'Петр'},
  ];

  projects = [
    {id: 1, name: 'Проект 1'},
    {id: 2, name: 'Проект 2'},
    {id: 3, name: 'Проект 3'},
  ];

  priorities = [
    {id: 1, name: 'low'},
    {id: 2, name: 'medium'},
    {id: 3, name: 'high'},
  ];

  status = [
    {id: 1, name: 'Новая'},
    {id: 2, name: 'В работе'},
    {id: 3, name: 'На утверждении'},
    {id: 4, name: 'Завершена'},
    {id: 5, name: 'Отложена'},
    {id: 6, name: 'Отменена'},
  ];

  taskForm = this.fb.group({
    title: ['', Validators.required],
    assignee: [''],
    deadline: [''],
    projects: [''],
    priority: [''],
    status: [''],
    description: ['']
  })

  @Output() taskAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
              private localStorageService: LocalStorageService,
              public dialogRef: MatDialogRef<TaskCardComponent>) {
  }

  ngOnInit() {

  }

  createNewTask() {
    const taskId = uuidv4();
    let tasks: any[] = [];
    const localStorageData = localStorage.getItem('userData');
    if (localStorageData) {
      tasks = JSON.parse(localStorageData);
    }

    if (this.taskForm.valid) {
      const newTask = {
        id: taskId,
        title: this.taskForm.value.title,
        assignee: this.taskForm.value.assignee,
        deadline: this.taskForm.value.deadline,
        projects: this.taskForm.value.projects,
        priority: this.taskForm.value.priority,
        status: this.taskForm.value.status,
        description: this.taskForm.value.description
      }
      tasks.push(newTask);
      console.log(newTask)
      this.localStorageService.setItem('userData', tasks);
// Отправка события о добавлении задачи
      this.taskAdded.emit();

      this.dialogRef.close();
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }


}
