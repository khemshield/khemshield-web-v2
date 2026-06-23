import { Book, CallCalling, DocumentText, Home, Share } from "iconsax-react";
import NavLink from "./NavLink";

const bottomNavsItems = [
  {
    icon: <Home />,
    text: "Home",
    href: "/",
  },
  {
    icon: <Share />,
    text: "Service",
    href: "/service",
  },
  {
    icon: <Book variant="Bulk" />,
    text: "Training",
    href: "/training",
  },
  {
    icon: <DocumentText />,
    text: "Blog",
    href: "/blog",
  },
  {
    icon: <CallCalling />,
    text: "Contact",
    href: "/contact",
  },
];

const BottomNavItems = () => {
  return (
    <ul className="flex items-center gap-8 xs:gap-14">
      {bottomNavsItems.map(({ text, icon, href }) => {
        return (
          <li key={text}>
            <NavLink href={href}>
              <div className="flex items-center flex-col ">
                <div>{icon}</div>
                <div>{text}</div>
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default BottomNavItems;
