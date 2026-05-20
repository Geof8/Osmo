"use client";

import FadeUp from "@/components/ui/FadeUp";
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
      className="scroll-mt-20 relative z-[5]"
      style={{ padding: "clamp(72px, 10vw, 100px) 0", borderBottom: "1px solid #E8E8E8" }}
    >
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">
          <FadeUp>
            <div
              className="mb-6 lg:mb-8"
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#999999",
              }}
            >
              FAQ
            </div>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: "clamp(28px, 7vw, 72px)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
                color: "#111111",
              }}
            >
              Questions
              <br />
              <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontStyle: "italic", color: "#111111" }}>
                fréquentes.
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Accordion type="single" collapsible className="flex flex-col gap-0">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>
                    <span
                      className="pr-4"
                      style={{
                        fontFamily: FONTS.display,
                        fontWeight: 500,
                        fontSize: "clamp(15px, 3.8vw, 22px)",
                        lineHeight: 1.35,
                        letterSpacing: "-0.02em",
                        color: "#111111",
                        textAlign: "left",
                      }}
                    >
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p
                      style={{
                        maxWidth: 620,
                        fontSize: "clamp(14px, 3.4vw, 16px)",
                        lineHeight: 1.7,
                        color: "#444444",
                        fontFamily: FONTS.body,
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
