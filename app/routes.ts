import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/_layout.tsx', [
    index('routes/index.tsx'),
    route('/users', 'routes/users.tsx', [
      index('routes/users._index.tsx'),
      route('/users/:user', 'routes/users.$id.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
