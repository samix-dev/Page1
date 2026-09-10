import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Page1', component: HomeComponent },
  { path: 'love/:id', component: QuestionnaireComponent },
  { path: 'Page1/love/:id', component: QuestionnaireComponent },
  { path: '**', component: NotFoundComponent }
];
