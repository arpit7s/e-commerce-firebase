import { NavLink } from "react-router-dom";

const PageNotFound = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-4xl text-center">
                <h2 className="text-[18vw] leading-none animate-gradient-text font-bold">
                    404
                </h2>
                <h4 className="mb-5 text-2xl uppercase font-semibold text-gray-800">
                    Sorry! Page not found
                </h4>
                <p className="mb-6 text-gray-600">
                    Oops! It seems like the page you're trying to access doesn't exist.
                    If you believe there's an issue, feel free to report it, and we'll
                    look into it.
                </p>
                <div className="flex justify-center space-x-4">
                    <NavLink
                        to="/"
                        className="inline-block px-6 py-2 border-2 border-blue-500 text-blue-500 font-medium uppercase rounded-full transition-all duration-300 hover:bg-blue-500 hover:text-white"
                    >
                        Return Home
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="inline-block px-6 py-2 border-2 border-red-500 text-red-500 font-medium uppercase rounded-full transition-all duration-300 hover:bg-red-500 hover:text-white"
                    >
                        Report Problem
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default PageNotFound