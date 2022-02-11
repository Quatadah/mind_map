    
    let root = document.getElementById("root")  
    let rectangle = document.getElementsByClassName("rectangle")[0];
    let child = document.getElementsByTagName("li")[0];
    let container = document.getElementById("container");
    let popin = document.getElementById("popin");

    const canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'rgb(212, 114, 106)';
    ctx.lineWidth = 3;    
    
    
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
    function findSiblings(element, tree){
        if(tree.children.includes(element)){
            return tree.children;
        }
        for (child of tree.children){
            console.log(child.children);
            return findSiblings(element, child);
        }        
        return null;    
    }
    function getChildren(element){  
        return element.children;
    }
    let childCounter = 1;

    function addChild(elem){
        childCounter++;
        
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

        if(elementRoot.children.length == 3){            
            elem.style.visibility = 'hidden';
        }
        if (childCounter > 20){
            container.style.width = "200%";
            container.style.height = "200%";
            canvas.height = window.innerHeight * 2;
            canvas.width = window.innerWidth * 2;
            ctx.strokeStyle = 'rgb(212, 114, 106)';
            ctx.lineWidth = 3;
            popin.style.top = "100px";
            popin.style.left = "600px";
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTree(tree);
        //console.log(tree);
       }

    function drawTree(tree){
        children = getChildren(tree);
        
        for (child of children){
            drawLine(tree.node, child);
            drawTree(child);
        }
    }            

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

        const x1 = off1.left + off1.width - 8;
        const y1 = off1.top + off1.height/2 - 5;
      
        const x2 = off2.left;
        const y2 = off2.top + off2.height/2 - 5;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + 30, y1);

        ctx.moveTo(x1 + 30, y1);
        ctx.lineTo(x1 + 30, y2);

        ctx.moveTo(x1 + 30, y2);
        ctx.lineTo(x2, y2);    
        ctx.stroke();
        
    }


    window.onresize = () =>{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTree(tree);
    }

let selectedRectangle = undefined;
let radius = document.getElementById("radius");

function reduceRadius(){
    radius.innerText = parseInt(radius.innerText) - 1;
    if(selectedRectangle != undefined){
        selectedRectangle.style.borderRadius = radius.innerText + "px";
    }    
}

function addRadius(){
    radius.innerText = parseInt(radius.innerText) + 1;
    if(selectedRectangle != undefined){
        selectedRectangle.style.borderRadius = radius.innerText + "px";
    }
}

function copyTitle(elem){
    if(selectedRectangle != undefined){
        selectedRectangle.children[0].value = elem.value;
    }
    
}

function saveRectangle(elem){   
    selectedRectangle = elem;
}

function coloriseRectangle(color){
    if (selectedRectangle != undefined){
        selectedRectangle.style.borderColor = color;
        selectedRectangle.children[1].style.borderColor = color;
    }else{
        alert("No Node selected");
    }
}

let blue = "#2781CA";
let green = "#76FF76";
let red = "#E94A4A";
let yellow = "#E2E276";

function applyColor(elem){
    switch(elem.attributes.id.value){
        case 'blue':
            coloriseRectangle(blue);
            break;
        case 'red':
            coloriseRectangle(red);
            break;
        case 'green':
            coloriseRectangle(green);
            break;
        case 'yellow':
            coloriseRectangle(yellow);
            break;
    }
    
}

function removChild(){
    if(selectedRectangle != undefined){
        //selectedRectangle.remove();
        let siblings = findSiblings(selectedRectangle, tree);
        console.log(siblings);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //drawTree(tree);
    }
}