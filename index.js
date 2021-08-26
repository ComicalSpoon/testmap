$("#efficientResourcesDown").click(modifyUpgrade);
$("#efficientResourcesUp").click(modifyUpgrade);
$("#resourceRateDown").click(modifyUpgrade);
$("#resourceRateUp").click(modifyUpgrade);
$("#efficientEmeraldsDown").click(modifyUpgrade);
$("#efficientEmeraldsUp").click(modifyUpgrade);
$("#emeraldRateDown").click(modifyUpgrade);
$("#emeraldRateUp").click(modifyUpgrade);
$("#treasuryBonusConfirm").click(updateTreasuryBonus);

let currentTerrNames = ["Efilim Village", "Efilim East Plains", "Light Forest North Entrance", "Light Forest South Exit", "Light Forest West Upper", "Light Forest East Mid", "Light Forest Canyon", "Lone Farmstead", "Twisted Housing", "Viscera Pits West", "Abandoned Manor", "Kander Mines", "Viscera Pits East", "Old Crossroads South", "Lexdale", "Decayed Basin", "Cinfras Entrance", "Fallen Village", "Guild Hall", "Gylia Lake South West", "Jitak's Farm", "Cinfras Outskirts", "Cinfras", "Efilim South Plains", "Light Forest North Exit", "Light Forest East Upper", "Gelibord", "Lexdales Prison", "Mesquis Tower", "Dark Forest Village", "Fungal Grove", "Mushroom Hill", "Gylia Lake North West", "Efilim South East Plains", "Path to Cinfras", "Mansion of Insanity", "Path to Talor", "Heart of Decay", "Twisted Ridge", "Old Crossroads North", "Entrance to Kander", "Dark Forest Cinfras Transition"];
let currentTerrs = {};

