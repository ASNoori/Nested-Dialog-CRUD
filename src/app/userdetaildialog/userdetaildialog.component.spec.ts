import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetaildialogComponent } from './userdetaildialog.component';

describe('UserdetaildialogComponent', () => {
  let component: UserdetaildialogComponent;
  let fixture: ComponentFixture<UserdetaildialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdetaildialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdetaildialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
