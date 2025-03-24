import { SharedModule } from './../../shared/shared.module';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  user: User = {} as User;
  @Output() userNameEmitter = new EventEmitter<string>();

  userService = inject(UserService);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    this.userService.getAuthenticatedUser().subscribe((data) => {
      this.user = data;
      this.userNameEmitter.emit(data.email)
    });
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Senha alterada com sucesso!', result);
      }
    })
  }
}
