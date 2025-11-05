import ExpandableText from "../../components/ExpandableText";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <section className="flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              About <span className="text-yellow-400">almanzl</span>
            </h1>
            <p className="mt-4">
              Quality products, honest pricing, and a delightful shopping
              experience — built for people, not just carts.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Happy Customers", value: "25K+" },
            { label: "Products", value: "3.5K+" },
            { label: "Cities Served", value: "40+" },
            { label: "Support", value: "24/7" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                {s.value}
              </div>
              <div className="text-gray-300 mt-1 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Our Story</h2>
            <div className="mt-4 text-gray-700">
              <ExpandableText maxLines={5}>
                We started almanzl with a simple belief: shopping should be
                clear, fair, and fun. No confusing choices, no hidden fees—just
                products we love and service you can trust. Over time, we built
                a community of customers who care about quality and value as
                much as we do. Today, almanzl is focused on curating essentials,
                improving delivery reliability, and making support feel human.
                Every feature, every page, every package—designed to make your
                day a little easier.
              </ExpandableText>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">What we stand for</h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start gap-3">
                <span className="h-2.5 w-2.5 mt-2 rounded-full bg-yellow-400" />
                Transparent pricing and clear policies.
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2.5 w-2.5 mt-2 rounded-full bg-yellow-400" />
                Curated selection less noise, better picks.
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2.5 w-2.5 mt-2 rounded-full bg-yellow-400" />
                Reliable delivery and responsive support.
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2.5 w-2.5 mt-2 rounded-full bg-yellow-400" />
                Continuous improvement shipped weekly.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14">
          <h2 className="text-2xl md:text-3xl font-semibold">Our Values</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Customer-first",
                desc: "We obsess over the small details so you don’t have to. Every decision starts with your experience.",
              },
              {
                title: "Keep it simple",
                desc: "Simple pages, simple choices, simple support. Clarity beats complexity every time.",
              },
              {
                title: "Own the outcome",
                desc: "We take responsibility from quality control to delivery updates end to end.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14">
          <h2 className="text-2xl md:text-3xl font-semibold">Team</h2>
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Mahmoud Khaleel", role: "Software Engineer" },
              { name: "Yussif Belal", role: "Software Engineer" },
              { name: "Hossam Elfar", role: "Software Engineer" },
              { name: "Al-Hassan Ali", role: "Software Engineer" },
              { name: "Osama Elsaed", role: "Software Engineer" },
            ].map((m) => (
              <div
                key={m.name}
                className="border rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="mt-4">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-gray-600 text-sm">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14">
          <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
          <div className="mt-6 space-y-5">
            {[
              {
                q: "Where do you ship?",
                a: "We currently ship to most major cities. Delivery coverage is expanding continuously.",
              },
              {
                q: "How do returns work?",
                a: "Simple: start a return within 14 days of delivery. We’ll guide you step by step.",
              },
              {
                q: "How can I contact support?",
                a: "Reach us 24/7 via the Contact page. We usually reply within a few hours.",
              },
            ].map((f) => (
              <div key={f.q} className="bg-white rounded-lg p-5 shadow-sm">
                <div className="font-medium">{f.q}</div>
                <ExpandableText className="mt-2" maxLines={3}>
                  {f.a}
                </ExpandableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">
              We’re building the store we want to shop at.
            </h3>
            <p className="text-gray-300 mt-1">
              Questions? Ideas? We’d love to hear from you.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 bg-yellow-400 text-black rounded-md font-medium hover:bg-yellow-300 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
