import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaSyncAlt,
  FaHome,
  FaTags,
  FaTruck,
  FaHeadset,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../hooks";
import { signout } from "../../redux/authSlice";

const categories = [
  { name: "Dolls", icon: "🧸", count: 8 },
  { name: "Educational Toy", icon: "📚", count: 8 },
  { name: "Games and puzzle", icon: "🧩", count: 8 },
  { name: "Indoor Play", icon: "🏠", count: 8 },
  { name: "Kids Books", icon: "📖", count: 8 },
  { name: "Outdoor Toy", icon: "🏏", count: 6 },
  { name: "Rockers & Rides", icon: "🐎", count: 4 },
  { name: "Toy Figures", icon: "🤖", count: 4 },
  { name: "Vehicles Toys", icon: "🚗", count: 3 },
];

const products = [
  {
    id: 1,
    name: "Colorful Building Blocks",
    price: 199000,
    sale: 0.1,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 12,
  },
  {
    id: 2,
    name: "Cute Teddy Bear",
    price: 159000,
    sale: 0.2,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 8,
  },
  {
    id: 3,
    name: "Kids Drawing Set",
    price: 99000,
    sale: 0,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 4,
    name: "Mini Soccer Ball",
    price: 89000,
    sale: 0,
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 10,
  },
];

const infoBoxes = [
  {
    icon: <FaSyncAlt className="text-yellow-500 text-2xl" />,
    title: "Money Return",
    desc: "Back guarantee under 7 days.",
  },
  {
    icon: <FaTags className="text-pink-500 text-2xl" />,
    title: "Member Discount",
    desc: "On every order over $2000",
  },
  {
    icon: <FaTruck className="text-green-500 text-2xl" />,
    title: "Home Delivery",
    desc: "Free delivery to your home",
  },
  {
    icon: <FaHeadset className="text-blue-500 text-2xl" />,
    title: "24/7 Support",
    desc: "Dedicated support in 24hrs",
  },
];

