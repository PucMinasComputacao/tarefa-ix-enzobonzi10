
const data = {
    produtos: [
        { id: 1, nome: "iPhone 14", preco: 5000, categoria: "Celulares", descricao: "Apple iPhone", emEstoque: true },
        { id: 2, nome: "Galaxy S22", preco: 4000, categoria: "Celulares", descricao: "Samsung Galaxy", emEstoque: true },
        { id: 3, nome: "Notebook Dell", preco: 3500, categoria: "Notebooks", descricao: "Dell Inspiron", emEstoque: false },
        { id: 4, nome: "Notebook Lenovo", preco: 3000, categoria: "Notebooks", descricao: "Lenovo IdeaPad", emEstoque: true },
        { id: 5, nome: "Mouse Gamer", preco: 150, categoria: "Acessórios", descricao: "Mouse RGB", emEstoque: true },
        { id: 6, nome: "Teclado Mecânico", preco: 250, categoria: "Acessórios", descricao: "Teclado RGB", emEstoque: false },
        { id: 7, nome: "PlayStation 5", preco: 4500, categoria: "Games", descricao: "Console Sony", emEstoque: true },
        { id: 8, nome: "Xbox Series X", preco: 4200, categoria: "Games", descricao: "Console Microsoft", emEstoque: true }
    ]
};


const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");


function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
    const card = document.createElement("div");

    card.setAttribute("data-id", produto.id);
    card.classList.add("card");


    card.style.border = "1px solid #ccc";
    card.style.padding = "10px";
    card.style.margin = "10px";
    card.style.display = "inline-block";

    card.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>${formatPrice(produto.preco)}</p>
        <p>${produto.categoria}</p>
        <button class="btn-details">Ver detalhes</button>
        <button class="btn-highlight">Destacar</button>
    `;

    const btnDetails = card.querySelector(".btn-details");
    const btnHighlight = card.querySelector(".btn-highlight");

    btnDetails.addEventListener("click", () => {
        showProductDetails(produto);
    });

    btnHighlight.addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";

    produtos.forEach(prod => {
        const card = createProductCard(prod);
        productList.appendChild(card);
    });

    // uso obrigatório
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        console.log("Card ID:", card.getAttribute("data-id"));
    });
}

function renderCategories() {
    const categorias = new Set();

    data.produtos.forEach(p => categorias.add(p.categoria));

    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>
        <p>Preço: ${formatPrice(produto.preco)}</p>
        <p>Categoria: ${produto.categoria}</p>
        <p>Estoque: ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
        <p>${produto.descricao}</p>
    `;
}

function filterProducts() {
    const texto = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    return data.produtos.filter(prod => {
        const matchNome = prod.nome.toLowerCase().includes(texto);
        const matchCategoria = categoria === "Todas" || prod.categoria === categoria;

        return matchNome && matchCategoria;
    });
}

// Eventos
searchInput.addEventListener("input", () => {
    renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
    renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
    renderProducts(filterProducts());
});


renderCategories();
renderProducts(data.produtos);