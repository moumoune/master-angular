import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private usersService: UsersService, private authService: AuthService) {}

  ngOnInit() {
    this.tryAutoLogin();
  }

  private tryAutoLogin() {
    // On vérifie s’il existe jeton d’identification stocké.
    const token = localStorage.getItem('token');
    if (!token) { return; }
   
    // On vérifie si le jeton stocké est encore valide.
    const expirationDate = +localStorage.getItem('expirationDate')!;
    const now = new Date().getTime();
    if (now >= expirationDate) {
     return;
    }
   
    // On connecte l’utilisateur avec les informations de connexions stockées.
    const userId: string = localStorage.getItem('userId')!;
    this.usersService.get(userId).subscribe(user => {
      if(!user) {
        return;
      }
      this.authService.autoLogin(user);
    });
   }
}
