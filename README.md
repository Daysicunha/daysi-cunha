# Daysi Cunha — portfólio pessoal 2.0

> Estado: prévia editorial na branch `feat/daysi-2-pessoal-dayslume`. A branch `main` ainda contém o site comercial legado em produção. Não publicar a prévia sem concluir a migração.

## Arquitetura de marca

- **Daysi Cunha**: trajetória profissional, desenvolvimento web, projetos e estudos autorais, conteúdos e networking.
- **DAYSLUME**: empresa/estúdio responsável por serviços comerciais, soluções, produtos VITRINI/ENGRENI e solicitações de projeto. O site pessoal a apresenta como empresa fundada por Daysi, sem replicar seu catálogo de serviços.
- Projetos podem constar nos dois sites, cada qual com atribuição temporal e editorial apropriada.
- Não reutilizar a flor/assinatura gráfica da DAYSLUME como símbolo pessoal.

## Páginas reformuladas

| Arquivo | Finalidade |
| --- | --- |
| `index.html` | Home autoral, resumo dos projetos, trajetória, conteúdos, ponte institucional e contato |
| `sobre.html` | Trajetória, prática, interesses, formação em andamento e relação com a DAYSLUME |
| `projetos.html` | Portfólio e estudos com foco em autoria e desenvolvimento |
| `cases/tornearia-barbosa.html` | Estudo técnico-autoral do projeto anterior |
| `conteudos.html` | Caderno autoral e arquivo de textos |
| `blog/presenca-digital-estrategica.html` | Artigo original do arquivo, em moldura editorial atualizada |
| `blog/depender-apenas-do-instagram-riscos.html` | Artigo original do arquivo, em moldura editorial atualizada |
| `contato.html` | Conexões profissionais e encaminhamento de serviços à DAYSLUME |

Estilos: `assets/css/daysi-v2.css` (base do site) e `assets/css/daysi-v2-internas.css` (páginas internas). Interações: `assets/js/daysi-v2.js`.

## O que ainda é legado

Arquivos `solucoes.html`, `processo.html`, `vitrini.html`, `blog.html`, `cases.html` e outras rotas antigas foram mantidos no repositório por segurança. Não há links comerciais legados na navegação principal da nova estrutura, mas essas URLs antigas continuam acessíveis até a migração segura para páginas de destino equivalentes na DAYSLUME.

## Checklist antes de publicar

1. Conferir prévia real em desktop e celular (especialmente enquadramento da foto da hero), comportamento do menu e contraste.
2. Confirmar fotografias autorais e substituir mocks de projetos por capturas reais aprovadas.
3. Revisar links externos, permissões dos repositórios e atribuição histórica dos cases.
4. Confirmar URLs finais da DAYSLUME e funcionamento dos canais de contato antes de redirecionar qualquer rota comercial antiga.
5. Preparar mapa 301 das URLs comerciais legadas e avaliar destino individual dos artigos e URLs que continuarem na marca pessoal.
6. Remover `noindex, nofollow` das páginas a indexar, inserir canonical/OG com URL pública, atualizar `sitemap.xml` e checar `robots.txt`.
7. Publicar a nova versão apenas depois de aprovação explícita do visual, copy e fluxo de navegação.

## Visualização local

Servir a raiz do repositório com `python3 -m http.server 8000` e abrir `http://localhost:8000`. O repositório usa HTML, CSS e JavaScript sem build.

© 2026 Daysi Cunha.
