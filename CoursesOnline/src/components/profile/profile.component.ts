import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  name: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.setUserDetails().subscribe(
      (user: User) => {
        this.name = user.name;
        sessionStorage.setItem('user', JSON.stringify(user));

      },
      (error) => {
        alert('Failed to get user details');
      }
    );
  }
}
