# Daysi Cunha — Design System 2.1
**Status:** implementação de homologação, não publicada · 10/11/2026

## Princípio
Marca pessoal autoral, editorial e tecnológica. O site deve explicar quem constrói, o que constrói e o que aprende. Serviços e produtos comerciais são apresentados institucionalmente pela DAYSLUME.

## Tokens de base
| Papel | Token | Hex |
| --- | --- | --- |
| Papel / fundo claro | `--ds-paper` | `#F3F1EC` |
| Cartão claro | `--ds-surface` | `#FCFBF8` |
| Texto principal | `--ds-ink` | `#22283C` |
| Fundo escuro | `--ds-dark` | `#151B2C` |
| Profundidade | `--ds-plum` | `#42164B` |
| Ênfase pontual | `--ds-accent` | `#A54055` |
| Acolhimento | `--ds-peach` | `#D8B6A5` |
| Interação clara | `--ds-ice` | `#BBD7E6` |
| Texto secundário | `--ds-text-muted` | `#625E58` |
| Divisor | `--ds-line` | `#DDD7D1` |

**Fontes utilizadas na base existente:** Montserrat (display), DM Sans (corpo), Instrument Serif (acento pontual). Evitar pesos e tamanhos arbitrários por seção.

## Componentes e padrões
- **Cabeçalho:** assinatura Daysi Cunha, quatro destinos pessoais e acesso separado à DAYSLUME. Sticky, foco visível, alvos de toque >=44px, menu responsivo com Escape.
- **Hero:** identificação pessoal, proposta autoral, texto breve, duas ações reais e uma fotografia do ambiente profissional. A fotografia utiliza o asset original do site publicado `assets/images/daysi-cunha-hero.webp`; não é uma nova geração de imagem.
- **Seção editorial:** índice curto, título legível, apoio contextual, espaçamento vertical responsivo; evitar seções vazias.
- **Cards de projetos:** contexto, decisão, tecnologia e caminho público. Repositórios privados nunca são apresentados como links públicos.
- **Visualizações de produto:** quando não forem capturas reais, identificar explicitamente como “visualização ilustrativa”.
- **Caderno de ideias:** cards de leitura com destino direto a artigos existentes.
- **Ponte DAYSLUME:** informações institucionais apenas com CTA para o domínio oficial.
- **Contato:** separar conexões pessoais de solicitações comerciais.

## Breakpoints orientadores
- Desktop: acima de 980px — layout editorial em duas colunas.
- Tablet: 761–980px — Hero em coluna, painéis adaptados.
- Mobile: até 760px — conteúdo empilhado, cards de projetos em uma coluna.
- Compacto: até 420px — typography e espaçamento adaptados; sem rolagem horizontal.

## Acessibilidade
- Uma única H1 por página; headings hierárquicos.
- Botões e links com foco visível e texto claro.
- `prefers-reduced-motion` desativa animações essenciais.
- Fotografias com alt descritivo. Simulações não devem sugerir dados reais de clientes.
- Validar manualmente os contrastes WCAG, foco do menu, zoom 200% e leitura com tecnologias assistivas.

## Estado atual e dívida técnica
A versão 2.1 adiciona tokens e regras de componentes em `assets/css/daysi-v2-lumio.css` e ajusta a Hero em `assets/css/daysi-hero-2026.css`. **Ainda existem regras legadas sobrepostas** da versão 2.0; sua consolidação em arquivos menores por responsabilidade deve ocorrer após validação visual para evitar regressões.

A branch `main` permanece intacta, o arquivo `robots noindex` da prévia deve permanecer durante a homologação, e publicação/SEO/redirecionamentos exigem revisão final.

## Checklist de homologação
- [ ] Confirmar foto, enquadramento e legibilidade em 1440/1024/768/390/320px
- [ ] Testar menu, foco, navegação pelo teclado e scroll
- [ ] Verificar rolagem horizontal, altura de cards e contraste
- [ ] Inspecionar visualizações ilustrativas dos produtos e descrições
- [ ] Validar destinos de links, assets, artigos e páginas internas
- [ ] Remover `noindex` somente na publicação aprovada
- [ ] Conferir Open Graph, canonical, sitemap, Web Vitals e acessibilidade
