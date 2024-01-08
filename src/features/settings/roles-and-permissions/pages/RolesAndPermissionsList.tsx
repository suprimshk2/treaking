import useDisclosure from 'shared/hooks/useDisclosure';
import { useState } from 'react';
import { RolesAndPermissionsTableBanner } from '../components/RolesAndPermissionsTableBanner';
import RolesAndPermissionTable from '../components/RolesAndPermissionTable';
import { RolesAddEditModal } from '../components/RolesAddEditModal';

export default function RolesAndPermissionsList() {
  const [roleId, setRoleId] = useState('');
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onEditClick = (id: string) => {
    onOpen();
    setRoleId(id);
  };

  const onCloseClick = () => {
    onClose();
  };

  return (
    <>
      <RolesAndPermissionsTableBanner onAddClick={() => onOpen()} />
      <RolesAndPermissionTable onEditClick={onEditClick} />
      {isOpen && (
        <RolesAddEditModal editRoleId={roleId} onClose={onCloseClick} />
      )}
    </>
  );
}
