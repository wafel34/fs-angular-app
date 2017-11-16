import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Contact } from '../shared/contact.model';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.sass']
})

export class AddContactComponent implements OnInit {

    loading: Boolean = false;
    newContact: Contact;
    constructor(public http: Http) {}

    ngOnInit() {}

    onSubmit(form: NgForm) {
        this.loading = true;
        const formValues = Object.assign({}, form.value);
        const contact: Contact = {
            name: `${formValues.firstName} ${formValues.lastName}`,
            address: formValues.address,
            phone: `${formValues.areaCode} ${formValues.prefix}--${formValues.lineNumber}`,
            photoUrl: formValues.photo
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions = new RequestOptions({headers: headers});

        this.http.post('/api/contacts', contact, requestOptions)
            .map((res: Response) => {
                return res.json();
            })
            .subscribe((data) => {
                form.reset();
                //this.loading = false;
                this.newContact = data;
            });
    }
}
