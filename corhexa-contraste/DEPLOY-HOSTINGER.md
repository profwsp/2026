# Publicar em corhexa.washington.pro.br (Hostinger)

Arquivos desta pasta:
- `index.html` — a ferramenta (auto-contida, sem dependências além das fontes do Google Fonts)
- `favicon.svg` — ícone da aba
- `.htaccess` — força HTTPS, remove `/index.html` da URL e ativa cache
- `robots.txt` — permite indexação

## 1. Criar o subdomínio no hPanel

1. Entre no [hPanel](https://hpanel.hostinger.com) da conta que hospeda `washington.pro.br`.
2. Vá em **Domínios → Subdomínios**.
3. Crie o subdomínio `corhexa` para o domínio `washington.pro.br` (isso gera `corhexa.washington.pro.br`).
4. Anote a pasta raiz que a Hostinger criar, normalmente:
   `domains/washington.pro.br/public_html/corhexa/`

## 2. Enviar os arquivos

**Opção A — Gerenciador de Arquivos (mais simples)**
1. hPanel → **Arquivos → Gerenciador de Arquivos**.
2. Entre na pasta do subdomínio (`.../public_html/corhexa/`).
3. Envie os 4 arquivos desta pasta (`index.html`, `favicon.svg`, `.htaccess`, `robots.txt`) — arraste ou use **Carregar**.
4. Confirme que `.htaccess` foi enviado (ele é oculto; ative "mostrar arquivos ocultos" se não aparecer).

**Opção B — FTP**
1. hPanel → **Arquivos → Contas FTP** para pegar host, usuário e senha.
2. Conecte com um cliente FTP (FileZilla, por exemplo) e envie os arquivos para a pasta do subdomínio.

## 3. Ativar HTTPS

1. hPanel → **Segurança → SSL**.
2. Emita/ative o certificado gratuito para `corhexa.washington.pro.br` (a Hostinger costuma emitir automaticamente em poucos minutos após o subdomínio ser criado).
3. Com o certificado ativo, o `.htaccess` já força o redirecionamento para `https://`.

## 4. Verificar

Acesse `https://corhexa.washington.pro.br/` e confira:
- a página carrega com o cadeado (HTTPS);
- trocar as cores de texto/fundo atualiza a razão de contraste;
- a seção "Botões e links" calcula corretamente.

Se a página aparecer sem estilo, é sinal de que a hospedagem bloqueou o carregamento externo das fontes do Google — nesse caso, remova as duas linhas `<link rel="preconnect" ...>` e a linha `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` do `<head>` do `index.html`; a página cai para as fontes do sistema e continua funcional.
