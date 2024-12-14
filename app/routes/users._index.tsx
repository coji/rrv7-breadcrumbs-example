import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link to="test">Test User</Link>
      <Link to="user1">User 1</Link>
      <Link to="user2">User 2</Link>
    </div>
  );
}
