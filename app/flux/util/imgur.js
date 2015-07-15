export default function (file, cb) {
    var xhttp    = new XMLHttpRequest(),
        fd       = new FormData();

    fd.append('image', file);
    xhttp.open('POST', 'https://api.imgur.com/3/image');
    xhttp.setRequestHeader('Authorization', 'Client-ID fd9fe8b21156bc0'); //Get yout Client ID here: http://api.imgur.com/
    xhttp.onreadystatechange = function () {
        if (xhttp.status === 200 && xhttp.readyState === 4) {
            var res = JSON.parse(xhttp.responseText), link, 
            link = res.data.link;
            cb(link)
        }
    };
    xhttp.send(fd);
}