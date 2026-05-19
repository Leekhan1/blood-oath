// ==========================================
// LOGIN
// ==========================================

function login() {

    let usuario =
        document.getElementById("login-user").value;

    let senha =
        document.getElementById("login-pass").value;

    let usuarioSalvo =
        localStorage.getItem("usuario");

    let senhaSalva =
        localStorage.getItem("senha");

    if (
        usuario === usuarioSalvo &&
        senha === senhaSalva
    ) {

        localStorage.setItem(
            "usuarioLogado",
            usuario
        );

        window.location.href =
            "panel.html";
    }

    else {

        alert("Usuário ou senha incorretos!");
    }
}

// ==========================================
// REGISTRO
// ==========================================

function irRegistro() {

    window.location.href =
        "register.html";
}

function voltarLogin() {

    window.location.href =
        "index.html";
}

function registrar() {

    let usuario =
        document.getElementById("register-user").value;

    let senha =
        document.getElementById("register-pass").value;

    let classe =
        document.getElementById("register-class").value;

    if (
        usuario === "" ||
        senha === "" ||
        classe === ""
    ) {

        alert("Preencha todos os campos!");

        return;
    }

    localStorage.setItem(
        "usuario",
        usuario
    );

    localStorage.setItem(
        "senha",
        senha
    );

    localStorage.setItem(
        "classe",
        classe
    );

    alert("Conta criada com sucesso!");

    window.location.href =
        "index.html";
}

// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem(
        "usuarioLogado"
    );

    window.location.href =
        "index.html";
}

// ==========================================
// DADOS DAS RAIDS
// ==========================================

let raids = {

    naxx: {
        vagas: 0,
        tanks: [],
        healers: [],
        dps: [],
        jogadores: []
    },

    ulduar: {
        vagas: 0,
        tanks: [],
        healers: [],
        dps: [],
        jogadores: []
    },

    toc: {
        vagas: 0,
        tanks: [],
        healers: [],
        dps: [],
        jogadores: []
    },

    icc: {
        vagas: 0,
        tanks: [],
        healers: [],
        dps: [],
        jogadores: []
    },

    ruby: {
        vagas: 0,
        tanks: [],
        healers: [],
        dps: [],
        jogadores: []
    }
};

// ==========================================
// WINDOW LOAD
// ==========================================

window.onload = function () {

    carregarRaid("naxx");
    carregarRaid("ulduar");
    carregarRaid("toc");
    carregarRaid("icc");
    carregarRaid("ruby");

    let nome =
        document.getElementById("player-name");

    if (nome) {

        nome.innerText =
            localStorage.getItem(
                "usuarioLogado"
            );
    }

    let classeHTML =
        document.getElementById(
            "player-class"
        );

    if (classeHTML) {

        classeHTML.innerText =
            "Classe Principal: " +
            localStorage.getItem(
                "classe"
            );
    }
};

// ==========================================
// CARREGAR RAID
// ==========================================

function carregarRaid(raid) {

    let dados =
        localStorage.getItem(raid);

    if (dados) {

        raids[raid] =
            JSON.parse(dados);
    }

    atualizarRaid(raid);
}

// ==========================================
// SALVAR RAID
// ==========================================

function salvarRaid(raid) {

    localStorage.setItem(

        raid,

        JSON.stringify(
            raids[raid]
        )
    );
}

// ==========================================
// ATUALIZAR RAID
// ==========================================

function atualizarRaid(raid) {

    atualizarLista(
        raid + "-tanks",
        raids[raid].tanks
    );

    atualizarLista(
        raid + "-healers",
        raids[raid].healers
    );

    atualizarLista(
        raid + "-dps",
        raids[raid].dps
    );

    let vagas =
        document.getElementById(
            raid + "-vagas"
        );

    if (vagas) {

        vagas.innerText =
            raids[raid].vagas;
    }
}

// ==========================================
// LISTAS
// ==========================================

function atualizarLista(
    id,
    listaJogadores
) {

    let lista =
        document.getElementById(id);

    if (!lista) return;

    lista.innerHTML = "";

    for (
        let jogador of listaJogadores
    ) {

        let item =
            document.createElement("li");

        item.innerText =
            jogador;

        lista.appendChild(item);
    }
}

// ==========================================
// INSCREVER RAID
// ==========================================

function inscreverRaid(raid) {

    if (
        raids[raid].vagas >= 10
    ) {

        alert("Raid lotada!");

        return;
    }

    let nome =
        prompt(
            "Digite seu nome:"
        );

    if (!nome) return;

    if (
        raids[raid]
        .jogadores
        .includes(nome)
    ) {

        alert(
            "Jogador já inscrito!"
        );

        return;
    }

    let role =
        prompt(
            "Escolha sua função:\nTank\nHealer\nDPS"
        );

    if (!role) return;

    role =
        role.toLowerCase();

    if (role === "tank") {

        if (
            raids[raid]
            .tanks.length >= 2
        ) {

            alert(
                "Limite de Tanks!"
            );

            return;
        }

        raids[raid]
            .tanks
            .push(nome);
    }

    else if (
        role === "healer"
    ) {

        if (
            raids[raid]
            .healers.length >= 2
        ) {

            alert(
                "Limite de Healers!"
            );

            return;
        }

        raids[raid]
            .healers
            .push(nome);
    }

    else if (
        role === "dps"
    ) {

        if (
            raids[raid]
            .dps.length >= 6
        ) {

            alert(
                "Limite de DPS!"
            );

            return;
        }

        raids[raid]
            .dps
            .push(nome);
    }

    else {

        alert(
            "Função inválida!"
        );

        return;
    }

    raids[raid]
        .jogadores
        .push(nome);

    raids[raid].vagas++;

    atualizarRaid(raid);

    salvarRaid(raid);

    alert(
        "Inscrição realizada!"
    );
}

// ==========================================
// CANCELAR INSCRIÇÃO
// ==========================================

function cancelarInscricao(raid) {

    let nome =
        prompt(
            "Digite seu nome:"
        );

    if (!nome) return;

    raids[raid].tanks =
        raids[raid]
        .tanks.filter(
            j => j !== nome
        );

    raids[raid].healers =
        raids[raid]
        .healers.filter(
            j => j !== nome
        );

    raids[raid].dps =
        raids[raid]
        .dps.filter(
            j => j !== nome
        );

    raids[raid].jogadores =
        raids[raid]
        .jogadores.filter(
            j => j !== nome
        );

    if (
        raids[raid].vagas > 0
    ) {

        raids[raid].vagas--;
    }

    atualizarRaid(raid);

    salvarRaid(raid);

    alert(
        "Inscrição cancelada!"
    );
}

// ==========================================
// GLOBAL
// ==========================================

window.login = login;

window.irRegistro =
    irRegistro;

window.voltarLogin =
    voltarLogin;

window.registrar =
    registrar;

window.logout =
    logout;

window.inscreverRaid =
    inscreverRaid;

window.cancelarInscricao =
    cancelarInscricao;
