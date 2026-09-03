import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import heroWoman from "@/assets/hero-woman.jpg";
import biaProfile from "@/assets/bia-profile.jpg";
import biaSelfie1 from "@/assets/bia-selfie-1.jpg";
import biaSelfie2 from "@/assets/bia-selfie-2.jpg";
import biaSelfie3 from "@/assets/bia-selfie-3.jpg";

const BIA_PHOTOS = [biaSelfie1, biaSelfie2, biaSelfie3];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

export const Route = createFileRoute("/chat-privado")({
  head: () => ({
    meta: [
      { title: "Chat Privado Feminino — Acesso Completo" },
      { name: "description", content: "O que elas realmente querem dizer. Análises psicológicas completas de conversas femininas reais." },
      { property: "og:title", content: "Chat Privado Feminino" },
      { property: "og:description", content: "O que elas realmente querem dizer." },
    ],
  }),
  component: ChatPrivado,
});

type Category = {
  id: string;
  title: string;
  hint: string;
  tag: string;
  conv: ConvLine[];
};

type ConvLine =
  | { from: "her"; text: string; time?: string }
  | { from: "you"; text: string; time?: string; wrong?: boolean }
  | { from: "analysis"; label: string; text: string };

const CATEGORIES: Category[] = [
  {
    id: "frias",
    title: "Respostas frias",
    hint: "quando ela responde curto e seco",
    tag: "AVANÇADO",
    conv: [
      { from: "her", text: "hmm", time: "23:41" },
      { from: "analysis", label: "ANÁLISE FEMININA", text: "Ela não está desinteressada — está testando se você vai correr atrás ou manter postura." },
      { from: "analysis", label: "CONTEXTO", text: "Resposta curta de mulher quase nunca é falta de assunto. É filtro emocional: ela quer ver como você reage à ausência dela." },
      { from: "you", text: "tá tudo bem? te fiz algo?", time: "23:43", wrong: true },
      { from: "analysis", label: "ERRO COMUM", text: "Pedir explicação transforma você em projeto emocional dela — e mulher não se atrai por quem ela precisa cuidar." },
      { from: "you", text: "hmm é resposta de quem tá ocupada ou de quem tá pensando em mim?", time: "23:58" },
      { from: "analysis", label: "RESPOSTA QUE FUNCIONA", text: "Você devolve o teste com leveza. Não cobra, não reclama — provoca curiosidade." },
      { from: "her", text: "kkkk você é safado", time: "00:02" },
      { from: "analysis", label: "RESULTADO", text: "A energia mudou. Você saiu do papel de carente e entrou no papel de instigante." },
    ],
  },
  {
    id: "demora",
    title: "Quando ela demora a responder",
    hint: "o silêncio que destrói homens comuns",
    tag: "ESSENCIAL",
    conv: [
      { from: "you", text: "e aí, como foi seu dia?", time: "19:02", wrong: true },
      { from: "her", text: "oi, desculpa só vi agora 😅", time: "22:47" },
      { from: "analysis", label: "ANÁLISE FEMININA", text: "Ela percebeu disponibilidade excessiva. O 'desculpa' é cortesia, não interesse." },
      { from: "analysis", label: "ERRO COMUM", text: "Responder na hora dizendo 'imagina, tudo bem'. Isso confirma que você estava esperando." },
      { from: "you", text: "tava no mesmo modo. me conta uma coisa boa que aconteceu hoje.", time: "01:14" },
      { from: "analysis", label: "RESPOSTA QUE FUNCIONA", text: "Responder horas depois, sem cobrança, e redirecionar pra algo emocional. Mostra que sua vida não parou." },
      { from: "her", text: "nossa, gostei dessa pergunta", time: "01:16" },
      { from: "analysis", label: "REGRA", text: "Tempo de resposta espelha valor percebido. Nunca responda mais rápido do que ela responde — exceto se for pra encerrar a conversa." },
    ],
  },
  {
    id: "sinais",
    title: "Sinais ocultos de interesse",
    hint: "o que ela faz quando gosta de verdade",
    tag: "LEITURA",
    conv: [
      { from: "her", text: "kkkk você é diferente", time: "00:13" },
      { from: "analysis", label: "ANÁLISE FEMININA", text: "Curiosidade emocional ativada. Ela está avaliando sua energia, não seu currículo." },
      { from: "analysis", label: "ERRO COMUM", text: "Tentar provar o porquê você é diferente. Explicação mata mistério." },
      { from: "you", text: "diferente no bom sentido ou no perigoso?", time: "00:14" },
      { from: "analysis", label: "RESPOSTA QUE FUNCIONA", text: "Você devolve com provocação. Mulher adora a palavra 'perigoso' — ela ativa imaginação." },
      { from: "her", text: "nos dois 👀", time: "00:15" },
      { from: "analysis", label: "OUTROS SINAIS REAIS", text: "1. Ela manda áudio longo sem você pedir. 2. Ela responde com pergunta de volta. 3. Ela usa seu nome no meio da mensagem. 4. Ela manda mensagem antes de dormir e ao acordar." },
    ],
  },
  {
    id: "tensao",
    title: "Como gerar tensão emocional",
    hint: "o que a faz pensar em você o dia inteiro",
    tag: "PSICOLÓGICO",
    conv: [
      { from: "her", text: "para de ser assim 🙄", time: "21:08" },
      { from: "analysis", label: "ANÁLISE FEMININA", text: "Quando ela reclama com emoji, ela está pedindo MAIS — não menos." },
      { from: "you", text: "assim como?", time: "21:09" },
      { from: "analysis", label: "RESPOSTA QUE FUNCIONA", text: "Silêncio é tensão. Explicação é fuga. Devolva a pergunta seca e deixe ela preencher o vazio." },
      { from: "her", text: "assim provocador, sabe que mexe comigo", time: "21:11" },
      { from: "analysis", label: "CONFISSÃO", text: "Ela admitiu sozinha que você mexe com ela. Você não precisou pedir." },
      { from: "you", text: "se eu parasse, você ia sentir falta?", time: "21:14" },
      { from: "analysis", label: "GATILHO", text: "Pergunta hipotética ativa o medo de perder. Mulher decide pela emoção, não pela lógica." },
      { from: "her", text: "talvez 😏", time: "21:15" },
    ],
  },
  {
    id: "prendem",
    title: "Conversas que prendem ela",
    hint: "o ritmo que cria dependência emocional",
    tag: "RITMO",
    conv: [
      { from: "her", text: "to com sono mas não quero dormir ainda", time: "01:22" },
      { from: "analysis", label: "ANÁLISE FEMININA", text: "Sinal direto: ela está prolongando o contato. Esse é o momento de fechar — não de continuar." },
      { from: "you", text: "então fecha o olho e dorme. amanhã a gente continua isso.", time: "01:23" },
      { from: "analysis", label: "RESPOSTA QUE FUNCIONA", text: "Você corta no auge. Loop aberto. Ela vai dormir pensando em você." },
      { from: "her", text: "nossa, agora vou ficar pensando", time: "01:24" },
      { from: "analysis", label: "REGRA DE OURO", text: "Toda conversa boa deve terminar antes do pico, não depois. Quem encerra primeiro controla o ritmo." },
      { from: "analysis", label: "PADRÃO DE DEPENDÊNCIA", text: "Alterne 3 dias intensos com 1 dia de ausência total. O cérebro dela cria expectativa — e expectativa vira saudade." },
    ],
  },
  {
    id: "erros",
    title: "Erros masculinos silenciosos",
    hint: "o que mata atração sem você perceber",
    tag: "CRÍTICO",
    conv: [
      { from: "you", text: "bom dia linda ❤️ dormiu bem?", time: "07:14", wrong: true },
      { from: "analysis", label: "ANÁLISE FEMININA", text: "Excesso de afeto matinal sem contexto = previsibilidade. Previsibilidade = perda de atração." },
      { from: "you", text: "sonhei uma coisa estranha com você hoje.", time: "11:32" },
      { from: "analysis", label: "RESPOSTA QUE FUNCIONA", text: "Silêncio até as 11h. Depois, um gancho que ativa curiosidade sem entregar nada." },
      { from: "her", text: "o que?? me conta agora", time: "11:33" },
      { from: "analysis", label: "OUTROS ERROS QUE MATAM ATRAÇÃO", text: "1. Mandar 'oi sumida'. 2. Reclamar que ela demora. 3. Elogiar foto antes de conversa. 4. Pedir desculpa sem motivo. 5. Concordar com tudo. 6. Mandar coração em excesso. 7. Responder em segundos sempre." },
    ],
  },
  {
    id: "corporal",
    title: "Linguagem corporal",
    hint: "o corpo dela já respondeu antes da boca",
    tag: "OBSERVAÇÃO",
    conv: [
      { from: "analysis", label: "SINAL 1", text: "Pés apontados pra você = interesse físico ativo. Os pés são honestos — eles apontam pra onde a pessoa quer ir." },
      { from: "analysis", label: "SINAL 2", text: "Tocar o cabelo enquanto te olha = atração emocional. Auto-toque é convite inconsciente." },
      { from: "analysis", label: "SINAL 3", text: "Espelhar sua postura = conexão profunda. Quando ela cruza a perna depois de você cruzar, o subconsciente dela já está sincronizado." },
      { from: "analysis", label: "SINAL 4", text: "Pupila dilatada em luz normal = excitação emocional. Não dá pra fingir." },
      { from: "analysis", label: "SINAL 5", text: "Ela mexe no copo, no cabelo, no anel enquanto fala com você = energia sexual sendo canalizada." },
      { from: "analysis", label: "ALERTA", text: "Braços cruzados + corpo rotacionado pro lado = você ainda não passou no teste. Mude o assunto, baixe o tom." },
      { from: "analysis", label: "TESTE DO TOQUE", text: "Encoste de leve no antebraço dela ao rir. Se ela não recua e o corpo se inclina, você tem permissão pra avançar." },
    ],
  },
  {
    id: "perde",
    title: "O que faz ela perder atração",
    hint: "os gatilhos invisíveis de desinteresse",
    tag: "EVITAR",
    conv: [
      { from: "analysis", label: "GATILHO 1", text: "Pedir desculpa por coisas que você não fez. Sinaliza insegurança crônica." },
      { from: "analysis", label: "GATILHO 2", text: "Concordar com tudo que ela diz. Mulher não respeita espelho — respeita opinião." },
      { from: "analysis", label: "GATILHO 3", text: "Responder rápido demais, sempre. Mostra que sua vida gira em torno dela." },
      { from: "analysis", label: "GATILHO 4", text: "Reclamar da vida em mensagens. Você vira peso emocional, não escape." },
      { from: "analysis", label: "GATILHO 5", text: "Falar de outras mulheres pra dar ciúme. Estratégia óbvia = derrota silenciosa." },
      { from: "analysis", label: "GATILHO 6", text: "Insistir após o 'não'. Mata atração por anos." },
      { from: "analysis", label: "GATILHO 7", text: "Elogiar a beleza dela mais do que o caráter. Ela já sabe que é bonita — quer ser vista." },
      { from: "analysis", label: "REGRA FINAL", text: "Atração se constrói pelo que você NÃO faz, não pelo que você faz." },
    ],
  },
  {
    id: "curiosidade",
    title: "Mensagens que aumentam curiosidade",
    hint: "frases que fazem o celular dela vibrar na cabeça",
    tag: "GATILHO",
    conv: [
      { from: "you", text: "lembrei de você agora. mas não vou te dizer o porquê.", time: "20:30" },
      { from: "analysis", label: "POR QUE FUNCIONA", text: "Cria loop aberto no cérebro dela. Ela vai voltar nessa mensagem o dia inteiro." },
      { from: "you", text: "tem uma coisa em você que eu ainda não entendi.", time: "20:31" },
      { from: "analysis", label: "POR QUE FUNCIONA", text: "Ela quer descobrir o que é. Curiosidade vence beleza." },
      { from: "you", text: "tava te julgando agora. cheguei numa conclusão interessante.", time: "20:33" },
      { from: "analysis", label: "POR QUE FUNCIONA", text: "A palavra 'julgando' provoca defesa. A palavra 'interessante' provoca curiosidade. Combinação explosiva." },
      { from: "you", text: "se você soubesse o que eu pensei hoje, ia rir.", time: "20:35" },
      { from: "analysis", label: "POR QUE FUNCIONA", text: "Convida ela a imaginar. A imaginação dela trabalha 24h a teu favor." },
      { from: "analysis", label: "FÓRMULA UNIVERSAL", text: "Insinuação + recuo = obsessão. Diga 80%, esconda 20%. O cérebro dela completa o resto e atribui o desejo a você." },
    ],
  },
];

