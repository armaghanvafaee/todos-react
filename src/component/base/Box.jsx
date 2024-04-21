export default function Box({ title, children }) {
  return (
    <>

        <div className="flex items-center justify-center h-screen">
          <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
            <div className="flex items-center mb-6">
              <h1 className="mr-6 text-4xl font-bold text-purple-600">
                {" "}
                {title}
              </h1>
            </div>
            {children}
          </div>
        </div>

    </>
  );
}
