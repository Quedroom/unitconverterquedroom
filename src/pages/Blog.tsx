import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import AdSlot from "@/components/AdSlot";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => (
  <Layout breadcrumbs={[{ label: "Blog" }]}>
    <PageSEO
      title="ConvertHub Blog – Conversion Guides & Tool Tips"
      description="Guides on land measurement in Assam, image formats and percentage maths from the ConvertHub team. Practical explainers behind our free converters."
      path="/blog"
    />
    <AdSlot slot="top" />
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">ConvertHub Blog</h1>
      <p className="text-muted-foreground mb-8">
        Practical guides on measurement, image formats and everyday maths — written by the Quedroom team.
      </p>
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <article key={post.slug} className="tool-card p-6">
            <p className="text-xs text-primary font-medium mb-2">
              {post.category} · {post.readingTime}
            </p>
            <h2 className="text-xl font-semibold mb-2">
              <Link to={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link>
            </h2>
            <p className="text-muted-foreground text-sm mb-3">{post.description}</p>
            <Link to={`/blog/${post.slug}`} className="text-primary text-sm font-medium">Read article →</Link>
          </article>
        ))}
      </div>
    </div>
  </Layout>
);

export default Blog;
