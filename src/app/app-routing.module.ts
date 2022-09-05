import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataCompareComponent } from './data-compare/data-compare.component';
import { LifespanComponent } from './lifespan/lifespan.component';
import { LoginComponent } from './login/login.component';
import { StaticsComponent } from './statics/statics.component';
import { UserdataComponent } from './userdata/userdata.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login', component : LoginComponent},
  {path:'data', component: UserdataComponent},
  {path:'statics', component:StaticsComponent},
  {path:'datacompare', component:DataCompareComponent},
  {path:'lifespan', component:LifespanComponent},
  {path: '**',  redirectTo : 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
