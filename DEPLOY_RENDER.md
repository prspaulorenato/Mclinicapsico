# Instruções para Deploy no Render

Este documento contém instruções detalhadas para fazer o deploy da landing page da psicóloga Sônia Silva no Render.

## Preparação

1. Crie uma conta no [Render](https://render.com) se ainda não tiver uma
2. Faça login na sua conta do Render

## Deploy do Projeto

### Opção 1: Deploy via GitHub

1. Faça upload do projeto para um repositório GitHub
2. No dashboard do Render, clique em "New" e selecione "Web Service"
3. Conecte sua conta GitHub e selecione o repositório
4. Configure o serviço:
   - **Nome**: clinica-psicologica (ou outro nome de sua preferência)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
   - **Plano**: Free (ou outro de sua escolha)

### Opção 2: Deploy Manual

1. No dashboard do Render, clique em "New" e selecione "Web Service"
2. Escolha "Deploy from existing code"
3. Faça upload do arquivo zip do projeto
4. Configure o serviço com as mesmas configurações acima

## Configuração de Variáveis de Ambiente

Após criar o serviço, você precisa configurar as variáveis de ambiente:

1. Na página do seu serviço no Render, vá para "Environment"
2. Adicione as seguintes variáveis:
   - `NODE_ENV`: `production`
   - `EMAIL_USER`: Seu endereço de e-mail Gmail
   - `EMAIL_PASS`: Sua senha de app do Gmail (não sua senha normal)
   - `PORT`: `10000` (o Render vai ignorar isso e usar sua própria porta)

**Importante sobre EMAIL_PASS**: 
- Para Gmail, você precisa usar uma "Senha de App" e não sua senha normal
- Para criar uma senha de app:
  1. Acesse sua conta Google
  2. Vá para Segurança > Verificação em duas etapas (ative se não estiver ativa)
  3. Depois vá para "Senhas de app"
  4. Crie uma nova senha para "Outro (nome personalizado)"
  5. Use essa senha gerada na variável EMAIL_PASS

## Verificando o Deploy

1. Após o deploy, o Render fornecerá uma URL para seu site (algo como https://clinica-psicologica.onrender.com)
2. Acesse essa URL para verificar se o site está funcionando corretamente
3. Teste o formulário de contato para garantir que os e-mails estão sendo enviados

## Solução de Problemas

Se encontrar problemas:

1. **Verifique os logs**: No dashboard do Render, vá para "Logs" para ver mensagens de erro
2. **Verifique as variáveis de ambiente**: Certifique-se de que EMAIL_USER e EMAIL_PASS estão configurados corretamente
3. **Problemas com e-mail**: Se os e-mails não estiverem sendo enviados, verifique:
   - Se a senha de app do Gmail está correta
   - Se a verificação em duas etapas está ativada na sua conta Google
   - Se o Gmail não está bloqueando o envio por segurança

## Usando seu Próprio Domínio (Opcional)

Se você tiver um domínio personalizado:

1. No dashboard do Render, vá para "Settings" > "Custom Domain"
2. Siga as instruções para configurar seu domínio

## Manutenção

Para atualizar o site após o deploy inicial:

1. Faça as alterações necessárias no código
2. Se estiver usando GitHub, faça commit e push das alterações
3. O Render detectará automaticamente as mudanças e fará um novo deploy
4. Se estiver usando deploy manual, você precisará fazer upload do código novamente

## Suporte

Se precisar de ajuda adicional:
- Consulte a [documentação do Render](https://render.com/docs)
- Entre em contato para suporte técnico
