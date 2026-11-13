# 16 Tipos: teste de personalidade (MBTI)

Site estático, em HTML, CSS e JavaScript puros, que explica o MBTI (Indicador de Tipos Myers-Briggs) e traz um teste de 24 afirmações para descobrir qual dos 16 tipos combina mais com você. Não precisa de servidor, de instalação nem de banco de dados.

> **Aviso:** este é um teste informal inspirado no MBTI. Não é o instrumento oficial e não deve ser usado para decisões sérias, como seleção de pessoal.

## Como funciona

1. Na página inicial (`index.html`) a pessoa lê sobre o MBTI e vê os 16 tipos.
2. O botão **Faça seu teste** leva ao `teste.html`.
3. São 24 afirmações, respondidas numa escala de 5 pontos, de "Discordo totalmente" a "Concordo totalmente". É possível voltar uma pergunta.
4. No fim aparece o tipo (por exemplo, **ENTJ, Comandante**), a descrição, as funções cognitivas e uma barra por dimensão com o percentual.

### Pontuação

- Cada uma das 4 dimensões tem 6 afirmações: 3 favorecem um polo e 3 favorecem o outro.
- A resposta vira um valor de -2 a +2 (resposta menos 3). Concordar com uma afirmação soma pontos ao polo dela, e discordar soma pontos ao polo oposto.
- A soma da dimensão fica entre -12 e +12. Acima de zero vence o primeiro polo (E, S, T, J). Zero ou abaixo vence o segundo (I, N, F, P). Um empate exato, portanto, cai no segundo polo.
- O percentual mostrado é `50 + soma / 12 × 50`.

## Estrutura

```
mbti/
├── index.html        # página inicial: explicação, 4 dimensões, os 16 tipos
├── teste.html        # página do teste e do resultado
├── style.css         # estilos das duas páginas
├── tipos.js          # dados dos 16 tipos (nome, cor, funções, descrição) e ícones SVG
├── teste.js          # perguntas, pontuação e tela de resultado
└── logo/
    ├── quiz.svg / quiz-1024.png       # logo: quadrado roxo com interrogação
    ├── quiz-favicon-*.png / .ico      # ícones da aba do navegador
    ├── logo.svg / logo-1024.png       # logo alternativa: grade de 16 cores
    ├── favicon-*.png / favicon.ico    # ícones da logo alternativa
    └── og-image.png                   # imagem de prévia do link (1200×630)
```

## Como rodar

Baixe a pasta e abra o `index.html` no navegador. Mantenha todos os arquivos juntos. As fontes (Bricolage Grotesque e Figtree) vêm do Google Fonts, então é preciso internet na primeira abertura. Sem internet o site funciona com as fontes padrão do sistema.

## Os 16 tipos

Cada tipo tem uma cor e um símbolo próprios.

| | | | |
|---|---|---|---|
| ISTJ Logístico | ISFJ Defensor | INFJ Advogado | INTJ Arquiteto |
| ISTP Virtuoso | ISFP Aventureiro | INFP Mediador | INTP Lógico |
| ESTP Empreendedor | ESFP Animador | ENFP Ativista | ENTP Inovador |
| ESTJ Executivo | ESFJ Cônsul | ENFJ Protagonista | **ENTJ Comandante** |

As quatro dimensões, em português:

| Dimensão | Polos |
|---|---|
| Energia | **E** Extrovertido, **I** Introvertido |
| Percepção | **S** Sensorial, **N** Intuitivo |
| Decisão | **T** Racional, **F** Sentimental |
| Estilo | **J** Julgador, **P** Perceptivo |

## Como personalizar

- **Cores, nomes, ícones e descrições dos tipos:** edite `tipos.js`. Cada tipo é um objeto com `c` (sigla), `n` (nome), `k` (cor), `f` (funções) e `d` (descrição). Os símbolos ficam no objeto `ICONES`, em SVG de 24×24.
- **Perguntas:** edite `PERGUNTAS` em `teste.js`. Cada item é `[letra, texto]`, em que a letra é o polo favorecido por quem concorda. Mantenha o mesmo número de afirmações para cada polo, para a pontuação não ficar enviesada.
- **Visual:** as cores e medidas principais estão nas variáveis no topo do `style.css`.

## Ícone da aba e prévia do link

No `<head>` das duas páginas:

```html
<link rel="icon" type="image/png" sizes="32x32" href="logo/quiz-favicon-32.png">
<link rel="icon" href="logo/quiz-favicon.ico">
<link rel="apple-touch-icon" href="logo/quiz-favicon-180.png">
```

Para a imagem que aparece quando o link é compartilhado (WhatsApp, Instagram, LinkedIn), coloque no `index.html`, trocando `SEU-SITE.com` pelo endereço real. O endereço da imagem precisa ser completo, e o site precisa estar no ar:

```html
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="Qual dos 16 tipos é o seu?">
<meta property="og:description" content="Teste de personalidade MBTI com 24 perguntas. Descubra seu tipo.">
<meta property="og:image" content="https://SEU-SITE.com/logo/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://SEU-SITE.com/logo/og-image.png">
```

## Publicar

Por ser estático, funciona em qualquer hospedagem de arquivos. No GitHub Pages: crie um repositório, envie os arquivos, abra **Settings → Pages**, escolha a branch `main` e a pasta raiz, e salve. O endereço aparece em alguns minutos.

## Acessibilidade

- Foco visível por teclado em botões e links.
- Animações desativadas para quem usa "reduzir movimento" no sistema.
- Ícones com texto alternativo e layout responsivo para celular.

## Sobre o MBTI

O MBTI foi criado por Katharine Briggs e Isabel Briggs Myers a partir da teoria dos tipos psicológicos de Carl Jung, e o primeiro manual saiu em 1962. Muitos psicólogos preferem o modelo Big Five, porque o MBTI divide em categorias quem está perto do meio-termo, e por isso é comum o resultado mudar ao refazer o teste. Use-o para se conhecer e conversar sobre diferenças, sem tratá-lo como diagnóstico.

Os resumos dos tipos neste projeto são textos próprios, escritos com base nas descrições publicadas pela Myers & Briggs Foundation. *Myers-Briggs* e *MBTI* são marcas registradas dos seus titulares. Este projeto não tem relação com eles.
