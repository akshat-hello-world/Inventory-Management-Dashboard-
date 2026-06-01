```
inventory-order-management/
│
├── README.md
├── .gitignore
├── .env.example
├── docker-compose.yml
│
├── docs/
│   ├── architecture.png
│   ├── api-endpoints.md
│   └── deployment-guide.md
│
├── screenshots/
│   ├── dashboard.png
│   ├── products.png
│   ├── customers.png
│   ├── orders.png
│   └── mobile-view.png
│
├── backend/
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── .env.example
│   │
│   ├── alembic/
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions/
│   │
│   └── app/
│       │
│       ├── main.py
│       │
│       ├── core/
│       │   ├── config.py
│       │   ├── database.py
│       │   └── exceptions.py
│       │
│       ├── api/
│       │   └── v1/
│       │       ├── products.py
│       │       ├── customers.py
│       │       ├── orders.py
│       │       └── dashboard.py
│       │
│       ├── models/
│       │   ├── __init__.py
│       │   ├── product.py
│       │   ├── customer.py
│       │   ├── order.py
│       │   └── order_item.py
│       │
│       ├── schemas/
│       │   ├── product.py
│       │   ├── customer.py
│       │   ├── order.py
│       │   └── dashboard.py
│       │
│       ├── services/
│       │   ├── inventory_service.py
│       │   └── dashboard_service.py
│       │
│       ├── utils/
│       │   ├── validators.py
│       │   ├── constants.py
│       │   └── responses.py
│       │
│       └── db/
│           └── seed.py
│
├── frontend/
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   └── logo.png
│   │
│   └── src/
│       │
│       ├── main.jsx
│       ├── App.jsx
│       │
│       ├── api/
│       │   └── client.js
│       │
│       ├── routes/
│       │   └── AppRoutes.jsx
│       │
│       ├── layouts/
│       │   └── DashboardLayout.jsx
│       │
│       ├── features/
│       │   │
│       │   ├── dashboard/
│       │   │   ├── Dashboard.jsx
│       │   │   ├── StatsCards.jsx
│       │   │   ├── LowStockTable.jsx
│       │   │   ├── RecentOrders.jsx
│       │   │   └── api.js
│       │   │
│       │   ├── products/
│       │   │   ├── Products.jsx
│       │   │   ├── ProductForm.jsx
│       │   │   ├── ProductTable.jsx
│       │   │   ├── ProductModal.jsx
│       │   │   └── api.js
│       │   │
│       │   ├── customers/
│       │   │   ├── Customers.jsx
│       │   │   ├── CustomerForm.jsx
│       │   │   ├── CustomerTable.jsx
│       │   │   └── api.js
│       │   │
│       │   └── orders/
│       │       ├── Orders.jsx
│       │       ├── OrderDetails.jsx
│       │       ├── OrderForm.jsx
│       │       ├── OrderTable.jsx
│       │       ├── OrderSummary.jsx
│       │       └── api.js
│       │
│       ├── components/
│       │   │
│       │   ├── ui/
│       │   │   ├── Button.jsx
│       │   │   ├── Input.jsx
│       │   │   ├── Select.jsx
│       │   │   ├── Modal.jsx
│       │   │   ├── Loader.jsx
│       │   │   ├── EmptyState.jsx
│       │   │   ├── ConfirmDialog.jsx
│       │   │   └── ToastProvider.jsx
│       │   │
│       │   ├── layout/
│       │   │   ├── Sidebar.jsx
│       │   │   ├── Navbar.jsx
│       │   │   └── PageHeader.jsx
│       │   │
│       │   └── shared/
│       │       ├── SearchBar.jsx
│       │       ├── DataTable.jsx
│       │       └── StatusBadge.jsx
│       │
│       ├── hooks/
│       │   └── useFetch.js
│       │
│       ├── utils/
│       │   ├── constants.js
│       │   ├── formatCurrency.js
│       │   ├── formatDate.js
│       │   └── helpers.js
│       │
│       ├── assets/
│       │   ├── logo.svg
│       │   └── dashboard-banner.svg
│       │
│       └── styles/
│           └── index.css
│
└── .github/
    └── workflows/
        └── ci.yml
```
