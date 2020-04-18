import { Component, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { ChildComponent } from './child/child.component';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  counter = 0;
  private childDestroy$$ = new Subject();
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  openChildInNewWindow() {
    // 1. resolve
    const childRef = this.resolver
        .resolveComponentFactory(ChildComponent)
        .create(this.injector);
    
      // 2. Attach component to the appRef so that it's inside the ng component tree
      this.appRef.attachView(childRef.hostView);
    
      // 3. Get DOM element from component
      const domElem = (childRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
    
      // 4. Append DOM element to the body
      const modal = window.open('', 'modal');
      modal.document.body.appendChild(domElem);

      childRef.instance.increase
        .pipe(takeUntil(this.childDestroy$$))
        .subscribe(() => this.counter++);

      // 5. Destroy component on window unload
      modal.addEventListener('beforeunload', e => {
        childRef.destroy();
        this.childDestroy$$.next(true)
      })
  }
}
