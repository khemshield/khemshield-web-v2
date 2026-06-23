import BaseSpacing from "../Spacing/BaseSpacing";
import NavLink from "../Navigation/NavLink";

const items = [
  {
    text: "About Us",
    href: "/about",
  },
  {
    text: "Contact us",
    href: "/contact",
  },
  {
    text: "Service",
    href: "/service",
  },
];
const FooterCompany = () => {
  return (
    <section>
      <h4 className="font-display text-lg font-semibold text-white">Company</h4>
      <BaseSpacing />
      <ul>
        {items.map(({ text, href }) => (
          <li key={text} className="my-2 text-white/70">
            <NavLink href={href}>{text}</NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FooterCompany;
