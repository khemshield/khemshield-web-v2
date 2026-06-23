import BaseSpacing from "../Spacing/BaseSpacing";

const items = [
  {
    text: "Cyber Security",
  },
  {
    text: "AI Engineering",
  },
  {
    text: "Agentic AI",
  },
  {
    text: "Web Development",
  },
  {
    text: "Mobile Development",
  },
];

const FooterServices = () => {
  return (
    <div>
      <h4 className="font-display text-lg font-semibold text-white">Services</h4>
      <BaseSpacing />
      <ul>
        {items.map(({ text }) => (
          <li key={text} className="my-2 text-white/70">
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterServices;
