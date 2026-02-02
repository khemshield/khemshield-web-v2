import SideDrawer from "../components/Navigation/SideDrawer";

const items = [
  // {
  //   text: "Project",
  //   href: "/project",
  //   icon: undefined,
  // },
  {
    text: "About",
    href: "/about",
    icon: undefined,
  },
  {
    text: "FAQs",
    href: "/faq",
    icon: undefined,
  },
  // {
  //   text: "Blog",
  //   href: "/blog",
  //   icon: undefined,
  // },
  {
    text: "Events",
    href: "/event",
    icon: undefined,
  },
];

const SideDrawerItems = () => {
  return <SideDrawer items={items} />;
};

export default SideDrawerItems;
