import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {AboutComponent} from "./views/about/about.component";
import {DonateComponent} from "./views/donate/donate.component";
import {ContactComponent} from "./views/contact/contact.component";
import {CreateAlgorithmComponent} from "./views/create-algorithm/create-algorithm.component";
import {ViewAlgorithmComponent} from "./views/view-algorithm/view-algorithm.component";
import {ListAlgorithmComponent} from "./views/list-algorithm/list-algorithm.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'about', component: AboutComponent },
                    { path: 'donate', component: DonateComponent },
                    { path: 'contact', component: ContactComponent },
                    { path: 'create-algorithm', component: CreateAlgorithmComponent },
                    { path: 'create-algorithm/:id', component: CreateAlgorithmComponent },
                    { path: 'view-algorithm/:id', component: ViewAlgorithmComponent },
                    { path: 'list-algorithm', component: ListAlgorithmComponent },

                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            // { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
