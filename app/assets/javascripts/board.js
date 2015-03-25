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
                       var $row = $("<div class='row group' data-id="+ i %9+"></div>");
                       for (var j=0; j<9; j++){
                           arrRow.push(row[j]);
                           var cell = (row[j] == "." ? "" : row[j] );
                           var $cell = $("<div class='cell' data-id="+ j +">"+cell + "</div>");
                           $row.append($cell);
                           $cell.click(function(event){
                               event.preventDefault();
                               if($(this).text()=="" ){
                                   var $input = $("<input type='text'>");
                                   $(this).append($input);

                               }
                           });
                           $cell.keyup(function(event){

                               var n = event.which;
                               var currentVal = $(this).find("input").val();
                               var j = $(this).data("id");
                               // console.log(j);
                               var i = $(this).closest(".row").data("id");
                               if(check(arr, i, j,currentVal)){
                                   arr[i][j] = currentVal;
                               } else{
                                   // alert("incorrect number");
                                   $(this).find("input").css({color: "red"});
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
        // console.log(k, i, j, c, cellRow, cellCol);
 //        console.log("board[k][j]:" , board[k][j]);
 //        console.log("board[i][k]:" , board[i][k]);
 //        console.log("board[0][4]:", cellRow + k /3);

        if (board[k][j] == c || board[i][k] == c
            || board[Math.floor(cellRow + k /3)][cellCol + k %3] == c){
                return false;
            }
    }
    return true;
}