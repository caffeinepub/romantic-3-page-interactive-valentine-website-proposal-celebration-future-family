import { Heart } from 'lucide-react';

export default function FutureFamilyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-6xl w-full space-y-8">
          {/* Hero Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img
              src="/assets/generated/future-family-scene.dim_3840x2160.png"
              alt="Our Future Family"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Caption */}
          <div className="text-center space-y-4">
            <p className="text-2xl md:text-4xl font-serif text-rose-900 font-bold">
              Our sweet little palak lokesh vishwakrma dubey family🧿❤️🤞🏻🤗🥹
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-600 border-t border-rose-200 bg-white/50 backdrop-blur-sm">
        <p className="flex items-center justify-center gap-2">
          © {currentYear} • Built with{' '}
          <Heart className="inline text-rose-600 fill-current" size={16} /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 hover:text-rose-700 font-semibold"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
