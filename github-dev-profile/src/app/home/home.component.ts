import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa o serviço Router para navegação
import { FormsModule } from '@angular/forms'; // **Importante:** Necessário para usar [(ngModel)] em componentes standalone

@Component({
  selector: 'app-home',
  standalone: true,           // Marca o componente como standalone
  imports: [FormsModule],     // Adiciona FormsModule aos imports para que [(ngModel)] funcione
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string = ''; // Propriedade para armazenar o valor do input do nome de usuário

  constructor(private router: Router) { } // Injeta o serviço Router no construtor

  /**
   * Método chamado ao clicar no botão "Pesquisar".
   * Navega para a página de perfil com o nome de usuário fornecido.
   */
  searchUser(): void {
    // Verifica se o nome de usuário não está vazio ou contém apenas espaços em branco
    if (this.username.trim()) {
      // Navega para a rota '/profile' e passa o nome de usuário como um parâmetro de rota.
      // O 'trim()' remove espaços em branco extras do início e fim.
      this.router.navigate(['/profile', this.username.trim()]);
    } else {
      // Se o campo estiver vazio, exibe um alerta ao usuário
      alert('Por favor, digite um nome de usuário do GitHub para pesquisar.');
    }
  }
}