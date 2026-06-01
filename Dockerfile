# Hugging Face Spaces backend deployment image.
# Local Docker Compose still uses backend/Dockerfile.

FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=7860

RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -u 1000 user

WORKDIR /home/user/app

COPY --chown=user backend/requirements.txt ./requirements.txt

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY --chown=user backend/ .

USER user

EXPOSE 7860

CMD ["sh", "-c", "alembic upgrade head && if [ \"$SEED_DATABASE\" = \"true\" ]; then python -m app.db.seed; fi && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-7860}"]
