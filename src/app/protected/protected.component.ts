import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'al-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {
  isSidenavCollapsed: boolean;
  private subscription: Subscription;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.subscription = this.layoutService.isSidenavCollapsed$.subscribe(isSidenavCollapsed => this.isSidenavCollapsed = isSidenavCollapsed);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
   }
}
