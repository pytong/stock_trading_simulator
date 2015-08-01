function buildChart(data) {
    if(!$("#symbol").val()) {
        return;
    }

    $("#chart").empty();

    var margin = 50;

    var chart = d3.select("#chart")
        .append("svg:svg")
        .attr("class", "chart")
        .attr("width", width)
        .attr("height", height);

    var y = d3.scale.linear()
        .domain([d3.min(data.map(function (x) {
            return x["Low"];
        })), d3.max(data.map(function (x) {
            return x["High"];
        }))])
        .range([height - margin, margin]);
    var x = d3.scale.linear()
        .domain([d3.min(data.map(function (d) {
            return d.timestamp;
        })), d3.max(data.map(function (d) {
            return d.timestamp;
        }))])
        .range([margin, width - margin]);

    chart.selectAll("line.x")
        .data(x.ticks(10))
        .enter().append("svg:line")
        .attr("class", "x")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", margin)
        .attr("y2", height - margin)
        .attr("stroke", "#ccc");

    chart.selectAll("line.y")
        .data(y.ticks(10))
        .enter().append("svg:line")
        .attr("class", "y")
        .attr("x1", margin)
        .attr("x2", width - margin)
        .attr("y1", y)
        .attr("y2", y)
        .attr("stroke", "#ccc");

    chart.selectAll("text.xrule")
        .data(x.ticks(10))
        .enter().append("svg:text")
        .attr("class", "xrule")
        .attr("x", x)
        .attr("y", height - margin)
        .attr("dy", 20)
        .attr("text-anchor", "middle")
        .text(function (d) {
            var date = new Date(d * 1000);
            return (date.getMonth() + 1) + "/" + date.getDate();
        });

    chart.selectAll("text.yrule")
        .data(y.ticks(8))
        .enter().append("svg:text")
        .attr("class", "yrule")
        .attr("x", width - margin + 10)
        .attr("y", y)
        .attr("dy", 0)
        .attr("dx", 20)
        .attr("text-anchor", "middle")
        .text(String);

    chart.selectAll("rect")
        .data(data)
        .enter().append("svg:rect")
        .attr("x", function (d) {
            return x(d.timestamp);
        })
        .attr("y", function (d) {
            return y(_.max([d.Open, d.Close]));
        })
        .attr("height", function (d) {
            return y(_.min([d.Open, d.Close])) - y(_.max([d.Open, d.Close]));
        })
        .attr("width", function (d) {
            return 0.5 * (width - 2 * margin) / data.length;
        })
        .attr("fill", function (d) {
            return d.Open > d.Close ? "red" : "green";
        });

    chart.selectAll("line.stem")
        .data(data)
        .enter().append("svg:line")
        .attr("class", "stem")
        .attr("x1", function (d) {
            return x(d.timestamp) + 0.25 * (width - 2 * margin) / data.length;
        })
        .attr("x2", function (d) {
            return x(d.timestamp) + 0.25 * (width - 2 * margin) / data.length;
        })
        .attr("y1", function (d) {
            return y(d.High);
        })
        .attr("y2", function (d) {
            return y(d.Low);
        })
        .attr("stroke", function (d) {
            return d.Open > d.Close ? "red" : "green";
        })
       .on("mouseover", function(d) {
            $("#open").html(d.Open);
            $("#close").html(d.Close);
            $("#high").html(d.High);
            $("#low").html(d.Low);

            return tooltip.style("visibility", "visible");
        })
}
