import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";

export default function NotFound() {
  return (
    <main id="main" className="surface-dark flex flex-1 flex-col" data-theme="dark">
      <Container className="flex flex-1 flex-col justify-center pb-24 pt-[calc(var(--nav-h)+4rem)]">
        <FadeIn trigger="mount" delay={0.2} y={8} className="flex items-center gap-3">
          <Label tone="fg">404</Label>
          <Label>— Route not found</Label>
        </FadeIn>
        <RevealText
          as="h1"
          trigger="mount"
          delay={0.35}
          lines={["This endpoint", "returns nothing."]}
          className="mt-8 text-display-xl uppercase"
        />
        <FadeIn trigger="mount" delay={0.9} className="mt-10 flex flex-wrap items-center gap-6">
          <Button href="/">Back to the system</Button>
          <Link href="/#work" className="label link-underline text-muted hover:text-fg">
            Selected work
          </Link>
        </FadeIn>
      </Container>
    </main>
  );
}
