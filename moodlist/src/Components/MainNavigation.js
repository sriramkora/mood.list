import { Form, Link} from 'react-router-dom';

import classes from '../CSS/MainNavigation.module.css';

function MainNavigation() {
  // const token = useRouteLoaderData('root');
  const username = localStorage.getItem('username');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {/* {token && (< */}
            <li><Link to="/account">{username}</Link></li>
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          {/* )} */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
