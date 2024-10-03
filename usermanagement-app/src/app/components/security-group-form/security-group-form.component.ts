import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityGroupService } from '../../services/security-group.service';
import { SecurityGroup } from '../../models/security-group.model';

@Component({
  selector: 'app-security-group-form',
  templateUrl: './security-group-form.component.html',
  styleUrls: ['./security-group-form.component.scss']
})
export class SecurityGroupFormComponent implements OnInit {
  securityGroupForm: FormGroup;
  securityGroup: SecurityGroup;  // Hier wird die 'securityGroup' definiert
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private securityGroupService: SecurityGroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.securityGroupForm = this.fb.group({
      name: ['', Validators.required],
      permissions: ['']
    });

    // Initialisiere das 'securityGroup'-Objekt
    this.securityGroup = {
      id: 0,
      name: '',
      permissions: []
    };
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.securityGroupService.getSecurityGroup(+id).subscribe(data => {
        this.securityGroup = data;
        this.securityGroupForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.securityGroupForm.valid) {
      if (this.securityGroup.id) {
        this.securityGroupService.updateSecurityGroup(this.securityGroupForm.value).subscribe(
          () => this.handleSuccess('Security group updated successfully!'),
          err => this.handleError('Failed to update security group.')
        );
      } else {
        this.securityGroupService.createSecurityGroup(this.securityGroupForm.value).subscribe(
          () => this.handleSuccess('Security group created successfully!'),
          err => this.handleError('Failed to create security group.')
        );
      }
    } else {
      this.errorMessage = 'Please ensure all fields are valid.';
    }
  }

  handleSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';
    this.router.navigate(['/security-groups']);
  }

  handleError(message: string): void {
    this.successMessage = '';
    this.errorMessage = message;
  }
}
