import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LayoutService } from '../service/layout.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    OverlayPanelModule,
    ButtonModule
  ],
  template: `
    <div class="layout-topbar">
      <div class="layout-topbar-logo-container">
        <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
          <i class="pi pi-bars"></i>
        </button>
        <a class="layout-topbar-logo" routerLink="/">
          <span>superheroes</span>
        </a>
      </div>

      <div class="layout-topbar-actions">
        <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
          <i [ngClass]="{ 'pi': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
        </button>
      </div>
    </div>
  `
})
export class AppTopbar  {
  layoutService = inject(LayoutService);
  router = inject(Router);

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme
    }));
  }

}
