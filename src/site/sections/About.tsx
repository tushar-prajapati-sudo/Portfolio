import { profile } from "@/site/data";

/** Tushar in his own words. The console needs one human moment. */
export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-label">
      <div className="wrap">
        <div className="section-rail">
          <h2 className="label" id="about-label">
            Hihi
          </h2>
          <span className="label">A quick introduction</span>
        </div>

        <div className="about-body">
          <p className="about-greeting">{profile.greeting}</p>
          {profile.intro.map((para, i) => (
            <p key={i} className={i === 0 ? "about-lead" : "body about-para"}>
              {para}
            </p>
          ))}
          <p className="about-motto">{profile.motto}</p>
          <p className="about-sign label">— Tushar</p>
        </div>
      </div>
    </section>
  );
}
