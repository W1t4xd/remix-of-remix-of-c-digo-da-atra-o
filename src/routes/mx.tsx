import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroWoman from "@/assets/hero-woman.jpg";
import proof1 from "@/assets/proof-1.jpg";
import proof2 from "@/assets/proof-2.jpg";
import proof3 from "@/assets/proof-3.jpg";
import print1 from "@/assets/print-es-1.jpg";
import print2 from "@/assets/print-es-2.jpg";
import print3 from "@/assets/print-es-3.jpg";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

export const Route = createFileRoute("/mx")({
  component: IndexMX,
  head: () => ({
    meta: [
      { title: "Aprende Lo Que A Ellas Les Gusta — Presencia Masculina" },
      { name: "description", content: "Descubre lo que realmente despierta atracción femenina. El método que separa a los hombres olvidados de los hombres memorables." },
    ],
  }),
});

const PRICE = "9";
const PRICE_OLD = "49";
const CURRENCY_SYMBOL = "$";
const CURRENCY_CODE = "USD";
const CHECKOUT_URL = "https://pay.kiwify.com/XvSkeBL";
const MX_PIXEL_ID = "1583133309352839";

const faqs = [
  { q: "¿Para quién es este método?", a: "Para hombres cansados de ser ignorados que quieren despertar atracción real — sin importar la edad, la apariencia ni el pasado." },
  { q: "¿Funciona si soy tímido?", a: "Sí. Fue diseñado justamente para hombres que no nacieron 'naturalmente carismáticos'. La presencia se construye." },
  { q: "¿En cuánto tiempo veo resultados?", a: "La mayoría de los hombres nota un cambio en la forma en que las mujeres reaccionan en menos de 14 días aplicando el método." },
  { q: "¿Es un curso largo y cansado?", a: "No. Directo, práctico y cinematográfico. Lo ves desde el celular y lo aplicas el mismo día." },
  { q: "¿Y si no funciona para mí?", a: "Tienes 7 días de garantía incondicional. ¿No te gustó? Te devolvemos el 100% del dinero. Sin preguntas." },
  { q: "¿El acceso es de por vida?", a: `Sí. Pago único de ${CURRENCY_SYMBOL}${PRICE} ${CURRENCY_CODE}. Sin mensualidad, sin renovación, sin letra chica.` },
];

function useCountdown(minutes: number) {
  const [s, setS] = useState(minutes * 60);
  useEffect(() => {
    const t = setInterval(() => setS((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  return {
    h: String(Math.floor(s / 3600)).padStart(2, "0"),
    m: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
    s: String(s % 60).padStart(2, "0"),
  };
}

function useMxPixel() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;
    window.fbq("init", MX_PIXEL_ID);
    window.fbq("trackSingle", MX_PIXEL_ID, "PageView");
  }, []);
}

function trackCheckout() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackSingle", MX_PIXEL_ID, "InitiateCheckout", { value: Number(PRICE), currency: CURRENCY_CODE, content_name: "Aprende Lo Que A Ellas Les Gusta MX" });
  }
}

const pains = [
  "¿Pierde el interés rápido?",
  "¿Pareces demasiado buen chico?",
  "¿Las conversaciones mueren de la nada?",
  "¿Tarda mucho en responderte?",
  "¿Otros hombres le llaman más la atención?",
];

const learn = [
  { n: "01", t: "Presencia Masculina", d: "La energía que hace que cualquier lugar gire en torno a ti." },
  { n: "02", t: "Tensión Emocional", d: "El ingrediente invisible que toda mujer siente — y que ningún hombre común domina." },
  { n: "03", t: "Curiosidad", d: "Comportamientos que la hacen pensar en ti cuando no estás." },
  { n: "04", t: "Psicología Femenina", d: "Lo que ella dice vs. lo que realmente quiere." },
  { n: "05", t: "Errores Que Matan La Atracción", d: "Las actitudes que destruyen cualquier oportunidad en segundos." },
  { n: "06", t: "Ser Memorable", d: "Cómo dejar una huella que ella no puede borrar." },
];

