import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  const config = {
    build: {
      outDir: 'dist'
    }
  }
  
  if (command === 'build') {
    config.base = '/2025-birthday/'
  }
  
  return config
})
