import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../models/heroes.model';

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Hero[]> {
        return this.http.get<Hero[]>('Hero');
    }

    getById(id: number): Observable<Hero> {
        return this.http.get<Hero>(`Hero/${id}`);
    }

    create(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>('Hero', hero);
    }

    update(id: number, hero: Hero): Observable<Hero> {
        return this.http.put<Hero>(`Hero/${id}`, hero);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`Hero/${id}`);
    }
}
