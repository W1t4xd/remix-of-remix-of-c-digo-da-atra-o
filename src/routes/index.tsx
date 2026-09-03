import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroWoman from "@/assets/hero-woman.jpg";
import proof1 from "@/assets/proof-1.jpg";
import proof2 from "@/assets/proof-2.jpg";
import proof3 from "@/assets/proof-3.jpg";
import print1 from "@/assets/print-whats-1.jpg";
import print2 from "@/assets/print-whats-2.jpg";
import print3 from "@/assets/print-whats-3.jpg";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

export const Route = createFileRoute("/")({ component: Index });

const faqs = [
  { q: "Pra quem é esse método?", a: "Para homens que cansaram de ser ignorados e querem despertar atração real — independente de idade, aparência ou histórico." },
  { q: "Funciona se eu for tímido?", a: "Sim. Foi desenhado justamente para homens que não nasceram 'naturalmente carismáticos'. Presença se constrói." },
  { q: "Em quanto tempo vejo resultado?", a: "A maioria dos homens nota mudança na forma como mulheres reagem em menos de 14 dias aplicando o método." },
  { q: "É um curso longo e cansativo?", a: "Não. Direto, prático e cinematográfico. Você assiste no celular e aplica no mesmo dia." },
  { q: "E se não funcionar pra mim?", a: "Você tem 7 dias de garantia incondicional. Não gostou? Devolvemos 100% do valor. Sem perguntas." },
  { q: "O acesso é vitalício?", a: "Sim. Pagamento único de R$27. Sem mensalidade, sem renovação, sem letras miúdas." },
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

function trackCheckout() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "InitiateCheckout", { value: 27, currency: "BRL", content_name: "Aprenda O Que Elas Gostam" });
  }
}

const pains = [
  "Ela perde o interesse rápido?",
  "Você parece bonzinho demais?",
  "Conversas morrem do nada?",
  "Ela demora pra responder?",
  "Outros homens chamam mais atenção?",
];

const learn = [
  { n: "01", t: "Presença Masculina", d: "A energia que faz qualquer ambiente girar em torno de você." },
  { n: "02", t: "Tensão Emocional", d: "O ingrediente invisível que toda mulher sente — e nenhum homem comum domina." },
  { n: "03", t: "Curiosidade", d: "Comportamentos que fazem ela pensar em você quando você não está." },
  { n: "04", t: "Psicologia Feminina", d: "O que ela diz vs. o que ela realmente quer." },
  { n: "05", t: "Erros Que Matam Atração", d: "As atitudes que destroem qualquer chance em segundos." },
  { n: "06", t: "Ser Memorável", d: "Como deixar uma marca que ela não consegue apagar." },
];

const beforeAfter = [
  { before: "Manda mensagem e fica olhando o celular", after: "Ela manda primeiro e pergunta onde você sumiu" },
  { before: "Conversa morre depois de 3 mensagens", after: "Ela puxa assunto e não quer desligar" },
  { before: "É o cara 'legal' que ninguém deseja", after: "É o homem que ela não consegue esquecer" },
  { before: "Tenta agradar e perde valor", after: "Mantém postura e aumenta atração" },
  { before: "Sente ciúmes e insegurança", after: "Tem calma de quem sabe o próprio valor" },
];

