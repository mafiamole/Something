function ShipsDraggables() {
    $(".ships").draggable({
        cursor: 'move'

    });
}

function ShipsDroppables() {
    $(".player_placement").droppable({

        activeClass: 'active',
        hoverClass: "hover",
        accept: ".ships",
        drop: function(event, ui) {
            var data_for = {}
            var data_length = ui.draggable.attr("data_length")
            var x = $(this).attr("data_x");
            var y = $(this).attr("data_y");
            var orientation = ui.draggable.attr("orientation");

            if (data_length == 5 && orientation== "horizontal"){
                x = x - 2

            } else if((data_length == 4 || data_length == 3 || data_length == 2)  && orientation== "horizontal") {
                x = x - 1

            } else if(data_length == 5 && orientation== "vertical"){
                y = y - 2

            }else if((data_length == 4 || data_length == 3 || data_length == 2)  && orientation== "vertical"){
                y = y - 2

            }

            var position = $(this).position();
            var ship_id = ui.draggable.attr("ship_id");

            var game_id = ui.draggable.attr("game_id");
            data_for= {
                game_ship: {
                    ship_id: ship_id,
                    sunk: false,
                    hit_count: 0,
                    x: x,
                    y: y,
                    orientation: orientation,
                    game_id: game_id
                }
            }
            $.ajax({
                dataType: "script",
                type: "Post",
                data: data_for,
                beforeSend: function() {
                  document.body.style.cursor = 'wait';

                },
                complete: function() {
                  document.body.style.cursor = 'auto';

                },
                url: '/game_ships/'
            });


        }

    })
}