# The Kush Report

Oregon cannabis property & license marketplace.

## Deploy to your server

Upload the `dist/` folder to your web root. Configure your web server to serve `index.html` for all routes.

### Nginx config
```nginx
server {
    listen 80;
    server_name thekushreport.co www.thekushreport.co;
    root /var/www/thekushreport.co;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Cloudflare
- A record -> your server IP, Proxied (orange cloud)
- SSL mode: Full

## Admin login
URL: /login  Username: admin  Password: tkr2025
Change password in src/context/AppContext.jsx line 6.

## Dev
npm install && npm run dev

## Build
npm run build  (output: dist/)
