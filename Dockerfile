# Gunakan base image Nginx yang ringan
FROM nginx:alpine

# Salin file HTML, CSS, dan JavaScript ke direktori default Nginx
COPY Index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Perintah default untuk menjalankan Nginx
CMD ["nginx", "-g", "daemon off;"]

