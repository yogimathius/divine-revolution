import React from 'react'

const Nav = () => {
  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/logo.png" alt="Logo" />
            </div>
            <div className="ml-4">
              <h1 className="text-white text-lg font-bold">My App</h1>
            </div>
          </div>
          <div className="flex">
            <a href="#" className="text-white hover:bg-blue-600 px-3 py-2 rounded-md">Home</a>
            <a href="#" className="text-white hover:bg-blue-600 px-3 py-2 rounded-md">About</a>
            <a href="#" className="text-white hover:bg-blue-600 px-3 py-2 rounded-md">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
