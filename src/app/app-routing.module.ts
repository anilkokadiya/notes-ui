import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FaqComponent } from './components/faq/faq.component';
import { FeaturesComponent } from './components/features/features.component';
import { NoteUpdateComponent } from './components/note-update/note-update.component';
import { PricingComponent } from './components/pricing/pricing.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'notes', component: DashboardComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about', component: AboutComponent },
  { path: 'notes/update/:id', component: NoteUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