function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Top bar */}
      <div className="bg-teal-600 text-white text-xs py-2 px-4 flex justify-between items-center">
        <div>Get free home delivery (Order More then $300)</div>
        <div className="flex gap-4">
          <span>info@gmail.com</span>
          <span>|</span>
          <span>+888-0000-000</span>
          <span>|</span>
          <span className="hidden sm:inline">
            6391 Elgin St. Celina, Delaware 10299
          </span>
          <span>|</span>
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <a
              role="button"
              className="cursor-pointer"
              onClick={() =>
                dispatch(signout()).then(() => {
                  navigate("/login");
                })
              }
            >
              Logout
            </a>
          )}
          <Link to="/admin" className="underline ml-2">
            Admin
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/6bQ6Q0W/toyup-logo.png"
            alt="Logo"
            className="h-10"
          />
          <span className="font-bold text-2xl text-orange-500">Toyup</span>
        </div>
        <nav className="flex-1 flex items-center gap-6 ml-8">
          <a
            href="#"
            className="text-gray-700 font-semibold hover:text-blue-600"
          >
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Shop
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Vendor
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Pages
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Blog
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="relative text-gray-600 hover:text-pink-500">
            <FaHeart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1">
              2
            </span>
          </button>
          <button className="relative text-gray-600 hover:text-blue-500">
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>
          <button className="text-gray-600 hover:text-yellow-500">
            <FaUser className="text-xl" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <button className="bg-teal-500 text-white px-4 py-2 rounded font-bold w-full mb-4 flex items-center gap-2">
                <FaHome /> Top Categories
              </button>
              <ul>
                {categories.map((cat) => (
                  <li
                    key={cat.name}
                    className="flex items-center justify-between py-2 px-2 hover:bg-blue-50 rounded cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="bg-gray-100 text-xs px-2 py-0.5 rounded">
                      {cat.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold mb-2 text-gray-700">On Sale Product</h3>
              <ul>
                {products.slice(0, 3).map((p) => (
                  <li key={p.id} className="flex items-center gap-3 mb-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <div className="text-xs font-semibold">{p.name}</div>
                      <div className="text-blue-600 font-bold text-sm">
                        ${((p.price * (1 - (p.sale || 0))) / 23000).toFixed(2)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Center Content */}
          <section className="flex-1">
            {/* Search & Banner */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 flex items-center bg-white rounded-xl shadow px-4 py-3">
                <select className="border-none bg-transparent text-gray-500 focus:ring-0 mr-2">
                  <option>All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Type Your Products..."
                  className="flex-1 px-2 py-1 border-none bg-transparent focus:ring-0 outline-none"
                />
                <button className="text-white bg-blue-500 px-4 py-2 rounded ml-2 flex items-center gap-1">
                  <FaSearch /> Search
                </button>
              </div>
              <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-700 rounded-xl shadow flex items-center justify-center p-6 relative overflow-hidden min-h-[180px]">
                <div className="z-10">
                  <div className="bg-white text-blue-700 text-xs px-2 py-1 rounded mb-2 inline-block font-bold">
                    Weekend Discount
                  </div>
                  <h2 className="text-white text-2xl font-bold mb-2">
                    Find The Best Toys For Your Kids
                  </h2>
                  <p className="text-blue-100 mb-2 text-sm">
                    Lorem ipsum dolor sit amet consectetur. Id fames there are
                    vulputate.
                  </p>
                  <div className="text-yellow-300 text-xl font-bold">
                    $59.00
                  </div>
                </div>
                <img
                  src="https://img.freepik.com/free-photo/little-girl-playing-with-wooden-toys_23-2148879377.jpg?w=400"
                  alt="Banner"
                  className="absolute right-4 bottom-0 w-32 h-32 object-cover rounded-xl shadow-lg z-0"
                />
              </div>
            </div>

            {/* Info Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {infoBoxes.map((box) => (
                <div
                  key={box.title}
                  className="bg-white rounded-xl shadow flex flex-col items-center p-4 text-center"
                >
                  {box.icon}
                  <div className="font-bold mt-2">{box.title}</div>
                  <div className="text-xs text-gray-500">{box.desc}</div>
                </div>
              ))}
            </div>

            {/* Sales of The Week */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-700">
                  Sales of The Week’s
                </h2>
                <a href="#" className="text-blue-500 hover:underline text-sm">
                  All items
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative"
                  >
                    {product.sale > 0 && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-bold">
                        -{Math.round(product.sale * 100)}%
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded mb-2"
                    />
                    <div className="font-semibold text-center">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-blue-600 font-bold text-lg">
                        $
                        {(
                          (product.price * (1 - (product.sale || 0))) /
                          23000
                        ).toFixed(2)}
                      </span>
                      {product.sale > 0 && (
                        <span className="text-gray-400 line-through text-sm">
                          ${(product.price / 23000).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="text-yellow-500 text-xs mt-1">
                      ★ {product.rating} ({product.reviews} reviews)
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-blue-100 rounded-xl p-6 mb-10">
              <h2 className="text-xl font-bold text-center text-gray-700 mb-6">
                Popular Categories
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {categories.slice(0, 10).map((cat) => (
                  <div
                    key={cat.name}
                    className="bg-white rounded-lg shadow flex flex-col items-center p-4"
                  >
                    <span className="text-3xl mb-2">{cat.icon}</span>
                    <div className="font-semibold">{cat.name}</div>
                    <div className="text-xs text-gray-400">
                      {cat.count} Products
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Arrival */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                  <span role="img" aria-label="fire">
                    🔥
                  </span>{" "}
                  New Arrival
                </h2>
                <a href="#" className="text-blue-500 hover:underline text-sm">
                  Explore all →
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.concat(products).map((product, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative"
                  >
                    {product.sale > 0 && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-bold">
                        -{Math.round(product.sale * 100)}%
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded mb-2"
                    />
                    <div className="font-semibold text-center">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-blue-600 font-bold text-lg">
                        $
                        {(
                          (product.price * (1 - (product.sale || 0))) /
                          23000
                        ).toFixed(2)}
                      </span>
                      {product.sale > 0 && (
                        <span className="text-gray-400 line-through text-sm">
                          ${(product.price / 23000).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="text-yellow-500 text-xs mt-1">
                      ★ {product.rating} ({product.reviews} reviews)
                    </div>
                  </div>
                ))}
                {/* Banner */}
                <div className="hidden md:block row-span-2 bg-gradient-to-br from-pink-400 to-yellow-300 rounded-xl flex flex-col items-center justify-center p-6 shadow-lg min-h-[250px]">
                  <img
                    src="https://img.freepik.com/free-photo/little-girl-playing-with-wooden-toys_23-2148879377.jpg?w=200"
                    alt="Children day"
                    className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-white"
                  />
                  <div className="text-white font-bold text-lg mb-2">
                    Children day collection
                  </div>
                  <div className="bg-white text-pink-500 font-bold px-4 py-1 rounded-full text-lg">
                    Discount 50%
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Newsletter Section */}
      <div className="bg-slate-900 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
              alt="Newsletter"
              className="w-20 h-20"
            />
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-1">
                Subscribe our newsletter to <br /> get latest news.
              </h2>
            </div>
          </div>
          <form className="flex w-full md:w-auto mt-6 md:mt-0">
            <input
              type="email"
              placeholder="Your Email Address"
              className="rounded-l-full px-6 py-3 w-full md:w-96 bg-slate-800 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-r-full bg-orange-400 hover:bg-orange-500 text-white font-bold px-8 py-3 transition"
            >
              Subscribe Now!
            </button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-b from-cyan-50 to-cyan-100 pt-12 pb-6 px-4 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://i.ibb.co/6bQ6Q0W/toyup-logo.png"
                alt="Logo"
                className="h-10"
              />
              <span className="font-bold text-2xl text-orange-500">Toyup</span>
            </div>
            <p className="text-gray-500 mb-4">
              Lorem ipsum dolor sit amet consectetur. Id Fames there are many
              vulputate eget dolor.
            </p>
            <div className="flex items-center gap-2 mb-2 text-gray-600">
              <span className="bg-cyan-100 p-2 rounded-full">
                <svg
                  className="w-4 h-4 inline"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              6391 Elgin St. Celina, Delaware 10299
            </div>
            <div className="flex items-center gap-2 mb-2 text-gray-600">
              <span className="bg-cyan-100 p-2 rounded-full">
                <svg
                  className="w-4 h-4 inline"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  <path d="M16 3v4a1 1 0 001 1h4" />
                </svg>
              </span>
              +000-1234-456789
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="bg-cyan-100 p-2 rounded-full">
                <svg
                  className="w-4 h-4 inline"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 12v1a4 4 0 01-8 0v-1" />
                  <path d="M12 17v.01" />
                  <path d="M12 3v4" />
                  <path d="M6.343 6.343l-2.828 2.828" />
                  <path d="M17.657 6.343l2.828 2.828" />
                </svg>
              </span>
              toyup@gmail.com
            </div>
            {/* Social icons */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          {/* Account */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              Account{" "}
              <span className="block w-8 h-1 bg-orange-400 rounded mt-1"></span>
            </h3>
            <ul className="text-gray-500 space-y-2 mt-4">
              <li>
                <a href="#">Cart Page</a>
              </li>
              <li>
                <a href="#">Checkout</a>
              </li>
              <li>
                <a href="#">Compare</a>
              </li>
              <li>
                <a href="#">Wishlist</a>
              </li>
              <li>
                <a href="#">My account</a>
              </li>
              <li>
                <a href="#">My Orders</a>
              </li>
            </ul>
          </div>
          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              Services{" "}
              <span className="block w-8 h-1 bg-orange-400 rounded mt-1"></span>
            </h3>
            <ul className="text-gray-500 space-y-2 mt-4">
              <li>
                <a href="#">Service Offerings</a>
              </li>
              <li>
                <a href="#">How It Works</a>
              </li>
              <li>
                <a href="#">Pricing Table</a>
              </li>
              <li>
                <a href="#">Service Areas</a>
              </li>
              <li>
                <a href="#">Service FAQs</a>
              </li>
              <li>
                <a href="#">Contact Information</a>
              </li>
            </ul>
          </div>
          {/* Customer Support */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              Customer Support{" "}
              <span className="block w-8 h-1 bg-orange-400 rounded mt-1"></span>
            </h3>
            <ul className="text-gray-500 space-y-2 mt-4">
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Store List</a>
              </li>
              <li>
                <a href="#">Opening Hours</a>
              </li>
              <li>
                <a href="#">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#">Refund and Returns</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Floating Cart & Back to Top */}
        <div className="fixed right-6 bottom-24 z-50">
          <div className="bg-teal-500 text-white rounded-xl shadow-lg px-4 py-3 flex flex-col items-center mb-4">
            <span className="text-2xl mb-1">
              <FaShoppingCart />
            </span>
            <span className="text-sm">0 Item</span>
            <span className="text-xs">$0.00</span>
          </div>
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white rounded-full p-3 shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back To Top"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        {/* Notification */}
        <div className="fixed left-8 bottom-8 z-50">
          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4 min-w-[320px]">
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=80&q=80"
              alt="Product"
              className="w-16 h-16 rounded object-cover"
            />
            <div>
              <div className="text-xs text-gray-400 mb-1">From Dhaka, BD</div>
              <div className="font-bold text-gray-700 text-sm mb-1">
                Purchased - Wondear Dolls: Where Imagination Comes to Life!
              </div>
              <div className="text-xs text-gray-400">About 11 months ago</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
