"use client";
import Image from 'next/image';
import { useEffect, useRef } from 'react';

type ParallaxConfig = { speed?: number };

function useParallax() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax]'));

    const handle = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      items.forEach((el) => {
        const speed = Number(el.dataset.speed || 0.2);
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height * 0.5) - h * 0.5;
        const translate = -offset * speed;
        el.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0)`;
      });
    };

    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, []);
  return ref;
}

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-in ${className}`.trim()}>
      {children}
    </div>
  );
}

function ParallaxImage({ src, alt, speed = 0.25, priority = false }: { src: string; alt: string; speed?: number; priority?: boolean }) {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      <div data-parallax className="parallax absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover grayscale contrast-125"
        />
      </div>
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}

export default function HomePage() {
  const containerRef = useParallax();

  const photos = [
    {
      src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop',
      alt: 'New York crosswalk in rain'
    },
    {
      src: 'https://images.unsplash.com/photo-1447958374760-1ce70cf11ee3?q=80&w=2000&auto=format&fit=crop',
      alt: 'Tokyo alley neon reflections'
    },
    {
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop',
      alt: 'Paris street with shadows'
    },
    {
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop',
      alt: 'Istanbul ferry silhouette'
    },
    {
      src: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=2000&auto=format&fit=crop',
      alt: 'London underground platform'
    },
    {
      src: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=2000&auto=format&fit=crop',
      alt: 'Hong Kong dense buildings'
    }
  ];

  return (
    <main ref={containerRef} className="min-h-dvh">
      {/* Hero */}
      <section className="section relative flex items-center justify-center h-[80vh] md:h-[95vh] overflow-hidden">
        <div data-parallax data-speed="0.18" className="parallax absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2200&auto=format&fit=crop"
            alt="Grainy urban waterfront silhouette"
            fill
            priority
            className="object-cover grayscale contrast-125"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-6">
          <FadeIn>
            <h1 className="font-display text-4xl md:text-6xl tracking-wideish uppercase">Monochrome Streets</h1>
            <p className="mt-4 text-sm md:text-base text-neutral-300 max-w-xl mx-auto">
              Black-and-white film photographs from cities around the world.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="#prints" className="px-5 py-3 bg-fg text-bg uppercase tracking-wideish text-xs md:text-sm rounded hover:opacity-90 transition">Buy Prints</a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="px-5 py-3 border border-neutral-400/60 text-fg uppercase tracking-wideish text-xs md:text-sm rounded hover:bg-white/10 transition">Follow on IG</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Feature strip */}
      <section className="section py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn>
            <h2 className="section-title uppercase text-xl md:text-2xl text-neutral-200">The Work</h2>
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {photos.slice(0, 3).map((p, i) => (
              <div key={i} className="relative aspect-[4/5] overflow-hidden rounded">
                <div data-parallax data-speed="0.12" className="parallax absolute inset-0">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover grayscale contrast-125" />
                </div>
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full bleed parallax image */}
      <ParallaxImage src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2200&auto=format&fit=crop" alt="City crosswalk with umbrellas" priority />

      {/* Gallery */}
      <section id="prints" className="section py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn>
            <h2 className="section-title uppercase text-xl md:text-2xl text-neutral-200">Selected Frames</h2>
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {photos.map((p, i) => (
              <div key={i} className="group relative overflow-hidden rounded">
                <div data-parallax data-speed="0.1" className="parallax relative w-full h-0 pb-[130%]">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover grayscale contrast-125 group-hover:scale-[1.03] transition" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="mailto:prints@example.com?subject=Print%20Inquiry%20—%20Monochrome%20Streets" className="px-5 py-3 bg-fg text-bg uppercase tracking-wideish text-xs md:text-sm rounded hover:opacity-90 transition">Buy Prints</a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="px-5 py-3 border border-neutral-400/60 text-fg uppercase tracking-wideish text-xs md:text-sm rounded hover:bg-white/10 transition">Follow on IG</a>
          </div>
        </div>
      </section>

      {/* Closing parallax */}
      <ParallaxImage src="https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=2200&auto=format&fit=crop" alt="Dense city buildings" />

      <footer className="py-10 text-center text-neutral-500 text-xs">
        © {new Date().getFullYear()} Monochrome Streets — All rights reserved.
      </footer>
    </main>
  );
}
