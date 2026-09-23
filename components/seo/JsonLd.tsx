import { site } from "@/data/site";

/** Person + WebSite structured data. */
export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    email: `mailto:${site.email}`,
    knowsAbout: [
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Celery",
      "AI automation",
      "LLM tool calling",
      "System architecture",
    ],
    sameAs: site.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    author: { "@type": "Person", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
