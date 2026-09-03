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

export const Route = createFileRoute("/chat-privado-mx")({
  head: () => ({
    meta: [
      { title: "Chat Privado Femenino — Acceso Completo" },
      { name: "description", content: "Lo que ellas realmente quieren decir. Análisis psicológicos completos de conversaciones femeninas reales." },
      { property: "og:title", content: "Chat Privado Femenino" },
      { property: "og:description", content: "Lo que ellas realmente quieren decir." },
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
    title: "Respuestas frías",
    hint: "cuando responde corto y seco",
    tag: "AVANZADO",
    conv: [
      { from: "her", text: "mmm", time: "23:41" },
      { from: "analysis", label: "ANÁLISIS FEMENINO", text: "Ella no está desinteresada — está probando si vas a correr detrás o vas a mantener postura." },
      { from: "analysis", label: "CONTEXTO", text: "Respuesta corta de una mujer casi nunca es falta de tema. Es filtro emocional: quiere ver cómo reaccionas a su ausencia." },
      { from: "you", text: "¿está todo bien? ¿te hice algo?", time: "23:43", wrong: true },
      { from: "analysis", label: "ERROR COMÚN", text: "Pedir explicación te convierte en su proyecto emocional — y la mujer no se atrae por quien necesita cuidar." },
      { from: "you", text: "¿mmm es respuesta de quien está ocupada o de quien está pensando en mí?", time: "23:58" },
      { from: "analysis", label: "RESPUESTA QUE FUNCIONA", text: "Le devuelves la prueba con ligereza. No reclamas, no te quejas — provocas curiosidad." },
      { from: "her", text: "jajaja eres travieso", time: "00:02" },
      { from: "analysis", label: "RESULTADO", text: "La energía cambió. Saliste del papel de necesitado y entraste en el papel de instigador." },
    ],
  },
  {
    id: "demora",
    title: "Cuando tarda en responder",
    hint: "el silencio que destruye a hombres comunes",
    tag: "ESENCIAL",
    conv: [
      { from: "you", text: "oye, ¿cómo te fue hoy?", time: "19:02", wrong: true },
      { from: "her", text: "hola, perdón apenas vi 😅", time: "22:47" },
      { from: "analysis", label: "ANÁLISIS FEMENINO", text: "Ella percibió disponibilidad excesiva. El 'perdón' es cortesía, no interés." },
      { from: "analysis", label: "ERROR COMÚN", text: "Responder al instante diciendo 'no te preocupes, todo bien'. Eso confirma que la estabas esperando." },
      { from: "you", text: "estaba en el mismo modo. cuéntame algo bueno que te haya pasado hoy.", time: "01:14" },
      { from: "analysis", label: "RESPUESTA QUE FUNCIONA", text: "Responder horas después, sin reclamos, y redirigir hacia algo emocional. Muestra que tu vida no se detuvo." },
      { from: "her", text: "wow, me gustó esa pregunta", time: "01:16" },
      { from: "analysis", label: "REGLA", text: "El tiempo de respuesta refleja el valor percibido. Nunca respondas más rápido de lo que ella responde — excepto si es para cerrar la conversación." },
    ],
  },
  {
    id: "sinais",
    title: "Señales ocultas de interés",
    hint: "lo que hace cuando le gustas de verdad",
    tag: "LECTURA",
    conv: [
      { from: "her", text: "jajaja eres diferente", time: "00:13" },
      { from: "analysis", label: "ANÁLISIS FEMENINO", text: "Curiosidad emocional activada. Está evaluando tu energía, no tu currículum." },
      { from: "analysis", label: "ERROR COMÚN", text: "Tratar de probar por qué eres diferente. La explicación mata el misterio." },
      { from: "you", text: "¿diferente en el buen sentido o en el peligroso?", time: "00:14" },
      { from: "analysis", label: "RESPUESTA QUE FUNCIONA", text: "Le devuelves con provocación. A la mujer le encanta la palabra 'peligroso' — activa imaginación." },
      { from: "her", text: "en los dos 👀", time: "00:15" },
      { from: "analysis", label: "OTRAS SEÑALES REALES", text: "1. Te manda audio largo sin que se lo pidas. 2. Responde con una pregunta de vuelta. 3. Usa tu nombre en medio del mensaje. 4. Te escribe antes de dormir y al despertar." },
    ],
  },
  {
    id: "tensao",
    title: "Cómo generar tensión emocional",
    hint: "lo que la hace pensar en ti todo el día",
    tag: "PSICOLÓGICO",
    conv: [
      { from: "her", text: "deja de ser así 🙄", time: "21:08" },
      { from: "analysis", label: "ANÁLISIS FEMENINO", text: "Cuando reclama con emoji, está pidiendo MÁS — no menos." },
      { from: "you", text: "¿así cómo?", time: "21:09" },
      { from: "analysis", label: "RESPUESTA QUE FUNCIONA", text: "El silencio es tensión. La explicación es huida. Devuelve la pregunta seca y deja que ella llene el vacío." },
      { from: "her", text: "así provocador, sabes que me mueves", time: "21:11" },
      { from: "analysis", label: "CONFESIÓN", text: "Ella misma admitió que la mueves. No tuviste que pedirlo." },
      { from: "you", text: "si yo parara, ¿me extrañarías?", time: "21:14" },
      { from: "analysis", label: "DETONANTE", text: "Pregunta hipotética activa el miedo a perder. La mujer decide por emoción, no por lógica." },
      { from: "her", text: "tal vez 😏", time: "21:15" },
    ],
  },
  {
    id: "prendem",
    title: "Conversaciones que la atrapan",
    hint: "el ritmo que crea dependencia emocional",
    tag: "RITMO",
    conv: [
      { from: "her", text: "tengo sueño pero no quiero dormir todavía", time: "01:22" },
      { from: "analysis", label: "ANÁLISIS FEMENINO", text: "Señal directa: está prolongando el contacto. Este es el momento de cerrar — no de continuar." },
      { from: "you", text: "entonces cierra los ojos y duerme. mañana seguimos con esto.", time: "01:23" },
      { from: "analysis", label: "RESPUESTA QUE FUNCIONA", text: "Cortas en el clímax. Loop abierto. Se va a dormir pensando en ti." },
      { from: "her", text: "wow, ahora me vas a dejar pensando", time: "01:24" },
      { from: "analysis", label: "REGLA DE ORO", text: "Toda buena conversación debe terminar antes del pico, no después. Quien cierra primero controla el ritmo." },
      { from: "analysis", label: "PATRÓN DE DEPENDENCIA", text: "Alterna 3 días intensos con 1 día de ausencia total. Su cerebro crea expectativa — y la expectativa se convierte en nostalgia." },
    ],
  },
  {
    id: "erros",
    title: "Errores masculinos silenciosos",
    hint: "lo que mata la atracción sin que te des cuenta",
    tag: "CRÍTICO",
    conv: [
      { from: "you", text: "buen día hermosa ❤️ ¿dormiste bien?", time: "07:14", wrong: true },
      { from: "analysis", label: "ANÁLISIS FEMENINO", text: "Exceso de cariño matutino sin contexto = previsibilidad. Previsibilidad = pérdida de atracción." },
      { from: "you", text: "soñé algo extraño contigo hoy.", time: "11:32" },
      { from: "analysis", label: "RESPUESTA QUE FUNCIONA", text: "Silencio hasta las 11h. Después, un gancho que activa curiosidad sin entregar nada." },
      { from: "her", text: "¿¿qué?? cuéntame ya", time: "11:33" },
      { from: "analysis", label: "OTROS ERRORES QUE MATAN ATRACCIÓN", text: "1. Mandar 'hola desaparecida'. 2. Quejarse de que tarda. 3. Elogiar la foto antes que la conversación. 4. Pedir disculpas sin motivo. 5. Estar de acuerdo con todo. 6. Mandar corazones en exceso. 7. Responder en segundos siempre." },
    ],
  },
  {
    id: "corporal",
    title: "Lenguaje corporal",
    hint: "su cuerpo ya respondió antes que su boca",
    tag: "OBSERVACIÓN",
    conv: [
      { from: "analysis", label: "SEÑAL 1", text: "Pies apuntando hacia ti = interés físico activo. Los pies son honestos — apuntan a donde la persona quiere ir." },
      { from: "analysis", label: "SEÑAL 2", text: "Tocarse el cabello mientras te mira = atracción emocional. El autotoque es una invitación inconsciente." },
      { from: "analysis", label: "SEÑAL 3", text: "Espejear tu postura = conexión profunda. Cuando ella cruza la pierna después de que tú cruzas, su subconsciente ya está sincronizado." },
      { from: "analysis", label: "SEÑAL 4", text: "Pupila dilatada en luz normal = excitación emocional. No se puede fingir." },
      { from: "analysis", label: "SEÑAL 5", text: "Juega con el vaso, con el cabello, con el anillo mientras habla contigo = energía sexual siendo canalizada." },
      { from: "analysis", label: "ALERTA", text: "Brazos cruzados + cuerpo rotado de lado = aún no pasaste la prueba. Cambia el tema, baja el tono." },
      { from: "analysis", label: "PRUEBA DEL TOQUE", text: "Toca ligeramente su antebrazo al reír. Si no retrocede y su cuerpo se inclina, tienes permiso para avanzar." },
    ],
  },
  {
    id: "perde",
    title: "Lo que la hace perder atracción",
    hint: "los detonantes invisibles del desinterés",
    tag: "EVITAR",
    conv: [
      { from: "analysis", label: "DETONANTE 1", text: "Pedir disculpas por cosas que no hiciste. Señala inseguridad crónica." },
      { from: "analysis", label: "DETONANTE 2", text: "Estar de acuerdo con todo lo que dice. La mujer no respeta espejos — respeta opiniones." },
      { from: "analysis", label: "DETONANTE 3", text: "Responder demasiado rápido, siempre. Muestra que tu vida gira en torno a ella." },
      { from: "analysis", label: "DETONANTE 4", text: "Quejarte de la vida por mensaje. Te conviertes en peso emocional, no en escape." },
      { from: "analysis", label: "DETONANTE 5", text: "Hablar de otras mujeres para darle celos. Estrategia obvia = derrota silenciosa." },
      { from: "analysis", label: "DETONANTE 6", text: "Insistir después del 'no'. Mata la atracción por años." },
      { from: "analysis", label: "DETONANTE 7", text: "Elogiar más su belleza que su carácter. Ya sabe que es bonita — quiere ser vista." },
      { from: "analysis", label: "REGLA FINAL", text: "La atracción se construye por lo que NO haces, no por lo que haces." },
    ],
  },
  {
    id: "curiosidade",
    title: "Mensajes que aumentan la curiosidad",
    hint: "frases que hacen vibrar su celular en su cabeza",
    tag: "DETONANTE",
    conv: [
      { from: "you", text: "me acordé de ti ahorita. pero no te voy a decir por qué.", time: "20:30" },
      { from: "analysis", label: "POR QUÉ FUNCIONA", text: "Crea un loop abierto en su cerebro. Va a volver a ese mensaje todo el día." },
      { from: "you", text: "hay algo en ti que todavía no entiendo.", time: "20:31" },
      { from: "analysis", label: "POR QUÉ FUNCIONA", text: "Quiere descubrir qué es. La curiosidad vence a la belleza." },
      { from: "you", text: "estaba juzgándote ahorita. llegué a una conclusión interesante.", time: "20:33" },
      { from: "analysis", label: "POR QUÉ FUNCIONA", text: "La palabra 'juzgándote' provoca defensa. La palabra 'interesante' provoca curiosidad. Combinación explosiva." },
      { from: "you", text: "si supieras lo que pensé hoy, te reirías.", time: "20:35" },
      { from: "analysis", label: "POR QUÉ FUNCIONA", text: "La invitas a imaginar. Su imaginación trabaja 24h a tu favor." },
      { from: "analysis", label: "FÓRMULA UNIVERSAL", text: "Insinuación + retirada = obsesión. Di el 80%, esconde el 20%. Su cerebro completa el resto y atribuye el deseo a ti." },
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

function useLiveClock() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })
  );
  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }));
    }, 30_000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function HomeScreen({ onEnter }: { onEnter: () => void }) {
  const clock = useLiveClock();
  const [notif, setNotif] = useState<string | null>(null);
  const notifs = [
    "🔒 Acceso vitalicio liberado",
    "💬 9 análisis disponibles",
    "🧠 Patrones psicológicos listos",
    "⚡ Material actualizado",
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
          <span className="w-1.5 h-1.5 rounded-full bg-blood animate-pulse" /> ACCESO LIBERADO
        </span>
      </div>

      {notif && (
        <div className="relative mx-5 mt-3 px-4 py-3 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15 text-sm animate-rise w-[calc(100%-2.5rem)]">
          <div className="text-[10px] tracking-[0.2em] text-white/50 mb-0.5">PRIVATE · ahora</div>
          <div className="text-white/95">{notif}</div>
        </div>
      )}

      <div className="relative px-6 text-center animate-rise">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-[10px] tracking-[0.3em] text-white/70 mb-6">
          <span className="w-1 h-1 rounded-full bg-blood" /> ACCESO VITALICIO · v3.2
        </div>
        <h1 className="font-display text-[44px] leading-[0.95] tracking-tight">
          CHAT<br />
          <span className="text-blood text-glow-red">PRIVADO</span><br />
          FEMENINO
        </h1>
        <p className="mt-5 text-white/65 text-base italic">
          "lo que ellas realmente quieren decir."
        </p>
      </div>

      <div className="relative w-full px-6 pb-10 space-y-3">
        <button
          onClick={onEnter}
          className="group w-full relative overflow-hidden rounded-2xl py-5 bg-blood text-white font-display text-lg tracking-[0.15em] animate-pulse-red active:scale-[0.98] transition-transform"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            ▶ ENTRAR AL CHAT
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>
        <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.25em] text-white/40">
          <span className="w-1 h-1 rounded-full bg-white/40" />
          ENCRIPTADO · ACCESO COMPLETO
          <span className="w-1 h-1 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}

function MenuScreen({ completed, onPick, onFinal, onLive }: { completed: Set<string>; onPick: (id: string) => void; onFinal: () => void; onLive: () => void }) {
  const progress = Math.round((completed.size / CATEGORIES.length) * 100);
  return (
    <section className="relative min-h-screen pb-32">
      <Header title="análisis" subtitle={`9 categorías · ${completed.size}/9 leídas`} />

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
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" /> EN VIVO · BÍA, 26
              </div>
              <div className="font-display text-lg leading-tight">Chat con mujer real</div>
              <div className="text-white/55 text-xs mt-0.5">entrena tu conversación. ella responde.</div>
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
                      {done && <span className="text-neon">· LEÍDA</span>}
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
            CIERRE
          </button>
        </div>
      </div>
    </section>
  );
}

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
              VER TODO
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
          {done ? "✓ MARCAR COMO LEÍDA · VOLVER" : "← VOLVER AL MENÚ"}
        </button>
        <div className="text-center text-[10px] tracking-[0.25em] text-white/40 mt-2">
          {Math.min(visible, category.conv.length)}/{category.conv.length} mensajes
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
          <div className="text-[10px] text-white/40 mb-1 ml-2">ella</div>
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
            {line.wrong ? "tú (incorrecto)" : "tú"}
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
    line.label.includes("ERROR") || line.label.includes("ALERTA") || line.label.includes("EVITAR") || line.label.includes("DETONANTE")
      ? "blood"
      : line.label.includes("FUNCIONA") || line.label.includes("SEÑAL") || line.label.includes("RESULTADO") || line.label.includes("CONFESIÓN")
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
        <div className="ml-3 text-[10px] tracking-[0.3em] text-white/50">CIERRE</div>
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center animate-rise">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blood/40 bg-blood/10 text-[10px] tracking-[0.3em] text-blood mb-8">
            <span className="w-1 h-1 rounded-full bg-blood animate-pulse" /> ÚLTIMO MENSAJE
          </div>

          <h2 className="font-display text-[36px] leading-[1] tracking-tight">
            Hombres comunes<br />
            <span className="text-white/40">intentan impresionar.</span>
          </h2>
          <div className="my-6 h-px w-16 mx-auto bg-blood/60" />
          <h2 className="font-display text-[36px] leading-[1] tracking-tight">
            Hombres <span className="text-blood text-glow-red">memorables</span><br />
            entienden el comportamiento.
          </h2>

          <p className="mt-10 text-white/65 text-sm leading-relaxed max-w-xs mx-auto">
            Acabas de ver lo que el 99% de los hombres nunca va a entender. Relee. Aplica. Observa.
          </p>
          <p className="mt-4 text-white/40 text-xs italic max-w-xs mx-auto">
            El acceso es vitalicio. Vuelve siempre que necesites recordar un patrón.
          </p>
        </div>

        <div className="mt-12 max-w-sm mx-auto w-full">
          <button
            onClick={onBack}
            className="group block w-full text-center rounded-2xl py-5 bg-blood font-display text-lg tracking-[0.15em] animate-pulse-red active:scale-[0.98] transition-transform relative overflow-hidden"
          >
            <span className="relative z-10">← REVISAR ANÁLISIS</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] tracking-[0.25em] text-white/40">
            <span>🔒 ACCESO VITALICIO</span>
            <span>·</span>
            <span>SOLO LECTURA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="sticky top-0 z-20 bg-[#050507]/85 backdrop-blur-xl border-b border-white/8">
      <div className="px-5 pt-6 pb-4 flex items-end justify-between">
        <div>
          <div className="text-[10px] tracking-[0.3em] text-white/50">CHAT PRIVADO FEMENINO</div>
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

