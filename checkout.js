import { lerLocalStorage, desenharProdutosCarrinhoSimples, catalogo, apagarDoLocalStorage, salvarLocalStorage, } from "./src/utilidades";

function desenharProdutosCheckout() {
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutosCarrinhoSimples(idProduto, "container-produtos-checkout",
         idsProdutoCarrinhoComQuantidade[idProduto])
    }
}


function precoTotal() {
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {
  
    }
    const precoCarrinho = document.getElementById("preco-total-chekout")
    let precoTotalCarrinho = 0
    for (const idProdutoCarrinho in idsProdutoCarrinhoComQuantidade) {
      precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoCarrinho];
  
    }
    precoCarrinho.innerText = `Preço Total: R$ ${precoTotalCarrinho}`;
  }

function finalizarCompra (evento) {
    evento.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
        return;
    }

    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual, pedido: idsProdutoCarrinhoComQuantidade
    } 
    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos] 
    salvarLocalStorage('historico', historicoDePedidosAtualizado);

    apagarDoLocalStorage('carrinho')
    window.location.href =  "./pedidos.html"
}

desenharProdutosCheckout();
precoTotal();
document.addEventListener("submit", (evt) => finalizarCompra(evt))

