const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

let images = [];
/*function sacatitulo(){
    request('https://tuvalum.com/comprar/bicicleta-wilier-35917',(err,res,body)=>{
        if(!err && res.statusCode==200){
            let $ = cheerio.load(body);
            let tituloCompleto = $('h1','.container-fluid');// ya lo tenemos con la propiedad text()
            //let a=cheerio.load(tituloCompleto);
             let marca = $('strong','h1.card-name');
             let anio=$('span','h1.card-name');
            let precioAntes = $('div.old-price','.flex-row');
            let precioOferta=$('h3','.flex-row');
            let sacaTalle=$('div.product-attribute','div.col-sm-12');
           var talle=talle.text().replace('vendedor','duenio');//
            

           console.log(tituloCompleto.text()+'hola');
            
            console.log( tituloCompleto.text() +' Talle: '+talle+ ' PRECIO: $'+ precioOferta.text() + ' ANTES: $' +precioAntes.text() );
           console.log(marca.text() +anio.text()+talle+ 'hola');
            }
            else{
                // console.log( res.statusCode );
                 console.log(res);
                 console.log(err);

     
     
             }
            });
        }
    
sacatitulo();*/

request('https://tuvalum.com/comprar/bicicleta-wilier-35917', (err, res, body) => {
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
            rutaCarpeta= './'+tituloCompleto.text();
            var dir = rutaCarpeta// crea el directorio y le guarda las imagenes
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            for (let i = 1; i < images.length; i++) {
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
/*/


/*  request('https://miami.craigslist.org/mdc/bik/d/miami-bmc-tm02-time-machine-tt-bike/6882047746.html',(err,res,body)=>{
        if(!err && res.statusCode==200){
            let $ = cheerio.load(body);
            $('img','div').each(function(){
                var urlImg= $(this).attr('src');
                console.log(urlImg);
            });



        }
        else{
           // console.log( res.statusCode );
            console.log(res);
            console.log(err);



        }
})/*/

