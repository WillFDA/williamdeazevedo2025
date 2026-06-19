import leFellicHomePoster from "../assets/projects/lefellic-home.webp";
import motivaiLandingPoster from "../assets/projects/motivai-landing.webp";
import persistanceHomePoster from "../assets/projects/persistance-home.webp";

export type Project = {
    caseStudy: {
        need: string;
        overview: string;
        solution: string;
    };
    href: string;
    id: string;
    media:
        | {
              poster: string;
              src: string;
              type: "video";
          }
        | {
              label: string;
              type: "placeholder";
          };
    stack: string[];
    summary: string;
    title: string;
};

export const homeProjects: Project[] = [
    {
        id: "le-fellic",
        title: "SARL LE FELLIC",
        href: "https://lefellic.fr/",
        summary:
            "Site vitrine one-page pour une entreprise de maîtrise d'oeuvre à Rennes, pensé pour clarifier l'offre, rassurer une cible B2B et générer des demandes qualifiées via un formulaire sécurisé.",
        stack: [
            "Astro 6",
            "TypeScript",
            "Tailwind CSS 4",
            "Cloudflare Workers",
            "Turnstile",
            "React Email",
            "MapLibre GL",
        ],
        media: {
            type: "video",
            poster: leFellicHomePoster.src,
            src: "/lefellic/lefellic-home.mp4",
        },
        caseStudy: {
            overview:
                "Site vitrine one-page conçu et développé pour SARL LE FELLIC - Maîtrise & Solutions, entreprise de maîtrise d'oeuvre d'exécution, OPC et suivi de chantier basée à Rennes.",
            need:
                "Créer une présence web claire pour une société récente, sans donner l'impression d'une jeune expérience, en valorisant le parcours de Quentin LE FELLIC, son expertise terrain et sa zone d'intervention.",
            solution:
                "Une page unique orientée conversion avec hero métier, parcours, projets témoins, carte d'intervention, SEO local et formulaire sécurisé via Astro, Cloudflare Workers, Turnstile, rate limiting et notification email.",
        },
    },
    {
        id: "persistance",
        title: "Persistance",
        href: "https://persistance-studio.fr/",
        summary:
            "Site vitrine administrable pour un studio d'accompagnement graphique, avec portfolio, articles, témoignages, pages prestations, SEO technique et formulaire de contact sécurisé.",
        stack: [
            "Astro 6",
            "TypeScript",
            "Tailwind CSS 4",
            "Sanity",
            "React",
            "Cloudflare",
            "Embla Carousel",
        ],
        media: {
            type: "video",
            poster: persistanceHomePoster.src,
            src: "/persistance/persistance-home.mp4",
        },
        caseStudy: {
            overview:
                "Conception et développement du site vitrine de Persistance, une activité d'accompagnement graphique portée par Cédrine Marmasse.",
            need:
                "Présenter clairement l'univers, la méthode et les offres, valoriser les réalisations, publier des articles et rendre la cliente autonome sur les contenus via un CMS.",
            solution:
                "Architecture Astro légère avec Sanity pour administrer projets, articles, clients et témoignages, pages prestations structurées, SEO technique et formulaire sécurisé avec validation et Turnstile.",
        },
    },
    {
        id: "motivai",
        title: "Motivai",
        href: "https://www.motivai.fr/",
        summary:
            "SaaS de génération de lettres de motivation par IA, développé en solo avec une architecture produit complète, authentification, base de données et intégration multi-modèles.",
        stack: [
            "Next.js",
            "Drizzle ORM",
            "Better Auth",
            "Vercel AI SDK",
            "TypeScript",
            "Vercel",
        ],
        media: {
            type: "video",
            poster: motivaiLandingPoster.src,
            src: "/motivai/motivai-landing.mp4",
        },
        caseStudy: {
            overview:
                "SaaS de génération de lettres de motivation par IA développé en solo depuis 2024.",
            need:
                "Construire un produit complet avec onboarding, génération IA, gestion utilisateur, environnements multiples et déploiements versionnés.",
            solution:
                "Architecture Next.js avec Drizzle ORM, Better Auth et Vercel AI SDK pour permettre aux utilisateurs de choisir leur modèle d'IA.",
        },
    },
];
