const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

let images = [];


request('https://tuvalum.com/comprar/bicicleta-pinarello-25175', (err, res, body) => {
    if (!err && res.statusCode == 200) {
        let $ = cheerio.load(body);
        let tituloCompleto = $('h1', '#name-container');
        let marca = $('strong', 'h1.card-name');
        let anio = $('span', 'h1.card-name');
        let precioAntes = $('div.old-price', '.flex-row');
        let precioOferta = $('h3', '.flex-row');
        let sacaTalle = $('div.product-attribute', 'div.col-sm-12');
        var talle = sacaTalle.text().replace('vendedor', 'dueño');//
        $('.product-image', 'div.item').each(function () {


            var urlImg = $(this).attr('style');
            var spliteado = urlImg.split(["'"])[1];
            //console.log(urlImg);
            console.log(spliteado);//DEVUEVLE TODOS LOS LINKS DE LAS IMAGENES DE TUVALUM
            images.push(spliteado);// arreglo con los links de las imagenes 
            rutaCarpeta= '../../BICIS DRIVE/'+tituloCompleto.text();// VA A DOCUMENTOS / BICIS DRIVE 
            var dir = rutaCarpeta// crea el directorio y le guarda las imagenes
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            for (let i = 0; i < images.length-1; i++) {
                if (images[i]) {
                    request(images[i]).pipe(fs.createWriteStream(dir+`/photo_${i}.jpg`))
                }

            }
        });
        console.log(tituloCompleto.text() + ' Talle: ' + talle + ' PRECIO: $' + precioOferta.text() + ' ANTES: $' + precioAntes.text());

    }
    else {
        // console.log( res.statusCode );
        console.log(res);
        console.log(err);



    }
})



