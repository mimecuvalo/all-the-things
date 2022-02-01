import { Container, List, ListItem } from '@mui/material';

import Forbidden from 'components/error/403';
import Link from 'next/link';
import Unauthorized from 'components/error/401';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const USER_QUERY = gql`
  {
    user @client {
      email
    }
  }
`;

export default function Admin() {
  const { data } = useQuery(USER_QUERY);
  const user = data?.user;

  if (!user) {
    return <Unauthorized />;
  }

  if (!user?.model?.superuser && process.env.NODE_ENV !== 'development') {
    return <Forbidden />;
  }

  return <AdminApp />;
}

function AdminApp() {
  return (
    <Container>
      <List className="notranslate">
        <ListItem>
          <Link href="/admin" passHref>
            <a>System Info</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/admin/exceptions" passHref>
            <a>Exceptions</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/admin/experiments" passHref>
            <a>Experiments</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/admin/repl" passHref>
            <a>REPL</a>
          </Link>
        </ListItem>
      </List>
    </Container>
  );
}
