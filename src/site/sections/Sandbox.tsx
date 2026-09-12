import { BUILD_KB } from "@/site/data";

/**
 * The loudest block on the page, and deliberately so — it is the one place
 * the surface stops being a console and shows off. Inverted ground, the real
 * /v1 frame, and a single unmissable action.
 */
export function Sandbox() {
  return (
    <section className="sandbox-field" id="sandbox" aria-labelledby="sandbox-label">
      <div className="wrap">
        <div className="sandbox-rail">
          <h2 className="label sandbox-eyebrow" id="sandbox-label">
            Sandbox build
          </h2>
          <span className="label sandbox-rail-end">Still running at /v1</span>
        </div>

        <div className="sandbox-grid">
          <div className="sandbox-copy">
            <p className="headline sandbox-head">
              Okay — but you should really see the fun one.
            </p>
            <p className="sandbox-body">
              Before this one I built my portfolio as a full 3D playground: a robot you
              zoom through as you scroll, a hand-written WebGL shader background, CRT
              scanlines, and an Arkanoid title screen you can actually play. It still
              runs, completely untouched.
            </p>
            <p className="sandbox-note">
              It also loads about 2&nbsp;MB of WebGL before it shows you anything, which
              is exactly why it isn&rsquo;t the front door — knowing which one to hand a
              stranger is the actual skill. But you&rsquo;re not a stranger any more.
              Go break it.
            </p>

            <a className="sandbox-cta" href="/v1/">
              <span>Launch the sandbox</span>
              <span className="sandbox-cta-arrow mono" aria-hidden="true">
                /v1
              </span>
            </a>

            <ul className="sandbox-specs">
              <li>
                <span className="label">Renderer</span>
                <span className="mono">Spline · WebGL · custom shaders</span>
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

          <a className="sandbox-shot" href="/v1/" aria-label="Open the 3D sandbox build">
            <span className="sandbox-shot-frame">
              <img
                src="/sandbox.jpg"
                width={1400}
                height={831}
                loading="lazy"
                decoding="async"
                alt="The v1 portfolio: a 3D robot on a black field under a pixel-type
                     TUSHAR title, with terminal and camera controls down the left side."
              />
              <span className="sandbox-shot-scan" aria-hidden="true" />
            </span>
            <span className="sandbox-shot-tag mono" aria-hidden="true">
              ▸ open
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
