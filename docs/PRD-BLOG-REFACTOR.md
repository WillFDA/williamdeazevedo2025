# PRD: Blog Refactor - Inspiration shud.in

## Executive Summary

Ce document compare l'implémentation actuelle du blog de williamdeazevedo.fr avec celle de shud.in (Shu Ding) et détaille les changements recommandés pour améliorer l'expérience utilisateur, la maintenabilité et les performances.

---

## 1. Comparaison Architecturale

### Structure des Fichiers

| Aspect | shud.in | williamdeazevedo.fr | Recommandation |
|--------|---------|---------------------|----------------|
| **Location** | `app/thoughts/_articles/*.mdx` | `content/*.mdx` | ✅ Garder - Notre approche est plus claire |
| **Naming** | Section "Thoughts" | Section "Blog" | ✅ Garder "Blog" - Plus explicite pour un portfolio FR |
| **URL** | `/thoughts/[slug]` | `/blog/[slug]` | ✅ Garder `/blog` |

### Métadonnées

| Aspect | shud.in | williamdeazevedo.fr | Recommandation |
|--------|---------|---------------------|----------------|
| **Format** | `export const metadata = {}` (JS) | Frontmatter YAML | ⚠️ **À CHANGER** - Utiliser export JS |
| **Date format** | `"2021.12.28"` | `"2026-01-05"` | ✅ Garder ISO - Plus standard |
| **Draft flag** | `metadata.draft` | `metadata.published` | ✅ Garder `published` - Plus explicite |
| **Champs** | title, date, description, draft, chinese | title, description, date, tags, author, published | ✅ Garder nos champs + ajouter `draft` |

**Action**: Migrer vers `export const metadata` pour permettre l'import direct des MDX et simplifier le code.

---

## 2. Configuration MDX

### shud.in
```typescript
// next.config.ts
experimental: {
  mdxRs: {
    mdxType: 'gfm',  // GitHub Flavored Markdown via Rust compiler
  },
},
transpilePackages: ['shiki'],
```

### williamdeazevedo.fr (actuel)
```typescript
// next.config.ts
const withMDX = createMDX({});
// Pas de mdxRs, pas de GFM natif
```

### Recommandations

| Feature | Action | Priorité |
|---------|--------|----------|
| **mdxRs** | ✅ Activer - Compilation plus rapide | Haute |
| **GFM support** | ✅ Ajouter `mdxType: 'gfm'` | Haute |
| **Shiki transpile** | ✅ Ajouter si Shiki utilisé | Moyenne |

---

## 3. Syntax Highlighting

### shud.in
```typescript
// Utilise Shiki avec CSS Variables Theme
import { codeToHtml, createCssVariablesTheme } from 'shiki'

const cssVariablesTheme = createCssVariablesTheme({})

code: async (props) => {
  const code = await codeToHtml(props.children, {
    lang: 'jsx',
    theme: cssVariablesTheme,
  })
  return <code dangerouslySetInnerHTML={{ __html: code }} />
}
```

### williamdeazevedo.fr (actuel)
```typescript
// Styling basique sans coloration syntaxique
pre: (props) => (
  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4">
    {props.children}
  </pre>
)
```

### Recommandation: **Implémenter Shiki**

**Dépendances à ajouter:**
```json
{
  "shiki": "^3.2.1"
}
```

**Configuration CSS à ajouter:**
```css
code {
  --shiki-token-comment: hsl(215deg 32% 37% / 45%);
  --shiki-token-punctuation: hsl(215deg 32% 37% / 65%);
  --shiki-token-keyword: hsl(215deg 32% 37% / 85%);
  --shiki-token-function: hsl(223deg 85% 46%);
  --shiki-token-string: #0fb359;
  --shiki-token-constant: hsl(215deg 32% 26%);
}
```

---

## 4. Composants MDX Personnalisés

### shud.in - Composants disponibles

| Composant | Description | À implémenter ? |
|-----------|-------------|-----------------|
| `Card` | Preview card pour liens externes (Twitter-like) | ✅ Oui - Très utile |
| `BlockSideTitle` | Image avec titre latéral | ⚠️ Optionnel |
| `InlineMath` / `BlockMath` | Formules LaTeX (KaTeX) | ❌ Non - Pas nécessaire |
| `Image` | Next.js Image optimisé | ✅ Déjà implémenté |

### Recommandation: Créer `Card` component