const upgradesJSON = {
  "efficientResources": {
    "current": 0,
    "displayName": "Efficient Resources",
    "resource": "emeralds",
    "type": "%",
    "upgrades": [0, 50, 100, 150, 200, 250, 300],
    "costs": [0, 6000, 12000, 24000, 48000, 96000, 192000]
  },
  "resourceRate": {
    "current": 0,
    "displayName": "Resource Rate",
    "resource": "emeralds",
    "type": "s",
    "upgrades": [4, 3, 2, 1],
    "costs": [0, 6000, 18000, 32000]
  },
  "efficientEmeralds": {
    "current": 0,
    "displayName": "Efficient Emeralds",
    "resource": "ore",
    "type": "%",
    "upgrades": [0, 35, 100, 300],
    "costs": [0, 2000, 8000, 32000]
  },
  "emeraldRate": {
    "current": 0,
    "displayName": "Emerald Rate",
    "resource": "crops",
    "type": "s",
    "upgrades": [4, 3, 2, 1],
    "costs": [0, 2000, 8000, 32000]
  },
  "towerDamage": {
    "current": 0,
    "displayName": "Tower Damage",
    "resource": "ore",
    "type": "%",
    "upgrades": [0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440],
    "costs": [0, 100, 300, 600, 1200, 2400, 4800, 8400, 12000, 14600, 17200, 19800]
  },
  "towerAttack": {
    "current": 0,
    "displayName": "Tower Attack Speed",
    "resource": "crops",
    "type": "%",
    "upgrades": [0, 50, 100, 150, 220, 300, 400, 500, 620, 660, 740, 840],
    "costs": [0, 100, 300, 600, 1200, 2400, 4800, 8400, 12000, 14600, 17200, 19800]
  },
  "towerHealth": {
    "current": 0,
    "displayName": "Tower Health",
    "resource": "wood",
    "type": "%",
    "upgrades": [0, 50, 100, 150, 220, 300, 400, 500, 620, 660, 740, 840],
    "costs": [0, 100, 300, 600, 1200, 2400, 4800, 8400, 12000, 14600, 17200, 19800]
  },
  "towerDefense": {
    "current": 0,
    "displayName": "Tower Defense",
    "resource": "fish",
    "type": "%",
    "upgrades": [0, 300, 450, 525, 580, 620, 645, 665, 680, 695, 710, 720],
    "costs": [0, 100, 300, 600, 1200, 2400, 4800, 8400, 12000, 14600, 17200, 19800]
  },
  "towerMinions": {
    "current": 0,
    "displayName": "Tower Minions",
    "resource": "wood",
    "type": "%",
    "upgrades": [0, 150, 200, 250, 300],
    "costs": [0, 200, 400, 800, 1600]
  },
  "towerMA": {
    "current": 0,
    "displayName": "Tower Targets",
    "resource": "fish",
    "type": "",
    "upgrades": [1, 2, 3],
    "costs": [0, 4800, 9600]
  },
  "towerAura": {
    "current": 0,
    "displayName": "Tower Aura",
    "resource": "crops",
    "type": "s",
    "upgrades": [0, 24, 18, 12],
    "costs": [0, 800, 1600, 3200]
  },
  "towerVolley": {
    "current": 0,
    "displayName": "Tower Volley",
    "resource": "ore",
    "type": "s",
    "upgrades": [0, 20, 15, 10],
    "costs": [0, 200, 400, 800]
  },
  "gatheringExp": {
    "current": 0,
    "displayName": "Gathering XP Bonus",
    "resource": "wood",
    "type": "%",
    "upgrades": [0, 20, 40, 60, 80, 100, 120, 150, 180],
    "costs": [0, 600, 1300, 2000, 2700, 3400, 5500, 10000, 20000]
  },
  "mobExp": {
    "current": 0,
    "displayName": "Combat XP Bonus",
    "resource": "fish",
    "type": "%",
    "upgrades": [0, 20, 40, 60, 80, 100, 150, 200, 300],
    "costs": [0, 600, 1200, 1800, 2400, 3000, 5000, 10000, 20000]
  },
  "mobDamage": {
    "current": 0,
    "displayName": "Mob Damage",
    "resource": "wood",
    "type": "%",
    "upgrades": [0, 10, 20, 40, 60, 80, 120, 160, 200],
    "costs": [0, 600, 1200, 1800, 2400, 3000, 5000, 10000, 20000]
  },
  "pvpDamage": {
    "current": 0,
    "displayName": "PvP Damage",
    "resource": "ore",
    "type": "%",
    "upgrades": [0, 5, 10, 15, 20, 25, 40, 65, 80],
    "costs": [0, 600, 1200, 1800, 2400, 3000, 5000, 10000, 20000]
  },
  "resourceStorage": {
    "current": 0,
    "displayName": "Resource Storage",
    "resource": "emeralds",
    "type": "%",
    "upgrades": [0, 100, 300, 700, 1400, 3300, 7900],
    "costs": [0, 400, 800, 2000, 5000, 16000, 48000]
  },
  "emeraldStorage": {
    "current": 0,
    "displayName": "Emerald Storage",
    "resource": "wood",
    "type": "%",
    "upgrades": [0, 100, 300, 700, 1400, 3300, 7900],
    "costs": [0, 200, 400, 1000, 2500, 8000, 24000]
  },
  "xpSeeking": {
    "current": 0,
    "displayName": "XP Seeking",
    "resource": "emeralds",
    "type": "/h",
    "upgrades": [0, 36000, 66000, 120000, 228000, 456000, 900000, 1740000, 2580000, 3360000],
    "costs": [0, 100, 200, 400, 800, 1600, 3200, 6400, 9600, 12800]
  },
  "tomeSeeking": {
    "current": 0,
    "displayName": "Tome Seeking",
    "resource": "fish",
    "type": "%/h",
    "upgrades": [0, 0.15, 1.2, 2.4],
    "costs": [0, 400, 3200, 6400]
  },
  "emeraldSeeking": {
    "current": 0,
    "displayName": "Emerald Seeking",
    "resource": "fish",
    "type": "%/h",
    "upgrades": [0, 0.3, 3, 6, 12, 24],
    "costs": [0, 200, 800, 1600, 3200, 6400]
  }
}

updateCurrentTerrs();
updateMap();

function updateCurrentTerrs() {
  $.get("https://www.avicia.tk/map/terralldata.json", function (terrData) {
    currentTerrs = {};
    currentTerrNames.forEach(terr => {
      const resources = Object.keys(terrData[terr].resources).filter(resourceType => terrData[terr].resources[resourceType] != 0 && resourceType != "emeralds");
      const value = {
        "type": resources,
        "baseResources": terrData[terr].resources[resources[0]],
        "baseEmeralds": terrData[terr].resources.emeralds,
        "selected": "unselected",
        "productions": {
          "emeralds": 0,
          "wood": 0,
          "fish": 0,
          "ore": 0,
          "crops": 0
        },
        "costs": {
          "emeralds": 0,
          "wood": 0,
          "fish": 0,
          "ore": 0,
          "crops": 0
        },
        "upgrades": {
          "efficientResources": 0,
          "resourceRate": 0,
          "efficientEmeralds": 0,
          "emeraldRate": 0,
          "towerDamage": 0,
          "towerAttack": 0,
          "towerHealth": 0,
          "towerDefense": 0,
          "towerMinions": 0,
          "towerMA": 0,
          "towerAura": 0,
          "towerVolley": 0,
          "gatheringExp": 0,
          "mobExp": 0,
          "mobDamage": 0,
          "resourceStorage": 0,
          "emeraldStorage": 0,
          "xpSeeking": 0,
          "tomeSeeking": 0,
          "emeraldSeeking": 0
        },
        "treasuryBonus": 0
      };

      currentTerrs[terr] = value;
    });

    Object.values(upgradesJSON).forEach(upgradeData => {
      upgradeData.current = 0;
    });

    updateTerrOutputs(Object.keys(currentTerrs));
    updateCards();

    updateUpgrades();
  });
}

function updateMap() {
  const map = L.map("map", {
    crs: L.CRS.Simple,
    minZoom: 6,
    maxZoom: 10,
    zoomControl: false,
    zoom: 8
  });

  L.imageOverlay("map.png", [[0, 0], [7, 7]]).addTo(map);
  map.fitBounds([[0, 0], [7, 7]]);

  let minX = 550;
  let maxX = 1620;
  let xRange = Math.abs(maxX - minX);
  let minY = -5675;
  let maxY = -3820;
  let yRange = Math.abs(maxY - minY);

  $.get("https://www.avicia.tk/map/territories.json", function (terrData) {
    Object.keys(currentTerrs).forEach(terr => {
      let currentTerrData = terrData.territories[terr];
      let bounds = [[currentTerrData.location.startY, currentTerrData.location.startX], [currentTerrData.location.endY, currentTerrData.location.endX]];

      bounds[0][0] = 7 - ((bounds[0][0] - minY) * 7 / yRange);
      bounds[0][1] = (bounds[0][1] - minX) * 7 / xRange;
      bounds[1][0] = 7 - ((bounds[1][0] - minY) * 7 / yRange);
      bounds[1][1] = (bounds[1][1] - minX) * 7 / xRange;

      let rectangle = L.rectangle(bounds, { color: "#0058ff", weight: 2 })

      rectangle.bindPopup(terr).openPopup();
      currentTerrs[terr].popup = rectangle;

      rectangle.addTo(map);
    });

    updateRectangles();
  });
}

function updateRectangles() {
  Object.entries(currentTerrs).forEach(([terrName, terrData]) => {
    if (terrData.popup != undefined) {
      terrData.popup.setPopupContent(`
      <strong>${terrName}</strong>
      <table>
        <tr>
          <th>Type</th>
          <th>Costs</th>
          <th>Products</th>
          <th>Profit</th>
        </tr>

        <tr>
          <td>Emeralds</td>
          <td>${terrData.costs.emeralds}</td>
          <td>${terrData.productions.emeralds}</td>
          <td>${terrData.productions.emeralds - terrData.costs.emeralds}</td>
        </tr>

        <tr>
          <td>Wood</td>
          <td>${terrData.costs.wood}</td>
          <td>${terrData.productions.wood}</td>
          <td>${terrData.productions.wood - terrData.costs.wood}</td>
        </tr>

        <tr>
          <td>Ore</td>
          <td>${terrData.costs.ore}</td>
          <td>${terrData.productions.ore}</td>
          <td>${terrData.productions.ore - terrData.costs.ore}</td>
        </tr>

        <tr>
          <td>Fish</td>
          <td>${terrData.costs.fish}</td>
          <td>${terrData.productions.fish}</td>
          <td>${terrData.productions.fish - terrData.costs.fish}</td>
        </tr>

        <tr>
          <td>Crop</td>
          <td>${terrData.costs.crops}</td>
          <td>${terrData.productions.crops}</td>
          <td>${terrData.productions.crops - terrData.costs.crops}</td>
        </tr>
      </table>
    `);
    }
  });
}

