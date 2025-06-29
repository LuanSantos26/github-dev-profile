import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Importa o componente Home
import { ProfileComponent } from './profile/profile.component'; // Importa o componente Profile

export const routes: Routes = [
  // Rota raiz: Redireciona para a página inicial (Home)
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Rota para a página inicial de busca de usuário
  { path: 'home', component: HomeComponent },

  // Rota para a página de perfil do usuário.
  // ':username' é um parâmetro dinâmico que será lido na URL.
  { path: 'profile/:username', component: ProfileComponent },

  // Rota curinga: Redireciona qualquer caminho não reconhecido para a página inicial
  { path: '**', redirectTo: '/home' }
];