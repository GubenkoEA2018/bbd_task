// Core
import React, { FC, ReactElement, ReactNode } from 'react';
import cn from 'classnames';

// Styles
import styles from './styles.module.scss';

// Images
import { ReactComponent as EditBigIcon } from '../../assets/icons/delivery-address/edit-big.svg';
import { ReactComponent as EditSmallIcon } from '../../assets/icons/delivery-address/edit-small.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delivery-address/delete.svg';
import { ReactComponent as LocationIcon } from '../../assets/icons/delivery-address/location.svg';

// Hooks
import { useModalManage } from '../../dialogs/hooks';
import { useAddress } from '../../hooks';

// Types
import { Modals } from '../../store/types/modal';
import { AddressResponse, TaraByAddress } from '../../store/types/address';

type DeliveryAddressProps = {
  selectable?: boolean;
  addressList: AddressResponse[];
};

type DeliveryAddressItemProps = {
  active?: boolean;
  selectable?: boolean;
  address: AddressResponse;
  tara?: TaraByAddress;
  onEditModalOpen: () => void;
  onDeleteModalOpen: () => void;
  onSetActive?: () => void;
};

export type DeleteModalCallback = () => void;

export const DeliveryAddress: FC<DeliveryAddressProps> = ({
  selectable,
  addressList,
}: DeliveryAddressProps): ReactElement => {
  const { open } = useModalManage();
  const {
    activeAddress,
    deleteUserAddress,
    tara,
    setActiveUserAddress,
  } = useAddress();

  const handleAddressModalOpen = (address?: AddressResponse) => (): void => {
    open<AddressResponse>(Modals.Address, address);
  };

  const openDeleteModal = (id: number) => (): void => {
    open<DeleteModalCallback>(Modals.Delete, () => {
      deleteUserAddress(id);
    });
  };

  const handleActiveChange = (address: AddressResponse) => (): void => {
    setActiveUserAddress(address);
  };

  return (
    <div className={styles.Wrapper}>
      <ul className={styles.List}>
        {addressList && addressList.length
          ? addressList.map((address) => {
              return (
                <DeliveryAddressItem
                  active={activeAddress?.id === address.id}
                  selectable={selectable}
                  address={address}
                  tara={tara?.find((t) => t.id === address.id)}
                  onEditModalOpen={handleAddressModalOpen(address)}
                  onDeleteModalOpen={openDeleteModal(address.id)}
                  key={address.id}
                  onSetActive={handleActiveChange(address)}
                />
              );
            })
          : null}
      </ul>

      {!selectable ? (
        <div className={styles.AddButton} onClick={handleAddressModalOpen()}>
          <EditBigIcon className={styles.Icon} />
          <p className={styles.Label}>добавить адрес</p>
        </div>
      ) : null}
    </div>
  );
};

const DeliveryAddressItem: FC<DeliveryAddressItemProps> = ({
  active,
  selectable,
  address,
  onEditModalOpen,
  onDeleteModalOpen,
  tara,
  onSetActive,
}: DeliveryAddressItemProps): ReactElement => {
  const { fullAddress, name, doorphone, statusName } = address || {};
  const { taraOnHands, taraPaid } = tara || {};

  const className = cn({
    [styles.Item]: true,
    [styles.ItemSelectable]: selectable,
    [styles.ItemActive]: active,
  });

  const getTopLeftContent = (): ReactNode => {
    if (selectable) {
      if (active) {
        return <span>Выбран</span>;
      }

      return <span>Выбрать</span>;
    }

    return <span className={styles.AddressName}>{name}</span>;
  };

  const getTopRightContent = (): ReactNode => {
    if (selectable) {
      return <span className={styles.AddressName}>{name}</span>;
    }

    return <span className={styles.BottleLeft}>{statusName}</span>;
  };

  return (
    <li
      className={className}
      onClick={
        selectable
          ? (): void => {
              if (onSetActive) {
                onSetActive();
              }
            }
          : (): void => {
              return undefined;
            }
      }
    >
      <div className={styles.Top}>
        <div className={styles.Choose}>
          <LocationIcon className={styles.ChooseIcon} />
          <p className={styles.ChooseLabel}>{getTopLeftContent()}</p>
        </div>
        {getTopRightContent()}
      </div>

      <div className={styles.Center}>
        <p className={styles.AddressCurrent}>{fullAddress}</p>
        <p className={styles.AddressComment}>Код домофона:&nbsp;{doorphone}</p>
        <p className={styles.AddressTara}>Тара на руках:&nbsp;{taraOnHands}</p>
        <p className={styles.AddressTara}>Оплаченная тара:&nbsp;{taraPaid}</p>
      </div>

      {!selectable && (
        <div className={styles.Bottom}>
          <div
            className={styles.Control}
            onClick={(): void => {
              onEditModalOpen();
            }}
          >
            <EditSmallIcon className={styles.ControlIcon} />
            <p className={styles.ControlLabel}>редактировать</p>
          </div>

          {(taraOnHands && taraOnHands > 0) ||
          (taraPaid && taraPaid > 0) ? null : (
            <div className={styles.Control} onClick={onDeleteModalOpen}>
              <DeleteIcon className={styles.ControlIcon} />
              <p className={styles.ControlLabel}>удалить</p>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

DeliveryAddress.defaultProps = {
  selectable: false,
};

DeliveryAddressItem.defaultProps = {
  active: false,
  selectable: false,
};
