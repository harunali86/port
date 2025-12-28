// Schema.org Structured Data for SEO / GEO / AEO

// Default configuration - update these values
export const siteConfig = {
    name: "Harun Shaikh",
    jobTitle: "Senior Full Stack Developer",
    email: "harunilahishaikh@gmail.com",
    url: "https://harun-portfolio.vercel.app",
    image: "https://harun-portfolio.vercel.app/portfolio.jpg",
    description: "Senior Full Stack Developer with 3+ years experience building scalable web applications. Expert in React, Next.js, Node.js, Python, and AI/ML integration.",
    location: "India",
    social: {
        github: "https://github.com/harunali86",
        linkedin: "https://linkedin.com/in/harunshaikh",
        twitter: "https://twitter.com/harunshaikh",
    },
    skills: ["React", "Next.js", "Node.js", "Python", "TypeScript", "MongoDB", "PostgreSQL", "AI/ML", "Three.js", "Framer Motion"],
    yearsOfExperience: 3,
};

// Person Schema - For Google Knowledge Panel
export const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    image: siteConfig.image,
    email: `mailto:${siteConfig.email}`,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    knowsAbout: siteConfig.skills,
    alumniOf: {
        "@type": "Organization",
        name: "Computer Science Graduate"
    },
    worksFor: {
        "@type": "Organization",
        name: "Freelance / Self-Employed"
    }
};

// WebSite Schema - For search and site identity
export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: `${siteConfig.name} - Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
        "@id": `${siteConfig.url}/#person`
    },
    potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.url}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
    }
};

// Professional Service Schema
export const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: `${siteConfig.name} - Web Development Services`,
    url: siteConfig.url,
    image: siteConfig.image,
    description: "Expert full stack web development services including React, Next.js, Node.js applications, AI integration, and custom software solutions.",
    provider: {
        "@id": `${siteConfig.url}/#person`
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Full Stack Web Development",
                    description: "Custom web applications with React, Next.js, Node.js"
                }
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "AI/ML Integration",
                    description: "Integrate artificial intelligence and machine learning into your applications"
                }
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "E-Commerce Development",
                    description: "Scalable e-commerce solutions with modern technologies"
                }
            }
        ]
    }
};

// FAQ Schema - Critical for GEO/AEO (AI and Voice Search)
export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: [
        {
            "@type": "Question",
            name: "What services does Harun Shaikh offer?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Harun Shaikh offers full stack web development services including custom React and Next.js applications, Node.js backend development, AI/ML integration, e-commerce solutions, mobile-responsive websites, and API development. With 3+ years of experience, he delivers scalable, high-performance web solutions."
            }
        },
        {
            "@type": "Question",
            name: "What technologies does Harun Shaikh specialize in?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Harun Shaikh specializes in React, Next.js, Node.js, Python, TypeScript, MongoDB, PostgreSQL, Three.js, Framer Motion, and AI/ML technologies including OpenAI integration. He builds modern, performant web applications using cutting-edge tools and frameworks."
            }
        },
        {
            "@type": "Question",
            name: "How many years of experience does Harun Shaikh have?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Harun Shaikh has over 3 years of professional experience as a Full Stack Developer, having completed 50+ projects with 100% client satisfaction. He has worked with startups, enterprises, and individual clients worldwide."
            }
        },
        {
            "@type": "Question",
            name: "How can I contact Harun Shaikh for a project?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can contact Harun Shaikh through the contact form on this website, via email at harunilahishaikh@gmail.com, or through WhatsApp. He typically responds within 24 hours and offers free initial consultations for new projects."
            }
        },
        {
            "@type": "Question",
            name: "Does Harun Shaikh work with international clients?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, Harun Shaikh works with clients worldwide. He has experience collaborating with teams across different time zones and provides services to clients in India, USA, UK, UAE, and other countries. All communication is in English."
            }
        },
        {
            "@type": "Question",
            name: "What is Harun Shaikh's development process?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Harun Shaikh follows an agile development process: 1) Discovery & Planning - understanding requirements, 2) Design & Prototyping - creating wireframes and mockups, 3) Development - building with clean, maintainable code, 4) Testing & QA - ensuring quality and performance, 5) Deployment & Support - launching and ongoing maintenance."
            }
        }
    ]
};

// BreadcrumbList Schema
export const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: `${siteConfig.url}/#about`
        },
        {
            "@type": "ListItem",
            position: 3,
            name: "Projects",
            item: `${siteConfig.url}/#projects`
        },
        {
            "@type": "ListItem",
            position: 4,
            name: "Services",
            item: `${siteConfig.url}/#services`
        },
        {
            "@type": "ListItem",
            position: 5,
            name: "Contact",
            item: `${siteConfig.url}/#contact`
        }
    ]
};

// Combine all schemas for injection
export const getAllSchemas = () => {
    return [
        personSchema,
        websiteSchema,
        professionalServiceSchema,
        faqSchema,
        breadcrumbSchema
    ];
};

// Generate script tags for all schemas
export const getSchemaScripts = () => {
    return getAllSchemas().map((schema, index) => ({
        type: "application/ld+json",
        key: `schema-${index}`,
        dangerouslySetInnerHTML: {
            __html: JSON.stringify(schema)
        }
    }));
};
