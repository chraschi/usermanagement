import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGroupFormComponent } from './security-group-form.component';

describe('SecurityGroupFormComponent', () => {
  let component: SecurityGroupFormComponent;
  let fixture: ComponentFixture<SecurityGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurityGroupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
