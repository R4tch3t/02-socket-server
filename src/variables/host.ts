const configurations: {[index: string]:any} = {
    production: { ssl: true, port: 443, hostname: 'localhost' },
    development: { ssl: false, port: 3000, hostname: 'localhost' },
}; 
const url = () => {
    const environment = process.env.NODE_ENV || 'development';
    const config = configurations[environment];
    return `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}`
}
export {
    configurations,
    url
}