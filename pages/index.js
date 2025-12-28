import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import About from '../components/About'
import Services from '../components/Services'   // <-- add your new Services component!
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Harun Shaikh | Senior Full Stack Developer</title>
      </Head>
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="services">
          <Services /> {/* NEW: Services section */}
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}
