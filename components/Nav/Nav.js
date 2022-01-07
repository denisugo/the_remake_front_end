import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { routes } from "../../config/constants";
import { selectUser } from "../../features/UserSlice/UserSlice";
import style from "../../styles/Nav/Nav.module.css";
import { CartIcon, HomeIcon, UserIcon } from "../Icons";

function Nav({ user }) {
  // function Nav({ user }) {
  //const router = useRouter() || { pathname: {} }; // Alternative value for testing purposes
  //const pathname = router.pathname;

  //const user = useSelector(selectUser);

  return (
    <div className={style.nav} data-testid="nav">
      <div className={style.logo} data-testid="logo">
        <Image
          className={style.image}
          alt="Logo"
          role="img"
          layout="responsive"
          src="/assets/logo.png"
          width={1}
          height={1}
          priority={true}
        />
      </div>
      <div className={style.navigation} data-testid="navigation">
        <Link href={routes.home}>
          <a>
            <HomeIcon />
          </a>
        </Link>
        <Link href={user ? routes.cart : routes.login}>
          <a>
            <CartIcon />
          </a>
        </Link>
        <Link
          href={user ? routes.user : routes.login}
          data-testid="link-to-login-or-user"
        >
          <a>
            <UserIcon />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
