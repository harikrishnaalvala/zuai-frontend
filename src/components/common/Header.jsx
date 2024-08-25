import { Link } from "react-router-dom";
import { handleOpenModal } from "../../features/posts/postsSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <h1 className="font-bold font-serif text-3xl">ZUAI</h1>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              onClick={() => dispatch(handleOpenModal())}
              className="text-white bg-[#6361eb] hover:bg-blue-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Create New Post
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
