export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
}

export const posts: BlogPost[] = [
  {
    slug: 'mon-premier-side-project-motivai',
    title: 'Mon premier side project : Motivai',
    description:
      "Hello, bienvenue sur mon premier post ! Je partage mon expérience avec mon premier side project et ce que j'ai appris en le créant.",
    date: '2025-12-15',
    author: 'William De Azevedo',
    tags: ['side-project', 'apprentissage', 'développement', 'IA'],
  },
];
