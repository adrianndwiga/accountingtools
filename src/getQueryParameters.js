export function getQueryParameters() {
    let props = {
        start: '', 
        end: '',
        bucket: '', 
        key: '',
        includes: []
    }
    process.argv.forEach(param => {
        const parts = param.split(':');
        if(parts.length > 0 && props[parts[0].replace('-', '')] === '') {
            props[parts[0].replace('-', '')] = parts[1];
        } else if(parts.length > 0 && props[parts[0].replace('-', '')] && props[parts[0].replace('-', '')].length === 0) {
            props[parts[0].replace('-', '')] = parts[1].split(',');
        }
    });
    return props;
}

// module.exports = getQueryParameters;