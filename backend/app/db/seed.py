from decimal import Decimal

from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.customer import Customer
from app.models.product import Product


PRODUCTS = [
    {
        "name": "Mechanical Keyboard",
        "sku": "KB-001",
        "price": Decimal("3499.00"),
        "stock_quantity": 15,
    },
    {
        "name": "Wireless Mouse",
        "sku": "MOUSE-001",
        "price": Decimal("1499.00"),
        "stock_quantity": 4,
    },
    {
        "name": "27 Inch Monitor",
        "sku": "MON-001",
        "price": Decimal("18999.00"),
        "stock_quantity": 8,
    },
    {
        "name": "Laptop Stand",
        "sku": "STAND-001",
        "price": Decimal("999.00"),
        "stock_quantity": 3,
    },
    {
        "name": "USB-C Hub",
        "sku": "HUB-001",
        "price": Decimal("2499.00"),
        "stock_quantity": 12,
    },
    {
        "name": "External SSD 1TB",
        "sku": "SSD-001",
        "price": Decimal("6999.00"),
        "stock_quantity": 6,
    },
    {
        "name": "Webcam HD",
        "sku": "CAM-001",
        "price": Decimal("2999.00"),
        "stock_quantity": 2,
    },
    {
        "name": "Bluetooth Speaker",
        "sku": "SPK-001",
        "price": Decimal("3999.00"),
        "stock_quantity": 10,
    },
    {
        "name": "Office Chair",
        "sku": "CHAIR-001",
        "price": Decimal("12999.00"),
        "stock_quantity": 5,
    },
    {
        "name": "Desk Lamp",
        "sku": "LAMP-001",
        "price": Decimal("799.00"),
        "stock_quantity": 20,
    },
]


CUSTOMERS = [
    {
        "full_name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "9876543210",
    },
    {
        "full_name": "Jane Smith",
        "email": "jane.smith@example.com",
        "phone": "9876543211",
    },
    {
        "full_name": "Michael Johnson",
        "email": "michael.johnson@example.com",
        "phone": "9876543212",
    },
    {
        "full_name": "Emily Davis",
        "email": "emily.davis@example.com",
        "phone": "9876543213",
    },
    {
        "full_name": "David Wilson",
        "email": "david.wilson@example.com",
        "phone": "9876543214",
    },
    {
        "full_name": "Sophia Brown",
        "email": "sophia.brown@example.com",
        "phone": "9876543215",
    },
]


def seed_products(db: Session) -> None:
    """
    Seed products table.
    """

    if db.query(Product).first():
        print("Products already seeded.")
        return

    products = [
        Product(**product_data)
        for product_data in PRODUCTS
    ]

    db.add_all(products)
    db.commit()

    print(f"Seeded {len(products)} products.")


def seed_customers(db: Session) -> None:
    """
    Seed customers table.
    """

    if db.query(Customer).first():
        print("Customers already seeded.")
        return

    customers = [
        Customer(**customer_data)
        for customer_data in CUSTOMERS
    ]

    db.add_all(customers)
    db.commit()

    print(f"Seeded {len(customers)} customers.")


def seed_database() -> None:
    """
    Run all database seeds.
    """

    db = SessionLocal()

    try:
        seed_products(db)
        seed_customers(db)

        print("Database seeding completed.")

    except Exception as exc:
        db.rollback()
        print(f"Seeding failed: {exc}")
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()