import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterModule, ButtonModule],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-surface-100 dark:bg-surface-900">
      <div class="flex flex-col items-center text-center p-10 rounded-xl shadow-lg bg-white dark:bg-surface-800">

        <span class="text-primary font-bold text-5xl mb-4">404</span>
        <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl mb-2">
          Página não encontrada
        </h1>
        <p class="text-surface-600 dark:text-surface-200 mb-6">
          O recurso que você procura não está disponível.
        </p>

        <p-button
          label="Voltar ao Início"
          icon="pi pi-arrow-left"
          routerLink="/"
        />
      </div>
    </div>
  `
})
export class Notfound {}
