import { useLocation } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="flex px-4 sm:px-6 py-3" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              <ChevronRightIcon className="w-3 h-3 text-gray-400 mx-1" />
              {isLast ? (
                <span className="ml-1 text-sm font-medium text-gray-500">
                  {name.replace(/-/g, ' ')}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  {name.replace(/-/g, ' ')}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
