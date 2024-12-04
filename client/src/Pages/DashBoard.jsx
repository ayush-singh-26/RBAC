function DashBoard({ role }) {


  return (


    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center space-y-8">
      <h1 className="text-3xl font-bold">Welcome, {role}!</h1>
      <div className="space-y-4">
        {role === 'admin' && (
          <button className="w-full max-w-xs py-2 px-4 bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300">
            I am the Admin
          </button>
        )}
        {['admin', 'moderator'].includes(role) && (
          <button className="w-full max-w-xs py-2 px-4 bg-green-600 rounded-md hover:bg-green-700 transition duration-300">
            I am the Moderator
          </button>
        )}
        {['admin', 'moderator', 'user'].includes(role) && (
          <button className="w-full max-w-xs py-2 px-4 bg-purple-600 rounded-md hover:bg-purple-700 transition duration-300">
            User
          </button>
        )}
      </div>
    </div>

  );
}

export default DashBoard;
