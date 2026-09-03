import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/vip")({
  head: () => ({
    meta: [
      { title: "Área VIP Privada — Acesso Exclusivo" },
      { name: "description", content: "Acesso exclusivo com novos conteúdos adicionados semanalmente. Pagamento único, acesso vitalício." },
      { property: "og:title", content: "Área VIP Privada — Acesso Exclusivo" },
      { property: "og:description", content: "Entre na área privada com atualizações semanais exclusivas." },
    ],
  }),
  component: VipPage,
});

const CHECKOUT_URL = "https://pay.cakto.com.br/3627hij_898908";

const benefits = [
  { icon: "📸", t: "10 novas fotos toda semana", d: "Conteúdo fresco liberado todos os domingos." },
  { icon: "♾️", t: "Atualizações constantes", d: "A biblioteca nunca para de crescer." },
  { icon: "🔒", t: "Área VIP exclusiva", d: "Acesso restrito apenas a membros." },
  { icon: "💎", t: "Conteúdo premium", d: "Curadoria refinada, qualidade absoluta." },
  { icon: "⚡", t: "Acesso imediato", d: "Liberação instantânea após o pagamento." },
  { icon: "📚", t: "Biblioteca crescente", d: "Acesso vitalício a todo o acervo, sempre." },
];

const reviews = [
  { n: "M.", q: "não esperava tanta atualização." },
  { n: "R.", q: "toda semana entra conteúdo novo." },
  { n: "L.", q: "vale muito mais que 29 reais." },
  { n: "D.", q: "acesso vitalício por esse preço é absurdo." },
  { n: "F.", q: "a curadoria é diferente de tudo que já vi." },
  { n: "A.", q: "renovação semanal me prendeu por completo." },
];

function VipPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden font-sans">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,20,30,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(140,15,25,0.12),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
      </div>

      {/* Sticky header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-black/70 border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="tracking-[0.35em] text-xs uppercase text-white/80">
            Área <span className="text-red-500">VIP</span>
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 hidden sm:inline">Members Only</span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 px-5 pt-10 pb-20 sm:pt-20 sm:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-red-300/90">Acesso liberado hoje</span>
          </div>

          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-serif font-light leading-[1.05] tracking-tight">
            Entre na <span className="italic text-red-500">área privada</span>
            <br className="hidden sm:block" /> com atualizações
            <br /> semanais exclusivas.
          </h1>

          <p className="mt-7 text-white/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Acesso exclusivo com novos conteúdos adicionados <span className="text-white">toda semana</span>. Sem mensalidades. Sem renovações.
          </p>

          {/* Cinematic visual */}
          <div className="relative mt-12 mx-auto max-w-md">
            <div className="absolute -inset-6 bg-gradient-to-br from-red-600/30 via-red-900/10 to-transparent blur-3xl" />
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_80px_-20px_rgba(220,38,38,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-red-950" />
              <div className="absolute inset-0 backdrop-blur-2xl" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <svg className="w-14 h-14 text-red-500/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-12V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="mt-4 text-[10px] tracking-[0.4em] uppercase text-white/40">Conteúdo Bloqueado</p>
                <p className="mt-1 text-xs text-white/30">Libere para visualizar</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <a
              href={CHECKOUT_URL}
              className="group relative inline-flex items-center justify-center px-10 py-5 w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 rounded-md" />
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-md blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-sm font-semibold tracking-[0.25em] uppercase">Liberar Acesso Agora →</span>
            </a>
            <p className="mt-4 text-[11px] tracking-[0.3em] uppercase text-white/40">
              R$29 • Pagamento único • Acesso vitalício
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative z-10 px-5 py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] tracking-[0.4em] uppercase text-red-500/80">O que você recebe</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-serif font-light">Tudo incluso. Para sempre.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div
                key={b.t}
                className="group relative p-7 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm hover:border-red-500/40 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent transition-all duration-500" />
                <div className="relative">
                  <div className="text-3xl mb-4">{b.icon}</div>
                  <h3 className="text-lg font-medium">{b.t}</h3>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section className="relative z-10 px-5 py-20 sm:py-28">
        <div className="max-w-md mx-auto">
          <div className="relative p-8 sm:p-10 rounded-2xl border border-red-500/30 bg-gradient-to-b from-zinc-950 to-black overflow-hidden">
            <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.15),transparent_60%)]" />
            <div className="relative text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase text-red-400/90">Oferta única</span>
              <div className="mt-5 flex items-baseline justify-center gap-1">
                <span className="text-lg text-white/50">R$</span>
                <span className="text-7xl font-serif font-light">29</span>
                <span className="text-lg text-white/50">,00</span>
              </div>
              <p className="text-xs tracking-[0.3em] uppercase text-white/40 mt-2">Pagamento único</p>

              <ul className="mt-8 space-y-3 text-sm text-left">
                {[
                  "Acesso vitalício",
                  "10 novas fotos liberadas toda semana",
                  "Biblioteca crescente sem mensalidade",
                  "Entrada imediata na área VIP",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">◆</span>
                    <span className="text-white/80">{i}</span>
                  </li>
                ))}
              </ul>

              <a
                href={CHECKOUT_URL}
                className="mt-8 block w-full text-center px-6 py-4 rounded-md bg-gradient-to-r from-red-700 to-red-600 text-sm font-semibold tracking-[0.25em] uppercase shadow-[0_10px_40px_-10px_rgba(220,38,38,0.7)] hover:shadow-[0_15px_60px_-10px_rgba(220,38,38,0.9)] transition-shadow"
              >
                Liberar Acesso →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="relative z-10 px-5 py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] tracking-[0.4em] uppercase text-red-500/80">Membros</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-serif font-light">O que dizem por dentro.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm"
              >
                <div className="flex gap-0.5 text-red-500 text-xs mb-3">★★★★★</div>
                <p className="text-white/80 leading-relaxed text-sm">"{r.q}"</p>
                <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-white/40">— Membro {r.n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP PREVIEW */}
      <section className="relative z-10 px-5 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.4em] uppercase text-red-500/80">Prévia</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-serif font-light">Dentro da área privada.</h2>
            <p className="mt-4 text-white/50 text-sm max-w-md mx-auto">Conteúdo bloqueado — disponível apenas para membros.</p>
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  i % 3 === 0 ? "from-zinc-800 to-red-950" :
                  i % 3 === 1 ? "from-zinc-900 to-black" :
                  "from-red-950 to-zinc-900"
                }`} />
                <div className="absolute inset-0 backdrop-blur-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-12V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="absolute bottom-2 left-2 text-[9px] tracking-[0.3em] uppercase text-white/40">VIP #{String(i + 1).padStart(2, "0")}</div>
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>

          <div className="text-center mt-10">
            <p className="text-white/60 text-sm">+ 10 novas adicionadas <span className="text-red-400">toda semana</span></p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 px-5 py-24 sm:py-36 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.18),transparent_55%)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <span className="text-[11px] tracking-[0.4em] uppercase text-red-500/80">Última chamada</span>
          <h2 className="mt-5 text-4xl sm:text-6xl font-serif font-light leading-tight">
            Garanta seu <span className="italic text-red-500">acesso</span> agora.
          </h2>
          <p className="mt-6 text-white/65 text-base sm:text-lg max-w-lg mx-auto">
            Pagamento único com atualizações semanais gratuitas. Acesso vitalício à biblioteca completa.
          </p>

          <div className="mt-12">
            <a href={CHECKOUT_URL} className="group relative inline-flex items-center justify-center px-12 py-6 w-full sm:w-auto">
              <span className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-500 to-red-700 rounded-md animate-pulse" />
              <span className="absolute inset-0 bg-red-500 rounded-md blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />
              <span className="relative text-base font-semibold tracking-[0.3em] uppercase">Quero Entrar →</span>
            </a>
            <p className="mt-5 text-[11px] tracking-[0.3em] uppercase text-white/40">
              R$29 • Sem mensalidade • Acesso imediato
            </p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-5 py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30">© Área VIP Privada — Members Only</p>
        </div>
      </footer>
    </main>
  );
}