const beforeAfter = [
  { before: "Manda mensaje y se queda mirando el celular", after: "Ella escribe primero: '¿qué haces? te extrañé hoy 🔥'" },
  { before: "La conversación muere después de 3 mensajes", after: "Ella manda audio de 2 min diciendo cómo se siente contigo" },
  { before: "Es el chico 'lindo' que nadie desea", after: "Es el hombre con el que ella sueña despierta en el trabajo" },
  { before: "Intenta complacer y pierde valor", after: "Ella le ruega: 'ven a mi casa, mis papás no están'" },
  { before: "Siente celos e inseguridad", after: "Ella le manda fotos sin que él las pida" },
  { before: "Se conforma con un 'hola' frío", after: "Recibe: 'no puedo dejar de pensar en la otra noche'" },
];

function IndexMX() {
  useMxPixel();
  const { h, m, s } = useCountdown(15);
  return (
    <main className="relative bg-[#050505] text-foreground overflow-x-hidden">
      {/* Countdown urgency */}
      <div className="sticky top-0 z-50 bg-blood text-white font-display tracking-widest py-2.5 px-4 flex items-center justify-center gap-3 text-xs sm:text-sm shadow-lg shadow-blood/40">
        <span className="animate-flicker">●</span>
        <span className="hidden sm:inline">LA OFERTA EXPIRA EN</span>
        <span className="sm:hidden">EXPIRA EN</span>
        <span className="font-mono text-base sm:text-lg bg-black/40 px-2 py-0.5 tabular-nums">{h}:{m}:{s}</span>
      </div>
      {/* Top urgency bar */}
      <div className="bg-blood text-white text-xs font-display tracking-[0.3em] py-2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="px-8">ACCESO LIBERADO HOY • {CURRENCY_SYMBOL}{PRICE} {CURRENCY_CODE} • OFERTA RELÁMPAGO •</span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-[100svh] grain overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroWoman} alt="Ella te está mirando" className="w-full h-full object-cover object-center opacity-80" width={1280} height={1600} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.58_0.27_25/0.25),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,oklch(0.62_0.22_255/0.2),transparent_50%)]" />
        </div>

        <div className="relative z-10 flex flex-col min-h-[100svh] px-5 sm:px-10 pt-12 pb-10">
          <div className="flex items-center justify-between text-xs font-display tracking-[0.25em] text-white/70">
            <span>ALQELG<span className="text-blood">.</span></span>
            <span className="text-blood animate-flicker">●  EN VIVO</span>
          </div>

          <div className="flex-1 flex flex-col justify-end max-w-5xl mx-auto w-full">
            <div className="border-l-2 border-blood pl-4 mb-6 animate-rise">
              <span className="text-blood font-display tracking-[0.3em] text-xs sm:text-sm">PARA HOMBRES CANSADOS DE SER UNA OPCIÓN</span>
            </div>

            <h1 className="font-display text-[12vw] sm:text-[8.5vw] md:text-[7.5vw] leading-[0.85] uppercase animate-rise" style={{ animationDelay: "0.1s" }}>
              Aprende<br/>
              <span className="text-blood text-glow-red">Lo Que A Ellas</span><br/>
              Les Gusta<span className="text-blood">.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed animate-rise" style={{ animationDelay: "0.25s" }}>
              La mayoría de los hombres es <span className="text-white font-bold">olvidada</span> porque nunca aprende lo que <span className="text-blood font-bold">realmente despierta atracción femenina</span>.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 animate-rise" style={{ animationDelay: "0.4s" }}>
              <a href={CHECKOUT_URL} onClick={trackCheckout} className="group relative bg-blood text-white font-display text-lg sm:text-xl tracking-wider px-8 py-5 text-center animate-pulse-red hover:scale-[1.02] transition-transform">
                QUIERO QUE ELLAS ME NOTEN →
              </a>
              <div className="flex items-baseline gap-3">
                <span className="text-white/40 line-through text-sm">{CURRENCY_SYMBOL}{PRICE_OLD}</span>
                <span className="font-display text-4xl text-white">{CURRENCY_SYMBOL}<span className="text-blood">{PRICE}</span></span>
                <span className="text-white/40 text-xs">{CURRENCY_CODE}</span>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4 text-xs text-white/50 animate-rise" style={{ animationDelay: "0.55s" }}>
              <div className="flex -space-x-2">
                {[proof1, proof2, proof3].map((p, i) => (
                  <img key={i} src={p} alt="" className="w-8 h-8 rounded-full object-cover border border-blood/60" loading="lazy" />
                ))}
              </div>
              <span className="font-display tracking-widest">+ 12,473 HOMBRES TRANSFORMADOS</span>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.58_0.27_25/0.35),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-blood/60 bg-blood/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-blood animate-pulse" />
            <span className="text-blood font-display tracking-[0.3em] text-xs">LEE ANTES DE CERRAR</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase leading-[0.9]">
            Toda mujer ya sabe<br/>
            <span className="text-blood text-glow-red">lo que quiere</span>.<br/>
            <span className="text-white/50">Solo falta que tú</span><br/>
            <span className="text-neon text-glow-blue">lo entiendas.</span>
          </h2>
          <p className="mt-8 text-white/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            El método activa en ti los <span className="text-white font-bold">gatillos exactos</span> que la hacen detenerse, mirarte de nuevo y <span className="text-blood font-bold">no poder olvidarte</span>.
          </p>
          <div className="mt-10">
            <a href={CHECKOUT_URL} onClick={trackCheckout} className="inline-block bg-blood text-white font-display text-lg tracking-wider px-8 py-5 animate-pulse-red hover:scale-[1.02] transition-transform">
              QUIERO ACCESO AHORA →
            </a>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 border-y border-blood/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-12 h-px bg-blood" />
            <span className="text-blood font-display tracking-[0.3em] text-xs">LA VERDAD QUE NADIE TE CONTÓ</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase leading-[0.9] mb-16">
            Si te reconoces<br/><span className="text-blood text-glow-red">aquí dentro...</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-blood/20">
            {pains.map((p, i) => (
              <div key={i} className="group bg-[#0a0a0a] p-8 sm:p-10 relative hover:bg-blood/10 transition-colors duration-500">
                <div className="font-display text-blood text-6xl opacity-30 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                <p className="mt-4 font-display text-xl sm:text-2xl uppercase leading-tight">{p}</p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-blood group-hover:w-full transition-all duration-700" />
              </div>
            ))}
            <div className="bg-blood p-8 sm:p-10 flex items-center">
              <p className="font-display text-2xl uppercase leading-tight">Entonces esto es para ti<span className="text-black">.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT QUOTE */}
      <section className="relative py-32 px-5 sm:px-10 overflow-hidden scanlines">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.58_0.27_25/0.25),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="mt-8 font-display text-4xl sm:text-6xl md:text-7xl uppercase leading-[0.95]">
            Las mujeres no se conectan<br/>con hombres <span className="text-blood text-glow-red">desesperados</span>.<br/>
            <span className="text-white/40">Se conectan con</span><br/>
            <span className="text-neon text-glow-blue">presencia.</span>
          </p>
        </div>
      </section>

      {/* BEFORE x AFTER */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 border-y border-white/5 bg-[#070707]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="mt-4 font-display text-5xl sm:text-7xl uppercase leading-[0.9]">
              Antes <span className="text-white/30">vs.</span> <span className="text-blood text-glow-red">Después</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/10">
            <div className="bg-[#0a0a0a] p-4 sm:p-6 text-center">
              <span className="font-display tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs text-white/40">HOMBRE COMÚN</span>
            </div>
            <div className="bg-[#100507] p-4 sm:p-6 text-center">
              <span className="font-display tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs text-blood">HOMBRE MEMORABLE</span>
            </div>
            {beforeAfter.map((b, i) => (
              <div key={`row-${i}`} className="contents">
                <div className="bg-[#0a0a0a] p-4 sm:p-8 flex items-start gap-2 sm:gap-4">
                  <span className="text-white/30 font-display text-lg sm:text-2xl shrink-0">✕</span>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed line-through decoration-white/20">{b.before}</p>
                </div>
                <div className="bg-[#100507] p-4 sm:p-8 flex items-start gap-2 sm:gap-4">
                  <span className="text-blood font-display text-lg sm:text-2xl shrink-0">✓</span>
                  <p className="text-white text-sm sm:text-base leading-relaxed font-semibold">{b.after}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href={CHECKOUT_URL} onClick={trackCheckout} className="inline-block bg-blood text-white font-display tracking-wider px-8 py-4 animate-pulse-red">
              QUIERO ESA TRANSFORMACIÓN →
            </a>
          </div>
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="mt-4 font-display text-5xl sm:text-7xl md:text-8xl uppercase leading-[0.9]">
              Lo que vas<br/>a <span className="text-neon text-glow-blue">aprender</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/5">
            {learn.map((l) => (
              <div key={l.n} className="bg-[#0a0a0a] p-8 sm:p-10 group hover:bg-[#0f0a14] transition-colors">
                <div className="flex items-start gap-6">
                  <span className="font-display text-5xl text-blood">{l.n}</span>
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl uppercase">{l.t}</h3>
                    <p className="mt-3 text-white/60 leading-relaxed">{l.d}</p>
                  </div>
                </div>
                <div className="mt-6 h-px w-0 bg-gradient-to-r from-blood to-neon group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVA VIVA - Prints */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 border-t border-white/5 bg-[#060606] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.58_0.27_25/0.15),transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blood font-display tracking-[0.3em] text-xs">PRUEBA VIVA</span>
            <h2 className="mt-4 font-display text-5xl sm:text-7xl uppercase leading-[0.9]">
              Mensajes reales<br/>
              que <span className="text-blood text-glow-red">ellas enviaron</span>
            </h2>
            <p className="mt-6 text-white/70 max-w-xl mx-auto">
              Después del método, <span className="text-blood font-bold">son ellas las que empiezan a buscarte</span> — escribiendo primero, proponiendo verse, pidiendo atención.
            </p>
          </div>

          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-5 sm:gap-7 animate-marquee-slow w-max">
              {[print1, print2, print3, print1, print2, print3].map((p, i) => (
                <div key={i} className="relative shrink-0 w-[240px] sm:w-[300px]">
                  <div className="absolute -inset-1 bg-gradient-to-br from-blood/40 to-neon/30 opacity-60 blur-md" />
                  <img src={p} alt={`Mensaje real ${i+1}`} className="relative w-full rounded-lg border border-white/10" loading="lazy" width={600} height={900} />
                  <div className="absolute top-3 right-3 bg-blood text-white text-[10px] font-display tracking-widest px-2 py-1 rounded">REAL</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BONUS */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blood font-display tracking-[0.3em] text-xs">+ BONOS EXCLUSIVOS</span>
            <h2 className="mt-4 font-display text-5xl sm:text-7xl uppercase">Liberados <span className="text-blood">hoy</span></h2>
            <p className="mt-5 text-white/60 max-w-xl mx-auto">
              3 materiales bonus que por sí solos valen más que el curso entero.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative bg-[#0a0a0a] border border-blood/40 p-8 glow-red">
              <span className="absolute top-5 right-5 bg-blood text-white text-xs font-display tracking-widest px-3 py-1">BONO 01</span>
              <div className="font-display text-6xl text-blood mb-5">★</div>
              <h3 className="font-display text-2xl uppercase leading-tight">Frases que despiertan curiosidad</h3>
              <p className="mt-4 text-white/60 text-sm">50 páginas con ganchos, silencios calculados y mensajes que convierten cualquier chat en obsesión.</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-white/40 line-through">{CURRENCY_SYMBOL}17</span>
                <span className="text-blood font-display text-lg">INCLUIDO</span>
              </div>
            </div>

            <div className="relative bg-[#0a0a0a] border border-neon/40 p-8 glow-blue">
              <span className="absolute top-5 right-5 bg-neon text-black text-xs font-display tracking-widest px-3 py-1">BONO 02</span>
              <div className="font-display text-6xl text-neon mb-5">◆</div>
              <h3 className="font-display text-2xl uppercase leading-tight">Lenguaje corporal dominante</h3>
              <p className="mt-4 text-white/60 text-sm">La postura, la mirada y la calma que hacen que cualquier mujer se fije en ti antes de que hables.</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-white/40 line-through">{CURRENCY_SYMBOL}19</span>
                <span className="text-neon font-display text-lg">INCLUIDO</span>
              </div>
            </div>

            <div className="relative bg-[#0a0a0a] border border-blood/40 p-8 glow-red">
              <span className="absolute top-5 right-5 bg-blood text-white text-xs font-display tracking-widest px-3 py-1">BONO 03</span>
              <div className="font-display text-6xl text-blood mb-5">✦</div>
              <h3 className="font-display text-2xl uppercase leading-tight">Atracción masculina avanzada</h3>
              <p className="mt-4 text-white/60 text-sm">La guía completa para construir presencia, misterio y valor percibido en cualquier ambiente.</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-white/40 line-through">{CURRENCY_SYMBOL}15</span>
                <span className="text-blood font-display text-lg">INCLUIDO</span>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-gradient-to-br from-blood/20 to-transparent border border-blood/40 p-6 sm:p-8 text-center">
            <p className="text-white/70 font-display tracking-widest text-xs">VALOR TOTAL DE TODO</p>
            <div className="mt-3 flex items-baseline justify-center gap-4 flex-wrap">
              <span className="font-display text-3xl sm:text-4xl text-white/40 line-through">{CURRENCY_SYMBOL}{PRICE_OLD}</span>
              <span className="font-display text-5xl sm:text-6xl text-white">→</span>
              <span className="font-display text-5xl sm:text-7xl">{CURRENCY_SYMBOL}<span className="text-blood text-glow-red">{PRICE}</span></span>
              <span className="text-white/40 text-sm">{CURRENCY_CODE}</span>
            </div>
            <p className="mt-3 text-blood font-display tracking-widest text-sm">AHORRAS {CURRENCY_SYMBOL}{Number(PRICE_OLD) - Number(PRICE)} HOY</p>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="relative py-20 px-5 sm:px-10 bg-[#070707] border-y border-blood/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="relative mx-auto md:mx-0">
              <div className="absolute inset-0 bg-blood/30 blur-2xl rounded-full" />
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-blood flex items-center justify-center bg-gradient-to-br from-[#1a0507] to-black animate-pulse-red">
                <div className="absolute inset-3 rounded-full border border-blood/50" />
                <div className="text-center">
                  <div className="font-display text-blood text-5xl sm:text-6xl">7</div>
                  <div className="font-display text-white text-xs tracking-[0.3em]">DÍAS</div>
                  <div className="mt-2 font-display text-blood text-xs tracking-[0.3em]">RIESGO CERO</div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-blood font-display tracking-[0.3em] text-xs">GARANTÍA INCONDICIONAL</span>
              <h3 className="mt-3 font-display text-4xl sm:text-5xl uppercase leading-[0.95]">
                No arriesgas <span className="text-blood text-glow-red">ni un centavo</span>.
              </h3>
              <p className="mt-5 text-white/70 leading-relaxed">
                Compra, sumérgete en el método y aplícalo durante <span className="text-white font-bold">7 días completos</span>. Si no sientes <span className="text-white font-bold">en carne propia</span> cómo las mujeres empiezan a reaccionar distinto — solo escribe un correo y te devolvemos el <span className="text-blood font-bold">100% de tu dinero</span>. Sin preguntas. Sin trámites. Sin rencores.
              </p>
              <p className="mt-4 text-white/50 text-sm italic">
                El riesgo es todo nuestro. La transformación es toda tuya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF + VIDEO */}
      <section className="relative py-24 px-5 sm:px-10 border-y border-white/5 bg-[#070707]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-neon font-display tracking-[0.3em] text-xs">HOMBRES REALES</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl uppercase">Quienes ya lo aplicaron<span className="text-blood">.</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { img: proof1, n: "Carlos, 48", q: "En dos semanas cambió por completo la forma en que ella me mira." },
              { img: proof3, n: "Marcos, 52", q: "El capítulo de tensión emocional por sí solo ya vale 10 veces el precio." },
            ].map((t, i) => (
              <figure key={i} className="bg-[#0c0c0c] border border-white/5 p-6">
                <div className="relative w-full aspect-square overflow-hidden">
                  <img src={t.img} alt={t.n} className="w-full h-full object-cover grayscale-[60%] blur-[3px] scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-3 left-3 bg-black/70 text-white/80 text-[10px] font-display tracking-widest px-2 py-1">IDENTIDAD PRESERVADA</span>
                </div>
                <blockquote className="mt-5 text-white/80 leading-relaxed">"{t.q}"</blockquote>
                <figcaption className="mt-4 font-display text-blood tracking-widest text-sm">— {t.n}</figcaption>
              </figure>
            ))}
          </div>

          {/* PHOTO TESTIMONIAL - Roberto */}
          <div className="mt-12 max-w-lg mx-auto">
            <figure className="bg-[#0c0c0c] border border-white/5 p-6">
              <div className="relative w-full aspect-square overflow-hidden">
                <img src={proof2} alt="Roberto, 49" className="w-full h-full object-cover grayscale-[60%] blur-[3px] scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-3 left-3 bg-black/70 text-white/80 text-[10px] font-display tracking-widest px-2 py-1">IDENTIDAD PRESERVADA</span>
              </div>
              <blockquote className="mt-5 text-white/80 leading-relaxed">"En tres semanas, la hija de la vecina me invitó a cenar. Pensaba que era demasiado tarde. Y después del módulo 'Mujeres Interesantes' empecé hasta a hacer videollamadas con mujeres que conocí ahí — eso cambió por completo mi confianza."</blockquote>
              <figcaption className="mt-4 font-display text-blood tracking-widest text-sm">— Roberto, 49</figcaption>
            </figure>
          </div>

          <div className="mt-12 text-center">
            <a href={CHECKOUT_URL} onClick={trackCheckout} className="inline-block bg-blood text-white font-display tracking-wider px-8 py-4 animate-pulse-red hover:scale-[1.02] transition-transform">
              QUIERO EL MISMO RESULTADO →
            </a>
            <p className="mt-3 text-white/40 text-xs font-display tracking-widest uppercase">
              acceso de por vida por menos que 3 cafés
            </p>
          </div>
        </div>
      </section>

      {/* IDENTITY ANCHOR */}
      <section className="relative py-24 px-5 sm:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.58_0.27_25/0.2),transparent_55%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-blood font-display tracking-[0.4em] text-xs">ATENCIÓN</span>
          <p className="mt-6 font-display text-3xl sm:text-5xl uppercase leading-[1.1]">
            Esto <span className="text-blood">no es</span> para cualquiera.
          </p>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Es para hombres que decidieron <span className="text-white font-bold">dejar de ser opción</span> y convertirse en <span className="text-blood font-bold">elección</span>. Si todavía quieres seguir pidiendo migajas de atención, cierra esta página.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blood font-display tracking-[0.3em] text-xs">PREGUNTAS FRECUENTES</span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl uppercase leading-[0.9]">
              Tus <span className="text-blood text-glow-red">dudas</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-[#0a0a0a] border border-white/10 hover:border-blood/40 transition-colors">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 sm:p-6">
                  <span className="font-display text-base sm:text-xl uppercase leading-tight">{f.q}</span>
                  <span className="font-display text-blood text-2xl group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="px-5 sm:px-6 pb-6 text-white/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href={CHECKOUT_URL} onClick={trackCheckout} className="inline-block bg-blood text-white font-display tracking-wider px-8 py-4 animate-pulse-red">
              DESBLOQUEAR EL MÉTODO →
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" className="relative py-32 sm:py-40 px-5 sm:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0507] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.58_0.27_25/0.35),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl uppercase leading-[0.85]">
            Deja de ser<br/><span className="text-blood text-glow-red">ignorado.</span>
          </h2>

          <p className="mt-10 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Acceso de por vida. Sin mensualidad. Sin letra chica.
            Solo lo que separa a los hombres comunes de los hombres memorables.
          </p>

          <div className="mt-12 inline-block">
            <div className="flex items-baseline justify-center gap-3 mb-6">
              <span className="text-white/40 line-through text-lg">{CURRENCY_SYMBOL}{PRICE_OLD}</span>
              <span className="font-display text-6xl sm:text-7xl">{CURRENCY_SYMBOL}<span className="text-blood">{PRICE}</span></span>
              <span className="text-white/50 text-sm">{CURRENCY_CODE}</span>
            </div>

            <a href={CHECKOUT_URL} onClick={trackCheckout} className="block bg-blood text-white font-display text-lg sm:text-2xl tracking-wider px-8 sm:px-14 py-6 sm:py-7 animate-pulse-red hover:scale-[1.02] transition-transform">
              QUIERO QUE ELLAS ME NOTEN →
            </a>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-display tracking-widest text-white/50">
              <span>✓ ACCESO INMEDIATO</span>
              <span>✓ GARANTÍA 7 DÍAS</span>
              <span>✓ 100% CONFIDENCIAL</span>
            </div>
          </div>

          <div className="mt-12 max-w-md mx-auto bg-black/60 border border-white/10 rounded-lg p-5">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-neon">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <span className="font-display tracking-[0.3em] text-xs text-white">COMPRA 100% SEGURA</span>
            </div>
            <p className="text-center text-[10px] text-white/40 font-display tracking-widest">
              PAGO PROCESADO EN AMBIENTE CIFRADO
            </p>

          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 px-5 text-center text-xs text-white/30 font-display tracking-widest">
        <p>APRENDE LO QUE A ELLAS LES GUSTA © 2026 — TODOS LOS DERECHOS RESERVADOS</p>
        <p className="mt-2 text-white/20 normal-case font-body">Este producto no garantiza resultados. Los resultados varían según la aplicación individual.</p>
      </footer>
    </main>
  );
}
