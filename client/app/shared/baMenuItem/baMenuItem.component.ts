import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ba-menu-item',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'baMenuItem.component.html',
  // styleUrls: ['baMenuItem.css']
})

export class BaMenuItemComponent {

  @Input() menuItem: any;
  @Input() child: boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  public onHoverItem($event: any): void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event: any, item: any): boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }
}

