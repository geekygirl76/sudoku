$(function(){
    var id = 1;
    $("#start").click(function(event){
        event.preventDefault();
           $.ajax({
               url: "boards/" + id,
               success: function(board){
                   var s = board.grid;
                   var arr =[];
                   $("div#board").empty();
                   for (var i=0; i < 80; i+=9){
                       var arrRow = [];
                       var row = s.slice(i, i+9);
                       var $row = $("<div class='row group' data-id="+ Math.floor(i /9)+"></div>");
                       for (var j=0; j<9; j++){
                           arrRow.push(row[j]);
                           var cell = (row[j] == "." ? "" : row[j] );
                           var $cell = $("<div class='cell' data-id="+ j +">"+cell + "</div>");
                           $row.append($cell);
                           var cellNum = Math.floor((Math.floor(i /9))/3) * 3 + Math.floor(j/3);

                           if( cellNum == 0){
                               $cell.addClass("grey");
                           } else if(cellNum ==1){
                               $cell.addClass("yellow");

                           } else if(cellNum ==2){
                               $cell.addClass("grey");
                           }else if(cellNum ==3){
                                $cell.addClass("yellow");
                           }else if(cellNum ==4){
                               $cell.addClass("grey");
                           }else if(cellNum ==5){
                               $cell.addClass("yellow");
                           }else if(cellNum ==6){
                               $cell.addClass("grey");
                           }else if(cellNum ==7){
                               $cell.addClass("yellow");
                           }else if(cellNum ==8){
                               $cell.addClass("grey");
                           }


                           $cell.click(function(event){
                               event.preventDefault();



                               if($(this).text()=="" ){
                                   var $input = $("<input type='text'>");
                                   $(this).append($input);

                               }
                           });
                           $cell.keyup(function(event){
                               // console.log($cell.hasClass("grey"));
                               var n = event.which;
                               if(n==8) return;
                               var currentVal = $(this).find("input").val();
                               // console.log(currentVal);
                               var j = $(this).data("id");
                               // console.log(j);
                               var i = $(this).closest(".row").data("id");
                               arr[i][j] = ".";
                               if(check(arr, i, j,currentVal)){
                                   arr[i][j] = currentVal;
                                   $(this).find("input").css({color: "black"});

                               } else{
                                   // alert("incorrect number");
                                   $(this).find("input").css({color: "red"});
                               }

                               var cellColor = $(this).attr("class").slice(5);
                               $(this).find("input").css({background: "light"+cellColor});

                               if(solved(arr)){
                                   alert("You solved the puzzle! Good Job!");
                               }
                           });
                       }
                       $("#board").append($row);
                       arr.push(arrRow);
                   }
               }
           })


           id++;
           id= (id%3 == 0 ? 3 : id %3);
    })
});

function check(board, i, j, c){
    var cellRow = i - i % 3;
    var cellCol = j - j % 3;
    for (var k =0; k < 9; k++){

 //        console.log("board[k][j]:" , board[k][j]);
 //        console.log("board[i][k]:" , board[i][k]);
 //        console.log("board[0][4]:", cellRow + k /3);

        if (board[k][j] == c || board[i][k] == c
            || board[Math.floor(cellRow + k /3)][cellCol + k %3] == c){
               // console.log(k, i, j, c, cellRow, cellCol);
 //
 //               console.log(board[i][k]);

                return false;
            }
    }
    return true;
}

function solved(board){
    for (var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if (board[i][j] == "."){
                return false;
            }
        }
    }
    return true;
}
