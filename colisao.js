/*


    Autor: Matheus de Camargo Marques
    Email: mmarques.1997@alunos.utfpr.edu.br
    Engenharia da Computação - UTFPR 

    


*/





var quantidade = 1000;
var Bola = [];
var tam; //DIAMETRO
var contcontagio = 0;
var PlotP = [];
var plot = false;
var ctx;

var colisaoWorker;


function setup() {
  PlotP.pop(0, 0);
  frameRate(120);
  createCanvas(windowWidth, windowHeight);
 
  for (i = 0; i < quantidade; i++) {
    tam = random(5, 10);
    Bola[i] = new Ball(random(width - tam, tam),
      random(height - tam, tam),
      random(-2, 2),
      random(-2, 2),
      tam
    );
  }

  Bola[0].contagio = 1;
  Bola[149].contagio = 1;
  Bola[299].contagio = 1;

  colisaoWorker = new Worker('./colisaoWorker.js');

  colisaoWorker.onmessage = function(e) {
    //console.log(JSON.parse(e.data));
    var data = JSON.parse(e.data);
    var balls = [];

    for(let i=0;i<data.length;i++){
        balls.push(new Ball(data[i].posx, data[i].posy, data[i].velx, data[i].vely, data[i].tam,data[i].contagio,data[i].verificado,data[i].R,data[i].G,data[i].B));
    }
    //data[i].__proto__  = Ball.prototype;
    Bola = balls;

  
  //console.log('Message received from worker',e.data);
  }

  
}

function draw() {
  background(0);




  if (contcontagio == quantidade && plot == false) {
     for(i=0;i<Bola.length;i++)
     {
       Bola[i].contagio = 0;
       Bola[i].verificado = 0;
       Bola[i].R = 0;
                 Bola[i].G = 255;
                 Bola[i].B = 0;
                 contcontagio = 0;
                 Bola[1].contagio = 1;
     }
    for (i = 0; i < PlotP.length; i++) {
      console.log();
    }
    plot = true;
    //chart.render();
  }


   for (i = 0; i < Bola.length; i++) {
      Bola[i].desenha();
      Bola[i].wallcollide();

    if (Bola[i].contagio == 1 && Bola[i].verificado == 0) {
      contcontagio++;
      x = millis();
      y = contcontagio;
      PlotP.push(new Points(x, y));
      Bola[i].verificado = 1;
    }

  }

 

  colisaoWorker.postMessage(JSON.stringify(Bola));
  

  //colisao(Bola);
  //mmarques.1997@alunos.utfpr.edu.br
  var textsize = (300 * 15) / 300;
  strokeWeight(5);
  stroke('black');
  fill('green');
  textSize(textsize);
  text('Autor: Matheus de Camargo Marques', 10, textsize + 2);
  text('Email: mmarques.1997@alunos.utfpr.edu.br', 10, textsize * 2 + 2);
  text('Curso: Engenharia da Computação - UTFPR', 10, textsize * 3 + 2);
  fill('red');
  text('COVID-19 SIMULATOR', 10, textsize * 4 + 2);
  text('Infectados: ' + contcontagio, 10, textsize * 5 + 2);
  fill('green');
  text('Sadios: ' + (quantidade - contcontagio), 10, textsize * 6 + 2);
  fill('green');
  text("FPS " +  int(getFrameRate()), width-textsize*10, 20); 
  noStroke();

  //updateChart();

}



class Ball {
 
  /*
  *     
    contagio: 1
    posx: 376.48069016026307
    posy: 201.13559784199984
    tam: 9.245151561895874
    velx: -1.5949606381185122
    vely: 1.9182884251893615
    verificado: 1
  * 
  */
      constructor(posx, posy, velx, vely, tam,Ccontagio=0,Cverificado=0,pR = 0,pG = 255,pB = 0){
            this.contagio = Ccontagio;
            this.verificado = Cverificado;

            this.posy = posy;
            this.posx = posx;

            this.velx = velx;
            this.vely = vely;

            this.tam = tam;

            this.R = pR;
            this.G = pG;
            this.B = pB;

            
      };


    desenha = function () {

              this.posx = this.posx + this.velx;
              this.posy = this.posy + this.vely;

              fill(this.R, this.G, this.B);
              ellipse(this.posx, this.posy, this.tam);

            }

            wallcollide = function () {

              if (this.posx + this.tam / 2 > width || this.posx - this.tam / 2 < 0) {
                this.velx *= (-1);
              }

              if (this.posy + this.tam / 2 > height || this.posy - this.tam / 2 < 0) {
                this.vely *= (-1);
              }


            }




}


function Points(x, y) {
  this.x = x;
  this.y = y;
}
