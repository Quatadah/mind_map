
    let container = document.getElementById("container");
    let main = document.getElementsByClassName("rectangle")[0];
    let button = document.getElementsByClassName("btn")[0];
    const canvas = document.getElementById("canvas");
    const subcontainer = document.getElementsByClassName("subcontainer")[0];
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'rgb(212, 114, 106)';
    ctx.lineWidth = 3;

    let lines = [];
    
    let childCounter = 0;

    function addChild(elem){
        const currentNode = elem.parentNode;
        const child = main.cloneNode(true);
        const sub = subcontainer.cloneNode(true);
        sub.appendChild(child);
        function insertAfter(newNode, currentNode){
            container.insertBefore(newNode, currentNode.nextSibling);
        }
        insertAfter(sub, currentNode);
    }
    /*function addChild(elem){
        const currentNode = elem.parentNode;    
        const child = main.cloneNode(true);    
        function insertAfter(newNode, currentNode){
            container.insertBefore(newNode, currentNode.nextSibling);
        }
        insertAfter(child, currentNode);
        let currentNodePosition = elem.getBoundingClientRect();
        let x1 = currentNodePosition.x;
        let y1 = currentNodePosition.y;
        let childPosition = child.getBoundingClientRect();
        let x2 = childPosition.x;
        let y2 = childPosition.y;
        lines.push({x1: x1, y1: y1, x2: x2, y2: y1});
        draw(lines);
        //draw(x1, y1+5, x2, y1+5);
        //console.log({x1 : x1, y1 : y1, x2 : x2, y2 : y2});


    }*/
    function draw(lines){
        for(let i = 0; i < lines.length; i++){
            drawLine(lines[i]);
        }
    }
    function drawLine(line) {        
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);    
        ctx.stroke();
    }
