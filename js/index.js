const cheerio = require('cheerio');
const fs=require('fs');
const 
function sacalink(link){
request(link,(err,res,body)=>{
        if(!err && res.statusCode==200){
            let $ = cheerio.load(body);
            $('.product-image','div.item').each(function(){
                
                var urlImg= $(this).attr('style');
                var spliteado = urlImg.split(["'"])[1];
               //console.log(urlImg);
                console.log(spliteado);//DEVUEVLE TODOS LOS LINKS DE LAS IMAGENES DE TUVALUM
                
            });
        }   
        else{
           // console.log( res.statusCode );
            console.log(res);
            console.log(err);
            


        }
})
}

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
})*/;
