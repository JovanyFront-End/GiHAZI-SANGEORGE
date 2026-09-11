import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(rootDir, 'index.html'),
                products: resolve(rootDir, 'products.html'),
                product: resolve(rootDir, 'product.html'),
                compare: resolve(rootDir, 'compare.html'),
                cart: resolve(rootDir, 'cart.html'),
                wishlist: resolve(rootDir, 'wishlist.html'),
                about: resolve(rootDir, 'about.html'),
                contact: resolve(rootDir, 'contact.html'),
                branches: resolve(rootDir, 'branches.html'),
                warranty: resolve(rootDir, 'warranty.html'),
            }
        }
    }
})