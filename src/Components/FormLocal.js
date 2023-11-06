import React, { useState } from "react";
import { Form } from "./style";

export default function FormLocal() {
  const [nome, setNome] = useState("");
  const [tarefa, setTarefa] = useState("");
  const [listaTarefa, setListaTarefa] = useState([]);

  //localStorage (navegador) = Setamos e pegamos  itens. Só aceita strings, por isso precisamos converter o array para string. Sempre que for enviar para localStorage precisamos converter para string usando JSON.stringify, e sempre que precisarmos receber, dependendo do código, precisaremos de um array, e convertemos para array através do JSON.parse

  //setItem -> armazena item no localStorage (converter para string antes de armazenar)
  //getItem -> pega item que está armazenado no localStorage

  //Transformar item em string
  //JSON.stringify(ItemASerAlterado)
  //JSON.parse(TransformarItemNoValorInicial)

  //Função que torna o input apto e funcional para uso
  const onChangeNome = (event) => {
    setNome(event.target.value);
  };

  //Função para onClick, para armazenar os itens digitados no input no local storage ao clicar no botão Guardar Dados
  const guardarNome = () => {
    localStorage.setItem("nome", nome);
  }; //Eu seto com dois valores, a chave e o valor armazenado. Posso armazenar até 5mb no local storage, e somente string.

  // Função para onClick, para pegar os itens armazenados na local storage ao clicar no botão Acessar Dados
  const pegarNome = () => {
    alert(localStorage.getItem("nome"));
  }; //Só preciso chamar a chave para pegar o item

  // Outra forma de fazer o getItem acima, com uma variável dentro da função:
  /* const pegarNome = () => {
    const nome = localStorage.getItem("nome");
    alert(nome);
  }; */

  //Função que torna o input apto e funcional para uso
  const onChangeTarefa = (event) => {
    setTarefa(event.target.value);
  };

  //Função para onClick que faz uma cópia usando spread do useState listaTarefa, que é um array vazio, e adiciona nesse array o que o usuário está digitando. É a cópia do original mais o novo item que o usuário está digitando.
  const adicionarTarefa = () => {
    setListaTarefa([...listaTarefa, tarefa]);
  };
  // O push também adiciona itens digitados no array, mas não quando trabalhamos com estados porque estamos usando o setAlgumaCoisa.

  // Convertendo o Array em String. Função para onClick que transforma o array listaTarefa em string e o armazena no localStorage.
  const guardarTarefa = () => {
    const tarefaEmString = JSON.stringify(listaTarefa);
    localStorage.setItem("tarefaChave", tarefaEmString); //Toda setagem de item recebe 2 parâmetros. A chave ("tarefa") que pode ser qualquer nome escolhido por mim, e após a vírgula (tarefaEmString) é a informação que estou armazenando nessa chave. Aqui eu armazenei o array transformado em string
    console.log(typeof tarefaEmString);
  }; // Usei o typeof no console.log pra confirmar se o array de listaTarefa realmente foi transformado em string

  // Converter o Array transformado em string em array novamente
  const pegarTarefa = () => {
    const tarefaLocalStorage = localStorage.getItem("tarefaChave");
    const tarefaConvertida = JSON.parse(tarefaLocalStorage);
    setListaTarefa(tarefaConvertida); //Aqui atualizei o setListaTarefa. Em vez de receber novos itens para o array no input ele vai renderizar a variável tarefaConvertida, que já foi reconvertida para array, ao atualizar a página e clicar no botão Acessar tarefa

    console.log(typeof tarefaLocalStorage);
    console.log(typeof tarefaConvertida);
  };

  return (
    <Form>
      <h3>Prática 1</h3>
      <label htmlFor="nome">
        nome:
        <input name="nome" id="nome" onChange={onChangeNome} />
      </label>
      <div>
        <button onClick={guardarNome}>Guardar Dados</button>
        <button onClick={pegarNome}>Acessar Dados</button>
      </div>
      <br />
      <h3>Prática 2</h3>
      <label htmlFor="tarefa">
        tarefa:
        <input name="tarefa" id="tarefa" onChange={onChangeTarefa} />
      </label>
      <button type="button" onClick={adicionarTarefa}>
        adicionar Tarefa
      </button>
      <ul>
        {listaTarefa.map((task) => {
          return <li key={task}>{task}</li>;
        })}
      </ul>
      <div>
        <button onClick={guardarTarefa}>Guardar tarefa</button>
        <button onClick={pegarTarefa}>Acessar tarefa</button>
      </div>
    </Form>
  );
}

