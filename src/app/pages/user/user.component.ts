import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  user: User = {} as User;
  @Output() userNameEmitter = new EventEmitter<string>();

  userService = inject(UserService);

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    this.userService.getAuthenticatedUser().subscribe((data) => {
      this.user = data;
      this.userNameEmitter.emit(data.email)
    });
  }
}
