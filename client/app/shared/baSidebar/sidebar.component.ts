import { Component, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { GlobalState } from '../../global.state';

@Component({
  moduleId: module.id,
  selector: 'sidebar-component',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public routes = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'fa fa-user-circle',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'editors',
        data: {
          menu: {
            title: 'Comments',
            icon: 'fa fa-comment-o',
            selected: false,
            expanded: false,
            order: 100,
          }
        }
      }
    ]
  }
];

  public layoutSizes = {
    resWidthCollapseSidebar: 1200,
    resWidthHideSidebar: 500
  };

  public menuHeight: number;
  public isMenuCollapsed: boolean = false;
  public isMenuShouldCollapsed: boolean = false;

  constructor(private _elementRef: ElementRef, private _state:GlobalState) {

    this._state.subscribe('menu.isCollapsed', (isCollapsed :any) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngOnInit(): void {
    if (this._shouldMenuCollapse()) {
      this.menuCollapse();
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.updateSidebarHeight());
  }

  @HostListener('window:resize')
  public onWindowResize(): void {

    var isMenuShouldCollapsed = this._shouldMenuCollapse();

    if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
      this.menuCollapseStateChange(isMenuShouldCollapsed);
    }
    this.isMenuShouldCollapsed = isMenuShouldCollapsed;
    this.updateSidebarHeight();
  }

  public menuExpand(): void {
    this.menuCollapseStateChange(false);
  }

  public menuCollapse(): void {
    this.menuCollapseStateChange(true);
  }

  public menuCollapseStateChange(isCollapsed: boolean): void {
    this.isMenuCollapsed = isCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public updateSidebarHeight(): void {
    this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 84;
  }

  private _shouldMenuCollapse(): boolean {
    return window.innerWidth <= this.layoutSizes.resWidthCollapseSidebar;
  }
}
