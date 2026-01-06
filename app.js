const $ = id => document.getElementById(id);

document.querySelectorAll("input").forEach(i =>
  i.addEventListener("input", calculate)
);

/* ---------- PRESETS ---------- */

const presets = [
  {
    name: "Country Loaf 65%",
    doughWeight: 800,
    hydration: 65,
    saltPct: 2,
    levainPct: 20,
    f1Pct: 90,
    f2Pct: 10,
    f3Pct: 0
  },
  {
    name: "High Hydration White",
    doughWeight: 900,
    hydration: 78,
    saltPct: 2,
    levainPct: 18,
    f1Pct: 100,
    f2Pct: 0,
    f3Pct: 0
  }
];

const presetSelect = $("presetSelect");
presets.forEach((p, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = p.name;
  presetSelect.appendChild(opt);
});

$("loadPreset").addEventListener("click", () => {
  const p = presets[presetSelect.value];
  if (!p) return;

  $("doughWeight").value = p.doughWeight;
  $("hydration").value = p.hydration;
  $("saltPct").value = p.saltPct;
  $("levainPct").value = p.levainPct;
  $("f1Pct").value = p.f1Pct;
  $("f2Pct").value = p.f2Pct;
  $("f3Pct").value = p.f3Pct;

  calculate();
});

$("exportPdf").addEventListener("click", () => window.print());

/* ---------- CALCULATION ---------- */

function calculate() {
  const dough = +$("doughWeight").value;
  const hydration = +$("hydration").value / 100;
  const saltPct = +$("saltPct").value / 100;
  const levainPct = +$("levainPct").value / 100;

  const flour =
    dough / (1 + hydration + saltPct + levainPct);

  const f1 = flour * ($("f1Pct").value / 100);
  const f2 = flour * ($("f2Pct").value / 100);
  const f3 = flour * ($("f3Pct").value / 100);

  $("f1Wt").value = f1.toFixed(0);
  $("f2Wt").value = f2.toFixed(0);
  $("f3Wt").value = f3.toFixed(0);

  const water = flour * hydration;
  const salt = flour * saltPct;

  $("waterWt").value = water.toFixed(0);
  $("saltWt").value = salt.toFixed(0);

  const levainFlour = (flour * levainPct) / 3;
  const levainWater = levainFlour;
  const levainStarter = levainFlour;
  const levainTotal = levainFlour * 3;

  $("levainFlour").value = levainFlour.toFixed(0);
  $("levainWater").value = levainWater.toFixed(0);
  $("levainStarter").value = levainStarter.toFixed(0);
  $("levainTotal").textContent = levainTotal.toFixed(0) + " g";

  $("pff").value =
    ((levainFlour / flour) * 100).toFixed(1);

  $("mainFlour").value = (flour - levainFlour).toFixed(0);
  $("mainWater").value = (water - levainWater).toFixed(0);
  $("mainSalt").value = salt.toFixed(0);
  $("mainLevain").value = levainTotal.toFixed(0);

  $("mainTotal").textContent = dough.toFixed(0) + " g";
  $("totalWeight").textContent = dough.toFixed(0) + " g";
}

calculate();