// Sempre que o usuário precisar digitar algo, nunca use essas coisas digitadas como chave, senão pode dar erro de repetição

//Map não funciona na string, eu preciso transformar essa string em um array

//Sempre que tiver um map ou filter será um array

// O map acima tem um erro. A pessoa que criou o map acima disse que a chave, o item único, é a mesma coisa que estou digitando no input, e pode dar erro caso 2 nomes repetidos sejam digitados no input. Ele entende que o que eu estou adicionando já existe e não é um valor único, pode quebrar a qualquer momento. Geralmente nesse caso são utilizados números aleatórios

// Map só consegue renderizar listas. Se não tivéssemos feito um estado como array ia quebrar nossa aplicação.

// onClick = para botões que disparam uma função quando clicados
// onChange = Geralmente inputs
// Posso colocar onClick numa div também.

// Todo retorno de map eu preciso de um id único. Sempre que criarmos um map onde o usuário precisa digitar algo, nunca criar como key (chave), mas sim com id único porque se o usuário digitar coisas repetidas e o map estiver como key pode dar problema. Ids geralmente são numeros, e duas das formas mais utilizadas para criar números são date.now() ou math.

//Diferença entre funções puras e impuras

//Função pura recebe um nome como parâmetro e retorna esse nome. Tudo que estou fazendo está dentro do escopo dela
const nomeUsuario = (nome) => {
  return `Ola ${nome}`;
};

//Função impura trabalha com váriaveis de fora do escopo da função. Ex. a variável let nomeUsuario2 está fora do escopo da função nomeUsuario3, e mesmo assim eu a estou utilizando dentro dessa função
let nomeUsuario2 = "";

const nomeUsuario3 = (nome) => {
  nomeUsuario2 = nome;
  return `Ola ${nomeUsuario2}`;
};

//Efeitos colaterais em programação tem a ver com isso, às vezes pegamos uma informação de fora que pode mudar o nosso código, e para isso utilizaremos o useEffect. Na maioria das vezes quando chamamos API precisamos usar UseEffect para evitar loop infinito. O useEffect é uma forma de controle do ciclo de vida do React. O useEffect mostra a primeira coisa que eu quero que renderize na tela quando o usuário acessar o site. Posso usar mais de um useEffect na minha aplicação.

//Padrão da Estrutura do useEffect. Passamos como primeiro parâmetro uma função, e após a vírgula passamos um segundo parâmetro de array de dependências. Sempre que quisermos atualizá-lo inserimos a nova informação no array de dependências.

// useEffect(() => {}, [])

//Arrow functions com useEffect. Sempre que eu utilizar uma função de seta (arrow function) dentro do useEffect eu preciso posicionar a função que eu quero inserir no useEffect logo acima da função do useEffect.

