import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../shared/contact.model';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.sass']
})

export class ContactComponent implements OnInit {
    @Input() contact: Contact;
    constructor() {}

    ngOnInit() {}
}
