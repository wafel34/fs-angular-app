import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Contact } from '../shared/contact.model';
import { AuthService } from '../shared/auth.service';
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass']
})

export class MenuComponent implements OnInit {

    constructor(public auth: AuthService) {}

    ngOnInit() {}

    logout() {
        this.auth.logout();
    }
}
