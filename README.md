# 🎮 GamePlay — Organize suas jogatinas no Discord

[![React Native](https://img.shields.io/badge/React%20Native-0.64.3-61DAFB?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2044-000000?logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.3.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![CI/CD Release](https://github.com/Intern-Yago/gameplayReact-Native/actions/workflows/release.yml/badge.svg)](https://github.com/Intern-Yago/gameplayReact-Native/actions/workflows/release.yml)

O **GamePlay** é uma aplicação React Native e Expo desenvolvida para conectar jogadores, facilitando o agendamento de partidas e a organização de grupos de jogos nos seus servidores do **Discord**.

---

## 🎯 Funcionalidades

- 🔐 **Autenticação via Discord:** Login seguro usando OAuth2 com `expo-auth-session`.
- 👤 **Perfil do Jogador:** Exibição da foto de perfil do Discord, primeiro nome, mensagem personalizada e opção de logout.
- 📂 **Categorização de Partidas:** Filtre e crie partidas por **Ranqueada**, **Duelo 1x1**, **Amistoso** e **Treino**.
- 🏰 **Servidores do Discord:** Integração com a API do Discord (`/users/@me/guilds`) para selecionar seus servidores e exibir ícones oficiais.
- 📝 **Agendamento Completo:** Formulário com seleção de servidor, data, horário e descrição detalhada da jogatina.
- 👥 **Detalhes & Membros:** Lista de jogadores do servidor com status em tempo real (`online`/`offline`) via widget do Discord.
- 🔗 **Convite Direto:** Botão para entrar na partida com redirecionamento para o link de convite (`instant_invite`).
- 📲 **Compartilhamento:** Compartilhe o convite do grupo com amigos diretamente pelo aplicativo.
- 💾 **Persistência Local:** Armazenamento seguro de partidas e sessão com `@react-native-async-storage/async-storage`.

---

## 🛠️ Tecnologias e Bibliotecas

| Tecnologia | Finalidade |
| :--- | :--- |
| **React Native** | Framework principal mobile cross-platform |
| **Expo (SDK 44)** | Plataforma de desenvolvimento e builds |
| **TypeScript** | Superset JavaScript para tipagem estática |
| **React Navigation** | Navegação em pilha (`@react-navigation/stack`) |
| **Expo AuthSession** | Fluxo de autenticação OAuth2 |
| **Axios** | Consumo das APIs REST do Discord |
| **Async Storage** | Persistência offline de dados e tokens |
| **Expo Vector Icons / SVGs** | Ícones vetoriais e ilustrações customizadas |
| **Google Fonts (Rajdhani & Inter)** | Tipografia moderna alinhada ao design do Discord |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18 ou v20 recomendados)
- Gerenciador de pacotes `npm` ou `yarn`
- Aplicativo **Expo Go** instalado no seu celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) ou [iOS](https://apps.apple.com/app/expo-go/id982107779))

### 1. Clonar o repositório
```bash
git clone https://github.com/Intern-Yago/gameplayReact-Native.git
cd gameplayReact-Native
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Executar o servidor de desenvolvimento Expo
```bash
npm start
```
*ou para abrir no celular via tunnel:*
```bash
npx expo-cli start --tunnel
```

---

## ⚙️ Configuração do OAuth2 do Discord

Para conectar o aplicativo ao seu próprio aplicativo do Discord:

1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications).
2. Crie uma nova aplicação e copie o **Client ID**.
3. Na aba **OAuth2**:
   - Adicione o Redirect URI oficial do Expo: `https://auth.expo.io/@anonymous/gameplay-8409f062-ce02-455d-87f8-65139e9df23e`
4. Atualize o arquivo [`src/configs/discordAuth.ts`](file:///C:/Users/Yago/projetos/gameplayReact-Native/src/configs/discordAuth.ts):
```typescript
const REDIRECT_URI = 'https%3A%2F%2Fauth.expo.io%2F%40anonymous%2Fgameplay-8409f062-ce02-455d-87f8-65139e9df23e';
const SCOPE = 'identify%20connections%20email%20guilds';
const RESPONSE_TYPE = 'token';
const CLIENT_ID = 'SEU_CLIENT_ID_AQUI';
const CDN_IMAGE = 'https://cdn.discordapp.com';
```

---

## 🤖 Pipeline CI/CD com GitHub Actions

O repositório possui uma pipeline completa automatizada em [`.github/workflows/release.yml`](file:///C:/Users/Yago/projetos/gameplayReact-Native/.github/workflows/release.yml).

### Fluxo de Build & Release:
1. **Trigger:** Disparado manualmente na aba **Actions** do GitHub ou automaticamente ao subir tags no formato `v*`.
2. **Versionamento:** Incrementa a versão no `package.json` e `app.json`.
3. **Changelog:** Atualiza automaticamente o `CHANGELOG.md`.
4. **EAS Build:** Compila o arquivo `.apk` usando o **Expo EAS Cloud**.
5. **Release:** Publica a Release oficial no GitHub e anexa o arquivo `.apk` diretamente para download dos usuários.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE). Desenvolvido durante o evento NLW Together da Rocketseat e aprimorado com novos recursos e automações.