function LiveChatScreen({ onBack }: { onBack: () => void }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat-live-mx" }),
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
            <img src={biaProfile} alt="Bía" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="font-display text-base leading-tight">Bía</div>
            <div className="text-[10px] tracking-[0.2em] text-neon flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" /> en línea ahora
            </div>
          </div>
          <div className="text-[9px] tracking-[0.25em] text-white/40 px-2 py-1 rounded-full border border-white/10">
            EN VIVO
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3 pb-32">
        {showIntro && (
          <div className="text-center py-10 animate-rise">
            <div className="text-[10px] tracking-[0.3em] text-white/40 mb-2">CHAT INICIADO</div>
            <p className="text-white/60 text-sm px-6">
              Ella está en línea. Manda el primer mensaje.<br />
              <span className="text-white/35 text-xs italic">Entrena la conversación que tendrías en la vida real.</span>
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
                  <div className="text-[10px] mb-1 mr-2 text-right text-white/40">tú</div>
                  <div className="px-4 py-3 rounded-2xl rounded-br-md text-[15px] leading-snug border bg-gradient-to-br from-[oklch(0.62_0.22_255/0.35)] to-[oklch(0.55_0.25_260/0.25)] border-white/15">
                    {text}
                  </div>
                </div>
              </div>
            );
          }

          const photoMatch = text.match(/\[PHOTO\]\s*(.*)/i);
          const videoMatch = text.match(/\[VIDEO\]\s*(.*)/i);

          if (photoMatch) {
            const caption = photoMatch[1]?.trim() || "solo para ti 😏";
            const idx = Math.abs(hashStr(m.id)) % BIA_PHOTOS.length;
            return (
              <div key={m.id} className="flex justify-start animate-rise">
                <div className="max-w-[78%]">
                  <div className="text-[10px] text-white/40 mb-1 ml-2">bía</div>
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
            const caption = videoMatch[1]?.trim() || "mira lo que separé para ti 😈";
            return (
              <div key={m.id} className="flex justify-start animate-rise">
                <div className="max-w-[78%]">
                  <div className="text-[10px] text-white/40 mb-1 ml-2">bía</div>
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
                  <div className="text-[10px] text-white/30 mt-1 ml-2">🎥 video · toca para ver</div>
                </div>
              </div>
            );
          }

          return (
            <div key={m.id} className="flex justify-start animate-rise">
              <div className="max-w-[78%]">
                <div className="text-[10px] text-white/40 mb-1 ml-2">bía</div>
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
            se quedó sin señal. inténtalo de nuevo.
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
            placeholder="mándale un mensaje…"
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
          conversación privada · respuestas reales
        </div>
      </form>
    </section>
  );
}
