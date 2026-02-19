import Link from "next/link";

export default function MenuLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link href={href} className="text-[1rem] font-medium no-underline transition-colors duration-200">
      {label}
    </Link>
  );
}
