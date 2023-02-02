let questaoAtual = 0, questaoRespondida = false;
const alternativas = [... document.querySelectorAll('.alternativa')];
const questoes = [... document.querySelectorAll('.questao')];
const divQuestoes = document.querySelector('.questoes');
const divResultado = document.querySelector('.resultado');
const btnProximaQuestao = document.getElementById('btnProximaQuestao');
const btnVerResultado = document.getElementById('btnVerResultado');

const escondeOutrasQuestoes = () => {
	for (let i = 0; i < questoes.length; i++) {
		if (i != questaoAtual) {
			questoes[i].classList.add('hide');
		}
	}		
}

alternativas.forEach(alternativa => {
	alternativa.addEventListener('click', () => {
		let questaoAtual = alternativa.getAttribute('for');
		let alternativasQuestaoAtual = [... document.querySelectorAll(`[for='${questaoAtual}']`)];
		alternativasQuestaoAtual.forEach(aqa => {
			aqa.classList.remove('escolhida');
		});
		alternativa.classList.add('escolhida');
		questaoRespondida = true;
	});
});

escondeOutrasQuestoes();

btnProximaQuestao.addEventListener('click', () => {
	if (questaoAtual === questoes.length - 2) {
		btnProximaQuestao.classList.add('hide');
		btnVerResultado.classList.remove('hide');
	}

	if (questaoAtual < questoes.length && questaoRespondida) {
		questaoAtual++;
		questoes.forEach(questao => { questao.classList.remove('hide'); });
		questaoRespondida = false;
		escondeOutrasQuestoes();
	}
});

btnVerResultado.addEventListener('click', () => {
	if (questaoRespondida) {
		btnVerResultado.classList.add('hide');
		let escolhidas = [... document.querySelectorAll('.escolhida')];
		let textoEscolhidas = [];
		let acertos = 0;

		escolhidas.forEach(escolhida => {
			if (escolhida.classList.contains('correta')) {
				acertos++;
				textoEscolhidas.push(escolhida.getAttribute('alt'));
			}
		});

		divQuestoes.classList.add('hide');
		divResultado.classList.remove('hide');

		if (acertos > 0) {
			divResultado.querySelector('p').textContent = `😁 Opa! Você respondeu positivamente em ${acertos} questão(ões)! Então é claro que você precisa do meu serviço. Entre em contato comigo, pois com certeza posso te ajudar com:`

			let ul = document.createElement('ul');
			for (let i = 0; i < textoEscolhidas.length; i++) {
				let li = document.createElement("li");
				li.textContent = textoEscolhidas[i];
				ul.appendChild(li);
			}

			divResultado.appendChild(ul);
		} else {
			divResultado.querySelector('p').textContent = `Infelizmente, você não respondeu positivamente a nenhuma questão. Então não há nada com que eu possa te ajudar neste momento 🤷`
		}
	}
});