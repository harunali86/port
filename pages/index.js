import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import About from '../components/About'
import Services from '../components/Services'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Harun Shaikh | Senior Full Stack Developer | React, Next.js, Node.js Expert</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>
      <Navbar />
      <main id="main-content" role="main">
        <section id="hero" aria-label="Introduction">
          <Hero />
        </section>
        <section id="about" aria-label="About Me">
          <About />
        </section>
        <section id="skills" aria-label="My Skills">
          <Skills />
        </section>
        <section id="projects" aria-label="Featured Projects">
          <Projects />
        </section>
        <section id="services" aria-label="Services Offered">
          <Services />
        </section>
        <section id="faq" aria-label="Frequently Asked Questions">
          <FAQ />
        </section>
        <section id="contact" aria-label="Contact Me">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}

