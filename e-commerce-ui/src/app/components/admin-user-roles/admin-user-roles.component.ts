import {Component, OnInit} from '@angular/core';
import {ApiEndpointsService, User} from "../../services/api-endpoints.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-admin-user-roles',
  templateUrl: './admin-user-roles.component.html',
  styleUrls: ['./admin-user-roles.component.scss']
})
export class AdminUserRolesComponent implements OnInit {

  users: User[];
  deletedUser: boolean = false;
  ngOnInit(): void {
    this.apiEndpointsService.getUsers().subscribe(
      users => {
        this.users = users;
      }
    )
  }

  constructor(public apiEndpointsService: ApiEndpointsService) {

  }

  deleteUser(userId: number) {
    const confirmation = window.confirm(`Are you sure you want to delete user with id ${userId}`);
    if (confirmation) {
      this.apiEndpointsService.deleteUser(userId).subscribe(
        response => {
          if(response.status == 200) {
            this.users = this.users.filter(user => user.userId !== userId);
          } else {
            alert(`Error deleting user with ID ${userId}: ${response.responseMessage}`);
          }
        }
      );
    }
  }

  toggleUserRole(userId: number) {
    this.apiEndpointsService.switchUserRole(userId).subscribe(
      response => {
        if (response.status == 200) {
          let user = this.users.find(userToFind => userToFind.userId === userId);
          this.switchRole(user);
        }
        else if (response.status == 404) {
          alert(`Error switching role of user with ID ${userId}: ${response.responseMessage}`);
        }
      },
      error => {
        if(error.status == 409)
          alert(`Error switching role of user with ID ${userId}: ${error.error.responseMessage}`);
      }
    )
  }

  switchRole(user: User) {
    user.role = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
  }
}
