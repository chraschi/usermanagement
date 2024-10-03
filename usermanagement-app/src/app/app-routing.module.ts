import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SecurityGroupListComponent } from './components/security-group-list/security-group-list.component';
import { SecurityGroupFormComponent } from './components/security-group-form/security-group-form.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'security-groups', component: SecurityGroupListComponent },
  { path: 'security-groups/new', component: SecurityGroupFormComponent },
  { path: 'security-groups/edit/:id', component: SecurityGroupFormComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }