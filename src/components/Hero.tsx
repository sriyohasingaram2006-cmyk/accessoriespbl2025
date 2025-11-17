export const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Elevate Your Style
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover timeless accessories that define your unique elegance
          </p>
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Shop Collection
          </button>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-600 opacity-10 transform skew-x-12"></div>
    </div>
  );
};
