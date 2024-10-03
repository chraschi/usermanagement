import { Component, OnInit } from '@angular/core';
import { SecurityGroupService } from '../../services/security-group.service';
import { SecurityGroup } from '../../models/security-group.model';

@Component({
  selector: 'app-security-group-list',
  templateUrl: './security-group-list.component.html',
  styleUrls: ['./security-group-list.component.scss']
})
export class SecurityGroupListComponent implements OnInit {
  securityGroups: SecurityGroup[] = [];

  constructor(private securityGroupService: SecurityGroupService) { }

  ngOnInit(): void {
    this.loadSecurityGroups();
  }

  loadSecurityGroups(): void {
    this.securityGroupService.getSecurityGroups().subscribe(data => {
      this.securityGroups = data;
    });
  }

  deleteSecurityGroup(id: number): void {
    this.securityGroupService.deleteSecurityGroup(id).subscribe(() => {
      this.loadSecurityGroups();
    });
  }
}
