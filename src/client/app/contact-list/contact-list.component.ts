import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Contact } from '../shared/contact.model';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-contact-list-component',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.sass']
})

export class ContactListComponent implements OnInit {

    contacts: Contact[];
    constructor(public http: Http) {}

    ngOnInit() {
        this.http.get('/api/contacts')
            .map((res: Response) => res.json())
            .subscribe((data) => {
                this.contacts = data;
            });
    }
}
