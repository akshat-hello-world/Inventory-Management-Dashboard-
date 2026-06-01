import { useMemo, useState } from "react";
import {
  ArrowDownAZ,
  Boxes,
  Grid2X2,
  ListFilter,
  ListTree,
  PackageCheck,
  Plus,
  RotateCcw,
  ScanLine,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import SearchBar from "../../components/shared/SearchBar";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Button from "../../components/ui/Button";

import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";

import useFetch from "../../hooks/useFetch";

import {
  searchByFields,
} from "../../utils/helpers";

import {
  getProducts,
  deleteProduct,
} from "./api";

import {
  notify,
} from "../../components/ui/ToastProvider";

const Products = () => {
  const {
    data: products = [],
    loading,
    refetch,
  } = useFetch(getProducts);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [stockFilter, setStockFilter] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("az");

  const [viewMode, setViewMode] =
    useState("list");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [
    selectedProduct,
    setSelectedProduct,
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

  const filteredProducts =
    useMemo(() => {
      const searched = searchByFields(
        products,
        search,
        [
          "name",
          "sku",
        ]
      );

      return searched
        .filter((product) => {
          if (statusFilter === "active") {
            return product.stock_quantity > 10;
          }

          if (statusFilter === "low") {
            return (
              product.stock_quantity > 0 &&
              product.stock_quantity <= 10
            );
          }

          if (statusFilter === "out") {
            return product.stock_quantity === 0;
          }

          return true;
        })
        .filter((product) => {
          if (stockFilter === "low") {
            return product.stock_quantity <= 10;
          }

          if (stockFilter === "healthy") {
            return product.stock_quantity > 10;
          }

          return true;
        })
        .sort((a, b) => {
          if (sortBy === "stock") {
            return (
              a.stock_quantity -
              b.stock_quantity
            );
          }

          if (sortBy === "price") {
            return (
              Number(b.price) -
              Number(a.price)
            );
          }

          return a.name.localeCompare(
            b.name
          );
        });
    }, [
      products,
      search,
      statusFilter,
      stockFilter,
      sortBy,
    ]);

  const inventoryCounts =
    useMemo(() => {
      const all =
        products?.length ?? 0;

      const active =
        products?.filter(
          (product) =>
            product.stock_quantity >
            10
        ).length ?? 0;

      const low =
        products?.filter(
          (product) =>
            product.stock_quantity >
              0 &&
            product.stock_quantity <=
              10
        ).length ?? 0;

      const out =
        products?.filter(
          (product) =>
            product.stock_quantity ===
            0
        ).length ?? 0;

      return {
        all,
        active,
        low,
        out,
      };
    }, [products]);

  const resetFilters = () => {
    setStatusFilter("all");
    setStockFilter("all");
    setSortBy("az");
    setSearch("");
  };

  // ==========================================
  // Modal Actions
  // ==========================================

  const openCreateModal =
    () => {
      setSelectedProduct(null);
      setIsModalOpen(true);
    };

  const openEditModal = (
    product
  ) => {
    setSelectedProduct(
      product
    );

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // ==========================================
  // Delete
  // ==========================================

  const openDeleteDialog = (
    product
  ) => {
    setSelectedProduct(
      product
    );

    setShowDeleteDialog(true);
  };

  const closeDeleteDialog =
    () => {
      setSelectedProduct(null);
      setShowDeleteDialog(false);
    };

  const handleDelete =
    async () => {
      if (
        !selectedProduct
      ) {
        return;
      }

      try {
        setDeleting(true);

        await deleteProduct(
          selectedProduct.id
        );

        notify.success(
          "Product deleted successfully."
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
      <section className="inventory-console">
        <aside className="inventory-filters">
          <div className="inventory-filter-brand">
            <div className="inventory-filter-mark">
              <Boxes size={20} />
            </div>

            <div>
              <span>
                Inventory
              </span>
              <strong>
                Control
              </strong>
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-label">
              Product Status
            </div>

            <div className="filter-grid">
              <button
                type="button"
                className={
                  statusFilter === "all"
                    ? "filter-chip filter-chip--active"
                    : "filter-chip"
                }
                onClick={() =>
                  setStatusFilter("all")
                }
              >
                <span>All</span>
                <strong>
                  {inventoryCounts.all}
                </strong>
              </button>

              <button
                type="button"
                className={
                  statusFilter === "active"
                    ? "filter-chip filter-chip--active"
                    : "filter-chip"
                }
                onClick={() =>
                  setStatusFilter("active")
                }
              >
                <span>Active</span>
                <strong>
                  {inventoryCounts.active}
                </strong>
              </button>

              <button
                type="button"
                className={
                  statusFilter === "low"
                    ? "filter-chip filter-chip--active"
                    : "filter-chip"
                }
                onClick={() =>
                  setStatusFilter("low")
                }
              >
                <span>Low</span>
                <strong>
                  {inventoryCounts.low}
                </strong>
              </button>

              <button
                type="button"
                className={
                  statusFilter === "out"
                    ? "filter-chip filter-chip--active"
                    : "filter-chip"
                }
                onClick={() =>
                  setStatusFilter("out")
                }
              >
                <span>Out</span>
                <strong>
                  {inventoryCounts.out}
                </strong>
              </button>
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-label">
              Product Type
            </div>

            <div className="filter-segment">
              <button type="button">
                Retail
              </button>
              <button type="button">
                Wholesale
              </button>
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">
              Sort By
            </label>

            <div className="filter-select">
              <ArrowDownAZ size={16} />
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
              >
                <option value="az">
                  Alphabetical A-Z
                </option>
                <option value="stock">
                  Stock alert first
                </option>
                <option value="price">
                  Highest price
                </option>
              </select>
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">
              Stock Alert
            </label>

            <div className="filter-select">
              <ListFilter size={16} />
              <select
                value={stockFilter}
                onChange={(event) =>
                  setStockFilter(
                    event.target.value
                  )
                }
              >
                <option value="all">
                  All stock
                </option>
                <option value="low">
                  Low and out
                </option>
                <option value="healthy">
                  Healthy stock
                </option>
              </select>
            </div>
          </div>

          <button
            type="button"
            className="filter-reset"
            onClick={resetFilters}
          >
            <RotateCcw size={16} />
            Reset Filters
          </button>
        </aside>

        <div className="inventory-panel">
          <div className="inventory-topline">
            <div>
              <div className="inventory-kicker">
                <Sparkles size={15} />
                Premium stockroom
              </div>

              <h2>
                Product
              </h2>

              <p>
                {inventoryCounts.all} total products
              </p>
            </div>

            <Button
              leftIcon={
                <Plus size={16} />
              }
              onClick={
                openCreateModal
              }
            >
              Add Product
            </Button>
          </div>

          <div className="inventory-toolbar">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search product..."
            />

            <div className="inventory-tool-actions">
              <button
                type="button"
                className="inventory-icon-button"
              >
                <ScanLine size={17} />
                <span>Scan</span>
              </button>

              <button
                type="button"
                className={
                  viewMode === "list"
                    ? "inventory-icon-button inventory-icon-button--active"
                    : "inventory-icon-button"
                }
                onClick={() =>
                  setViewMode("list")
                }
                aria-label="List view"
              >
                <ListTree size={17} />
              </button>

              <button
                type="button"
                className={
                  viewMode === "grid"
                    ? "inventory-icon-button inventory-icon-button--active"
                    : "inventory-icon-button"
                }
                onClick={() =>
                  setViewMode("grid")
                }
                aria-label="Grid view"
              >
                <Grid2X2 size={17} />
              </button>

              <button
                type="button"
                className="inventory-icon-button"
              >
                <SlidersHorizontal size={17} />
              </button>
            </div>
          </div>

          <div className="inventory-selection-bar">
            <div>
              <PackageCheck size={16} />
              <span>
                Selected ({filteredProducts.length})
              </span>
            </div>

            <div className="inventory-selection-actions">
              <button type="button">
                Compare Stock Chart
              </button>
              <button type="button">
                Hide
              </button>
              <button type="button">
                Delete
              </button>
            </div>
          </div>

          <ProductTable
            products={
              filteredProducts
            }
            loading={loading}
            viewMode={viewMode}
            onEdit={
              openEditModal
            }
            onDelete={
              openDeleteDialog
            }
          />
        </div>
      </section>

      <ProductModal
        isOpen={isModalOpen}
        product={
          selectedProduct
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
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
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

export default Products;
