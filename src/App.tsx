import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

// Imágenes
import fotoCesar from './assets/cesar-hero.png';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Icono de TikTok (SVG Inline porque a veces no viene en librerías estándar)
const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);
  
  // Refs Elementos
  const menuRef = useRef<HTMLElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const cesarRef = useRef<HTMLHeadingElement>(null);   // Texto Fondo
  const aguilarRef = useRef<HTMLHeadingElement>(null); // Texto Frente
  const photoRef = useRef<HTMLImageElement>(null);
  
  // Refs Bloques Texto
  const leftBlockRef = useRef<HTMLDivElement>(null);
  const rightBlockRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const tl = gsap.timeline();

    // --- 1. PRELOADER (Sin cambios, funciona bien) ---
    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100, duration: 2.0, ease: 'power2.inOut',
      onUpdate: () => { if (counterRef.current) counterRef.current.innerText = Math.round(counterObj.val) + "%"; }
    })
    .to(progressRef.current, { scaleX: 1, duration: 2.0, ease: 'power2.inOut' }, '<')
    .to(irisRef.current, { scale: 500, duration: 1.0, ease: 'power2.inOut' })
    .to([counterRef.current, progressRef.current], { autoAlpha: 0, duration: 0.2 }, '<0.5')
    .set(preloaderRef.current, { display: 'none' })

    // --- 2. ENTRADA DE ELEMENTOS ---
    
    // Menú (Baja)
    .fromTo(menuRef.current, { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' })
    
    // Redes Sociales (Entran desde la derecha)
    .fromTo(socialRef.current, { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' }, '<')

    // Foto (Fade In)
    .fromTo(photoRef.current, { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, '-=0.5')

    // Títulos Principales (CÉSAR y AGUILAR) - Entran desde los lados
    .fromTo(cesarRef.current, { x: -200, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.5, ease: 'power4.out' }, '<')
    .fromTo(aguilarRef.current, { x: 200, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.5, ease: 'power4.out' }, '<')

    // Textos Informativos (Izquierda y Derecha) - Rebote
    .fromTo(leftBlockRef.current, 
      { x: -100, autoAlpha: 0 }, 
      { x: 0, autoAlpha: 1, duration: 1.2, ease: 'back.out(1.2)' }, '-=1'
    )
    .fromTo(rightBlockRef.current, 
      { x: 100, autoAlpha: 0 }, 
      { x: 0, autoAlpha: 1, duration: 1.2, ease: 'back.out(1.2)' }, '-=1' // Misma animación, desde derecha
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black min-h-screen w-full text-white overflow-hidden relative selection:bg-[#cffe00] selection:text-black">
      
      {/* PRELOADER */}
      <div ref={preloaderRef} className="fixed inset-0 z-[100] bg-[#cffe00] flex flex-col items-center justify-center">
        <div ref={irisRef} className="absolute w-10 h-10 bg-black rounded-full scale-0 z-0"></div>
        <div className="relative z-10 flex flex-col items-center w-full max-w-xl">
          <div ref={counterRef} className="font-mango text-black text-[15rem] leading-none">0%</div>
          <div className="w-full h-1 bg-black/10 mt-4 rounded-full overflow-hidden">
            <div ref={progressRef} className="h-full bg-black w-full origin-left scale-x-0"></div>
          </div>
        </div>
      </div>

      {/* ==================================================================
          🚧 ZONA EDITABLE: MENÚ SUPERIOR
          - Ajusta 'px-12' para márgenes laterales.
          - 'INICIO' tiene el color verde fijo.
      ================================================================== */}
      <header className="fixed top-0 left-0 w-full z-50 pl-8 md:pl-20 pr-8 md:pr-12 py-8 flex justify-between items-start pointer-events-none">
        <nav ref={menuRef} className="pointer-events-auto">
          <ul className="flex space-x-8 text-2xl font-mango tracking-wide uppercase italic">
            <li className="text-[#cffe00] cursor-pointer">Inicio</li>
            <li className="text-white hover:text-[#cffe00] transition-colors cursor-pointer">Servicios</li>
            <li className="text-white hover:text-[#cffe00] transition-colors cursor-pointer">Contacto</li>
          </ul>
        </nav>
      </header>

      {/* ==================================================================
          🚧 ZONA EDITABLE: REDES SOCIALES (VERTICAL DERECHA)
          - Están centradas verticalmente: 'top-1/2 -translate-y-1/2'
          - Ajusta 'right-8' para moverlas más al borde o adentro.
      ================================================================== */}
      <div ref={socialRef} className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 pointer-events-auto text-white items-center">
        <a href="#" className="hover:text-[#cffe00] transition-colors"><Instagram size={24} strokeWidth={1.5} /></a>
        <a href="#" className="hover:text-[#cffe00] transition-colors"><Facebook size={24} strokeWidth={1.5} /></a>
        {/* Aquí está el logo de TikTok agregado */}
        <a href="#" className="hover:text-[#cffe00] transition-colors"><TiktokIcon /></a>
        <a href="#" className="hover:text-[#cffe00] transition-colors"><Linkedin size={24} strokeWidth={1.5} /></a>
      </div>


      {/* CONTENEDOR PRINCIPAL HERO */}
      <main className="relative w-full h-screen overflow-hidden">
        
        {/* ==================================================================
            🚧 ZONA EDITABLE: TÍTULO "CÉSAR" (CAPA TRASERA - Z-0)
            - 'top-[35%]' controla la altura (Alineación con ojos).
            - 'text-[220px]' es el tamaño exacto.
            - 'tracking-[0]' quita el amontonamiento.
            - 'right-[52%]' lo empuja para que termine cerca de tu oreja.
        ================================================================== */}
        <div className="absolute top-[16%] w-full flex justify-center z-0 pointer-events-none -translate-y-1/2">
           <h1 ref={cesarRef} 
               className="absolute right-[55.5%] font-mango text-[#cffe00] italic leading-none"
               style={{ fontSize: '150px', letterSpacing: '0px' }}>
             CÉSAR
           </h1>
        </div>

        {/* ==================================================================
            🚧 ZONA EDITABLE: FOTO CENTRAL (CAPA MEDIA - Z-10)
            - 'h-[85vh]' controla la altura visual de la foto.
            - Ajusta 'translate-y' para subir o bajar la foto.
            - 'z-10' asegura que esté EN MEDIO de los textos.
        ================================================================== */}
        <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
            <img 
              ref={photoRef}
              src={fotoCesar} 
              alt="César Aguilar" 
              className="h-[80vh] md:h-[100vh] w-auto max-w-none object-contain drop-shadow-2xl translate-y-10 grayscale contrast-110"
              style={{ 
                  // Máscara para difuminar solo la parte inferior
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
              }}
            />
        </div>

        {/* ==================================================================
            🚧 ZONA EDITABLE: TÍTULO "AGUILAR" (CAPA FRONTAL - Z-20)
            - Debe tener el mismo 'top' que CÉSAR para alinearse.
            - 'left-[52%]' lo empuja para que empiece cerca de tu otra oreja.
            - Color BLANCO.
        ================================================================== */}
        <div className="absolute top-[16%] w-full flex justify-center z-20 pointer-events-none -translate-y-1/2">
           <h1 ref={aguilarRef} 
               className="absolute left-[53.5%] font-mango text-white italic leading-none"
               style={{ fontSize: '150px', letterSpacing: '0px' }}>
             AGUILAR
           </h1>
        </div>


        {/* ==================================================================
            🚧 ZONA EDITABLE: BLOQUE IZQUIERDO (DISEÑO WEB)
            - Fuente: 'Gatty' (Corregido).
            - 'bottom-[15%]' controla la altura desde abajo.
            - 'left-[10%]' controla la distancia izquierda.
        ================================================================== */}
        <div ref={leftBlockRef} className="absolute bottom-[28%] left-[12%] z-30 text-left">
           {/* DISEÑO (Verde) WEB (Blanco) */}
           <div className="font-gatty leading-none mb-0" style={{ fontSize: '80px', letterSpacing: '0px' }}>
             <span className="text-[#cffe00]">DISEÑO</span> <span className="text-white">WEB</span>
           </div>
           {/* DE IMPACTO */}
           <div className="font-gatty text-white leading-none uppercase" style={{ fontSize: '45px', letterSpacing: '0px' }}>
             DE IMPACTO
           </div>
        </div>


        {/* ==================================================================
            🚧 ZONA EDITABLE: BLOQUE DERECHO (SOFTWARE)
            - Fuente: 'Gatty' (Corregido).
            - Alineado a la derecha 'right-[12%]'.
            - Misma altura que el izquierdo 'bottom-[15%]'.
        ================================================================== */}
        <div ref={rightBlockRef} className="absolute bottom-[10%] right-[12%] z-30 text-right">
           {/* SOFTWARE (Verde) A MEDIDA (Blanco) */}
           <div className="font-gatty leading-none mb-0" style={{ fontSize: '80px', letterSpacing: '0px' }}>
             <span className="text-[#cffe00]">SOFTWARE</span> <span className="text-white"> A MEDIDA</span>
           </div>
           {/* EN LA NUBE */}
           <div className="font-gatty text-white leading-none uppercase" style={{ fontSize: '45px', letterSpacing: '0px' }}>
             EN LA NUBE
           </div>
        </div>

      </main>

    </div>
  );
}

export default App;