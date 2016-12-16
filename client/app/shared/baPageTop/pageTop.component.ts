import { Component, ViewEncapsulation } from '@angular/core';

import { GlobalState } from '../../global.state';

@Component({
  moduleId: module.id,
  selector: 'page-top',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'pageTop.component.html',
  styleUrls: ['pageTop.component.css']
})

export class PageTopComponent {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
      this.isMenuCollapsed = false;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled: any) {
    this.isScrolled = isScrolled;
  }
}
