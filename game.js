//kkk
var gMapa = [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,1],
                [1,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,0,0,0,1],
                [1,2,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ]
            var gMapaElementos = null
            var pPosicao = [0,0]
            var loaded = false;

            function cMapa(){
                var cMapa = prompt("Mapa customizado (99 - padrão):")
                if(cMapa != 99){
                    gMapa = JSON.parse(cMapa)
                }
                init()
            }

            function init(){
                document.getElementById('game').style.height = `${gMapa.length * 30}px`
                document.getElementById('game').style.width = `${gMapa[0].length * 30}px`
                criarMapa(gMapa)
            }
            document.addEventListener('keydown', (event) =>{
                if(loaded){
                    var i = pPosicao[0]
                    var j = pPosicao[1]
                    var cI = pPosicao[0]
                    var cJ = pPosicao[1]
                    if((event.key == 'ArrowUp') || (event.key == 'w')){
                        i -= 1
                        cI -= 2
                    }else if((event.key == 'ArrowDown') || (event.key == 's')){
                        i += 1
                        cI += 2
                    }else if((event.key == 'ArrowLeft') || (event.key == 'a')){
                        j -= 1
                        cJ -= 2
                    }else if((event.key == 'ArrowRight') || (event.key == 'd')){
                        j += 1
                        cJ += 2
                    }
                    if((i >= 0) && (i < gMapa.length) && (j >= 0) && (j < gMapa[0].length)){
                        if(gMapa[i][j] == 0){
                            moverPlayer(i, j)
                            debug()
                        }else if((gMapa[i][j] == 3) && moverCaixa([cI, cJ])){
                            moverPlayer(i, j)
                            debug()
                        }
                    }
                }
            })
            function moverPlayer(i ,j){
                gMapa[pPosicao[0]][pPosicao[1]] = 0;
                gMapa[i][j] = 2;

                gMapaElementos[pPosicao[0]][pPosicao[1]].removeAttribute('id');
                gMapaElementos[pPosicao[0]][pPosicao[1]].className = "caminho";
                gMapaElementos[i][j].removeAttribute('class');
                gMapaElementos[i][j].id = "player";

                pPosicao[0] = i;
                pPosicao[1] = j;
            }
            function moverCaixa(posi){
                var i = posi[0]
                var j = posi[1]
                if((i >= 0) && (i < gMapa.length) && (j >= 0) && (j < gMapa[0].length)){
                    if(gMapa[i][j] == 0){
                        gMapa[i][j] = 3;
                        gMapaElementos[i][j].className = "caixa";
                        return true
                    }
                    return false
                }
                return false
            }
            function criarMapa(map){
                gMapaElementos = new Array(map.length)
                for (var i = 0; i < map.length; i++) {
                    gMapaElementos[i] = new Array (map[i].length)
                }
                document.getElementById('game').innerHTML = '';
                for (var i = 0; i < map.length; i++) {
                    for (var j = 0; j < map[i].length; j++) {
                        var elemento = document.createElement('div')
                        if(map[i][j] == 0){
                            elemento.className = 'caminho'
                            document.getElementById('game').appendChild(elemento)
                        }else if(map[i][j] == 1){
                            elemento.className = 'parede'
                            document.getElementById('game').appendChild(elemento)
                        }else if(map[i][j] == 2){
                            elemento.id = 'player'
                            document.getElementById('game').appendChild(elemento)
                            pPosicao[0] = i;
                            pPosicao[1] = j;
                        }else if(map[i][j] == 3){
                            elemento.className = 'caixa'
                            document.getElementById('game').appendChild(elemento)
                        }
                        gMapaElementos[i][j] = elemento
                    }
                }
                loaded = true;
                debug()
            }
            function debug(){
                document.getElementById('matriz').innerHTML = '';
                for (var i = 0; i < gMapa.length; i++) {
                    var elemento1 = document.createElement('span')
                    elemento1.innerHTML = gMapa[i].toString().replace(new RegExp(',','g'),' ')
                    document.getElementById('matriz').appendChild(elemento1)
                    var elemento2 = document.createElement('br')
                    document.getElementById('matriz').appendChild(elemento2)
                }
            }
            init()
