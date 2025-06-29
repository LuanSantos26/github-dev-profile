import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute (para ler parâmetros da URL) e Router (para navegação)
import { GithubService } from '../github.service'; // Importa o serviço GitHub
import { CommonModule } from '@angular/common'; // **Importante:** Necessário para usar *ngIf, *ngFor em componentes standalone

@Component({
  selector: 'app-profile',
  standalone: true,           // Marca o componente como standalone
  imports: [CommonModule],    // Adiciona CommonModule aos imports para que diretivas estruturais funcionem
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = '';          // Armazena o nome de usuário obtido da URL
  user: any;                      // Armazena os dados do perfil do usuário
  repositories: any[] = [];       // Armazena o array de repositórios do usuário
  loading: boolean = true;        // Flag para controlar o estado de carregamento
  error: string | null = null;    // Armazena a mensagem de erro, se houver

  constructor(
    private route: ActivatedRoute,    // Injeta ActivatedRoute para acessar parâmetros da rota
    private githubService: GithubService, // Injeta o serviço GithubService
    private router: Router            // Injeta o serviço Router para navegação (botão de voltar)
  ) { }

  /**
   * Método do ciclo de vida chamado uma vez que o componente é inicializado.
   * Usado para obter o nome de usuário da rota e iniciar a busca.
   */
  ngOnInit(): void {
    // Se inscreve para observar as mudanças nos parâmetros da rota
    this.route.paramMap.subscribe(params => {
      // Obtém o parâmetro 'username' da URL. Se não existir, define como string vazia.
      this.username = params.get('username') || '';
      if (this.username) {
        this.fetchUserProfile(); // Se o username existe, inicia a busca do perfil
      } else {
        this.error = 'Nome de usuário não fornecido na URL. Por favor, volte e pesquise.';
        this.loading = false;
      }
    });
  }

  /**
   * Busca os dados do perfil do usuário na API do GitHub.
   */
  fetchUserProfile(): void {
    this.loading = true;  // Ativa o indicador de carregamento
    this.error = null;    // Limpa mensagens de erro anteriores

    this.githubService.getUser(this.username).subscribe({
      next: (userData) => {
        this.user = userData; // Atribui os dados do usuário
        this.fetchUserRepositories(); // Depois de obter o perfil, busca os repositórios
      },
      error: (err: Error) => { // Captura o erro do serviço (já tratado para ter uma mensagem amigável)
        this.loading = false; // Desativa o carregamento
        this.error = err.message; // Exibe a mensagem de erro
        console.error('Erro ao buscar perfil do usuário:', err);
      }
    });
  }

  /**
   * Busca os repositórios do usuário na API do GitHub e os ordena por estrelas.
   */
  fetchUserRepositories(): void {
    this.githubService.getUserRepos(this.username).subscribe({
      next: (repoData) => {
        // Ordena os repositórios pelo número de estrelas (stargazers_count) em ordem decrescente
        this.repositories = repoData.sort((a, b) => b.stargazers_count - a.stargazers_count);
        this.loading = false; // Desativa o carregamento
      },
      error: (err: Error) => { // Captura o erro do serviço
        this.loading = false; // Desativa o carregamento
        this.error = err.message; // Exibe a mensagem de erro
        console.error('Erro ao buscar repositórios:', err);
      }
    });
  }

  /**
   * Abre o link do site/blog do usuário em uma nova aba, se o link existir.
   * Adiciona 'https://' se a URL não começar com http(s):// para garantir que seja um link válido.
   */
  goToSite(): void {
    if (this.user?.blog) {
      const url = this.user.blog.startsWith('http://') || this.user.blog.startsWith('https://') ? this.user.blog : `https://${this.user.blog}`;
      window.open(url, '_blank');
    }
  }

  /**
   * Abre o perfil do Twitter do usuário em uma nova aba, se o nome de usuário do Twitter existir.
   */
  goToTwitter(): void {
    if (this.user?.twitter_username) {
      window.open(`https://twitter.com/${this.user.twitter_username}`, '_blank');
    }
  }

  /**
   * Navega de volta para a página inicial de busca.
   */
  goBack(): void {
    this.router.navigate(['/home']);
  }
}