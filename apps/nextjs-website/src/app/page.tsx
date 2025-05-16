import {
  Github,
  Menu,
  Twitter,
  Linkedin,
  ChromeIcon,
  Globe,
  Earth,
} from "lucide-react";
import { LofiTabUnwrapped } from "@repo/ui/components/lofi-tab";
import Link from "next/link";
import { TodosList } from "@repo/ui/components/todos-dropdown";
import ClockComponent from "@repo/ui/components/clock";
import Weather from "@repo/ui/components/weather";
import { SettingsProvider } from "@repo/ui/providers/settings-provider";
import { BackgroundSelection } from "@repo/ui/components/background-select-dropdown";

export const dynamic = "force-static";

export const metadata = {
  title: "Lofi Tab 🐈‍⬛🎧",
  description:
    "Transform your new tab into a productive and calming lofi experience with todos, weather, clock, and beautiful backgrounds.",
};

export default function LandingPage() {
  return (
    <SettingsProvider>
      <main className="w-full h-full flex flex-col gap-10 scroll-smooth">
        <Header />
        <HeroSection />
        <Features />
        <CallToAction />
        <Footer />
      </main>
    </SettingsProvider>
  );
}

const EDGE_STORE_LINK =
  "https://microsoftedge.microsoft.com/addons/detail/lofi-tab/gbgclbncjalkkdnecbhnjpldcabjdedg";

const CHROME_STORE_LINK =
  "https://chromewebstore.google.com/detail/lofi-tab/oidccjhecgdgchankoghgcfkafoeeedn";

const FIREFOX_STORE_LINK = "https://addons.mozilla.org/firefox/addon/lofi-tab/";