function ChatPrivado() {
  const [screen, setScreen] = useState<"home" | "menu" | "chat" | "final" | "live">("home");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const active = useMemo(() => CATEGORIES.find((c) => c.id === activeId) ?? null, [activeId]);

  return (
    <div className="min-h-screen bg-[#050507] text-white font-body antialiased overflow-x-hidden">
      <div className="mx-auto max-w-[480px] min-h-screen relative">
        {screen === "home" && <HomeScreen onEnter={() => setScreen("menu")} />}
        {screen === "menu" && (
          <MenuScreen
            completed={completed}
            onPick={(id) => { setActiveId(id); setScreen("chat"); }}
            onFinal={() => setScreen("final")}
            onLive={() => setScreen("live")}
          />
        )}
        {screen === "chat" && active && (
          <ChatScreen
            category={active}
            onBack={() => {
              setCompleted((s) => new Set(s).add(active.id));
              setScreen("menu");
            }}
          />
        )}
        {screen === "live" && <LiveChatScreen onBack={() => setScreen("menu")} />}
        {screen === "final" && <FinalScreen onBack={() => setScreen("menu")} />}
      </div>
    </div>
  );
}

/* ---------------- HOME ---------------- */

function useLiveClock() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  );
  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    }, 30_000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function HomeScreen({ onEnter }: { onEnter: () => void }) {
  const clock = useLiveClock();
  const [notif, setNotif] = useState<string | null>(null);
  const notifs = [
    "🔒 Acesso vitalício liberado",
    "💬 9 análises disponíveis",
    "🧠 Padrões psicológicos prontos",
    "⚡ Material atualizado",
  ];
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setNotif(notifs[i % notifs.length]);
      i++;
      setTimeout(() => setNotif(null), 3200);
    }, 4200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroWoman} alt="" className="w-full h-full object-cover scale-110 blur-md opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[oklch(0.58_0.27_25/0.18)] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[320px] rounded-full bg-[oklch(0.62_0.22_255/0.15)] blur-3xl" />
      </div>

      <div className="relative w-full pt-6 px-5 flex items-center justify-between text-[11px] tracking-[0.25em] text-white/50">
        <span>{clock}</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blood animate-pulse" /> ACESSO LIBERADO
        </span>
      </div>

      {notif && (
        <div className="relative mx-5 mt-3 px-4 py-3 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15 text-sm animate-rise w-[calc(100%-2.5rem)]">
          <div className="text-[10px] tracking-[0.2em] text-white/50 mb-0.5">PRIVATE · agora</div>
          <div className="text-white/95">{notif}</div>
        </div>
      )}

      <div className="relative px-6 text-center animate-rise">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-[10px] tracking-[0.3em] text-white/70 mb-6">
          <span className="w-1 h-1 rounded-full bg-blood" /> ACESSO VITALÍCIO · v3.2
        </div>
        <h1 className="font-display text-[44px] leading-[0.95] tracking-tight">
          CHAT<br />
          <span className="text-blood text-glow-red">PRIVADO</span><br />
          FEMININO
        </h1>
        <p className="mt-5 text-white/65 text-base italic">
          "o que elas realmente querem dizer."
        </p>
      </div>

      <div className="relative w-full px-6 pb-10 space-y-3">
        <button
          onClick={onEnter}
          className="group w-full relative overflow-hidden rounded-2xl py-5 bg-blood text-white font-display text-lg tracking-[0.15em] animate-pulse-red active:scale-[0.98] transition-transform"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            ▶ ENTRAR NO CHAT
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>
        <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.25em] text-white/40">
          <span className="w-1 h-1 rounded-full bg-white/40" />
          CRIPTOGRAFADO · ACESSO COMPLETO
          <span className="w-1 h-1 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- MENU ---------------- */

