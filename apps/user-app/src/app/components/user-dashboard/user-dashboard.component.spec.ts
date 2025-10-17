import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDashboardComponent } from './user-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as UserActions from '../../state/user/actions';
import { selectAllUsers } from '../../state/user/selectors';
import { of } from 'rxjs';
import { User } from '../../state/user/user.model';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserDashboardComponent,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the user dashboard component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should dispatch loadUsers action on init', () => {
    spyOn(store, 'dispatch');
    const mockUsers: User[] = [
      { id: 1, username: 'johndoe', email: 'john@example.com', jobRole: 'tech' },
    ];
    selectAllUsers.setResult(mockUsers);
    store.refreshState();
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(UserActions.loadUsers());
  });
  
  it('should dispatch deleteUser action', () => {
    spyOn(store, 'dispatch');
    const userId = 1;
    component.deleteUser({ id: userId });
    expect(store.dispatch).toHaveBeenCalledWith(UserActions.deleteUser({ userId }));
  });
});
