export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Agenda App</h1>
        <div className="space-x-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/appointments" className="hover:underline">Appointments</a>
          <a href="/profile" className="hover:underline">Profile</a>
        </div>
      </div>
    </nav>
  );
}