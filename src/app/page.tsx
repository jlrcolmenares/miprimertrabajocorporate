"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [featuresRef, featuresInView] = useInView({ threshold: 0.15 });
  const [valueRef, valueInView] = useInView({ threshold: 0.15 });
  const [statsRef, statsInView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Sticky Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-nav-scrolled bg-white/90 shadow-lg"
            : "bg-transparent"
        }`}
        style={scrolled ? { boxShadow: '0 10px 15px -3px rgba(41, 44, 136, 0.05)' } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">
            <div className="flex-shrink-0">
              <h1
                className="text-lg sm:text-2xl font-bold transition-colors duration-300"
                style={{ color: scrolled ? 'var(--primary)' : 'white' }}
              >
                Incorporate
              </h1>
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              style={scrolled ? { '--hover-color': 'var(--primary)' } as React.CSSProperties : {}}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-2">
              {[
                { href: "/", label: "Inicio" },
                { href: "/sobre-mi", label: "Sobre Mí" },
                { href: "/curso", label: "El Curso" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 nav-link-hover ${
                    scrolled
                      ? "text-gray-700"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                className={`ml-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  scrolled
                    ? "text-white hover:-translate-y-0.5"
                    : "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
                }`}
                style={scrolled ? {
                  background: 'linear-gradient(to right, var(--primary), var(--primary-light))',
                  boxShadow: '0 10px 15px -3px rgba(41, 44, 136, 0.25)'
                } : {}}
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`py-3 space-y-1 ${
                scrolled ? "bg-white" : "bg-slate-900/95 backdrop-blur-lg rounded-xl mb-4"
              }`}
            >
              {[
                { href: "/", label: "Inicio" },
                { href: "/sobre-mi", label: "Sobre Mí" },
                { href: "/curso", label: "El Curso" },
                { href: "/login", label: "Iniciar Sesión", highlight: true },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    scrolled
                      ? link.highlight
                        ? "hover:bg-gray-50"
                        : "text-gray-700 hover:bg-gray-50"
                      : link.highlight
                      ? "hover:bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                  style={scrolled && link.highlight ? { color: 'var(--primary)' } : ((!scrolled && link.highlight) ? { color: 'var(--primary-light)' } : {})}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-screen flex items-center justify-center landing-gradient-bg overflow-hidden">
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large gradient orbs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl floating-element glow-pulse" />
          <div className="absolute top-1/3 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl floating-element-reverse glow-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl floating-element-slow glow-pulse" style={{ animationDelay: "4s" }} />

          {/* Geometric shapes */}
          <div className="absolute top-20 left-[15%] w-20 h-20 border border-white/10 rounded-2xl floating-element" style={{ animationDelay: "1s" }} />
          <div className="absolute top-40 right-[20%] w-16 h-16 border border-blue-400/20 rounded-full floating-element-reverse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-40 left-[10%] w-12 h-12 bg-gradient-to-br from-blue-500/20 to-transparent rounded-lg floating-element" style={{ animationDelay: "3s" }} />
          <div className="absolute bottom-60 right-[15%] w-24 h-24 border border-indigo-400/15 rounded-3xl floating-element-slow" style={{ animationDelay: "2.5s" }} />

          {/* Small dots */}
          <div className="absolute top-1/3 left-[30%] w-2 h-2 bg-blue-400/50 rounded-full floating-element" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 right-[30%] w-3 h-3 bg-indigo-400/40 rounded-full floating-element-reverse" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-1/3 left-[40%] w-2 h-2 bg-purple-400/50 rounded-full floating-element-slow" style={{ animationDelay: "0.8s" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Animated Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 animated-badge"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/70 font-medium">Curso disponible ahora</span>
          </div>

          {/* Main Heading */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight opacity-0"
            style={{ animation: "slideInFromLeft 0.8s ease-out 0.3s forwards" }}
          >
            <span className="text-white">Tu Primer Trabajo</span>
            <br />
            <span className="gradient-text-bright">Corporate</span>
            <br />
            <span className="text-white">Comienza Aquí</span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl md:text-2xl text-white/60 mb-10 max-w-3xl mx-auto leading-relaxed opacity-0"
            style={{ animation: "slideInFromRight 0.8s ease-out 0.5s forwards" }}
          >
            Descubre todo lo que necesitas saber para triunfar en el mundo corporativo.
            <span className="text-white/80 font-medium"> Información valiosa, práctica y directa al punto.</span>
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0"
            style={{ animation: "fadeInUp 0.8s ease-out 0.7s forwards" }}
          >
            <Link
              href="/curso"
              className="group w-full sm:w-auto btn-gradient text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
            >
              Acceder al Curso
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/sobre-mi"
              className="w-full sm:w-auto btn-outline-glass text-white px-8 py-4 rounded-xl text-lg font-semibold"
            >
              Conoce Más
            </Link>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0"
            style={{ animation: "fadeInUp 0.8s ease-out 1.2s forwards" }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }} />
        </div>

        <div ref={featuresRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <h3
              className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 ${
                featuresInView ? "opacity-100" : "opacity-0"
              }`}
              style={featuresInView ? { animation: "fadeInUp 0.6s ease-out" } : {}}
            >
              ¿Qué <span className="gradient-text">aprenderás</span>?
            </h3>
            <p
              className={`text-lg text-white/50 max-w-2xl mx-auto ${
                featuresInView ? "opacity-100" : "opacity-0"
              }`}
              style={featuresInView ? { animation: "fadeInUp 0.6s ease-out 0.2s forwards", opacity: 0 } : {}}
            >
              Todo lo esencial para destacar en tu carrera profesional
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: "Contenido Completo",
                description: "Información detallada y organizada sobre todo lo que necesitas saber para tu primer trabajo corporativo.",
                color: "from-blue-500 to-cyan-500",
                delay: "0s",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Experiencia Real",
                description: "Basado en experiencias reales y situaciones prácticas del mundo corporativo actual.",
                color: "from-indigo-500 to-purple-500",
                delay: "0.15s",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Acceso Inmediato",
                description: "Una vez que adquieras el curso, tendrás acceso inmediato y permanente a todo el contenido.",
                color: "from-purple-500 to-pink-500",
                delay: "0.3s",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`feature-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 ${
                  featuresInView ? "opacity-100" : "opacity-0"
                }`}
                style={featuresInView ? {
                  animation: `fadeInUp 0.6s ease-out ${feature.delay} forwards`,
                  opacity: 0
                } : {}}
              >
                <div className={`card-icon w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative py-20" style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-light), var(--secondary-brand))' }}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "8", label: "Secciones" },
              { value: "33", label: "Módulos" },
              { value: "100%", label: "Práctico" },
              { value: "∞", label: "Acceso" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center ${statsInView ? "opacity-100" : "opacity-0"}`}
                style={statsInView ? {
                  animation: `scaleIn 0.5s ease-out ${index * 0.1}s forwards`,
                  opacity: 0
                } : {}}
              >
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="relative py-24 sm:py-32 bg-slate-950">
        <div ref={valueRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 p-8 sm:p-12 md:p-16 ${
              valueInView ? "opacity-100" : "opacity-0"
            }`}
            style={valueInView ? { animation: "fadeInScale 0.8s ease-out" } : {}}
          >
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                ¿Por qué <span className="gradient-text">este curso</span>?
              </h3>
              <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
                He recopilado y organizado toda la información esencial que desearía haber conocido
                antes de empezar mi carrera corporativa.{" "}
                <span className="text-white/80 font-medium">
                  Este curso es el resultado de años de experiencia y aprendizaje en el mundo empresarial.
                </span>
              </p>
              <Link
                href="/curso"
                className="group inline-flex items-center gap-3 btn-gradient text-white px-10 py-5 rounded-2xl text-lg font-semibold"
              >
                Comienza Ahora
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 landing-gradient-bg overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full floating-element" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/10 rounded-2xl floating-element-reverse" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para empezar tu <span className="gradient-text-bright">carrera corporativa</span>?
          </h3>
          <p className="text-lg text-white/60 mb-10">
            Da el primer paso hacia tu futuro profesional hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/curso"
              className="group btn-gradient text-white px-10 py-5 rounded-2xl text-lg font-semibold inline-flex items-center justify-center gap-3"
            >
              Ver el Curso Completo
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="btn-outline-glass text-white px-10 py-5 rounded-2xl text-lg font-semibold"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
