import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import AdSlot from "@/components/AdSlot";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout breadcrumbs={[{ label: "Blog", path: "/blog" }, { label: "Not found" }]}>
        <div className="max-w-3xl mx-auto text-center py-16">
          <h1 className="text-2xl font-bold mb-3">Article not found</h1>
          <Link to="/blog" className="text-primary">Back to the blog</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout breadcrumbs={[{ label: "Blog", path: "/blog" }, { label: post.title }]}>
      <PageSEO
        title={`${post.title} | ConvertHub`}
        description={post.description}
        path={`/blog/${post.slug}`}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { "@type": "Organization", name: "Quedroom Team" },
          publisher: { "@type": "Organization", name: "ConvertHub" },
          mainEntityOfPage: `https://unitconverterquedroom.lovable.app/blog/${post.slug}`,
        }}
      />
      <AdSlot slot="top" />
      <article className="prose-seo max-w-3xl mx-auto">
        <p className="text-xs text-primary font-medium mb-2">{post.category} · {post.readingTime}</p>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.body.map((section, i) => (
          <section key={i}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </section>
        ))}

        <AdSlot slot="below-tool" />

        <aside className="tool-card mt-8 p-6">
          <h2 className="text-lg font-semibold mb-2">About the author</h2>
          <p className="text-muted-foreground text-sm">
            Made by Quedroom Team from Guwahati, Assam. We build free, privacy-first web tools and write practical
            guides that explain the maths behind them. Questions or corrections? Email quedroom007@gmail.com.
          </p>
        </aside>
      </article>
    </Layout>
  );
};

export default BlogPost;
