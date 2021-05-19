import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, tap, catchError, finalize, delay } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { environment } from '../../../environments/environment';
import { UsersService } from './users.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  readonly user$: Observable<User|null> = this.user.asObservable();

  constructor(private http: HttpClient, private usersService: UsersService, private errorService: ErrorService, private loaderService: LoaderService, private router: Router, private toastrService: ToastrService) { }

  login(email: string, password: string): Observable<User|null> {
    this.loaderService.setLoading(true);
    const url = `${environment.firebase.auth.baseURL}/verifyPassword?key=${environment.firebase.apiKey}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.http.post<User>(url, data, {}).pipe(
      switchMap((data: any) => {
       const userId: string = data.localId;
       const jwt: string = data.idToken;

       this.saveAuthData(userId, jwt);
       return this.usersService.get(userId);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  register(name: string, email: string, password: string): Observable<User|null> {
    this.loaderService.setLoading(true);

    const url = `${environment.firebase.auth.baseURL}/signupNewUser?key=${environment.firebase.apiKey}`;
      
   const data = {
    email: email,
    password: password,
    returnSecureToken: true
   };
  
   return this.http.post<User>(url, data, {}).pipe(
    switchMap((data: any) => {
     const jwt: string = data.idToken;
     const user = new User({
      email: data.email,
      id: data.localId,
      name: name
     });
     this.saveAuthData(data.localId, jwt);
     return this.usersService.save(user);
    }),
    tap(user => this.user.next(user)),
    tap(_ => this.logoutTimer(3600)),
    catchError(error => this.errorService.handleError(error)),
    finalize(() => this.loaderService.setLoading(false))
   );
  }

  updateUserState(user: User): Observable<User|null> {
    this.loaderService.setLoading(true);
    return this.usersService.update(user).pipe(
      tap(user => this.user.next(user)),
      tap(_ => this.toastrService.showToastr({
       category: 'success',
       message: 'Vos informations ont été mises à jour !'
      })),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
   }

   get currentUser(): User|null {
    return this.user.getValue();
   }  

  logout(): void {
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  autoLogin(user: User) {
    this.user.next(user);
    this.router.navigate(['app/dashboard']);
   }

  private saveAuthData(userId: string, token: string) {
    const now = new Date();
    const expirationDate = (now.getTime() + 3600 * 1000).toString();
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
   }

  private logoutTimer(expirationTime: number): void {
    of(true).pipe(
     delay(expirationTime * 1000)
    ).subscribe(_ => this.logout());
   }
}
