import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageDashboardComponent } from './components/pages/page-dashboard/page-dashboard.component';
import { PageEventsComponent } from './components/pages/page-events/page-events.component';
import { PageLoginComponent } from './components/pages/page-login/page-login.component';
import { PageMembersComponent } from './components/pages/page-members/page-members.component';
import { PageMinecraftComponent } from './components/pages/page-minecraft/page-minecraft.component';
import { PageProfilComponent } from './components/pages/page-profil/page-profil.component';

const routes: Routes = [
  { path: 'minecraft', component: PageMinecraftComponent },
  { path: 'evenements', component: PageEventsComponent },
  { path: 'membres', component: PageMembersComponent },
  { path: 'profil', component: PageProfilComponent },
  { path: 'connexion', component: PageLoginComponent },
  { path: 'dashboard', component: PageDashboardComponent },
  { path: '', redirectTo: 'minecraft', pathMatch: 'full' },
  { path: '**', redirectTo: 'minecraft', pathMatch: 'full' },
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: [],
})
export class AppRoutingModule { }
