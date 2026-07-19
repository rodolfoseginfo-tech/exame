# StudySim — instruções permanentes para agentes

## Objetivo do produto

O StudySim é um motor simples de preparação para certificações. Preserve uma experiência intuitiva, mobile-first e com no máximo três destinos principais: Provas, Revisar e Histórico. Uma ação central deve estar acessível em até três cliques.

## Fluxo padrão de implementação

Quando o usuário pedir para implementar uma mudança:

1. Inspecione o código e confirme o comportamento atual.
2. Preserve funcionalidades existentes e dados locais.
3. Implemente a menor solução completa que satisfaça o pedido.
4. Execute `npm run lint`.
5. Execute o build no Windows com o runtime disponível; em Linux use `npm run build`.
6. Revise `git diff --check` e não inclua mudanças não relacionadas.
7. Para funcionalidades ou mudanças relevantes, use uma branch `codex/<descrição-curta>` e abra Pull Request.
8. Não faça merge nem publique sem autorização explícita do usuário.
9. Depois do merge na `main`, acompanhe o GitHub Actions e valide o GitHub Pages.

## Regras de produto

- Não adicionar menus principais sem justificativa forte.
- Manter desktop e celular funcionais.
- Preservar acessibilidade por teclado, foco visível e alvos de toque adequados.
- Não usar dumps, questões reais memorizadas ou bancos comerciais sem licença.
- Questões geradas devem ser autorais e identificadas como conteúdo de prática.
- Não inventar métricas, histórico ou progresso do usuário.
- Dados de certificações diferentes devem permanecer separados.
- Alterações no motor de questões devem considerar embaralhamento de alternativas, revisão, persistência e retomada de sessão.

## Arquivos principais

- `app/page.tsx`: interface, sessões, histórico e persistência.
- `app/cissp-bank.ts`: banco CISSP autoral.
- `app/exin-dpo-bank.ts`: banco EXIN DPO autoral.
- `app/globals.css`: estilos desktop e mobile.
- `public/sw.js`: funcionamento offline.
- `.github/workflows/pages.yml`: publicação no GitHub Pages.

## Entrega

O resumo final deve informar:

- resultado entregue;
- arquivos alterados;
- verificações executadas;
- limitações ou riscos;
- URL do Pull Request ou do site publicado.

