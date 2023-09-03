import { catalogo } from "./utilidades";
import { adicionarAoCarrinho } from "./menuCarrinho";


export function rendenizarCatalogo() {
    for (const produtoCatalogo of catalogo){
        const cartaoProduto =
        `<div class= 'shadow-xl shadow-slate-500 rounded-lg w-48 m-2 flex flex-col p-3 group' id="card-produto-${produtoCatalogo.id}">
            <img  src="./assets/img/${produtoCatalogo.nomeArquivoImagem}" alt="Produto1 do Mtec" class="rounded-lg group-hover:scale-105 duration-500"/>
            <p>${produtoCatalogo.nome}</p>
            <p class='marca'>${produtoCatalogo.marca}</p>
            <p>${produtoCatalogo.preco}</p>
            <button id='adicionar-${produtoCatalogo.id}' class='bg-slate-950 hover:bg-slate-700 text-slate-200'
        ><i class="fa-solid fa-cart-plus"></i></button>
        </div>`;

        document.getElementById("container-produto").innerHTML += cartaoProduto;
    }
    for (const produtoCatalogo of catalogo) {
        const botaoCarrinho = document.getElementById(`adicionar-${produtoCatalogo.id}`);
        botaoCarrinho.addEventListener("click", () => adicionarAoCarrinho(produtoCatalogo.id));
    }

}