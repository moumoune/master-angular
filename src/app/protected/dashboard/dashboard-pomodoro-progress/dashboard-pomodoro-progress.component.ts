import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'al-dashboard-pomodoro-progress',
  templateUrl: './dashboard-pomodoro-progress.component.html',
  styleUrls: ['./dashboard-pomodoro-progress.component.scss']
})
export class DashboardPomodoroProgressComponent implements OnInit {

  currentProgress: number;
  percentage: number;
  
  @Input()
  set progress(progress: number) {
   this.currentProgress = progress;
   this.computePercentage();
  }

  @Input() maxProgress: number;

  constructor() { }

  ngOnInit(): void {
  }

  computePercentage() {
    if(!this.currentProgress || !this.maxProgress) {
     this.percentage = 0;
     return;
    }
    this.percentage = Math.floor(this.currentProgress/this.maxProgress * 100);
  }

}
