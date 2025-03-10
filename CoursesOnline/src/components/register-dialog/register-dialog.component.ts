import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import {
  MatDialogActions,
  MatDialogClose, 
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';


@Component({
  selector: 'register-dialog',
  standalone: true,
  templateUrl: './register-dialog.component.html',
  imports: [MatButtonModule, MatDialogClose, MatDialogTitle, MatDialogContent, 
    MatButtonModule, MatInputModule,MatFormFieldModule,FormsModule,MatSelectModule,MatOptionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RegisterDialogComponent>);
  private authService = inject(AuthService);
  private userService=inject(UserService)
  

  name:string='';
  email: string='';
  password: string='';
  role:string='';
  
  onSubmit(): void {
    this.authService.register(this.name,this.email, this.password,this.role).subscribe(response => {
      console.log('Register successful', response);

      this.userService.setUserDetails().subscribe(
        (user: User) => {
          sessionStorage.setItem('user', JSON.stringify(user));
  
        },
        (error) => {
          // console.error('Failed to get user details', error);
          alert('Failed to get user details');
        }
      );

      this.close(); 
      // this.dialogRef.close();
    }, error => {
      // console.error('Login failed', error);   
      alert('Register failed');
    });
  }
  close(): void {
    this.dialogRef.close();
  }
}