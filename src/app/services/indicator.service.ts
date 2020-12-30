import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../app-injection-tokens';
import {Observable} from 'rxjs';
import {indicator} from '../models/indicator';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  private baseApiUrl = `${this.apiUrl}api/`

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) { }

  getIndicators(): Observable<indicator[]> {
    return this.http.get<indicator[]>(`${this.baseApiUrl}indicators`);
  }
  getIndicator(id: string): Observable<indicator> {
    return this.http.get<indicator>(`${this.baseApiUrl}indicators/${id}`);
  }
  addIndicator(newInd: indicator): Observable<indicator> {
    return this.http.post<indicator>(`${this.baseApiUrl}indicators`, newInd);
  }
  editIndicator(newInd: indicator): Observable<indicator> {
    return this.http.put<indicator>(`${this.baseApiUrl}indicators/${newInd.id}`, newInd);
  }
  deleteIndicator(newInd: indicator): Observable<indicator> {
    return this.http.delete<indicator>(`${this.baseApiUrl}indicators/${newInd.id}`);
  }
}
