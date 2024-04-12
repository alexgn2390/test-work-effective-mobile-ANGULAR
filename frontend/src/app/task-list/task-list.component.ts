import {Component, OnInit} from '@angular/core';
import {TaskTypeType} from "../../types/task-type.type";
import {MatDialog} from "@angular/material/dialog";
import {TaskCardComponent} from "../task-card/task-card.component";
import {TreeNode} from "../../interfaces/tree-node-interface";
import {Router} from "@angular/router";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {
  tasksArray: TaskTypeType[] = []
  sortedTasks: TaskTypeType[] = [];
  sortingOpen = false;
  priority: string = ''

  filteredTasks: TaskTypeType[] = [];
  sortingOptions = [
    {name: 'Исполнитель', value: 'assignee'},
    {name: 'Статус', value: 'status'},
    {name: 'Приоритет', value: 'priority'},
  ];
  nodes: TreeNode[] = [
    {
      title: 'Статус',
      name: 'status',
      children: [
        { name: 'Новая', checked: false },
        { name: 'В работе', checked: false },
        { name: 'На утверждении', checked: false },
        { name: 'Завершена', checked: false },
        { name: 'Отложена', checked: false },
        { name: 'Отменена', checked: false }
      ] },
    {
      title: 'Приоритет',
      name: 'priority',
      children:
        [
          { name: 'high', checked: false },
          { name: 'medium', checked: false },
          { name: 'low', checked: false }
        ]
    },
    {
      title: 'Исполнитель',
      name: 'assignee',
      children:
        [
          { name: 'Иван', checked: false },
          { name: 'Мария', checked: false },
          { name: 'Петр', checked: false }
        ]
    }

  ];

  constructor(
              public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadTasks()
  }

  loadTasks(): void {
    const savedTasks = localStorage.getItem('userData');
    this.tasksArray = savedTasks ? JSON.parse(savedTasks) : [];
    this.filteredTasks = [...this.tasksArray];
  }

  openModalCreateTask() {
    const dialogRef = this.dialog.open(TaskCardComponent);

    dialogRef.componentInstance.taskAdded.subscribe((з) => {
      this.loadTasks();
    });
  }

  openTaskCardDialog(taskId: string, priority: string) {
    this.priority = priority
    const task = this.tasksArray.find(task => task.id === taskId);

    if (task) {
      // const dialogRef = this.dialog.open(TaskCardDialogComponent, {
      //   data: {task}
      // });
      console.log('Task to be sent:', task);

      this.router.navigate(['/task-card-dialog'], {
          queryParams: { data: JSON.stringify(task) }
        });

      // dialogRef.afterClosed().subscribe(result => {
      //   this.loadTasks();
      // });
    }
  }

  sortTasksByStatus(): void {
    this.filteredTasks.sort((a, b) => {
      const priorityA = this.getStatusValue(a.status);
      const priorityB = this.getStatusValue(b.status);
      return priorityB - priorityA;
    });
  }

  sortTasksByPriority(): void {
    this.filteredTasks.sort((a, b) => {
      const priorityA = this.getPriorityValue(a.priority);
      const priorityB = this.getPriorityValue(b.priority);

      // Сортировка по убыванию приоритета (от высокого к низкому)
      return priorityB - priorityA;
    });
  }

  sortTasksByAssignee(): void {
    this.filteredTasks.sort((a, b) => a.assignee.localeCompare(b.assignee));
  }

  sortTasks(sortBy: string): void {
    console.log(sortBy)
    switch (sortBy) {
      case 'status':
        this.sortTasksByStatus();
        break;
      case 'priority':
        this.sortTasksByPriority();
        break;
      case 'assignee':
        this.sortTasksByAssignee();
        break;
      default:
        break;
    }
  }

  getPriorityValue(priority: string): number {
    switch (priority) {
      case 'high':
        return 3;
      case 'medium':
        return 2;
      case 'low':
        return 1;
      default:
        return 0;
    }
  }

  getStatusValue(status: string): number {
    switch (status) {
      case 'Новая':
        return 6;
      case 'В работе':
        return 5;
      case 'На утверждении':
        return 4;
      case 'Завершена':
        return 3;
      case 'Отложена':
        return 2;
      case 'Отменена':
        return 1;
      default:
        return 0;
    }
  }


  toogleSorting() {
    this.sortingOpen = !this.sortingOpen;
  }

  onFilteredTasksChange(filteredTasks: TaskTypeType[]) {
    this.filteredTasks = filteredTasks;
  }

}
