export const catalogo = [{id:"1",
    nome: "Casaco Branco" ,
    marca: "Zara",
    preco:70,
    nomeArquivoImagem : "product-1.jpg",
    },
{id:"2",
    nome: "Casaco Branco 2" ,
    marca: "Zara",
    preco:80,
    nomeArquivoImagem : "product-2.jpg",
    },
    {id:"3",
    nome: "Casaco Branco 3" ,
    marca: "Zara",
    preco:90,
    nomeArquivoImagem : "product-3.jpg",
    },
    {id:"4",
    nome: "Casaco Branco 4" ,
    marca: "Zara",
    preco:100,
    nomeArquivoImagem : "product-4.jpg",
    },
{id:"5",
    nome: "Casaco Branco 5" ,
    marca: "Zara",
    preco:120,
    nomeArquivoImagem : "product-5.jpg",
    }
];

export function salvarLocalStorage(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao))
}

export function lerLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
    localStorage.removeItem(chave);
}

export function desenharProdutosCarrinhoSimples(idProduto,idContainerHtml, quantidadeProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
  
      const containerProdutosCarrinho =
      document.getElementById(idContainerHtml);
  
      const elementoArticle = document.createElement("article");
      const articleClasses = ["flex", "rounded-lg", "bg-slate-200", "relative","mb-2", "w-96" ];
      for (const articleClasse of articleClasses) {
        elementoArticle.classList.add(articleClasse);
      }
  
      
      const cataoProdutoCarrinho = `<img class= "h-24 rounded-lg" src="./assets/img/${produto.nomeArquivoImagem}" alt="Carrinho:${produto.nome}"/>
  
      <div  class="text-green-700 flex flex-col justify-justify-between p-3">
        <p class="text-slate-900 text-xs">${produto.nome}</p>
        <p class="text-slate-900 text-xs">Tamanho: M</p>
        <p id="preco-cartao-produto-${produto.id}" class="text-green-700 text-lg">R$ ${produto.preco * quantidadeProduto}</p>
      </div>
  
      <div  class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
        <p id="quantidade-${produto.id}" class="ml-2">${quantidadeProduto} Unidades</p>
      </div>`;
  
    elementoArticle.innerHTML = cataoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle);
  }
  