import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentVisibilityService {
  private isVisibleSubject = new BehaviorSubject<boolean>(true);
  isVisible$ = this.isVisibleSubject.asObservable();

  hideComponent() {
    this.isVisibleSubject.next(false);
  }

  showComponent() {
    this.isVisibleSubject.next(true);
  }
}
