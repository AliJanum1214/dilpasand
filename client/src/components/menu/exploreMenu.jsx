import Link from "next/link";

export default function ExploreMenu() {
  return (
    <div className="bg-transparent text-white py-6 px-4 flex items-center justify-center">
      <div className="flex items-center w-full sm:max-w-xl md:max-w-4xl max-[1280px]:max-w-4xl max-[1330px]:max-w-6xl max-[1440px]:max-w-7xl">
        <div className="flex-grow border-t-2 custom-border" />
        <Link
          href="/Dilpasand Menu.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 text-lg md:text-[20px]  italic text-white whitespace-nowrap hover:underline"
        >
          Explore Full Menu
        </Link>
        <div className="flex-grow border-t-2 custom-border" />
      </div>
    </div>
  );
}