function MenuScreen({ completed, onPick, onFinal, onLive }: { completed: Set<string>; onPick: (id: string) => void; onFinal: () => void; onLive: () => void }) {
  const progress = Math.round((completed.size / CATEGORIES.length) * 100);
  return (
    <section className="relative min-h-screen pb-32">
      <Header title="análises" subtitle={`9 categorias · ${completed.size}/9 lidas`} />

      <div className="px-5 mt-4">
        <button
          onClick={onLive}
          className="w-full text-left group relative overflow-hidden rounded-2xl border border-blood/40 bg-gradient-to-br from-blood/25 via-blood/10 to-transparent p-4 active:scale-[0.99] transition-all animate-pulse-red"
        >
          <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blood/30 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blood to-[oklch(0.45_0.25_15)] border border-blood/60 flex items-center justify-center text-xl">
              💋
            </div>
            <div className="flex-1">
              <div className="text-[9px] tracking-[0.3em] text-blood mb-0.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" /> AO VIVO · BIA, 26
              </div>
              <div className="font-display text-lg leading-tight">Chat com mulher real</div>
              <div className="text-white/55 text-xs mt-0.5">treine sua conversa. ela responde.</div>
            </div>
            <div className="shrink-0 text-blood">→</div>
          </div>
        </button>
      </div>


      <div className="px-5 mt-4">
        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blood to-[oklch(0.7_0.2_15)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-3">
          {CATEGORIES.map((c, i) => {
            const done = completed.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => onPick(c.id)}
                className="w-full text-left group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 active:scale-[0.99] transition-all hover:border-blood/40"
                style={{ animation: `rise 0.5s ease-out ${i * 0.04}s both` }}
              >
                <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-blood/10 blur-2xl group-hover:bg-blood/25 transition-colors" />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-[9px] tracking-[0.25em] text-blood/80 mb-1.5 flex items-center gap-2">
                      {c.tag}
                      {done && <span className="text-neon">· LIDA</span>}
                    </div>
                    <div className="font-display text-xl leading-tight">{c.title}</div>
                    <div className="text-white/50 text-xs mt-1">{c.hint}</div>
                  </div>
                  <div className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                    done
                      ? "bg-neon/15 border-neon/40 text-neon"
                      : "border-white/15 bg-white/5 text-white/70 group-hover:bg-blood group-hover:border-blood group-hover:text-white"
                  }`}>
                    {done ? "✓" : "→"}
                  </div>
                </div>
              </button>
            );
          })}

          <button
            onClick={onFinal}
            className="w-full mt-6 rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.05] to-transparent py-5 font-display tracking-[0.15em] text-white/80 hover:border-blood/40 transition-colors"
          >
            ENCERRAMENTO
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CHAT ---------------- */

function ChatScreen({ category, onBack }: { category: Category; onBack: () => void }) {
  const [visible, setVisible] = useState<number>(0);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const done = visible >= category.conv.length;

  useEffect(() => {
    setVisible(0);
    let cancelled = false;
    let i = 0;
    const next = () => {
      if (cancelled || i >= category.conv.length) return;
      const line = category.conv[i];
      const delay = line.from === "analysis" ? 800 : 600;
      if (line.from === "her" || line.from === "you") setTyping(true);
      setTimeout(() => {
        if (cancelled) return;
        setTyping(false);
        setVisible((v) => v + 1);
        i++;
        setTimeout(next, 350);
      }, delay);
    };
    const t = setTimeout(next, 350);
    return () => { cancelled = true; clearTimeout(t); };
  }, [category]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [visible, typing]);

  const skipAll = () => setVisible(category.conv.length);

  return (
    <section className="relative min-h-screen flex flex-col">
      <div className="sticky top-0 z-20 bg-[#050507]/85 backdrop-blur-xl border-b border-white/8">
        <div className="px-4 pt-6 pb-3 flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
            ←
          </button>
          <div className="flex-1">
            <div className="text-[10px] tracking-[0.25em] text-blood/80">{category.tag}</div>
            <div className="font-display text-lg leading-tight">{category.title}</div>
          </div>
          {!done ? (
            <button onClick={skipAll} className="text-[10px] tracking-[0.2em] text-white/50 px-3 py-1.5 rounded-full border border-white/15">
              VER TUDO
            </button>
          ) : (
            <div className="w-9 h-9 rounded-full bg-neon/15 border border-neon/40 flex items-center justify-center text-xs text-neon">
              ✓
            </div>
          )}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3 pb-40">
        {category.conv.slice(0, visible).map((line, i) => (
          <Bubble key={i} line={line} />
        ))}
        {typing && <TypingBubble />}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-4 pb-5 pt-3 bg-gradient-to-t from-[#050507] via-[#050507]/95 to-transparent">
        <button
          onClick={onBack}
          className="w-full rounded-2xl bg-white/10 border border-white/15 text-white font-display tracking-[0.15em] py-4 active:scale-[0.98] hover:bg-white/15 transition-colors"
        >
          {done ? "✓ MARCAR COMO LIDA · VOLTAR" : "← VOLTAR PRO MENU"}
        </button>
        <div className="text-center text-[10px] tracking-[0.25em] text-white/40 mt-2">
          {Math.min(visible, category.conv.length)}/{category.conv.length} mensagens
        </div>
      </div>
    </section>
  );
}

function Bubble({ line }: { line: ConvLine }) {
  if (line.from === "her") {
    return (
      <div className="flex justify-start animate-rise">
        <div className="max-w-[78%]">
          <div className="text-[10px] text-white/40 mb-1 ml-2">ela</div>
          <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/8 border border-white/8 text-[15px] leading-snug">
            {line.text}
          </div>
          {line.time && <div className="text-[10px] text-white/30 mt-1 ml-2">{line.time}</div>}
        </div>
      </div>
    );
  }
  if (line.from === "you") {
    return (
      <div className="flex justify-end animate-rise">
        <div className="max-w-[78%]">
          <div className={`text-[10px] mb-1 mr-2 text-right ${line.wrong ? "text-blood/80" : "text-white/40"}`}>
            {line.wrong ? "você (errado)" : "você"}
          </div>
          <div className={`px-4 py-3 rounded-2xl rounded-br-md text-[15px] leading-snug border ${
            line.wrong
              ? "bg-blood/15 border-blood/30 text-white/90"
              : "bg-gradient-to-br from-[oklch(0.62_0.22_255/0.35)] to-[oklch(0.55_0.25_260/0.25)] border-white/15"
          }`}>
            {line.text}
          </div>
          {line.time && <div className="text-[10px] text-white/30 mt-1 mr-2 text-right">{line.time}</div>}
        </div>
      </div>
    );
  }
  const color =
    line.label.includes("ERRO") || line.label.includes("ALERTA") || line.label.includes("EVITAR") || line.label.includes("GATILHO")
      ? "blood"
      : line.label.includes("FUNCIONA") || line.label.includes("SINAL") || line.label.includes("RESULTADO") || line.label.includes("CONFISSÃO")
        ? "neon"
        : "neutral";
  const styles =
    color === "blood"
      ? "from-blood/15 to-transparent border-blood/30"
      : color === "neon"
        ? "from-[oklch(0.62_0.22_255/0.18)] to-transparent border-[oklch(0.62_0.22_255/0.4)]"
        : "from-white/8 to-transparent border-white/15";
  const tagColor =
    color === "blood" ? "text-blood" : color === "neon" ? "text-neon" : "text-white/70";

  return (
    <div className="flex justify-center animate-rise">
      <div className={`w-full max-w-full rounded-2xl border bg-gradient-to-br ${styles} p-4`}>
        <div className={`text-[9px] tracking-[0.3em] mb-1.5 ${tagColor}`}>{line.label}</div>
        <div className="text-[14px] leading-snug text-white/90">{line.text}</div>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start animate-rise">
      <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/8 border border-white/8 flex gap-1">
        <Dot /><Dot delay={0.15} /><Dot delay={0.3} />
      </div>
    </div>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

/* ---------------- FINAL ---------------- */

function FinalScreen({ onBack }: { onBack: () => void }) {
  return (
    <section className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 overflow-hidden">
        <img src={heroWoman} alt="" className="w-full h-full object-cover blur-xl opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-blood/20 blur-3xl" />
      </div>

      <div className="relative pt-6 px-5 flex items-center">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80">←</button>
        <div className="ml-3 text-[10px] tracking-[0.3em] text-white/50">ENCERRAMENTO</div>
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center animate-rise">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blood/40 bg-blood/10 text-[10px] tracking-[0.3em] text-blood mb-8">
            <span className="w-1 h-1 rounded-full bg-blood animate-pulse" /> ÚLTIMA MENSAGEM
          </div>

          <h2 className="font-display text-[36px] leading-[1] tracking-tight">
            Homens comuns<br />
            <span className="text-white/40">tentam impressionar.</span>
          </h2>
          <div className="my-6 h-px w-16 mx-auto bg-blood/60" />
          <h2 className="font-display text-[36px] leading-[1] tracking-tight">
            Homens <span className="text-blood text-glow-red">memoráveis</span><br />
            entendem comportamento.
          </h2>

          <p className="mt-10 text-white/65 text-sm leading-relaxed max-w-xs mx-auto">
            Você acabou de ver o que 99% dos homens nunca vão entender. Releia. Aplique. Observe.
          </p>
          <p className="mt-4 text-white/40 text-xs italic max-w-xs mx-auto">
            O acesso é vitalício. Volte sempre que precisar relembrar um padrão.
          </p>
        </div>

        <div className="mt-12 max-w-sm mx-auto w-full">
          <button
            onClick={onBack}
            className="group block w-full text-center rounded-2xl py-5 bg-blood font-display text-lg tracking-[0.15em] animate-pulse-red active:scale-[0.98] transition-transform relative overflow-hidden"
          >
            <span className="relative z-10">← REVISAR ANÁLISES</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] tracking-[0.25em] text-white/40">
            <span>🔒 ACESSO VITALÍCIO</span>
            <span>·</span>
            <span>SOMENTE LEITURA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- shared ---------------- */

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="sticky top-0 z-20 bg-[#050507]/85 backdrop-blur-xl border-b border-white/8">
      <div className="px-5 pt-6 pb-4 flex items-end justify-between">
        <div>
          <div className="text-[10px] tracking-[0.3em] text-white/50">CHAT PRIVADO FEMININO</div>
          <h2 className="font-display text-3xl mt-1 capitalize">{title}</h2>
          <div className="text-white/45 text-xs mt-0.5">{subtitle}</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blood/40 to-blood/10 border border-blood/30 flex items-center justify-center">
          🔒
        </div>
      </div>
    </div>
  );
}

/* ---------------- LIVE AI CHAT ---------------- */

function LiveChatScreen({ onBack }: { onBack: () => void }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat-live" }),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || status === "submitted" || status === "streaming") return;
    sendMessage({ text });
    setInput("");
  };

  const showIntro = messages.length === 0;

  return (
    <section className="relative min-h-screen flex flex-col bg-[#050507]">
      <div className="sticky top-0 z-20 bg-[#050507]/90 backdrop-blur-xl border-b border-white/8">
        <div className="px-4 pt-6 pb-3 flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
            ←
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-blood/50 shadow-[0_0_12px_oklch(0.58_0.27_25/0.4)]">
            <img src={biaProfile} alt="Bia" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="font-display text-base leading-tight">Bia</div>
            <div className="text-[10px] tracking-[0.2em] text-neon flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" /> online agora
            </div>
          </div>
          <div className="text-[9px] tracking-[0.25em] text-white/40 px-2 py-1 rounded-full border border-white/10">
            AO VIVO
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3 pb-32">
        {showIntro && (
          <div className="text-center py-10 animate-rise">
            <div className="text-[10px] tracking-[0.3em] text-white/40 mb-2">CHAT INICIADO</div>
            <p className="text-white/60 text-sm px-6">
              Ela tá online. Manda a primeira mensagem.<br />
              <span className="text-white/35 text-xs italic">Treine a conversa que você teria na vida real.</span>
            </p>
          </div>
        )}

        {messages.map((m) => {
          const text = m.parts
            .map((p) => (p.type === "text" ? p.text : ""))
            .join("");
          if (!text) return null;
          if (m.role === "user") {
            return (
              <div key={m.id} className="flex justify-end animate-rise">
                <div className="max-w-[78%]">
                  <div className="text-[10px] mb-1 mr-2 text-right text-white/40">você</div>
                  <div className="px-4 py-3 rounded-2xl rounded-br-md text-[15px] leading-snug border bg-gradient-to-br from-[oklch(0.62_0.22_255/0.35)] to-[oklch(0.55_0.25_260/0.25)] border-white/15">
                    {text}
                  </div>
                </div>
              </div>
            );
          }

          // Detect media markers from Bia
          const photoMatch = text.match(/\[PHOTO\]\s*(.*)/i);
          const videoMatch = text.match(/\[VIDEO\]\s*(.*)/i);

          if (photoMatch) {
            const caption = photoMatch[1]?.trim() || "só pra você 😏";
            // Stable photo pick based on message id
            const idx = Math.abs(hashStr(m.id)) % BIA_PHOTOS.length;
            return (
              <div key={m.id} className="flex justify-start animate-rise">
                <div className="max-w-[78%]">
                  <div className="text-[10px] text-white/40 mb-1 ml-2">bia</div>
                  <div className="rounded-2xl rounded-bl-md overflow-hidden border border-white/10 bg-white/5">
                    <img
                      src={BIA_PHOTOS[idx]}
                      alt=""
                      className="w-full h-auto object-cover max-h-[420px]"
                      loading="lazy"
                    />
                    {caption && (
                      <div className="px-3 py-2 text-[14px] leading-snug text-white/90">
                        {caption}
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-white/30 mt-1 ml-2">📷 foto</div>
                </div>
              </div>
            );
          }

          if (videoMatch) {
            const caption = videoMatch[1]?.trim() || "olha o que separei pra você 😈";
            return (
              <div key={m.id} className="flex justify-start animate-rise">
                <div className="max-w-[78%]">
                  <div className="text-[10px] text-white/40 mb-1 ml-2">bia</div>
                  <div className="rounded-2xl rounded-bl-md overflow-hidden border border-white/10 bg-black">
                    <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-blood/30 to-black flex items-center justify-center">
                      <img src={biaProfile} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 blur-md" />
                      <div className="relative z-10 w-16 h-16 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center text-2xl">
                        ▶
                      </div>
                      <div className="absolute bottom-2 right-2 text-[10px] text-white/70 bg-black/60 px-2 py-0.5 rounded-full">0:47</div>
                    </div>
                    {caption && (
                      <div className="px-3 py-2 text-[14px] leading-snug text-white/90">
                        {caption}
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-white/30 mt-1 ml-2">🎥 vídeo · toque pra assistir</div>
                </div>
              </div>
            );
          }

          return (
            <div key={m.id} className="flex justify-start animate-rise">
              <div className="max-w-[78%]">
                <div className="text-[10px] text-white/40 mb-1 ml-2">bia</div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/8 border border-white/8 text-[15px] leading-snug whitespace-pre-wrap">
                  {text}
                </div>
              </div>
            </div>
          );
        })}

        {status === "submitted" && (
          <div className="flex justify-start animate-rise">
            <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/8 border border-white/8 flex gap-1">
              <Dot /><Dot delay={0.15} /><Dot delay={0.3} />
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-blood text-xs px-4 py-2">
            ela ficou sem sinal. tenta de novo.
          </div>
        )}
      </div>

      <form
        onSubmit={submit}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-3 pb-4 pt-3 bg-gradient-to-t from-[#050507] via-[#050507]/95 to-transparent"
      >
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-2.5">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="manda uma mensagem pra ela…"
            className="flex-1 bg-transparent outline-none text-[15px] text-white placeholder:text-white/35"
            disabled={status === "submitted" || status === "streaming"}
          />
          <button
            type="submit"
            disabled={!input.trim() || status === "submitted" || status === "streaming"}
            className="shrink-0 w-9 h-9 rounded-full bg-blood text-white flex items-center justify-center disabled:opacity-30 disabled:bg-white/15 active:scale-95 transition-all"
          >
            ↑
          </button>
        </div>
        <div className="text-center text-[10px] tracking-[0.25em] text-white/35 mt-2">
          conversa privada · respostas reais
        </div>
      </form>
    </section>
  );
}

