import os
import sys
from pathlib import Path


SPACE_ID = "tokyo-boy/inventory-backend"
ROOT = Path(__file__).resolve().parents[1]
SECRETS_FILE = ROOT / ".deploy-secrets.local"


def load_env_file(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}

    if not path.exists():
        return values

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()

        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")

    return values


def main() -> int:
    try:
        from huggingface_hub import HfApi
    except ImportError:
        print(
            "Missing huggingface_hub. Install it with:\n"
            "python -m pip install huggingface_hub"
        )
        return 1

    values = {
        **load_env_file(SECRETS_FILE),
        **os.environ,
    }

    token = values.get("HF_TOKEN")
    database_url = values.get("DATABASE_URL")
    frontend_url = values.get("FRONTEND_URL", "http://localhost:5173")
    cors_origins = values.get("CORS_ORIGINS", frontend_url)
    seed_database = values.get("SEED_DATABASE", "true")

    missing = [
        key
        for key, value in {
            "HF_TOKEN": token,
            "DATABASE_URL": database_url,
        }.items()
        if not value
    ]

    if missing:
        print(
            "Missing required values in .deploy-secrets.local: "
            + ", ".join(missing)
        )
        print(
            "\nCreate .deploy-secrets.local with:\n"
            "HF_TOKEN=hf_...\n"
            "DATABASE_URL=postgresql://...\n"
            "FRONTEND_URL=http://localhost:5173\n"
            "CORS_ORIGINS=http://localhost:5173\n"
            "SEED_DATABASE=true"
        )
        return 1

    api = HfApi(token=token)

    secrets = {
        "DATABASE_URL": database_url,
    }

    variables = {
        "DEBUG": "false",
        "LOW_STOCK_THRESHOLD": "10",
        "SEED_DATABASE": seed_database,
        "FRONTEND_URL": frontend_url,
        "CORS_ORIGINS": cors_origins,
    }

    for key, value in secrets.items():
        api.add_space_secret(
            repo_id=SPACE_ID,
            key=key,
            value=value,
        )
        print(f"Set secret: {key}")

    for key, value in variables.items():
        api.add_space_variable(
            repo_id=SPACE_ID,
            key=key,
            value=value,
        )
        print(f"Set variable: {key}={value}")

    print(f"Configured Hugging Face Space: {SPACE_ID}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
