const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

      {/* Message */}
      <h2 className="mt-6 text-xl font-semibold">Starting Backend Server...</h2>

      <p className="mt-2 max-w-md text-gray-600">
        The backend is hosted on a free tier service and may take around 30–50
        seconds to wake up after a period of inactivity. Please be patient while
        the server starts.
      </p>
    </div>
  );
};

export default LoadingSpinner;
