import Image from "next/image";

interface BannerImageProps {
  src: string;
  alt: string;
  href: string;
  ariaLabel: string;
}

export default function BannerImage({ src, alt, href, ariaLabel }: BannerImageProps) {
  return (
    <section className="relative py-16" style={{ zIndex: 2 }}>
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <a
          href={href}
          aria-label={ariaLabel}
          className="block overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(2,44,34,0.25)] transition-transform duration-200 hover:scale-[1.01]"
        >
          <Image
            src={src}
            alt={alt}
            width={2752}
            height={1536}
            className="h-auto w-full"
            sizes="(max-width: 1100px) 100vw, 1100px"
          />
        </a>
      </div>
    </section>
  );
}
