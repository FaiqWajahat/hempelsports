import Image from "next/image";
import Link from "next/link";
import AboutHero from "./AboutHero";
import AboutStory from "./AboutStory";
import AboutValues from "./AboutValues";
import AboutCTA from "./AboutCTA";

export const metadata = {
  title: "About Hempel Sports | Manufacturing Excellence",
  description: "Learn about Hempel Sports, our manufacturing history, and our commitment to premium sportswear production.",
};

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero Section for About Page */}
      <AboutHero />

      {/* 2. Brand Story & History */}
      <AboutStory />

      {/* 3. Core Values / Manufacturing Edge */}
      <AboutValues />

      {/* 4. Final CTA */}
      <AboutCTA />
    </>
  );
}
