import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para diretivas como *ngIf, *ngFor (se usado aqui)
import { RouterOutlet } from '@angular/router'; // Necessário para a diretiva <router-outlet>

@Component({
  selector: 'app-root', // O seletor HTML para este componente
  standalone: true,     // Indica que este é um componente independente
  imports: [CommonModule, RouterOutlet], // Importa os módulos necessários para o template deste componente
  templateUrl: './app.component.html', // Caminho para o arquivo HTML do template
  styleUrls: ['./app.component.css'] // Caminho para o arquivo CSS de estilos
})
export class AppComponent {
  title = 'github-dev-profile'; // Uma propriedade de exemplo
}