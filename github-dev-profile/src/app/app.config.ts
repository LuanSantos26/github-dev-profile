import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // Provedor para o sistema de roteamento
import { provideHttpClient } from '@angular/common/http'; // Importa e fornece o HttpClient

import { routes } from './app.routes'; // Importa o array de rotas que você definiu

export const appConfig: ApplicationConfig = {
  providers: [
    // Fornece o sistema de roteamento para a aplicação, usando as rotas definidas
    provideRouter(routes),
    // Fornece o HttpClient para que ele possa ser injetado em serviços e componentes
    provideHttpClient()
  ]
};