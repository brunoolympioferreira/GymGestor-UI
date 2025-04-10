import { Component, inject, OnInit } from '@angular/core';
import { User, UserDetail } from '../../../shared/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  user!: UserDetail;

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe((user) => {
        this.user = user;
      })
    }
  }
}
