# Documento Mestre das Marcas — Daysi Cunha e DAYSLUME
Versão de trabalho 0.6 · 21/09/2026 · Atualizado na branch `feat/daysi-cunha-v2-editorial`.

## 1. Decisões aprovadas pela fundadora

**Arquitetura:** Daysi Cunha é a marca profissional e portfólio autoral; DAYSLUME é a marca empresarial, responsável pela apresentação comercial de serviços e soluções digitais. Os projetos podem aparecer em ambas com enfoques e atribuições distintos.

**DAYSLUME:** nome aprovado; direção empresarial “Estratégia e tecnologia para negócios”; ícone da margarida de seis pétalas e lettering DAYSLUME aprovados. Sua identidade visual não deve ser modificada durante a reforma do site pessoal. Sua disponibilidade jurídica deve ser tratada como verificação separada da aprovação criativa.

**Daysi Cunha 2.0:** direção editorial clara como base, com seções pontuais em grafite; assinatura principal escrita “Daysi Cunha”, com iniciais maiúsculas. Papel editorial: desenvolvimento web, projetos autorais, estudos, tecnologias e trajetória profissional. Comercialização de serviços é direcionada à DAYSLUME.

## 2. Direção visual em aplicação na prévia Daysi Cunha

- Fundo editorial: `#F3F1EC`; superfície clara: `#FCFBF8`; grafite: `#232323`; areia: `#B8B1A7`; cinza mineral: `#6E706E`.
- Paleta de trabalho aplicada na prévia; os códigos exatos não constituem um manual final aprovado pela fundadora.
- Assinatura tipográfica com iniciais maiúsculas; na prévia foi utilizada Montserrat. Títulos e interface utilizam Montserrat e DM Sans; Instrument Serif aparece pontualmente como recurso editorial. A seleção tipográfica definitiva ainda requer avaliação.
- Símbolo DC não é requisito de lançamento; monograma secundário segue pendente. Não reutilizar a margarida da DAYSLUME como símbolo pessoal.
- Fotografia da hero reutilizada do repositório atual. Conferir enquadramento em celular e computador antes da aprovação.

## 3. Papel de cada canal

**daysicunha.com.br:** portfólio autoral, estudos, trajetória, casos comentados pela desenvolvedora, networking e oportunidades profissionais.

**DAYSLUME:** site institucional, serviços, produtos VITRINI/ENGRENI conforme disponibilidade, pedidos de projeto e atendimento comercial.

**Apresentação compartilhada de cases:** no pessoal, autoria, stack, decisões técnicas e aprendizagem; no empresarial, contexto do cliente, necessidade atendida e funcionalidades efetivamente entregues. Projetos anteriores à empresa não devem ser atribuídos retroativamente à pessoa jurídica sem contexto.

## 4. Mapa de migração proposto

| Conteúdo atual de daysicunha.com.br | Tratamento planejado |
| --- | --- |
| Home atual com oferta de sites | Substituir pela nova home profissional após aprovação e testes. |
| `solucoes.html`, `sites-completos.html`, `landing-pages.html` | Criar equivalentes comerciais na DAYSLUME, revisar links e planejar redirecionamentos somente quando a migração estiver completa. |
| `vitrini.html`, `briefing-vitrini.html` | Atualizar oferta e centralizar a comercialização sob DAYSLUME; não copiar condições promocionais históricas como atuais. |
| `cases.html` e casos individuais | Preservar no pessoal com ênfase autoral; apresentar versões comerciais correspondentes na DAYSLUME. |
| `sobre.html` | Reescrever com trajetória, especialidades, estudos e relação com a DAYSLUME. |
| `blog.html` e artigos | Auditar individualmente; manter arquivos que tenham valor autoral, reclassificar e criar uma nova linha editorial técnica. |
| `contato.html` e `processo.html` | Redirecionar a contratação comercial à DAYSLUME após validar o atendimento; preservar no pessoal apenas contato profissional. |
| `faca-o-bem.html` | Manter temporariamente no domínio pessoal, sujeito a decisão específica. |

**Não apagar conteúdo nem implementar redirecionamentos antes de existirem as páginas de destino, caminhos de atendimento e testes de navegação.**

## 5. Implementação efetuada nesta versão da branch

- `index.html` é uma primeira home pessoal 2.0, com texto profissional, foto existente, projetos, seção Sobre, arquivo de conteúdo, ponte institucional com a DAYSLUME e contato profissional.
- `assets/css/daysi-v2.css`: design system experimental e responsividade, sem alterar `assets/css/style.css` que sustenta as páginas antigas.
- `assets/js/daysi-v2.js`: menu mobile com atributos de acessibilidade.
- As páginas internas permanecem como no site anterior. A experiência visual não está completamente unificada até a etapa de migração.
- A prévia inclui `noindex, nofollow`. **Remover essa instrução e revisar URL canônica, sitemap e Open Graph antes de publicar em produção.**
- A DAYSLUME não foi alterada. Não foi feita alteração na branch `main` nem no site publicado da Daysi Cunha.

## 6. Pendências e critérios de aprovação

1. Conferir desktop e mobile da home, foto, legibilidade, comportamento do menu, botões e links.
2. Aprovar a linguagem editorial, escrita do nome e paleta após visualização real.
3. Consolidar fotos autorais e capturas efetivas de ENGRENI Agenda/VITRINI em vez de ilustrações de interface.
4. Refazer as páginas internas sob o mesmo sistema visual e atualizar a organização do conteúdo.
5. Criar e validar as páginas comerciais de destino da DAYSLUME antes de migrar ofertas.
6. Revisar direitos de uso dos projetos, metadados, URL canônica, sitemap, acessibilidade e SEO.
7. Publicar somente após aprovação explícita da nova versão e roteiro de migração. A produção atual deve permanecer intacta até lá.
