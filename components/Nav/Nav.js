import NavDesktop from "./Desktop/NavDesktop";
import NavMobile from "./Mobile/NavMobile";

function Nav({ user, isMobile }) {
  return (
    <>
      {!isMobile && <NavDesktop user={user} />}
      {isMobile && <NavMobile user={user} />}
    </>
  );
}

export default Nav;
