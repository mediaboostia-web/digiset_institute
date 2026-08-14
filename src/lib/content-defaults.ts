/**
 * Définition finie des blocs de contenu éditables du mini-CMS (Feature 4).
 * Partagée entre l'éditeur admin (`/admin/pages`) et les pages publiques
 * correspondantes, pour que la valeur par défaut affichée avant toute
 * édition soit strictement identique des deux côtés (pas de copie dupliquée
 * qui pourrait diverger).
 */

export type ContentBlockType = "text" | "textarea" | "image_url";

export interface ContentBlockDef {
  key: string;
  label: string;
  type: ContentBlockType;
  defaultValue: string;
}

export interface PageContentDef {
  pageKey: string;
  label: string;
  blocks: ContentBlockDef[];
}

export const PAGE_CONTENT_DEFS: PageContentDef[] = [
  {
    pageKey: "home",
    label: "Accueil",
    blocks: [
      {
        key: "hero_badge",
        label: "Badge du Hero",
        type: "text",
        defaultValue: "Bienvenue à DigiSET Institute — Akanda, Gabon",
      },
      {
        key: "hero_subtitle",
        label: "Sous-titre du Hero",
        type: "textarea",
        defaultValue:
          "DigiSET Institute forme les futurs experts en Intelligence Artificielle, Cybersécurité et Systèmes de Paiement Électronique (Monétique).",
      },
      {
        key: "hero_image_url",
        label: "Image du Hero (grand format)",
        type: "image_url",
        defaultValue: "/images/img/Hero_image1.jpg",
      },
      {
        key: "mission_axis_1_title",
        label: "Axe 1 — Titre",
        type: "text",
        defaultValue: "Exigence Académique ECTS",
      },
      {
        key: "mission_axis_1_text",
        label: "Axe 1 — Texte",
        type: "textarea",
        defaultValue:
          "Des cursus rigoureux alignés sur les standards européens avec 60 ECTS par an, garantissant la transférabilité internationale du diplôme et les poursuites d'études en cycle ingénieur.",
      },
      {
        key: "mission_axis_2_title",
        label: "Axe 2 — Titre",
        type: "text",
        defaultValue: "Laboratoires TP Haute Technologie",
      },
      {
        key: "mission_axis_2_text",
        label: "Axe 2 — Texte",
        type: "textarea",
        defaultValue:
          "Des plateaux scientifiques de pointe équipés en optique, électricité, serveurs sous Linux/Python et bancs de cybersécurité SOC accessibles dès la 1ère année d'études.",
      },
      {
        key: "mission_axis_3_title",
        label: "Axe 3 — Titre",
        type: "text",
        defaultValue: "Partenariats Certifiants",
      },
      {
        key: "mission_axis_3_text",
        label: "Axe 3 — Texte",
        type: "textarea",
        defaultValue:
          "Intégration directe des examens de certification mondiaux Cisco, Microsoft, AWS, Linux LPIC et CompTIA Security+ dans le cursus académique.",
      },
    ],
  },
  {
    pageKey: "institution",
    label: "Institution",
    blocks: [
      { key: "hero_badge", label: "Badge du Hero", type: "text", defaultValue: "Stratégie & Institution" },
      {
        key: "hero_title",
        label: "Titre du Hero",
        type: "text",
        defaultValue: "Institution, Gouvernance & Partenaires",
      },
      {
        key: "hero_subtitle",
        label: "Sous-titre du Hero",
        type: "textarea",
        defaultValue:
          "Découvrez la structure organisationnelle de DigiSET Institute, son équipe dirigeante en 3 rangs hiérarchiques et ses alliances technologiques internationales.",
      },
      {
        key: "hero_image_url",
        label: "Image de fond du Hero",
        type: "image_url",
        defaultValue: "/images/img/Background-image.jpg",
      },
    ],
  },
  {
    pageKey: "programmes",
    label: "Programmes",
    blocks: [
      { key: "hero_badge", label: "Badge du Hero", type: "text", defaultValue: "Catalogue des Formations" },
      {
        key: "hero_title",
        label: "Titre du Hero",
        type: "text",
        defaultValue: "Explorez nos Cursus Académiques et Certifiants",
      },
      {
        key: "hero_subtitle",
        label: "Sous-titre du Hero",
        type: "textarea",
        defaultValue:
          "De la Classe Préparatoire MP2I à nos Licences Professionnelles et Formations Continues, découvrez l'offre d'excellence de DigiSET Institute.",
      },
      {
        key: "hero_image_url",
        label: "Image de fond du Hero",
        type: "image_url",
        defaultValue: "/images/img/Background-image.jpg",
      },
    ],
  },
];

export function getPageContentDef(pageKey: string): PageContentDef | undefined {
  return PAGE_CONTENT_DEFS.find((def) => def.pageKey === pageKey);
}

/**
 * Fusionne les blocs récupérés depuis /api/content-blocks avec les valeurs
 * par défaut codées en dur de la page — un bloc absent ou vide retombe
 * toujours sur son défaut, jamais sur une chaîne vide.
 */
export function mergeContentValues(
  pageKey: string,
  fetchedBlocks: { block_key: string; value: string | null }[],
): Record<string, string> {
  const def = getPageContentDef(pageKey);
  const values: Record<string, string> = {};
  if (!def) return values;

  for (const block of def.blocks) values[block.key] = block.defaultValue;
  for (const block of fetchedBlocks) {
    if (block.value) values[block.block_key] = block.value;
  }
  return values;
}
