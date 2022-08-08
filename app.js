// TODO:
// 1. Backtrack algorithm
// 2. Refactor
// 3. Easy / Hard Buttons



var matrix = [];

// group cells into boxes

const box1_items = document.querySelectorAll('.box1')
const box2_items = document.querySelectorAll('.box2')
const box3_items = document.querySelectorAll('.box3')
const box4_items = document.querySelectorAll('.box4')
const box5_items = document.querySelectorAll('.box5')
const box6_items = document.querySelectorAll('.box6')
const box7_items = document.querySelectorAll('.box7')
const box8_items = document.querySelectorAll('.box8')
const box9_items = document.querySelectorAll('.box9')
const boxes = [ box1_items, box2_items, box3_items,
                box4_items, box5_items, box6_items,
                box7_items, box8_items, box9_items
            ]

// alternate color for boxes
for(let i = 0; i < 9; i++){
    boxes[i].forEach(function(cell){
        cell.style.backgroundColor = '#cfcfcf'
    })
    i++;
}

//create a null 9x9 matrix
var cellMatrix = [];
for(let i = 0; i < 9; i++){
    cellMatrix.push([null,null,null,null,null,null,null,null,null])
}


//GENERATE SUDOKU PUZZLE

function generatePuzzle(){
    var temp = []

    function runRow(indx1){
        console.log("checking row");
        let rowArr = []
        for(let i = 0; i < 9; i++){
            rowArr.push(cellMatrix[indx1][i]);
        }
        return rowArr
    }

    function runCol(indx2){
        console.log("checking col");
        let colArr = []
        for(let i = 0; i < 9; i++){
            colArr.push(cellMatrix[i][indx2]);
        }
        return colArr
    }

    function runBox(indx1, indx2){
        // ranges
        let box1 = [0,2]
        let box2 = [3,5]
        let box3 = [6,8]
        var boxArr = []
        

        function cellsInBox(boxRange1low, boxRange1high, boxRange2low, boxRange2high){
            for(let i = boxRange1low; i <= boxRange1high; i++){
                for(let j = boxRange2low; j <= boxRange2high; j++){
                    // console.log("cell: " + cellMatrix[i][j]);
                    boxArr.push(cellMatrix[i][j])
                }
            }
        }

        switch (true) {
            case ( (indx1 <= box1[1]) && (indx2 <= box1[1]) ):
                cellsInBox(box1[0], box1[1], box1[0], box1[1])
                break
            case ( (indx1 <= box1[1]) && (indx2 <= box2[1]) ):
                cellsInBox(box1[0], box1[1], box2[0], box2[1])
                break
            case ( (indx1 <= box1[1]) && (indx2 <= box3[1]) ):
                cellsInBox(box1[0], box1[1], box3[0], box3[1])
                break


            case ( (indx1 <= box2[1]) && (indx2 <= box1[1]) ):
                cellsInBox(box2[0], box2[1], box1[0], box1[1])
                break
            case ( (indx1 <= box2[1]) && (indx2 <= box2[1]) ):
                cellsInBox(box2[0], box2[1], box2[0], box2[1])
                break
            case ( (indx1 <= box2[1]) && (indx2 <= box3[1]) ):
                cellsInBox(box2[0], box2[1], box3[0], box3[1])
                break


            case ( (indx1 <= box3[1]) && (indx2 <= box1[1]) ):
                cellsInBox(box3[0], box3[1], box1[0], box1[1])
                break
            case ( (indx1 <= box3[1]) && (indx2 <= box2[1]) ):
                cellsInBox(box3[0], box3[1], box2[0], box2[1])
                break
            case ( (indx1 <= box3[1]) && (indx2 <= box3[1]) ):
                cellsInBox(box3[0], box3[1], box3[0], box3[1])
                break
        }

        console.log("boxArr: " + boxArr);
        return boxArr

    }

    function fillCell(indx1, indx2) {
        function generate(){
            num = Math.floor(Math.random()*9)+1;
            if(temp.length < 9){
                if(!temp.includes(num)){
                    temp.push(num)
                }
            } else {
                temp = []
                return "deadend"
            }
            console.log(temp);
            return num
       }
        function check(num){
            if(runRow(indx1).includes(num)){
                return check(generate())
            } else if(runCol(indx2).includes(num)){
                return check(generate())
            } else if(runBox(indx1, indx2).includes(num)){
                return check(generate())
            } else {
                return num
            }
        }
        temp = []
        return check(generate())
    }

    function backtrack(indx1, indx2){
        console.log("deadend");
    }

    loop1: for(let i = 0; i < 9; i++){
        loop2: for(let j = 0; j < 9; j++){
            candidate = fillCell(i,j)
            if(candidate==="deadend"){
                backtrack(i,j)
                break loop1
            }
            console.log("candidate: " + candidate);
            cellMatrix[i][j] = candidate
        }
    }
}

generatePuzzle();
console.table(cellMatrix);


// erase cells
let blankIndices = []

function hide(indx1, indx2){
    cellMatrix[indx1][indx2] = null;
}

function eraseCells(difficulty){ //replace the numbers with input fields
    let indx1
    let indx2
    let blanks
    function erase(blanks){ //erase random cells
        for(let i = 0; i < blanks; i++){
            indx1 = Math.floor(Math.random()*9)
            indx2 = Math.floor(Math.random()*9)
            blankIndices.push([indx1, indx2]) 
            hide(indx1, indx2)
        }
    }
    
    switch(difficulty){
        case 'hard':
            blanks = 58
            erase(blanks)
            break
        case 'easy':
            blanks = 37
            erase(blanks)
            break
    }
    
}

// eraseCells('hard')

//show matrix
const allCells = document.querySelectorAll('.cell')
let k = -1;
for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
        allCells[++k].firstChild.value = cellMatrix[i][j];
        if(cellMatrix[i][j] != null){
            allCells[k].firstChild.disabled = true;
        }
    }
}


