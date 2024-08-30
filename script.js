const escolha = 0;
//número que represente o esporte do seu grupo (0,1,2,3)
document.querySelector('body').style.backgroundImage = "url('img/escolha.png')";  // imagem de fundo
document.querySelector('title').textContent = "Sua Área| H.E.B."; //Título da página html
document.querySelector('h1').innerHTML = "A qual Área você está direcionada? <br> Humanas, Exatas ou Biológicas"; // título do texto
//elementos base existentes na tela para serem alterados.

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const imagem = document.querySelector("img");
//captura dos elementos que sofrerão alteração ao tempo todo.

let atual = 0; //item perguntas
let perguntaAtual;  // numero da pergunta
let historiaFinal = "";  // enredo a ser formado
let pontos = 0;  //pontuação para medalhas
//criação e inicialização das variáveis que receberão informações

function mostraPergunta(){  // apresentação das perguntas
    if(atual >= perguntas[escolha].length){ // verificação da qtd de perguntas existentes bate com a escolha e o valor atual
        mostraResultado();  //apresenta a pergunta
        return; // faz retorno a quem chamou
    }
    perguntaAtual = perguntas[escolha][atual]; //verifica a pergunta direcionando conforme o esporte escolhido
    caixaPerguntas.textContent = perguntaAtual.enunciado; //pega o enunciado da pergunta
    caixaAlternativas.textContent = ""; //esvazia o texto da caixa de alternativas
    mostraAlternativas();  //apresenta as novas alternativas
}

function mostraAlternativas(){  // verifica e apresenta as alternativas
    for(const alternativa of perguntaAtual.alternativas){ // repetição
        const botaoAlternativas = document.createElement("button");
        //crie o elemento botão e direciona a variavel
        botaoAlternativas.textContent = alternativa.texto;
        //altera o conteúdo textual do botão
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa)); //função anonima para validar chamar e executando outra função enviando a escolha 
        caixaAlternativas.appendChild(botaoAlternativas)
        //adiciona o botao na tela
    }
}

function respostaSelecionada(opcaoSelecionada){ //executa a alteração 
    const afirmacao = opcaoSelecionada.afirmacao; //redireciona para a variável o contexto
    historiaFinal += afirmacao + " <br>";  //aciona o texto para criar o enredo final, acumulando-o
    atual++; //adiona o valor a variável para passar para próxima
    pontos += opcaoSelecionada.pontos;  //adiciona pontos caso haja
    mostraPergunta();  //cahama a função para mostrar nova pergunta
}

function mostraResultado(){ //função para apresentar os resultados
    textoResultado.innerHTML = historiaFinal;  //adicona o enredo total formado com as escolhas do usuário
    caixaPerguntas.textContent = "Resultado"; //altera o título do contexto para Resultado
    caixaAlternativas.textContent = "";  //limpa o texto do elemento
    resultadoPerguntas(); // chma a função podiumMedalhas
}

function resultadoPerguntas(){  //executa e apresenta o resultado
     // apresenta o total de pontos adquirido
    if (pontos >= 12 && pontos <= 15){
        imagem.src = "img/humanas.png";
        //altera a imagem para bronze
        caixaPerguntas.innerHTML= "Pontuação: "+pontos+"<br> Suas respostas indicam que você tem uma forte afinidade com as Ciências Humanas. "; //altera o texto do elemento
    }
    if (pontos >= 8 && pontos < 12){  //idem a condição anterior
        imagem.src = "img/biologicas.png";;
        caixaPerguntas.innerHTML= "Pontuação: "+pontos+"<br>  Sua pontuação mostra que você tem uma inclinação natural para as Ciências Biológicas."
    }
    if (pontos > 3 && pontos < 8){ //idem a condição anterior
        imagem.src = "img/exatas.png";
        caixaPerguntas.innerHTML= "Pontuação: "+pontos+"<br>  Suas respostas demonstram uma forte aptidão para as Ciências Exatas. Você tem um raciocínio lógico-matemático aguçado e uma habilidade natural para resolver problemas complexos com precisão."
    }
}

mostraPergunta(); 
//chama e inicia a chamada das perguntas.