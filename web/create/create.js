document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        description: document.getElementById('description').value,
        category: document.getElementById('category').value
    };

    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Sucesso! Produto cadastrado com excelência.');
            window.location.href = '../products/products.html';
        } else {
            console.error(result);
            alert('Erro ao cadastrar: ' + (result.message || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Erro de conexão com o servidor.');
    }
});
