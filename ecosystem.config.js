module.exports = {
    apps: [
        {
            name: 'CMIP-backend-debug',
            script: 'dist/server.js',
            args: '--nolazy --inspect=0.0.0.0:65535',
            node_args: '--nolazy --inspect=0.0.0.0:65535',
            instances: 1,
            autorestart: true,
            watch: true,
            'restart-delay': 10,
            ignore_watch: [
                'dist/logs',
                'dist/public',
                'dist/py-scripts',
                'dist/refactors',
                'dist/test',
                'dist/upload',
                'src',
                'site',
                '.vscode',
                'node_modules'
            ],
            max_memory_restart: '2G',
            output: 'src/logs/log.log',
            error: 'src/logs/error.err',
            log_date_format: 'YYYY-MM-DD HH:mm',
            merge_logs: true,
        },
        {
            name: 'CMIP-backend-release',
            script: 'dist/server.js',
            args: '--nolazy --inspect=0.0.0.0:65535',
            node_args: '--nolazy --inspect=0.0.0.0:65535',
            instances: 4,
            autorestart: true,
            watch: true,
            ignore_watch: [
                'dist/logs',
                'dist/public',
                'dist/py-scripts',
                'dist/refactors',
                'dist/test',
                'dist/upload',
                'src',
                'site',
                '.vscode',
                'node_modules'
            ],
            max_memory_restart: '2G',
            output: 'dist/logs/log.log',
            error: 'dist/logs/error.err',
            log_date_format: 'YYYY-MM-DD HH:mm',
            merge_logs: true,
        }
    ]
};