# FC Clean Architecture - Product Use Cases

## Como rodar os testes

1. Instale as dependências:

```bash
npm install
```

2. Rode todos os testes (unitários + integração):

```bash
npm test
```

## Use Cases implementados para Product

- CreateProductUseCase
- FindProductUseCase
- ListProductUseCase
- UpdateProductUseCase

## Localização do código

- Use cases: `src/usecase/product/*`
- Repositório Sequelize: `src/infrastructure/product/repository/sequelize/*`
- Rotas API: `src/infrastructure/api/routes/*`
- DTOs: `src/usecase/product/*/*.dto.ts`

## Endpoint

- GET `/product` -> retorna `{ products: [{ id, name, price }, ...] }` com status 200

## Teste E2E adicionado

- `src/infrastructure/api/__tests__/product.e2e.spec.ts`

## Observação

- Foi adicionado `jest.setTimeout(10000)` para testes de integração baseados em SQLite em memória, para evitar timeout por sync do Sequelize.
