import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/ui/VideoCard";

const videos = [
  { title: "Ennen ja jälkeen", tag: "Muutos" },
  { title: "Näin muotoilet hiukset 30 sekunnissa", tag: "Vinkki" },
  { title: "Fluffy Hair -rutiini", tag: "Rutiini" },
  { title: "Texture Spray käytössä", tag: "Tuote" },
  { title: "Parturin vinkki", tag: "Kosti" },
  { title: "Asiakkaan muodonmuutos", tag: "Lopputulos" }
];

export function VideoSection() {
  return (
    <section className="bg-ink px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tone="light"
          title="Näe tuotteet käytössä"
          description="Nopeat rutiinit, aidot lopputulokset ja vinkit suoraan parturilta."
        />
        <div className="mt-12 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {videos.map((video) => (
            <VideoCard image="/images/routines/social-routine.png" key={video.title} tag={video.tag} title={video.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
