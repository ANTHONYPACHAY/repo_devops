import { Component } from '@angular/core';
import {PanelModule} from "primeng/panel";

@Component({
  selector: 'app-donate',
  standalone: true,
    imports: [
        PanelModule
    ],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss'
})
export class DonateComponent {

}
