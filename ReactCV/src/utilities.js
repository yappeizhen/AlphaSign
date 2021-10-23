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
    6: { name: 'F', color: 'red' },
    7: { name: 'G', color: 'yellow' },
    8: { name: 'H', color: 'lime' },
    9: { name: 'I', color: 'blue' },
    10: { name: 'K', color: 'red' },
    11: { name: 'L', color: 'yellow' },
    12: { name: 'M', color: 'lime' },
    13: { name: 'N', color: 'blue' },
    14: { name: 'O', color: 'purple' },
    15: { name: 'P', color: 'red' },
    16: { name: 'Q', color: 'yellow' },
    17: { name: 'R', color: 'lime' },
    18: { name: 'S', color: 'blue' },
    19: { name: 'T', color: 'purple' },
    20: { name: 'U', color: 'red' },
    21: { name: 'V', color: 'yellow' },
    22: { name: 'W', color: 'lime' },
    23: { name: 'X', color: 'blue' },
    24: { name: 'Y', color: 'purple' },
}

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx, target) => {
    for (let i = 0; i <= Math.min(5, boxes.length); i++) {
        if (boxes[i] && classes[i] && scores[i] > threshold) {
            // Extract variables
            const [y, x, height, width] = boxes[i]
            const text = classes[i]

            console.log(classes[i])
            console.log(scores[i])
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Poppins'

            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i] * 100) / 100, x * imgWidth, y * imgHeight - 10)
            ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth / 2, height * imgHeight / 1.5);
            ctx.stroke()

            console.log("Test Target", target, labelMap[text]['name']);

            if (target && target.toUpperCase() === labelMap[text]['name'].toUpperCase()) {
                return true;
            };
        }
    }
    return false;
}