# MKP Motos — Site Completo

## Como rodar

### Pré-requisito
Instale o Node.js (https://nodejs.org) versão 18 ou superior.

### Instalar dependências
```
npm install
```

### Rodar em desenvolvimento
```
npm run dev
```
Acesse: http://localhost:5173

### Build para produção
```
npm run build
```
Os arquivos estáticos ficam em `dist/`.

---

## Painel Administrativo

- Clique no ícone de **cadeado** no canto inferior esquerdo da tela
- Senha: `mkpmotos2020`
- **Aba Gestão de Estoque**: adicionar, editar, remover motos
- **Aba Edição do Site**: editar textos, slogans, imagens, contato, footer

Todas as alterações são salvas no `localStorage` do navegador e refletem em tempo real.
"rebuild" 
