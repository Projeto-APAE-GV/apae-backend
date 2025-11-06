
// ecosystem.config.js - Backend (apae-backend)
module.exports = {
    apps: [{
        name: 'apae-backend',
        script: './dist/src/main.js',
        instances: 1,
        exec_mode: 'fork',
        autorestart: true,
        watch: false,
        max_memory_restart: '500M',
        env: {
            NODE_ENV: 'production',
            PORT: 3000
        },
        error_file: '/app/logs/error.log',
        out_file: '/app/logs/out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        merge_logs: true,
        // Configurações de reinicialização em caso de falha
        min_uptime: '10s',
        max_restarts: 10,
        restart_delay: 4000,
        // Logs com rotação para não ocupar muito espaço
        log_type: 'json',
        // Variáveis de ambiente (serão sobrescritas pelo docker-compose)
        env_production: {
            NODE_ENV: 'production'
        }
    }]
};