import "../style.css";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white page-bg">
        <section className="text-center px-4">
          <button className="faqtitle rounded-full px-4 py-1 mb-6 border border-[#f9a96a]/40">
            • Blog
          </button>

          <h1 className="mb-4 monttitle text-center">
            Lorem ipsum dolor sit amet,
            <br />
            consectetur adipiscing elite
          </h1>

          <p className="monthsubtitle max-w-xl mx-auto mb-6 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <p className="monthfooter text-center">Month 00, YYYY</p>
        </section>
      </div>

      <section className="w-full flex justify-center bg-white ">
        <article className="w-full max-w-5xl px-6 md:px-0 text-center md:text-left">
          <p className="toptitle  mb-4 text-center md:text-left">Lorem ipsum</p>

          <h2 className="topsubtitle mb-6 text-center md:text-left">
            Lorem ipsum
            <br />
            dolor self amet
          </h2>

          <div className="space-y-6 topbody">
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

          <div className="space-y-6 topbody">
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
          <div className="space-y-6 topbody">
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
