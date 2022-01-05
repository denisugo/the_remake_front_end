import Image from "next/image";

import style from "../../styles/Header/Header.module.css";
import Search from "../Search/Search";

function Header({ isMobile }) {
  return (
    <header className={style.header} data-testid="header">
      <div className={style.pills} data-testid="pills">
        <div className={style.image}>
          <Image
            alt="Pills"
            role="img"
            layout="responsive"
            src="/assets/pills.png"
            width={800}
            height={1525}
          />
        </div>
        <p className={style.description}>
          Mauris imperdiet gravida lorem, sed auctor lacus vulputate vitae.
          Donec commodo faucibus quam ut hendrerit. Aenean ac lacus quis eros
          lacinia varius. Vestibulum in leo molestie, sagittis tortor vitae,
          pellentesque felis. Nunc aliquam mauris nec quam vulputate, ac dictum
          massa ullamcorper.
        </p>
      </div>
      <div className={style.tabs} data-testid="tabs">
        <p className={style.description}>
          Integer ut elit sed tellus tristique sodales. Morbi id urna ipsum.
          Nunc pellentesque, neque ut mattis facilisis, mauris turpis mattis
          nunc, ac commodo tellus ipsum a nulla.
        </p>

        <div className={style.image}>
          <Image
            alt="Tabs"
            role="img"
            layout="responsive"
            src="/assets/tabs.png"
            width={1200}
            height={602}
          />
        </div>
      </div>
      {/* <Search /> */}
    </header>
  );
}

export default Header;
