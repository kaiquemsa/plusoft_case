import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScreenManageComponent } from './admin-screen-manage.component';

describe('AdminScreenManageComponent', () => {
  let component: AdminScreenManageComponent;
  let fixture: ComponentFixture<AdminScreenManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminScreenManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminScreenManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
