import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Superpower } from '../models/superpower.model';

@Injectable({
    providedIn: 'root'
})
export class SuperpowerService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Superpower[]> {
        return this.http.get<Superpower[]>('Superpower');
    }
}
