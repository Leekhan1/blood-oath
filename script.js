// ==========================================
// BLOOD OATH - SCRIPT PRINCIPAL
// ==========================================

// TESTE

alert("script carregado");

// ==========================================
// LOGIN
// ==========================================

function login() {

    let usuario =
        document.getElementById("login-user").value;

    let senha =
        document.getElementById("login-pass").value;

    // DADOS SALVOS

    let usuarioSalvo =
        localStorage.getItem("usuario");

    let senhaSalva =
        localStorage.getItem("senha");

    // VALIDAR LOGIN

    if (
        usuario === usuarioSalvo &&
        senha === senhaSalva
    ) {

        // SALVAR SESSÃO

        localStorage.setItem("logado", "true");

        localStorage.setItem(
            "usuarioLogado",
            usuario
        );

        // ENTRAR PAINEL

        window.location.href = "panel.html";
    }

    else {

        alert("Usuário ou senha incorretos!");
    }
}

// ==========================================
// REGISTRO
// ==========================================

function irRegistro() {

    window.location.href = "register.html";
}

function voltarLogin() {

    window.location.href = "index.html";
}

function registrar() {

    let usuario =
        document.getElementById("register-user").value;

    let senha =
        document.getElementById("register-pass").value;

    let classe =
        document.getElementById("register-class").value;

    // VALIDAR

    if (
        usuario === "" ||
        senha === "" ||
        classe === ""
    ) {

        alert("Preencha todos os campos!");

        return;
    }

    // SALVAR CONTA

    localStorage.setItem("usuario", usuario);

    localStorage.setItem("senha", senha);

    localStorage.setItem("classe", classe);

    alert("Conta criada com sucesso!");

    // VOLTAR LOGIN

    window.location.href = "index.html";
}

// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem("logado");

    localStorage.removeItem("usuarioLogado");

    window.location.href = "index.html";
}

// ==========================================
// PAINEL USUÁRIO
// ==========================================

window.onload = function () {

    // NOME

    let nome =
        document.getElementById("player-name");

    if (nome) {

        let usuario =
            localStorage.getItem("usuarioLogado");

        nome.innerText = usuario;
    }

    // CLASSE

    let classe =
        localStorage.getItem("classe");

    let classeHTML =
        document.getElementById("player-class");

    if (classeHTML) {

        classeHTML.innerText =
            "Classe Principal: " + classe;
    }

    // ==========================================
    // CARREGAR RAID SALVA
    // ==========================================

    tanks =
        JSON.parse(localStorage.getItem("tanks")) || [];

    healers =
        JSON.parse(localStorage.getItem("healers")) || [];

    dps =
        JSON.parse(localStorage.getItem("dps")) || [];

    jogadoresRegistrados =
        JSON.parse(
            localStorage.getItem(
                "jogadoresRegistrados"
            )
        ) || [];

    vagasICC =
        parseInt(
            localStorage.getItem("vagasICC")
        ) || 10;

    // ATUALIZAR HTML

    atualizarLista("icc-tanks", tanks);

    atualizarLista("icc-healers", healers);

    atualizarLista("icc-dps", dps);

    let vagasHTML =
        document.getElementById("icc-vagas");

    if (vagasHTML) {

        vagasHTML.innerText = vagasICC;
    }
};

// ==========================================
// RAID ICC
// ==========================================

let vagasICC = 10;

// LISTAS

let tanks = [];

let healers = [];

let dps = [];

// NOMES REGISTRADOS

let jogadoresRegistrados = [];

// ==========================================
// INSCREVER ICC
// ==========================================

function inscreverICC() {

    // RAID LOTADA

    if (vagasICC <= 0) {

        alert("Raid lotada!");

        return;
    }

    // NOME

    let nome = prompt("Digite seu nome:");

    if (nome === null || nome === "") {

        return;
    }

    // IMPEDIR REPETIDOS

    if (jogadoresRegistrados.includes(nome)) {

        alert("Esse jogador já está inscrito!");

        return;
    }

    // ESCOLHER ROLE

    let role = prompt(
        "Escolha sua função:\n\nTank\nHealer\nDPS"
    );

    if (role === null || role === "") {

        return;
    }

    role = role.toLowerCase();

    // ==========================================
    // TANK
    // ==========================================

    if (role === "tank") {

        if (tanks.length >= 2) {

            alert("Limite de Tanks atingido!");

            return;
        }

        tanks.push(nome);

        atualizarLista("icc-tanks", tanks);
    }

    // ==========================================
    // HEALER
    // ==========================================

    else if (role === "healer") {

        if (healers.length >= 2) {

            alert("Limite de Healers atingido!");

            return;
        }

        healers.push(nome);

        atualizarLista("icc-healers", healers);
    }

    // ==========================================
    // DPS
    // ==========================================

    else if (role === "dps") {

        if (dps.length >= 6) {

            alert("Limite de DPS atingido!");

            return;
        }

        dps.push(nome);

        atualizarLista("icc-dps", dps);
    }

    else {

        alert("Função inválida!");

        return;
    }

    // REGISTRAR

    jogadoresRegistrados.push(nome);

    // DIMINUIR VAGAS

    vagasICC--;

    document.getElementById(
        "icc-vagas"
    ).innerText = vagasICC;

    // SALVAR

    salvarRaid();
}

// ==========================================
// ATUALIZAR LISTA
// ==========================================

function atualizarLista(id, listaJogadores) {

    let lista =
        document.getElementById(id);

    if (!lista) {

        return;
    }

    lista.innerHTML = "";

    for (let jogador of listaJogadores) {

        let item =
            document.createElement("li");

        item.innerText = jogador;

        lista.appendChild(item);
    }
}

// ==========================================
// REMOVER JOGADOR
// ==========================================

function removerJogador() {

    let nome =
        prompt("Digite o nome do jogador:");

    if (nome === null || nome === "") {

        return;
    }

    // REMOVER ARRAYS

    tanks =
        tanks.filter(j => j !== nome);

    healers =
        healers.filter(j => j !== nome);

    dps =
        dps.filter(j => j !== nome);

    jogadoresRegistrados =
        jogadoresRegistrados.filter(
            j => j !== nome
        );

    // ATUALIZAR HTML

    atualizarLista("icc-tanks", tanks);

    atualizarLista("icc-healers", healers);

    atualizarLista("icc-dps", dps);

    // DEVOLVER VAGA

    vagasICC++;

    document.getElementById(
        "icc-vagas"
    ).innerText = vagasICC;

    // SALVAR

    salvarRaid();

    alert(nome + " removido da raid.");
}

// ==========================================
// SALVAR RAID
// ==========================================

function salvarRaid() {

    localStorage.setItem(
        "tanks",
        JSON.stringify(tanks)
    );

    localStorage.setItem(
        "healers",
        JSON.stringify(healers)
    );

    localStorage.setItem(
        "dps",
        JSON.stringify(dps)
    );

    localStorage.setItem(
        "jogadoresRegistrados",
        JSON.stringify(jogadoresRegistrados)
    );

    localStorage.setItem(
        "vagasICC",
        vagasICC
    );
}