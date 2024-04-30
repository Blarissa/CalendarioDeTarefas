var tarefas = document.querySelector("#tarefas");
var cabecalho = document.querySelector("#cabecalho");
var form = document.querySelector("#form");
var botaoSalva = document.querySelector("#botaoSalvar");

var inputPesquisa = document.querySelector("#pesquisa");
var inputTitulo = document.querySelector("#titulo");
var inputDescricao = document.querySelector("#descricao");
var inputDataHora = document.querySelector("#dataHora");
var inputDuracao = document.querySelector("#duracao");
var inputConcluido = document.querySelector("#concluido");

var idEditar = null;
var lista = [];

// Array imitando um banco de dados real
var db = [
    {
        id: 0,
        titulo: "Estudar",
        descricao: "Estudar para a prova de matemática.",
        dataHora: "04/30/2024 14:00",
        duracao: "02:00",
        concluido: true
    },
    {
        id: 1,
        titulo: "Lavar o carro",
        descricao: "Lavar o carro nesse fim de semana",
        dataHora: "30/04/2024 14:00",
        duracao: "00:30",
        concluido: false
    },
    {
        id: 2,
        titulo: "Comprar mantimentos",
        descricao: "Fazer compras para a semana.",
        dataHora: "02/09/2024 10:00",
        duracao: "01:00",
        concluido: false
    },
    {
        id: 3,
        titulo: "Ir à academia",
        descricao: "Treino de musculação.",
        dataHora: "02/09/2024 18:00",
        duracao: "01:30",
        concluido: true
    },
    {
        id: 4,
        titulo: "Reunião de equipe",
        descricao: "Reunião semanal de equipe.",
        dataHora: "03/09/2024 15:00",
        duracao: "01:00",
        concluido: false
    },
    {
        id: 5,
        titulo: "Assistir ao webinar",
        descricao: "Participar do webinar sobre marketing digital.",
        dataHora: "04/09/2024 11:00",
        duracao: "02:00",
        concluido: true
    },
    {
        id: 6,
        titulo: "Fazer a declaração de imposto",
        descricao: "Preparar e enviar a declaração de imposto de renda.",
        dataHora: "05/09/2024 09:30",
        duracao: "02:30",
        concluido: false
    },
    {
        id: 7,
        titulo: "Limpar o escritório",
        descricao: "Limpar e organizar o escritório em casa.",
        dataHora: "06/09/2024 13:00",
        duracao: "01:30",
        concluido: true
    },
    {
        id: 8,
        titulo: "Fazer a lista de compras",
        descricao: "Planejar as compras para a festa de aniversário.",
        dataHora: "07/09/2024 16:00",
        duracao: "00:45",
        concluido: false
    },
    {
        id: 9,
        titulo: "Enviar relatório",
        descricao: "Enviar relatório mensal para o chefe.",
        dataHora: "08/09/2024 11:30",
        duracao: "01:15",
        concluido: true
    },
    {
        id: 10,
        titulo: "Estudar francês",
        descricao: "Estudar vocabulário e gramática.",
        dataHora: "09/09/2024 10:30",
        duracao: "01:30",
        concluido: false
    },
    {
        id: 11,
        titulo: "Ler livro",
        descricao: "Ler o novo livro de ficção.",
        dataHora: "10/09/2024 19:00",
        duracao: "02:00",
        concluido: true
    },
    {
        id: 12,
        titulo: "Preparar apresentação",
        descricao: "Preparar slides para a reunião de vendas.",
        dataHora: "11/09/2024 08:00",
        duracao: "02:30",
        concluido: false
    },
    {
        id: 13,
        titulo: "Fazer exames de rotina",
        descricao: "Consulta médica e exames de saúde.",
        dataHora: "12/09/2024 14:30",
        duracao: "03:00",
        concluido: true
    },
    {
        id: 14,
        titulo: "Assistir ao jogo de futebol",
        descricao: "Assistir ao jogo do time favorito no estádio.",
        dataHora: "05/02/2024 16:30",
        duracao: "02:30",
        concluido: true
    },
    {
        id: 15,
        titulo: "Consertar a torneira",
        descricao: "Chamar o encanador para consertar a torneira da cozinha.",
        dataHora: "05/02/2024 10:00",
        duracao: "01:00",
        concluido: false
    },
    {
        id: 16,
        titulo: "Assistir a série",
        descricao: "Maratona da nova série na Netflix.",
        dataHora: "15/09/2024 20:00",
        duracao: "03:00",
        concluido: true
    },
    {
        id: 17,
        titulo: "Planejar viagem",
        descricao: "Planejar as férias de final de ano.",
        dataHora: "16/09/2024 09:00",
        duracao: "02:30",
        concluido: false
    },
    {
        id: 18,
        titulo: "Estudar programação",
        descricao: "Praticar programação em Python.",
        dataHora: "17/09/2024 14:00",
        duracao: "02:00",
        concluido: false
    },
    {
        id: 19,
        titulo: "Fazer aula de culinária",
        descricao: "Aprender a fazer sushi em aula de culinária.",
        dataHora: "18/09/2024 11:30",
        duracao: "02:00",
        concluido: false
    }
];

// Função para mostrar o formulário
function MostrarForm() {
    form.style.display = "block";
}

// Função para mostrar o formulário para editar tarefa
function MostrarFormEditar(id) {
    idEditar = id;

    MostrarForm();

    inputTitulo.value = db[id].titulo;
    inputDescricao.value = db[id].descricao;
    inputDataHora.value = db[id].dataHora;
    inputDuracao.value = db[id].duracao;
    inputConcluido.checked = db[id].concluido;
}

