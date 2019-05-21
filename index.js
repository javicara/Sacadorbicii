const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

let images = [];


/*request('https://tuvalum.com/comprar/bicicleta-pinarello-25175', (err, res, body) => {
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
})/*/
favoritos();

function favoritos (){
    request('https://tuvalum.com/ofertas?appbundle_filter%5Btext%5D=&appbundle_filter%5Btype%5D=1&appbundle_filter%5Bcategory%5D=2&precio_min=1000&precio_max=4000&appbundle_filter%5Bextra_form%5D%5Bbrand%5D=&appbundle_filter%5Bextra_form%5D%5Bmaterial%5D%5B%5D=2&appbundle_filter%5Bextra_form%5D%5Bsize%5D%5B%5D=22&appbundle_filter%5Bextra_form%5D%5Bsize%5D%5B%5D=30&appbundle_filter%5Bextra_form%5D%5Bsize%5D%5B%5D=31&appbundle_filter%5Bextra_form%5D%5Bsize%5D%5B%5D=32&appbundle_filter%5Bextra_form%5D%5Bsize%5D%5B%5D=33&appbundle_filter%5Bextra_form%5D%5BmainGroup%5D=&ofertas=1&ofertas=1&appbundle_filter%5B_token%5D=vUTGO2M_fA_zX1g4JfQiizbGaOZMqdqnJD_CZLB_wdg', (err, res, body) => {
    if (!err && res.statusCode == 200) {
        let $ = cheerio.load(body);
        const itemsFavoritos = $('.grid-container .card').toArray()
        .map(item=>{
            const $item= $(item);
                return{
                    title: $item.find('.card-name').text(),
                    precioActual:$item.find('.actual-price').text(),
                    precioViejo:$item.find('.old-price').text(),
                    link:$item.find('.input-block').first().attr('href'),
                    talle:$item.find(".card-attributes small:contains('Talla')").children().text(),
                    //precioVenta:Number($item.find('.actual-price').text())+1500,//queda mal pq me toma el . por ,
                };
             return itemsFavoritos
        })
        debugger;

    }
    else{
        // console.log( res.statusCode );
        console.log(res);
        console.log(err);
    }

}
    )}

