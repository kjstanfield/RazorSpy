const team1 = [
  { type: "3", id: "4611686018482605597" },
  { type: "1", id: "4611686018456289666" },
  { type: "3", id: "4611686018472105534" },
  { type: "3", id: "4611686018468117711" },
  { type: "3", id: "4611686018504800722" },
  { type: "1", id: "4611686018430872228" },
];

const team2 = [
  { type: "3", id: "4611686018467847265" },
  { type: "1", id: "4611686018434321149" },
  { type: "1", id: "4611686018429882221" },
  { type: "1", id: "4611686018432209461" },
  { type: "1", id: "4611686018429879860" },
  { type: "1", id: "4611686018432622059" },
];

let url = "https://www.bungie.net/Platform/Destiny2/";

//`${url}${p.type}/Profile/${p.id}?components=1100"`

function run() {
  let input = document.getElementById("key");
  let team1score = 0;
  let team2score = 0;

  function getData(object) {
    const apiUrl = `${url}${object.type}/Profile/${object.id}?components=1100`;

    const requestOptions = {
      method: "GET",
      headers: {
        "X-API-Key": input.value,
      },
    };

    return fetch(apiUrl, requestOptions).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data for object with ID ${object.id}`);
      }
      return response.json();
    });
  }

  //team 1 *****************
  Promise.all(team1.map((object) => getData(object)))
    .then((results) => {
      results.forEach(
        (score) =>
          (team1score =
            team1score +
            score.Response.metrics.data.metrics[2330926603].objectiveProgress
              .progress)
      );

      console.log("Team 1 Score:", team1score);
      document.getElementById("t1").innerHTML = team1score;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //team 2 *****************
  Promise.all(team2.map((object) => getData(object)))
    .then((results) => {
      results.forEach(
        (score) =>
          (team2score =
            team2score +
            score.Response.metrics.data.metrics[2330926603].objectiveProgress
              .progress)
      );
      console.log("Team 2 Score:", team2score);
      document.getElementById("t2").innerHTML = team2score;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
