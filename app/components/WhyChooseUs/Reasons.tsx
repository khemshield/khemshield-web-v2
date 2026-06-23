import CircledListItem from "./CircledListItem";

const reasons = [
  {
    title: "Proven Expertise",
    description:
      "Years of hands-on experience across cybersecurity and AI engineering, we bring a deep understanding of modern threats and intelligent systems to every project.",
  },
  {
    title: "Security & AI, End to End",
    description:
      "From threat detection and secure cloud foundations to AI-powered and agentic AI software, we deliver complete solutions tailored to your needs.",
  },
  {
    title: "Client-Centric Approach",
    description:
      "We prioritize your business goals and security, providing customized strategies and ongoing support to ensure your success.",
  },
  {
    title: "Commitment to Excellence",
    description:
      "Quality is at the core of everything we do, secure, reliable, and innovative solutions that protect your business and help you grow.",
  },
];

const Reasons = () => {
  return (
    <ul>
      {reasons.map((reason, i) => (
        <CircledListItem
          key={reason.title}
          heading={reason.title}
          number={i + 1}
        >
          {reason.description}
        </CircledListItem>
      ))}
    </ul>
  );
};

export default Reasons;