// Função para remover tarefa
function RemoverTarefa(id) {
    db.splice(id, 1);
    VisualizarTodas();
}

// Função para ocultar o formulário
function OcultarForm() {
    LimparForm();
    form.style.display = "none";
}

// Função para limpar o formulário
function LimparForm() {
    inputTitulo.value = "";
    inputDescricao.value = "";
    inputDataHora.value = "";
    inputDuracao.value = "";
    inputConcluido.checked = false;
    idEditar = null;
}

// Função para salvar tarefa nova ou editada
function SalvarTarefa() {
    if (idEditar != null) {
        EditarTarefa();
    } else {
        AdicionarTarefa();
    }

    VisualizarTodas();
    OcultarForm();
}

// Função para adicionar tarefa
function AdicionarTarefa() {
    var tarefa = {
        id: db.length + 1,
        titulo: inputTitulo.value,
        descricao: inputDescricao.value,
        dataHora: inputDataHora.value,
        duracao: inputDuracao.value,
        concluido: inputConcluido.checked
    }

    db.push(tarefa);
}

// Função para editar tarefa
function EditarTarefa() {
    db[idEditar] = {
        id: idEditar,
        titulo: inputTitulo.value,
        descricao: inputDescricao.value,
        dataHora: inputDataHora.value,
        duracao: inputDuracao.value,
        concluido: inputConcluido.checked
    }
}

// Função que formata a segunda parte da tabela de tarefas
function ExibirTarefas() {
    var text = '';

    // Ordena a lista de tarefas por ordem de conclusão
    lista.sort(function (a) {
        return a.concluido ? 1 : -1;
    });

    for (i = 0; i < lista.length; i++) {
        text += '<tr>';
        text += '<td>' + lista[i].titulo + '</td>';
        text += '<td>' + lista[i].descricao + '</td>';
        text += '<td>' + lista[i].duracao + '</td>';
        text += '<td>' + lista[i].dataHora + '</td>';

        if (lista[i].concluido == true) {
            text += '<td><input type="checkbox" id="concluido" checked="true" disabled="true"></td>';
        } else {
            text += '<td><input type="checkbox" id="concluido" disabled="true"></td>';
        }
        text += '<td><button type="button" class="btn btn-dark" onclick="MostrarFormEditar(' + lista[i].id + ')"><i class="bi bi-pencil-square"></i></button></td>';
        text += '<td><button type="button" class="btn btn-danger" onclick="RemoverTarefa(' + lista[i].id + ')"><i class="bi bi-trash"></i></button></td>';
        text += '</tr>';
    }
    tarefas.innerHTML = text;
}

// Função para pesquisar tarefas
function PesquisarTarefas() {
    lista = db.filter(function (tarefa) {
        return tarefa.titulo.toLowerCase().includes(inputPesquisa.value.toLowerCase());
    });

    ExibirTarefas();
}

// Função que formata o cabeçalho da vizualização de tarefas por dia
function CabecalhoDia() {
    var dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    var dia = new Date().getDay();

    var text = '';
    text += '<tr>';
    text += '<th>' + dias[dia] + '</th>';
    text += '</tr>';

    cabecalho.innerHTML = text;
}

// Função que formata o cabeçalho da vizualização de todas as tarefas
function CabecalhoTodas() {
    var text = '';
    text += '<tr>';
    text += '<th>Título</th>';
    text += '<th>Descrição</th>';
    text += '<th>Duração</th>';
    text += '<th>Data e hora</th>';
    text += '<th>Concluído</th>';
    text += '</tr>';

    cabecalho.innerHTML = text;
}

// Função que formata o cabeçalho da vizualização de tarefas por mês
function CabecalhoMes() {
    CabecalhoTodas();
}

// Função que mostra as tarefas do dia atual
function VisualizarPorDia() {
    CabecalhoDia();

    lista = db.filter(function (tarefa) {
        var data = new Date(tarefa.dataHora);
        return data.getDate() == new Date().getDate();
    });

    var text = '';

    for (i = 0; i < lista.length; i++) {
        text += '<tr>';
        text += '<td>'
        text += '<div class="card">';
        text += '<div class="card-body">';
        text += '<h5 class="card-title">' + lista[i].titulo + '</h5>';
        text += '<p class="card-text">' + lista[i].descricao + '</p>';
        text += '<p class="card-text">' + lista[i].duracao + '</p>';
        text += '<p class="card-text">' + lista[i].dataHora + '</p>';
        text += '<p class="card-text">';
        if (lista[i].concluido == true) {
            text += '<i class="bi bi-check-lg"></i>';
        } else {
            text += '<i class="bi bi-x-lg"></i>';
        }
        text += '</p>';
        text += '</div>';
        text += '</div>';
        text += '</td>';
        text += '</tr>';
    }
    tarefas.innerHTML = text;
}

// Função que mostra as tarefas do mês
function VisualizarPorMes() {
    CabecalhoMes();

    lista = db.filter(function (tarefa) {
        var data = new Date(tarefa.dataHora);
        return data.getMonth() == new Date().getMonth();
    });

    ExibirTarefas();
}

// Função que mostra todas as tarefas
function VisualizarTodas() {
    lista = db;
    CabecalhoTodas();
    ExibirTarefas();
}

VisualizarTodas();