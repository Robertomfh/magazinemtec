import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades"

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {
  
}

function abrirCarrinho () {
    document.getElementById("carrinho").classList.remove("right-[-360px]")
    document.getElementById("carrinho").classList.add("right-[0px]")
    precoTotal();
    
}

function fecharCarrinho () {
    document.getElementById("carrinho").classList.remove("right-[0px]")
    document.getElementById("carrinho").classList.add("right-[-360px]")
    precoTotal()
}



function irParaCheckout() {
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }
  window.location.href = "./checkout.html";
}

export function inicializarCarrinho () {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho")
    const botaoAbrirCarrinho  = document.getElementById("abrir-carrinho")
    const botaoIrParaCheckout = document.getElementById("finalizar-compra")

    botaoFecharCarrinho.addEventListener('click', fecharCarrinho)
    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho)
    botaoIrParaCheckout.addEventListener('click', irParaCheckout)
}


function removerDoCarrinho(idProduto) {
  delete idsProdutoCarrinhoComQuantidade[idProduto]
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade)
  precoTotal()
  rendenizarProdutosCarrinho();

}

export function precoTotal() {
  const precoCarrinho = document.getElementById("preco-total")
  let precoTotalCarrinho = 0
  for (const idProdutoCarrinho in idsProdutoCarrinhoComQuantidade) {
    precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoCarrinho];

  }
  precoCarrinho.innerText = `Preço Total: R$ ${precoTotalCarrinho}`;
}

function atualizarPreco(idProduto) {
  const preco = catalogo[idProduto-1].preco
  const qtd   = idsProdutoCarrinhoComQuantidade[idProduto]
  const precoFinal = preco * qtd
  document.getElementById(`preco-cartao-produto-${idProduto}`).innerText=
  preco * qtd;
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutoCarrinhoComQuantidade[idProduto]++
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade)
  precoTotal()
  atualizarQuantidade(idProduto)
  atualizarPreco(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
  if(idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
    precoTotal()
    removerDoCarrinho(idProduto);
    
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto]--
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade)
  precoTotal()
  atualizarQuantidade(idProduto)
  atualizarPreco(idProduto);
}

function atualizarQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText=
  idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutosCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto);

    const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

    const elementoArticle = document.createElement("article");
    const articleClasses = ["flex", "rounded-lg", "bg-slate-200", "relative"];
    for (const articleClasse of articleClasses) {
      elementoArticle.classList.add(articleClasse);
    }

    
    const cataoProdutoCarrinho = `<button id="remover-item-${produto.id}"><i class="fa-solid fa-circle-xmark bg-slate-500 hover:bg-slate-900 absolute top-2 right-2"></i></button>
    <img class= "h-24 rounded-lg" src="./assets/img/${produto.nomeArquivoImagem}" alt="Carrinho:${produto.nome}"/>

    <div  class="text-green-700 flex flex-col justify-justify-between p-3">
      <p class="text-slate-900 text-xs">${produto.nome}</p>
      <p class="text-slate-900 text-xs">Tamanho: M</p>
      <p id="preco-cartao-produto-${produto.id}" class="text-green-700 text-lg">R$ ${produto.preco}</p>
    </div>

    <div  class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
      <button id="decrementar-produto-${produto.id}">-</button>
      <p id="quantidade-${produto.id}" class="ml-2">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
      <button id="incrementar-produto-${produto.id}" class="ml-2">+</button>
    </div>`;

  elementoArticle.innerHTML = cataoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document
  .getElementById(`decrementar-produto-${produto.id}`)
  .addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

  document
  .getElementById(`incrementar-produto-${produto.id}`)
  .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

  document
  .getElementById(`remover-item-${produto.id}`)
  .addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function  rendenizarProdutosCarrinho () {
  const containerProdutosCarrinho =
  document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML= "";

  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutosCarrinho(idProduto);
  }

}

export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoComQuantidade) {
    abrirCarrinho()
    incrementarQuantidadeProduto(idProduto)
    precoTotal
    return;
  }

    idsProdutoCarrinhoComQuantidade[idProduto]=1
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade)
    desenharProdutosCarrinho(idProduto)
    abrirCarrinho()
    precoTotal;
    
}