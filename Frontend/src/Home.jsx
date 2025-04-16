import "./Home.css"

const Home = () => {
    return (
        <div>
            <header className="sticky top-0 z-10">
                <nav className="mx-auto flex p-6 bg-black">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="text-white flex font-extrabold text-2xl">
                            <a href="#">University Management System</a>
                        </div>

                        <div className="space-x-6 md:flex">
                            <a href="#" className="text-white font-extrabold">Home</a>
                            <a href="#" className="text-white font-extrabold">About</a>
                            <a href="#" className="text-white font-extrabold">Courses</a>
                            <a href="#" className="text-white font-extrabold">Fee Structure</a>
                            <a href="#" className="text-white font-extrabold">Admission</a>
                        </div>
                    </div>
                </nav>
            </header>


            <div className="bg-[url('./assets/uni.jpg')] min-h-screen bg-no-repeat bg-cover bg-center">
                <div className="text-center text-white py-16 px-4 bg-purple-900 bg-opacity-50">
                    <h3 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Welcome to the <span className="text-yellow-400">Next-gen</span> Education
                    </h3>
                    <h2 className="text-lg md:text-xl mb-6">Our mission is to prepare you for the future</h2>
                    <div className="space-x-6">
                        <button className="bg-yellow-500 text-black py-2 px-6 rounded-lg font-semibold hover:bg-yellow-400 ">
                            <a href="./Register" >Staff</a> 
                        </button>
                        <button className="bg-white text-purple-900 py-2 px-6 rounded-lg font-semibold hover:bg-gray-200 ">
                            <a href="./Signup" >Student</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Home;
