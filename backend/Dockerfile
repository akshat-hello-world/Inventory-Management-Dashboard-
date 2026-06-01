# ==========================================
# Base Image
# ==========================================

FROM python:3.12-slim

# ==========================================
# Environment Variables
# ==========================================

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ==========================================
# System Dependencies
# ==========================================

RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# ==========================================
# Working Directory
# ==========================================

WORKDIR /app

# ==========================================
# Install Python Dependencies
# ==========================================

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ==========================================
# Copy Application
# ==========================================

COPY . .

# ==========================================
# Create Non-Root User
# ==========================================

RUN useradd -m appuser && \
    chown -R appuser:appuser /app

USER appuser

# ==========================================
# Expose Port
# ==========================================

EXPOSE 8000

# ==========================================
# Start Application
# ==========================================

CMD ["sh", "-c", "alembic upgrade head && python -m app.db.seed && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
