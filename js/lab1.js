let dataset;
let scale = 600;

const graph = d3
  .select("body")
  .append("svg")
  .attr("width", scale)
  .attr("height", scale)
  .attr("alignment-baseline", "middle");

d3.tsv("data/france.tsv")
  .row((d, i) => ({
    codePostal: +d["Postal Code"],
    inseecode: +d.inseecode,
    place: d.place,
    latitude: +d.x,
    longitude: +d.y,
    population: +d.population,
    density: +d.density,
  }))
  .get((error, rows) => {
    if (error) {
      console.error("error occured: ", error);
      return;
    }
    console.log("loaded " + rows.length);
    if (rows.length > 0) {
      console.log("first row: ", rows[0]);
    }

    dataset = rows;
    draw();
  });

function draw() {
  let lats = [];
  let longs = [];
  dataset.map((row) => {
    lats.push(row.latitude);
    longs.push(row.longitude);
  });

  const scaleCoordsX = d3
    .scaleLinear()
    .domain([d3.min(lats), d3.max(lats)])
    .range([0, scale]);

  const scaleCoordsY = d3
    .scaleLinear()
    .domain([d3.min(longs), d3.max(longs)])
    .range([scale, 0]);

  for (let index = 0; index < dataset.length; index++) {
    graph
      .append("rect")
      .attr("x", scaleCoordsX(lats[index]))
      .attr("y", scaleCoordsY(longs[index]))
      .attr("width", "1px")
      .attr("height", "1px")
      .attr("opacity", "0.5")
      .attr("stroke", "black");
  }
}
