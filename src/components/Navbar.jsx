import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const username = localStorage.getItem("userName") || "User";
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/signin/admin", { replace: true });
    };

    return (
        <div className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/blogs" className="text-white text-lg font-bold">MONTESSORI CLASSROOM</Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Avatar size="small" name={username} />
                        <button onClick={handleLogout} className="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ml-4">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Avatar({ name, size = "small" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
                {name[0]}
            </span>
        </div>
    );
}

export default Navbar;
