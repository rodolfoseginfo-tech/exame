"use client";

import { useEffect, useMemo, useState } from "react";

type Tab = "home" | "study" | "exams" | "analytics" | "profile";
const cards = [
  { front: "O que é uma oração subordinada adverbial?", back: "É a oração que exerce função de advérbio em relação à oração principal." },
  { front: "Qual é a fórmula da energia cinética?", back: "Ec = m · v² / 2" },
  { front: "Em que ano foi promulgada a Constituição Cidadã?", back: "1988." },
];
const questions = [
  { q: "Em um circuito de 12 V com resistência de 4 Ω, qual é a corrente?", options: ["2 A", "3 A", "4 A", "48 A"], answer: 1 },
  { q: "Qual princípio garante que ninguém será considerado culpado antes do trânsito em julgado?", options: ["Legalidade", "Isonomia", "Presunção de inocência", "Publicidade"], answer: 2 },
  { q: "Na frase ‘Embora estivesse cansado, continuou estudando’, a oração destacada é:", options: ["Causal", "Concessiva", "Temporal", "Final"], answer: 1 },
];

const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, string> = { home:"⌂", study:"▱", exams:"✓", analytics:"↗", profile:"○", bell:"♢", flame:"◆", clock:"◷", star:"☆", cloud:"☁", play:"▶", plus:"+", back:"←", more:"•••" };
  return <span aria-hidden="true">{icons[name]}</span>;
};

