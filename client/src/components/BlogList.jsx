
import { useState } from "react"
import { blogCategories } from "../assets/assets"
import BlogCard from "./BlogCard"
import { useAppContext } from "../context/AppContext"

const BlogList = () => {
  const [menu, setMenu] = useState("All")
  const { blogs, input } = useAppContext()
  const allBlogs = blogs // Declare the allBlogs variable

  const filteredBlogs = () => {
    if (!input?.trim()) return allBlogs

    const lowerInput = input.toLowerCase()

    return allBlogs.filter(
      (blog) => blog.title?.toLowerCase().includes(lowerInput) || blog.category?.toLowerCase().includes(lowerInput),
    )
  }

  const visibleBlogs = filteredBlogs().filter((blog) => (menu === "All" ? true : blog.category === menu))

  return (
    <div className="min-h-screen bg-background">
      <div className="relative flex flex-wrap justify-center gap-3 sm:gap-6 my-12 px-4">
        {/* Background glow effect */}
        <div className="absolute inset-0 -z-10 flex justify-center items-center pointer-events-none">
          <div className="w-96 h-32 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl rounded-full"></div>
        </div>

        {blogCategories.map((item) => {
          const isActive = menu === item

          return (
            <div key={item} className="relative group">
              <button
                onClick={() => setMenu(item)}
                className={`relative z-10 px-6 py-2.5 text-sm sm:text-base font-semibold transition-all duration-300 ease-out
                  rounded-full backdrop-blur-md border
                  ${
                    isActive
                      ? "text-zinc-600 border-blue-400/50 bg-gradient-to-r from-blue-500/30 to-blue-800/30 shadow-lg shadow-blue-500/50 scale-105"
                      : "text-gray-600 border-blue-500/20 bg-white/5 hover:bg-white/10 hover:border-purple-500/40 hover:scale-105 hover:shadow-md hover:shadow-purple-500/30"
                  } 
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                aria-pressed={isActive}
              >
                {item}
              </button>

              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500 ease-out blur-lg -z-10
                  ${isActive ? "opacity-60 scale-100" : "opacity-0 scale-75 group-hover:opacity-40"}`}
              ></div>

              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500 ease-out shadow-lg shadow-cyan-400/50
                  ${isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-2/3 group-hover:opacity-70"}`}
              ></div>
            </div>
          )
        })}
      </div>

      <div
        className=" xl:grid-cols-4
        gap-6 sm:gap-8 mb-24 mx-4 sm:mx-8 lg:mx-12 xl:mx-20 px-2"
      >
        {visibleBlogs.length > 0 ? (
          visibleBlogs.map((blog, index) => (
            <div
              key={blog._id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <BlogCard blog={blog} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-lg text-gray-400 mb-2">No blogs found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList
