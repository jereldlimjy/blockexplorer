import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex w-full py-5 items-center bg-grey">
      <div className="flex items-center pl-8 sm:pl-16">
        <Link to="/">
          <span className="font-nunito font-bold text-3xl text-blue">
            exploreth
          </span>
        </Link>
      </div>
    </nav>
  );
}
