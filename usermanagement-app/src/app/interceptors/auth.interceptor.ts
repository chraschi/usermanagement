import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';  // Du benötigst noch einen AuthService (siehe unten)

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Hole das Token vom AuthService
    const authToken = this.authService.getToken();

    // Klone die Anfrage und füge das Authorization-Header hinzu
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    // Sende die geklonte Anfrage weiter
    return next.handle(authReq);
  }
}
