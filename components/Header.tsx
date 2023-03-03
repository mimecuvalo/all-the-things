import Login from './Login';
import { styled } from '@mui/material/styles';

const LoginWrapper = styled('div')`
  position: fixed;
  top: ${(props) => props.theme.spacing(1)};
  right: ${(props) => props.theme.spacing(2.5)}; // Swipeable drawer width.
`;

export default function Header() {
  return (
    <header>
      <nav></nav>

      <LoginWrapper>
        <Login />
      </LoginWrapper>
    </header>
  );
}
