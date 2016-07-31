if (window.addEventListener) {
    window.addEventListener('load', function () {
        var canvas, context;
        var points = [];
        var end = false;
        var background = new Image();

        function init() {
            // Find the canvas element.
            canvas = document.getElementById('imageView');
            if (!canvas) {
                alert('Error: I cannot find the canvas element!');
                return;
            }

            if (!canvas.getContext) {
                alert('Error: no canvas.getContext!');
                return;
            }

            // Get the 2D canvas context.
            context = canvas.getContext('2d');
            if (!context) {
                alert('Error: failed to getContext!');
                return;
            }

            background.src = "bg.jpg";

            background.onload = function (e) {
                var scale = 1;
                if (background.width > background.height) {
                    scale = 400 / background.height;
                } else {
                    scale = 300 / background.width;
                }
                context.drawImage(background, 0, 0, background.width * scale, background.height * scale);
            };

            canvas.addEventListener('mousedown', mouse_down, false);
        }

        function addPoint(m) {
            context.beginPath();

            var e = undefined;

            // Find matching points (if any)
            for (var p in points) {
                if ((Math.abs(points[p].x - m.x) < 3) && (Math.abs(points[p].y - m.y) < 3)) {
                    e = points[p];
                    if (p == 0) {
                        console.log('end', end);
                        end = true;
                    }
                }
            }

            if (e === undefined) e = m;
            context.arc(e.x, e.y, 1, 0, 2 * Math.PI);

            if (points.length > 0) {
                var pp = points[points.length - 1];
                context.moveTo(pp.x, pp.y);
                context.lineTo(e.x, e.y);
            }
            points.push(e);
            context.strokeStyle = "red";
            context.closePath();
            context.stroke();

        }

        function mouse_down(ev) {

            var mouseX = ev._x || ev.layerX || ev.offsetX;
            var mouseY = ev._y || ev.layerY || ev.offsetY;

            if (end) {
                context.clearRect(0,0,canvas.width,canvas.height);
                points = [];
                end = false;

                var scale = 1;
                if (background.width > background.height) {
                    scale = 400 / background.height;
                } else {
                    scale = 300 / background.width;
                }
                context.drawImage(background, 0, 0, background.width * scale, background.height * scale);

            }

            addPoint({
                x: mouseX,
                y: mouseY
            });

        }

        init();

    }, false);
}

// vim:set spell spl=en fo=wan1croql tw=80 ts=2 sw=2 sts=2 sta et ai cin fenc=utf-8 ff=unix:
