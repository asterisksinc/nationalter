import Link from "next/link";
import Image from "next/image";

export const SignupNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200 flex items-center justify-between  z-50">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="NationCite"
          width={120}
          height={150}
          className=" w-auto"
        />
      </Link>
      <div className="flex items-center gap-3">
        <span className="text-sm text-neutral-600">
          Already have an account?
        </span>
        <Link
          href="/signin"
          className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-warm-200)] transition-colors px-4 py-2 rounded-lg hover:bg-orange-50"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};
