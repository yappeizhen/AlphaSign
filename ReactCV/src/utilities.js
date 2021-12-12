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
// const labelMap = {

//     1: { name: 'A', color: 'red' },
//     2: { name: 'B', color: 'yellow' },
//     3: { name: 'C', color: 'lime' },
//     4: { name: 'D', color: 'blue' },
// }
//*/

const labelMap = {
    1: { name: 'A', color: 'red' },
    2: { name: 'B', color: 'yellow' },
    3: { name: 'C', color: 'lime' },
    4: { name: 'D', color: 'blue' },
    5: { name: 'E', color: 'purple' },
    6: { name: 'F', color: 'maroon' },
    7: { name: 'G', color: 'fuchsia' },
    8: { name: 'H', color: 'green' },
    9: { name: 'I', color: 'olive' },
    10: { name: 'K', color: 'navy' },
    11: { name: 'L', color: 'aqua' },
    12: { name: 'M', color: 'orange' },
    13: { name: 'N', color: 'antiquewhite' },
    14: { name: 'O', color: 'chocolate' },
    15: { name: 'P', color: 'coral' },
    16: { name: 'Q', color: 'chartreuse' },
    17: { name: 'R', color: 'crimson' },
    18: { name: 'S', color: 'darkgoldenrod' },
    19: { name: 'T', color: 'darkgreen' },
    20: { name: 'U', color: 'deeppink' },
    21: { name: 'V', color: 'salmon' },
    22: { name: 'W', color: 'wheat' },
    23: { name: 'X', color: 'seashell' },
    24: { name: 'Y', color: 'lightslategray' },
}

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx, target) => {
    //console.log("Detection threshold: ", threshold);
    
    for (let i = 0; i <= Math.min(5, boxes.length); i++) {
        if (boxes[i] && classes[i] && scores[i] > threshold) {
            // Extract variables
            const [y, x, height, width] = boxes[i]
            const text = classes[i]

            console.log(`Detected Class: ${labelMap[text]['name']}. Prediction Score: ${scores[i]}`)

            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 5
            ctx.fillStyle = 'white'
            ctx.font = '30px Poppins'

            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i] * 100) / 100, x * imgWidth, y * imgHeight - 10)
            ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth / 2, height * imgHeight / 1.5);
            ctx.stroke()

            console.log("Target: ", target, " Detected: ", labelMap[text]['name']);

            if (target && target.toUpperCase() === labelMap[text]['name'].toUpperCase()) {
                return true;
            };
        }
    }
    return false;
}