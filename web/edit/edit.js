document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert('ID do produto não fornecido.');
        window.location.href = '../products/products.html';
        return;
    }

    const form = document.getElementById('edit-form');
    const nameInput = document.getElementById('name');
    const categoryInput = document.getElementById('category');
    const priceInput = document.getElementById('price');
    const descriptionInput = document.getElementById('description');

    // Fetch existing product data
    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        if (!response.ok) {
            throw new Error('Produto não encontrado');
        }
        const product = await response.json();

        // Fill form
        nameInput.value = product.name;
        categoryInput.value = product.category;
        priceInput.value = product.price;
        descriptionInput.value = product.description;

    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        alert('Erro ao carregar dados do produto.');
        window.location.href = '../products/products.html';
    }

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedData = {
            name: nameInput.value,
            category: categoryInput.value,
            price: parseFloat(priceInput.value),
            description: descriptionInput.value
        };

        try {
            const response = await fetch(`http://localhost:3000/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                alert('Produto atualizado com sucesso!');
                window.location.href = '../products/products.html';
            } else {
                const result = await response.json();
                alert('Erro ao atualizar produto: ' + (result.message || 'Erro desconhecido'));
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            alert('Erro de conexão com o servidor.');
        }
    });
});
