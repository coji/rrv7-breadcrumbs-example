import { Link, NavLink, Outlet } from 'react-router';
import type { Route } from './+types/_layout';
import React from 'react';
import { HomeIcon } from '~/home-icon';

export default function Layout({ matches }: Route.ComponentProps) {
  const breadcrumbs = matches
    .filter((route) => route?.handle?.breadcrumb)
    .map((route) => ({ id: route?.id, label: route?.handle.breadcrumb }));

  return (
    <div className="grid grid-cols-1 grid-rows-[auto,1fr,auto] min-h-dvh">
      <header className="flex gap-4 items-center px-2 py-1">
        <Link to="/" className="flex-1">
          <h1 className="text-xl font-medium">
            React Router v7 Breadcrumbs Example
          </h1>
        </Link>
        <div className="flex gap-3">
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
            <ul className="flex gap-4 text-slate-500 text-xs items-center">
              <li>
                <NavLink to="/">
                  <HomeIcon />
                </NavLink>
              </li>

              {breadcrumbs.map((route) => (
                <React.Fragment key={route.id}>
                  <li>/</li>
                  <li>{route.label}</li>
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
