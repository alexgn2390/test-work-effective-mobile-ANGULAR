import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskTypeType} from "../../types/task-type.type";
import {TreeNode} from "../../interfaces/tree-node-interface";

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})

export class TaskFilterComponent implements OnInit {
  @Input() node: TreeNode | null  = null;
  open = false;
  filteredTasks: TaskTypeType[] = [];
  tasksArray: TaskTypeType[] = []
  @Output() filteredTasksChange: EventEmitter<TaskTypeType[]> = new EventEmitter<TaskTypeType[]>();

  ngOnInit() {
    this.loadTasks()
  }

  loadTasks(): void {
    const savedTasks = localStorage.getItem('userData');
    this.tasksArray = savedTasks ? JSON.parse(savedTasks) : [];
    this.filteredTasks = [...this.tasksArray];
    this.filteredTasksChange.emit(this.filteredTasks);
  }

  toggle(): void {
    this.open = !this.open
  }

  applyFilter(): void {
    const anyCheckboxChecked =  this.node?.children && this.node?.children.some(child => child.checked);
    if (!anyCheckboxChecked) {
      // Если ни один чекбокс не выбран, отобразить все задачи
      this.filteredTasks = [...this.tasksArray];
      this.filteredTasksChange.emit(this.filteredTasks);
      return;
    }

    this.filteredTasks = this.tasksArray.filter(task => {
      if (this.node?.children) {
        // Если хотя бы один чекбокс выбран, применяем фильтр
        return this.node.children.some(child => {
          const taskPropertyValue = task[this.node?.name as keyof TaskTypeType];
          if (typeof taskPropertyValue === 'string') {
            return child.checked && taskPropertyValue.includes(child.name);
          }
          return false;
        });
      }
      // Добавляем возврат по умолчанию для случая, когда ни один фильтр не выбран
      return true; // Возвращаем true, чтобы все задачи были отображены
    });


    this.filteredTasksChange.emit(this.filteredTasks);
  }
}