const StoreLink = ({
  text,
  link,
  extraClassName,
  icon,
  type = "button",
}: {
  text: string;
  link: string;
  extraClassName?: string;
  icon: "chrome" | "edge" | "firefox";
  type?: "button" | "link";
}) => {
  const Icon = {
    chrome: ChromeIcon,
    edge: Globe,
    firefox: Earth,
  }[icon];

  const styleType = {
    button: "btn btn-primary",
    link: "link link-hover",
  }[type];

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styleType} ${extraClassName}`}
    >
      {text} <Icon className="w-5 h-5" />
    </a>
  );
};

const Header = () => {
  const menuItems = (
    <>
      <li>
        <a href="#features">Features</a>
      </li>
      <li>
        <Link href="/try" target="_blank">
          Try
        </Link>
      </li>
      <li className="md:hidden">
        <StoreLink
          icon="chrome"
          text="Add to Chrome"
          link={CHROME_STORE_LINK}
          type="link"
        />
      </li>
      <li className="md:hidden">
        <StoreLink
          icon="edge"
          text="Add to Edge"
          link={EDGE_STORE_LINK}
          type="link"
        />
      </li>
      <li className="md:hidden">
        <StoreLink
          icon="firefox"
          text="Add to Firefox"
          link={FIREFOX_STORE_LINK}
          type="link"
        />
      </li>
    </>
  );

  const mobile = (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
        <Menu className="w-5 h-5" />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-2"
      >
        {menuItems}
      </ul>
    </div>
  );

  const desktop = (
    <ul className="menu menu-horizontal hidden md:flex md:w-full md:items-center">
      {menuItems}
    </ul>
  );

  return (
    <div className="navbar shadow-sm container mx-auto sticky">
      <div className="navbar-start">
        {mobile}
        <a className="btn btn-ghost text-xl p-0">Lofi Tab 🐈‍⬛</a>
        {desktop}
      </div>
      <div className="flex gap-4 ml-auto">{/* Content to the right */}</div>
    </div>
  );
};

const HeroSection = () => (
  <section className="flex flex-col 2xl:flex-row container mx-auto items-center p-5 gap-10">
    <div className="w-full">
      <h1 className="text-5xl font-bold">Lofi Tab</h1>
      <p className="py-6 text-xl">
        Transform your new tab into a productive and calming lofi experience
        with todos, weather, clock, and beautiful backgrounds.
      </p>
      <div className="flex flex-col gap-2 md:flex-row lg:gap-4">
        <StoreLink
          icon="chrome"
          text="Add to Chrome"
          link={CHROME_STORE_LINK}
        />
        <StoreLink icon="edge" text="Add to Edge" link={EDGE_STORE_LINK} />
        <StoreLink
          icon="firefox"
          text="Add to Firefox"
          link={CHROME_STORE_LINK}
        />
        <Link href="/try" target="_blank" className="btn btn-outline">
          Try without installing
        </Link>
      </div>
      <div className="mt-4 flex items-center">
        <div className="rating rating-sm">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            checked
            readOnly
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            checked
            readOnly
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            checked
            readOnly
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            checked
            readOnly
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            checked
            readOnly
          />
        </div>
        <span className="ml-2 text-sm">4.8 (20+ reviews)</span>
        <span className="ml-4 text-sm">1,000+ users</span>
      </div>
    </div>
    <Preview />
  </section>
);

const Preview = () => (
  <div className="mockup-browser border-base-300 border w-full">
    <div className="mockup-browser-toolbar">
      <div className="input">
        <Link href="/try" target="_blank">
          https://lofitab.com/try
        </Link>
      </div>
    </div>
    <div className="border-t border-base-300 h-100">
      <LofiTabUnwrapped />
    </div>
  </div>
);

const FEATURES = [
  {
    title: "Todos ✍️",
    description:
      "Keep track of your tasks directly from your new tab. Simple and effective todo management.",
    component: () => <TodosList />,
  },
  {
    title: "Clock 🕑",
    description:
      "Always know the time with a customizable clock in either 12 or 24-hour format.",
    component: ClockComponent,
  },
  {
    title: "Weather 🌤️",
    description:
      "Get current weather information right on your new tab. No need to open another app.",
    component: () => (
      <Weather
        stylesProps={{
          sectionClassNames: "tooltip-bottom!",
          tempClassNames: "text-7xl md:text-9xl",
        }}
      />
    ),
  },
  {
    title: "Lofi Backgrounds 🖼️",
    description:
      "Choose from over 30 beautiful lofi backgrounds to customize your new tab experience.",
    component: () => (
      <div className="w-70 h-50 md:w-[500px] md:h-96 shadow-md overflow-y-scroll bg-base-300 p-1 flex flex-col gap-2">
        <BackgroundSelection />
      </div>
    ),
  },
  {
    title: "Lightweight ⚡",
    description:
      "Optimized for performance. Won't slow down your browser or consume excessive resources.",
    component: SizeComparisonComponent,
  },
];

const Features = () => (
  <section id="features" className="container mx-auto px-4 py-10">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Features</h2>
      <p className="text-lg max-w-2xl mx-auto text-base-content/80">
        Everything you need to make your new tab productive and beautiful
      </p>
    </div>
    <div className="flex flex-col gap-16">
      {FEATURES.map(({ title, description, component: Component }, index) => {
        const flex = index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row";
        return (
          <div className="card bg-base-200 shadow-lg" key={title}>
            <div className="card-body">
              <div className={`flex flex-col ${flex} items-center`}>
                <div className="w-full md:w-1/2 p-6 md:p-8">
                  <h3 className="card-title text-2xl mb-4">{title}</h3>
                  <p className="text-base-content/80 text-xl">{description}</p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center p-6">
                  <Component />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

function SizeComparisonComponent() {
  const extensions = [
    {
      name: "Lofi Tab",
      size: "800kb",
      color: "bg-green-500",
      textColor: "text-green-500",
      percentage: 4,
    },
    {
      name: "Infinity New Tab",
      size: "5MB",
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      percentage: 26,
    },
    {
      name: "Momentum",
      size: "19MB",
      color: "bg-red-500",
      textColor: "text-red-500",
      percentage: 100,
    },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center">
            Lightweight <span className="text-yellow-400 ml-1">⚡</span>
          </h3>
        </div>

        {extensions.map((ext, index) => (
          <div key={index} className="mb-5">
            <div className="flex justify-between mb-1">
              <span
                className={`text-sm font-bold ${ext.name === "Lofi Tab" ? "text-green-500" : ""}`}
              >
                {ext.name}
              </span>
              <span className={`text-sm font-bold ${ext.textColor}`}>
                {ext.size}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative">
              <div
                className={`${ext.color} h-3 rounded-full`}
                style={{ width: `${ext.percentage}%` }}
              ></div>
              {ext.name === "Lofi Tab" && (
                <div className="absolute -top-5 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-md font-bold">
                  800kb - 95% smaller!
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs">Lightweight</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs">Heavy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CallToAction = () => (
  <section>
    <div className="container mx-auto px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to transform your new tab?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-2 lg:gap-4">
          <StoreLink
            icon="chrome"
            text="Add to Chrome"
            link={CHROME_STORE_LINK}
          />
          <StoreLink icon="edge" text="Add to Edge" link={EDGE_STORE_LINK} />
          <StoreLink
            icon="firefox"
            text="Add to Firefox"
            link={FIREFOX_STORE_LINK}
          />
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="text-neutral-content">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="footer-title text-lg font-bold mb-4">LofiTab</h3>
          <p className="max-w-xs text-neutral-content/70">
            Transform your new tab into a productive and calming lofi experience
            with the most lightweight extension available.
          </p>
          <div className="mt-4">
            <p>© {new Date().getFullYear()} LofiTab. All rights reserved.</p>
          </div>
        </div>

        <div>
          <h3 className="footer-title text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                className="hover:text-primary transition-colors"
                href="#features"
              >
                Features
              </a>
            </li>
            <li>
              <Link
                className="hover:text-primary transition-colors"
                href="/try"
                target="_blank"
              >
                Try
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer-title text-lg font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy (wip)
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer-title text-lg font-bold mb-4">
            Connect With Me
          </h3>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://x.com/reynnanviktor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm btn-ghost"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/reynnan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm btn-ghost"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/reynnan-viktor/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm btn-ghost"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-neutral-content/70">
            Have questions or feedback? <br />
            support@lofitab.com
          </p>
        </div>
      </div>
    </div>
  </footer>
);
