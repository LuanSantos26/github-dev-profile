# Desafio Angular: Perfil de Desenvolvedor GitHub

## 📝 Objetivo do Desafio

Construir uma aplicação Angular que se conecta à API pública do GitHub para buscar perfis de desenvolvedores e exibir seus dados, incluindo repositórios, em uma página de perfil dedicada.

## ✨ Histórias (Funcionalidades Implementadas)

Baseado nos requisitos do desafio, as seguintes funcionalidades foram implementadas:

* **Pesquisa de Usuário:** Ao entrar na home page, o usuário pode pesquisar um perfil de desenvolvedor utilizando o username do GitHub e ter os dados exibidos na página de perfil.
* **Exibição de Perfil:** Os dados do usuário pesquisado são exibidos corretamente na página de perfil.
* **Ordenação de Repositórios:** Na página de perfil, os repositórios são ordenados com o seguinte critério: dos que têm mais estrelas, para os que têm menos estrelas.
* **Links para Repositórios:** Os nomes dos repositórios são links clicáveis que direcionam para o repositório original no GitHub em uma nova aba.
* **Botão de Site/Blog:** Caso o usuário pesquisado possua um site em suas informações de perfil, um botão é exibido para abrir esse site.
* **Botão de Twitter:** Similarmente, se o usuário pesquisado tiver uma conta no Twitter em seu perfil, um botão é exibido para abrir o perfil do Twitter.
* **Botão de Voltar:** Na página de perfil, um botão "Voltar" permite retornar à home page, possibilitando a pesquisa de um novo usuário do GitHub.

## 🛠️ Requisitos Técnicos

* **Framework:** Angular 17.3.17
* **Linguagem:** TypeScript
* **Estilização:** CSS Clássico
* **Arquitetura:** Componentes Standalone (padrão do Angular 17)
* **Rotas:** Implementação de duas rotas principais: `/home` (para busca) e `/profile/:username` (para exibição do perfil).

## 💻 Ambiente de Desenvolvimento

Para rodar este projeto, você precisará das seguintes ferramentas instaladas em seu sistema operacional:

* **Node.js:** `v18.20.8`
* **npm:** `v11.4.2`
* **Angular CLI:** `17.3.17` (instalado globalmente)

### Como Instalar e Rodar o Projeto

Siga os passos abaixo para configurar e executar a aplicação em sua máquina:

1.  **Pré-requisitos:** Certifique-se de ter as versões corretas de Node.js e npm. Instale a versão exata do Angular CLI globalmente:
    ```bash
    npm install -g @angular/cli@17.3.17
    ```

2.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO_AQUI]
    ```

3.  **Navegue até o diretório do projeto:**
    ```bash
    cd github-dev-profile
    ```

4.  **Instale as dependências:**
    ```bash
    npm install
    ```
    Este comando irá baixar e instalar todas as dependências listadas no arquivo `package.json` do projeto.

### Como Rodar o Ambiente de Desenvolvimento

Para iniciar o servidor de desenvolvimento e ver a aplicação em ação:

```bash
ng serve -o