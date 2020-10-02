// Core
import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

// Styles
import styles from './styles.module.scss';
// Hooks
import { useSetPageTitle } from '../../hooks';
// Utils
import { PageTitleEnum } from '../../utils/types';
import { PageTitle } from '../../components/PageTitle';
import bottle from '../../assets/images/others/bottle.png';
import { Button } from '../../components/ui/Button';

const Page404: FC = (): ReactElement => {
  useSetPageTitle(PageTitleEnum.NotFoundPage);

  return (
    <div className={styles.Wrapper}>
      <div className={`container ${styles.OrderSuccess}`}>
        <PageTitle current="404" />

        <div className={styles.ContentWrapper}>
          <div className={styles.Content}>
            <div className={styles.ImageWrapper}>
              <img src={bottle} alt="bottle" className={styles.Image} />
            </div>

            <div className={styles.TextWrapper}>
              <p className={styles.TextTitle}>404 ошибка</p>
              <p className={styles.Text}>
                ИЗВИНИТЕ! МЫ НЕ СМОГЛИ НАЙТИ ТО, ЧТО ВЫ ИСКАЛИ. Запрашиваемая
                страница не найдена.
              </p>
              <div className={styles.TextButton}>
                <Link to="/">
                  <Button bgColor="darkBlue" fullWidth>
                    на главную
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
