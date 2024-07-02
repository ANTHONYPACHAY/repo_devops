import { Component } from '@angular/core';
import {PanelModule} from "primeng/panel";

@Component({
  selector: 'app-contact',
  standalone: true,
    imports: [
        PanelModule
    ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
