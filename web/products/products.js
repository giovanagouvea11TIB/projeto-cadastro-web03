document.addEventListener('DOMContentLoaded', loadProducts);

async function loadProducts() {
    const container = document.getElementById('products-container');

    try {
        const response = await fetch('http://localhost:3000/products');

        if (!response.ok) {
            throw new Error('Falha na resposta da API');
        }

        const products = await response.json();

        container.innerHTML = ''; // Clear loading message

        if (products.length === 0) {
            container.innerHTML = '<p class="loading">Nenhuma peça exclusiva encontrada.</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card';

            const priceFormatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(product.price);

            card.innerHTML = `
                <div class="card-header">
                    <h2 class="product-name">${escapeHtml(product.name)}</h2>
                    <div class="card-actions">
                        <button class="edit-btn" onclick="goToEdit(${product.id})" aria-label="Editar produto">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" onclick="deleteProduct(${product.id})" aria-label="Deletar produto">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="card-price-row">
                    <span class="product-price">${priceFormatted}</span>
                </div>
                <div class="product-category">${escapeHtml(product.category)}</div>
                <p class="product-description">${escapeHtml(product.description)}</p>
                <div class="product-footer"></div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Erro:', error);
        container.innerHTML = '<p class="loading">Erro ao carregar a coleção. Verifique se o servidor está rodando.</p>';
    }
}

async function deleteProduct(id) {
    if (!confirm('Deseja realmente apagar este produto?')) return;

    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Produto apagado com sucesso!');
            loadProducts(); // Refresh the list
        } else {
            const error = await response.json();
            alert('Erro ao apagar produto: ' + error.message);
        }
    } catch (error) {
        console.error('Erro ao deletar:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

function goToEdit(id) {
    window.location.href = `../edit/edit.html?id=${id}`;
}


// Simple XSS protection helper
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
