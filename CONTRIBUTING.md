# Como solicitar e entregar mudanças

## Pelo ChatGPT ou Codex

Use este prompt:

```text
Trabalhe no repositório rodolfoseginfo-tech/exame.

Implemente:
[descreva o resultado]

Requisitos:
- siga o AGENTS.md;
- preserve funcionalidades existentes;
- mantenha a interface simples e responsiva;
- crie uma branch codex/<descrição>;
- execute lint e build;
- abra um Pull Request;
- não faça merge sem minha aprovação.
```

## Pelo GitHub

Abra uma issue usando o formulário **Solicitar implementação**. A issue funcionará como especificação do trabalho e poderá ser entregue por branch e Pull Request.

## Publicação

O merge na branch `main` aciona `.github/workflows/pages.yml`. O GitHub Pages só deve ser considerado concluído depois que o workflow terminar e o site publicado for validado.

