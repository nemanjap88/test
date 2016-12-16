import { Component } from '@angular/core';
import { Config } from './shared/index';
import './operators';
import { GlobalState } from './global.state';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState) {
    console.log('Environment config', Config);

    this._state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }
}
