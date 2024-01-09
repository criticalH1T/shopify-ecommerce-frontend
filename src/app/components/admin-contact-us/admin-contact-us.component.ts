import {Component, OnInit} from '@angular/core';
import {ApiEndpointsService, Contact} from "../../services/api-endpoints.service";

@Component({
  selector: 'app-admin-contact-us',
  templateUrl: './admin-contact-us.component.html',
  styleUrls: ['./admin-contact-us.component.scss']
})
export class AdminContactUsComponent implements OnInit {

  contacts: Contact[] = [];
  constructor(private apiEndpointsService: ApiEndpointsService) {
  }

  ngOnInit(): void {
    this.apiEndpointsService.getContacts().subscribe(
      contacts => {
        this.contacts = contacts;
      }
    );
  }

  deleteContact(contact: any) {
    const confirmation = window.confirm(`Are you sure you want to delete this comment?`);
    if(confirmation) {
      this.apiEndpointsService.deleteContact(contact.id).subscribe(
        response => {
          if (response.status === 200) {
            this.contacts = this.contacts.filter(item => item.id != contact.id);
          } else {
            window.alert('There was an issue deleting this comment.');
          }
        }
      )
    }
  }
}
