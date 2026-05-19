// ==========================================
// BLOOD OATH - SCRIPT PRINCIPAL
// ==========================================

// ==========================================
// LOGIN
// ==========================================

import {
    db,
    ref,
    set,
    get,
    onValue
}
from "./firebase.js";

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

        localStorage.setItem("logado", "true");

        localStorage.setItem(
            "usuarioLogado",
            usuario
        );

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

    if (
        usuario === "" ||
        senha === "" ||
        classe === ""
    ) {

        alert("Preencha todos os campos!");

        return;
    }

    localStorage.setItem("usuario", usuario);

    localStorage.setItem("senha", senha);

    localStorage.setItem("classe", classe);

    alert("Conta criada com sucesso!");

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
            localStorage.getItem("usuarioLogado");

        nome.innerText = usuario;
    }

    // PLAYER CLASS

    let classe =
        localStorage.getItem("classe");

    let classeHTML =
        document.getElementById("player-class");

    if (classeHTML) {

        classeHTML.innerText =
            "Classe Principal: " + classe;
    }

    // CARREGAR TODAS AS RAIDS

    carregarRaid("naxx");
    carregarRaid("ulduar");
    carregarRaid("toc");
    carregarRaid("icc");
    carregarRaid("ruby");
};

// ==========================================
// CARREGAR RAID
// ==========================================

function carregarRaid(raid) {

    let dados =
        JSON.parse(localStorage.getItem(raid));

    if (dados) {

        raids[raid] = dados;
    }

    atualizarRaid(raid);
}

// ==========================================
// SALVAR RAID
// ==========================================

function salvarRaid(raid) {

    localStorage.setItem(
        raid,
        JSON.stringify(raids[raid])
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

function atualizarLista(id, listaJogadores) {

    let lista =
        document.getElementById(id);

    if (!lista) return;

    lista.innerHTML = "";

    for (let jogador of listaJogadores) {

        let item =
            document.createElement("li");

        item.innerText = jogador;

        lista.appendChild(item);
    }
}

// ==========================================
// INSCREVER RAID
// ==========================================

function inscreverRaid(raid) {

    // RAID LOTADA

    if (raids[raid].vagas >= 10) {

        alert("Raid lotada!");

        return;
    }

    // NOME

    let nome =
        prompt("Digite seu nome:");

    if (!nome) return;

    // IMPEDIR REPETIDOS

    if (
        raids[raid].jogadores.includes(nome)
    ) {

        alert("Jogador já inscrito!");

        return;
    }

    // ROLE

    let role =
        prompt(
            "Escolha sua função:\n\nTank\nHealer\nDPS"
        );

    if (!role) return;

    role = role.toLowerCase();

    // ==========================================
    // TANK
    // ==========================================

    if (role === "tank") {

        if (
            raids[raid].tanks.length >= 2
        ) {

            alert("Limite de Tanks!");

            return;
        }

        raids[raid].tanks.push(nome);
    }

    // ==========================================
    // HEALER
    // ==========================================

    else if (role === "healer") {

        if (
            raids[raid].healers.length >= 2
        ) {

            alert("Limite de Healers!");

            return;
        }

        raids[raid].healers.push(nome);
    }

    // ==========================================
    // DPS
    // ==========================================

    else if (role === "dps") {

        if (
            raids[raid].dps.length >= 6
        ) {

            alert("Limite de DPS!");

            return;
        }

        raids[raid].dps.push(nome);
    }

    else {

        alert("Função inválida!");

        return;
    }

    // SALVAR JOGADOR

    raids[raid].jogadores.push(nome);

    // AUMENTAR CONTADOR

    raids[raid].vagas++;

    // ATUALIZAR

    atualizarRaid(raid);

    salvarRaid(raid);

    alert("Inscrição realizada!");
}
