import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthlayoutComponent} from './layouts/authlayout/authlayout.component';
import {SitelayoutComponent} from './layouts/sitelayout/sitelayout.component';
import {IndicatorlistComponent} from './components/indicatorlist/indicatorlist.component';
import {IndicatoreditComponent} from './components/indicatoredit/indicatoredit.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: AuthlayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent}
    ]
  },
  {path: '', component: SitelayoutComponent, canActivate: [AuthGuard], canActivateChild:[AuthGuard], children: [
      {path: 'indicator', component: IndicatorlistComponent},
      {path: 'indicator/new', component: IndicatoreditComponent},
      {path: 'indicator/:id', component: IndicatoreditComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
