from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application Settings

    Loads environment variables from .env file
    and validates configuration at startup.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # --------------------------------------------------
    # Application
    # --------------------------------------------------

    APP_NAME: str = "Inventory Order Management API"
    APP_VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api/v1"

    DEBUG: bool = False

    # --------------------------------------------------
    # Database
    # --------------------------------------------------

    DATABASE_URL_OVERRIDE: str | None = Field(
        default=None,
        validation_alias="DATABASE_URL",
    )
    POSTGRES_USER: str = Field(default="inventory_user", description="Database username")
    POSTGRES_PASSWORD: str = Field(default="inventory_password", description="Database password")
    POSTGRES_DB: str = Field(default="inventory_db", description="Database name")
    POSTGRES_HOST: str = Field(default="localhost", description="Database host")
    POSTGRES_PORT: int = Field(default=5432)

    # --------------------------------------------------
    # CORS
    # --------------------------------------------------

    FRONTEND_URL: str = "http://localhost:5173"
    CORS_ORIGINS: str = ""

    # --------------------------------------------------
    # Security
    # --------------------------------------------------

    SECRET_KEY: str = Field(
        default="change-this-in-production"
    )

    # --------------------------------------------------
    # Computed Database URL
    # --------------------------------------------------

    @property
    def DATABASE_URL(self) -> str:
        if self.DATABASE_URL_OVERRIDE:
            return self.DATABASE_URL_OVERRIDE.replace(
                "postgres://",
                "postgresql://",
                1,
            )

        return (
            f"postgresql+psycopg2://"
            f"{self.POSTGRES_USER}:"
            f"{self.POSTGRES_PASSWORD}@"
            f"{self.POSTGRES_HOST}:"
            f"{self.POSTGRES_PORT}/"
            f"{self.POSTGRES_DB}"
        )

    @property
    def ALLOWED_ORIGINS(self) -> list[str]:
        origins = [
            self.FRONTEND_URL,
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]

        if self.CORS_ORIGINS:
            origins.extend(
                origin.strip()
                for origin in self.CORS_ORIGINS.split(",")
                if origin.strip()
            )

        return list(dict.fromkeys(origins))


@lru_cache
def get_settings() -> Settings:
    """
    Cached settings instance.
    Prevents reloading env variables multiple times.
    """
    return Settings()


settings = get_settings()
