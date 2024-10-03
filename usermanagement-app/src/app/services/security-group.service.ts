import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityGroup } from '../models/security-group.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityGroupService {
  private apiUrl = 'http://localhost:5200/api/securitygroup';

  constructor(private http: HttpClient) { }

  getSecurityGroups(): Observable<SecurityGroup[]> {
    return this.http.get<SecurityGroup[]>(this.apiUrl);
  }

  getSecurityGroup(id: number): Observable<SecurityGroup> {
    return this.http.get<SecurityGroup>(`${this.apiUrl}/${id}`);
  }

  createSecurityGroup(securityGroup: SecurityGroup): Observable<SecurityGroup> {
    return this.http.post<SecurityGroup>(this.apiUrl, securityGroup);
  }

  updateSecurityGroup(securityGroup: SecurityGroup): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${securityGroup.id}`, securityGroup);
  }

  deleteSecurityGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
