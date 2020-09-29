onmessage = function(e) {
    //console.log('Message received from main script' , e.data);
    let Bola = JSON.parse(e.data);
    colisao(Bola);
    postMessage(JSON.stringify(Bola));
  }



  function colisao(Bola) {

    var distancia_centros;
    var x, y;
    var quantidade = Bola.length;
  
    for (i = 0; i < quantidade; i++) {
      for (j = i + 1; j < quantidade; j++) {
        x = Bola[i].posx - Bola[j].posx;
        y = Bola[i].posy - Bola[j].posy;
        distancia_centros = x * x + y * y;
        // alert(distancia_centros);
  
        if (distancia_centros <= (Bola[i].tam / 2 * Bola[j].tam / 2) * 4) {
          if (Bola[i].contagio == 1 || Bola[j].contagio == 1) {
            Bola[i].R = 255;
            Bola[i].G = 0;
            Bola[i].B = 0;
  
            Bola[j].R = 255;
            Bola[j].G = 0;
            Bola[j].B = 0;
  
            Bola[i].contagio = 1;
            Bola[j].contagio = 1;
          }
  
  
          //Atualiza vel
          var colisao = distancia_centros;
  
          var pvx1 = ((Bola[i].velx * x) + (Bola[i].vely * y)) * x / colisao;
          var pvy1 = ((Bola[i].velx * x) + (Bola[i].vely * y)) * y / colisao;
          var pvx2 = ((Bola[j].velx * x) + (Bola[j].vely * y)) * x / colisao;
          var pvy2 = ((Bola[j].velx * x) + (Bola[j].vely * y)) * y / colisao;
  
          Bola[i].velx -= (pvx1 - pvx2);
          Bola[i].vely -= (pvy1 - pvy2);
  
          Bola[j].velx -= (pvx2 - pvx1);
          Bola[j].vely -= (pvy2 - pvy1);
  
          if (x != 0 && y != 0) {
  
            Bola[i].posx += x / Math.abs(x);
            Bola[i].posy += y / Math.abs(y);
  
            Bola[j].posx -= x / Math.abs(x);
            Bola[j].posy -= y / Math.abs(y);
  
          }
        }
  
      }
    }
  }