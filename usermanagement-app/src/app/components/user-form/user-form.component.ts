import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordComplexity]],
      name: ['', Validators.required],
      securityGroups: ['']
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser(+userId).subscribe(data => {
        this.userForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.userForm.get('id')?.value) {
        this.userService.updateUser(this.userForm.value).subscribe(
          () => this.handleSuccess('User updated successfully!'),
          err => this.handleError('Failed to update user.')
        );
      } else {
        this.userService.createUser(this.userForm.value).subscribe(
          () => this.handleSuccess('User created successfully!'),
          err => this.handleError('Failed to create user.')
        );
      }
    } else {
      this.errorMessage = 'Please ensure all fields are valid.';
    }
  }

  handleSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';
    this.router.navigate(['/users']);
  }

  handleError(message: string): void {
    this.successMessage = '';
    this.errorMessage = message;
  }

  passwordComplexity(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      return { weakPassword: true };
    }
    return null;
  }
}
