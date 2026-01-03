import "../style.css";
import SiteHero from "@/components/site/SiteHero";
import Badge from "@/components/ui/Badge";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <SiteHero>
        <Badge>Blog</Badge>

        <h1 className="mb-8">
          Lorem ipsum dolor sit amet,
          <br />
          consectetur adipiscing elite
        </h1>

        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <p className="text-xs sm:text-sm text-[#6B6B6B]">Month 00, YYYY</p>
      </SiteHero>

      <section className="w-full flex justify-center bg-white ">
        <article className="w-full max-w-5xl px-6 md:px-0 text-center md:text-left">
          <p className="toptitle mb-4 text-center md:text-left text-xs sm:text-sm text-[#6B6B6B]">
            Lorem ipsum
          </p>

          <h2 className="topsubtitle mb-6 text-center md:text-left">
            Lorem ipsum
            <br />
            dolor self amet
          </h2>

          <div className="space-y-6 topbody text-sm sm:text-base text-[#5C5C5C]">
            {Array.from({ length: 5 }).map((_, i) => (
              <p key={i} className="mar-btm">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
            ))}
          </div>
        </article>
      </section>
      <section className="w-full flex justify-center bg-white py-16">
        <div className="w-full max-w-5xl px-6 md:px-0">
          <div className="rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <img
              src="/dummy/test.png"
              alt="Blog illustration"
              className="w-full h-[340px] md:h-[420px] object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center bg-white ">
        <article className="w-full max-w-5xl px-6 md:px-0 text-center md:text-left">
          <h2 className="topsubtitle mb-6 text-center md:text-left">
            Lorem ipsum
            <br />
            dolor self amet
          </h2>

          <div className="space-y-6 topbody text-sm sm:text-base text-[#5C5C5C]">
            {Array.from({ length: 5 }).map((_, i) => (
              <p key={i} className="mar-btm">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
            ))}
          </div>
          <div className="space-y-6 topbody text-sm sm:text-base text-[#5C5C5C]">
            {Array.from({ length: 5 }).map((_, i) => (
              <p key={i} className="mar-btm">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
