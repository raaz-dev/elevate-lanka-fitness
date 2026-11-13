import { createFileRoute } from "@tanstack/react-router";
import { useId, useState } from "react";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const title = "Free Fitness Calculators — BMI, Calories, Water | IRONPEAK";
const description =
  "Free BMI, calorie/macro and daily water intake calculators built on the same formulas IRONPEAK coaches use in member assessments.";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const activityFactors = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
  athlete: 1.9,
} as const;
type ActivityKey = keyof typeof activityFactors;
type GoalKey = "lose" | "maintain" | "gain";

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof Input>) {
  const id = useId();
  return (
    <div>
      <Label
        htmlFor={id}
        className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-muted-foreground"
      >
        {label}
      </Label>
      <Input id={id} className="mt-2" {...props} />
    </div>
  );
}

function Page() {
  const { t } = useI18n();
  const [height, setHeight] = useState(172);
  const [weight, setWeight] = useState(78);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState<ActivityKey>("moderate");
  const [goal, setGoal] = useState<GoalKey>("lose");

  const h = height / 100;
  const bmi = h > 0 ? weight / (h * h) : 0;
  const bmiKey = bmi < 18.5 ? "under" : bmi < 25 ? "normal" : bmi < 30 ? "over" : "obese";

  const bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  const maintenance = Math.round(bmr * activityFactors[activity]);
  const target = Math.round(maintenance + (goal === "lose" ? -450 : goal === "gain" ? 350 : 0));
  const protein = Math.round(weight * (goal === "gain" ? 2 : 1.8));
  const fat = Math.round((target * 0.25) / 9);
  const carbs = Math.max(0, Math.round((target - protein * 4 - fat * 9) / 4));
  const water = (
    weight * 0.035 +
    (activity === "high" || activity === "athlete" ? 0.7 : 0.3)
  ).toFixed(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow={t.nav.tools}
        title={t.tools.title}
        subtitle={t.tools.subtitle}
        level={1}
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <Reveal className="rounded-2xl border border-border bg-card p-7">
          <h2 className="text-2xl uppercase">{t.tools.bmiTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field
              label={t.tools.height}
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
            <Field
              label={t.tools.weight}
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>
          <div className="mt-7 rounded-xl border border-border bg-surface p-6">
            <p className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
              {t.tools.yourBmi}
            </p>
            <p className="mt-1 font-display text-5xl ember-text">{bmi ? bmi.toFixed(1) : "—"}</p>
            <p className="mt-2 text-sm font-bold tracking-[0.14em] uppercase text-primary">
              {t.tools.bmiCategories[bmiKey]}
            </p>
            <p className="mt-4 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
              {t.tools.advice}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.tools.bmiAdvice[bmiKey]}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="rounded-2xl border border-border bg-card p-7">
          <h2 className="text-2xl uppercase">{t.tools.calorieTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field
              label={t.tools.age}
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
            <div>
              <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-muted-foreground">
                {t.tools.gender}
              </p>
              <div className="mt-2 inline-flex rounded-full border border-border p-1">
                {(["male", "female"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={gender === g}
                    onClick={() => setGender(g)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.14em] uppercase transition-colors",
                      gender === g ? "ember-bg text-primary-foreground" : "text-muted-foreground",
                    )}
                  >
                    {t.tools[g]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-muted-foreground">
              {t.tools.activity}
            </p>
            <div className="mt-2 space-y-2">
              {(Object.keys(activityFactors) as ActivityKey[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={activity === a}
                  onClick={() => setActivity(a)}
                  className={cn(
                    "block w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-colors",
                    activity === a
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.tools.activityLevels[a]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-muted-foreground">
              {t.tools.goal}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["lose", "maintain", "gain"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={goal === g}
                  onClick={() => setGoal(g)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs transition-colors",
                    goal === g
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.tools.goals[g]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-4 rounded-xl border border-border bg-surface p-6 sm:grid-cols-2">
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                {t.tools.maintenance}
              </p>
              <p className="font-display text-3xl">{maintenance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                {t.tools.target}
              </p>
              <p className="font-display text-3xl ember-text">{target.toLocaleString()}</p>
            </div>
            <div className="sm:col-span-2 grid grid-cols-3 gap-4 border-t border-border pt-4 text-sm">
              <p>
                <span className="block text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                  {t.tools.protein}
                </span>
                {protein} g
              </p>
              <p>
                <span className="block text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                  {t.tools.carbs}
                </span>
                {carbs} g
              </p>
              <p>
                <span className="block text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                  {t.tools.fat}
                </span>
                {fat} g
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-8 rounded-2xl border border-border bg-card p-7">
        <h2 className="text-2xl uppercase">{t.tools.waterTitle}</h2>
        <p className="mt-4 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
          {t.tools.waterResult}
        </p>
        <p className="mt-1 font-display text-4xl ember-text">
          {water} {t.tools.litres}
        </p>
      </Reveal>
    </div>
  );
}
