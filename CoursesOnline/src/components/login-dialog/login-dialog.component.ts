import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'login-dialog',
  standalone: true,
  templateUrl: './login-dialog.component.html',
  imports: [MatDialogModule ,MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LoginDialogComponent>);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(response => {
        console.log('Login successful', response);

        this.userService.setUserDetails().subscribe(
          (user: User) => {
            sessionStorage.setItem('user', JSON.stringify(user));
          },
          (error) => {
            alert('Failed to get user details');
          }
        );

        this.close(); 
      }, error => {
        alert('Login failed');
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
