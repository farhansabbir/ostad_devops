FROM python:3.13-slim-bookworm

# Create non-root user `flask`
RUN useradd --create-home --shell /bin/bash flask

# Set working directory
WORKDIR /app

# Copy requirements and install as root
COPY requirements .
RUN pip install --no-cache-dir -r requirements

# Copy app source code
COPY . .

# Change ownership to `flask` user
RUN chown -R flask:flask /app

# Switch to non-root user
USER flask

# Set environment variable
ENV PORT=3000

# Run the app
CMD ["python", "app.py"]