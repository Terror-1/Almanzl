import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const contacts = [
    {
      icon: <Mail size={28} className="text-yellow-400" />,
      title: "Email",
      value: "support@almanzl.com",
      desc: "Reach us anytime via email for inquiries or support.",
    },
    {
      icon: <Phone size={28} className="text-yellow-400" />,
      title: "Phone",
      value: "+20 109 969 1539",
      desc: "We’re available 9 AM – 6 PM, Sunday through Thursday.",
    },
    {
      icon: <MapPin size={28} className="text-yellow-400" />,
      title: "Address",
      value: "Alexandria, Egypt",
      desc: "Visit us at our office for consultations or collaborations.",
    },
    {
      icon: <Clock size={28} className="text-yellow-400" />,
      title: "Working Hours",
      value: "Sun – Thu: 9 AM – 6 PM",
      desc: "Friday & Saturday: Closed",
    },
  ];

  return (
    <div className="font-poppins">
      <section className="bg-black text-white flex items-center justify-center min-h-[60vh] text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Contact <span className="text-yellow-400">almanzl</span>
          </h1>
          <p className="mt-4 text-gray-300 text-sm md:text-base">
            We’d love to hear from you, whether it’s a question, feedback, or a
            partnership idea.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contacts.map((card) => (
            <div
              key={card.title}
              className="bg-gray-950/60 p-6 rounded-lg shadow-md border border-gray-800 hover:border-yellow-400 transition"
            >
              <div className="flex justify-center mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold text-yellow-400 text-center">
                {card.title}
              </h3>
              <p className="text-center text-gray-200 font-medium mt-1">
                {card.value}
              </p>
              <p className="text-gray-400 text-sm mt-2 text-center leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black text-white py-14 text-center">
        <h2 className="text-2xl font-semibold">Our Location</h2>
        <p className="text-gray-400 mt-2">
          Stop by our office for a chat or collaboration.
        </p>
        <div className="mt-8">
          <iframe
            title="almanzl office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110497.57519865367!2d29.91873994777489!3d31.20009236664077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c3c3f2ef1e17%3A0x5cbb44bfe3da5c22!2sAlexandria%2C%20Egypt!5e0!3m2!1sen!2seg!4v1671012345678"
            className="w-full max-w-4xl h-80 mx-auto rounded-lg border border-gray-700 shadow-lg"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
