FROM python:3.13-slim-bookworm

WORKDIR /app

ENV PORT=3000

COPY requirements .
RUN pip install --no-cache-dir -r requirements

COPY . .

CMD ["python", "app.py"]