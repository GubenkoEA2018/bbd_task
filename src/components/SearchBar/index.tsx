// Core
import React, { FC, ReactElement, SyntheticEvent, KeyboardEvent } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { useHistory } from 'react-router-dom';

// Images
import SearchIcon from '@material-ui/icons/Search';

// Utils
import { Color } from '../../utils';
import { useSearchProducts } from '../../hooks';
import defaultImg from '../../assets/images/product-card/default.svg';
import { getImgURL } from '../../utils/getImgURL';
import { CatalogQuery, PublishedProduct } from '../../store/types/catalog';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    minWidth: 300,
    maxWidth: 530,
    width: 530,
    position: 'relative',
  },
  root: {
    padding: '7px 13px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: `2px solid ${Color.darkBlue}`,
    borderRadius: 4,
    boxSizing: 'border-box',
  },
  input: {
    marginLeft: 5,
    fontSize: 14,
    letterSpacing: 0.15,
    flex: 1,
    '& input': {
      padding: 0,
    },
  },
  searchIcon: {
    color: Color.darkBlue,
    cursor: 'pointer',
  },
  listBox: {
    width: '100%',
    margin: 0,
    padding: 0,
    zIndex: 1300,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 400,
    border: '1px solid rgba(0,0,0,.25)',
    borderRadius: 3,
    overscrollBehavior: 'none',
    '& li': {
      padding: '5px 10px',
    },
    '& li[data-focus="true"]': {
      backgroundColor: Color.darkRed,
      color: 'white',
      cursor: 'pointer',
    },
    '& li:active': {
      backgroundColor: Color.darkRed,
      color: 'white',
    },
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    '& p': {
      marginLeft: 30,
      fontSize: 13,
    },
  },
  image: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    minWidth: 50,
    maxWidth: 50,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  },
  productName: {
    lineHeight: '20px',
  },
  loading: {
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showAll: {
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      textDecoration: 'underline',
      backgroundColor: Color.e0,
      cursor: 'pointer',
    },
  },
}));

type SearchBarProps = {} & InputBaseProps;

export const SearchBar: FC<SearchBarProps> = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  const {
    handleSearch,
    searchedProducts,
    searchValue,
    loading,
    resetSearchedValue,
    resetSearchedProducts,
  } = useSearchProducts();

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'search-product',
    options: searchedProducts,
    getOptionLabel: (product) => product.name,
    autoSelect: false,
    onChange: (
      event: React.ChangeEvent<{}>,
      value: PublishedProduct | null,
    ) => {
      if (value) {
        history.push(`/catalog/${value.id}`);
      }
    },
  });

  const handleSearchRedirect = (): void => {
    setTimeout(() => {
      history.push({
        pathname: '/found-products',
        search: encodeURI(`${CatalogQuery.name}=${searchValue}`),
      });
      resetSearchedValue();
      resetSearchedProducts();
    }, 1000);
  };

  return (
    <>
      <div className={classes.wrapper} {...getRootProps()}>
        <div className={classes.root}>
          <InputBase
            className={classes.input}
            {...getInputProps()}
            placeholder="Искать товары"
            onChange={handleSearch}
            value={searchValue}
            onKeyPress={(e: KeyboardEvent<HTMLInputElement>): void => {
              if (e.key === 'Enter') {
                handleSearchRedirect();
              }
            }}
          />
          <SearchIcon
            className={classes.searchIcon}
            onClick={handleSearchRedirect}
          />
        </div>

        {(groupedOptions && groupedOptions.length > 0) || loading ? (
          <ul className={classes.listBox} {...getListboxProps()}>
            {groupedOptions && groupedOptions.length > 0 ? (
              <>
                {groupedOptions.map((option, index) => {
                  const { name, imageProducts } = option;

                  return (
                    <li
                      className={classes.listItem}
                      {...getOptionProps({ option, index })}
                    >
                      <div className={classes.image}>
                        <img
                          onError={(
                            e: SyntheticEvent<HTMLImageElement, Event>,
                          ): void => {
                            e.currentTarget.src = defaultImg;
                          }}
                          src={
                            imageProducts && imageProducts[0]
                              ? getImgURL(imageProducts[0])
                              : defaultImg
                          }
                          alt="product"
                        />
                      </div>

                      <p className={classes.productName}>{name}</p>
                    </li>
                  );
                })}
                <p className={classes.showAll} onClick={handleSearchRedirect}>
                  Показать все
                </p>
              </>
            ) : null}

            {loading ? (
              <div className={classes.loading}>
                <CircularProgress />
              </div>
            ) : null}
          </ul>
        ) : null}
      </div>
    </>
  );
};
