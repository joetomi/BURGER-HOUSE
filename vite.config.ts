import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function localAdminPlugin(): Plugin {
  return {
    name: 'local-admin-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/admin/')) return next();

        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
          res.setHeader('Content-Type', 'application/json');

          if (req.url === '/api/admin/session') {
            res.end(JSON.stringify({ authenticated: true, username: 'admin' }));
            return;
          }

          if (req.url === '/api/admin/login') {
            res.end(JSON.stringify({ authenticated: true, username: 'admin' }));
            return;
          }

          if (req.url === '/api/admin/content') {
            const menu = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'src/data/menu.json'), 'utf-8'));
            const promotions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'src/data/promotions.json'), 'utf-8'));
            res.end(JSON.stringify({ baseSha: 'local-dev', menu, promotions }));
            return;
          }

          if (req.url === '/api/admin/publish') {
            try {
              const payload = JSON.parse(body);
              if (payload.menu) {
                fs.writeFileSync(path.resolve(__dirname, 'src/data/menu.json'), JSON.stringify(payload.menu, null, 2), 'utf-8');
              }
              if (payload.promotions) {
                fs.writeFileSync(path.resolve(__dirname, 'src/data/promotions.json'), JSON.stringify(payload.promotions, null, 2), 'utf-8');
              }
              res.end(JSON.stringify({ commitSha: 'local-dev-saved' }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }

          if (req.url === '/api/admin/logout') {
            res.end(JSON.stringify({ authenticated: false }));
            return;
          }

          next();
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localAdminPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
