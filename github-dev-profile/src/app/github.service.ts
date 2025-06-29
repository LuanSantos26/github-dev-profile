import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Importa HttpClient e HttpErrorResponse
import { Observable, throwError } from 'rxjs'; // Importa Observable e throwError do RxJS
import { catchError } from 'rxjs/operators'; // Importa o operador catchError

@Injectable({
  providedIn: 'root' // Garante que o serviço esteja disponível em todo o aplicativo como um singleton
})
export class GithubService {
  private baseUrl = 'https://api.github.com/users'; // URL base para a API de usuários do GitHub

  constructor(private http: HttpClient) { } // Injeta o HttpClient no construtor

  /**
   * Busca os dados do perfil de um usuário do GitHub.
   * @param username O nome de usuário do GitHub a ser pesquisado.
   * @returns Um Observable que emite os dados do perfil do usuário.
   */
  getUser(username: string): Observable<any> {
    // Faz uma requisição GET para a API de usuários do GitHub
    return this.http.get(`${this.baseUrl}/${username}`).pipe(
      catchError(this.handleError) // Aplica o tratamento de erros definido abaixo
    );
  }

  /**
   * Busca os repositórios públicos de um usuário específico do GitHub.
   * @param username O nome de usuário do GitHub cujos repositórios serão buscados.
   * @returns Um Observable que emite um array de objetos de repositório.
   */
  getUserRepos(username: string): Observable<any[]> {
    // Faz uma requisição GET para a API de repositórios do usuário do GitHub
    return this.http.get<any[]>(`${this.baseUrl}/${username}/repos`).pipe(
      catchError(this.handleError) // Aplica o tratamento de erros definido abaixo
    );
  }

  /**
   * Método privado para tratar erros de requisições HTTP da API do GitHub.
   * Cria uma mensagem de erro amigável baseada no tipo de erro.
   * @param error O objeto HttpErrorResponse que contém os detalhes do erro.
   * @returns Um Observable que emite um erro (rejeita a promessa) com uma mensagem específica.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido na requisição da API do GitHub.';
    if (error.error instanceof ErrorEvent) {
      // Erro que ocorreu no lado do cliente (ex: problema de rede, erro no código)
      errorMessage = `Erro de Rede: ${error.error.message}`;
    } else {
      // O backend retornou um código de resposta sem sucesso (ex: 404, 500)
      // O corpo da resposta pode conter pistas sobre o que deu errado.
      if (error.status === 404) {
        errorMessage = 'Usuário do GitHub não encontrado. Verifique o nome de usuário e tente novamente.';
      } else if (error.status === 403) {
        errorMessage = 'Limite de taxa da API do GitHub excedido. Por favor, aguarde e tente novamente mais tarde.';
      } else {
        errorMessage = `Erro do Servidor: Código ${error.status}, mensagem: ${error.message}`;
      }
    }
    console.error('Detalhes do Erro da API do GitHub:', error); // Loga o erro completo para depuração
    // Retorna um Observable que pode ser capturado pelo componente
    return throwError(() => new Error(errorMessage));
  }
}