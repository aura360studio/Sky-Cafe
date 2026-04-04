import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { CartBar } from './CartBar';
import { HamburgerMenu } from '../components/HamburgerMenu';

export const MobileShell = ({ children }) => {
  return (
    <div className="mobile-shell">
      <Header />
      <main className="content-area">
        {children}
      </main>
      <CartBar />
      <BottomNavigation />
      <HamburgerMenu />
    </div>
  );
};
