import { BUILD_KB } from "@/site/data";

export function Sandbox() {
  return (
    <section className="section sandbox-section" aria-labelledby="sandbox-label">
      <div className="wrap">
        <div className="sandbox">
          <div className="sandbox-main">
            <h2 className="label sandbox-eyebrow" id="sandbox-label">
              Sandbox build
            </h2>
            <p className="headline sandbox-head">There&rsquo;s a second version of this site, and it&rsquo;s a toy.</p>
            <p className="body sandbox-body">
              Before this one, I built my portfolio as a 3D playground — a Spline robot you
              zoom through as you scroll, a hand-written WebGL shader background, CRT
              scanlines, an Arkanoid title screen. The whole thing still runs at{" "}
              <span className="mono sandbox-path">/v1</span>, untouched.
            </p>
            <p className="body-sm sandbox-note">
              It also loads about 2&nbsp;MB of WebGL before it shows you anything, which is
              precisely why it is not the front door. Knowing which one to put in front of a
              stranger is the actual skill.
            </p>
          </div>

          <div className="sandbox-side">
            <a className="btn sandbox-btn" href="/v1/">
              Launch sandbox
              <span className="btn-suffix">/v1</span>
            </a>
            <ul className="sandbox-specs">
              <li>
                <span className="label">Renderer</span>
                <span className="mono">Spline · WebGL</span>
              </li>
              <li>
                <span className="label">Payload</span>
                <span className="mono">~2 MB</span>
              </li>
              <li>
                <span className="label">This build</span>
                <span className="mono">{BUILD_KB} KB</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
