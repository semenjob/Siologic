import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './page/main-page/main-page.component';
import { UserPageComponent } from './page/user-page/user-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'userPage/:id', component: UserPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
}

