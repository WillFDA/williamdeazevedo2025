export type CaseStudy = {
  choices: {
    text: string;
    title: string;
  }[];
  description: string;
  goals: string[];
  h1: string;
  projectId: string;
  results: string[];
  role: string;
  seoTitle: string;
  serviceHref: string;
  serviceLabel: string;
  situation: string[];
  slug: string;
  takeaway: string;
  title: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "le-fellic",
    projectId: "le-fellic",
    title: "Étude de cas Le Fellic",
    seoTitle: "Site vitrine B2B one-page - Le Fellic",
    h1: "Clarifier une offre B2B avec un site vitrine one-page",
    description:
      "Site vitrine one-page pour une entreprise de maîtrise d'oeuvre à Rennes, pensé pour rassurer et faciliter la prise de contact.",
    role: "Cadrage, design d'interface, développement Astro, formulaire sécurisé et mise en ligne.",
    serviceHref: "/creation-site-vitrine",
    serviceLabel: "Création de site vitrine",
    situation: [
      "une société récente qui devait inspirer confiance rapidement",
      "une activité technique à rendre compréhensible pour une cible B2B",
      "un besoin de contact qualifié sans multiplier les pages",
    ],
    goals: [
      "présenter clairement les missions de maîtrise d'oeuvre et d'OPC",
      "valoriser le parcours terrain de Quentin LE FELLIC",
      "rendre la zone d'intervention lisible",
      "sécuriser les demandes via un formulaire fiable",
    ],
    choices: [
      {
        title: "Un format one-page volontaire",
        text: "Le parcours reste court : activité, preuves, zone d'intervention et contact. Le site évite les pages inutiles tant que l'offre peut être comprise simplement.",
      },
      {
        title: "Une structure orientée confiance",
        text: "Les sections mettent l'expertise, les projets témoins et le contact au bon moment pour rassurer avant la demande.",
      },
      {
        title: "Une base technique légère",
        text: "Astro, Tailwind CSS et Cloudflare permettent un site rapide, maintenable et sécurisé sans ajouter de complexité inutile.",
      },
    ],
    results: [
      "site publié, responsive et utilisable sur mobile",
      "offre structurée autour des besoins réels des prospects",
      "formulaire sécurisé avec Turnstile et notification email",
      "socle SEO local préparé sans créer de pages géographiques artificielles",
    ],
    takeaway:
      "Ce projet montre comment transformer une activité technique en site simple à comprendre, sans alourdir le parcours ni inventer des contenus superflus.",
  },
  {
    slug: "persistance",
    projectId: "persistance",
    title: "Étude de cas Persistance",
    seoTitle: "Site administrable pour studio graphique - Persistance",
    h1: "Construire un site administrable fidèle à une identité créative",
    description:
      "Site vitrine administrable pour un studio d'accompagnement graphique, avec portfolio, articles, prestations et témoignages.",
    role: "Architecture du site, design d'interface, développement Astro, intégration Sanity et formulaire sécurisé.",
    serviceHref: "/refonte-site-internet",
    serviceLabel: "Refonte de site internet",
    situation: [
      "une activité créative qui devait expliquer sa méthode et ses offres",
      "un besoin de publier des projets, articles, clients et témoignages",
      "une identité forte à respecter sans rendre l'expérience confuse",
    ],
    goals: [
      "clarifier l'accompagnement et les prestations",
      "rendre les contenus administrables",
      "mettre en valeur les réalisations sans perdre le visiteur",
      "poser une base technique rapide et durable",
    ],
    choices: [
      {
        title: "Un site éditorial, pas seulement une vitrine",
        text: "Les pages prestations, projets, articles et témoignages donnent plus de profondeur au site et aident les prospects à comprendre l'accompagnement.",
      },
      {
        title: "Un CMS pour l'autonomie",
        text: "Sanity permet de faire évoluer les contenus sans dépendre d'une intervention technique pour chaque mise à jour.",
      },
      {
        title: "Une interface sobre au service de l'identité",
        text: "Le design garde de la personnalité, mais chaque section conserve un rôle clair dans le parcours.",
      },
    ],
    results: [
      "contenus administrables pour les projets, articles et témoignages",
      "pages prestations structurées",
      "formulaire sécurisé",
      "site rapide, responsive et pensé pour le référencement technique",
    ],
    takeaway:
      "Ce projet montre l'intérêt d'une refonte qui clarifie l'offre tout en donnant de l'autonomie sur les contenus futurs.",
  },
  {
    slug: "motivai",
    projectId: "motivai",
    title: "Étude de cas Motivai",
    seoTitle: "Interface SaaS IA complète - Motivai",
    h1: "Transformer une idée en produit web complet et maintenable",
    description:
      "SaaS de génération de lettres de motivation par IA, développé en solo avec authentification, base de données et intégration multi-modèles.",
    role: "Produit, design, développement front-end et full stack, authentification, base de données et intégration IA.",
    serviceHref: "/services/developpeur-web-freelance",
    serviceLabel: "Développement front-end freelance",
    situation: [
      "une idée produit à transformer en application utilisable",
      "un parcours utilisateur complet à concevoir",
      "des choix techniques à garder maintenables malgré l'IA et l'authentification",
    ],
    goals: [
      "permettre la génération de lettres de motivation avec plusieurs modèles IA",
      "gérer les utilisateurs, l'onboarding et les environnements",
      "livrer une interface claire malgré un produit complexe",
      "tester un vrai produit, pas seulement une landing page",
    ],
    choices: [
      {
        title: "Une approche produit complète",
        text: "Le projet ne se limite pas à l'intégration : il couvre les parcours, les états, l'authentification, la donnée et la génération.",
      },
      {
        title: "Une stack cohérente avec le besoin",
        text: "Next.js, Drizzle, Better Auth et le Vercel AI SDK permettent de structurer le produit sans multiplier les couches inutiles.",
      },
      {
        title: "Une interface pensée pour guider",
        text: "L'utilisateur doit comprendre quoi fournir, quel modèle choisir et comment récupérer son résultat sans friction.",
      },
    ],
    results: [
      "produit complet développé en solo",
      "parcours d'onboarding et génération IA fonctionnels",
      "authentification et base de données intégrées",
      "déploiements versionnés et architecture évolutive",
    ],
    takeaway:
      "Ce projet montre mon autonomie sur des interfaces produit, du cadrage au développement, avec une attention constante à la clarté d'usage.",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
