# 🤖 Telegram VIP Link Generator Bot

Bot profissional do Telegram que gera links de convite temporários e exclusivos para grupos VIP.

## ✨ Funcionalidades

- 🔐 Autenticação por ID de usuário do Telegram
- 🔗 Geração de links de convite com expiração de 1 hora
- 👤 Links de uso único (apenas 1 pessoa pode usar cada link)
- 📱 Suporte para múltiplos grupos VIP
- 🎨 Mensagens profissionais com formatação markdown
- 📊 Sistema de logs detalhado
- 🚀 Pronto para deploy no Railway

## 🛠️ Tecnologias

- Node.js 18+
- TypeScript
- Grammy (Telegram Bot Framework)
- Railway (Deploy)

## 📋 Pré-requisitos

1. Bot do Telegram criado via [@BotFather](https://t.me/BotFather)
2. Bot deve ser **administrador** em todos os grupos VIP
3. Bot deve ter permissão de **"Invite Users via Link"**
4. IDs dos usuários autorizados
5. IDs dos grupos VIP (formato: -100xxxxxxxxxx)

## 🚀 Instalação Local

### 1. Clone e instale dependências:
```bash
git clone <repo-url>
cd telegram-vip-bot
npm install
```

### 2. Configure variáveis de ambiente:
```bash
cp .env.example .env
```

Edite `.env` com suas credenciais:
```env
BOT_TOKEN=your_bot_token_here
AUTHORIZED_USER_IDS=123456789,987654321
VIP_GROUP_IDS=-1003099433343,-1002848196398,-1002854158242,-1002753765919,-1002697485775
NODE_ENV=development
```

### 3. Execute em desenvolvimento:
```bash
npm run dev
```

### 4. Build para produção:
```bash
npm run build
npm start
```

## 🚂 Deploy no Railway

### Método 1: Via GitHub (Recomendado)

1. Faça push do código para GitHub
2. Acesse [Railway.app](https://railway.app)
3. Clique em "New Project" → "Deploy from GitHub repo"
4. Selecione seu repositório
5. Adicione as variáveis de ambiente:
   - `BOT_TOKEN`
   - `AUTHORIZED_USER_IDS`
   - `VIP_GROUP_IDS`
   - `NODE_ENV=production`
6. Deploy automático! ✅

### Método 2: Via Railway CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Inicializar projeto
railway init

# Adicionar variáveis de ambiente
railway variables set BOT_TOKEN=your_token
railway variables set AUTHORIZED_USER_IDS=123,456
railway variables set VIP_GROUP_IDS=-100xxx,-100yyy
railway variables set NODE_ENV=production

# Deploy
railway up
```

## 📱 Como Usar

### Para Usuários Autorizados:

1. Inicie conversa com o bot
2. Use o comando `/generate`
3. Receba os 5 links exclusivos
4. Compartilhe os links (válidos por 1 hora)

### Comandos Disponíveis:

- `/start` - Iniciar o bot
- `/generate` - Gerar links VIP
- `/help` - Ajuda

## 🔧 Configuração do Bot no Telegram

### 1. Obter o Bot Token:
- Fale com [@BotFather](https://t.me/BotFather)
- Envie `/newbot`
- Siga as instruções
- Copie o token

### 2. Adicionar Bot aos Grupos:
- Adicione o bot em cada grupo VIP
- Promova o bot a **administrador**
- Dê permissão: **"Invite Users via Link"**

### 3. Obter IDs dos Grupos:
Método 1 - Adicione [@RawDataBot](https://t.me/RawDataBot) ao grupo

Método 2 - Use este código:
```javascript
// Envie uma mensagem no grupo e veja o ID no log
bot.on('message', (ctx) => console.log(ctx.chat.id));
```

### 4. Obter ID do Usuário:
- Fale com [@userinfobot](https://t.me/userinfobot)
- Ele mostrará seu ID

## 🐛 Solução de Problemas

### Bot não responde:
✅ Verifique se o BOT_TOKEN está correto
✅ Confirme que o bot está rodando (veja logs)

### "Failed to generate link":
✅ Bot é admin no grupo?
✅ Bot tem permissão "Invite Users via Link"?
✅ ID do grupo está correto?

### Usuário autorizado não consegue usar:
✅ ID do usuário está em AUTHORIZED_USER_IDS?
✅ ID está no formato correto (números, sem @)?

### Links expiram antes de 1 hora:
⚠️ Limitação do Telegram - links podem expirar se:
- Grupo atingir limite de membros
- Configurações do grupo mudarem
- Bot perder permissões de admin

## 📊 Logs

O bot gera logs detalhados:

```
✅ Bot initialized: @YourBot
✅ Bot has admin rights in Grupo VIP 1
ℹ️  User 123456789 (@username) requested link generation
✅ Successfully generated 5/5 links for user 123456789
🚫 UNAUTHORIZED ACCESS ATTEMPT: User ID: 999999999
```

## 🔒 Segurança

- ✅ Autenticação por whitelist de IDs
- ✅ Logs de tentativas de acesso não autorizado
- ✅ Sem armazenamento de dados sensíveis
- ✅ Links temporários e de uso único
- ✅ Variáveis de ambiente para credenciais

## 📈 Melhorias Futuras

- [ ] Banco de dados para histórico de links
- [ ] Dashboard web para gerenciamento
- [ ] Notificações quando links são usados
- [ ] Estatísticas de uso
- [ ] Comandos de admin adicionais
- [ ] Suporte a múltiplos idiomas

## 📄 Licença

MIT License - Sinta-se livre para usar e modificar!

## 🤝 Suporte

Problemas? Abra uma issue no GitHub!

---

**Desenvolvido para gerenciamento VIP profissional**
