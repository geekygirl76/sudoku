$(function(){
    var id = 1;
    $("#start").click(function(event){
        event.preventDefault();
           $.ajax({
               url: "boards/" + id,
               success: function(board){
                   var s = board.grid;
                   $("div#board").empty();
                   for (var i=0; i < 80; i+=9){
                       var row = s.slice(i, i+9);
                       var $row = $("<div class='row group' data-id="+ i %9+"></div>");
                       for (var j=0; j<9; j++){
                           var cell = (row[j] == "." ? "" : row[j] );
                           var $cell = $("<div class='cell' data-id="+ j +">"+cell + "</div>");
                           $row.append($cell);
                           $cell.click(function(event){
                               event.preventDefault();
                               alert($(this).text()=="" );
                           });
                       }
                       $("#board").append($row);
                   }
               }
           })


           id++;
           id= (id%3 == 0 ? 3 : id %3);
    })
});