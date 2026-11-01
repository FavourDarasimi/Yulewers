export type MenuItem = {
  name: string;
  note: string;
  price: number;
  /** 1 is warm, 3 is genuinely hot. Omitted when the dish carries no chilli. */
  heat?: 1 | 2 | 3;
  veg?: boolean;
};

export type MenuSection = {
  title: string;
  caption: string;
  items: MenuItem[];
};

/** Hand-grouped so the digits render identically on the server and the client. */
export function naira(amount: number): string {
  return `₦${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export const menu: MenuSection[] = [
  {
    title: "From the grill",
    caption: "Charcoal, yaji, and patience",
    items: [
      {
        name: "Beef suya",
        note: "Thin skewers rubbed in yaji, over coals until the edges catch. Onion and tomato to break the heat.",
        price: 4800,
        heat: 2,
      },
      {
        name: "Asun",
        note: "Goat roasted first, then tossed with scotch bonnet, onion and pepper. Order it with paper towels.",
        price: 6500,
        heat: 3,
      },
      {
        name: "Suya-spiced wings",
        note: "Six, glazed in yaji and honey at the end so they sting a little and stick a little.",
        price: 4200,
        heat: 2,
      },
      {
        name: "Charred plantain",
        note: "Split and grilled in the skin, served with ground pepper and a scrape of butter.",
        price: 1800,
        heat: 1,
        veg: true,
      },
    ],
  },
  {
    title: "Soups & stews",
    caption: "Pots that started at four",
    items: [
      {
        name: "Egusi and pounded yam",
        note: "Melon seed, spinach, smoked fish and assorted meat. The house standard.",
        price: 6800,
        heat: 2,
      },
      {
        name: "Efo riro",
        note: "Bitterleaf and spinach with locust bean, beef shin and a little palm oil for colour.",
        price: 6200,
        heat: 2,
      },
      {
        name: "Ofe nsala",
        note: "White soup with catfish and uziza. No pepper in the pot — add it yourself, slowly.",
        price: 6400,
        heat: 1,
      },
      {
        name: "Goat pepper soup",
        note: "Clear, peppery, and meant for the end of the evening rather than the start of the meal.",
        price: 5200,
        heat: 3,
      },
    ],
  },
  {
    title: "Rice & sides",
    caption: "Enough for the table to share",
    items: [
      {
        name: "Party jollof",
        note: "Long grain cooked down with tomato and red pepper, with the crust scraped off the pot.",
        price: 4500,
        heat: 2,
      },
      {
        name: "Ofada rice, ayamase",
        note: "Local rice under a green pepper stew with beef and smoked fish. Genuinely hot.",
        price: 5000,
        heat: 3,
      },
      {
        name: "Fried rice with shito",
        note: "Mixed vegetables and liver, with shito on the side rather than stirred through.",
        price: 4200,
        heat: 1,
      },
      {
        name: "Swallow",
        note: "Eba, semo, pounded yam or cassava fufu. Pounded yam is limited and goes first.",
        price: 2200,
      },
      {
        name: "Garden egg salad",
        note: "Roasted and mashed with red oil, onion and a squeeze of lime.",
        price: 1800,
        veg: true,
      },
    ],
  },
  {
    title: "Drinks",
    caption: "Cold, and refilled",
    items: [
      {
        name: "Zobo",
        note: "Hibiscus steeped with ginger and cloves, lightly sweetened and served over ice.",
        price: 1500,
        veg: true,
      },
      {
        name: "Chapman",
        note: "Grenadine, blackcurrant, citrus and cucumber. The house pour is tall.",
        price: 2200,
        veg: true,
      },
      {
        name: "Palm wine",
        note: "Three days a week, straight from Ikorodu. Ask whether it has arrived.",
        price: 1800,
      },
      {
        name: "Kunu zaki",
        note: "Tiger nut and millet, thick enough to need a spoon as well as a glass.",
        price: 1400,
        veg: true,
      },
      {
        name: "Malt or soft drinks",
        note: "Bottle-cold, and the only thing on the board nobody argues about.",
        price: 1000,
        veg: true,
      },
    ],
  },
];

export const orderSteps = [
  {
    title: "Choose a pot",
    body: "One soup or stew is the working assumption. Two is not judged.",
  },
  {
    title: "Choose a swallow",
    body: "Pounded yam if you got here early, eba if you want to stay late.",
  },
  {
    title: "Choose something cold",
    body: "Zobo or Chapman. The grill will keep sending plates either way.",
  },
];
