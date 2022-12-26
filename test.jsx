export default function PostList() {
    return (
      <>
        {/* Features Section: Boxes with Icons */}
        <div className="bg-gray-100">
          <div className="container w-100">
            <div className="flex flex-col">
              <div className="p-5 bg-white border-2 border-white shadow-sm hover:border-blue-400 transition rounded-lg my-2">
                <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 mb-5 hi-outline hi-template inline-block w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                <h4 className="text-lg font-bold mb-2">
                  1. UI Components Library
                </h4>
                <p className="leading-relaxed text-gray-600">
                  We carefully handcrafted a vast collection of UI components to build all kinds of web applications and websites. We keep designing and adding new ones with each update.
                </p>
              </div>
              <div className="p-5 bg-white border-2 border-white shadow-sm hover:border-blue-400 transition rounded-lg my-2">
                <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 mb-5 hi-outline hi-cube inline-block w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                <h4 className="text-lg font-bold mb-2">
                  2. Self-Hosted Web App
                </h4>
                <p className="leading-relaxed text-gray-600">
                  You’ll love working with the Tailkit web app! It’s a compiled Vue.js based app which you can host on your own and use to explore and use all available UI components.
                </p>
              </div>
              <div className="p-5 bg-white border-2 border-white shadow-sm hover:border-blue-400 transition rounded-lg sm:col-span-2 lg:col-span-1 my-2">
                <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 mb-5 hi-outline hi-cog inline-block w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <h4 className="text-lg font-bold mb-2">
                  3. Helper Tools
                </h4>
                <p className="leading-relaxed text-gray-600">
                  Search and copy SVG icons, build your button markup or copy your favorite color classes with powerful tools. More are under development to give you superpowers.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* END Features Section: Boxes with Icons */}
      </>
    )
  }