// ==========================================
// BLOOD OATH - SCRIPT PRINCIPAL
// ==========================================

import {
    db,
    ref,
    set,
    get,
    onValue
}
from "./firebase.js";

// ==========================================
// LOGIN
// ==========================================

async function login() {

    let usuario =
        document.getElementById("login-user").value;

    let senha =
        document.getElementById("login-pass").value;

    if (
        usuario === "" ||
        senha === ""
    ) {

        alert("Preencha todos os campos!");

        return;
    }

    let usuarioRef =
        ref(db, "usuarios/" + usuario);

    let snapshot =
        await get(usuarioRef);

    if (!snapshot.exists()) {

        alert("Usuário não encontrado!");

        return;
    }

    let dados =
        snapshot.val();

    if (dados.senha !== senha) {

        alert("Senha incorreta!");

        return;
    }

    localStorage.setItem(
        "usuarioLogado",
        usuario
    );

    localStorage.setItem(
        "classe",
        dados.classe
    );

    window.location.href =
        "panel.html";
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

async function registrar() {

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

    let usuarioRef =
        ref(db, "usuarios/" + usuario);

    let snapshot =
        await get(usuarioRef);

    if (snapshot.exists()) {

        alert("Usuário já existe!");

        return;
    }

    await set(usuarioRef, {

        usuario: usuario,
        senha: senha,
        classe: classe
    });

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

    localStorage.removeItem(
        "classe"
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

    // PLAYER NAME

    let nome =
        document.getElementById("player-name");

    if (nome) {

        let usuario =
            localStorage.getItem(
                "usuarioLogado"
            );

        nome.innerText =
            usuario || "Aventureiro";
    }

    // PLAYER CLASS

    let classe =
        localStorage.getItem("classe");

    let classeHTML =
        document.getElementById(
            "player-class"
        );

    if (classeHTML) {

        classeHTML.innerText =
            "Classe Principal: " +
            (classe || "Nenhuma");
    }

    // CARREGAR RAIDS

    carregarRaid("naxx");
    carregarRaid("ulduar");
    carregarRaid("toc");
    carregarRaid("icc");
    carregarRaid("ruby");
};

// ==========================================
// CARREGAR RAID FIREBASE
// ==========================================

function carregarRaid(raid) {

    let raidRef =
        ref(db, "raids/" + raid);

    onValue(raidRef, (snapshot) => {

        if (snapshot.exists()) {

            raids[raid] =
                snapshot.val();
        }

        else {

            set(raidRef, raids[raid]);
        }

        atualizarRaid(raid);
    });
}

// ==========================================
// SALVAR RAID
// ==========================================

async function salvarRaid(raid) {

    await set(

        ref(db, "raids/" + raid),

        raids[raid]
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
// ATUALIZAR LISTA
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

async function inscreverRaid(raid) {

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
            "Escolha sua função:\n\nTank\nHealer\nDPS"
        );

    if (!role) return;

    role =
        role.toLowerCase();

    // TANK

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

    // HEALER

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

    // DPS

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

    await salvarRaid(raid);

    alert(
        "Inscrição realizada!"
    );
}

// ==========================================
// CANCELAR INSCRIÇÃO
// ==========================================

async function cancelarInscricao(raid) {

    let nome =
        prompt(
            "Digite seu nome:"
        );

    if (!nome) return;

    let encontrou = false;

    // REMOVER

    if (
        raids[raid]
        .tanks.includes(nome)
    ) {

        raids[raid].tanks =
            raids[raid]
            .tanks.filter(
                j => j !== nome
            );

        encontrou = true;
    }

    if (
        raids[raid]
        .healers.includes(nome)
    ) {

        raids[raid].healers =
            raids[raid]
            .healers.filter(
                j => j !== nome
            );

        encontrou = true;
    }

    if (
        raids[raid]
        .dps.includes(nome)
    ) {

        raids[raid].dps =
            raids[raid]
            .dps.filter(
                j => j !== nome
            );

        encontrou = true;
    }

    raids[raid].jogadores =
        raids[raid]
        .jogadores.filter(
            j => j !== nome
        );

    if (!encontrou) {

        alert(
            "Jogador não encontrado!"
        );

        return;
    }

    if (
        raids[raid].vagas > 0
    ) {

        raids[raid].vagas--;
    }

    await salvarRaid(raid);

    alert(
        "Inscrição cancelada!"
    );
}

// ==========================================
// GLOBAL FUNCTIONS
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
