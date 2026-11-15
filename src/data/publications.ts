/**
 * Publications listed on /publications, newest first.
 * Metadata checked against Crossref and UPCommons.
 */
export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "Journal" | "Conference" | "Thesis";
  links: { label: string; href: string }[];
  /** File name (or its ending) of a related project post. */
  post?: string;
}

/** How my name appears in author lists; it is highlighted on the page. */
export const SELF = "Marc Monfort Grau";

export const publications: Publication[] = [
  {
    title:
      "On-Device Training of Machine Learning Models on Microcontrollers with Federated Learning",
    authors: [
      "Nil Llisterri Giménez",
      "Marc Monfort Grau",
      "Roger Pueyo Centelles",
      "Felix Freitag",
    ],
    venue: "Electronics, 11(4), 573",
    year: 2022,
    type: "Journal",
    links: [
      { label: "Open Access", href: "https://doi.org/10.3390/electronics11040573" },
      {
        label: "Code",
        href: "https://github.com/marcmonfort/TinyML-FederatedLearning",
      },
    ],
    post: "tinyml-fl",
  },
  {
    title:
      "On-Device Training of Machine Learning Models on Microcontrollers With a Look at Federated Learning",
    authors: ["Marc Monfort Grau", "Roger Pueyo Centelles", "Felix Freitag"],
    venue:
      "Proceedings of the Conference on Information Technology for Social Good (GoodIT '21), ACM, pp. 198–203",
    year: 2021,
    type: "Conference",
    links: [{ label: "DOI", href: "https://doi.org/10.1145/3462203.3475896" }],
    post: "tinyml-fl",
  },
  {
    title: "TinyML: From Basic to Advanced Applications",
    authors: ["Marc Monfort Grau"],
    venue:
      "Bachelor's thesis, Universitat Politècnica de Catalunya (UPC). Advisors: Felix Freitag, Roger Pueyo Centelles",
    year: 2021,
    type: "Thesis",
    links: [
      {
        label: "Open Access",
        href: "https://upcommons.upc.edu/entities/publication/a2172dd2-5b6b-4e24-a714-4930d6122bcc",
      },
    ],
    post: "tinyml-fl",
  },
];
