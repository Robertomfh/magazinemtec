import { desenharProdutosCarrinhoSimples,lerLocalStorage } from "./src/utilidades";

function criarPedidosHistorico(pedidoComData) {
  const elementoPedido = `<p class="text-xl text-bold my-4">${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-br',{hour:"2-digit",minute:"2-digit"})}<p>
  <section class="bg-slate-300 p-3" id=container-pedidos-${pedidoComData.dataPedido}></section>`;
  const main = document.getElementsByTagName('main')[0];
  main.innerHTML += elementoPedido

  for (const idProduto in pedidoComData.pedido) {
    desenharProdutosCarrinhoSimples(idProduto,`container-pedidos-${pedidoComData.dataPedido}`,
    pedidoComData.pedido[idProduto])
  }
}

function rendenizarHistoricoPedidos () {
  const historico = lerLocalStorage('historico');
  for (const pedidoComData of historico) {
    criarPedidosHistorico(pedidoComData)
  }
}

rendenizarHistoricoPedidos();