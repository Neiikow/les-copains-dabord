import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleFormComponent } from './components/article/article-form/article-form.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticleViewComponent } from './components/article/article-view/article-view.component';
import { PageDashboardComponent } from './components/pages/page-dashboard/page-dashboard.component';
import { PageEventsComponent } from './components/pages/page-events/page-events.component';
import { PageLoginComponent } from './components/pages/page-login/page-login.component';
import { PageMembersComponent } from './components/pages/page-members/page-members.component';
import { PageMinecraftComponent } from './components/pages/page-minecraft/page-minecraft.component';
import { PageProfilComponent } from './components/pages/page-profil/page-profil.component';

const routes: Routes = [
  { path: 'minecraft', component: PageMinecraftComponent, children: [
    { path: 'terrains', component: ArticleListComponent, data: {type: 'ground', design: 'card'} },
    { path: 'plugins', component: ArticleListComponent, data: {type: 'plugin', design: 'row'} },
    { path: 'nouveau/:type', component: ArticleFormComponent, data: {edit: false} },
    { path: 'editer/:id', component: ArticleFormComponent, data: {edit: true} },
    { path: '', pathMatch: 'full', redirectTo: 'terrains' },
  ] },
  { path: 'minecraft/terrains/:id', component: ArticleViewComponent, data: {type: 'ground'} },
  { path: 'minecraft/plugins/:id', component: ArticleViewComponent, data: {type: 'plugin'} },
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
