import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'al-profil',
  templateUrl: './profil.component.html',
  styles: [
  ]
})
export class ProfilComponent implements OnInit {

  profilForm: FormGroup;
  user: User|null;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
 
    this.profilForm = this.fb.group({
     'name': [this.user?.name, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9_-]*$')
     ]],
     'avatar': [this.user?.avatar, [
      Validators.pattern('https?://.+')
     ]]
    })
  }

  get name() { return this.profilForm.get('name') as FormControl; }
  get avatar() { return this.profilForm.get('avatar') as FormControl; }
  
  submit() {
    if(this.user) {
      this.user.name = this.name?.value;
      this.user.avatar = this.avatar?.value;
      this.authService.updateUserState(this.user).subscribe();
    }
  }

}
