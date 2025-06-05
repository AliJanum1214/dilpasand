# Use the official Nginx image from Docker Hub
FROM nginx:latest

# Remove the default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom configuration file from the host to the container
COPY ./default.conf /etc/nginx/conf.d/

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Start Nginx when the container has provision
CMD ["nginx", "-g", "daemon off;"]
