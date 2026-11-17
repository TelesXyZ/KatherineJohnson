const API_URL = "http://localhost:8080/usuarios";

function mostrarAba(aba) {
    const formLogin = document.getElementById("formLogin");
    const formCadastro = document.getElementById("formCadastro");
    const btnLogin = document.getElementById("btnTabLogin");
    const btnCadastro = document.getElementById("btnTabCadastro");
    const msg = document.getElementById("mensagem");

    msg.textContent = "";

    if (aba === "login") {
        formLogin.classList.remove("oculto");
        formCadastro.classList.add("oculto");
        btnLogin.classList.add("ativo");
        btnCadastro.classList.remove("ativo");
    } else {
        formLogin.classList.add("oculto");
        formCadastro.classList.remove("oculto");
        btnLogin.classList.remove("ativo");
        btnCadastro.classList.add("ativo");
    }
}

document.getElementById("formCadastro").addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("mensagem");

    const dados = {
        nome: document.getElementById("cadNome").value,
        email: document.getElementById("cadEmail").value,
        senha: document.getElementById("cadSenha").value
    };

    try {
        const resposta = await fetch(`${API_URL}/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            msg.style.color = "green";
            msg.textContent = "Conta criada com sucesso! Já pode fazer login.";
            document.getElementById("formCadastro").reset();
            setTimeout(() => mostrarAba("login"), 1500);
        } else {
            msg.style.color = "red";
            msg.textContent = "Erro ao cadastrar. Verifique se o e-mail já existe.";
        }
    } catch (erro) {
        msg.style.color = "red";
        msg.textContent = "Erro de conexão com o servidor Java.";
    }
});

document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("mensagem");

    const dados = {
        email: document.getElementById("loginEmail").value,
        senha: document.getElementById("loginSenha").value
    };

    try {
        const resposta = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            const usuario = await resposta.json();
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            msg.style.color = "green";
            msg.textContent = `Bem-vindo(a), ${usuario.nome}! Redirecionando...`;
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1200);
        } else {
            msg.style.color = "red";
            msg.textContent = "E-mail ou senha inválidos.";
        }
    } catch (erro) {
        msg.style.color = "red";
        msg.textContent = "Erro de conexão com o servidor Java.";
    }
});