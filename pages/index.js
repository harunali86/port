import Head from 'next/head'
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import LazySection from '../components/LazySection'

// Dynamic imports for below-fold content
const Projects = dynamic(() => import('../components/Projects'), { ssr: false })
const Skills = dynamic(() => import('../components/Skills'), { ssr: false })
const About = dynamic(() => import('../components/About'), { ssr: false })
const Services = dynamic(() => import('../components/Services'), { ssr: false })
const FAQ = dynamic(() => import('../components/FAQ'), { ssr: false })
const Contact = dynamic(() => import('../components/Contact'), { ssr: false })
const Testimonials = dynamic(() => import('../components/Testimonials'), { ssr: false })

export async function getServerSideProps({ req }) {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const isMobile = Boolean(userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ));

  return {
    props: {
      isMobile,
    },
  }
}

export default function Home({ isMobile }) {
  return (
    <>
      <Head>
        <title>Best Full Stack Developer & AI Engineer | Harun Shaikh</title>
        <meta name="description" content="Harun Shaikh is a top-rated Senior Full Stack Developer & AI/ML Engineer. Expert in building scalable software solutions. Hire the best Software Engineer." />
        <meta name="keywords" content="Best Full Stack Developer, Top AI Engineer, Machine Learning Expert, Software Engineer, Hire React Developer, Next.js Expert, AI Solutions, Freelance Developer India, Harun Shaikh" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://harunshaikh.com"} />
        <meta name="google-site-verification" content="PASTE_YOUR_GOOGLE_CONSOLE_CODE_HERE" />
        <meta name="robots" content="index, follow" />

        {/* Aggressive JSON-LD for Google Ranking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Harun Shaikh",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://harunshaikh.com",
              "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://harunshaikh.com"}/avatar.png`,
              "jobTitle": "Senior Full Stack Developer & AI Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "description": "Harun Shaikh is recognized as a leading Full Stack Developer and AI Engineer, specializing in high-performance web applications and machine learning solutions.",
              "knowsAbout": [
                "Full Stack Development",
                "Artificial Intelligence",
                "Machine Learning",
                "Next.js",
                "React",
                "Node.js",
                "Python",
                "System Design"
              ]
            }),
          }}
        />
      </Head>

      <main id="main-content" role="main">
        <section id="hero" aria-label="Introduction">
          <Hero isMobile={isMobile} />
        </section>

        <LazySection>
          <section id="about" aria-label="About Me">
            <About />
          </section>
        </LazySection>

        <LazySection>
          <section id="skills" aria-label="My Skills">
            <Skills />
          </section>
        </LazySection>

        <LazySection>
          <section id="projects" aria-label="Featured Projects">
            <Projects />
          </section>
        </LazySection>

        <LazySection>
          <section id="services" aria-label="Services Offered">
            <Services />
          </section>
        </LazySection>

        <LazySection>
          <section id="testimonials" aria-label="Client Testimonials">
            <Testimonials />
          </section>
        </LazySection>

        <LazySection>
          <section id="faq" aria-label="Frequently Asked Questions">
            <FAQ />
          </section>
        </LazySection>

        <LazySection>
          <section id="contact" aria-label="Contact Me">
            <Contact />
          </section>
        </LazySection>
      </main>
      <Footer />
    </>
  )
}

