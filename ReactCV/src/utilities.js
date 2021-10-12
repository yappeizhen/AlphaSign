// Define our labelmap
/*
const labelMap = {
    1:{name:'Hello', color:'red'},
    2:{name:'Thank You', color:'yellow'},
    3:{name:'I Love You', color:'lime'},
    4:{name:'Yes', color:'blue'},
    5:{name:'No', color:'purple'},
}
*/
///*
const labelMap = {

    1:{name:'A', color:'red'},
    2:{name:'B', color:'yellow'},
    3:{name:'C', color:'lime'},
    4:{name:'D', color:'blue'},
    5:{name:'E', color:'purple'},
    6:{name:'F', color:'red'},
    7:{name:'G', color:'yellow'},
    8:{name:'H', color:'lime'},
    9:{name:'I', color:'blue'},
    10:{name:'J', color:'purple'},
    11:{name:'K', color:'red'},
    12:{name:'L', color:'yellow'},
    13:{name:'M', color:'lime'},
    14:{name:'N', color:'blue'},
    15:{name:'O', color:'purple'},
    16:{name:'P', color:'red'},
    17:{name:'Q', color:'yellow'},
    18:{name:'R', color:'lime'},
    19:{name:'S', color:'blue'},
    20:{name:'T', color:'purple'},
    21:{name:'U', color:'red'},
    22:{name:'V', color:'yellow'},
    23:{name:'W', color:'lime'},
    24:{name:'X', color:'blue'},
    25:{name:'Y', color:'purple'},
    26:{name:'Z', color:'red'},

}
//*/
// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            
            console.log(classes[i])
            console.log(scores[i])
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
            ctx.stroke()
        }
    }
}