export default function StudySim() {
  const [tab, setTab] = useState<Tab>("home");
  const [focus, setFocus] = useState<"cards" | "exam" | null>(null);
  const [card, setCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [toast, setToast] = useState("");
  const [dark, setDark] = useState(false);
  const [online, setOnline] = useState(true);
  const [modal, setModal] = useState<"create" | "privacy" | "result" | null>(null);
  const [sets, setSets] = useState([{ title:"Português — Sintaxe", count:42, color:"purple" }, { title:"Direito Constitucional", count:68, color:"coral" }, { title:"Física — Eletricidade", count:36, color:"blue" }]);

  useEffect(() => {
    const saved = localStorage.getItem("studysim-state");
    if (saved) { try { const v = JSON.parse(saved); setAnswers(v.answers || {}); setSets(v.sets || sets); } catch {} }
    const update = () => setOnline(navigator.onLine);
    update(); window.addEventListener("online", update); window.addEventListener("offline", update);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register(`${location.pathname.startsWith("/exame") ? "/exame" : ""}/sw.js`);
    return () => { window.removeEventListener("online", update); window.removeEventListener("offline", update); };
  }, []);
  useEffect(() => { localStorage.setItem("studysim-state", JSON.stringify({answers, sets})); }, [answers, sets]);
  const notify = (message:string) => { setToast(message); setTimeout(() => setToast(""), 2200); };
  const score = useMemo(() => questions.filter((q,i) => answers[i] === q.answer).length, [answers]);

  if (focus === "cards") return <main className={`focus ${dark ? "dark" : ""}`}>
    <header className="focus-head"><button onClick={() => setFocus(null)} aria-label="Voltar"><Icon name="back" /></button><div><small>Português — Sintaxe</small><strong>{card+1} de {cards.length}</strong></div><button onClick={() => notify("Cartão salvo nos favoritos")}><Icon name="star" /></button></header>
    <div className="thin-progress"><i style={{width:`${(card+1)/cards.length*100}%`}} /></div>
    <section className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setFlipped(!flipped)}>
      <span>{flipped ? "RESPOSTA" : "PERGUNTA"}</span><h2>{flipped ? cards[card].back : cards[card].front}</h2><p>Toque para virar</p>
    </section>
    <div className="rating"><button onClick={() => nextCard("Revisaremos este cartão em breve")}>Não sei<small>1 min</small></button><button onClick={() => nextCard("Marcado como difícil")}>Difícil<small>6 min</small></button><button onClick={() => nextCard("Bom progresso!")}>Bom<small>2 dias</small></button><button onClick={() => nextCard("Conteúdo dominado!")}>Fácil<small>5 dias</small></button></div>
    {toast && <div className="toast">{toast}</div>}
  </main>;

  function nextCard(message:string) { notify(message); setFlipped(false); if (card < cards.length-1) setCard(card+1); else { setCard(0); setFocus(null); notify("Sessão concluída!"); } }
  function finishExam() { setModal("result"); }

  if (focus === "exam") { const q = questions[question]; return <main className={`focus exam ${dark ? "dark" : ""}`}>
    <header className="focus-head"><button onClick={() => setFocus(null)}><Icon name="back" /></button><div><small>Simulado geral</small><strong>Questão {question+1} de {questions.length}</strong></div><div className="timer"><Icon name="clock" /> 18:42</div></header>
    <div className="thin-progress"><i style={{width:`${(question+1)/questions.length*100}%`}} /></div>
    <section className="question"><div className="qmeta"><span>Física</span><button onClick={() => notify("Questão marcada para revisão")}><Icon name="star" /> Revisar</button></div><h2>{q.q}</h2><div className="options">{q.options.map((o,i) => <button className={answers[question]===i ? "selected" : ""} onClick={() => setAnswers({...answers,[question]:i})} key={o}><b>{String.fromCharCode(65+i)}</b>{o}</button>)}</div></section>
    <footer className="exam-footer"><button disabled={question===0} onClick={() => setQuestion(question-1)}>Anterior</button><div>{questions.map((_,i)=><i key={i} className={answers[i]!==undefined?"done":""} />)}</div><button className="primary" onClick={() => question < questions.length-1 ? setQuestion(question+1) : finishExam()}>{question < questions.length-1 ? "Próxima" : "Finalizar"}</button></footer>
    {toast && <div className="toast">{toast}</div>}{modal === "result" && <Result score={score} close={() => {setModal(null);setFocus(null);setTab("analytics")}} />}
  </main> }

  return <main className={`app ${dark ? "dark" : ""}`}>
    <header className="top"><div className="brand"><b>S</b><div><strong>StudySim</strong><small><span className={online?"online":"offline"} /> {online ? "Sincronizado" : "Modo offline"}</small></div></div><div className="top-actions"><button onClick={() => notify("Tudo em dia por aqui!")} aria-label="Notificações"><Icon name="bell" /><i>2</i></button><div className="avatar">RC</div></div></header>
    <section className="content">
      {tab === "home" && <Home onStudy={()=>setFocus("cards")} onExam={()=>setFocus("exam")} onReview={()=>{setTab("study");notify("Abrindo revisão de erros")}} sets={sets} />}
      {tab === "study" && <Study sets={sets} onCreate={()=>setModal("create")} onCards={()=>setFocus("cards")} />}
      {tab === "exams" && <Exams onStart={()=>setFocus("exam")} />}
      {tab === "analytics" && <Analytics score={score} />}
      {tab === "profile" && <Profile dark={dark} setDark={setDark} onPrivacy={()=>setModal("privacy")} onExport={()=>{ const blob=new Blob([JSON.stringify({sets,answers},null,2)],{type:"application/json"}); const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="studysim-dados.json";a.click();notify("Seus dados foram exportados"); }} />}
    </section>
    <nav className="bottom" aria-label="Navegação principal">{(["home","study","exams","analytics","profile"] as Tab[]).map((t,i)=><button key={t} className={tab===t?"active":""} onClick={()=>setTab(t)}><Icon name={t}/><small>{["Início","Estudar","Simulados","Desempenho","Perfil"][i]}</small></button>)}</nav>
    {modal === "create" && <CreateModal close={()=>setModal(null)} create={(title)=>{setSets([{title,count:0,color:"green"},...sets]);setModal(null);notify("Conjunto criado e salvo offline")}} />}
    {modal === "privacy" && <Privacy close={()=>setModal(null)} />}
    {toast && <div className="toast">{toast}</div>}
  </main>;
}

