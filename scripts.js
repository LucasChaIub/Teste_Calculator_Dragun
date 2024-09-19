function showCalculator(calcId) {
    document.getElementById('calculatorSelection').style.display = 'none';
    document.getElementById('calculatorContainer').style.display = 'block';
    document.querySelectorAll('.calculator').forEach(calc => {
        calc.style.display = 'none';
    });
    document.getElementById(calcId).style.display = 'block';
}

function showCalculatorSelection() {
    document.getElementById('calculatorSelection').style.display = 'grid';
    document.getElementById('calculatorContainer').style.display = 'none';
}

function calcularDiasUso() {
    const valorBase = parseFloat(document.getElementById('valorBase1').value);
    const ultimoVencimento = moment(document.getElementById('ultimoVencimento1').value);
    const dataPagamento = moment(document.getElementById('dataPagamento1').value);
    
    const diasUtilizados = dataPagamento.diff(ultimoVencimento, 'days');
    const valorProporcional = (valorBase / 30) * diasUtilizados;
    
    document.getElementById('resultado1').innerHTML = `Valor proporcional: R$ ${valorProporcional.toFixed(2)}<br>Baseado em ${diasUtilizados} dias de utilização`;
}

function calcularMudancaPlano() {
    const valorPlanoAntigo = parseFloat(document.getElementById('valorPlanoAntigo').value);
    const valorPlanoNovo = parseFloat(document.getElementById('valorPlanoNovo').value);
    const ultimoVencimento = moment(document.getElementById('ultimoVencimento2').value);
    const dataMudanca = moment(document.getElementById('dataMudanca').value);
    const proximoVencimento = moment(document.getElementById('proximoVencimento').value);
    
    const diasPlanoAntigo = dataMudanca.diff(ultimoVencimento, 'days');
    const diasPlanoNovo = proximoVencimento.diff(dataMudanca, 'days');
    
    const valorProporcionalAntigo = (valorPlanoAntigo / 30) * diasPlanoAntigo;
    const valorProporcionalNovo = (valorPlanoNovo / 30) * diasPlanoNovo;
    
    const valorTotal = valorProporcionalAntigo + valorProporcionalNovo;
    const diasTotais = diasPlanoAntigo + diasPlanoNovo;
    
    document.getElementById('resultado2').innerHTML = `Valor proporcional: R$ ${valorTotal.toFixed(2)}<br>Baseado em ${diasTotais} dias de utilização (${diasPlanoAntigo} dias do plano antigo e ${diasPlanoNovo} dias do plano novo)`;
}

function calcularMudancaVencimento() {
    const valorPlano = parseFloat(document.getElementById('valorPlano3').value);
    const ultimoVencimento = moment(document.getElementById('ultimoVencimento3').value);
    const novoVencimento = moment(document.getElementById('novoVencimento').value);
    
    const diasDiferenca = novoVencimento.diff(ultimoVencimento, 'days');
    const valorProporcional = (valorPlano / 30) * diasDiferenca;
    
    document.getElementById('resultado3').innerHTML = `Valor proporcional: R$ ${valorProporcional.toFixed(2)}<br>Baseado em ${diasDiferenca} dias de diferença entre vencimentos`;
}

function calcularMultaRescisoria() {
    const dataAssinatura = moment(document.getElementById('dataAssinatura').value);
    const dataCancelamento = moment(document.getElementById('dataCancelamento').value);
    
    const diasContrato = dataCancelamento.diff(dataAssinatura, 'days');
    const valorMultaTotal = 600;
    let valorMulta;
    
    if (diasContrato <= 365) {
        valorMulta = valorMultaTotal * (1 - (diasContrato / 365));
    } else {
        valorMulta = 0;
    }
    
    document.getElementById('resultado4').innerHTML = `Valor da multa rescisória: R$ ${valorMulta.toFixed(2)}<br>Baseado em ${diasContrato} dias de contrato`;
}

function calcularDescontoDiasNaoUtilizados() {
    const valorMensal = parseFloat(document.getElementById('valorMensal').value);
    const dataHoraInicio = moment(document.getElementById('dataHoraInicio').value);
    const dataHoraFim = moment(document.getElementById('dataHoraFim').value);
    
    const horasSemAcesso = dataHoraFim.diff(dataHoraInicio, 'hours', true);
    const diasSemAcesso = horasSemAcesso / 24;
    const valorDiario = valorMensal / 30;
    const desconto = valorDiario * diasSemAcesso;
    
    document.getElementById('resultado5').innerHTML = `
        Desconto calculado: R$ ${desconto.toFixed(2)}<br>
        Baseado em ${horasSemAcesso.toFixed(2)} horas sem acesso (${diasSemAcesso.toFixed(2)} dias)<br>
        Cálculo: (${valorMensal.toFixed(2)} / 30) * ${diasSemAcesso.toFixed(2)} = ${desconto.toFixed(2)}
    `;
}

function verificarRefidelizacao() {
    const dataSuspensao = moment(document.getElementById('dataSuspensao').value);
    const dataPagamentoReligamento = moment(document.getElementById('dataPagamentoReligamento').value);
    
    const diferencaDias = dataPagamentoReligamento.diff(dataSuspensao, 'days');
    
    let resultado = '';
    if (diferencaDias < 120) {
        resultado = `O cliente NÃO deve ser refidelizado.<br>`;
    } else {
        resultado = `O cliente DEVE ser refidelizado.<br>`;
    }
    
    resultado += `Diferença: ${diferencaDias} dias entre a suspensão e o pagamento do religamento.`;
    
    document.getElementById('resultado6').innerHTML = resultado;
}
