import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TokenInterceptor } from './auth/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleFormComponent } from './components/article/article-form/article-form.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticlePresentationComponent } from './components/article/article-presentation/article-presentation.component';
import { ArticleViewComponent } from './components/article/article-view/article-view.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { EventFormComponent } from './components/event/event-form/event-form.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { EventViewComponent } from './components/event/event-view/event-view.component';
import { HeaderComponent } from './components/header/header.component';
import { PageDashboardComponent } from './components/pages/page-dashboard/page-dashboard.component';
import { PageEventsComponent } from './components/pages/page-events/page-events.component';
import { PageLoginComponent } from './components/pages/page-login/page-login.component';
import { PageMembersComponent } from './components/pages/page-members/page-members.component';
import { PageMinecraftComponent } from './components/pages/page-minecraft/page-minecraft.component';
import { PageProfilComponent } from './components/pages/page-profil/page-profil.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    PageMinecraftComponent,
    PageEventsComponent,
    PageMembersComponent,
    PageDashboardComponent,
    PageProfilComponent,
    PageLoginComponent,
    ArticlePresentationComponent,
    ArticleListComponent,
    ArticleViewComponent,
    ArticleFormComponent,
    EventListComponent,
    EventFormComponent,
    EventViewComponent,
    UserListComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
    },
  ],
})
export class AppModule { }
