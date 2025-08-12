import { Reveal, Parallax } from "@/components/motion/scroll";

export function Experience() {
  const items = [
    {
      role: "AI Developer / ML & AI Project Lead",
      company: "Joinrs — Milan, Italy",
      period: "Nov. 2022 — Current",
      desc:
        "Leading AI solutions across information embedding, OCR, semantic analysis, and data generation. Fine-tuned LLaMA, GPT, BERT with proprietary datasets. Expert OpenAI toolkit and prompt engineering for robust AI apps.",
    },
    {
      role: "Scraping Project Lead",
      company: "Joinrs",
      period: "Nov. 2022 — Current",
      desc:
        "Built large-scale scraping with Selenium; advanced Octoparse pipelines. Integrated scraped data into AI models to enhance datasets and automated information extraction.",
    },
    {
      role: "Stripe Payment Project Lead",
      company: "Joinrs",
      period: "Nov. 2022 — Current",
      desc:
        "Integrated and optimized Stripe payments with secure webhooks and queuing for reliable processing.",
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight mb-8">Experience</h2>
        </Reveal>
        <ol className="relative border-s border-zinc-200 dark:border-zinc-800">
          {items.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <Parallax>
                <li className="mb-10 ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-[--accent] text-[--accent-foreground] ring-2 ring-background shadow-[0_0_24px_rgba(56,189,248,0.4)]" />
                  <h3 className="font-semibold">
                    {item.role} — {item.company}
                  </h3>
                  <time className="block text-xs text-zinc-500">{item.period}</time>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </p>
                </li>
              </Parallax>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}


