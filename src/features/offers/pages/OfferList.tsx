import { useEffect } from 'react';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { useNavigate } from 'react-router-dom';
import uiRoute from 'shared/constants/uiRoute';
import { OfferTable } from '../components/OfferTable';
import { OfferTableBanner } from '../components/OfferTableBanner';

function OfferList() {
  const resetOfferTableFilters = useBoundStore.use.resetOfferTableFilters();
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate(uiRoute.offers.offerForm);
  };

  const onEditClick = (id: string) => {
    navigate(`${uiRoute.offers.offerForm}?id=${id}`);
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
    </>
  );
}

export default OfferList;
