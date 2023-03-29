const { default: axios } = require("axios");
let express = require("express");
let app = express();
app.set("json spaces", 2);

app.listen(8080, (à => console.log("connecté.")))

let fetchBDFDStatus = async () => {
    let result = await axios.get("https://botdesignerdiscord.com/status", {
        method: "GET",
    });
    let fetched = [];
    let lines = result.data.split("\n");
    lines.filter((element) => element.includes("<td>") && element.includes("</td>")).forEach(element => {
        fetched.push(element);
    });
    let fetched_1 = [];
    let index = 0;
    let i = 3;
    let j = -1;
    for (const fetched_2 of fetched) {
        if(i > 2) {
            j++;
            fetched_1.push({id: null, bots: null, ping: null});
            i = 0;
        }
        if(i === 0) {
            fetched_1[j].id = Number(fetched[index].split("<td>")[1].split("</td>")[0]);
        }
        if(i === 1) {
            fetched_1[j].bots = isNaN(Number(fetched[index].split("<td>")[1].split("</td>")[0])) ? "no data" : Number(fetched[index].split("<td>")[1].split("</td>")[0]);
        }
        if(i === 2) {
            fetched_1[j].ping = Number(fetched[index].split("<td>")[1].split("</td>")[0].replace("ms", "").replace(" ", ""));
        }
        index++
        i++;
    }
    return fetched_1;
};

let fetchBDFDStatusFor = async (node) => {
    let result = await axios.get("https://botdesignerdiscord.com/status", {
        method: "GET",
    });
    let fetched = [];
    let lines = result.data.split("\n");
    lines.filter((element) => element.includes("<td>") && element.includes("</td>")).forEach(element => {
        fetched.push(element);
    });
    let fetched_1 = [];
    let index = 0;
    let i = 3;
    let j = -1;
    for (const fetched_2 of fetched) {
        if(i > 2) {
            j++;
            fetched_1.push({id: null, bots: null, ping: null});
            i = 0;
        }
        if(i === 0) {
            fetched_1[j].id = Number(fetched[index].split("<td>")[1].split("</td>")[0]);
        }
        if(i === 1) {
            fetched_1[j].bots = isNaN(Number(fetched[index].split("<td>")[1].split("</td>")[0])) ? "no data" : Number(fetched[index].split("<td>")[1].split("</td>")[0]);
        }
        if(i === 2) {
            fetched_1[j].ping = Number(fetched[index].split("<td>")[1].split("</td>")[0].replace("ms", "").replace(" ", ""));
        }
        index++
        i++;
    }
    return fetched_1[node];
};

let fetchBdfdOnlineBot = async () => {
    let result = await axios.get("https://botdesignerdiscord.com/status", {
        method: "GET",
    });
    let fetched = 0;
    let lines = result.data.split("\n");
    lines.filter((element) => element.includes("<p>") && element.includes("</p>")).forEach(element => {
        fetched = Number(element.split(" ")[1]);
    });
    return fetched;
}

app.get("/bdfd/nodes/", async (req, res) => {
    return res.status(200).json({
        code: 200,
        error: false,
        data: {
            list: (await fetchBDFDStatus()),
            message: "Suceffuly fetched bdfd nodes."
        }
    })
})

app.get("/bdfd/node/:node_id", async (req, res) => {
    if(!req.params || !req.params.node_id || typeof req.params.node_id !== "string") return res.status(200).json({
        code: 402,
        error: true,
        data: {
            message: "An invalid node was provided."
        }
    })
    return res.status(200).json({
        code: 200,
        error: false,
        data: {
            data: (await fetchBDFDStatusFor(req.params.node_id)),
            message: "Suceffuly fetched bdfd node " + req.params.node_id + " status."
        }
    })
})

app.get("/bdfd/online_bots", async (req, res) => {
    return res.status(200).json({
        code: 200,
        error: false,
        data: {
            amount: (await fetchBdfdOnlineBot()),
            message: "Suceffuly fetched the amount of bdfd online bots."
        }
    })
})
