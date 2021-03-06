import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleFormComponent } from './components/article/article-form/article-form.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticleViewComponent } from './components/article/article-view/article-view.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ArticleManagementComponent } from './components/dashboard/article-management/article-management.component';
import { EventManagementComponent } from './components/dashboard/event-management/event-management.component';
import { MemberManagementComponent } from './components/dashboard/member-management/member-management.component';
import { AccessDeniedComponent } from './components/error/access-denied/access-denied.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { EventFormComponent } from './components/event/event-form/event-form.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { EventViewComponent } from './components/event/event-view/event-view.component';
import { PageDashboardComponent } from './components/pages/page-dashboard/page-dashboard.component';
import { PageEventsComponent } from './components/pages/page-events/page-events.component';
import { PageLoginComponent } from './components/pages/page-login/page-login.component';
import { PageMembersComponent } from './components/pages/page-members/page-members.component';
import { PageMinecraftComponent } from './components/pages/page-minecraft/page-minecraft.component';
import { PageProfilComponent } from './components/pages/page-profil/page-profil.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RolesGuardService } from './services/roles-guard.service';

const routes: Routes = [
  { path: 'minecraft', component: PageMinecraftComponent, children: [
    { path: 'terrains', component: ArticleListComponent, data: {type: 'ground', design: 'card'} },
    { path: 'plugins', component: ArticleListComponent, data: {type: 'plugin', design: 'row'} },
    { path: 'nouveau/:type', component: ArticleFormComponent, canActivate: [RolesGuardService], data: {edit: false, roles: 'ROLE_MEMBER'} },
    { path: 'editer/:id', component: ArticleFormComponent, canActivate: [RolesGuardService], data: {edit: true, roles: 'ROLE_MEMBER'} },
    { path: '', pathMatch: 'full', redirectTo: 'terrains' },
  ] },
  { path: 'minecraft/terrains/:id', component: ArticleViewComponent, data: {type: 'ground'} },
  { path: 'minecraft/plugins/:id', component: ArticleViewComponent, data: {type: 'plugin'} },
  { path: 'evenements', component: PageEventsComponent, canActivate: [RolesGuardService], data: {roles: 'ROLE_MEMBER'}, children: [
    { path: 'bientot', component: EventListComponent, data: {status: 'active'} },
    { path: 'archive', component: EventListComponent, data: {status: 'archive'} },
    { path: 'nouveau', component: EventFormComponent, data: {edit: false} },
    { path: 'editer/:id', component: EventFormComponent, data: {edit: true} },
    { path: '', pathMatch: 'full', redirectTo: 'bientot' },
  ] },
  { path: 'evenements/bientot/:id', component: EventViewComponent,
    canActivate: [RolesGuardService], data: {status: 'active', roles: 'ROLE_MEMBER'} },
  { path: 'evenements/archive/:id', component: EventViewComponent,
    canActivate: [RolesGuardService], data: {status: 'archive', roles: 'ROLE_MEMBER'} },
  { path: 'membres', component: PageMembersComponent, canActivate: [RolesGuardService], data: {roles: 'ROLE_USER'} },
  { path: 'profil/:id', component: PageProfilComponent, canActivate: [AuthGuardService] },
  { path: 'connexion', component: PageLoginComponent, children: [
    { path: 'connexion', component: LoginComponent },
    { path: 'inscription', component: SignupComponent },
    { path: '', pathMatch: 'full', redirectTo: 'connexion' },
  ] },
  { path: 'dashboard', component: PageDashboardComponent, canActivate: [RolesGuardService], data: {roles: 'ROLE_ADMIN'}, children: [
    { path: 'articles', component: ArticleManagementComponent },
    { path: 'events', component: EventManagementComponent },
    { path: 'membres', component: MemberManagementComponent },
    { path: '', pathMatch: 'full', redirectTo: 'articles' },
  ] },
  { path: 'acces-refuse', component: AccessDeniedComponent, canActivate: [AuthGuardService] },
  { path: 'utilisateur-inconnu', component: NotFoundComponent },
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
  providers: [
    AuthGuardService,
    RolesGuardService,
  ],
})
export class AppRoutingModule { }
