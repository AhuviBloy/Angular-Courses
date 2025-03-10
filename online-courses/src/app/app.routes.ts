import { Routes } from '@angular/router';
import { CoursesListComponent } from '../components/courses-list/courses-list.component';
import { EditCoursesComponent } from '../components/edit-courses/edit-courses.component';
import { MyCoursesComponent } from '../components/my-courses/my-courses.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: 'courses-online', component: CoursesListComponent },
  { path: 'my-courses', component: MyCoursesComponent },
  { path: 'edit-courses', component: EditCoursesComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
