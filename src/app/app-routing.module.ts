import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth-guard';
import { UserlistComponent } from './userlist/userlist.component';
import { LandingComponent } from './landing/landing.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { UserComponent } from './userlist/user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { FaqComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full'},
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent,
  children: [
   { path: 'contact', component: ContactComponent},
   { path: 'faq', component: FaqComponent},
   { path: 'about', component: AboutComponent},
  ] },
  { path: 'userregister', component: UserregisterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userlist', component: UserlistComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
