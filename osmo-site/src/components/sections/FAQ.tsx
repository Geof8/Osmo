"use client";

import FadeUp from "@/components/FadeUp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS, FONTS } from "@/lib/constants";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-b border-[var(--rule)] relative z-[5]"
      style={{ padding: "80px 0" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
          <FadeUp>
            <div
              className="text-[var(--ink-2)] mb-5 lg:mb-7"
              style={{
                fontFamily: FONTS.mono,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              FAQ
            </div>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: "clamp(36px, 5vw, 72px)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
              }}
            >
              Questions
              <br />
              <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontStyle: "normal" }}>
                fréquentes.
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Accordion type="single" collapsible className="border-t border-[var(--rule)]">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>
                    <span
                      style={{
                        fontFamily: FONTS.display,
                        fontWeight: 600,
                        fontSize: "clamp(18px, 1.4vw, 22px)",
                        letterSpacing: "-0.02em",
                        color: "var(--ink)",
                      }}
                    >
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p
                      className="text-[var(--ink-2)]"
                      style={{
                        maxWidth: 620,
                        fontSize: 15,
                        lineHeight: 1.65,
                      }}
                    >
                      {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
