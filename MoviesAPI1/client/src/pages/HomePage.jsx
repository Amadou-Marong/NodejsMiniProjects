const HomePage = () => {
  return (
    <div className="w-full text-white">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-gray-600 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Movie 1</h2>
          <p className="text-sm">Description of Movie 1</p>
        </div>
        <div className="bg-gray-600 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Movie 2</h2>
          <p className="text-sm">Description of Movie 2</p>
        </div>
        <div className="bg-gray-600 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Movie 3</h2>
          <p className="text-sm">Description of Movie 3</p>
        </div>
        <div className="bg-gray-600 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Movie 3</h2>
          <p className="text-sm">Description of Movie 3</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage