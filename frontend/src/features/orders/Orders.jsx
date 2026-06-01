import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../../components/layout/PageHeader";
import SearchBar from "../../components/shared/SearchBar";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Modal from "../../components/ui/Modal";

import OrderTable from "./OrderTable";
import OrderForm from "./OrderForm";
import OrderDetails from "./OrderDetails";

import useFetch from "../../hooks/useFetch";

import {
  searchByFields,
} from "../../utils/helpers";

import {
  notify,
} from "../../components/ui/ToastProvider";

import {
  getOrders,
  createOrder,
  deleteOrder,
} from "./api";

import {
  getCustomers,
} from "../customers/api";

import {
  getProducts,
} from "../products/api";

const Orders = () => {
  // ==========================================
  // Data Fetching
  // ==========================================

  const {
    data: orders = [],
    loading,
    refetch,
  } = useFetch(getOrders);

  const {
    data: customers = [],
  } = useFetch(
    getCustomers
  );

  const {
    data: products = [],
  } = useFetch(
    getProducts
  );

  // ==========================================
  // State
  // ==========================================

  const [search, setSearch] =
    useState("");

  const [
    selectedOrder,
    setSelectedOrder,
  ] = useState(null);

  const [
    showCreateModal,
    setShowCreateModal,
  ] = useState(false);

  const [
    showDetails,
    setShowDetails,
  ] = useState(false);

  const [
    showDeleteDialog,
    setShowDeleteDialog,
  ] = useState(false);

  const [
    creating,
    setCreating,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  // ==========================================
  // Search
  // ==========================================

  const filteredOrders =
    useMemo(() => {
      return searchByFields(
        orders,
        search,
        ["id"]
      );
    }, [orders, search]);

  // ==========================================
  // Create Order
  // ==========================================

  const handleCreateOrder =
    async (payload) => {
      try {
        setCreating(true);

        await createOrder(
          payload
        );

        notify.success(
          "Order created successfully."
        );

        setShowCreateModal(
          false
        );

        await refetch();
      } catch (error) {
        notify.error(
          error.message
        );
      } finally {
        setCreating(false);
      }
    };

  // ==========================================
  // View Order
  // ==========================================

  const handleViewOrder = (
    order
  ) => {
    setSelectedOrder(
      order
    );

    setShowDetails(true);
  };

  // ==========================================
  // Delete Order
  // ==========================================

  const handleDeleteClick =
    (order) => {
      setSelectedOrder(
        order
      );

      setShowDeleteDialog(
        true
      );
    };

  const handleDelete =
    async () => {
      if (
        !selectedOrder
      ) {
        return;
      }

      try {
        setDeleting(true);

        await deleteOrder(
          selectedOrder.id
        );

        notify.success(
          "Order deleted successfully."
        );

        setShowDeleteDialog(
          false
        );

        setSelectedOrder(
          null
        );

        await refetch();
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
        title="Orders"
        description="Track customer orders and inventory movement."
        actionLabel="Create Order"
        actionIcon={
          <Plus size={16} />
        }
        onAction={() =>
          setShowCreateModal(
            true
          )
        }
      />

      <div className="page-toolbar">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search orders..."
        />

        <div className="page-meta">
          {
            filteredOrders.length
          }{" "}
          orders
        </div>
      </div>

      <OrderTable
        orders={
          filteredOrders
        }
        loading={loading}
        onView={
          handleViewOrder
        }
        onDelete={
          handleDeleteClick
        }
      />

      {/* Create Order */}

      <Modal
        isOpen={
          showCreateModal
        }
        title="Create Order"
        size="xl"
        onClose={() =>
          setShowCreateModal(
            false
          )
        }
      >
        <OrderForm
          customers={
            customers
          }
          products={
            products
          }
          loading={
            creating
          }
          onSubmit={
            handleCreateOrder
          }
          onCancel={() =>
            setShowCreateModal(
              false
            )
          }
        />
      </Modal>

      {/* Order Details */}

      <OrderDetails
        isOpen={
          showDetails
        }
        order={
          selectedOrder
        }
        onClose={() =>
          setShowDetails(
            false
          )
        }
      />

      {/* Delete Confirmation */}

      <ConfirmDialog
        isOpen={
          showDeleteDialog
        }
        title="Delete Order"
        message={`Are you sure you want to delete Order #${selectedOrder?.id}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        loading={
          deleting
        }
        onConfirm={
          handleDelete
        }
        onClose={() =>
          setShowDeleteDialog(
            false
          )
        }
      />
    </>
  );
};

export default Orders;