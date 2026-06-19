export type Temoignage = {
    excerpt?: string;
    id: string;
    imageAlt?: string;
    imageFile?: string;
    initials: string;
    name: string;
    published?: boolean;
    text: string;
};

export const temoignages: Temoignage[] = [
    {
        id: "quentin-le-fellic",
        excerpt:
            "Excellente collaboration avec William, site livré rapidement et avec soin.",
        imageAlt: "Portrait de Quentin LE FELLIC",
        imageFile: "quentin-le-fellic.webp",
        initials: "QL",
        name: "Quentin LE FELLIC",
        text:
            "J’ai eu beaucoup de plaisir à travailler avec William pour la création de mon site internet. Son accompagnement a été à la fois professionnel, réactif et très à l’écoute de mes besoins. Les échanges ont toujours été fluides et constructifs, ce qui a permis d’aboutir à un site qui correspond parfaitement à mes attentes. Je suis très satisfait du résultat final et je recommande vivement William pour son sérieux et la qualité de son travail.",
    },
    {
        id: "cedrine-marmasse",
        excerpt:
            "Un accompagnement clair et sensible, avec un site fidèle à mon univers.",
        imageAlt: "Portrait de Cédrine Marmasse",
        imageFile: "cedrine-marmasse.webp",
        initials: "CM",
        name: "Cédrine Marmasse",
        published: false,
        text:
            "Le site Persistance m’a permis de présenter mon univers, mes offres et mes réalisations avec clarté. William a su structurer le contenu, garder une interface fluide et me rendre autonome sur la gestion des pages. Les échanges ont été simples, précis et le résultat correspond très bien à l’image que je voulais transmettre.",
    },
];
