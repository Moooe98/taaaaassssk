# Use the official MySQL image from the Docker Hub
FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=Mohamed__357789Essam
ENV MYSQL_DATABASE=crud

# Copy the SQL file to the Docker container
COPY ./mysql/init.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
