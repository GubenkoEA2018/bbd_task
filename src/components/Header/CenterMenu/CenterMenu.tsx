import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './CenterMenu.module.scss';
import logo from '../../../assets/images/center-menu/logo.png';
import { Person } from './Person';
import { Favourite } from './Favourite';
import { Cart } from './Cart';
import { SearchBar } from '../../SearchBar';
// import { ReactComponent as WaterBottleIcon } from '../../../assets/icons/center-menu/water_bottle.svg';

export const CenterMenu: FC = (): ReactElement => {
  return (
    <div className={styles.CenterMenu}>
      <div className={`container ${styles.Wrapper}`}>
        <div className={styles.LogoWrapper}>
          <Link to="/">
            <img className={styles.Logo} src={logo} alt="logo" />
          </Link>
        </div>

        <SearchBar />

        {/* <div className={styles.Restock}> */}
        {/*  <WaterBottleIcon /> */}
        {/*  <div className={styles.RestockContent}> */}
        {/*    <p className={styles.RestockLabelOne}>пополнить</p> */}
        {/*    <p className={styles.RestockLabelTwo}>запасы воды</p> */}
        {/*  </div> */}
        {/* </div> */}

        <div className={styles.RightControls}>
          <Person />
          <Favourite />
          <Cart />
        </div>
      </div>
    </div>
  );
};
