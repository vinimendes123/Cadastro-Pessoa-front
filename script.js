document.getElementById('formCadastro').addEventListener('submit', async (event) => {
    event.preventDefault();

    document.getElementById('message').innerText = '';

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;

    const pessoaData = {
        Nome: nome,
        CPF: cpf,
        Telefone: telefone
    };

    try {
        const response = await fetch('http://localhost:3000/api/pessoa', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pessoaData)
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('message').innerText = 'Cadastro Realizado!';
            document.getElementById('formCadastro').reset();
        } else {
           
            let errorMessage = '';

            if (result.error.includes('CPF')) {
                errorMessage += 'Erro: ' + result.error + '\n';
            }

            if (result.error.includes('Telefone')) {
                errorMessage += 'Erro: ' + result.error + '\n';
            }

            if (!errorMessage) {
                errorMessage = `Erro: ${result.error}`;
            }

            document.getElementById('message').innerText = errorMessage;
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Erro de comunicação ao servidor.';
    }
});
