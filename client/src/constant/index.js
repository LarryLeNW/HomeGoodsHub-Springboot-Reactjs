import ICONS from "utils/icons";
import paths from "./path";

export const MemberSidebar = [
    {
        id: 1,
        type: "SINGLE",
        text: "Profile",
        path: paths.MEMBER.PROFILE,
        icon: <ICONS.AiFillDashboard />,
    },
    {
        id: 3,
        type: "SINGLE",
        text: "Buys history",
        path: paths.MEMBER.HISTORY,
        icon: <ICONS.TbPackages />,
    },
];


export const ProductExtraInformation = [
    {
        id: 1,
        title: "Guarantee",
        sub: "Quality checked",
        icon: <ICONS.BsShieldShaded />,
    },
    {
        id: 2,
        title: "Free Shipping",
        sub: "Free on all products",
        icon: <ICONS.RiTruckFill />,
    },
    {
        id: 3,
        title: "Special gift cards",
        sub: "Special gift cards",
        icon: <ICONS.AiFillGift />,
    },
    {
        id: 4,
        title: "Free return",
        sub: "Within 7 days",
        icon: <ICONS.BsReplyFill />,
    },
    {
        id: 5,
        title: "Consultancy",
        sub: "Lifetime 24/7/356",
        icon: <ICONS.FaTty />,
    },
];

// for ProductDetail page
export const DescriptionProductTabs = [
    {
        id: 0,
        name: "DESCRIPTION",
        content: "content description",
    },
    {
        id: 1,
        name: "WARRANTY",
        content: "content WARRANTY",
    },
    {
        id: 2,
        name: "DELIVERY",
        content: "content DELIVERY",
    },
    {
        id: 3,
        name: "PAYMENT",
        content: "content PAYMENT",
    },
    {
        id: 4,
        name: "CUSTOMER REVIEW",
        content: "content CUSTOMER REVIEW",
    },
];