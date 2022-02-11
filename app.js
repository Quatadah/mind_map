
    let container = document.getElementById("container");
    let root = document.getElementById("root")
    let rectangle = document.getElementsByClassName("rectangle")[0];
    let child = document.getElementsByTagName("li")[0];
    let button = document.getElementsByClassName("btn")[0];

    const canvas = document.getElementById("canvas");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'rgb(212, 114, 106)';
        ctx.lineWidth = 3;
    

    let lines = [];
    
    let tree = {
        node: root,
        children:[]
    }

    function findParent(element, tree){
        if (element == tree.node)
            return tree
        else{
            for (child of tree.children){
                findParent(element, child);                
                if (child.node == element)
                    return child;                    
            }
        }
        return null;
    }
    function isLeaf(element){
        return element.children.length == 0;
    }

    function getChildren(element){  
        return element.children;
    }
    let childCounter = 0;

    function addChild(elem){
        const currentRectangle = elem.parentNode;
        const newRectangle = currentRectangle.cloneNode(true);
        let nested = undefined;
        let li = undefined;
        if(currentRectangle.nextElementSibling == undefined){
            nested = document.createElement("ul");
            nested.className = "nested";                       
        }else{            
            nested = currentRectangle.nextElementSibling;                 
        }   

        li = document.createElement("li");
        li.appendChild(newRectangle);
        nested.appendChild(li);

        function insertAfter(newNode, currentNode){
            let liParent = currentNode.parentNode;
            liParent.insertBefore(newNode, currentNode.nextSibling);
        }
        insertAfter(nested, currentRectangle);
        let elementRoot = findParent(elem.parentNode, tree);
        let toBePushed = {node: newRectangle, children: []};
        elementRoot.children.push(toBePushed);
        //console.log(elementRoot.children.size);
        if(elementRoot.children.size == 3){
            
            elem.style.visibility = 'hidden';
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTree(tree);
       }

    function drawTree(tree){
        children = getChildren(tree);
        
        for (child of children){
            drawLine(tree.node, child);
            drawTree(child);
        }
    }            
    /*
    function draw(lines){
        for(let i = 0; i < lines.length; i++){
            drawLine(lines[i]);
        }
    }*/

    function drawLine(node, child){
        
        const getOffset = (el) => {
            const rect = el.getBoundingClientRect();
            return {
              left: rect.left + window.pageXOffset,
              top: rect.top + window.pageYOffset,
              width: rect.width || el.offsetWidth,
              height: rect.height || el.offsetHeight
            };
        }
        const off1 = getOffset(node);
        const off2 = getOffset(child.node);

        const x1 = off1.left + off1.width - 5;
        const y1 = off1.top + off1.height/2 - 5;
      
        const x2 = off2.left;
        const y2 = off2.top + off2.height/2 - 5;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);    
        ctx.stroke();
        
    }

    /*
    function drawLine(line) {        
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);    
        ctx.stroke();
    }
    */
