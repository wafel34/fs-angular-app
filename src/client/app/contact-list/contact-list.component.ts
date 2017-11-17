import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact.model';

import { ApiService } from '../shared/api.service';

@Component({
    selector: 'app-contact-list-component',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.sass']
})

export class ContactListComponent implements OnInit {

    contacts: Contact[];
    constructor(public api: ApiService) {}

    ngOnInit() {
        this.api.get('contacts')
            .subscribe((data) => {
                this.contacts = data;
            });
    }
}
