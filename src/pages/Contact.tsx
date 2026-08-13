import { useState } from "react";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`ConvertHub enquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:quedroom007@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <Layout breadcrumbs={[{ label: "Contact" }]}>
      <PageSEO
        title="Contact ConvertHub – Questions, Feedback & Requests"
        description="Contact the ConvertHub team at quedroom007@gmail.com for tool requests, corrections, advertising enquiries or feedback. We reply to every message."
        path="/contact"
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Found a wrong formula, need a converter we do not have yet, or want to talk about advertising? Send us a
          message and we will get back to you, usually within two working days.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="tool-card p-5">
            <Mail className="w-5 h-5 text-primary mb-2" />
            <p className="font-medium text-sm">Email</p>
            <a className="text-sm text-primary break-all" href="mailto:quedroom007@gmail.com">quedroom007@gmail.com</a>
          </div>
          <div className="tool-card p-5">
            <MapPin className="w-5 h-5 text-primary mb-2" />
            <p className="font-medium text-sm">Location</p>
            <p className="text-sm text-muted-foreground">Guwahati, Assam, India</p>
          </div>
          <div className="tool-card p-5">
            <Send className="w-5 h-5 text-primary mb-2" />
            <p className="font-medium text-sm">Response time</p>
            <p className="text-sm text-muted-foreground">Within 1–2 working days</p>
          </div>
        </div>

        <form onSubmit={submit} className="tool-card space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="c-name">Your name</label>
              <input id="c-name" required value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="c-email">Your email</label>
              <input id="c-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="c-msg">Message</label>
            <textarea id="c-msg" required value={message} onChange={(e) => setMessage(e.target.value)} className="input-field min-h-[160px] resize-y" />
          </div>
          <button type="submit" className="btn-primary">
            <Send className="w-4 h-4" /> Send Message
          </button>
          <p className="text-xs text-muted-foreground">
            This form opens your own email app — we do not run a server, so your message is never stored on ConvertHub.
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