function updateCards() {
  const totalProduction = { "emeralds": 0, "wood": 0, "fish": 0, "ore": 0, "crops": 0 };
  const totalCosts = { "emeralds": 0, "wood": 0, "fish": 0, "ore": 0, "crops": 0 };
  const totalProfit = { "emeralds": 0, "wood": 0, "fish": 0, "ore": 0, "crops": 0 };

  $(".terrs").empty();
  let currentTerrsKeys = Object.keys(currentTerrs);
  currentTerrsKeys.sort();

  Object.keys(totalCosts).forEach(resourceType => {
    const sentValue = parseInt($(`#trade${resourceType}Sent`).val());
    const receivedValue = parseInt($(`#trade${resourceType}Received`).val());

    totalCosts[resourceType] = sentValue > 0 ? sentValue : 0;
    totalProduction[resourceType] = receivedValue > 0 ? receivedValue : 0;
  });

  currentTerrsKeys.forEach(terrName => {
    const terrData = currentTerrs[terrName];

    $(".terrs").append(`
    <div class="col-3 terrContainer">
      <div class="terr ${terrData.selected}" id="${terrName}" onclick="terrOnClick('${terrName.replace("'", "\\\'").replace('"', '\\\"')}')">
        <div class="cardsName">
          <strong>${terrName}</strong>
        </div>
        <div class="cardsType">
          ${terrData.type.map(e => e.slice(0, 1).toUpperCase() + e.slice(1)).join(", ")}
        </div>
        <div class="cardsProduction">
          <br><strong><u>Productions:</u></strong><br>
          ${terrData.productions.emeralds} emeralds <br>
          ${terrData.type.map(type => terrData.productions[type] + " " + type).join("<br>")}
        </div>
        <div class="cardsCosts">
          <br><strong><u>Costs:</u></strong><br>
          ${Object.keys(terrData.costs).filter(type => terrData.costs[type] != 0).map(type => terrData.costs[type] + " " + type).join("<br>")}
        </div>
        <div class="cardsProfits">
          <br><strong><u>Profit:</u></strong><br>
          ${Object.keys(terrData.costs).filter(type => terrData.productions[type] - terrData.costs[type] != 0).map(type => terrData.productions[type] - terrData.costs[type] + " " + type).join("<br>")}
        </div>
        <div class="cardsUpgrades">
          <br><strong><u>Upgrades:</u></strong><br>
          ${Object.keys(terrData.upgrades).filter(type => terrData.upgrades[type] != 0).map(type => `${upgradesJSON[type].displayName}: ${upgradesJSON[type].upgrades[terrData.upgrades[type]]}${upgradesJSON[type].type} (${terrData.upgrades[type]})`).join("<br>")}
        </div>
      </div>
    </div>
    `);

    Object.entries(terrData.productions).forEach(([productionType, productionValue]) => {
      totalProduction[productionType] += productionValue;
    });

    Object.entries(terrData.costs).forEach(([costType, costValue]) => {
      totalCosts[costType] += costValue;
    });

    Object.keys(totalProfit).forEach(resourceType => {
      totalProfit[resourceType] = totalProduction[resourceType] - totalCosts[resourceType];
    });
  });

  $(".totalProduction").html(`
    <u><strong>Total Production:</strong></u><br>
    <strong>Emeralds:</strong> ${totalProduction.emeralds}<br>
    <strong>Wood:</strong> ${totalProduction.wood}<br>
    <strong>Fish:</strong> ${totalProduction.fish}<br>
    <strong>Ore:</strong> ${totalProduction.ore}<br>
    <strong>Crop:</strong> ${totalProduction.crops}<br>

    <br>

    <u><strong>Total Costs:</strong></u><br>
    <strong>Emeralds:</strong> ${totalCosts.emeralds}<br>
    <strong>Wood:</strong> ${totalCosts.wood}<br>
    <strong>Fish:</strong> ${totalCosts.fish}<br>
    <strong>Ore:</strong> ${totalCosts.ore}<br>
    <strong>Crop:</strong> ${totalCosts.crops}<br>

    <br>

    <u><strong>Total Profit:</strong></u><br>
    <strong>Emeralds:</strong> ${totalProfit.emeralds}<br>
    <strong>Wood:</strong> ${totalProfit.wood}<br>
    <strong>Fish:</strong> ${totalProfit.fish}<br>
    <strong>Ore:</strong> ${totalProfit.ore}<br>
    <strong>Crop:</strong> ${totalProfit.crops}<br>
  `);

  const terrs = Object.keys(currentTerrs).filter(terrName => currentTerrs[terrName].selected == "selected");
  if (terrs.length == 0) {
    $("#terrsBeingModified").text("None");
  }
  else {
    $("#terrsBeingModified").text(terrs.join(", "));
  }

  updateRectangles();
}

