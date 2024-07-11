import { NgModule } from '@angular/core';
import {HashLocationStrategy, LocationStrategy, NgClass, NgForOf, NgStyle, PathLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {ManagerFirebase} from "./utils/manager-firebase";
import {FileUploadModule} from "primeng/fileupload";
import {CarouselModule} from "primeng/carousel";
import {ChartModule} from "primeng/chart";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {TooltipModule} from "primeng/tooltip";
import {ToolbarModule} from "primeng/toolbar";
import {ChipModule} from "primeng/chip";
import {ListboxModule} from "primeng/listbox";
import {AvatarModule} from "primeng/avatar";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DialogModule} from "primeng/dialog";
import {CheckboxModule} from "primeng/checkbox";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessagesModule} from "primeng/messages";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {TagModule} from "primeng/tag";
import {MessageModule} from "primeng/message";
import {PasswordModule} from "primeng/password";
import {CreateAlgorithmComponent} from "./views/create-algorithm/create-algorithm.component";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {MarkdownComponent} from "./component/markdown/markdown.component";
import {ViewAlgorithmComponent} from "./views/view-algorithm/view-algorithm.component";
import {ButtonModule} from "primeng/button";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "primeng/api";
import {ChipsModule} from "primeng/chips";
import {AccordionModule} from "primeng/accordion";
import {BadgeModule} from "primeng/badge";
import {DividerModule} from "primeng/divider";

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        CreateAlgorithmComponent,
        ViewAlgorithmComponent,
        MarkdownComponent
    ],
    imports: [AppRoutingModule, AppLayoutModule,

        RippleModule,
        CardModule,
        TableModule,
        ToastModule,
        TagModule,
        MessageModule,
        PasswordModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
        MessagesModule,
        ConfirmDialogModule,
        CheckboxModule,
        DialogModule,
        ProgressSpinnerModule,
        NgStyle,
        NgClass,
        AvatarModule,
        ListboxModule,
        ChipModule,
        NgForOf,
        ToolbarModule,
        TooltipModule,
        ConfirmPopupModule,
        ChartModule,
        CarouselModule,
        FileUploadModule,
        DropdownModule,
        FormsModule,
        PanelModule,
        ButtonModule,
        PaginatorModule,
        SharedModule,
        ChipsModule,
        AccordionModule,
        BadgeModule,
        DividerModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, ManagerFirebase
    ],
    bootstrap: [AppComponent],
    exports: [
        MarkdownComponent
    ]
})
export class AppModule {}
