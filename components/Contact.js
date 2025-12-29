import { useState, useEffect } from "react";
import { m, AnimatePresence, useAnimation } from "framer-motion";
import { Send, Mail, Phone, User, MessageSquare } from "lucide-react";

const FormField = ({ icon: Icon, label, name, type, value, onChange, placeholder, rows }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const controls = useAnimation();
  const id = `field-${name}`;

  useEffect(() => {
    if (isFocused) {
      controls.start({ scale: 1.02, y: -5 });
    } else {
      controls.start({ scale: 1, y: 0 });
    }
  }, [isFocused, controls]);

  const InputComponent = rows ? 'textarea' : 'input';

  return (
    <m.div
      className="relative"
      animate={controls}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Floating label */}
      <m.label
        htmlFor={id}
        className="absolute left-4 flex items-center gap-2 cursor-text z-10"
        animate={{
          top: isFocused || value ? 8 : rows ? 20 : 16,
          scale: isFocused || value ? 0.75 : 1,
          color: isFocused ? '#00ff41' : '#666',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <Icon className="w-4 h-4" />
        <span className="font-medium">{label}</span>
      </m.label>

      {/* Input container */}
      <m.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0d0d0d, #080808)',
        }}
      >
        {/* Animated border */}
        <m.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: isFocused
              ? 'linear-gradient(145deg, #00ff41, #00d4ff, #00ff41)'
              : 'linear-gradient(145deg, #1a1a1a, #111)',
            padding: 2,
          }}
          animate={{
            backgroundPosition: isFocused ? ['0% 0%', '100% 100%', '0% 0%'] : '0% 0%',
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative m-[2px] rounded-2xl bg-[#0a0a0a]">
          <InputComponent
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={(e) => {
              onChange(e);
              setIsTyping(true);
              setTimeout(() => setIsTyping(false), 100);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={rows}
            className={`w-full bg-transparent text-white outline-none px-4 ${rows ? 'pt-10 pb-4' : 'pt-8 pb-4'} resize-none`}
            placeholder={isFocused ? placeholder : ''}
          />
        </div>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <m.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute right-4 bottom-4 w-2 h-2 rounded-full bg-[#00ff41]"
            />
          )}
        </AnimatePresence>
      </m.div>
    </m.div>
  );
};

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [chars, setChars] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Email validation regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(null);
    setErrorMsg("");

    // VALIDATION - All required fields must be filled
    if (!form.name.trim()) {
      setStatus("error");
      setErrorMsg("Name is required");
      return;
    }
    if (!form.email.trim()) {
      setStatus("error");
      setErrorMsg("Email is required");
      return;
    }
    if (!isValidEmail(form.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email");
      return;
    }
    if (!form.message.trim()) {
      setStatus("error");
      setErrorMsg("Message is required");
      return;
    }
    if (form.message.trim().length < 10) {
      setStatus("error");
      setErrorMsg("Message must be at least 10 characters");
      return;
    }

    setLoading(true);

    // Animate characters flying
    const letters = "SENDING...".split('');
    setChars(letters);

    try {
      // Sending to Telegram via API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg("Failed to send. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
      setChars([]);
    }
  };


  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-[#030303] overflow-hidden">
      {/* Animated background mesh */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ff41" strokeWidth="1" />
            </pattern>
          </defs>
          <m.rect
            width="100%" height="100%"
            fill="url(#grid)"
            animate={{ x: [0, 40], y: [0, 40] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Glow orbs */}
      <m.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, #00ff4110 0%, transparent 70%)' }}
        animate={{
          x: ['-25%', '25%', '-25%'],
          y: ['-25%', '25%', '-25%'],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="relative z-10 w-full max-w-xl">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <m.div
            className="inline-block mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="px-4 py-2 rounded-full bg-[#00ff41]/10 border border-[#00ff41]/30">
              <span className="text-[#00ff41] text-sm font-mono">📧 Get in touch</span>
            </div>
          </m.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
            <m.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Let's
            </m.span>{" "}
            <m.span
              className="text-[#00ff41]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Connect
            </m.span>
          </h2>
        </m.div>

        {/* Form */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {status === "error" ? (
              <m.div
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <m.div
                  className="inline-block text-6xl mb-4"
                  animate={{ x: [-5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  ⚠️
                </m.div>
                <h3 className="text-2xl font-bold text-red-500 mb-2">{errorMsg || "Something went wrong"}</h3>
                <m.button
                  onClick={() => setStatus(null)}
                  className="mt-4 px-6 py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-500/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again
                </m.button>
              </m.div>
            ) : status === "success" ? (
              <m.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <m.div
                  className="inline-block text-8xl mb-6"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  🎉
                </m.div>
                <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-500">I'll get back to you within 24 hours.</p>
                <m.button
                  onClick={() => setStatus(null)}
                  className="mt-8 px-6 py-3 rounded-xl border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Another Message
                </m.button>
              </m.div>
            ) : (
              <m.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <FormField
                  icon={User}
                  label="Your Name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Harun Shaikh"
                />

                <FormField
                  icon={Mail}
                  label="Your Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />

                <FormField
                  icon={Phone}
                  label="Your Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 99999 99999"
                />

                <FormField
                  icon={MessageSquare}
                  label="Your Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={4}
                />

                {/* Submit button */}
                <m.button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-5 rounded-2xl font-bold text-lg overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button background */}
                  <m.div
                    className="absolute inset-0 bg-[#00ff41]"
                    animate={loading ? {
                      background: ['linear-gradient(90deg, #00ff41, #00d4ff, #00ff41)'],
                      backgroundSize: ['200% 100%'],
                      backgroundPosition: ['0% 0%', '100% 0%'],
                    } : {}}
                    transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
                  />

                  {/* Shine effect */}
                  <m.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: loading ? '100%' : '-100%' }}
                    transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
                  />

                  <span className="relative z-10 flex items-center justify-center gap-3 text-black">
                    {loading ? (
                      <>
                        {chars.map((char, i) => (
                          <m.span
                            key={i}
                            initial={{ y: 0 }}
                            animate={{ y: [-5, 0, -5] }}
                            transition={{ duration: 0.5, delay: i * 0.05, repeat: Infinity }}
                          >
                            {char}
                          </m.span>
                        ))}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                </m.button>
              </m.form>
            )}
          </AnimatePresence>
        </m.div>

        {/* Contact info */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-12 text-gray-600"
        >
          <a href="mailto:harunshaikh270599@gmail.com" className="flex items-center gap-2 hover:text-[#00ff41] transition-colors">
            <Mail className="w-4 h-4" />
            harunshaikh270599@gmail.com
          </a>
          <a href="tel:+918329320708" className="flex items-center gap-2 hover:text-[#00ff41] transition-colors">
            <Phone className="w-4 h-4" />
            +91 8329320708
          </a>
        </m.div>
      </div>
    </section>
  );
}
