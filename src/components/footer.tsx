import { Instagram, Youtube, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 md:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 - About */}
        <div>
          <h2 className="text-white text-lg font-bold mb-3">Professional Search</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop platform for freelancers, full-time jobs, and internships. 
            Connect talent with opportunities.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h2 className="text-white text-lg font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Post Job</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Find Job</a></li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <h2 className="text-white text-lg font-bold mb-3">Contact Us</h2>
          <p className="text-sm">Kharadi, Pune, India</p>
          <p className="text-sm">+91 89998 66172</p>
          <p className="text-sm">hr@professionalsearch.in</p>
        </div>

        {/* Column 4 - Social Media */}
        <div>
          <h2 className="text-white text-lg font-bold mb-3">Follow Us</h2>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-white"><Instagram /></a>
            <a href="#" className="hover:text-white"><Youtube /></a>
            <a href="#" className="hover:text-white"><Facebook /></a>
            <a href="#" className="hover:text-white"><Linkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        PROFESSIONAL SEARCH © 2025. All Rights Reserved.
      </div>
    </footer>
  );
}
