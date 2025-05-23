export default function FooterSection() {
  return (
    <footer className="py-6 text-center text-gray-500">
      <div>
        &copy; {new Date().getFullYear()} fukayatti. All rights reserved.
      </div>
      <div className="mt-2">Made with Next.js, React, and ❤️</div>
    </footer>
  );
}
