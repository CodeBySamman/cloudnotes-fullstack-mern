export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-5 bg-gray-50">
      
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-6 md:p-10">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-6">
          About CloudNote
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-500 mb-10 text-sm md:text-lg">
          A fast, secure, and modern cloud-based note-taking platform to organize your thoughts anytime, anywhere.
        </p>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left Text */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              Capture & Organize Your Ideas Easily
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              CloudNote is a modern note-taking application designed to help you store,
              manage, and organize your personal and professional notes in one secure place.
              It keeps your ideas safe, accessible, and always in sync across devices.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Built with modern technologies like React, Node.js, Express, and MongoDB,
              CloudNote delivers fast performance, smooth UI, and a seamless user experience
              on all screen sizes.
            </p>
          </div>

          {/* Right Card */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">
              Why CloudNote?
            </h3>

            <ul className="space-y-2 text-gray-700">
              <li>✔ Lightning fast & responsive UI</li>
              <li>✔ Secure JWT authentication</li>
              <li>✔ Cloud-based note storage</li>
              
              <li>✔ Clean & modern user experience</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-500 text-sm">
          © {new Date().getFullYear()} CloudNote. All rights reserved.
        </div>

      </div>
    </div>
  );
}