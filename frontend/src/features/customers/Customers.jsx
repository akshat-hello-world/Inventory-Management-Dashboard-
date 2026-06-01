import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../../components/layout/PageHeader";
import SearchBar from "../../components/shared/SearchBar";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

import CustomerTable from "./CustomerTable";
import CustomerModal from "./CustomerModal";

import useFetch from "../../hooks/useFetch";

import {
  searchByFields,
} from "../../utils/helpers";

import {
  getCustomers,
  deleteCustomer,
} from "./api";

import {
  notify,
} from "../../components/ui/ToastProvider";

const Customers = () => {
  const {
    data: customers = [],
    loading,
    refetch,
  } = useFetch(
    getCustomers
  );

  const [search, setSearch] =
    useState("");

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const [
    selectedCustomer,
    setSelectedCustomer,
  ] = useState(null);

  const [
    showDeleteDialog,
    setShowDeleteDialog,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  // ==========================================
  // Search
  // ==========================================

  const filteredCustomers =
    useMemo(() => {
      return searchByFields(
        customers || [],
        search,
        [
          "full_name",
          "email",
          "phone",
        ]
      );
    }, [
      customers,
      search,
    ]);

  // ==========================================
  // Modal Actions
  // ==========================================

  const openCreateModal =
    () => {
      setSelectedCustomer(
        null
      );

      setIsModalOpen(true);
    };

  const openEditModal = (
    customer
  ) => {
    setSelectedCustomer(
      customer
    );

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCustomer(
      null
    );

    setIsModalOpen(false);
  };

  // ==========================================
  // Delete Actions
  // ==========================================

  const openDeleteDialog = (
    customer
  ) => {
    setSelectedCustomer(
      customer
    );

    setShowDeleteDialog(true);
  };

  const closeDeleteDialog =
    () => {
      setSelectedCustomer(
        null
      );

      setShowDeleteDialog(false);
    };

  const handleDelete =
    async () => {
      if (
        !selectedCustomer
      ) {
        return;
      }

      try {
        setDeleting(true);

        await deleteCustomer(
          selectedCustomer.id
        );

        notify.success(
          "Customer deleted successfully."
        );

        await refetch();

        closeDeleteDialog();
      } catch (error) {
        notify.error(
          error.message
        );
      } finally {
        setDeleting(false);
      }
    };

  return (
    <>
      <PageHeader
        title="Customers"
        description="Manage customer records and contact information."
        actionLabel="Add Customer"
        actionIcon={
          <Plus size={16} />
        }
        onAction={
          openCreateModal
        }
      />

      <div className="page-toolbar">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search customers..."
        />

        <div className="page-meta">
          {
            (filteredCustomers || []).length
          }{" "}
          customers
        </div>
      </div>

      <CustomerTable
        customers={
          filteredCustomers
        }
        loading={loading}
        onEdit={
          openEditModal
        }
        onDelete={
          openDeleteDialog
        }
      />

      <CustomerModal
        isOpen={isModalOpen}
        customer={
          selectedCustomer
        }
        onClose={
          closeModal
        }
        onSuccess={refetch}
      />

      <ConfirmDialog
        isOpen={
          showDeleteDialog
        }
        title="Delete Customer"
        message={`Are you sure you want to delete "${selectedCustomer?.full_name}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
        variant="danger"
        onConfirm={
          handleDelete
        }
        onClose={
          closeDeleteDialog
        }
      />
    </>
  );
};

export default Customers;