function Home({onStudy,onExam,onReview,sets}:{onStudy:()=>void;onExam:()=>void;onReview:()=>void;sets:any[]}) { return <div className="screen home-screen"><div className="greeting"><div><p>Boa noite, Rodolfo <span>👋</span></p><h1>Vamos avançar mais um pouco?</h1></div><div className="streak"><Icon name="flame"/><b>12</b><small>dias</small></div></div><div className="hero"><div className="ring"><b>68%</b><small>meta diária</small></div><div><span>PLANO DE HOJE</span><h2>Você está quase lá.</h2><p>Restam 18 minutos para concluir sua meta.</p><div className="mini"><i><b>24</b> cartões</i><i><b>12</b> questões</i><i><b>32</b> min</i></div></div><button onClick={onStudy}><Icon name="play"/> Continuar</button></div><div className="metrics"><article><span>Acertos gerais</span><b>76%</b><em>↗ 4,2%</em><div><i style={{width:"76%"}}/></div></article><article><span>Tempo esta semana</span><b>4h 32</b><em>+52 min</em><div className="bars">{[35,52,42,76,62,88,45].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div></article><article><span>Sequência atual</span><b>12 dias</b><em>recorde: 18</em><div className="days">S T Q Q S S D</div></article></div><div className="section-head"><div><small>CONTINUE DE ONDE PAROU</small><h2>Seus estudos recentes</h2></div><button>Ver todos</button></div><div className="recent">{sets.slice(0,3).map((s,i)=><article key={s.title} className={s.color}><div className="subject-icon">{["Aa","§","⚡"][i]||"Aa"}</div><div><small>{["PORTUGUÊS","DIREITO","FÍSICA"][i]||"ESTUDO"}</small><h3>{s.title}</h3><p>{s.count} cartões · {i===0?"68% concluído":"disponível offline"}</p><div><i style={{width:`${[68,42,21][i]||0}%`}}/></div></div><button onClick={i===1?onExam:onStudy}><Icon name="play"/></button></article>)}</div><div className="quick"><button onClick={onExam}><b>✓</b><span>Iniciar simulado<small>Teste seu conhecimento</small></span><Icon name="play"/></button><button onClick={onReview}><b>↻</b><span>Revisar erros<small>8 questões aguardando</small></span><i>8</i></button></div></div> }

function Study({sets,onCreate,onCards}:{sets:any[];onCreate:()=>void;onCards:()=>void}) { return <div className="screen"><div className="title-row"><div><small>SUA BIBLIOTECA</small><h1>O que vamos estudar?</h1></div><button className="primary" onClick={onCreate}><Icon name="plus"/> Novo conjunto</button></div><div className="search">⌕ <input aria-label="Buscar" placeholder="Buscar conjuntos, assuntos ou questões..."/><button>Filtros</button></div><div className="study-grid"><article className="recommend"><span>RECOMENDADO PARA VOCÊ</span><h2>Reforce os pontos em risco</h2><p>Identificamos 8 conceitos que merecem uma revisão rápida hoje.</p><button onClick={onCards}>Começar revisão <Icon name="play"/></button></article><div className="library"><div className="section-head"><h2>Meus conjuntos</h2><button>Organizar</button></div>{sets.map((s,i)=><button className="set-row" onClick={onCards} key={s.title}><span className={s.color}>{["Aa","§","⚡","✦"][i]||"✦"}</span><div><b>{s.title}</b><small>{s.count} cartões · salvo offline</small></div><em>{[68,42,21,0][i]||0}%</em><Icon name="play"/></button>)}</div></div></div> }
function Exams({onStart}:{onStart:()=>void}) { return <div className="screen"><div className="title-row"><div><small>SIMULADOS</small><h1>Pratique como no dia da prova.</h1></div><button className="primary" onClick={onStart}><Icon name="plus"/> Novo simulado</button></div><div className="exam-hero"><div><span>SIMULADO INTELIGENTE</span><h2>Prova geral adaptativa</h2><p>20 questões · 30 minutos · nível intermediário</p><ul><li>Baseado nos seus pontos fracos</li><li>Disponível totalmente offline</li><li>Salvamento automático</li></ul><button onClick={onStart}><Icon name="play"/> Começar agora</button></div><div className="target"><b>76%</b><span>sua média</span></div></div><div className="history"><div className="section-head"><h2>Histórico recente</h2><button>Ver todos</button></div>{[["Simulado Constitucional","18 jun","82%"],["Português — FCC","15 jun","74%"],["Física essencial","11 jun","68%"]].map(x=><article key={x[0]}><b>✓</b><div><strong>{x[0]}</strong><small>{x[1]} · 20 questões</small></div><em>{x[2]}</em><button>Revisar</button></article>)}</div></div> }
function Analytics({score}:{score:number}) { return <div className="screen"><div className="title-row"><div><small>DESEMPENHO</small><h1>Seu progresso em perspectiva.</h1></div><select aria-label="Período"><option>Últimos 30 dias</option><option>Esta semana</option></select></div><div className="analytics-grid"><article className="score-card"><span>DOMÍNIO GERAL</span><b>{score?Math.round(score/questions.length*100):76}%</b><p>Você está no caminho certo</p><div><i style={{width:`${score?score/questions.length*100:76}%`}}/></div><small>+4,2% desde o mês passado</small></article><article className="chart"><span>EVOLUÇÃO SEMANAL</span><div className="line-chart"><i/><b>76%</b></div><div className="axis">Sem 1　 Sem 2　 Sem 3　 Hoje</div></article></div><div className="metric-four"><article><span>Questões</span><b>248</b><small>respondidas</small></article><article><span>Acertos</span><b>189</b><small>76% do total</small></article><article><span>Tempo médio</span><b>1m 14s</b><small>por questão</small></article><article><span>Retenção</span><b>84%</b><small>após 7 dias</small></article></div><div className="subjects"><div className="section-head"><h2>Desempenho por disciplina</h2><button>Detalhes</button></div>{[["Direito Constitucional",84,"Excelente"],["Português",76,"Bom"],["Física",61,"Atenção"]].map(x=><article key={x[0]}><b>{x[0]}</b><div><i style={{width:`${x[1]}%`}}/></div><em>{x[1]}%</em><span>{x[2]}</span></article>)}</div></div> }
function Profile({dark,setDark,onPrivacy,onExport}:{dark:boolean;setDark:(v:boolean)=>void;onPrivacy:()=>void;onExport:()=>void}) { return <div className="screen"><div className="profile-head"><div className="big-avatar">RC</div><div><h1>Rodolfo Costa</h1><p>Estudando localmente · dados privados</p></div><button>Editar perfil</button></div><div className="settings"><h2>Preferências</h2><label><span><b>Tema escuro</b><small>Reduza o brilho da interface</small></span><input type="checkbox" checked={dark} onChange={e=>setDark(e.target.checked)}/></label><label><span><b>Lembretes de estudo</b><small>Uma notificação diária às 19h</small></span><input type="checkbox" defaultChecked/></label><h2>Dados e privacidade</h2><button onClick={onPrivacy}><span><b>Painel de privacidade</b><small>Consentimentos e dados no dispositivo</small></span>›</button><button onClick={onExport}><span><b>Exportar meus dados</b><small>Baixar uma cópia em JSON</small></span>›</button><button><span><b>Armazenamento offline</b><small>128 MB de 1 GB usados</small></span><em>13%</em></button></div></div> }
function CreateModal({close,create}:{close:()=>void;create:(v:string)=>void}) { const [title,setTitle]=useState(""); return <div className="overlay"><form className="modal" onSubmit={e=>{e.preventDefault();if(title.trim())create(title)}}><div className="modal-head"><div><small>NOVO CONJUNTO</small><h2>Organize um novo estudo</h2></div><button type="button" onClick={close}>×</button></div><label>Título<input autoFocus value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ex.: Matemática financeira" required/></label><label>Disciplina<select><option>Conhecimentos gerais</option><option>Português</option><option>Direito</option><option>Física</option></select></label><label>Descrição<textarea placeholder="O que você pretende aprender?"/></label><div className="modal-actions"><button type="button" onClick={close}>Cancelar</button><button className="primary">Criar conjunto</button></div></form></div> }
function Privacy({close}:{close:()=>void}) { return <div className="overlay"><div className="modal"><div className="modal-head"><div><small>PRIVACIDADE</small><h2>Você está no controle</h2></div><button onClick={close}>×</button></div><div className="privacy"><p>Seus estudos ficam neste dispositivo. Nenhuma telemetria opcional está ativa.</p><label><span><b>Dados somente no dispositivo</b><small>Não enviar conteúdo para a nuvem</small></span><input type="checkbox" defaultChecked/></label><label><span><b>Analytics anônimo</b><small>Ajudar a melhorar o StudySim</small></span><input type="checkbox"/></label><label><span><b>Notificações</b><small>Lembretes definidos por você</small></span><input type="checkbox"/></label></div><button className="primary wide" onClick={close}>Salvar preferências</button></div></div> }
function Result({score,close}:{score:number;close:()=>void}) { return <div className="overlay"><div className="modal result"><div className="result-ring"><b>{Math.round(score/questions.length*100)}%</b></div><small>SIMULADO CONCLUÍDO</small><h2>Bom trabalho!</h2><p>Você acertou {score} de {questions.length} questões. As respostas foram salvas no seu histórico.</p><button className="primary wide" onClick={close}>Ver desempenho</button></div></div> }
