# 🥔 BatataFood - Delivery de Batatas

Aplicativo web de delivery especializado em batatas de todos os tipos, similar ao iFood. Desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

## ✨ Funcionalidades

### 🏠 Página Inicial
- Catálogo completo de produtos com 14+ tipos de batatas
- Filtros por categoria (frita, assada, doce, rösti, gratinada, hasselback, purê, croquete)
- Busca de produtos por nome ou descrição
- Listagem de restaurantes parceiros
- Hero section com destaques

### 🥔 Tipos de Batatas Disponíveis
1. **Batata Frita** - Palito clássica, rústica, chips
2. **Batata Assada** - Recheada, simples
3. **Batata Doce** - Frita, assada, chips
4. **Batata Rösti** - Tradicional suíço
5. **Batata Gratinada** - Ao creme
6. **Batata Hasselback** - Com parmesão
7. **Purê de Batata** - Cremoso
8. **Croquetes** - Simples e recheados

### 🛒 Sistema de Carrinho
- Adicionar/remover produtos
- Ajustar quantidades
- Carrinho lateral deslizante
- Cálculo automático de subtotal, taxa de entrega e total
- Persistência no localStorage

### 🏪 Páginas de Restaurante
- Informações detalhadas do restaurante
- Avaliações e tempo de entrega
- Filtro de produtos por categoria
- Status de funcionamento (aberto/fechado)

### 📦 Página de Produto
- Detalhes completos do produto
- Seletor de quantidade
- Informações do restaurante vendedor
- Avaliações e tempo de preparo

### 💳 Checkout
- Formulário de endereço de entrega
- Múltiplas formas de pagamento:
  - Cartão de Crédito
  - Cartão de Débito
  - PIX
  - Dinheiro
- Resumo do pedido
- Validação de campos

### 📍 Rastreamento de Pedido
- Acompanhamento em tempo real (simulado)
- Status visuais:
  - ⏳ Aguardando confirmação
  - ✅ Pedido confirmado
  - 👨‍🍳 Preparando seu pedido
  - 📦 Pedido pronto
  - 🚚 Saiu para entrega
  - 🎉 Pedido entregue
- Previsão de entrega
- Informações de contato

## 🛠️ Tecnologias

- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Context API** - Gerenciamento de estado do carrinho

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🚀 Instalação e Execução

### 1. Instalar dependências:
```bash
cd batata-food
npm install
```

### 2. Executar em desenvolvimento:
```bash
npm run dev
```

Acesse: http://localhost:3000

### 3. Build para produção:
```bash
npm run build
npm start
```

### 4. Verificar tipos TypeScript:
```bash
npm run type-check
```

### 5. Executar linter:
```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
batata-food/
├── app/                          # Páginas Next.js (App Router)
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página inicial
│   ├── globals.css              # Estilos globais
│   ├── produto/[id]/            # Página de produto dinâmica
│   ├── restaurante/[id]/        # Página de restaurante dinâmica
│   ├── checkout/                # Página de checkout
│   └── pedido/[id]/             # Página de rastreamento
├── components/                   # Componentes React reutilizáveis
│   ├── Header.tsx               # Cabeçalho com navegação
│   ├── Cart.tsx                 # Carrinho lateral
│   ├── ProductCard.tsx          # Card de produto
│   ├── RestaurantCard.tsx       # Card de restaurante
│   ├── CategoryFilter.tsx       # Filtro de categorias
│   └── OrderTracking.tsx        # Rastreamento de pedido
├── lib/                         # Utilitários e contextos
│   ├── types.ts                 # Tipos TypeScript
│   ├── utils.ts                 # Funções utilitárias
│   └── cart-context.tsx         # Context API do carrinho
├── data/                        # Dados mockados
│   ├── products.ts              # Produtos
│   └── restaurants.ts           # Restaurantes
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🎨 Design

### Paleta de Cores
- **Primary (Amarelo/Dourado)**: Representa as batatas
  - 50-900: Gradientes de amarelo
- **Secondary (Verde)**: Representa frescor
  - 50-900: Gradientes de verde
- **Neutros**: Cinzas para textos e backgrounds

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Pesos**: Regular (400), Semibold (600), Bold (700)

### Componentes
- Cards com hover effects
- Botões com transições suaves
- Layout responsivo (mobile-first)
- Animações com Tailwind
- Emojis para ícones (sem dependências externas)

## 🧪 Testes

### Verificações Realizadas
✅ Type-check do TypeScript (sem erros)
✅ Build de produção (compilado com sucesso)
✅ Todas as páginas renderizam corretamente
✅ Sistema de carrinho funcional
✅ Navegação entre páginas
✅ Responsividade

### Testes Manuais Recomendados
1. Adicionar produtos ao carrinho
2. Ajustar quantidades no carrinho
3. Remover itens do carrinho
4. Filtrar produtos por categoria
5. Buscar produtos
6. Navegar para página de produto
7. Navegar para página de restaurante
8. Finalizar pedido no checkout
9. Visualizar rastreamento do pedido
10. Testar em diferentes tamanhos de tela

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🔄 Fluxo do Usuário

1. **Descoberta**: Usuário navega pelos produtos e restaurantes
2. **Seleção**: Adiciona produtos ao carrinho
3. **Revisão**: Visualiza carrinho e ajusta quantidades
4. **Checkout**: Preenche endereço e forma de pagamento
5. **Confirmação**: Recebe número do pedido
6. **Rastreamento**: Acompanha status em tempo real

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Outras Plataformas
- Netlify
- Railway
- AWS Amplify
- Google Cloud Run

## 📝 Dados Mockados

O aplicativo usa dados mockados para demonstração:
- 14 produtos de batatas
- 3 restaurantes parceiros
- Simulação de rastreamento de pedido

Para produção, conecte a uma API real substituindo os dados em `/data/`.

## 🔐 Funcionalidades Futuras

- [ ] Autenticação de usuários
- [ ] Histórico de pedidos
- [ ] Favoritos
- [ ] Avaliações e comentários
- [ ] Cupons de desconto
- [ ] Programa de fidelidade
- [ ] Notificações push
- [ ] Chat com restaurante
- [ ] Múltiplos endereços
- [ ] Agendamento de entrega

## 📄 Licença

MIT License - Livre para uso e modificação

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir issues e pull requests.

---

**Desenvolvido com 💛 e 🥔**