```typescript
// components/blog/card.tsx
type CardProps = {
  title: string
  desc: string
  link: string
  image?: string
}

export function Card({ title, desc, link, image }: CardProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer"
       className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors mt-7">
      <div className="flex gap-4">
        {image && <img src={image} alt="" className="w-16 h-16 rounded object-cover" />}
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{desc}</p>
        </div>
      </div>
    </a>
  )
}
```

---

## 5. Page de Liste des Articles

### shud.in
```tsx
// Style minimaliste avec dot leaders
<li className='font-medium'>
  <Link href={`/thoughts/${item.slug}`} className='group flex gap-1'>
    <span className='text-rurikon-500 group-hover:text-rurikon-700'>
      {item.title}
    </span>
    <span className='dot-leaders flex-1' />
    <time className='text-rurikon-200 tabular-nums'>
      {item.date}
    </time>
  </Link>
</li>
```

### williamdeazevedo.fr (actuel)
- Cards avec description, tags, hover effect
- Plus d'informations affichées

### Recommandation: **Simplifier**

Adopter le style minimaliste de shud.in:
- Titre + dot leaders + date
- Supprimer les descriptions dans la liste
- Supprimer les tags de la liste (garder sur la page article)
- Hover effect subtil sur le texte

---

## 6. Typographie et Styling

### shud.in - Système de couleurs
```css
--color-rurikon-50: #ebedef;
--color-rurikon-100: #d8dbdf;
--color-rurikon-200: #b3b9c1;
--color-rurikon-300: #8c95a1;
--color-rurikon-400: #697381;
--color-rurikon-500: #4a515b;  /* Texte principal */
--color-rurikon-600: #3b4149;  /* Titres */
--color-rurikon-700: #2b3035;
```

### williamdeazevedo.fr (actuel)
```css
/* Système à 3 niveaux */
gray-900: Titres, texte important
gray-600: Corps de texte
gray-400: Métadonnées
```

### Recommandation: ✅ **Garder notre système**
Notre système est plus simple et suffisant. Pas besoin d'une palette aussi étendue.

---

## 7. Features Spéciales

### Comparaison

| Feature | shud.in | williamdeazevedo.fr | Action |
|---------|---------|---------------------|--------|
| **View Transitions** | ✅ Blur effect | ✅ Implémenté | ✅ Garder |
| **Dot leaders** | ✅ | ✅ Implémenté | ✅ Garder |
| **Syntax highlighting** | ✅ Shiki | ❌ Basique | ⚠️ Implémenter |
| **OG Images** | ❌ | ✅ Dynamique | ✅ Garder |
| **JSON-LD** | ❌ | ✅ BlogPosting | ✅ Garder |
| **Reading time** | ❌ | ❌ | ⚠️ Optionnel |
| **Table of contents** | ❌ | ❌ | ⚠️ Optionnel |
| **Comments** | ❌ (Guestbook séparé) | ❌ | ❌ Pas nécessaire |
| **RSS Feed** | ❌ | ❌ | ⚠️ À considérer |
| **Prev/Next navigation** | ❌ | ❌ | ⚠️ À considérer |

---

## 8. Plan d'Implémentation

### Phase 1: Configuration MDX (Priorité Haute)

1. **Activer mdxRs avec GFM**
```typescript
// next.config.ts
experimental: {
  mdxRs: {
    mdxType: 'gfm',
  },
},
```

2. **Migrer les métadonnées vers export JS**
```typescript
// Avant (frontmatter)
---
title: "Mon titre"
date: "2026-01-05"
---

// Après (export JS)
export const metadata = {
  title: "Mon titre",
  date: "2026-01-05",
}
```

3. **Simplifier fetch.ts**
```typescript
// Utiliser import direct au lieu de compileMDX
const { metadata, default: MDXContent } = await import(`@/content/${slug}.mdx`)
```

### Phase 2: Syntax Highlighting (Priorité Haute)

1. **Installer Shiki**
```bash
bun add shiki
```

2. **Configurer next.config.ts**
```typescript
transpilePackages: ['shiki'],
```

3. **Créer le composant code async**
```typescript
// mdx-components.tsx
import { codeToHtml, createCssVariablesTheme } from 'shiki'

code: async ({ children, className }) => {
  if (typeof children !== 'string') return <code>{children}</code>

  const lang = className?.replace('language-', '') || 'text'
  const html = await codeToHtml(children, {
    lang,
    theme: createCssVariablesTheme({}),
  })

  return <code dangerouslySetInnerHTML={{ __html: html }} />
}
```

