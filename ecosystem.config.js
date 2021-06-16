module.exports = {
    apps: [{
        name: "app",
        script: "./app.js",
        exec_mode: "cluster",
        script: 'npm',
        args: "start",
        env: {
            PORT: 3000,
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}