import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Send, Mail, Phone, User, MessageSquare } from "lucide-react";

const FormField = ({ icon: Icon, label, name, type, value, onChange, placeholder, rows }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isFocused) {
      controls.start({ scale: 1.02, y: -5 });
    } else {
      controls.start({ scale: 1, y: 0 });
    }
  }, [isFocused, controls]);

  const InputComponent = rows ? 'textarea' : 'input';

  return (
    <motion.div
      className="relative"
      animate={controls}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Floating label */}
      <motion.div
        className="absolute left-4 flex items-center gap-2 pointer-events-none z-10"
        animate={{
          top: isFocused || value ? 8 : rows ? 20 : 16,
          scale: isFocused || value ? 0.75 : 1,
          color: isFocused ? '#00ff41' : '#666',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Icon className="w-4 h-4" />
        <span className="font-medium">{label}</span>
      </motion.div>

      {/* Input container */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0d0d0d, #080808)',
        }}
      >
        {/* Animated border */}
        <motion.div
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
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute right-4 bottom-4 w-2 h-2 rounded-full bg-[#00ff41]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [chars, setChars] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // Animate characters flying
    const letters = "SENDING...".split('');
    setChars(letters);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      }
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
          <motion.rect
            width="100%" height="100%"
            fill="url(#grid)"
            animate={{ x: [0, 40], y: [0, 40] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Glow orbs */}
      <motion.div
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="px-4 py-2 rounded-full bg-[#00ff41]/10 border border-[#00ff41]/30">
              <span className="text-[#00ff41] text-sm font-mono">📧 Get in touch</span>
            </div>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Let's
            </motion.span>{" "}
            <motion.span
              className="text-[#00ff41]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Connect
            </motion.span>
          </h2>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  className="inline-block text-8xl mb-6"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  🎉
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-500">I'll get back to you within 24 hours.</p>
                <motion.button
                  onClick={() => setStatus(null)}
                  className="mt-8 px-6 py-3 rounded-xl border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
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
                  icon={MessageSquare}
                  label="Your Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={4}
                />

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-5 rounded-2xl font-bold text-lg overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button background */}
                  <motion.div
                    className="absolute inset-0 bg-[#00ff41]"
                    animate={loading ? {
                      background: ['linear-gradient(90deg, #00ff41, #00d4ff, #00ff41)'],
                      backgroundSize: ['200% 100%'],
                      backgroundPosition: ['0% 0%', '100% 0%'],
                    } : {}}
                    transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
                  />

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: loading ? '100%' : '-100%' }}
                    transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
                  />

                  <span className="relative z-10 flex items-center justify-center gap-3 text-black">
                    {loading ? (
                      <>
                        {chars.map((char, i) => (
                          <motion.span
                            key={i}
                            initial={{ y: 0 }}
                            animate={{ y: [-5, 0, -5] }}
                            transition={{ duration: 0.5, delay: i * 0.05, repeat: Infinity }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact info */}
        <motion.div
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
        </motion.div>
      </div>
    </section>
  );
}
