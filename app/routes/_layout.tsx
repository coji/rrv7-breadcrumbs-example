import { Link, NavLink, Outlet, useMatches, type UIMatch } from 'react-router';
import React from 'react';
import { HomeIcon } from '~/home-icon';
import type { Route } from './+types/_layout';

function isBreadcrumbMatch<Data>(match?: UIMatch<Data>): match is UIMatch<
  Data,
  {
    breadcrumbs: (data: unknown) => string;
  }
> {
  if (!match) return false;
  if (typeof match.handle !== 'object') return false;
  if (match.handle === null) return false;
  if (!('breadcrumbs' in match.handle)) return false;
  if (typeof match.handle.breadcrumbs === 'function') return true;
  return false;
}

export default function Layout() {
  const breadcrumbs = useMatches()
    .filter((match) => isBreadcrumbMatch(match))
    .map((match) => ({
      id: match.id,
      breadcrumbs: match.handle.breadcrumbs(match.data),
    }));

  return (
    <div className="grid grid-cols-1 grid-rows-[auto,1fr,auto] min-h-dvh">
      <header className="flex gap-4 items-center px-2 py-1">
        <Link to="/" className="flex-1">
          <h1 className="text-xl font-medium">
            React Router v7 Breadcrumbs Example
          </h1>
        </Link>
        <div className="flex gap-4">
          <NavLink to="/">
            <HomeIcon /> Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
        </div>
      </header>

      <div>
        {/* breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="px-2 py-1">
            <ul className="flex gap-2 text-slate-500 text-xs items-center">
              <li>
                <NavLink to="/">
                  <HomeIcon className="w-3 h-3" />
                </NavLink>
              </li>

              {breadcrumbs.map((route) => (
                <React.Fragment key={route.id}>
                  <li>/</li>
                  <li>{route.breadcrumbs}</li>
                </React.Fragment>
              ))}
            </ul>
          </nav>
        )}

        <main className="px-2 py-1">
          <Outlet />
        </main>
      </div>

      <footer className="px-2 py-1">
        Copyright &copy; {new Date().getFullYear()} coji
      </footer>
    </div>
  );
}
