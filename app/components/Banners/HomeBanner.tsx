import Button from "../Buttons/Button";
import DefenseConsole from "./DefenseConsole";

const capabilities = [
  "24/7 monitoring",
  "Secure-by-design",
  "Cloud foundations",
  "Mentor-led training",
];

const HomeBanner = () => {
  return (
    <section className="relative -mt-10 overflow-hidden bg-ink text-white">
      {/* brand-red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(244,51,52,0.16),transparent_62%)]"
      />

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/55">
            Cybersecurity <span className="text-primary-normal">&times;</span> AI
            &nbsp;/&nbsp; Defend &middot; Build &middot; Train
          </p>

          <h1 className="mt-6 font-display text-[2.9rem] font-extrabold leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-[4.6rem]">
            Builders <span className="text-primary-normal">&amp;</span> Defenders
            <span className="block font-medium tracking-[-0.035em] text-white/55">
              for the AI era.
            </span>
          </h1>

          <p className="mt-6 max-w-[46ch] leading-relaxed text-white/65">
            KhemShield defends your systems, builds secure web, mobile, and
            AI-powered software on solid cloud foundations, and trains the people
            who&apos;ll do the same.
          </p>

          <div className="mt-7 flex flex-col gap-4 xs:flex-row">
            <Button
              elementType="link"
              href="/request"
              variant="primary"
              styles="text-sm lg:text-base"
            >
              Get a consultation
            </Button>
            <Button
              elementType="link"
              href="/training"
              variant="border"
              styles="text-sm lg:text-base !border-white/30 !text-white hover:!border-white"
            >
              Explore training &rarr;
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-white/10 pt-5">
            {capabilities.map((cap) => (
              <span
                key={cap}
                className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/55"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-primary-normal" />
                {cap}
              </span>
            ))}
          </div>
        </div>

        <DefenseConsole />
      </div>
    </section>
  );
};

export default HomeBanner;
