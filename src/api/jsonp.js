import originJsonp from 'jsonp';

export default function jsonp(url, data, option){
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
    return new Promise((resolver, reject) => {
        originJsonp(url, option, (err, data) => {
            if(!err){
                resolver(data);
            }else{
                reject(err);
            }
        });
    });
}

export function param(data){
    let url = '';
    for(const k in data){
        let value = data[k] !== undefined ? data[k] : '';
        url += '&' + k + '=' + data[k];
    }
    return url ? url.substring(1) : '';
}