/* # Introdução ao Local Storage: gerenciando dados no navegador

Ao desenvolver aplicativos React, muitas vezes você precisa armazenar e gerenciar dados localmente, como preferências do usuário, configurações, carrinho de compras ou até mesmo informações temporárias.

Uma maneira comum de armazenar dados localmente em um aplicativo React é usando o recurso de armazenamento local do navegador, conhecido como Local Storage. O Local Storage permite que você armazene pares chave-valor de forma persistente no navegador do usuário, mesmo quando o aplicativo é fechado ou a página é atualizada. 

Armazenando dados no Local Storage

Você pode facilmente armazenar dados usando o método setItem(). O método setItem() requer dois argumentos: 
uma chave 
um valor
A chave é uma string que você usa para identificar os dados armazenados, e o valor deve ser um dado do tipo string.
Aqui está um exemplo de como armazenar um valor no Local Storage:

window.localStorage.setItem('chave', 'valor');

Recuperando dados do Local Storage

Depois de armazenar dados no Local Storage, você pode recuperá-los usando o método getItem(). O método getItem() recebe a chave como argumento e retorna o valor correspondente armazenado no Local Storage.
Aqui está um exemplo de como recuperar um valor do Local Storage:
const valor = localStorage.getItem('chave');
console.log(valor);

Removendo dados do Local Storage

Se você precisar remover um item específico do Local Storage, pode usar o método removeItem(). Esse método recebe a chave como argumento e remove o item correspondente do Local Storage.
Aqui está um exemplo de como remover um item do Local Storage:
localStorage.removeItem('chave');


Guardar/Alterar dados
setItem('chave', dados)
- Chave: identificador dos dados a serem armazenados no local storage;
- Dados: dados a guardar. Devem ser uma string.

Pegar dados
getItem('chave')
- Chave: identificador do que estamos buscando. Deve ser a mesma usada para guardar o dado.

Remover dados
removeItem('chave')
- Chave: identificador do que estamos buscando. Deve ser a mesma usada para apagar o dado.

## Acessando o Local Storage a partir da Dev Tools

Use as Dev Tools para uma melhor visualização de os dados estão sendo guardados no local storage. Para acessar o Local Storage usando as Dev Tools do navegador, siga estas etapas:

1. Abra o seu aplicativo ou página web no navegador.
2. Clique com o botão direito do mouse em qualquer lugar na página e selecione "Inspecionar" ou pressione a tecla F12 para abrir as Dev Tools.
3. Na janela das Dev Tools, você verá várias guias, como "Elements", "Console", "Sources", entre outras. Selecione a guia "Application" ou “Aplicativo”( "Armazenamento" em alguns navegadores).
4. No painel lateral esquerdo da guia "Application" ou “Aplicativo”, você encontrará várias seções, incluindo "Local Storage" ou “Armazenamento Local”. Clique nessa seção para expandi-la.
5. Agora você poderá visualizar as chaves e valores armazenados no Local Storage. Clique em uma chave para ver o valor correspondente.


## Adicionando um array ou objeto no local storage

Para armazenar um array ou objeto no Local Storage, você precisa convertê-lo para uma string antes de armazená-lo. O Local Storage só permite armazenar valores em formato de string. 

1. Você pode usar a função JSON.stringify() para converter seu array ou objeto em uma string JSON antes de armazená-lo. 
2. Em seguida, use o método setItem() para armazenar a string no Local Storage.

Aqui está um exemplo de como armazenar um array no Local Storage:

const meuArray = [1, 2, 3, 4, 5];
const arrayString = JSON.stringify(meuArray);
localStorage.setItem('chaveDoArray', arrayString);

E um exemplo de como armazenar um objeto no Local Storage:

const meuObjeto = { nome: 'João', idade: 25, cidade: 'São Paulo' };
const objetoString = JSON.stringify(meuObjeto);
localStorage.setItem('chaveDoObjeto', objetoString);

## Recuperando um array ou objeto do local storage

Agora, seu array ou objeto está armazenado no Local Storage como uma string JSON. Para recuperar esses dados posteriormente, você precisa converter a string JSON de volta para um array ou objeto usando a função JSON.parse().

Aqui está um exemplo de como recuperar um array do Local Storage:

const arrayString = localStorage.getItem('arrayKey');
const meuArray = JSON.parse(arrayString);
console.log(meuArray);

E um exemplo de como recuperar um objeto do Local Storage:

const objetoString = localStorage.getItem('objetoKey');
const meuObjeto = JSON.parse(objetoString);
console.log(meuObjeto);

Lembre-se de que, ao recuperar dados do Local Storage, você precisa verificar se a chave existe e se os dados são válidos antes de usar os valores armazenados.

Removendo array ou objetos do Local Storage

Se você precisar remover um item específico do Local Storage, pode usar o método removeItem(). Esse método recebe a chave como argumento e remove o item correspondente do Local Storage.
Aqui está um exemplo de como remover um array ou objeto no Local Storage:

localStorage.removeItem('chave');

## Limitações do Local Storage

Embora o Local Storage seja uma ótima opção para armazenar pequenas quantidades de dados localmente no navegador, é importante estar ciente de suas limitações. O Local Storage tem um limite de armazenamento que varia entre os navegadores e pode ser tão baixo quanto 5MB. Além disso, os dados armazenados no Local Storage são compartilhados entre todas as abas e janelas abertas do mesmo domínio, o que pode levar a conflitos ou acesso não intencional aos dados.

# Resumo

1. Armazene dados localmente usando o método setItem().
2. Recupere dados do Local Storage usando o método getItem().
3. Remova dados específicos do Local Storage com o método removeItem().
4. Utilize as Dev Tools para visualizar os dados armazenados no Local Storage.
5. Converta um array ou objeto em uma string JSON antes de armazená-lo.
6. Utilize a função JSON.stringify() para converter um array ou objeto em uma string JSON.
7. Recupere um array ou objeto do Local Storage usando a função JSON.parse() após pegar os dados.

https://labenu.notion.site/Introdu-o-ao-Local-Storage-gerenciando-dados-no-navegador-273977d9f05d45b0a844d16abe1c9664


# Introdução ao Ciclo de vida de componentes React e useEffect

Vamos analisar as etapas do ciclo de vida de um compoenente React e como elas se relacionam com o corpo humano:

1. Montagem : É como o nascimento de uma pessoa. Nessa fase, o componente funcional é criado e inserido no DOM. Assim como um recém-nascido que começa a sua vida, o componente está pronto para começar a executar suas funções.
2. Atualização: O corpo humano passa por diferentes fases de crescimento e mudanças ao longo da vida, como a infância, adolescência e idade adulta. Da mesma forma, o componente funcional em React pode ser atualizado com novas props ou estado, o que faz com que ele reaja e atualize sua renderização(características).
3. Desmontagem: Assim como o fim da vida de uma pessoa, o componente funcional pode ser removido do DOM. Isso acontece quando o componente não é mais necessário ou quando ocorre uma mudança no fluxo da aplicação. É semelhante com a morte do corpo humano, que deixa de existir.

## Analisando o Ciclo de vida dos componentes React

O ciclo de vida dos componentes funcionais em React é uma parte fundamental da compreensão da dinâmica de um componente durante seu ciclo de renderização e interação com o usuário. 

O ciclo de vida de um componente pode ser dividido em três fases principais:

1. Montagem: Nesta fase, o componente é criado e inserido no DOM. O React chama a função do componente e renderiza o conteúdo retornado por ela. 
2. Atualização: A fase de atualização ocorre quando há uma alteração nos props ou estado do componente. Isso pode ser desencadeado por ações do usuário, atualizações de dados externos ou chamadas com as funções que atualiza o estado setState(). 
3. Desmontagem: Nesta fase, o componente é removido do DOM. Isso geralmente ocorre quando o componente é removido da árvore de componentes ou quando a página é atualizada e algum componente some da tela.

https://file.notion.so/f/s/19c5501e-92ac-4e2c-aff1-1aa7a85d1879/ciclo_de_vida.gif?id=8c9a7346-8241-40f3-8134-f8dbda1d82b0&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&expirationTimestamp=1699315200000&signature=Q-rK0hycgq6vy-owN3qjGEa570lFG7W2sYQw0abFsEY&downloadName=ciclo+de+vida.gif

Essas fases permitem que você controle o comportamento do seu componente em diferentes momentos. Eles são fundamentais para executar tarefas específicas, como buscar dados, atualizar a interface do usuário, gerenciar recursos externos e liberar recursos quando o componente não for mais necessário. Cada uma dessas fases podem ser acessadas por **métodos especiais** dentro de um componente. Veremos um dos métodos, o useEffect.

- Esse método é um pouco diferente dos métodos que trabalhamos até agora.
- Não somos nós que invocamos eles, mas sim os **momentos específicos** do ciclo de vida.
- Usamos esses métodos para fazer ações quando um determinado ciclo de vida do componente acontecer


Com o useEffect iremos trabalhar somente com duas fases, montagem e atualização.

## useEffect

O useEffect é um hook do React que permite executar efeitos colaterais em componentes funcionais. Os efeitos colaterais são ações que podem ser realizadas durante o ciclo de vida de um componente, como buscar dados em servidores externos, manipular o DOM, guardar dados no Local Storage, entre outros.

### Sintaxe para a implementação do useEffect

A sintaxe básica do useEffect é a seguinte:

import { useEffect } from 'react' //Deve ser importado no topo

export default function App(){

	useEffect(() => {
  // Código que será executado como efeito colateral
		}, [Array de dependências]);

	return(<div></div>)
}

​
#Argumentos

O useEffect recebe dois argumentos:
1) Arrow function = o que fazer
2) Array de dependências= quando fazer

useEffect(() => {

  O que fazer 

}, [ Quando fazer ])


### Array de Dependências - Vazio [ ] - FASE DE MONTAGEM

- A função será executada uma única vez, depois da primeira renderização do componente (montagem)
- Chamaremos dentro deste método as ações que quisermos que sejam executadas automaticamente assim que a tela abrir
- Ex: quando você entra em uma rede social, você precisa apertar um botão para pegar os posts?

import { useEffect } from 'react'

export default function App(){

	useEffect(() => {
	//executado somente na fase de montagem:

		}, []);

	return(<div></div>)

}

### Array de Dependências - [ dados ]

- Chamaremos dentro dessa função as ações que quisermos que sejam executadas automaticamente quando os dados contidos no array de dependências forem atualizados.
- Ex: queremos salvar os dados do nosso formulário automaticamente conforme a pessoa for escrevendo
- Ex: quando você começa a digitar na busca e os resultados vão aparecendo ao vivo

import { useEffect, useState } from 'react'

export default function App(){
	const [contador, setContador] = useState(0)

	useEffect(() => {
	//executado sempre na fase de montagem e atualização:
	//sempre que o estado "contador" for atualizado, 
  // useEffect será executado novamente.

		}, [contador]);

	return(<div></div>)

}

## Array de Dependências - sem array ⚠️🚫

- A função será executada sempre depois de uma renderização
- 🚫 Evitamos utilizá-la  para não gerar loops infinitos e outros erros imprevisíveis

import { useEffect, useState } from 'react'

export default function App(){
	const [contador, setContador] = useState(0)
	useEffect(() => {
	//executado em todas as fases do ciclo de vida 
	//executado em qualquer atualização do componente, seja de qualquer props, estado,       mudança de código, todo e qualquer tipo de atualização do componente.

		} );

	return(<div></div>)

}

https://file.notion.so/f/s/2b1ad33d-dc43-4702-bd01-09a6372f6175/Untitled.png?id=30d69559-70a4-42be-88d3-3ac9bd4c8c25&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&expirationTimestamp=1699315200000&signature=hoQv18xbUcvtq8SzCIqzyQcl7msy5v44s58euipgqas&downloadName=Untitled.png

## Erros comuns

1. Esquecer de colocar a dependência no array (funciona corretamente apenas na primeira renderização e é atualizado sempre que props e estados atualizam).

import { useEffect, useState } from 'react'

export default function App(){
	const [contador, setContador] = useState(0)
	useEffect(() => {
	//🚫 não use desse jeito 

		} );

	return(<div></div>)
}

2. Chamar a função de atualização da própria dependência dentro da função de efeito colateral (resulta em um loop infinito, causando um alto consumo de recursos).

import { useEffect, useState } from 'react'

export default function App(){
	const [contador, setContador] = useState(0)

	useEffect(() => {
	//executado sempre na fase de atualização:
	//sempre que o estado "contador" for atualizado, 
  // useEffect será exercutado novamente.

		setContador(contador + 1) //aqui iremos provocar um loop infinito

		}, [contador]);

	return(<div></div>)

}

3. Esquecer que é possível usar mais de um useEffect no mesmo componente para separar diferentes lógicas de efeito.


# Resumo

1. O ciclo de vida dos componentes funcionais em React pode ser comparado aos estágios e eventos que ocorrem ao longo da vida do corpo humano.
2. O ciclo de vida dos componentes em React é dividido em três fases principais: montagem, atualização e desmontagem.
3. Cada fase do ciclo de vida dos componentes em React permite controlar o comportamento do componente em momentos específicos.
4. O método useEffect é um hook do React que permite executar efeitos colaterais em componentes funcionais.
5. Os efeitos colaterais são ações realizadas durante o ciclo de vida de um componente, como buscar dados externos a aplicação(Local Storage).
6. A sintaxe básica do useEffect inclui uma função de callback e um array de dependências.
7. O array de dependências especifica quando o efeito deve ser executado, com base em alterações em estados ou props específicas.
8. Um array de dependências vazio [ ] faz com que o efeito seja executado apenas uma vez, após a primeira renderização do componente.
9. Um array de dependências com valores específicos faz com que o efeito seja executado sempre que esses valores mudarem.
10. É importante evitar erros comuns ao usar o useEffect, como esquecer de incluir uma dependência no array, criar um loop infinito ou não aproveitar a possibilidade de usar vários useEffect no mesmo componente para diferentes lógicas de efeito.

*/
