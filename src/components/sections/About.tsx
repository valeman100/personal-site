import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal, Parallax } from "@/components/motion/scroll";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
          <Parallax>
            <Card className="overflow-hidden h-64 sm:h-80 md:h-full neon-shadow border neon-border bg-[--surface-muted]" />
          </Parallax>
          <div className="space-y-6">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">About me</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-zinc-600 dark:text-zinc-400">
                I’m an AI Developer and ML Project Lead at Joinrs (Rome, Italy).
                I innovate how talent connects with companies, building AI systems
                for information embedding, text recognition, semantic analysis,
                visual models, and data generation.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Career highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li>• 3+ years building web apps and AI integrations</li>
                    <li>• Led multiple launches reaching thousands of users</li>
                    <li>• Speaker and open-source contributor</li>
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


