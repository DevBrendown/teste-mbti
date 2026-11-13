const PERGUNTAS=[
['E','Recarrego as energias estando com outras pessoas.'],
['I','Preciso de tempo sozinho(a) para me recuperar depois de eventos sociais.'],
['E','Puxo conversa com desconhecidos com facilidade.'],
['I','Prefiro conversar com poucas pessoas a falar com um grupo grande.'],
['E','Penso melhor quando falo em voz alta.'],
['I','Penso bastante antes de dizer o que penso.'],
['S','Confio mais em fatos e experiência do que em palpites.'],
['N','Gosto mais de imaginar o que poderia ser do que do que já é.'],
['S','Prefiro instruções passo a passo e exemplos práticos.'],
['N','Percebo padrões e conexões que os outros não veem.'],
['S','Costumo focar no que está acontecendo agora.'],
['N','Penso muito no futuro e nas possibilidades.'],
['T','Nas decisões, a lógica pesa mais que os sentimentos.'],
['F','Antes de decidir, penso em como isso afeta as pessoas.'],
['T','Prefiro críticas diretas e objetivas.'],
['F','Evito dizer algo que possa magoar, mesmo que seja verdade.'],
['T','Acho justo tratar todos pelas mesmas regras.'],
['F','Abro exceções quando a situação da pessoa pede.'],
['J','Gosto de planejar e entregar tudo com folga.'],
['P','Prefiro deixar as opções abertas e decidir na hora.'],
['J','Me sinto bem quando risco itens da minha lista.'],
['P','Me adapto fácil quando os planos mudam.'],
['J','Mantenho minhas coisas e minha rotina organizadas.'],
['P','Trabalho melhor com a pressão do último minuto.']
];
const ESCALA=['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'];
const DIMS=[['E','I','Energia','Extrovertido','Introvertido'],['S','N','Percepção','Sensorial','Intuitivo'],['T','F','Decisão','Racional','Sentimental'],['J','P','Estilo','Julgador','Perceptivo']];
const resp=[];
const $=id=>document.getElementById(id);

function mostrar(){
  const i=resp.length;
  $('prog').style.width=(i/PERGUNTAS.length*100)+'%';
  $('cont').textContent=`Pergunta ${i+1} de ${PERGUNTAS.length}`;
  $('frase').textContent=PERGUNTAS[i][1];
  $('esc').innerHTML=ESCALA.map((t,v)=>`<button type="button" data-v="${v+1}">${t}</button>`).join('');
  $('voltar').hidden=i===0;
}
$('esc').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  resp.push(+b.dataset.v);
  resp.length===PERGUNTAS.length?resultado():mostrar();
});
$('voltar').addEventListener('click',()=>{resp.pop();mostrar()});

function resultado(){
  // pontos > 0 favorecem o primeiro polo da dimensão; < 0, o segundo
  const pts=DIMS.map(([a,b])=>PERGUNTAS.reduce((s,[l,_],i)=>{
    const v=resp[i]-3;
    return l===a?s+v:l===b?s-v:s;
  },0));
  const max=12; // 6 perguntas x 2 pontos
  const codigo=DIMS.map(([a,b],i)=>pts[i]>0?a:b).join('');
  const t=TIPOS.find(x=>x.c===codigo);
  const barras=DIMS.map(([a,b,nome,na,nb],i)=>{
    const pa=Math.round(50+pts[i]/max*50),pb=100-pa;
    const forte=pts[i]>0?[a,na,pa]:[b,nb,pb];
    return `<div class="med"><div class="rot"><span>${nome}</span><span><b>${forte[0]} — ${forte[1]}</b> (${forte[2]}%)</span></div><div class="tr"><i style="width:${forte[2]}%"></i></div></div>`;
  }).join('');
  $('quiz').hidden=true;
  const r=$('res');r.hidden=false;r.style.setProperty('--k',t.k);
  r.innerHTML=`${icone(t)}<h2>${t.c} — ${t.n}</h2><p class="sub">Funções: ${t.f}</p><p class="desc">${t.d}</p>
  <div class="medidas">${barras}</div>
  <p class="desc" style="font-size:15px">Resultado informal. Quem está perto de 50% em alguma linha pode cair em outro tipo ao refazer o teste.</p>
  <div class="acoes"><button class="btn" id="refazer" type="button">Refazer o teste</button><a class="btn vazado" href="index.html#grade">Ver os 16 tipos</a></div>`;
  $('refazer').onclick=()=>{resp.length=0;r.hidden=true;$('quiz').hidden=false;mostrar()};
  r.scrollIntoView({behavior:'smooth'});
}
mostrar();