4. **Ajouter les CSS variables**
```css
/* globals.css */
code {
  --shiki-token-comment: #6a737d;
  --shiki-token-punctuation: #24292e;
  --shiki-token-keyword: #d73a49;
  --shiki-token-function: #6f42c1;
  --shiki-token-string: #032f62;
  --shiki-token-constant: #005cc5;
}
```

### Phase 3: Simplification Liste Blog (Priorité Moyenne)

1. **Refactorer app/blog/page.tsx**
```tsx
// Style minimaliste comme shud.in
{posts.map((post) => (
  <li key={post.metadata.slug}>
    <Link href={`/blog/${post.metadata.slug}`} className="group flex items-baseline gap-1">
      <span className="text-gray-900 group-hover:text-gray-600">{post.metadata.title}</span>
      <span className="dot-leaders flex-1" />
      <time className="text-gray-400 text-sm tabular-nums">
        {formatDate(post.metadata.date)}
      </time>
    </Link>
  </li>
))}
```

### Phase 4: Composant Card (Priorité Basse)

1. **Créer components/blog/card.tsx**
2. **Exporter dans mdx-components.tsx**
3. **Documenter l'utilisation**

---

## 9. Fichiers à Modifier

| Fichier | Modifications |
|---------|---------------|
| `next.config.ts` | Ajouter mdxRs, transpilePackages |
| `content/*.mdx` | Migrer frontmatter → export metadata |
| `app/blog/fetch.ts` | Simplifier avec import direct |
| `app/blog/page.tsx` | Simplifier le style de la liste |
| `app/blog/[slug]/page.tsx` | Adapter à la nouvelle structure |
| `mdx-components.tsx` | Ajouter Shiki, composant Card |
| `app/globals.css` | Variables CSS Shiki |
| `package.json` | Ajouter shiki |

---

## 10. Ce qu'on garde (nos avantages)

1. **OG Images dynamiques** - shud.in n'en a pas
2. **JSON-LD structured data** - Meilleur SEO
3. **Tags sur les articles** - Plus de contexte
4. **Système de publication** - Gestion published/draft
5. **Descriptions** - Utiles pour SEO et partage
6. **Localisation française** - Dates en français

---

## 11. Estimation de Complexité

| Phase | Complexité | Temps estimé |
|-------|------------|--------------|
| Phase 1: Config MDX | Moyenne | 2-3h |
| Phase 2: Shiki | Haute | 3-4h |
| Phase 3: Liste simplifiée | Basse | 1h |
| Phase 4: Card component | Basse | 1h |

**Total estimé: 7-9h de développement**

---

## 12. Checklist d'Implémentation

### Phase 1
- [x] Activer mdxRs dans next.config.ts
- [x] Migrer mon-premier-post.mdx vers export metadata
- [x] Adapter fetch.ts pour import direct
- [x] Tester la compilation

### Phase 2
- [ ] Installer shiki
- [ ] Configurer transpilePackages
- [ ] Créer composant code async
- [ ] Ajouter CSS variables
- [ ] Tester avec différents langages (js, tsx, css, bash)

### Phase 3
- [ ] Simplifier app/blog/page.tsx
- [ ] Supprimer les cards
- [ ] Ajouter style dot leaders
- [ ] Tester responsive

### Phase 4
- [ ] Créer Card component
- [ ] Exporter dans mdx-components
- [ ] Documenter l'utilisation
- [ ] Tester dans un article

---

## Appendix: Code de Référence shud.in

### mdx-components.tsx (extraits clés)
```typescript
// Voir fichier complet dans /tmp/shud-in-blog/mdx-components.tsx
```

### globals.css (dot-leaders + view transitions)
```css
.dot-leaders {
  text-align: end;
  height: 1em;
  overflow: hidden;
  word-wrap: break-word;
  letter-spacing: 6px;
}

.dot-leaders::after {
  content: '······································································';
}

@supports (view-transition-name: none) {
  @media not (prefers-reduced-motion: reduce) {
    ::view-transition-old(crossfade) {
      animation: hide 0.4s cubic-bezier(0.6, 0, 0.8, 1) forwards;
    }
    ::view-transition-new(crossfade) {
      opacity: 0;
      animation: appear .6s ease 0.2s forwards;
    }
  }
}
```
