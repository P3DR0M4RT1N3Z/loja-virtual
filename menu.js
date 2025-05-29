document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".menu-toggle");
    const closeButton = document.querySelector(".menu-close");
    const menu = document.querySelector(".menu");

    // Abrir ou fechar o menu ao clicar no botão de menu
    toggleButton.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
    

    // Fechar o menu ao clicar no botão de fechar
    closeButton.addEventListener("click", () => {
        menu.classList.remove("active");
    });

    const carrinhoToggle = document.querySelector(".carrinho-toggle");
    const carrinhoMenu = document.querySelector(".carrinho-menu");
    const carrinhoClose = document.querySelector(".carrinho-close");
    const adicionarCarrinhoBotoes = document.querySelectorAll(".adicionar-carrinho");
    const carrinhoItens = document.querySelector(".carrinho-itens");
    const carrinhoTotal = document.querySelector(".carrinho-total");
    const carrinhoNotificacao = document.getElementById("carrinhoNotificacao");

    let total = 0;

    // Alternar o carrinho ao clicar no botão
    carrinhoToggle.addEventListener("click", () => {
        carrinhoMenu.classList.toggle("active");
    });

    // Fechar o carrinho
    carrinhoClose.addEventListener("click", () => {
        carrinhoMenu.classList.remove("active");
    });

    // Função para mostrar a notificação
    function mostrarNotificacao() {
        carrinhoNotificacao.textContent = "Produto adicionado ao carrinho ✅";
        carrinhoNotificacao.classList.add("mostrar");

        // Esconde a notificação após 2 segundos
        setTimeout(() => {
            carrinhoNotificacao.classList.remove("mostrar");
        }, 2000);
    }

    // Adicionar itens ao carrinho
    adicionarCarrinhoBotoes.forEach((botao) => {
        botao.addEventListener("click", () => {
            const nome = botao.getAttribute("data-nome");
            const preco = parseFloat(botao.getAttribute("data-preco"));

            // Criar elemento de item do carrinho
            const item = document.createElement("li");
            item.innerHTML = `
                <span>${nome}</span>
                <span>R$ ${preco.toFixed(2)}</span>
                <button class="remover-item">Remover</button>
            `;
            carrinhoItens.appendChild(item);

            // Atualizar total
            total += preco;
            carrinhoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

            // Adicionar funcionalidade ao botão de remover
            const removerBotao = item.querySelector(".remover-item");
            removerBotao.addEventListener("click", () => {
                carrinhoItens.removeChild(item);
                total -= preco;
                carrinhoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
            });

            // Exibir a notificação
            mostrarNotificacao();
        });
    });

    const imagens = document.querySelectorAll(".carrossel-item");
    const prevButton = document.querySelector(".carrossel-prev");
    const nextButton = document.querySelector(".carrossel-next");
    let indexAtual = 0;

    // Função para mostrar a imagem atual
    function mostrarImagem(index) {
        imagens.forEach((img, i) => {
            img.classList.remove("ativo");
            if (i === index) {
                img.classList.add("ativo");
            }
        });
    }

    // Evento para o botão "Anterior"
    prevButton.addEventListener("click", () => {
        indexAtual = (indexAtual - 1 + imagens.length) % imagens.length; // Volta ao último se estiver no primeiro
        mostrarImagem(indexAtual);
    });

    // Evento para o botão "Próximo"
    nextButton.addEventListener("click", () => {
        indexAtual = (indexAtual + 1) % imagens.length; // Vai para o primeiro se estiver no último
        mostrarImagem(indexAtual);
    });

    // Exibir a primeira imagem ao carregar
    mostrarImagem(indexAtual);

    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
    const timerElement = document.getElementById("timer");

    // Mostrar o pop-up após 2 segundos
    setTimeout(() => {
        popup.classList.add("show");
    }, 2000);

    // Fechar o pop-up ao clicar no botão "Fechar"
    closePopup.addEventListener("click", () => {
        popup.classList.remove("show");
    });

    // Temporizador de 20 minutos
    let tempoRestante = 20 * 60; // 20 minutos em segundos

    function atualizarTimer() {
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;
        timerElement.textContent = `Tempo restante: ${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
        tempoRestante--;

        if (tempoRestante < 0) {
            clearInterval(intervalo);
            popup.classList.remove("show");
        }
    }

    const intervalo = setInterval(atualizarTimer, 1000);
});