import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import os from 'os'
// https://vite.dev/config/
export default defineConfig({
 
  server: {
    host: true, // Escucha en la red local
    port: 5173, // Puerto fijo (opcional)
  },
  plugins: [react(), {
      name: 'show-local-ip',
      configureServer(server) {
        server.httpServer?.once('listening', () => {
          const nets = os.networkInterfaces()
          let localIp = ''
          for (const name of Object.keys(nets)) {
            for (const net of nets[name] || []) {
              if (net.family === 'IPv4' && !net.internal) {
                localIp = net.address
              }
            }
          }
          console.log(`\n📱 Abre en tu móvil: http://${localIp}:5173\n`)
        })
      }
    }
  ]
})
