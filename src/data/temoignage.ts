export type Temoignage = {
    id: string;
    image?: string;
    name: string;
    text: string;
};

export const temoignages: Temoignage[] = [
    {
        id: "quentin-le-fellic",
        image: "/temoignages/quentin-le-fellic.webp",
        name: "Quentin LE FELLIC",
        text:
            "J’ai eu beaucoup de plaisir à travailler avec William pour la création de mon site internet. Son accompagnement a été à la fois professionnel, réactif et très à l’écoute de mes besoins. Les échanges ont toujours été fluides et constructifs, ce qui a permis d’aboutir à un site qui correspond parfaitement à mes attentes. Je suis très satisfait du résultat final et je recommande vivement William pour son sérieux et la qualité de son travail.",
    },
];