function updateUpgrades() {
  $(".upgrades").empty();
  Object.entries(upgradesJSON).forEach(([upgradeName, upgradeData]) => {
    $(".upgrades").append(`
    <div class="col-4 upgradeBox">
      <button class="modifyUpgrade btn btn-warning" id="${upgradeName}D" onclick="modifyUpgrade(this.id)">-</button>
      <div class="arrowText" id="${upgradeName}">${upgradeData.displayName}: ${upgradeData.upgrades[upgradeData.current]}${upgradeData.type} (${upgradeData.current})</div>
      <button class="modifyUpgrade btn btn-warning" id="${upgradeName}U" onclick="modifyUpgrade(this.id)">+</button>
    </div>
    `);
  });
}


function updateTerrOutputs(terrs) {
  terrs.forEach(terr => {
    Object.entries(upgradesJSON).forEach(([upgradeType, upgradeData]) => {
      currentTerrs[terr].upgrades[upgradeType] = upgradeData.current;
    });

    currentTerrs[terr].type.forEach(type => {
      currentTerrs[terr].productions[type] = ((currentTerrs[terr].baseResources / 900) * (1 + (upgradesJSON.efficientResources.upgrades[upgradesJSON.efficientResources.current] / 100)) * (60 * (60 / upgradesJSON.resourceRate.upgrades[upgradesJSON.resourceRate.current]))) * (1 + (currentTerrs[terr].treasuryBonus) / 100);
    });
    currentTerrs[terr].productions.emeralds = ((currentTerrs[terr].baseEmeralds / 900) * (1 + (upgradesJSON.efficientEmeralds.upgrades[upgradesJSON.efficientEmeralds.current] / 100)) * (60 * (60 / upgradesJSON.emeraldRate.upgrades[upgradesJSON.emeraldRate.current]))) * (1 + (currentTerrs[terr].treasuryBonus) / 100);

    currentTerrs[terr].costs = { "emeralds": 0, "wood": 0, "fish": 0, "ore": 0, "crops": 0 };
    Object.entries(upgradesJSON).forEach(([upgradeType, upgradeData]) => {
      currentTerrs[terr].costs[upgradeData.resource] += upgradeData.costs[upgradeData.current];
    });
  });

  updateCards();
}

function terrOnClick(terrName) {
  if (currentTerrs[terrName].selected == "selected") {
    currentTerrs[terrName].selected = "unselected";
  }
  else {
    currentTerrs[terrName].selected = "selected";
  }

  const selectedTerrs = Object.keys(currentTerrs).filter(terrName => currentTerrs[terrName].selected == "selected");
  if (selectedTerrs.length == 0) {
    Object.values(upgradesJSON).forEach(upgradeData => upgradeData.current = 0);
    updateUpgrades();
  }
  else if (selectedTerrs.length == 1) {
    Object.entries(currentTerrs[selectedTerrs[0]].upgrades).forEach(([upgradeType, upgradeAmount]) => {
      upgradesJSON[upgradeType].current = upgradeAmount;
    });
    updateUpgrades();
  }

  updateCards();
}

