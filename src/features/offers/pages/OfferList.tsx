import { useEffect, useState } from 'react';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import uiRoute from 'shared/constants/uiRoute';
import { OfferTable } from '../components/OfferTable';
import { OfferTableBanner } from '../components/OfferTableBanner';

function OfferList() {
  const resetOfferTableFilters = useBoundStore.use.resetOfferTableFilters();
  const navigate = useNavigate();
  // const { isOpen, onClose, onOpen } = useDisclosure();
  const theme = useTheme();
  // Offer Id set for editing/deleting (Can this be included in the `useDisclosure` hook and the extra state be removed?)
  const [offerId, setOfferId] = useState('');

  const handleAdd = () => {
    navigate(uiRoute.offers.offerForm);
  };

  const onEditClick = (id: string) => {
    setOfferId(id);
  };

  // const onCloseClick = () => {
  //   setOfferId('');
  // };

  useEffect(() => {
    return () => {
      resetOfferTableFilters();
    };
  }, [resetOfferTableFilters]);

  return (
    <>
      <OfferTableBanner onAddClick={handleAdd} />
      <OfferTable onEditClick={onEditClick} />
      {/* {isOpen && (
        <OfferAddEditModal editOfferId={offerId} onClose={onCloseClick} />
      )} */}
    </>
  );
}

export default OfferList;
