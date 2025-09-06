import { Routes } from '@angular/router';
import { HeroesPage } from './heroes/heroes';

export default [
    { path: 'heroes', component: HeroesPage },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
