const Contact = () => {
  return (
    <section className="bg-[#f2f7fb] py-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-[#000080] mb-4">
            Contact Us
          </h1>
          <p className="text-[#6D8196] max-w-xl mx-auto">
            Have questions, suggestions, or feedback?  
            We’d love to hear from you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-3xl mx-auto">
          <form className="grid gap-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#000080] mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg 
                           bg-[#eef7fc] border border-[#82C8E5]/40
                           focus:outline-none focus:ring-2
                           focus:ring-[#0047AB]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#000080] mb-2">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg 
                           bg-[#eef7fc] border border-[#82C8E5]/40
                           focus:outline-none focus:ring-2
                           focus:ring-[#0047AB]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-[#000080] mb-2">
                Your Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-lg 
                           bg-[#eef7fc] border border-[#82C8E5]/40
                           focus:outline-none focus:ring-2
                           focus:ring-[#0047AB]"
              ></textarea>
            </div>

            {/* Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#0047AB] text-white
                           py-3 rounded-full font-semibold
                           hover:bg-[#000080] transition
                           shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