function Index() {
  const { h, m, s } = useCountdown(15);
  return (
    <main className="relative bg-[#050505] text-foreground overflow-x-hidden">
      {/* Countdown urgency */}
      <div className="sticky top-0 z-50 bg-blood text-white font-display tracking-widest py-2.5 px-4 flex items-center justify-center gap-3 text-xs sm:text-sm shadow-lg shadow-blood/40">
        <span className="animate-flicker">●</span>
        <span className="hidden sm:inline">OFERTA EXPIRA EM</span>
        <span className="sm:hidden">EXPIRA EM</span>
        <span className="font-mono text-base sm:text-lg bg-black/40 px-2 py-0.5 tabular-nums">{h}:{m}:{s}</span>
      </div>
      {/* Top urgency bar */}
      <div className="bg-blood text-white text-xs font-display tracking-[0.3em] py-2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="px-8">ACESSO LIBERADO HOJE • R$27 • OFERTA RELÂMPAGO •</span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-[100svh] grain overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroWoman} alt="Ela está olhando" className="w-full h-full object-cover object-center opacity-80" width={1280} height={1600} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.58_0.27_25/0.25),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,oklch(0.62_0.22_255/0.2),transparent_50%)]" />
        </div>

        <div className="relative z-10 flex flex-col min-h-[100svh] px-5 sm:px-10 pt-12 pb-10">
          <div className="flex items-center justify-between text-xs font-display tracking-[0.25em] text-white/70">
            <span>AOQEG<span className="text-blood">.</span></span>
            <span className="text-blood animate-flicker">●  AO VIVO</span>
          </div>

          <div className="flex-1 flex flex-col justify-end max-w-5xl mx-auto w-full">
            <div className="border-l-2 border-blood pl-4 mb-6 animate-rise">
              <span className="text-blood font-display tracking-[0.3em] text-xs sm:text-sm">PARA HOMENS QUE CANSARAM DE SER OPÇÃO</span>
            </div>

            <h1 className="font-display text-[12vw] sm:text-[8.5vw] md:text-[7.5vw] leading-[0.85] uppercase animate-rise" style={{ animationDelay: "0.1s" }}>
              Aprenda<br/>
              <span className="text-blood text-glow-red">O Que Elas</span><br/>
              Gostam<span className="text-blood">.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed animate-rise" style={{ animationDelay: "0.25s" }}>
              A maioria dos homens é <span className="text-white font-bold">esquecido</span> porque nunca aprende o que <span className="text-blood font-bold">realmente desperta atração feminina</span>.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 animate-rise" style={{ animationDelay: "0.4s" }}>
              <a href="https://pay.cakto.com.br/3627hij_898908" onClick={trackCheckout} className="group relative bg-blood text-white font-display text-lg sm:text-xl tracking-wider px-8 py-5 text-center animate-pulse-red hover:scale-[1.02] transition-transform">
                QUERO QUE ELAS ME NOTEM →
              </a>
              <div className="flex items-baseline gap-3">
                <span className="text-white/40 line-through text-sm">R$147</span>
                <span className="font-display text-4xl text-white">R$<span className="text-blood">27</span></span>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4 text-xs text-white/50 animate-rise" style={{ animationDelay: "0.55s" }}>
              <div className="flex -space-x-2">
                {[proof1, proof2, proof3].map((p, i) => (
                  <img key={i} src={p} alt="" className="w-8 h-8 rounded-full object-cover border border-blood/60" loading="lazy" />
                ))}
              </div>
              <span className="font-display tracking-widest">+ 12.473 HOMENS TRANSFORMADOS</span>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO / TEASER */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.58_0.27_25/0.35),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-blood/60 bg-blood/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-blood animate-pulse" />
            <span className="text-blood font-display tracking-[0.3em] text-xs">LEIA ANTES DE FECHAR</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase leading-[0.9]">
            Toda mulher já sabe<br/>
            <span className="text-blood text-glow-red">o que ela quer</span>.<br/>
            <span className="text-white/50">Só falta você</span><br/>
            <span className="text-neon text-glow-blue">entender.</span>
          </h2>
          <p className="mt-8 text-white/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            O método destrava em você os <span className="text-white font-bold">gatilhos exatos</span> que fazem ela parar, olhar de novo e <span className="text-blood font-bold">não conseguir esquecer</span>.
          </p>
          <div className="mt-10">
            <a href="https://pay.cakto.com.br/3627hij_898908" onClick={trackCheckout} className="inline-block bg-blood text-white font-display text-lg tracking-wider px-8 py-5 animate-pulse-red hover:scale-[1.02] transition-transform">
              QUERO ACESSO AGORA →
            </a>
          </div>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 border-y border-blood/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-12 h-px bg-blood" />
            <span className="text-blood font-display tracking-[0.3em] text-xs">A VERDADE QUE NINGUÉM TE CONTOU</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase leading-[0.9] mb-16">
            Se você se reconhece<br/><span className="text-blood text-glow-red">aqui dentro...</span>
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
              <p className="font-display text-2xl uppercase leading-tight">Então isso é pra você<span className="text-black">.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT QUOTE */}
      <section className="relative py-32 px-5 sm:px-10 overflow-hidden scanlines">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.58_0.27_25/0.25),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto text-center">
          
          <p className="mt-8 font-display text-4xl sm:text-6xl md:text-7xl uppercase leading-[0.95]">
            Mulheres não se conectam<br/>com homens <span className="text-blood text-glow-red">desesperados</span>.<br/>
            <span className="text-white/40">Elas se conectam com</span><br/>
            <span className="text-neon text-glow-blue">presença.</span>
          </p>
        </div>
      </section>

      {/* BEFORE x AFTER */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 border-y border-white/5 bg-[#070707]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="mt-4 font-display text-5xl sm:text-7xl uppercase leading-[0.9]">
              Antes <span className="text-white/30">vs.</span> <span className="text-blood text-glow-red">Depois</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/10">
            <div className="bg-[#0a0a0a] p-4 sm:p-6 text-center">
              <span className="font-display tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs text-white/40">HOMEM COMUM</span>
            </div>
            <div className="bg-[#100507] p-4 sm:p-6 text-center">
              <span className="font-display tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs text-blood">HOMEM MEMORÁVEL</span>
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
            <a href="https://pay.cakto.com.br/3627hij_898908" onClick={trackCheckout} className="inline-block bg-blood text-white font-display tracking-wider px-8 py-4 animate-pulse-red">
              QUERO ESSA TRANSFORMAÇÃO →
            </a>
          </div>
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="mt-4 font-display text-5xl sm:text-7xl md:text-8xl uppercase leading-[0.9]">
              O que você<br/>vai <span className="text-neon text-glow-blue">aprender</span>
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
            <span className="text-blood font-display tracking-[0.3em] text-xs">PROVA VIVA</span>
            <h2 className="mt-4 font-display text-5xl sm:text-7xl uppercase leading-[0.9]">
              Mensagens reais<br/>
              que <span className="text-blood text-glow-red">elas mandaram</span>
            </h2>
            <p className="mt-6 text-white/70 max-w-xl mx-auto">
              Depois do método, <span className="text-blood font-bold">são elas que começam a procurar</span> — mandando mensagem primeiro, marcando encontro, pedindo atenção.
            </p>

          </div>

          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-5 sm:gap-7 animate-marquee-slow w-max">
              {[print1, print2, print3, print1, print2, print3].map((p, i) => (
                <div key={i} className="relative shrink-0 w-[240px] sm:w-[300px]">
                  <div className="absolute -inset-1 bg-gradient-to-br from-blood/40 to-neon/30 opacity-60 blur-md" />
                  <img src={p} alt={`Mensagem real ${i+1}`} className="relative w-full rounded-lg border border-white/10" loading="lazy" width={600} height={900} />
                  <div className="absolute top-3 right-3 bg-blood text-white text-[10px] font-display tracking-widest px-2 py-1 rounded">REAL</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* BONUS - 3 stacked */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blood font-display tracking-[0.3em] text-xs">+ BÔNUS EXCLUSIVOS</span>
            <h2 className="mt-4 font-display text-5xl sm:text-7xl uppercase">Liberados <span className="text-blood">hoje</span></h2>
            <p className="mt-5 text-white/60 max-w-xl mx-auto">
              3 materiais bônus que sozinhos valem mais que o curso inteiro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative bg-[#0a0a0a] border border-blood/40 p-8 glow-red">
              <span className="absolute top-5 right-5 bg-blood text-white text-xs font-display tracking-widest px-3 py-1">BÔNUS 01</span>
              <div className="font-display text-6xl text-blood mb-5">★</div>
              <h3 className="font-display text-2xl uppercase leading-tight">Frases que despertam curiosidade</h3>
              <p className="mt-4 text-white/60 text-sm">50 páginas com ganchos, silêncios calculados e mensagens que viram qualquer chat em obsessão.</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-white/40 line-through">R$47</span>
                <span className="text-blood font-display text-lg">INCLUSO</span>
              </div>
            </div>

            <div className="relative bg-[#0a0a0a] border border-neon/40 p-8 glow-blue">
              <span className="absolute top-5 right-5 bg-neon text-black text-xs font-display tracking-widest px-3 py-1">BÔNUS 02</span>
              <div className="font-display text-6xl text-neon mb-5">◆</div>
              <h3 className="font-display text-2xl uppercase leading-tight">Linguagem corporal dominante</h3>
              <p className="mt-4 text-white/60 text-sm">A postura, o olhar e a calma que faz qualquer mulher reparar em você antes mesmo de você falar.</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-white/40 line-through">R$57</span>
                <span className="text-neon font-display text-lg">INCLUSO</span>
              </div>
            </div>

            <div className="relative bg-[#0a0a0a] border border-blood/40 p-8 glow-red">
              <span className="absolute top-5 right-5 bg-blood text-white text-xs font-display tracking-widest px-3 py-1">BÔNUS 03</span>
              <div className="font-display text-6xl text-blood mb-5">✦</div>
              <h3 className="font-display text-2xl uppercase leading-tight">Atração masculina avançada</h3>
              <p className="mt-4 text-white/60 text-sm">O guia completo para construir presença, mistério e valor percebido em qualquer ambiente.</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-white/40 line-through">R$43</span>
                <span className="text-blood font-display text-lg">INCLUSO</span>
              </div>
            </div>
          </div>

          {/* Stack value */}
          <div className="mt-10 bg-gradient-to-br from-blood/20 to-transparent border border-blood/40 p-6 sm:p-8 text-center">
            <p className="text-white/70 font-display tracking-widest text-xs">VALOR TOTAL DE TUDO</p>
            <div className="mt-3 flex items-baseline justify-center gap-4 flex-wrap">
              <span className="font-display text-3xl sm:text-4xl text-white/40 line-through">R$ 147</span>
              <span className="font-display text-5xl sm:text-6xl text-white">→</span>
              <span className="font-display text-5xl sm:text-7xl">R$<span className="text-blood text-glow-red">27</span></span>
            </div>
            <p className="mt-3 text-blood font-display tracking-widest text-sm">VOCÊ ECONOMIZA R$ 120 HOJE</p>
          </div>
        </div>
      </section>

      {/* GUARANTEE SEAL */}
      <section className="relative py-20 px-5 sm:px-10 bg-[#070707] border-y border-blood/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
            {/* Seal */}
            <div className="relative mx-auto md:mx-0">
              <div className="absolute inset-0 bg-blood/30 blur-2xl rounded-full" />
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-blood flex items-center justify-center bg-gradient-to-br from-[#1a0507] to-black animate-pulse-red">
                <div className="absolute inset-3 rounded-full border border-blood/50" />
                <div className="text-center">
                  <div className="font-display text-blood text-5xl sm:text-6xl">7</div>
                  <div className="font-display text-white text-xs tracking-[0.3em]">DIAS</div>
                  <div className="mt-2 font-display text-blood text-xs tracking-[0.3em]">RISCO ZERO</div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-blood font-display tracking-[0.3em] text-xs">GARANTIA INCONDICIONAL</span>
              <h3 className="mt-3 font-display text-4xl sm:text-5xl uppercase leading-[0.95]">
                Você não arrisca <span className="text-blood text-glow-red">um centavo</span>.
              </h3>
              <p className="mt-5 text-white/70 leading-relaxed">
                Compre, mergulhe no método e aplique por <span className="text-white font-bold">7 dias inteiros</span>. Se você não sentir <span className="text-white font-bold">na pele</span> a forma como as mulheres começam a reagir diferente — basta mandar um e-mail e devolvemos <span className="text-blood font-bold">100% do seu dinheiro</span>. Sem pergunta. Sem burocracia. Sem rancor.
              </p>
              <p className="mt-4 text-white/50 text-sm italic">
                O risco é todo nosso. A transformação é toda sua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="relative py-24 px-5 sm:px-10 border-y border-white/5 bg-[#070707]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-neon font-display tracking-[0.3em] text-xs">HOMENS REAIS</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl uppercase">Quem já aplicou<span className="text-blood">.</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { img: proof1, n: "Carlos, 48", q: "Tenho 48 anos… e depois do módulo 'Onde Encontrar Mulheres Interessantes' comecei até a fazer chamadas de vídeo com mulheres que eu nunca imaginaria conversar antes. Isso mudou minha confiança completamente." },
              { img: proof3, n: "Marcos, 52", q: "O capítulo de tensão emocional sozinho já vale 10x o preço." },
            ].map((t, i) => (
              <figure key={i} className="bg-[#0c0c0c] border border-white/5 p-6">
                <div className="relative w-full aspect-square overflow-hidden">
                  <img src={t.img} alt={t.n} className="w-full h-full object-cover grayscale-[60%] blur-[3px] scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-3 left-3 bg-black/70 text-white/80 text-[10px] font-display tracking-widest px-2 py-1">IDENTIDADE PRESERVADA</span>
                </div>
                <blockquote className="mt-5 text-white/80 leading-relaxed">"{t.q}"</blockquote>
                <figcaption className="mt-4 font-display text-blood tracking-widest text-sm">— {t.n}</figcaption>
              </figure>
            ))}
          </div>

          {/* VIDEO TESTIMONIAL — ROBERTO */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-neon font-display tracking-[0.3em] text-xs">DEPOIMENTO EM VÍDEO</span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl uppercase">Roberto, 49<span className="text-blood">.</span></h3>
            </div>
            <figure className="bg-[#0c0c0c] border border-white/5 p-4 sm:p-6">
              <div className="relative w-full overflow-hidden bg-black group">
                <video
                  id="video-roberto"
                  src="/depoimento-roberto.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-auto"
                  style={{ filter: "blur(7px)" }}
                  onPlay={(e) => {
                    const overlay = (e.currentTarget.parentElement?.querySelector('[data-play-overlay]')) as HTMLElement | null;
                    if (overlay) overlay.style.display = 'none';
                  }}
                />
                <button
                  type="button"
                  data-play-overlay
                  aria-label="Reproduzir depoimento"
                  onClick={(e) => {
                    const v = document.getElementById('video-roberto') as HTMLVideoElement | null;
                    if (v) { v.play(); (e.currentTarget as HTMLElement).style.display = 'none'; }
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors z-10"
                >
                  <span className="flex items-center justify-center w-20 h-20 rounded-full bg-blood/90 shadow-[0_0_40px_oklch(0.58_0.27_25/0.6)] ring-4 ring-white/20 group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-9 h-9 ml-1 fill-white" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
                <span className="absolute top-3 left-3 bg-black/80 text-white/80 text-[10px] font-display tracking-widest px-2 py-1 z-10">IDENTIDADE PRESERVADA</span>
              </div>
              <figcaption className="mt-4 text-white/60 text-xs sm:text-sm leading-relaxed italic">
                * A voz está levemente alterada e a imagem preservada por questão de identidade.
              </figcaption>
              <div className="mt-6 text-center">
                <a href="https://pay.cakto.com.br/3627hij_898908" onClick={trackCheckout} className="inline-block bg-blood text-white font-display tracking-wider px-8 py-4 animate-pulse-red hover:scale-[1.02] transition-transform">
                  QUERO O MESMO RESULTADO →
                </a>
                <p className="mt-3 text-white/40 text-xs font-display tracking-widest uppercase">
                  acesso vitalício por menos que 3 cafés
                </p>
              </div>
            </figure>
          </div>


        </div>
      </section>

      {/* IDENTITY ANCHOR */}
      <section className="relative py-24 px-5 sm:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.58_0.27_25/0.2),transparent_55%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-blood font-display tracking-[0.4em] text-xs">ATENÇÃO</span>
          <p className="mt-6 font-display text-3xl sm:text-5xl uppercase leading-[1.1]">
            Isso <span className="text-blood">não é</span> pra qualquer um.
          </p>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            É pra homens que decidiram <span className="text-white font-bold">parar de ser opção</span> e virar <span className="text-blood font-bold">escolha</span>. Se você ainda quer continuar implorando migalhas de atenção, feche essa página.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blood font-display tracking-[0.3em] text-xs">DÚVIDAS FREQUENTES</span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl uppercase leading-[0.9]">
              Suas <span className="text-blood text-glow-red">dúvidas</span>
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
            <a href="https://pay.cakto.com.br/3627hij_898908" onClick={trackCheckout} className="inline-block bg-blood text-white font-display tracking-wider px-8 py-4 animate-pulse-red">
              DESBLOQUEAR O MÉTODO →
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
            Pare de ser<br/><span className="text-blood text-glow-red">ignorado.</span>
          </h2>

          <p className="mt-10 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Acesso vitalício. Sem mensalidade. Sem letras miúdas.
            Apenas o que separa homens comuns de homens memoráveis.
          </p>

          <div className="mt-12 inline-block">
            <div className="flex items-baseline justify-center gap-3 mb-6">
              <span className="text-white/40 line-through text-lg">R$147</span>
              <span className="font-display text-6xl sm:text-7xl">R$<span className="text-blood">27</span></span>
              <span className="text-white/50 text-sm">à vista</span>
            </div>

            <a href="https://pay.cakto.com.br/3627hij_898908" onClick={trackCheckout} className="block bg-blood text-white font-display text-lg sm:text-2xl tracking-wider px-8 sm:px-14 py-6 sm:py-7 animate-pulse-red hover:scale-[1.02] transition-transform">
              QUERO QUE ELAS ME NOTEM →
            </a>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-display tracking-widest text-white/50">
              <span>✓ ACESSO IMEDIATO</span>
              <span>✓ GARANTIA 7 DIAS</span>
              <span>✓ 100% SIGILO</span>
            </div>
          </div>

          {/* Selo Compra Segura + Bandeiras */}
          <div className="mt-12 max-w-md mx-auto bg-black/60 border border-white/10 rounded-lg p-5">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-neon">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <span className="font-display tracking-[0.3em] text-xs text-white">COMPRA 100% SEGURA</span>
            </div>
            <p className="text-center text-[10px] text-white/40 font-display tracking-widest mb-4">
              PAGAMENTO PROCESSADO PELA CAKTO • AMBIENTE CRIPTOGRAFADO
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: "VISA", bg: "bg-[#1a1f71]", fg: "text-white" },
                { label: "MASTER", bg: "bg-[#eb001b]", fg: "text-white" },
                { label: "ELO", bg: "bg-black border border-white/30", fg: "text-white" },
                { label: "AMEX", bg: "bg-[#006fcf]", fg: "text-white" },
                { label: "HIPER", bg: "bg-[#b3131b]", fg: "text-white" },
                { label: "PIX", bg: "bg-[#32bcad]", fg: "text-white" },
              ].map((c) => (
                <span key={c.label} className={`${c.bg} ${c.fg} font-display text-[10px] tracking-widest px-2.5 py-1.5 rounded`}>
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 px-5 text-center text-xs text-white/30 font-display tracking-widest">
        <p>APRENDA O QUE ELAS GOSTAM © 2026 — TODOS OS DIREITOS RESERVADOS</p>
        <p className="mt-2 text-white/20 normal-case font-body">Este produto não garante resultados. Resultados variam conforme aplicação individual.</p>
      </footer>
    </main>
  );
}
