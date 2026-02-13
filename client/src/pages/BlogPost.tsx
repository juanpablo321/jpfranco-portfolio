/* Blog Post Page
 * Professional Corporate Design (Simon Sinek Inspired)
 * Clean reading experience with generous typography
 * Consistent with the site's blue/white corporate style
 */

import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";

interface BlogPostData {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  content: React.ReactNode;
}

const blogPostsData: Record<string, BlogPostData> = {
  "lessons-from-a-conversation-with-rafa-nadal": {
    slug: "lessons-from-a-conversation-with-rafa-nadal",
    title: "Lessons From a Conversation With Rafa Nadal",
    author: "Santiago Naranjo",
    date: "Nov 18, 2025",
    readTime: "3 min",
    image:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663334573136/VWiQyXbRDSALDxTi.webp",
    category: "Leadership",
    content: (
      <>
        <p className="text-xl leading-relaxed text-muted-foreground mb-8">
          There are moments in life when a conversation does more than inspire;
          it recalibrates you.
        </p>

        <p className="mb-6">
          That's what happened to me in{" "}
          <strong>
            Lisbon during my interview with Rafa Nadal at VTEX Connect.
          </strong>
        </p>

        <p className="mb-6">
          No cameras. No media pressure. Just a room of 2,500 leaders, and{" "}
          <strong>
            one of the greatest athletes of all time, speaking with a humility
            that almost disarms you.
          </strong>
        </p>

        <p className="mb-6">
          <strong>
            Nadal walks into a room the same way he walks onto a court: fully
            present, intensely focused, and deeply respectful of everyone around
            him.
          </strong>
        </p>

        <p className="mb-8">
          He doesn't perform humility; he lives it. And that makes every word
          land differently.
        </p>

        <p className="mb-8">
          During our conversation, a few ideas stayed with me long after the
          stage lights went off:
        </p>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold mb-4">
          "I learned to suffer. That's why I succeeded."
        </h2>
        <p className="mb-6">When he said this, the room went silent.</p>
        <p className="mb-6">
          He wasn't glorifying pain. He was describing a mindset built over
          years: the discipline to show up relentlessly, the ability to stay
          composed when things don't go your way, and the courage to keep
          fighting until momentum returns.
        </p>
        <p className="mb-8">
          It reminded me that leadership isn't about avoiding difficult moments.
          It's about absorbing them with clarity and moving forward anyway.
        </p>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold mb-4">
          "You don't win because you feel good. You win because you do the right
          things."
        </h2>
        <p className="mb-8">
          Coming from someone with 22 Grand Slams reframes the concept of
          success. It isn't emotional. It's procedural. Supported by decades of
          discipline. Watching him hit with precision, even in casual rallies on
          stage, makes that lesson impossible to ignore.
        </p>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold mb-4">
          "You can have intensity without breaking rackets."
        </h2>
        <p className="mb-8">
          This one hit deeply: intensity without ego, competitiveness without
          chaos, ambition with respect. The closer you are to Nadal, the more
          obvious it becomes: his real strength isn't his forehand, it's his
          character.
        </p>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold mb-4">
          "Even when I lost that match, I saw the bottle half-full."
        </h2>
        <p className="mb-8">
          Nadal described a heartbreaking defeat, yet saw the bottle "almost
          complete." The reason? He knew he was ready to compete at the highest
          level again. Loss is feedback, not finality.
        </p>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold mb-4">
          "Excuses don't help you to be better."
        </h2>
        <p className="mb-8">
          For him, losing isn't failure, it's information. While feedback fuels
          progress, excuses paralyze it. Rafa never blamed his team or injuries;
          he adjusted, improved, and got back to work.
        </p>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold mb-4">
          "Every practice is an opportunity."
        </h2>
        <p className="mb-8">
          He never understood training "for the sake of practice". For him, every
          practice is an opportunity to improve, to go onto the court with the
          mentality and the goal of enhancing something.
        </p>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold mb-4">
          "Rivals make you better."
        </h2>
        <p className="mb-8">
          Federer, Djokovic, and Nadal, competition fueled by admiration, not
          envy. Pushing each other to the limits to try to get better and better.
          They didn't compete to win simply; they competed to be pushed.
        </p>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold mb-4">
          "The real victory is leaving people better than you found them."
        </h2>
        <p className="mb-8">
          He shared this quietly, almost as a personal compass. In a world
          obsessed with trophies, it felt revolutionary. Greatness is not
          measured only by what you achieve…but by the impact you leave on those
          around you.
        </p>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold mb-4">
          But the moment I'll never forget wasn't just the dialogue.
        </h2>
        <p className="mb-6">
          It was standing beside him on stage, hitting tennis balls with Nadal in
          front of thousands of people.
        </p>
        <p className="mb-6">
          A surreal combination of pressure, adrenaline, and joy. And yet, even
          in that chaos, he radiated calm.
        </p>
        <p className="mb-10">
          Greatness feels effortless only because it's supported by decades of
          discipline.
        </p>

        <div className="bg-[#f0f7fc] border-l-4 border-primary p-8 rounded-r-lg my-10">
          <p className="text-lg leading-relaxed text-foreground italic">
            Some conversations don't just inspire you.
            <br />
            <br />
            They sharpen you.
            <br />
            <br />
            They remind you of the type of impact that truly matters.
            <br />
            <br />
            Not louder.
            <br />
            <br />
            Just truer.
          </p>
        </div>
      </>
    ),
  },
};

export default function BlogPost({ slug }: { slug: string }) {
  const post = blogPostsData[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">Artículo no encontrado</h1>
            <p className="text-muted-foreground mb-8">
              El artículo que buscas no existe o ha sido movido.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <ArrowLeft size={16} />
              Volver al Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Article Header */}
      <section className="corp-blue-section pt-32 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Volver al Blog
            </Link>

            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">
              {post.category}
            </span>

            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime} read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto -mt-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <article className="max-w-3xl mx-auto prose-article">
            {post.content}
          </article>
        </div>
      </section>

      {/* Back to Blog CTA */}
      <section className="py-12 bg-[#f8f9fa] border-t border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <ArrowLeft size={16} />
              Volver al Blog
            </Link>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Agendar Consultoría
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
