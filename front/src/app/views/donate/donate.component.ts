import { Component } from '@angular/core';
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-donate',
  standalone: true,
    imports: [
        PanelModule,
        ButtonModule,
        RippleModule,
        RouterLink
    ],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss'
})
export class DonateComponent {

}