function modifyUpgrade(id) {
  const upgradeType = id.slice(0, -1);

  if (id.slice(-1) == "U") {
    if (upgradesJSON[upgradeType].current < upgradesJSON[upgradeType].upgrades.length - 1) {
      upgradesJSON[upgradeType].current++;
      $(`#${upgradeType}`).text(`${upgradesJSON[upgradeType].displayName}: ${upgradesJSON[upgradeType].upgrades[upgradesJSON[upgradeType].current]}${upgradesJSON[upgradeType].type} (${upgradesJSON[upgradeType].current})`);
    }
  }
  else if (id.slice(-1) == "D") {
    if (upgradesJSON[upgradeType].current > 0) {
      upgradesJSON[upgradeType].current--;
      $(`#${upgradeType}`).text(`${upgradesJSON[upgradeType].displayName}: ${upgradesJSON[upgradeType].upgrades[upgradesJSON[upgradeType].current]}${upgradesJSON[upgradeType].type} (${upgradesJSON[upgradeType].current})`);
    }
  }

  const terrs = Object.keys(currentTerrs).filter(terrName => currentTerrs[terrName].selected == "selected");
  updateTerrOutputs(terrs);
}

function updateTreasuryBonus() {
  let treasuryBonusValue = parseInt($("#treasuryBonus").val());
  const changedTerrs = [];

  if (isNaN(treasuryBonusValue)) {
    treasuryBonusValue = 0;
  }

  Object.entries(currentTerrs).forEach(([terr, terrData]) => {
    if (terrData.selected == "selected") {
      terrData.treasuryBonus = treasuryBonusValue;
      changedTerrs.push(terr);
    }
  });

  updateTerrOutputs(changedTerrs);
}

$("#importMapButton").on("click", function () {
  $("#importMap").click();
});

$("#importMap").on("change", function () {
  const file = document.getElementById("importMap").files[0];

  const reader = new FileReader();
  reader.onload = function (file) {
    const mapJSON = JSON.parse(file.target.result);
    currentTerrNames = Object.keys(mapJSON.territories).filter(terrName => mapJSON.territories[terrName] == "AVO");
    updateCurrentTerrs();
  }
  reader.readAsText(file);

  document.getElementById("importMap").value = "";
});

$("#importUpgradesButton").on("click", function () {
  $("#importUpgrades").click();
});

$("#importUpgrades").on("change", function () {
  const file = document.getElementById("importUpgrades").files[0];

  const reader = new FileReader();
  reader.onload = function (file) {
    const importedData = JSON.parse(file.target.result);
    Object.entries(importedData).forEach(([terrName, terrData]) => {
      if (currentTerrs[terrName] != undefined) {
        terrData.popup = currentTerrs[terrName].popup;
      }
      terrData.selected = "unselected";
    });
    currentTerrs = Object.assign({}, importedData);
    currentTerrNames = Object.keys(currentTerrs);

    Object.values(upgradesJSON).forEach(upgradeData => {
      upgradeData.current = 0;
    });

    updateCards();
    updateUpgrades();
  }
  reader.readAsText(file);

  document.getElementById("importUpgrades").value = "";
});

$("#exportUpgradesButton").on("click", function () {
  const dataToExport = {};
  Object.assign(dataToExport, currentTerrs);

  Object.values(dataToExport).forEach(terrData => {
    delete terrData.popup;
  });

  const aElement = document.createElement("a");
  const fileToDownload = new Blob([JSON.stringify(dataToExport)], { type: 'application/json' });
  aElement.href = URL.createObjectURL(fileToDownload);
  aElement.download = 'upgrades.json';
  aElement.click();
});

$("#deselectAll").on("click", function () {
  Object.values(currentTerrs).forEach(currentTerrValue => {
    currentTerrValue.selected = "unselected";
  });

  const selectedTerrs = Object.keys(currentTerrs).filter(terrName => currentTerrs[terrName].selected == "selected");
  if (selectedTerrs.length == 0) {
    Object.values(upgradesJSON).forEach(upgradeData => upgradeData.current = 0);
    updateUpgrades();
  }
  else if (selectedTerrs.length == 1) {
    Object.entries(currentTerrs[selectedTerrs[0]].upgrades).forEach(([upgradeType, upgradeAmount]) => {
      upgradesJSON[upgradeType].current = upgradeAmount;
    });
    updateUpgrades();
  }
  updateCards();
});