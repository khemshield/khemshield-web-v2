import Dropdown from "../Menus/Dropdown";
import NavLink from "./NavLink";

const navsItems = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Training",
    href: "/training",
  },

  // {
  //   text: "Project",
  //   href: "/project",
  // },
  {
    text: "Service",
    href: "/service",
  },
  {
    text: "Contact",
    href: "/contact",
  },
  {
    text: "More",
    href: "/contact",
    isDropdown: true,
    items: [
      {
        text: "About",
        href: "/about",
      },
      {
        text: "Events",
        href: "/event",
      },
      // {
      //   text: "Events",
      //   href: "/event",
      // },
      // {
      //   text: "Blog",
      //   href: "/blog",
      // },
      {
        text: "Faq",
        href: "/faq",
      },
    ],
  },
];

const NavItems = () => {
  return (
    <ul
      className="hidden items-center gap-14
    lg:flex"
    >
      {navsItems.map(({ text, href, isDropdown, items }) => {
        if (isDropdown)
          return (
            <Dropdown
              key={text}
              text={text}
              items={items.map((item) => (
                <NavLink href={item.href} key={item.text}>
                  {item.text}
                </NavLink>
              ))}
            />
          );
        return (
          <li key={text}>
            <NavLink href={href}>{text}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
