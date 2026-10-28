/* ---------- Examples (hand-built, clearly marked) ---------- */
const EXAMPLES = [
{
  id:"ex-claim", example:true,
  title:"Claim status card",
  summary:"The card rises in, then the segmented progress fills one step at a time so the Veteran sees where their claim is.",
  prompt:"A claim status card with a segmented progress bar that fills step by step.",
  components:["va-card","va-tag-status","va-segmented-progress-bar","va-link"],
  preview:{
html:`<article class="c-card" aria-labelledby="c-t">
  <div class="c-head">
    <h3 id="c-t">Disability compensation claim</h3>
    <span class="c-tag">In progress</span>
  </div>
  <p class="c-meta">Received June 3, 2026</p>
  <ol class="c-steps" aria-label="Claim progress: step 3 of 5">
    <li class="c-done" style="--i:0"><span class="c-sr">Claim received, complete</span></li>
    <li class="c-done" style="--i:1"><span class="c-sr">Initial review, complete</span></li>
    <li class="c-now" style="--i:2" aria-current="step"><span class="c-sr">Evidence gathering, current step</span></li>
    <li style="--i:3"><span class="c-sr">Preparing decision</span></li>
    <li style="--i:4"><span class="c-sr">Complete</span></li>
  </ol>
  <p class="c-step"><strong>Step 3 of 5:</strong> Evidence gathering</p>
  <p class="c-body">We're reviewing your evidence. If we need more information, we'll contact you.</p>
  <a class="c-link" href="#details">Review claim details</a>
</article>`,
css:`.c-card{width:min(100%,380px);background:#fff;border:1px solid var(--vads-color-gray-light);border-top:4px solid var(--vads-color-primary);padding:var(--vads-space-5);animation:c-rise 320ms cubic-bezier(.2,.8,.2,1) both}
.c-head{display:flex;justify-content:space-between;align-items:flex-start;gap:var(--vads-space-3)}
.c-card h3{margin:0;font-size:1.25rem;line-height:1.3}
.c-tag{flex:none;font-size:.875rem;font-weight:700;background:var(--vads-color-info-lighter);padding:2px 8px;animation:c-pop 260ms 1050ms cubic-bezier(.2,.8,.2,1) both}
.c-meta{margin:4px 0 var(--vads-space-4);color:var(--vads-color-base);font-size:.9375rem}
.c-steps{list-style:none;margin:0;padding:0;display:flex;gap:4px}
.c-steps li{flex:1;height:10px;background:var(--vads-color-gray-light);position:relative;overflow:hidden}
.c-steps li::after{content:"";position:absolute;inset:0;background:var(--vads-color-primary);transform:scaleX(0);transform-origin:left}
.c-steps .c-done::after,.c-steps .c-now::after{animation:c-fill 240ms cubic-bezier(.4,0,.2,1) both;animation-delay:calc(320ms + var(--i) * 140ms)}
.c-steps .c-now::after{background:var(--vads-color-primary-dark)}
.c-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.c-step{margin:var(--vads-space-3) 0 4px}
.c-body{margin:0 0 var(--vads-space-4)}
.c-link{font-weight:700;color:var(--vads-color-action);text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.c-link::after{content:"";width:8px;height:8px;border-right:2px solid currentColor;border-top:2px solid currentColor;transform:rotate(45deg);transition:transform 150ms cubic-bezier(.4,0,.2,1)}
.c-link:hover{text-decoration:underline}
.c-link:hover::after{transform:translateX(3px) rotate(45deg)}
@keyframes c-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes c-fill{to{transform:scaleX(1)}}
@keyframes c-pop{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.c-card,.c-tag{animation:none}.c-steps .c-done::after,.c-steps .c-now::after{animation:none;transform:none}}`,
js:""},
  production:`<style>
  @media (prefers-reduced-motion: no-preference) {
    .claim-status { animation: claim-rise 320ms cubic-bezier(.2,.8,.2,1) both; }
  }
  @keyframes claim-rise { from { opacity: 0; transform: translateY(8px); } }
</style>

<va-card>
  <h3>Disability compensation claim</h3>
  <va-tag-status status="info" text="In progress"></va-tag-status>
  <p>Received June 3, 2026</p>
  <va-segmented-progress-bar
    current="3"
    total="5"
    heading-text="Claim progress"
    labels="Received;Initial review;Evidence gathering;Review;Decision"
    header-level="4">
  </va-segmented-progress-bar>
  <p>We're reviewing your evidence. If we need more information, we'll contact you.</p>
  <va-link active href="/track-claims/your-claims/" text="Review claim details"></va-link>
</va-card>`,
  motion:[
    {element:"Card",trigger:"Load",property:"opacity, translateY 8px → 0",duration_ms:320,delay_ms:0,easing:"cubic-bezier(.2,.8,.2,1)",reduced_motion:"Appears in place"},
    {element:"Progress segments 1–3",trigger:"Load",property:"scaleX 0 → 1 (left origin)",duration_ms:240,delay_ms:320,easing:"cubic-bezier(.4,0,.2,1), 140ms stagger",reduced_motion:"Filled instantly"},
    {element:"Status tag",trigger:"After fill",property:"opacity, scale .88 → 1",duration_ms:260,delay_ms:1050,easing:"cubic-bezier(.2,.8,.2,1)",reduced_motion:"Static"},
    {element:"Details link chevron",trigger:"Hover",property:"translateX 3px",duration_ms:150,delay_ms:0,easing:"cubic-bezier(.4,0,.2,1)",reduced_motion:"No shift"}
  ],
  a11y:[
    "Progress state is in text (\u201cStep 3 of 5\u201d), not only in the bar.",
    "The current segment carries aria-current=\"step\".",
    "Total motion finishes in about 1.3 seconds and never loops.",
    "Verify va-tag-status prop names against Storybook before shipping."
  ]
},
{
  id:"ex-appt", example:true,
  title:"Appointment check-in card",
  summary:"The location pin drops onto the map, details stagger in, and Check in confirms with a success message.",
  prompt:"An upcoming appointment card with a small map, date chip, and a Check in button.",
  components:["va-card","va-button","va-link","va-alert"],
  preview:{
html:`<article class="c-appt" aria-labelledby="c-at">
  <div class="c-map" aria-hidden="true"><span class="c-road"></span><span class="c-road c-r2"></span><span class="c-ring"></span><span class="c-pin"></span></div>
  <div class="c-in">
    <div class="c-date" aria-hidden="true"><span>Thu</span><strong>14</strong></div>
    <p class="c-eye">Upcoming appointment</p>
    <h3 id="c-at">Primary care</h3>
    <ul class="c-dl">
      <li style="--i:0"><b>When</b> Thursday, January 14, 2027, 9:30 a.m. ET</li>
      <li style="--i:1"><b>Where</b> Philadelphia VA Medical Center, Building 1</li>
      <li style="--i:2"><b>Provider</b> Dr. Ana Ruiz</li>
    </ul>
    <div class="c-actions">
      <button class="c-btn" id="c-check" type="button">Check in</button>
      <a class="c-link" href="#directions">Get directions</a>
    </div>
    <div class="c-reveal" id="c-ok"><div><div class="c-alert" role="status" id="c-live"></div></div></div>
  </div>
</article>`,
css:`.c-appt{width:min(100%,380px);background:#fff;border:1px solid var(--vads-color-gray-light);animation:c-rise 300ms cubic-bezier(.2,.8,.2,1) both}
.c-map{position:relative;height:96px;background:#eef1ee;background-image:linear-gradient(#dfe5df 1px,transparent 1px),linear-gradient(90deg,#dfe5df 1px,transparent 1px);background-size:22px 22px;overflow:hidden}
.c-road{position:absolute;left:-10%;right:-10%;top:58%;height:7px;background:#fff;transform:rotate(-8deg);box-shadow:0 0 0 1px #d6dbd6}
.c-r2{top:-10%;bottom:-10%;left:62%;right:auto;width:6px;height:auto;transform:rotate(12deg)}
.c-pin{position:absolute;left:50%;top:38%;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:var(--vads-color-error);border:3px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,.25);animation:c-drop 420ms 220ms cubic-bezier(.3,1.4,.5,1) both}
.c-ring{position:absolute;left:50%;top:38%;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(213,67,9,.18);animation:c-ring 600ms 560ms cubic-bezier(.2,.8,.2,1) both}
.c-in{position:relative;padding:var(--vads-space-5);padding-top:var(--vads-space-6)}
.c-date{position:absolute;top:-26px;left:var(--vads-space-5);background:#fff;border:1px solid var(--vads-color-gray-light);width:52px;padding:4px 0;text-align:center;line-height:1.1;animation:c-pop 280ms 380ms cubic-bezier(.2,.8,.2,1) both}
.c-date span{display:block;font-size:.75rem;color:var(--vads-color-error);font-weight:700}
.c-date strong{font-size:1.4rem;font-family:var(--font-heading)}
.c-eye{margin:var(--vads-space-3) 0 0;font-size:.875rem;color:var(--vads-color-base);font-weight:600}
.c-appt h3{margin:2px 0 var(--vads-space-3);font-size:1.5rem}
.c-dl{list-style:none;margin:0 0 var(--vads-space-4);padding:0;display:grid;gap:6px}
.c-dl li{display:grid;grid-template-columns:72px 1fr;gap:8px;font-size:.95rem;animation:c-rise 260ms cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(480ms + var(--i) * 80ms)}
.c-dl b{color:var(--vads-color-base)}
.c-actions{display:flex;flex-wrap:wrap;align-items:center;gap:var(--vads-space-4)}
.c-btn{font:inherit;font-weight:700;background:var(--vads-color-primary);color:#fff;border:0;border-radius:4px;padding:10px 20px;cursor:pointer;transition:background 150ms,transform 120ms}
.c-btn:hover{background:var(--vads-color-primary-dark)}
.c-btn:active{transform:scale(.97)}
.c-btn[disabled]{background:var(--vads-color-gray-medium);cursor:default}
.c-link{font-weight:700;color:var(--vads-color-action)}
.c-reveal{display:grid;grid-template-rows:0fr;transition:grid-template-rows 280ms cubic-bezier(.4,0,.2,1)}
.c-reveal>div{overflow:hidden}
.c-reveal.c-open{grid-template-rows:1fr}
.c-alert{margin-top:var(--vads-space-4);border-left:6px solid var(--vads-color-success);background:var(--vads-color-success-lighter);padding:var(--vads-space-3) var(--vads-space-4);opacity:0;transform:translateY(-4px);transition:opacity 220ms 80ms,transform 220ms 80ms cubic-bezier(.2,.8,.2,1)}
.c-open .c-alert{opacity:1;transform:none}
:focus-visible{outline:2px solid var(--vads-color-focus);outline-offset:2px}
@keyframes c-rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes c-pop{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:none}}
@keyframes c-drop{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:none}}
@keyframes c-ring{from{opacity:0;transform:scale(.3)}60%{opacity:1}to{opacity:.0;transform:scale(1.3)}}
@media (prefers-reduced-motion:reduce){.c-appt,.c-pin,.c-ring,.c-date,.c-dl li{animation:none}.c-ring{opacity:0}.c-reveal,.c-alert{transition:none}}`,
js:`var b=document.getElementById('c-check');
b.addEventListener('click',function(){
  b.disabled=true;b.textContent='Checking in\u2026';
  setTimeout(function(){
    b.textContent='Checked in';
    document.getElementById('c-live').innerHTML='<strong>You\u2019re checked in.</strong> Have a seat. We\u2019ll call you when it\u2019s time.';
    document.getElementById('c-ok').classList.add('c-open');
  },700);
});`},
  production:`<style>
  @media (prefers-reduced-motion: no-preference) {
    .appt-card { animation: appt-rise 300ms cubic-bezier(.2,.8,.2,1) both; }
  }
  @keyframes appt-rise { from { opacity: 0; transform: translateY(6px); } }
</style>

<va-card class="appt-card">
  <p>Upcoming appointment</p>
  <h3>Primary care</h3>
  <p><strong>When:</strong> Thursday, January 14, 2027, 9:30 a.m. ET</p>
  <p><strong>Where:</strong> Philadelphia VA Medical Center, Building 1</p>
  <p><strong>Provider:</strong> Dr. Ana Ruiz</p>
  <va-button text="Check in" id="check-in"></va-button>
  <va-link href="/find-locations/" text="Get directions"></va-link>
  <va-alert status="success" slim visible="false" id="check-in-confirm">
    You're checked in. Have a seat. We'll call you when it's time.
  </va-alert>
</va-card>`,
  motion:[
    {element:"Card",trigger:"Load",property:"opacity, translateY 6px → 0",duration_ms:300,delay_ms:0,easing:"cubic-bezier(.2,.8,.2,1)",reduced_motion:"Appears in place"},
    {element:"Map pin",trigger:"Load",property:"translateY −18px → 0 with slight settle",duration_ms:420,delay_ms:220,easing:"cubic-bezier(.3,1.4,.5,1)",reduced_motion:"Pin shown in place"},
    {element:"Pin ring",trigger:"After pin lands",property:"scale .3 → 1.3, fade out (plays once)",duration_ms:600,delay_ms:560,easing:"cubic-bezier(.2,.8,.2,1)",reduced_motion:"Hidden"},
    {element:"Date chip",trigger:"Load",property:"opacity, scale .8 → 1",duration_ms:280,delay_ms:380,easing:"cubic-bezier(.2,.8,.2,1)",reduced_motion:"Static"},
    {element:"Detail rows",trigger:"Load",property:"opacity, translateY 6px → 0",duration_ms:260,delay_ms:480,easing:"80ms stagger",reduced_motion:"Static"},
    {element:"Success alert",trigger:"Check in",property:"height 0fr → 1fr, then fade + 4px drop",duration_ms:280,delay_ms:0,easing:"cubic-bezier(.4,0,.2,1)",reduced_motion:"Appears instantly"}
  ],
  a11y:[
    "The confirmation uses role=\"status\" so screen readers announce it.",
    "The date chip is decorative; the full date is in the details text.",
    "Button label changes to \u201cChecked in\u201d and is disabled to prevent a double check-in.",
    "The pin\u2019s settle overshoot is under 4px, and the ring plays once."
  ]
},
{
  id:"ex-rx", example:true,
  title:"Prescription refill request",
  summary:"Request refill shows a short sending state, the refill count ticks down, and a success alert opens below.",
  prompt:"A prescription card with a Request refill button that confirms with a success alert.",
  components:["va-card","va-button","va-loading-indicator","va-alert"],
  preview:{
html:`<section class="c-rx" aria-labelledby="c-rt">
  <p class="c-eye">Prescription</p>
  <h3 id="c-rt">Atorvastatin 20 mg tablet</h3>
  <dl class="c-meta">
    <div><dt>Refills left</dt><dd><span class="c-num" id="c-n">3</span></dd></div>
    <div><dt>Last filled</dt><dd>December 2, 2026</dd></div>
  </dl>
  <button class="c-btn" id="c-go" type="button"><span class="c-spin" aria-hidden="true"></span><span id="c-lbl">Request refill</span></button>
  <div class="c-reveal" id="c-ok"><div><div class="c-alert" role="status" id="c-live"></div></div></div>
</section>`,
css:`.c-rx{width:min(100%,360px);background:#fff;border:1px solid var(--vads-color-gray-light);padding:var(--vads-space-5);animation:c-rise 300ms cubic-bezier(.2,.8,.2,1) both}
.c-eye{margin:0;font-size:.875rem;font-weight:600;color:var(--vads-color-base)}
.c-rx h3{margin:2px 0 var(--vads-space-4);font-size:1.375rem;line-height:1.3}
.c-meta{display:flex;gap:var(--vads-space-6);margin:0 0 var(--vads-space-5)}
.c-meta dt{font-size:.875rem;color:var(--vads-color-base)}
.c-meta dd{margin:0;font-weight:700;font-size:1.05rem}
.c-num{display:inline-block;font-variant-numeric:tabular-nums}
.c-num.c-tick{animation:c-tick 320ms cubic-bezier(.2,.8,.2,1)}
.c-btn{font:inherit;font-weight:700;display:inline-flex;align-items:center;gap:10px;background:var(--vads-color-primary);color:#fff;border:0;border-radius:4px;padding:10px 20px;cursor:pointer;transition:background 150ms}
.c-btn:hover{background:var(--vads-color-primary-dark)}
.c-btn[disabled]{background:var(--vads-color-gray-medium);cursor:default}
.c-spin{display:none;width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;animation:c-rot 700ms linear infinite}
.c-busy .c-spin{display:inline-block}
.c-reveal{display:grid;grid-template-rows:0fr;transition:grid-template-rows 280ms cubic-bezier(.4,0,.2,1)}
.c-reveal>div{overflow:hidden}
.c-reveal.c-open{grid-template-rows:1fr}
.c-alert{margin-top:var(--vads-space-4);border-left:6px solid var(--vads-color-success);background:var(--vads-color-success-lighter);padding:var(--vads-space-3) var(--vads-space-4);opacity:0;transform:translateY(-4px);transition:opacity 220ms 80ms,transform 220ms 80ms cubic-bezier(.2,.8,.2,1)}
.c-alert p{margin:4px 0 0}
.c-open .c-alert{opacity:1;transform:none}
:focus-visible{outline:2px solid var(--vads-color-focus);outline-offset:2px}
@keyframes c-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes c-tick{0%{opacity:0;transform:translateY(-8px)}100%{opacity:1;transform:none}}
@keyframes c-rot{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.c-rx,.c-num.c-tick{animation:none}.c-spin{animation-duration:1.6s}.c-reveal,.c-alert{transition:none}}`,
js:`var b=document.getElementById('c-go');
b.addEventListener('click',function(){
  b.disabled=true;b.classList.add('c-busy');b.setAttribute('aria-busy','true');
  document.getElementById('c-lbl').textContent='Sending request';
  setTimeout(function(){
    b.classList.remove('c-busy');b.removeAttribute('aria-busy');
    document.getElementById('c-lbl').textContent='Refill requested';
    var n=document.getElementById('c-n');n.textContent='2';n.classList.add('c-tick');
    document.getElementById('c-live').innerHTML='<strong>We got your refill request</strong><p>We\u2019ll mail it to you. It usually arrives in about a week.</p>';
    document.getElementById('c-ok').classList.add('c-open');
  },900);
});`},
  production:`<va-card>
  <p>Prescription</p>
  <h3>Atorvastatin 20 mg tablet</h3>
  <p><strong>Refills left:</strong> 3</p>
  <p><strong>Last filled:</strong> December 2, 2026</p>
  <va-button text="Request refill" id="request-refill"></va-button>
  <va-loading-indicator label="Sending your refill request" message="Sending request" hidden></va-loading-indicator>
  <va-alert status="success" visible="false" id="refill-confirm">
    <h4 slot="headline">We got your refill request</h4>
    <p>We'll mail it to you. It usually arrives in about a week.</p>
  </va-alert>
</va-card>`,
  motion:[
    {element:"Card",trigger:"Load",property:"opacity, translateY 8px → 0",duration_ms:300,delay_ms:0,easing:"cubic-bezier(.2,.8,.2,1)",reduced_motion:"Appears in place"},
    {element:"Button spinner",trigger:"Request refill",property:"rotate 360° (loops only while sending)",duration_ms:700,delay_ms:0,easing:"linear",reduced_motion:"Slowed to 1.6s"},
    {element:"Refill count",trigger:"Request succeeds",property:"opacity, translateY −8px → 0",duration_ms:320,delay_ms:0,easing:"cubic-bezier(.2,.8,.2,1)",reduced_motion:"Number swaps instantly"},
    {element:"Success alert",trigger:"Request succeeds",property:"height 0fr → 1fr, then fade + 4px drop",duration_ms:280,delay_ms:0,easing:"cubic-bezier(.4,0,.2,1)",reduced_motion:"Appears instantly"}
  ],
  a11y:[
    "The button sets aria-busy while sending and is disabled after success.",
    "The alert has role=\"status\" so the result is announced.",
    "The spinner only loops during the request, then stops.",
    "Confirm va-loading-indicator and va-alert visibility props in Storybook."
  ]
}];

/* ---------- Agent knowledge (stand-in for the VADS MCP) ---------- */
/* Real props and allowed values for every component in @department-of-veterans-affairs/web-components 24.21.0 (from its component-docs.json). */
const VADS_SPEC_VER="24.21.0";
const VADS_SPEC={"va-accordion":{"p":{"bordered":0,"disable-analytics":0,"open-single":0,"section-heading":0},"s":[]},"va-accordion-item":{"p":{"bordered":0,"header":0,"header-sr-only":0,"level":0,"open":0,"subheader":0},"s":[]},"va-action-list":{"p":{"expand-button-item-name":0,"heading-level":0,"heading-text":0,"max-visible-count":0,"variant":["attention","launcher","summary"]},"s":[]},"va-action-list-item":{"p":{"action-title":0,"external":0,"href":0,"icon":0,"router-link":0,"tag-status":["default","error","info","success","warning"],"tag-text":0,"variant":["attention","empty","launcher","summary"]},"s":[]},"va-additional-info":{"p":{"disable-analytics":0,"disable-border":0,"trigger":0},"s":[]},"va-alert":{"p":{"close-btn-aria-label":0,"closeable":0,"disable-analytics":0,"full-width":0,"slim":0,"status":["continue","error","info","success","warning"],"visible":0},"s":[]},"va-alert-expandable":{"p":{"disable-analytics":0,"iconless":0,"status":["continue","info","success","warning"],"trigger":0},"s":[]},"va-alert-sign-in":{"p":{"heading-level":0,"no-sign-in-link":0,"time-limit":0,"variant":0,"visible":0},"s":[]},"va-back-to-top":{"p":{},"s":[]},"va-banner":{"p":{"data-label":0,"disable-analytics":0,"dismissed-banner-id":0,"headline":0,"show-close":0,"type":["continue","error","info","success","warning"],"visible":0,"window-session":0},"s":[]},"va-breadcrumbs":{"p":{"breadcrumb-list":0,"current-page-redirect":0,"disable-analytics":0,"home-veterans-affairs":0,"label":0,"wrapping":0},"s":[]},"va-button":{"p":{"back":0,"big":0,"continue":0,"disable-analytics":0,"disabled":0,"full-width":0,"label":0,"loading":0,"message-aria-describedby":0,"primary-alternate":0,"secondary":0,"submit":0,"text":0},"s":[]},"va-button-icon":{"p":{"button-type":["cancel","change-file","collapse","delete","expand"],"disable-analytics":0,"label":0},"s":[]},"va-button-pair":{"p":{"continue":0,"disable-analytics":0,"left-button-text":0,"primary-label":0,"right-button-text":0,"secondary-label":0,"submit":0,"update":0},"s":[]},"va-button-segmented":{"p":{"buttons":0,"disable-analytics":0,"label":0,"selected":0},"s":[]},"va-card":{"p":{"background":0,"icon-name":0,"show-shadow":0},"s":[]},"va-card-status":{"p":{"error":0,"header-level":0,"header-text":0,"link-href":0,"link-text":0,"required":0,"subheader-text":0,"tag-status":["error","info"],"tag-text":0},"s":[]},"va-checkbox":{"p":{"checkbox-description":0,"checked":0,"description":0,"disabled":0,"enable-analytics":0,"error":0,"hint":0,"indeterminate":0,"label":0,"message-aria-describedby":0,"name":0,"required":0,"tile":0},"s":[]},"va-checkbox-group":{"p":{"enable-analytics":0,"error":0,"form-heading":0,"form-heading-level":0,"hint":0,"label":0,"label-header-level":0,"label-sr-only":0,"message-aria-describedby":0,"required":0,"use-forms-pattern":0},"s":[]},"va-combo-box":{"p":{"disabled":0,"error":0,"hint":0,"label":0,"message-aria-describedby":0,"name":0,"placeholder":0,"required":0,"show-input-error":0,"value":0},"s":[]},"va-crisis-line-modal":{"p":{"chat-url":0,"mode":["modal","trigger"],"phone-extension":0,"phone-number":0,"text-number":0,"tty-crisis-extension":0,"tty-number":0},"s":[]},"va-critical-action":{"p":{"link":0,"text":0},"s":[]},"va-date":{"p":{"custom-day-error-message":0,"custom-month-error-message":0,"custom-year-error-message":0,"enable-analytics":0,"error":0,"hint":0,"invalid-day":0,"invalid-month":0,"invalid-year":0,"label":0,"max-year":0,"min-year":0,"month-optional":0,"month-year-only":0,"name":0,"required":0,"value":0},"s":[]},"va-details":{"p":{"label":0,"width":["2xl","xl"]},"s":[]},"va-file-input":{"p":{"accept":0,"disable-password-submit-button-pattern":0,"enable-analytics":0,"encrypted":0,"error":0,"header-size":0,"headless":0,"hint":0,"label":0,"max-file-size":0,"min-file-size":0,"name":0,"password-error":0,"password-submission-success":0,"percent-uploaded":0,"read-only":0,"required":0,"status-text":0,"upload-message":0,"uploaded-file":0,"value":0},"s":[]},"va-file-input-multiple":{"p":{"accept":0,"disable-password-submit-button-pattern":0,"enable-analytics":0,"encrypted":0,"errors":0,"header-size":0,"hint":0,"label":0,"max-file-size":0,"min-file-size":0,"name":0,"password-errors":0,"password-submission-success-list":0,"percent-uploaded":0,"read-only":0,"required":0,"slot-field-indexes":0,"status-text":0,"uploaded-files":0,"value":0},"s":[]},"va-header-minimal":{"p":{"enable-headings":0,"header":0,"subheader":0},"s":[]},"va-header-navigation":{"p":{"account-menu-data":0,"base-url":0,"current-href":0,"disable-analytics":0,"hide-sign-in":0,"menu-data":0,"personal-nav-data":0,"sign-out-href":0,"user":0},"s":[]},"va-icon":{"p":{"icon":0,"size":0,"sprite-location":0,"srtext":0},"s":[]},"va-language-toggle":{"p":{"en-href":0,"es-href":0,"language":0,"router-links":0,"tl-href":0},"s":[]},"va-link":{"p":{"abbr-title":0,"active":0,"back":0,"calendar":0,"channel":0,"disable-analytics":0,"download":0,"external":0,"filename":0,"filetype":0,"href":0,"icon-name":0,"icon-size":0,"label":0,"language":0,"pages":0,"reverse":0,"text":0,"video":0},"s":[]},"va-link-action":{"p":{"disable-analytics":0,"href":0,"label":0,"message-aria-describedby":0,"text":0,"type":["primary","primary-entry","reverse","secondary"]},"s":[]},"va-loading-indicator":{"p":{"enable-analytics":0,"inline":0,"label":0,"message":0,"set-focus":0},"s":[]},"va-maintenance-banner":{"p":{"banner-id":0,"disable-analytics":0,"is-error":0,"maintenance-end-date-time":0,"maintenance-start-date-time":0,"maintenance-title":0,"maintenance-title-header-level":0,"upcoming-warn-start-date-time":0,"upcoming-warn-title":0},"s":[]},"va-memorable-date":{"p":{"custom-day-error-message":0,"custom-month-error-message":0,"custom-year-error-message":0,"enable-analytics":0,"error":0,"external-validation":0,"form-heading":0,"form-heading-level":0,"header-aria-describedby":0,"hint":0,"invalid-day":0,"invalid-month":0,"invalid-year":0,"label":0,"label-header-level":0,"max-year":0,"min-year":0,"month-select":0,"name":0,"remove-date-hint":0,"required":0,"use-forms-pattern":0,"value":0},"s":[]},"va-minimal-footer":{"p":{},"s":[]},"va-modal":{"p":{"click-to-close":0,"disable-analytics":0,"forced-modal":0,"initial-focus-selector":0,"label":0,"large":0,"modal-title":0,"primary-button-text":0,"secondary-button-text":0,"status":["continue","error","info","success","warning"],"unstyled":0,"visible":0},"s":[]},"va-need-help":{"p":{},"s":[]},"va-notification":{"p":{"close-btn-aria-label":0,"closeable":0,"date-time":0,"disable-analytics":0,"has-border":0,"has-close-text":0,"headline":0,"headline-level":0,"href":0,"symbol":0,"text":0,"visible":0},"s":[]},"va-official-gov-banner":{"p":{"disable-analytics":0,"tld":0},"s":[]},"va-omb-info":{"p":{"benefit-type":0,"exp-date":0,"form-id":0,"modal-click-to-close":0,"omb-number":0,"res-burden":0},"s":[]},"va-on-this-page":{"p":{"disable-analytics":0,"exclude-selectors":0,"header-level":0},"s":[]},"va-pagination":{"p":{"aria-label-suffix":0,"enable-analytics":0,"page":0,"pages":0,"unbounded":0},"s":[]},"va-privacy-agreement":{"p":{"checked":0,"enable-analytics":0,"show-error":0},"s":[]},"va-process-list":{"p":{},"s":[]},"va-process-list-item":{"p":{"active":0,"checkmark":0,"header":0,"level":0,"pending":0,"status-text":0},"s":[]},"va-progress-bar":{"p":{"enable-analytics":0,"label":0,"no-percent-screen-reader":0,"percent":0},"s":[]},"va-promo-banner":{"p":{"disable-analytics":0,"href":0,"type":["announcement","email-signup","news"]},"s":[]},"va-radio":{"p":{"enable-analytics":0,"error":0,"form-heading":0,"form-heading-level":0,"header-aria-describedby":0,"hint":0,"label":0,"label-header-level":0,"message-aria-describedby":0,"required":0,"use-forms-pattern":0},"s":[]},"va-radio-option":{"p":{"aria-describedby":0,"checked":0,"description":0,"disabled":0,"label":0,"name":0,"tile":0,"value":0},"s":[]},"va-search-filter":{"p":{"filter-options":0,"header":0},"s":[]},"va-search-input":{"p":{"big":0,"button-text":0,"disable-analytics":0,"label":0,"small":0,"suggestions":0,"value":0},"s":[]},"va-segmented-progress-bar":{"p":{"centered-labels":0,"counters":["default","small"],"current":0,"enable-analytics":0,"header-level":0,"heading-text":0,"label":0,"labels":0,"progress-term":0,"total":0,"use-div":0},"s":[]},"va-select":{"p":{"enable-analytics":0,"error":0,"form-heading":0,"form-heading-level":0,"full-width":0,"header-aria-describedby":0,"hide-required-text":0,"hint":0,"invalid":0,"label":0,"label-header-level":0,"message-aria-describedby":0,"name":0,"reflect-input-error":0,"required":0,"show-error":0,"use-forms-pattern":0,"value":0,"width":0},"s":[]},"va-service-list-item":{"p":{"action":0,"icon":0,"optional-link":0,"service-details":0,"service-link":0,"service-name":0,"service-name-heading-level":0,"service-status":0},"s":[]},"va-sidenav":{"p":{"header":0,"header-level":0,"icon-background-color":0,"icon-name":0,"mobile-header":0,"nav-aria-label":0,"variant":["compact","default"]},"s":[]},"va-sidenav-item":{"p":{"current-page":0,"href":0,"label":0,"router-link":0},"s":[]},"va-sidenav-submenu":{"p":{"current-page":0,"href":0,"label":0,"router-link":0},"s":[]},"va-sort":{"p":{"enable-analytics":0,"message-aria-describedby":0,"name":0,"value":0,"width":0},"s":[]},"va-statement-of-truth":{"p":{"checkbox-error":0,"checkbox-label":0,"checked":0,"heading":0,"heading-level":0,"hide-legal-note":0,"input-error":0,"input-label":0,"input-message-aria-describedby":0,"input-value":0},"s":[]},"va-summary-box":{"p":{},"s":[]},"va-tab-item":{"p":{"button-text":0,"selected":0,"target-id":0},"s":[]},"va-tab-panel":{"p":{"panel-id":0,"selected":0},"s":[]},"va-table":{"p":{"empty-cell-text":0,"full-width":0,"mono-font-cols":0,"right-align-cols":0,"scrollable":0,"sortable":0,"stacked":0,"striped":0,"table-title":0,"table-title-summary":0,"table-type":["borderless"]},"s":[]},"va-table-inner":{"p":{"cols":0,"full-width":0,"mono-font-cols":0,"right-align-cols":0,"rows":0,"scrollable":0,"sortable":0,"stacked":0,"striped":0,"table-title":0,"table-title-summary":0,"table-type":["borderless"]},"s":[]},"va-table-row":{"p":{},"s":[]},"va-tabs":{"p":{"initially-selected":0,"label":0},"s":[]},"va-tag-status":{"p":{"big":0,"screen-reader-text":0,"status":["default","error","info","success","warning"],"text":0},"s":[]},"va-telephone":{"p":{"contact":0,"country-code":0,"disable-analytics":0,"extension":0,"international":0,"message-aria-describedby":0,"not-clickable":0,"sms":0,"tty":0,"vanity":0},"s":[]},"va-telephone-input":{"p":{"contact":0,"country":["LI","AC","AD","AE","AF","AG","AI","AL","AM","AO","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GT","GU","GW","GY","HK","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TA","TC","TD","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","XK","YE","YT","ZA","ZM","ZW"],"error":0,"hint":0,"label":0,"no-country":0,"required":0,"show-internal-errors":0},"s":[]},"va-text-input":{"p":{"autocomplete":0,"charcount":0,"currency":0,"enable-analytics":0,"error":0,"error-has-pii":0,"form-heading":0,"form-heading-level":0,"hide-required-text":0,"hint":0,"input-icon-prefix":0,"input-icon-suffix":0,"input-prefix":0,"input-suffix":0,"inputmode":["decimal","email","numeric","search","tel","text","url"],"invalid":0,"label":0,"label-header-level":0,"max":0,"maxlength":0,"message-aria-describedby":0,"min":0,"name":0,"pattern":0,"reflect-input-error":0,"required":0,"show-input-error":0,"step":0,"success":0,"type":["email","number","password","search","tel","text","url"],"use-forms-pattern":0,"value":0,"width":0},"s":[]},"va-textarea":{"p":{"charcount":0,"enable-analytics":0,"error":0,"form-heading":0,"form-heading-level":0,"header-aria-describedby":0,"hint":0,"label":0,"label-header-level":0,"maxlength":0,"message-aria-describedby":0,"name":0,"placeholder":0,"required":0,"use-forms-pattern":0,"value":0},"s":[]}};
function specList(){return Object.entries(VADS_SPEC).map(([t,d])=>{const a=Object.entries(d.p).filter(([k])=>!/analytics|aria-describedby/.test(k)).map(([k,e])=>e?k+"="+e.join("|"):k);return t+(a.length?" ["+a.join(", ")+"]":"")+(d.s.length?" slots: "+d.s.join(", "):"")}).join("\n")}
const VADS_KNOWLEDGE = `VA DESIGN SYSTEM (VADS) REFERENCE, Component Library v56. Built for VA.gov.
RULE: Anything a VADS web component covers must use that component in production code. Custom lookalikes are "imposter components" and block launch at Staging Review.
PRODUCTION COMPONENTS: use only tags from the component list. Attributes in brackets are the real props. Values after = are the only allowed values. Boolean props are bare attributes. Structure: va-accordion > va-accordion-item header="..."; va-radio > va-radio-option; va-checkbox-group > va-checkbox; va-process-list > va-process-list-item; va-select > option; va-table > va-table-row > span; va-alert takes its heading in slot="headline"; va-summary-box needs a child with slot="headline"; va-need-help content goes in slot="content"; va-crisis-line-modal is never customized.
TOKENS available as CSS custom properties in the preview:
--vads-color-primary #005ea2; --vads-color-primary-dark #1a4480; --vads-color-primary-darker #162e51; --vads-color-action #005ea2;
--vads-color-success #2e8540; --vads-color-success-lighter #ecf3ec; --vads-color-warning #ffc107; --vads-color-warning-lighter #faf3d1;
--vads-color-error #d54309; --vads-color-error-lighter #f4e3db; --vads-color-info #00bde3; --vads-color-info-lighter #e7f6f8;
--vads-color-base #3d4551; --vads-color-base-darkest #1b1b1b; --vads-color-gray-medium #757575; --vads-color-gray-light #d6d7d9; --vads-color-gray-lightest #f1f1f1; --vads-color-white #fff; --vads-color-focus #ffbe2e.
Spacing: --vads-space-1 4px, -2 8px, -3 12px, -4 16px, -5 20px, -6 24px, -8 32px, -10 40px, -12 48px.
Fonts: headings var(--font-heading) (Public Sans 700); body var(--font-sans) (Public Sans). Sizes: h1 2.5rem, h2 1.875rem, h3 1.5rem, h4 1.25rem, body 1rem, small .875rem. Line height 1.5 body, 1.3 headings.
LOOK: VA.gov is calm, square and high-contrast. Radius 0 to 4px. Primary button: #005ea2 bg, white 700 text, 4px radius, 10px 20px padding, hover #1a4480. Secondary button: white bg, inset 2px #005ea2 border, #005ea2 text. Cards: white, 1px gray-light border, optional 4px colored top border. Alerts: 6px left border in status color on the matching -lighter background. Focus: 2px solid var(--vads-color-focus) outline, 2px offset.
ACCESSIBILITY: WCAG 2.1 AA. Text contrast 4.5:1, UI 3:1. Every input has a visible label. Visible focus. Keyboard operable. Async results go in role="status". Never convey state with color alone.
CONTENT: Plain language at a 6th to 8th grade level. Address the Veteran as "you". Active voice. Sentence case headings and buttons. Buttons start with a verb. Dates like "January 14, 2027". Phone numbers like 800-827-1000. Never "click here".
VADS ALIGNMENT: Production code uses only VADS web components (va-*), VADS utility classes (vads-u-*) and semantic HTML. No custom classes, no <style> blocks, no inline style attributes, no animation or transitions. If no VADS component covers a need, say so in "custom" and use the closest VADS component in the meantime.`;

const OUTPUT_SPEC = `Reply with ONLY one JSON object, no prose, shaped like:
{"title":"Sentence case name, 6 words max","summary":"One sentence: what it is and what the Veteran can do with it.","components":["va-card","va-button"],
"production":"<va-card>...</va-card>",
"custom":[{"part":"What has no VADS component","why":"Why none of the VADS components fit","closest":"va-..."}],
"a11y":["3 to 5 short notes. Include anything a developer should verify in Storybook."]}
PRODUCTION RULES: Only tags and attributes from the component list, vads-u-* utility classes for spacing and typography, and semantic HTML. Use only the allowed values the list gives. No <style>, no inline style attributes, no custom classes, no animation. The page renders "production" with the real VADS web components, so what you write is exactly what the designer sees. Do not write a separate preview. "custom" is an empty list when VADS covers everything, which is the goal. Use realistic VA content, never lorem ipsum or real personal data.`;

function VADS_PROMPT(){return VADS_KNOWLEDGE.split("\n").filter(l=>/^(RULE|PRODUCTION COMPONENTS|ACCESSIBILITY|CONTENT|VADS ALIGNMENT|VA DESIGN SYSTEM)/.test(l)).join("\n")+"\n\nCOMPONENT LIST (web-components "+VADS_SPEC_VER+", the version the preview runs):\n"+specList()}
/* ---------- render-repo snapshot (va-uswds-render entries, tokens, templates) ---------- */
let SNAP=null;
const SNAPP=fetch("va-render-snapshot.json").then(r=>r.ok?r.json():null).then(j=>{SNAP=j&&Array.isArray(j.entries)?j:null;snapReady()}).catch(()=>null);
function snapKeys(){return SNAP?new Set(SNAP.entries.concat(SNAP.primitives||[]).map(e=>e.key)):null}
function snapReady(){
  const el=document.getElementById("snapstamp");
  if(el&&SNAP){
    const v=SNAP.versions||{},d=(SNAP.generatedAt||"").slice(0,10);
    el.textContent="VA components from va-uswds-render ("+SNAP.entries.length+" entries, web-components "+(v.webComponentsInstalled||"?")+", css-library "+(v.cssLibrary||"?")+"). Snapshot "+d+(v.componentLibraryLatest?"; component-library latest then: "+v.componentLibraryLatest:"")+". Font: "+((SNAP.styling||{}).font||"Public Sans")+".";
    el.hidden=false;
  }
  const t=document.getElementById("tmpl");
  if(t&&SNAP&&(SNAP.templates||[]).length&&t.options.length<2){
    SNAP.templates.forEach(x=>{const o=document.createElement("option");o.value=x.id;o.textContent=x.label;t.append(o)});
    document.getElementById("tmpl-wrap").hidden=false;
  }
}
function renderRepoPrompt(){
  if(!SNAP)return "";
  const line=e=>"- "+e.key+" ("+(e.tagName||"no tag")+")"+(e.slots&&e.slots.length?" [takes children]":"")+": "+e.description+(e.propDescriptions?"\n  props: "+Object.entries(e.propDescriptions).map(([k,v])=>k+" = "+v).join("; "):"")+"\n  example props: "+JSON.stringify(e.example);
  return "RENDER SPEC. Also return a \"spec\" property in the JSON object: a json-render spec of the same component, drawn by the va-uswds-render registry. Shape: {\"root\":\"id\",\"elements\":{\"id\":{\"type\":\"Key\",\"props\":{},\"children\":[\"id\"]}}}.\n"+
  "SPEC RULES: type is exactly one of the keys below, never the tag name. Props are camelCase versions of the attribute names. Text goes in the text prop, never as a string child. children holds element ids only, and every id used must exist in elements. Set root to exactly one element id; when there are several top-level parts, use Section as root. Content for a [takes children] component goes in its children (a Heading then Text, or other VA components). The spec must describe the same components as production. If no key fits, use the closest one and list the gap in custom.\n\n"+
  "VA COMPONENT KEYS (from va-uswds-render, web-components "+((SNAP.versions||{}).webComponentsInstalled||"?")+"):\n"+SNAP.entries.map(line).join("\n")+"\n\nPRIMITIVE KEYS:\n"+(SNAP.primitives||[]).map(line).join("\n")+"\n\nFONT: "+((SNAP.styling||{}).font||"Public Sans")+". Do not set fonts; the library supplies them.";
}
function checkSpec(sp){
  const w=[];
  if(!sp||typeof sp!=="object"||typeof sp.root!=="string"||!sp.elements||typeof sp.elements!=="object")return ["No valid spec came back (needs root and elements)."];
  const keys=snapKeys(),els=sp.elements;
  if(!els[sp.root])w.push("root \""+sp.root+"\" is not in elements.");
  Object.entries(els).forEach(([id,e])=>{
    if(!e||typeof e.type!=="string"){w.push(id+": missing type.");return}
    if(keys&&!keys.has(e.type))w.push(id+": \""+e.type+"\" is not a known key.");
    (Array.isArray(e.children)?e.children:[]).forEach(c=>{if(!els[c])w.push(id+": child \""+c+"\" does not exist.")});
  });
  return w;
}
function buildPrompt(text, base){
  let p = "You are the VADS Component Builder agent. You build VA.gov UI components that stay aligned to the VA Design System, strictly following the VA Design System reference below.\n\n" + VADS_PROMPT() + "\n\n" + OUTPUT_SPEC + "\n\n";
  const rr=renderRepoPrompt();if(rr)p+=rr+"\n\n";
  if(base){
    const slim = {title:base.title,summary:base.summary,components:base.components,preview:base.preview,production:base.production,spec:base.spec||undefined,custom:base.custom||[],a11y:base.a11y};
    p += "CURRENT COMPONENT (JSON):\n" + JSON.stringify(slim) + "\n\nCHANGE REQUEST: " + text + "\nApply the change and return the complete updated component in the same JSON shape.";
  } else {
    const tid=(document.getElementById("tmpl")||{}).value,tp=SNAP&&tid&&(SNAP.templates||[]).find(x=>x.id===tid);
    if(tp)p+="STARTING TEMPLATE (a valid spec from the render repo, built from USWDS primitives. Adapt it to the request and keep production in step with it. Replace USWDS parts with the Va* key when one exists: Alert becomes VaAlert, Button becomes VaButton, Card becomes VaCard, Input becomes VaTextInput. Keep Section, GridContainer, Grid, Heading and Text for layout and text. If a part has no Va* key, keep it and list it in custom):\n"+JSON.stringify(tp.spec)+"\n\n";
    p += "REQUEST: " + text;
  }
  return p;
}

/* ---------- Preview document ---------- */
const BASE_CSS = `:root{--vads-color-primary:#005ea2;--vads-color-primary-dark:#1a4480;--vads-color-primary-darker:#162e51;--vads-color-action:#005ea2;--vads-color-success:#2e8540;--vads-color-success-lighter:#ecf3ec;--vads-color-warning:#ffc107;--vads-color-warning-lighter:#faf3d1;--vads-color-error:#d54309;--vads-color-error-lighter:#f4e3db;--vads-color-info:#00bde3;--vads-color-info-lighter:#e7f6f8;--vads-color-base:#3d4551;--vads-color-base-darkest:#1b1b1b;--vads-color-gray-medium:#757575;--vads-color-gray-light:#d6d7d9;--vads-color-gray-lightest:#f1f1f1;--vads-color-white:#fff;--vads-color-focus:#ffbe2e;--vads-space-1:4px;--vads-space-2:8px;--vads-space-3:12px;--vads-space-4:16px;--vads-space-5:20px;--vads-space-6:24px;--vads-space-8:32px;--vads-space-10:40px;--vads-space-12:48px;--font-serif:Bitter,Georgia,serif;--font-sans:"Public Sans","Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;--font-heading:"Public Sans","Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;color-scheme:light}
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;background:#fff}
body{font-family:var(--font-sans);font-size:16px;line-height:1.5;color:var(--vads-color-base-darkest)}
h1,h2,h3,h4{font-family:var(--font-heading);line-height:1.3;font-weight:700}
.stage{padding:36px 24px;display:flex;justify-content:center;align-items:flex-start}
.stage>*{max-width:100%}`;
const RM_CSS = `*,*::before,*::after{animation-duration:.01ms!important;animation-delay:0ms!important;transition-duration:.01ms!important;transition-delay:0ms!important}`;
const SPEC_CSS = `body{background-color:#fbfcfd;background-image:radial-gradient(rgba(0,94,162,.18) 1px,transparent 1.2px);background-size:12px 12px}
.stage *{outline:1px dashed rgba(0,94,162,.55)!important;outline-offset:-1px}
.__spec{position:absolute;font:500 10px/1 "Roboto Mono",ui-monospace,monospace;color:#005ea2;background:#fff;padding:2px 4px;pointer-events:none;z-index:2147483647;white-space:nowrap;border:1px solid rgba(0,94,162,.3)}`;

function esc(s){return String(s||"").replace(/<\/script/gi,"<\\/script")}
function buildDoc(item,{spec=false,rm=false,thumb=false}={}){
  const p=item.preview||{};
  const meas = thumb ? "" : `<script>(function(){function s(){parent.postMessage({__vads:1,h:Math.ceil(document.body.scrollHeight),empty:!(document.querySelector('.stage')||document.body).innerText.trim()},'*')}
try{new ResizeObserver(s).observe(document.body)}catch(e){}addEventListener('load',s);s();
${spec?`setTimeout(function(){var n=0;document.querySelectorAll('.stage *').forEach(function(e){if(n>=22)return;var r=e.getBoundingClientRect();if(r.width<44||r.height<14)return;if(e.closest('.__spec'))return;n++;var l=document.createElement('span');l.className='__spec';l.textContent=Math.round(r.width)+'\\u00d7'+Math.round(r.height);l.style.left=(r.left+scrollX)+'px';l.style.top=Math.max(0,r.top+scrollY-15)+'px';document.body.appendChild(l)})},1500);`:""}})();<\/script>`;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700&family=Roboto+Mono:wght@500&display=swap">
<style>${BASE_CSS}</style><style>${p.css||""}</style>${rm?`<style>${RM_CSS}</style>`:""}${spec?`<style>${SPEC_CSS}</style>`:""}${thumb?`<style>.stage{zoom:.72;padding:28px 16px}</style>`:""}
</head><body><div class="stage">${p.html||""}</div><script>try{${esc(p.js)}}catch(e){console.error(e)}<\/script>${meas}</body></html>`;
}

/* ---------- State + DOM ---------- */
const $=s=>document.querySelector(s);
const frame=$("#frame");
EXAMPLES.forEach(e=>{e.motion=[];e.production=String(e.production||"").replace(/<style[\s\S]*?<\/style>\s*/gi,"")});
let current=EXAMPLES[0], spec=false, rm=true, mobile=false, codeTab="prod", busy=false, ctl=null;
let sample=null, db=null, user=null, uid=null, shared=[], names={}, pendingDelete=null;

function totalMs(item){let m=0;(item.motion||[]).forEach(r=>{const d=Number(r.duration_ms)||0,dl=Number(r.delay_ms)||0;if(!/hover|click|tap|press|submit|check|request|succeed|select|open|focus/i.test(r.trigger||""))m=Math.max(m,d+dl)});return m}
let realPrev=true,stageTok=0;
function stageNote(t){$("#prev-note").textContent=t}
async function renderStage(){
  const host=$("#live-host"),tok=++stageTok,hasSrc=!!(current.preview&&current.preview.html);
  const useStandIn=()=>{host.hidden=true;frame.hidden=false;frame.style.height="420px";frame.srcdoc=buildDoc(current,{spec,rm:true})};
  if(!realPrev&&hasSrc){useStandIn();stageNote("Stand-in preview: VADS styling recreated with tokens, so it can differ from the real components. Use Real components to see the true look.");return}
  host.hidden=false;frame.hidden=true;host.innerHTML="";
  stageNote("Loading the real VA web components…");
  const ok=await rLoadLive();
  if(tok!==stageTok)return;
  if(!ok){if(hasSrc){useStandIn();stageNote("The real VA components couldn’t be loaded from unpkg.com, so this is the stand-in drawing. Check the connection and press Spec view again to retry.")}else{host.textContent="The real components didn’t load here. The production code is in the tabs below.";stageNote("")}return}
  const el=document.createElement("div");host.append(el);rMountPreview(el,prodHtml(),{spec});
  setTimeout(()=>{if(tok!==stageTok)return;const r=el.getBoundingClientRect();$("#dims").textContent=Math.round(r.width)+" \u00d7 "+Math.round(r.height)},400);
  stageNote("Drawn with the real VA web components (v"+REF_WC_VER+"), the same as the Compose tab."+(spec?" Spec view adds a grid, outlines and sizes on top of them.":" Fonts and spacing can differ slightly from VA.gov."));
}
function renderMeta(){
  $("#c-title").innerHTML="";
  $("#c-title").append(document.createTextNode(current.title||"Untitled component"));
  if(current.example){const s=document.createElement("span");s.className="tag-ex";s.textContent="Example";$("#c-title").append(s)}
  $("#c-sum").textContent=current.summary||"";
  const ul=$("#a11y");ul.innerHTML="";(current.a11y||[]).forEach(n=>{const li=document.createElement("li");li.textContent=n;ul.append(li)});
  const sh=$("#share");
  if(current.example){sh.disabled=true;sh.textContent="Share to community";sh.title="Examples are already in Community";return}
  else if(current.sharedId){sh.disabled=true;sh.textContent="Shared"}
  else{sh.disabled=!db||!uid;sh.textContent="Share to community"}
  sh.title = (!db||!uid)&&!current.example ? "Sharing needs you signed in on claude.ai" : "";
}

/* VADS check: is the production code made of VADS parts only? */
function vadsCheck(item){
  const t=document.createElement("template");t.innerHTML=String(item.production||"");
  const rows=[],tags=new Map();
  t.content.querySelectorAll("*").forEach(el=>{const n=el.localName;if(n.indexOf("-")>-1)tags.set(n,(tags.get(n)||0)+1)});
  const known=n=>!!VADS_SPEC[n];
  tags.forEach((c,n)=>{
    if(n.indexOf("va-")!==0)rows.push({k:"bad",what:"<"+n+">",note:"Not a VADS component. Replace it with a VADS component or record why none fits."});
    else if(!VADS_SPEC[n]){const g=Object.keys(VADS_SPEC).filter(x=>x.indexOf(n.replace(/^va-/,"").split("-")[0])>-1).slice(0,3);rows.push({k:"bad",what:"<"+n+">",note:"No such component in web-components "+VADS_SPEC_VER+"."+(g.length?" Did you mean "+g.map(x=>"<"+x+">").join(", ")+"?":"")})}
    else rows.push({k:"ok",what:"<"+n+">",note:"VADS component"+(c>1?" ("+c+" uses)":"")});
  });
  t.content.querySelectorAll("*").forEach(el=>{
    const n=el.localName,sp=VADS_SPEC[n];if(!sp)return;
    [...el.attributes].forEach(a=>{
      const k=a.name;
      if(k==="class"||k==="id"||k==="slot"||k==="style"||k.indexOf("data-")===0||k.indexOf("aria-")===0||k==="role"||k==="tabindex"||k==="hidden"||k==="lang"||k.indexOf("on")===0)return;
      if(!(k in sp.p)){rows.push({k:"bad",what:"<"+n+" "+k+">",note:"“"+k+"” isn’t a property of "+n+". Real ones: "+(Object.keys(sp.p).filter(x=>!/analytics/.test(x)).join(", ")||"none")+"."});return}
      const en=sp.p[k];
      if(en&&!en.includes(a.value))rows.push({k:"bad",what:"<"+n+" "+k+"=\""+a.value+"\">",note:"Allowed values: "+en.join(", ")+"."});
    });
    el.querySelectorAll(":scope > [slot]").forEach(ch=>{if(sp.s.length&&!sp.s.includes(ch.getAttribute("slot")))rows.push({k:"warn",what:"slot=\""+ch.getAttribute("slot")+"\" in "+n,note:"Known slots: "+sp.s.join(", ")+"."})});
  });
  if(!tags.size)rows.push({k:"info",what:"No va-* components",note:"Production code has no VADS web components. Check whether one covers this."});
  const nst=t.content.querySelectorAll("style").length,ninl=t.content.querySelectorAll("[style]").length;
  const ncls=[...t.content.querySelectorAll("[class]")].filter(e=>[...e.classList].some(c=>c.indexOf("vads-")!==0&&c.indexOf("usa-")!==0)).length;
  if(nst)rows.push({k:"bad",what:nst+" <style> block"+(nst===1?"":"s"),note:"Custom CSS is not VADS. Use components and vads-u-* utility classes instead."});
  if(ninl)rows.push({k:"bad",what:ninl+" inline style"+(ninl===1?"":"s"),note:"The Prototype Kit lints against inline styles."});
  if(ncls)rows.push({k:"warn",what:ncls+" element"+(ncls===1?"":"s")+" with custom classes",note:"Use VADS utility classes (vads-u-*) so the page matches the system."});
  (item.custom||[]).forEach(c=>rows.push({k:"warn",what:"Custom: "+(c.part||"unnamed"),note:(c.why||"No reason given")+(c.closest?" Closest VADS match: "+c.closest+".":"")}));
  return rows;
}
function vadsCheckView(item){
  const rows=vadsCheck(item),bad=rows.filter(r=>r.k==="bad"||r.k==="warn").length;
  const w=document.createElement("div");
  const p=document.createElement("p");p.className="fhint";p.style.margin="0 0 10px";
  p.textContent=bad?bad+" thing"+(bad===1?"":"s")+" to fix before this counts as VADS-aligned.":"Everything in the production code is a VADS component.";
  const ul=document.createElement("ul");ul.className="notes";ul.style.cssText="background:var(--section);border-radius:12px";
  rows.forEach(r=>{const li=document.createElement("li");const b=document.createElement("b");b.textContent=({ok:"OK",info:"Check",warn:"Review",bad:"Fix"})[r.k]+": "+r.what;li.append(b,document.createTextNode(". "+r.note));ul.append(li)});
  w.append(p,ul);return w;
}
function renderCode(){
  const body=$("#code-body");body.innerHTML="";
  document.querySelectorAll(".code-tabs [role=tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.tab===codeTab)));
  $("#ct-spec").hidden=!current.spec&&!SNAP;
  const hasSrc=!!(current.preview&&current.preview.html);$("#ct-src").hidden=!hasSrc;if(!hasSrc&&codeTab==="src")codeTab="prod";
  document.querySelectorAll(".code-tabs [role=tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.tab===codeTab)));
  $("#copy").hidden = codeTab==="check";
  if(codeTab==="prod"){
    const cl=document.createElement("div");cl.className="comp-list";cl.style.marginBottom="10px";
    (current.components||[]).forEach(c=>{const s=document.createElement("span");s.className="comp";s.textContent=c;cl.append(s)});
    const pre=document.createElement("pre");pre.textContent=current.production||"";
    body.append(cl,pre);
  }else if(codeTab==="spec"){
    const pre=document.createElement("pre");
    pre.textContent=current.spec?JSON.stringify(current.spec,null,2):"No spec for this component yet. Generate or refine it, and the render spec will appear here. Examples built into the page do not have one.";
    body.append(pre);
    const ws=current.spec?(current.specWarnings&&current.specWarnings.length?current.specWarnings:checkSpec(current.spec)):[];
    const note=document.createElement("p");note.className="rnote"+(ws.length?" warn":"");
    note.textContent=current.spec?(ws.length?"Check before using this spec: "+ws.join(" "):"Every type in this spec is a key in the snapshot."):"";
    if(note.textContent)body.append(note);
  }else if(codeTab==="src"){
    const p=current.preview||{};const pre=document.createElement("pre");
    pre.textContent="<!-- HTML -->\n"+(p.html||"")+"\n\n/* CSS */\n"+(p.css||"")+(p.js?"\n\n// JS\n"+p.js:"");
    body.append(pre);
  }else{
    body.append(vadsCheckView(current));
  }
}
/* ---------- Variations: the component's own options, drawn live ----------
   Controls come from VADS_SPEC (the real prop list and allowed values). Changing one edits a working copy of the
   production markup and redraws the real components. "Apply to my code" writes the working copy back. */
const VAR_BOOLS=new Set(["secondary","big","small","disabled","full-width","slim","closeable","bordered","open","open-single","required","tile","striped","stacked","sortable","scrollable","inline","back","continue","primary-alternate","loading","iconless","active","checked","indeterminate","show-shadow","disable-border","use-forms-pattern","header-sr-only","label-sr-only","month-optional","month-year-only"]);
let PV={base:null,html:null,tpl:null,ref:null,changed:false};
const prodHtml=()=>PV.base===current.production&&PV.html!=null?PV.html:String(current.production||"");
function pvSerialize(){
  let h=PV.tpl.innerHTML;
  VAR_BOOLS.forEach(b=>{h=h.replace(new RegExp("(\\s"+b+")=\"\"","g"),"$1")});
  return h;
}
function vEl(tag,attrs,...kids){const e=document.createElement(tag);Object.keys(attrs||{}).forEach(k=>{if(k==="text")e.textContent=attrs[k];else e.setAttribute(k,attrs[k])});kids.forEach(k=>k&&e.append(k));return e}
function renderVariants(){
  const host=$("#variants");if(!host)return;
  if(PV.base!==current.production)PV={base:current.production,html:null,tpl:null,ref:null,changed:false};
  host.innerHTML="";
  const t=document.createElement("template");t.innerHTML=String(current.production||"");
  PV.tpl=t;
  const els=[...t.content.querySelectorAll("*")].filter(e=>VADS_SPEC[e.localName]).slice(0,8);
  const groups=[];
  els.forEach((el,i)=>{
    const props=VADS_SPEC[el.localName].p,ctl=[];
    Object.keys(props).forEach(pn=>{
      const vals=props[pn];
      if(Array.isArray(vals)&&vals.length<=8){
        const id="pv-"+i+"-"+pn,sel=vEl("select",{id});
        sel.append(vEl("option",{value:"",text:"Not set"}));
        vals.forEach(v=>sel.append(vEl("option",{value:v,text:v})));
        sel.value=el.getAttribute(pn)||"";
        sel.onchange=()=>{if(sel.value)el.setAttribute(pn,sel.value);else el.removeAttribute(pn);pvChange()};
        ctl.push(vEl("div",{class:"pv-f"},vEl("label",{for:id,text:pn}),sel));
      }else if(VAR_BOOLS.has(pn)){
        const id="pv-"+i+"-"+pn,cb=vEl("input",{type:"checkbox",id});
        cb.checked=el.hasAttribute(pn);
        cb.onchange=()=>{if(cb.checked)el.setAttribute(pn,"");else el.removeAttribute(pn);pvChange()};
        ctl.push(vEl("div",{class:"pv-f pv-c"},cb,vEl("label",{for:id,text:pn})));
      }
    });
    if(!ctl.length)return;
    const name=el.getAttribute("text")||el.getAttribute("label")||el.getAttribute("header")||el.getAttribute("heading-text")||"";
    groups.push(vEl("fieldset",{class:"pv-g"},vEl("legend",{},vEl("code",{text:el.localName}),name?document.createTextNode(" "+name.slice(0,40)):null),...ctl.slice(0,8)));
  });
  const comp=els.map(e=>REF_COMPS.find(c=>c.tag===e.localName)).find(c=>c&&c.stories.length>1);
  const chips=comp?comp.stories.map(st=>{
    const b=vEl("button",{type:"button",class:"tool pv-chip","aria-pressed":String(PV.ref===st.n),text:st.n});
    b.onclick=()=>{PV.ref=PV.ref===st.n?null:st.n;PV.html=PV.ref?st.h:(PV.changed?pvSerialize():null);renderStage();renderVariants()};
    return b}):[];
  if(!groups.length&&!chips.length){host.hidden=true;return}
  host.hidden=false;
  const head=vEl("div",{class:"pv-h"},vEl("h3",{text:"Variations"}),vEl("p",{class:"rnote",style:"padding:0",text:PV.ref?"Showing the reference state “"+PV.ref+"”. Reset to go back to your code.":"Change an option to see the real component redraw. Apply writes it to your production code."}));
  const apply=vEl("button",{type:"button",class:"btn small",text:"Apply to my code"});
  apply.disabled=!PV.changed||!!PV.ref;
  apply.onclick=()=>{current.production=pvSerialize();PV={base:current.production,html:null,tpl:null,ref:null,changed:false};renderCode();renderStage();renderVariants();stageNote("Applied. The production code now includes your options.")};
  const reset=vEl("button",{type:"button",class:"tool",text:"Reset"});
  reset.disabled=!PV.changed&&!PV.ref;
  reset.onclick=()=>{PV={base:current.production,html:null,tpl:null,ref:null,changed:false};renderStage();renderVariants()};
  host.append(head);
  if(groups.length)host.append(vEl("div",{class:"pv-gs"},...groups));
  if(chips.length)host.append(vEl("div",{class:"pv-ref",role:"group","aria-label":"Reference states for "+comp.name},vEl("span",{class:"rnote",style:"padding:0",text:comp.name+" reference states"}),...chips));
  host.append(vEl("div",{class:"rlinks"},apply,reset));
}
function pvChange(){PV.changed=true;PV.ref=null;PV.html=pvSerialize();renderStage();const a=document.querySelector("#variants .btn"),r=document.querySelector("#variants .rlinks .tool");if(a)a.disabled=false;if(r)r.disabled=false;document.querySelectorAll("#variants .pv-chip").forEach(b=>b.setAttribute("aria-pressed","false"))}
function renderAll(){renderMeta();renderStage();renderVariants();renderCode();$("#refine-go").disabled=!sample||busy}

window.addEventListener("message",e=>{
  if(e.source!==frame.contentWindow||!e.data||!e.data.__vads)return;
  const h=Math.min(Math.max(e.data.h,200),1400);frame.style.height=h+"px";
  if(e.data.empty&&!current.example&&!busy)status("The preview came back empty"+(/<va-/i.test((current.preview||{}).html||"")?" because it used va-* tags, which can’t load here":"")+". Open Preview source to see what Claude returned, then try Refine: “Rebuild the preview with plain HTML and CSS”.",{err:true});
  $("#dims").textContent=Math.round(frame.clientWidth)+" \u00d7 "+h;
});

function status(msg,{err=false,live=false}={}){const s=$("#status");s.className="status"+(err?" err":"");s.innerHTML="";if(live){const d=document.createElement("span");d.className="spin";d.setAttribute("aria-hidden","true");s.append(d)}s.append(document.createTextNode(msg))}
function toast(m){const t=$("#toast");t.textContent=m;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>t.hidden=true,2600)}

/* Controls */
$("#t-spec").onclick=e=>{spec=!spec;e.currentTarget.setAttribute("aria-pressed",spec);renderStage()};
const tReal=$("#t-real");if(tReal)tReal.onclick=e=>{realPrev=!realPrev;e.currentTarget.setAttribute("aria-pressed",String(realPrev));renderStage()};
$("#t-mobile").onclick=e=>{mobile=!mobile;e.currentTarget.setAttribute("aria-pressed",mobile);$("#frame-wrap").classList.toggle("mobile",mobile);setTimeout(renderStage,320)};
document.querySelectorAll(".code-tabs [role=tab]").forEach(b=>b.onclick=()=>{codeTab=b.dataset.tab;renderCode()});
$("#copy").onclick=async()=>{
  const txt=$("#code-body pre")?.textContent||"";
  try{await navigator.clipboard.writeText(txt);toast("Copied")}
  catch(e){const r=document.createRange();const pre=$("#code-body pre");if(pre){r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);toast("Selected. Press Ctrl+C or Cmd+C to copy.")}}
};
document.querySelectorAll(".chip").forEach(c=>c.onclick=()=>{$("#prompt").value=c.dataset.p;$("#prompt").focus()});

const HEAD={build:["Components","Describe a VA.gov component and the agent builds it from VADS rules. Change it until it is right, then save it to the study. Compose picks it up from there."],
  forms:["Forms","Describe a VA.gov form. The agent lays it out as chapters and pages using the VA forms library patterns. Edit any page by hand, then save the form to the study. Each page becomes a block in Compose."],
  proto:["Prototype","Turn what you built into a bundle for the VA Prototype Kit, and a review page for engineering."],
  ref:["Reference","Popular VADS components, where each one is used across VA.gov products, how it looks in other states, and what to know about accessibility."],
  rec:["Records","A record for every component choice, with its reason and status. Anything the design system does not cover becomes an unmet need."],
  comm:["Component Builder","Describe a VA.gov component. The agent builds it from VA Design System components only and checks the result against VADS."]};
function setTab(which){
  ["build","forms","proto","ref","rec","comm"].forEach(t=>{$("#tab-"+t).setAttribute("aria-selected",String(t===which));$("#view-"+t).hidden=t!==which});
  $("#h-title").textContent=HEAD[which][0];$("#h-sub").textContent=HEAD[which][1];
  if(which==="comm")renderCommunity();
  if(which==="forms")renderForms();
  if(which==="proto")ptRender();
  if(which==="ref")renderRef();
  if(which==="rec")rcRender();
  try{localStorage.setItem("vads-tab",which)}catch(e){}
}
$("#tab-build").onclick=()=>setTab("build");
$("#tab-forms").onclick=()=>setTab("forms");
$("#tab-ref").onclick=()=>setTab("ref");
$("#tab-comm").onclick=()=>setTab("comm");

/* ---------- Generation ---------- */
const ERR={not_granted:"You don't have access to generating here.",sampling_disabled:"Claude isn't available for this account.",rate_limited:"Too many requests right now. Wait a minute, then try again.",session_expired:"Your session ended. Reload the page and try again.",refused:"Claude couldn't build that request. Try describing it differently.",invalid_json:"The answer came back in the wrong shape. Try again, or ask for something smaller.",empty_completion:"Nothing came back. Try a shorter request.",prompt_too_large:"That's too much to send at once. Ask for something smaller."};
function setBusy(b){busy=b;$("#gen").disabled=b||!sample;$("#refine-go").disabled=b||!sample;$("#stop").hidden=!b;$("#veil").hidden=!b}
function normalize(o,promptText){
  if(!o||typeof o!=="object"||typeof o.production!=="string"||!o.production.trim())throw{code:"invalid_json"};
  o.preview=o.preview&&typeof o.preview.html==="string"?o.preview:{html:"",css:"",js:""};
  return {title:String(o.title||"Untitled component"),summary:String(o.summary||""),prompt:promptText,
    components:Array.isArray(o.components)?o.components.map(String).slice(0,16):[],
    preview:{html:o.preview.html,css:String(o.preview.css||""),js:String(o.preview.js||"")},
    production:String(o.production||""),spec:o.spec&&typeof o.spec==="object"?o.spec:null,specWarnings:SNAP?checkSpec(o.spec):[],motion:[],custom:Array.isArray(o.custom)?o.custom.slice(0,8):[],a11y:Array.isArray(o.a11y)?o.a11y.map(String).slice(0,6):[]};
}
async function run(text,base){
  if(!sample||busy||!text.trim())return;
  ctl=new AbortController();setBusy(true);
  status("Thinking. This usually takes 30 to 60 seconds.",{live:true});
  try{
    await SNAPP;
    const out=await sample.json(buildPrompt(text.trim(),base),{signal:ctl.signal,cache:false,
      onText:({text:t})=>status("Writing component\u2026 "+(t.length/1000).toFixed(1)+"k characters",{live:true})});
    current=normalize(out,base?(base.prompt+" \u2192 "+text.trim()):text.trim());
    codeTab="prod";renderAll();
    status(base?"Updated. Keep refining, or save it to the study.":"Done. Check the VADS check tab, refine it, or save it to the study.");
  }catch(e){
    const c=e&&e.code;
    if(c==="cancelled")status("Stopped.");
    else{status(ERR[c]||"Something went wrong reaching Claude. Try again.",{err:true});if(c==="not_granted"||c==="sampling_disabled"){sample=null}}
  }finally{setBusy(false)}
}
$("#gen").onclick=()=>run($("#prompt").value);
$("#prompt").addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey))run($("#prompt").value)});
$("#stop").onclick=()=>ctl&&ctl.abort();
$("#refine-go").onclick=()=>{const v=$("#refine").value;if(v.trim()){run(v,current);$("#refine").value=""}};
$("#refine").addEventListener("keydown",e=>{if(e.key==="Enter")$("#refine-go").click()});

/* ---------- Community ---------- */
function stripForShare(it){return{id:"s"+Date.now().toString(36)+Math.random().toString(36).slice(2,7),title:it.title,summary:it.summary,prompt:String(it.prompt||"").slice(0,600),components:it.components,preview:it.preview,production:it.production,spec:it.spec||null,motion:it.motion,a11y:it.a11y,createdAt:Date.now()}}
$("#share").onclick=async()=>{
  if(!db||!uid||current.example||current.sharedId)return;
  const sh=$("#share");sh.disabled=true;sh.textContent="Sharing\u2026";
  try{
    const ref=db.doc("gallery/"+uid);const snap=await ref.get();
    const items=snap.exists&&Array.isArray(snap.data().items)?snap.data().items.slice():[];
    if(items.length>=20){toast("You've shared 20 components. Delete one in Community to share another.");renderMeta();return}
    const rec=stripForShare(current);items.unshift(rec);
    if(JSON.stringify({items}).length>240000){toast("Your shared components are too large to save. Delete one first.");renderMeta();return}
    await ref.set({items});current.sharedId=rec.id;renderMeta();toast("Shared to Community");
  }catch(e){toast("Couldn't share. You may need Contributor access to this page.");renderMeta()}
};
function card(it,{owner=null,mine=false,example=false}={}){
  const c=document.createElement("article");c.className="card";
  const th=document.createElement("div");th.className="thumb";
  const f=document.createElement("iframe");f.setAttribute("sandbox","allow-scripts");f.setAttribute("tabindex","-1");f.setAttribute("aria-hidden","true");f.loading="lazy";f.title="";f.srcdoc=buildDoc(it,{thumb:true});th.append(f);
  const b=document.createElement("div");b.className="card-body";
  const h=document.createElement("h3");h.textContent=it.title||"Untitled";
  if(example){const s=document.createElement("span");s.className="tag-ex";s.textContent="Example";h.append(s)}
  const m=document.createElement("p");m.className="meta";
  m.textContent=example?"Built by hand as a reference":((owner&&(names[owner]||"A teammate"))+(it.createdAt?" \u00b7 "+new Date(it.createdAt).toLocaleDateString(undefined,{month:"short",day:"numeric"}):""));
  const s=document.createElement("p");s.className="meta";s.style.color="var(--ink)";s.textContent=it.summary||"";
  const cl=document.createElement("div");cl.className="comp-list";(it.components||[]).slice(0,5).forEach(x=>{const t=document.createElement("span");t.className="comp";t.textContent=x;cl.append(t)});
  const r=document.createElement("div");r.className="row";
  const open=document.createElement("button");open.className="btn small";open.textContent="Open in builder";
  open.onclick=()=>{current=JSON.parse(JSON.stringify(it));if(example)current.example=true;else current.sharedId=it.id;codeTab="prod";setTab("build");renderAll();$("#prompt").value=example?"":(it.prompt||"");window.scrollTo({top:0,behavior:"smooth"})};
  r.append(open);
  if(mine){const d=document.createElement("button");d.className="btn ghost small";d.textContent=pendingDelete===it.id?"Confirm delete":"Delete";
    d.onclick=async()=>{if(pendingDelete!==it.id){pendingDelete=it.id;renderCommunity();return}
      pendingDelete=null;try{const ref=db.doc("gallery/"+uid);const snap=await ref.get();const items=(snap.exists&&snap.data().items||[]).filter(x=>x.id!==it.id);await ref.set({items});toast("Deleted")}catch(e){toast("Couldn't delete. Try again.")}};
    r.append(d)}
  b.append(h,m,s,cl,r);c.append(th,b);return c;
}
async function resolveNames(){
  if(!user)return;const ids=[...new Set(shared.map(x=>x.owner))].filter(id=>!(id in names));if(!ids.length)return;
  try{const ps=await user.profiles(ids);ids.forEach(id=>names[id]=(ps&&ps[id]&&ps[id].name)||"A teammate");if(!$("#view-comm").hidden)renderCommunity()}catch(e){}
}
function renderCommunity(){
  $("#comm-count").textContent=String(shared.length+EXAMPLES.length);
  const g=$("#shared-grid");g.innerHTML="";
  if(!db){const e=document.createElement("div");e.className="empty";e.textContent="Shared components appear here when this page is opened in Claude while signed in.";g.append(e)}
  else if(!shared.length){const e=document.createElement("div");e.className="empty";e.textContent="Nothing shared yet. Generate a component, then choose Share to community.";g.append(e)}
  else shared.forEach(x=>g.append(card(x.item,{owner:x.owner,mine:x.owner===uid})));
  const eg=$("#ex-grid");if(!eg.childElementCount)EXAMPLES.forEach(x=>eg.append(card(x,{example:true})));
}


/* =====================================================================
   FORM BUILDER
   Model: form > chapters > pages > components. Chapter types and field
   types map to the VA.gov forms library (form engine + web-component
   patterns), so the exports are a real starting point for developers.
   ===================================================================== */
const CTYPES = {
  text:{label:"Short text",engine:"digital_form_text_input"},
  textarea:{label:"Long text",engine:"digital_form_text_area"},
  radio:{label:"Single choice",opts:1,engine:"digital_form_radio_button"},
  checkbox:{label:"Multiple choice",opts:1,engine:"digital_form_checkbox"},
  select:{label:"Dropdown",opts:1},
  yesno:{label:"Yes or no"},
  date:{label:"Date",engine:"digital_form_date_component"},
  monthyear:{label:"Month and year",engine:"digital_form_date_component"},
  number:{label:"Number"},
  currency:{label:"Dollar amount"},
  ssn:{label:"Social Security number"},
  email:{label:"Email address"},
  phone:{label:"Phone number"},
  file:{label:"File upload"},
  fullname:{label:"Full name"}
};
const CHTYPES = {
  personal:{label:"Personal information",engine:"digital_form_your_personal_info"},
  address:{label:"Address",engine:"digital_form_address"},
  phone_email:{label:"Phone and email",engine:"digital_form_phone_and_email"},
  custom:{label:"Custom step",engine:"digital_form_custom_step"},
  list_loop:{label:"List and loop",engine:"digital_form_list_loop"}
};

let FID = 0;
const nid = p => p + (++FID).toString(36) + Math.random().toString(36).slice(2,4);

function mkComp(type,label){
  return {id:nid("q"),type,label:label||CTYPES[type].label,hint:"",required:false,
    options:CTYPES[type].opts?[{label:"Option 1",description:""},{label:"Option 2",description:""}]:[]};
}
function mkPage(title){return {id:nid("p"),title:title||"New page",body:"",showIf:null,components:[]}}
function mkChapter(type){
  switch(type){
    case"personal":return {type,title:"Your personal information",includeDob:true,includeServiceNumber:false};
    case"address":return {type,title:"Mailing address",pageTitle:"Mailing address",militaryCheckbox:true};
    case"phone_email":return {type,title:"Contact information",pageTitle:"Phone and email address",includeEmail:true};
    case"list_loop":return {type,title:"New list",nounSingular:"item",nounPlural:"items",itemNameLabel:"Name of item",maxItems:4,optional:true,sectionIntro:"",pages:[mkPage("Item details")]};
    default:return {type:"custom",title:"New section",pages:[mkPage("New page")]};
  }
}

/* Shared with the preview iframe: no outside references allowed. */
function flatten(m){
  var S=[{id:"intro",kind:"intro",title:m.title}];
  m.chapters.forEach(function(c,i){
    function push(id,title,x){var o={id:id,kind:"page",ch:i,title:title};if(x)for(var k in x)o[k]=x[k];S.push(o)}
    if(c.type==="personal"){push("c"+i+"-name","Your name",{fixed:"name"});push("c"+i+"-id","Identification information",{fixed:"id"})}
    else if(c.type==="address")push("c"+i+"-addr",c.pageTitle||c.title,{fixed:"addr"});
    else if(c.type==="phone_email")push("c"+i+"-phone",c.pageTitle||c.title,{fixed:"phone"});
    else{
      if(c.type==="list_loop"){
        if(!c.optional)push("c"+i+"-intro",c.title,{fixed:"loopintro"});
        push("c"+i+"-sum",c.optional?c.title:"Review your "+c.nounPlural,{fixed:"sum"});
        push("c"+i+"-nm",c.itemNameLabel,{fixed:"nm"});
      }
      c.pages.forEach(function(p,j){push("c"+i+"p"+j,p.title,{pg:j,showIf:p.showIf})});
    }
  });
  S.push({id:"review",kind:"review",title:"Review your information"},{id:"sot",kind:"sot",title:"Statement of truth"},{id:"done",kind:"confirm",title:"Confirmation"});
  return S;
}
function compsFor(s,M){
  var c=M.chapters[s.ch];
  if(!s.fixed)return c.pages[s.pg].components;
  var K="c"+s.ch+"_";
  function t(k,l,r,x){var o={id:K+k,type:"text",label:l,hint:"",required:!!r,options:[]};if(x)for(var q in x)o[q]=x[q];return o}
  function os(a){return a.map(function(x){return {label:x,description:""}})}
  if(s.fixed==="name"){
    var a=[t("first","First name",1),t("middle","Middle name"),t("last","Last name",1),t("suffix","Suffix",0,{type:"select",options:os(["Jr.","Sr.","II","III","IV"])})];
    if(c.includeDob)a.push(t("dob","Date of birth",1,{type:"date"}));
    return a;
  }
  if(s.fixed==="id"){
    var b=[t("ssn","Social Security number",1,{type:"ssn"}),t("vafn","VA file number",0,{hint:"Enter your file number if you have one."})];
    if(c.includeServiceNumber)b.push(t("svc","Service number"));
    return b;
  }
  if(s.fixed==="addr"){
    var st="AL,AK,AZ,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY".split(",");
    var d=[t("country","Country",1,{type:"select",options:os(["United States"])})];
    if(c.militaryCheckbox)d.push(t("mil","",0,{type:"checkbox",options:os(["I live on a United States military base outside of the United States."])}));
    d.push(t("street","Street address",1),t("street2","Street address line 2"),t("city","City",1),t("state","State",1,{type:"select",options:os(st)}),t("zip","ZIP code",1));
    return d;
  }
  if(s.fixed==="phone"){
    var e=[t("home","Home phone number",1,{type:"phone"}),t("mobile","Mobile phone number",0,{type:"phone"})];
    if(c.includeEmail)e.push(t("email","Email address",1,{type:"email"}));
    return e;
  }
  if(s.fixed==="nm")return [t("name",c.itemNameLabel||"Name",1)];
  if(s.fixed==="sum")return [t("has","Do you have any "+c.nounPlural+" to add?",1,{type:"yesno",hint:c.optional?"":"Add at least one "+c.nounSingular+"."})];
  return [];
}

/* ---------- Preview runtime (runs inside the sandboxed iframe) ---------- */
function previewRuntime(root,D,emit){
  var M=D.m,ans=D.ans||{},steps=flatten(M),cur=D.step,first=true;
  if(!steps.some(function(s){return s.id===cur}))cur="intro";
  function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
  function post(o){emit(o)}
  function arr(v){return Array.isArray(v)?v:[]}
  function fld(c){
    var k=c.id,v=ans[k],id="f_"+k,rq=c.required?' <span class="req">(*Required)</span>':'';
    var hint=c.hint?'<span class="hint" id="'+id+'_h">'+esc(c.hint)+'</span>':'';
    var dsc=c.hint?' aria-describedby="'+id+'_h"':'';
    function lab(){return '<label class="lab" for="'+id+'">'+esc(c.label)+rq+'</label>'+hint}
    function leg(){return c.label?'<legend class="lab">'+esc(c.label)+rq+'</legend>'+hint:''}
    function one(extra,type,pre){return '<div class="fld" data-t="'+c.type+'">'+lab()+'<div class="row">'+(pre||'')+'<input id="'+id+'" data-k="'+k+'" type="'+(type||"text")+'"'+extra+dsc+' value="'+esc(v||"")+'"></div></div>'}
    function mon(sel,i){var ms=["January","February","March","April","May","June","July","August","September","October","November","December"];return '<label class="sub">Month<select data-k="'+k+'" data-i="'+i+'"><option value=""></option>'+ms.map(function(m){return '<option'+(sel===m?' selected':'')+'>'+m+'</option>'}).join("")+'</select></label>'}
    function num(l,i,w){var a=arr(v);return '<label class="sub '+w+'">'+l+'<input inputmode="numeric" data-k="'+k+'" data-i="'+i+'" value="'+esc(a[i]||"")+'"></label>'}
    switch(c.type){
      case"textarea":return '<div class="fld" data-t="textarea">'+lab()+'<textarea id="'+id+'" data-k="'+k+'" rows="4"'+dsc+'>'+esc(v||"")+'</textarea></div>';
      case"email":return one(' autocomplete="email"','email');
      case"phone":return one(' inputmode="tel" autocomplete="tel"','tel');
      case"number":return one(' inputmode="decimal"');
      case"currency":return one(' inputmode="decimal"','text','<span class="pre">$</span>');
      case"ssn":return one(' inputmode="numeric" autocomplete="off"');
      case"file":return '<div class="fld" data-t="file">'+lab()+'<div class="drop"><input id="'+id+'" type="file"'+dsc+'></div><span class="hint">PDF, JPG, or PNG. Up to 10 MB. (Preview only: nothing uploads.)</span></div>';
      case"select":return '<div class="fld" data-t="select">'+lab()+'<select id="'+id+'" data-k="'+k+'"'+dsc+'><option value="">- Select -</option>'+c.options.map(function(o){return '<option'+(v===o.label?' selected':'')+'>'+esc(o.label)+'</option>'}).join("")+'</select></div>';
      case"date":{var a=arr(v);return '<fieldset class="fld" data-t="date">'+leg()+'<div class="row3">'+mon(a[0],0)+num("Day",1,"w2")+num("Year",2,"w4")+'</div></fieldset>'}
      case"monthyear":{var b=arr(v);return '<fieldset class="fld" data-t="monthyear">'+leg()+'<div class="row3">'+mon(b[0],0)+num("Year",1,"w4")+'</div></fieldset>'}
      case"fullname":{var n=arr(v);function tx(l,i){return '<label class="sub">'+l+'<input data-k="'+k+'" data-i="'+i+'" value="'+esc(n[i]||"")+'"></label>'}return '<fieldset class="fld" data-t="fullname">'+leg()+tx("First name",0)+tx("Middle name",1)+tx("Last name",2)+tx("Suffix",3)+'</fieldset>'}
      case"checkbox":{var cs=arr(v);var tile=c.options.some(function(o){return o.description});
        return '<fieldset class="fld" data-t="checkbox">'+leg()+c.options.map(function(o,i){return '<label class="opt'+(tile?' tile':'')+'"><input type="checkbox" data-k="'+k+'" value="'+esc(o.label)+'"'+(cs.indexOf(o.label)>-1?' checked':'')+'><span>'+esc(o.label)+(o.description?'<span class="odesc">'+esc(o.description)+'</span>':'')+'</span></label>'}).join("")+'</fieldset>'}
      case"radio":case"yesno":{var os=c.type==="yesno"?[{label:"Yes"},{label:"No"}]:c.options;var tl=os.some(function(o){return o.description});
        return '<fieldset class="fld" data-t="'+c.type+'">'+leg()+os.map(function(o){return '<label class="opt'+(tl?' tile':'')+'"><input type="radio" name="'+id+'" data-k="'+k+'" value="'+esc(o.label)+'"'+(v===o.label?' checked':'')+'><span>'+esc(o.label)+(o.description?'<span class="odesc">'+esc(o.description)+'</span>':'')+'</span></label>'}).join("")+'</fieldset>'}
      default:return one('')
    }
  }
  function show(c){
    var v=ans[c.id];
    if(Array.isArray(v)){
      var f=v.filter(Boolean);if(!f.length)return "";
      if(c.type==="checkbox")return f.join(", ");
      if(c.type==="date"||c.type==="monthyear")return f.join(" ");
      return f.join(" ");
    }
    return v||"";
  }
  function visible(s){
    if(!s.showIf||!s.showIf.component)return true;
    var a=ans[s.showIf.component];
    return Array.isArray(a)?a.indexOf(s.showIf.value)>-1:a===s.showIf.value;
  }
  function findComp(id){
    for(var i=0;i<M.chapters.length;i++){var c=M.chapters[i];if(!c.pages)continue;for(var j=0;j<c.pages.length;j++)for(var q=0;q<c.pages[j].components.length;q++)if(c.pages[j].components[q].id===id)return c.pages[j].components[q]}
    return null;
  }
  function idx(id){for(var i=0;i<steps.length;i++)if(steps[i].id===id)return i;return 0}
  function move(d){
    var i=idx(cur);
    do{i+=d}while(i>0&&i<steps.length-1&&steps[i].kind==="page"&&!visible(steps[i]));
    go(steps[Math.max(0,Math.min(steps.length-1,i))].id);
  }
  function go(id){cur=id;render();post({go:id})}
  function prog(ch){
    var n=M.chapters.length,seg="";
    for(var i=0;i<n;i++)seg+='<span class="seg'+(i<=ch?' on':'')+'"></span>';
    return '<div class="prog" role="img" aria-label="Step '+(ch+1)+' of '+n+': '+esc(M.chapters[ch].title)+'"><div class="segs">'+seg+'</div><p class="stepn"><strong>Step '+(ch+1)+' of '+n+':</strong> '+esc(M.chapters[ch].title)+'</p></div>';
  }
  function buttons(back,nextLabel){
    return '<div class="btns"><button type="button" class="btn sec" data-go="prev">Back</button><button type="button" class="btn pri" data-go="'+(back||"next")+'">'+esc(nextLabel||"Continue")+'</button></div>';
  }
  function render(){
    var s=steps[idx(cur)],h="";
    var sub=(M.formName?esc(M.formName)+' ':'')+'(VA Form '+esc(M.formId||"XX-XXXX")+')';
    if(s.kind==="intro"){
      h='<h1 tabindex="-1" class="h">'+esc(M.title)+'</h1><p class="subt">'+sub+'</p>'
       +(M.intro?'<p class="lead">'+esc(M.intro)+'</p>':'')
       +(M.whatToKnow&&M.whatToKnow.length?'<h2 class="h2">What to know before you fill out this form</h2><ul>'+M.whatToKnow.map(function(b){return '<li>'+esc(b)+'</li>'}).join("")+'</ul>':'')
       +'<button type="button" class="btn pri start" data-go="next">Start the form</button>'
       +'<p class="muted">Respondent burden and OMB number are added when the form is registered.</p>';
    }else if(s.kind==="page"){
      var c=M.chapters[s.ch],comps=compsFor(s,M);
      var body=s.fixed==="loopintro"?c.sectionIntro:(s.fixed?"":c.pages[s.pg].body);
      var dn="";
      if(s.showIf&&s.showIf.component){var fc=findComp(s.showIf.component);dn='<p class="devnote">Builder note: shown only when &ldquo;'+esc(fc?fc.label:"a removed field")+'&rdquo; is &ldquo;'+esc(s.showIf.value)+'&rdquo;.</p>'}
      h=prog(s.ch)+dn+'<h2 tabindex="-1" class="h">'+esc(s.title)+'</h2>'+(body?'<p class="body">'+esc(body)+'</p>':'')
       +(comps.length?comps.map(fld).join(""):(s.fixed==="loopintro"?"":'<p class="muted">This page has no fields yet. Add one in the editor.</p>'))
       +buttons();
    }else if(s.kind==="review"){
      h='<h2 tabindex="-1" class="h">Review your information</h2><p class="body">Check your answers. Select Edit to change anything.</p>';
      M.chapters.forEach(function(c,ci){
        var rows="",firstId=null;
        steps.forEach(function(st){
          if(st.kind!=="page"||st.ch!==ci||!visible(st))return;
          if(!firstId)firstId=st.id;
          compsFor(st,M).forEach(function(q){
            var val=show(q),lb=q.label||(q.options&&q.options[0]&&q.options[0].label)||"Selection";
            rows+='<div class="rv"><dt>'+esc(lb)+'</dt><dd>'+(val?esc(val):'<span class="muted">Not provided</span>')+'</dd></div>';
          });
        });
        h+='<section class="rvs"><div class="rvh"><h3>'+esc(c.title)+'</h3>'+(firstId?'<button type="button" class="lnk" data-go="'+firstId+'">Edit<span class="vh"> '+esc(c.title)+'</span></button>':'')+'</div><dl>'+rows+'</dl></section>';
      });
      h+=buttons("next","Continue to submission");
    }else if(s.kind==="sot"){
      h='<h2 tabindex="-1" class="h">Statement of truth</h2><p class="body">I confirm that the identifying information in this form is accurate and has been represented correctly.</p>'
       +'<div class="fld"><label class="lab" for="sot_n">Your full name <span class="req">(*Required)</span></label><div class="row"><input id="sot_n" type="text" data-k="__sot" value="'+esc(ans.__sot||"")+'"></div></div>'
       +'<label class="opt"><input type="checkbox" data-k="__cert" value="y"'+(arr(ans.__cert).length?' checked':'')+'><span>I certify the information above is correct and true to the best of my knowledge and belief.</span></label>'
       +buttons("next","Submit form");
    }else{
      h='<div class="alert ok" role="status"><h2 tabindex="-1" class="h3">You&rsquo;ve submitted your form</h2><p>This is a preview, so nothing was sent. In the live form, you would get a confirmation number and a copy to print.</p></div>'
       +'<button type="button" class="lnk" data-go="intro">Start over</button>';
    }
    root.innerHTML=h;
    if(!first){var f=root.querySelector(".h");if(f)f.focus({preventScroll:true})}
    first=false;
  }
  root.addEventListener("click",function(e){
    var b=e.target.closest("[data-go]");if(!b)return;
    var g=b.getAttribute("data-go");
    if(g==="next")move(1);else if(g==="prev")move(-1);else go(g);
  });
  function onCh(e){
    var el=e.target,k=el.getAttribute&&el.getAttribute("data-k");if(!k)return;
    var f=el.closest(".fld")||el.closest(".opt");
    var group=f?f.querySelectorAll("[data-k=\""+k+"\"]"):[el];
    var t=f&&f.getAttribute("data-t"),val;
    if(el.type==="checkbox"){val=[].filter.call(root.querySelectorAll("[data-k=\""+k+"\"]"),function(x){return x.checked}).map(function(x){return x.value})}
    else if(el.type==="radio"){val=el.value}
    else if(el.getAttribute("data-i")!==null){val=[].slice.call(group).sort(function(a,b){return a.getAttribute("data-i")-b.getAttribute("data-i")}).map(function(x){return x.value});if(!val.some(Boolean))val=""}
    else val=el.value;
    ans[k]=val;post({set:[k,val]});
  }
  root.addEventListener("input",onCh);root.addEventListener("change",onCh);
  render();
}

const FORM_CSS = `
.fm{max-width:640px;margin:0 auto;padding:28px 24px 36px}
.h,.h2,.h3{font-family:var(--font-heading);line-height:1.3;margin:0 0 12px;outline:none}
h1.h{font-size:2rem}.h2{font-size:1.5rem;margin-top:28px}h2.h{font-size:1.625rem}.h3{font-size:1.25rem}
.subt{margin:0 0 16px;color:var(--vads-color-base)}
.lead{font-size:1.1875rem;line-height:1.5;margin:0 0 20px}
.body{margin:0 0 20px}
.muted{color:var(--vads-color-gray-medium);font-size:.9375rem}
ul{padding-left:22px;margin:0 0 20px}li{margin-bottom:6px}
.prog{margin-bottom:24px}.segs{display:flex;gap:4px}.seg{flex:1;height:8px;background:var(--vads-color-gray-light)}.seg.on{background:var(--vads-color-primary-dark)}
.stepn{margin:8px 0 0;font-size:.9375rem}
.devnote{font-size:.8125rem;color:var(--vads-color-primary-dark);background:var(--vads-color-info-lighter);border:1px dashed var(--vads-color-primary);padding:6px 10px;margin:0 0 16px}
.fld{border:0;padding:0;margin:0 0 24px;min-width:0}
.lab{display:block;font-weight:700;padding:0;margin:0 0 4px}
.hint{display:block;color:var(--vads-color-base);font-size:.9375rem;margin:0 0 6px}
.req{color:#b50909;font-weight:400;font-size:.875rem}
input[type=text],input[type=email],input[type=tel],input:not([type]),input[inputmode],select,textarea{font:inherit;width:100%;max-width:30rem;min-height:44px;border:1px solid #565c65;border-radius:0;padding:8px 10px;background:#fff;color:var(--vads-color-base-darkest)}
textarea{max-width:100%;display:block}
.row{display:flex;align-items:center;gap:8px}.pre{font-weight:700}
.row3{display:flex;gap:12px;flex-wrap:wrap}.sub{display:grid;gap:2px;font-size:.9375rem;min-width:0}.sub select,.sub input{max-width:none}.w2{width:5rem}.w4{width:6.5rem}
fieldset.fld:has(> .lab){}
fieldset.fld[data-t=fullname]>.sub{margin-bottom:12px;max-width:30rem}
.opt{display:flex;gap:10px;align-items:flex-start;margin:0 0 10px;cursor:pointer}
.opt input{width:22px;height:22px;margin:2px 0 0;flex:none;accent-color:var(--vads-color-primary)}
.opt.tile{border:1px solid var(--vads-color-gray-medium);padding:12px 14px}
.odesc{display:block;color:var(--vads-color-base);font-size:.9375rem}
.drop{border:2px dashed var(--vads-color-gray-medium);padding:20px;background:var(--vads-color-gray-lightest);max-width:30rem}
.btns{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.btn{font:inherit;font-weight:700;border-radius:4px;padding:11px 22px;cursor:pointer;min-height:44px;border:2px solid var(--vads-color-primary)}
.btn.pri{background:var(--vads-color-primary);color:#fff}.btn.pri:hover{background:var(--vads-color-primary-dark)}
.btn.sec{background:#fff;color:var(--vads-color-primary)}.btn.sec:hover{background:var(--vads-color-info-lighter)}
.start{margin:8px 0 14px}
.lnk{font:inherit;font-weight:700;color:var(--vads-color-action);background:none;border:0;padding:4px 0;cursor:pointer;text-decoration:underline}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.rvs{border-top:1px solid var(--vads-color-gray-light);padding-top:12px;margin-bottom:20px}.rvh{display:flex;justify-content:space-between;align-items:baseline;gap:12px}.rvh h3{font-family:var(--font-heading);font-size:1.25rem;margin:0}
dl{margin:8px 0 0}.rv{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:12px;padding:6px 0}dt{font-weight:700}dd{margin:0;overflow-wrap:anywhere}
.alert{border-left:6px solid var(--vads-color-success);background:var(--vads-color-success-lighter);padding:16px 20px;margin-bottom:16px}.alert p{margin:0}
:focus-visible{outline:2px solid var(--vads-color-focus);outline-offset:2px}
.wrap{container-type:inline-size}
@container (max-width:480px){.fm{padding:20px 16px 28px}.rv{grid-template-columns:1fr;gap:2px}}
`;
const FORM_FONTS="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700&display=swap";
function formShadowCss(){
  const vars=BASE_CSS.match(/:root\{[^}]*\}/)[0].replace(":root",":host");
  return vars+"\n:host{display:block;background:#fff;color:#1b1b1b;font-family:var(--font-sans);font-size:16px;line-height:1.5}\n*,*::before,*::after{box-sizing:border-box}\n"+FORM_CSS;
}

/* ---------- Normalize what Claude returns ---------- */
function normForm(o,promptText){
  if(!o||typeof o!=="object"||!Array.isArray(o.chapters)||!o.chapters.length)throw{code:"invalid_json"};
  const S=(v,d="")=>typeof v==="string"?v:(v==null?d:String(v));
  const ids=new Set();
  const comp=c=>{
    c=c&&typeof c==="object"?c:{};
    const t=CTYPES[c.type]?c.type:"text";
    let id=S(c.id).replace(/[^a-zA-Z0-9_-]/g,"")||nid("q");
    while(ids.has(id))id=nid("q");ids.add(id);
    let opts=[];
    if(CTYPES[t].opts){
      opts=(Array.isArray(c.options)?c.options:[]).slice(0,14).map(x=>typeof x==="string"?{label:x,description:""}:{label:S(x&&x.label,"Option"),description:S(x&&x.description)});
      if(opts.length<2)opts=[{label:"Option 1",description:""},{label:"Option 2",description:""}];
    }
    return {id,type:t,label:S(c.label,CTYPES[t].label),hint:S(c.hint),required:!!c.required,options:opts};
  };
  const page=p=>{
    p=p&&typeof p==="object"?p:{};
    const sf=p.showIf&&typeof p.showIf==="object"&&p.showIf.component?{component:S(p.showIf.component),value:S(p.showIf.value)}:null;
    return {id:nid("p"),title:S(p.title,"Page"),body:S(p.body),showIf:sf,components:(Array.isArray(p.components)?p.components:[]).slice(0,10).map(comp)};
  };
  const seen=new Set();
  const chapters=o.chapters.slice(0,14).map(c=>{
    c=c&&typeof c==="object"?c:{};
    const type=CHTYPES[c.type]?c.type:"custom";
    const base=mkChapter(type);
    base.title=S(c.title,base.title);
    if(type==="personal"){base.includeDob=c.includeDob!==false;base.includeServiceNumber=!!c.includeServiceNumber}
    else if(type==="address"){base.pageTitle=S(c.pageTitle,base.title);base.militaryCheckbox=c.militaryCheckbox!==false}
    else if(type==="phone_email"){base.pageTitle=S(c.pageTitle,base.title);base.includeEmail=c.includeEmail!==false}
    else{
      if(type==="list_loop"){
        base.nounSingular=S(c.nounSingular,"item");base.nounPlural=S(c.nounPlural,base.nounSingular+"s");
        base.itemNameLabel=S(c.itemNameLabel,"Name of "+base.nounSingular);
        base.maxItems=Math.max(1,Math.min(20,Number(c.maxItems)||4));base.optional=c.optional!==false;base.sectionIntro=S(c.sectionIntro);
      }
      base.pages=(Array.isArray(c.pages)&&c.pages.length?c.pages:[{}]).slice(0,12).map(page);
      base.pages.forEach(p=>{
        if(p.showIf&&!seen.has(p.showIf.component))p.showIf=null;
        p.components.forEach(q=>seen.add(q.id));
      });
    }
    return base;
  });
  return {
    title:S(o.title,"Untitled form"),formName:S(o.formName),formId:S(o.formId,"XX-XXXX"),intro:S(o.intro),
    whatToKnow:(Array.isArray(o.whatToKnow)?o.whatToKnow:[]).slice(0,6).map(S),
    chapters,notes:(Array.isArray(o.notes)?o.notes:[]).slice(0,6).map(S),prompt:promptText||""
  };
}

/* A new user's starting point: an empty intro and one empty chapter with one empty page. The Forms tab can't hold zero chapters, so this is the smallest blank form it accepts. */
function blankForm(){
  return normForm({title:"",formName:"",formId:"XX-XXXX",intro:"",whatToKnow:[],chapters:[{type:"custom",title:"Chapter 1",pages:[{title:"Page 1",body:"",components:[]}]}]},"");
}
function exampleForm(){
  return normForm({
    title:"Request your military service records",formName:"Request for Military Service Records",formId:"XX-XXXX",
    intro:"Use this form to ask for a copy of your service records. It takes about 10 minutes.",
    whatToKnow:["You can ask for more than one type of record on this form.","If you served under another name, you can add it.","You don’t need to give a reason unless you have a specific deadline."],
    chapters:[
      {type:"personal",title:"Your personal information",includeDob:true,includeServiceNumber:true},
      {type:"address",title:"Mailing address",pageTitle:"Where should we send your records?",militaryCheckbox:true},
      {type:"phone_email",title:"Contact information",pageTitle:"How can we reach you?",includeEmail:true},
      {type:"custom",title:"Your service",pages:[
        {title:"Which branch did you serve in?",components:[{id:"branch",type:"radio",label:"Branch of service",required:true,options:[{label:"Army"},{label:"Navy"},{label:"Air Force"},{label:"Marine Corps"},{label:"Space Force"},{label:"Coast Guard"}]}]},
        {title:"When did you serve?",body:"Give the month and year, as best you remember.",components:[{id:"start",type:"monthyear",label:"Service start date",required:true},{id:"end",type:"monthyear",label:"Service end date",required:true}]},
        {title:"Which records do you need?",components:[{id:"which",type:"checkbox",label:"Select all that apply",required:true,options:[{label:"Discharge papers (DD214)",description:"Proof of your service and how it ended"},{label:"Service treatment records",description:"Health care you received while serving"},{label:"Personnel file",description:"Assignments, awards, and training"}]}]},
        {title:"Do you need these records by a certain date?",components:[{id:"deadline",type:"yesno",label:"Do you have a deadline?",hint:"For example, a court date or a benefits decision.",required:true}]},
        {title:"Tell us about your deadline",showIf:{component:"deadline",value:"Yes"},components:[{id:"why",type:"textarea",label:"What is the deadline for?",required:true},{id:"when",type:"date",label:"Deadline date",required:true}]}
      ]},
      {type:"list_loop",title:"Other names you served under",nounSingular:"name",nounPlural:"names",itemNameLabel:"Other name",maxItems:4,optional:true,sectionIntro:"If your name was different when you served, add it here so we can find your records.",pages:[
        {title:"When did you use this name?",components:[{id:"nfrom",type:"monthyear",label:"From",required:true},{id:"nto",type:"monthyear",label:"To",required:false}]}
      ]}
    ],
    notes:["Radio groups and checkbox groups use a fieldset and legend so screen readers announce the question once.","The deadline page only appears when the Veteran answers Yes.","Form number is a placeholder until the form is registered."]
  },"Request a copy of my service records");
}

/* ---------- Prompt for Claude ---------- */
const FORM_PATTERNS = `VA.gov FORMS: how real VA forms are built (forms library, "form engine", web-component patterns).
A form is: an introduction page, then chapters (shown as steps in a segmented progress bar), then a review page, a statement of truth, and a confirmation page.
CHAPTER TYPES you can use:
- "personal": name page plus identification page. Options includeDob (bool), includeServiceNumber (bool). Use only if the form truly needs to identify the person.
- "address": one address page. Options pageTitle, militaryCheckbox (bool).
- "phone_email": one contact page. Options pageTitle, includeEmail (bool).
- "custom": a chapter of your own pages. Each page has title, optional body, optional showIf, and components.
- "list_loop": for an unknown number of similar items (dependents, employers, prior names). Options nounSingular, nounPlural, itemNameLabel, maxItems, optional (bool), sectionIntro. Its pages hold the details asked for each item; the library adds the yes/no summary page and the item-name page itself, so do not add those.
FIELD TYPES (component "type"): text, textarea, radio, checkbox (a group of checkboxes), select (dropdown, for long lists), yesno, date, monthyear, number, currency, ssn, email, phone, file, fullname.
radio, checkbox, and select need "options": [{"label":"...","description":"optional, one short line"}]. Use radio for up to about 6 choices, select for longer lists, yesno for plain yes/no questions.
CONDITIONAL PAGES: "showIf":{"component":"<id of an earlier yesno, radio, select or checkbox component>","value":"<exact option label, or Yes / No>"}. The component must be on an earlier page. Use null when the page always shows.
PRINCIPLES: Ask one thing, or a few closely related things, per page. Ask only what is needed to do the job. Do not ask for information VA already has when a prefill would work. Put the question in the page title, and keep field labels short. Mark a field required only when the form cannot work without it. Never ask for a Social Security number unless it is essential. 3 to 8 chapters is typical; a small form can have 3.
CONTENT: Plain language, 6th to 8th grade. Address the Veteran as "you". Sentence case for titles, labels, and buttons. Hints say how to answer, not what the label already says. Dates like "January 14, 2027". No lorem ipsum, no real personal data, and never invent an OMB number or a real VA form number (use "XX-XXXX").`;
const FORM_SPEC = `Reply with ONLY one JSON object, no prose, shaped like:
{"title":"Plain-language page title, sentence case, 8 words max","formName":"Official-style form name","formId":"XX-XXXX","intro":"One to three short sentences.","whatToKnow":["2 to 4 short bullets"],
"chapters":[
 {"type":"personal","title":"Your personal information","includeDob":true,"includeServiceNumber":false},
 {"type":"address","title":"Mailing address","pageTitle":"Where should we send it?","militaryCheckbox":true},
 {"type":"phone_email","title":"Contact information","pageTitle":"How can we reach you?","includeEmail":true},
 {"type":"custom","title":"Section name","pages":[{"title":"Question as the page title","body":"","showIf":null,"components":[{"id":"q1","type":"radio","label":"Short label","hint":"","required":true,"options":[{"label":"Option","description":""}]}]}]},
 {"type":"list_loop","title":"Section name","nounSingular":"dependent","nounPlural":"dependents","itemNameLabel":"Dependent’s name","maxItems":6,"optional":true,"sectionIntro":"One sentence on why we ask.","pages":[{"title":"...","body":"","showIf":null,"components":[]}]}
],
"notes":["3 to 5 short notes: what a developer or content designer should verify, and any choice you made that the designer might change."]}
Every component id must be short, lowercase, and unique across the whole form (q1, q2, ...). Include only chapters the form needs.`;
function fBuildPrompt(text,base){
  let p="You are the VADS Form Builder agent. You design VA.gov forms that follow the VA forms library and VA Design System, strictly following the reference below.\n\n"+FORM_PATTERNS+"\n\n"+VADS_KNOWLEDGE.split("\n").filter(l=>/^(RULE|ACCESSIBILITY|CONTENT)/.test(l)).join("\n")+"\n\n"+FORM_SPEC+"\n\n";
  if(base){
    p+="CURRENT FORM (JSON):\n"+JSON.stringify(toModelJSON(base))+"\n\nCHANGE REQUEST: "+text+"\nApply the change and return the complete updated form in the same JSON shape. Keep component ids unchanged for fields you keep.";
  }else p+="REQUEST: "+text;
  return p;
}
function toModelJSON(m){
  return {title:m.title,formName:m.formName,formId:m.formId,intro:m.intro,whatToKnow:m.whatToKnow,
    chapters:m.chapters.map(c=>Object.assign({},c,c.pages?{pages:c.pages.map(p=>({title:p.title,body:p.body,showIf:p.showIf,components:p.components}))}:{})),notes:m.notes};
}

/* ---------- Form Builder: state + helpers ---------- */
const FS = {m:null,sel:"intro",step:"intro",ans:{},busy:false,ctl:null,tab:"json",mobile:false,hist:[],rendered:false};
const DRAFT_KEY = "vads-form-draft";
try{
  const raw = localStorage.getItem(DRAFT_KEY);
  if(raw){const d=JSON.parse(raw);if(d&&d.m&&Array.isArray(d.m.chapters)&&d.m.chapters.length){FS.m=d.m;FS.ans=d.ans||{}}}
}catch(e){}
if(!FS.m)FS.m = blankForm();

function fel(tag,props,...kids){
  const e=document.createElement(tag);
  for(const k in (props||{})){
    const v=props[k];
    if(k==="class")e.className=v;
    else if(k==="text")e.textContent=v;
    else if(k.startsWith("on"))e[k]=v;
    else if(v===true)e.setAttribute(k,"");
    else if(v!==false&&v!=null)e.setAttribute(k,v);
  }
  kids.flat().forEach(x=>{if(x!=null&&x!==false)e.append(x.nodeType?x:document.createTextNode(x))});
  return e;
}
const camel = s => {
  let r=String(s).replace(/[^a-zA-Z0-9]+(.)?/g,(_,c)=>c?c.toUpperCase():"").replace(/^./,x=>x.toLowerCase());
  if(!r)r="field";
  if(/^[0-9]/.test(r))r="f"+r;
  return r;
};
const kebab = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"page";
const qs = s => "'"+String(s).replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\s*\n\s*/g," ")+"'";

function parseSel(sel){
  let r;
  if(sel==="intro")return {k:"form"};
  if((r=/^ch(\d+)$/.exec(sel)))return {k:"chapter",ch:+r[1]};
  if((r=/^c(\d+)p(\d+)$/.exec(sel)))return {k:"page",ch:+r[1],pg:+r[2]};
  return {k:"form"};
}
function validSel(){
  const p=parseSel(FS.sel),cs=FS.m.chapters;
  if(p.k==="chapter"&&!cs[p.ch])FS.sel="intro";
  if(p.k==="page"&&!(cs[p.ch]&&cs[p.ch].pages&&cs[p.ch].pages[p.pg]))FS.sel=cs[p.ch]?"ch"+p.ch:"intro";
}
function stepForSel(sel){
  const p=parseSel(sel);
  if(p.k==="form")return "intro";
  if(p.k==="page")return sel;
  const s=flatten(FS.m).find(x=>x.ch===p.ch);
  return s?s.id:"intro";
}
function mapStepToSel(id){
  let r;
  if(id==="intro")return "intro";
  if(/^c\d+p\d+$/.test(id))return id;
  if((r=/^c(\d+)-/.exec(id)))return "ch"+r[1];
  return FS.sel;
}
function fstatus(msg,{err=false,live=false}={}){
  const s=$("#fstatus");s.className="status"+(err?" err":"");s.innerHTML="";
  if(live){const d=document.createElement("span");d.className="spin";d.setAttribute("aria-hidden","true");s.append(d)}
  s.append(document.createTextNode(msg));
}
function snap(){FS.hist.push(JSON.stringify(FS.m));if(FS.hist.length>25)FS.hist.shift();$("#f-undo").disabled=false}
function saveDraft(){
  clearTimeout(FS.st);
  FS.st=setTimeout(()=>{try{const s=JSON.stringify({m:FS.m,ans:FS.ans});if(s.length<400000)localStorage.setItem(DRAFT_KEY,s)}catch(e){}},500);
}
function sampleReady(){
  $("#fgen").disabled=false;$("#frefine-go").disabled=false;
  fstatus("Ready. Pick a starter or describe your own.");
}

/* ---------- Render ---------- */
function renderForms(){
  FS.rendered=true;
  validSel();
  renderFormMeta();renderOutline();renderInspector();renderLint();renderFCode();renderFrame();
}
function renderFormMeta(){
  $("#f-title").textContent=FS.m.title||"Untitled form";
  const n=FS.m.chapters.length,pgs=flatten(FS.m).filter(s=>s.kind==="page").length;
  $("#f-sum").textContent=n+" chapter"+(n===1?"":"s")+", "+pgs+" page"+(pgs===1?"":"s")+" in the flow."+(FS.m.formId?" Form "+FS.m.formId+".":"");
}
function renderFrame(){
  if(!document.getElementById("vf-fonts")){
    const l=document.createElement("link");l.id="vf-fonts";l.rel="stylesheet";l.href=FORM_FONTS;document.head.append(l);
  }
  const host=$("#f-host");
  const sr=host.shadowRoot||host.attachShadow({mode:"open"});
  sr.innerHTML="<style>"+formShadowCss()+'</style><div class="wrap"><div class="fm" id="root"></div></div>';
  try{previewRuntime(sr.getElementById("root"),{m:FS.m,step:FS.step,ans:FS.ans},onFormMsg)}
  catch(e){console.error(e);sr.getElementById("root").textContent="The preview couldn\u2019t be drawn for this form. Check the page and field settings."}
}
function touch(structural){
  clearTimeout(FS.dt);
  FS.dt=setTimeout(()=>{renderFrame();renderFCode();saveDraft()},280);
  renderFormMeta();renderOutline();renderLint();
  if(structural){validSel();renderInspector()}
}
function afterStruct(){
  validSel();cleanShowIf();FS.step=stepForSel(FS.sel);
  renderForms();saveDraft();
}
function cleanShowIf(){
  const seen=new Set();
  FS.m.chapters.forEach(c=>{(c.pages||[]).forEach(p=>{
    if(p.showIf){
      const ok=seen.has(p.showIf.component);
      if(ok){
        const q=allComps().find(x=>x.id===p.showIf.component);
        if(!q||!["yesno","radio","select","checkbox"].includes(q.type))p.showIf=null;
      }else p.showIf=null;
    }
    p.components.forEach(q=>seen.add(q.id));
  })});
}
function allComps(){const a=[];FS.m.chapters.forEach(c=>(c.pages||[]).forEach(p=>p.components.forEach(q=>a.push(q))));return a}

function mini(glyph,label,fn,{disabled=false,del=false}={}){
  return fel("button",{class:"mini"+(del?" del":""),type:"button","aria-label":label,title:label,disabled,onclick:fn,text:glyph});
}
function selectItem(sel){
  FS.sel=sel;FS.step=stepForSel(sel);
  renderOutline();renderInspector();renderFrame();
}

/* ---------- Outline ---------- */
function renderOutline(){
  const o=$("#outline");o.innerHTML="";
  const m=FS.m,cs=m.chapters;
  const row=(cls,sel,label,tags,acts)=>{
    const r=fel("div",{class:"orow "+cls,"aria-current":String(FS.sel===sel)});
    const inlineTag=cls==="pg";
    r.append(fel("button",{class:"main"+(inlineTag?"":" stk"),type:"button",onclick:()=>selectItem(sel)},fel("span",{class:"t",text:label}),...(tags||[]).map(t=>fel("span",{class:inlineTag?"pill":"ty",text:t}))),...(acts||[]));
    return r;
  };
  o.append(row("hd","intro","Form details",[],[]));
  cs.forEach((c,i)=>{
    o.append(row("hd","ch"+i,c.title||"Untitled",[CHTYPES[c.type].label],[
      mini("↑","Move chapter up",()=>{snap();[cs[i-1],cs[i]]=[cs[i],cs[i-1]];FS.sel="ch"+(i-1);afterStruct()},{disabled:i===0}),
      mini("↓","Move chapter down",()=>{snap();[cs[i+1],cs[i]]=[cs[i],cs[i+1]];FS.sel="ch"+(i+1);afterStruct()},{disabled:i===cs.length-1}),
      mini("✕","Delete chapter",()=>{if(cs.length<2){toast("A form needs at least one chapter.");return}snap();cs.splice(i,1);FS.sel="intro";afterStruct()},{del:true})
    ]));
    (c.pages||[]).forEach((p,j)=>{
      const pgs=c.pages;
      o.append(row("pg","c"+i+"p"+j,p.title||"Untitled page",p.showIf?["If"]:[],[
        mini("↑","Move page up",()=>{snap();[pgs[j-1],pgs[j]]=[pgs[j],pgs[j-1]];FS.sel="c"+i+"p"+(j-1);afterStruct()},{disabled:j===0}),
        mini("↓","Move page down",()=>{snap();[pgs[j+1],pgs[j]]=[pgs[j],pgs[j+1]];FS.sel="c"+i+"p"+(j+1);afterStruct()},{disabled:j===pgs.length-1}),
        mini("✕","Delete page",()=>{if(pgs.length<2){toast("A chapter needs at least one page.");return}snap();pgs.splice(j,1);FS.sel="ch"+i;afterStruct()},{del:true})
      ]));
    });
    if(c.pages){
      const r=fel("div",{class:"orow pg"});
      r.append(fel("button",{class:"main",type:"button",onclick:()=>{snap();c.pages.push(mkPage("New page"));FS.sel="c"+i+"p"+(c.pages.length-1);afterStruct()}},fel("span",{class:"t",text:"+ Add page",style:"color:var(--tint)"})));
      o.append(r);
    }
  });
  const sel=fel("select",{id:"add-ch-type","aria-label":"Chapter type"},Object.keys(CHTYPES).map(k=>fel("option",{value:k,text:CHTYPES[k].label})));
  sel.value="custom";
  o.append(fel("div",{class:"addrow"},sel,fel("button",{class:"btn small",type:"button",text:"Add chapter",onclick:()=>{
    snap();cs.push(mkChapter(sel.value));FS.sel="ch"+(cs.length-1);afterStruct();
  }})));
}

/* ---------- Inspector ---------- */
function fi(label,node,id,hint){return fel("div",{class:"fi"},fel("label",{for:id,text:label}),node,hint?fel("p",{class:"fhint",text:hint}):null)}
function tx(obj,key,id,{area=false,rows=3,num=false,structural=false,get,set}={}){
  const n=fel(area?"textarea":"input",{id});
  if(!area)n.type=num?"number":"text";else n.rows=rows;
  n.value=get?get():(obj[key]==null?"":obj[key]);
  n.oninput=()=>{
    if(set)set(n.value);else obj[key]=num?Math.max(1,Math.min(20,Number(n.value)||1)):n.value;
    touch(structural);
  };
  return n;
}
function swr(label,obj,key,id){
  const b=fel("button",{class:"sw",type:"button",id,"aria-pressed":String(!!obj[key]),text:label});
  b.onclick=()=>{obj[key]=!obj[key];b.setAttribute("aria-pressed",String(!!obj[key]));touch(false)};
  return fel("div",{class:"sw-wrap"},b);
}
function sl(opts,value,onchange,id){
  const s=fel("select",{id},opts.map(([v,l])=>fel("option",{value:v,text:l})));
  s.value=value;s.onchange=()=>onchange(s.value);return s;
}
function inspHead(title,tag){return fel("div",{class:"ins-h"},fel("h3",{text:title}),tag?fel("span",{class:"pill",text:tag}):null)}

function eligible(ch,pg){
  const out=[];
  FS.m.chapters.forEach((c,i)=>{
    if(i>ch||!c.pages)return;
    c.pages.forEach((p,j)=>{
      if(i===ch&&j>=pg)return;
      p.components.forEach(q=>{
        if(!["yesno","radio","select","checkbox"].includes(q.type))return;
        out.push({id:q.id,label:q.label||q.type,values:q.type==="yesno"?["Yes","No"]:q.options.map(x=>x.label)});
      });
    });
  });
  return out;
}

function renderInspector(){
  const box=$("#inspector");box.innerHTML="";
  const m=FS.m,p=parseSel(FS.sel);
  if(p.k==="form"){
    box.append(inspHead("Form details","Introduction page"),
      fi("Form title (plain language)",tx(m,"title","i-title"),"i-title"),
      fi("Official form name",tx(m,"formName","i-formName"),"i-formName"),
      fi("Form number",tx(m,"formId","i-formId"),"i-formId","Keep XX-XXXX until the form has a real number."),
      fi("Introduction",tx(m,"intro","i-intro",{area:true}),"i-intro","One to three short sentences."),
      fi("What to know (one bullet per line)",tx(m,"whatToKnow","i-wtk",{area:true,rows:4,get:()=>m.whatToKnow.join("\n"),set:v=>{m.whatToKnow=v.split("\n").map(x=>x.trim()).filter(Boolean)}}),"i-wtk"));
    return;
  }
  if(p.k==="chapter"){
    const c=m.chapters[p.ch];
    box.append(inspHead("Chapter",CHTYPES[c.type].label),fi("Chapter title",tx(c,"title","i-"+FS.sel+"-t"),"i-"+FS.sel+"-t","Shown in the progress bar as the step name."));
    if(c.type==="personal")box.append(swr("Ask for date of birth",c,"includeDob","i-dob"),swr("Ask for service number",c,"includeServiceNumber","i-svc"),
      fel("div",{class:"fi"},fel("p",{class:"fhint",text:"This chapter adds two pages: name, then identification (Social Security number and VA file number). The form library builds them, so there is nothing else to edit."})));
    else if(c.type==="address")box.append(fi("Page title",tx(c,"pageTitle","i-"+FS.sel+"-pt"),"i-"+FS.sel+"-pt"),swr("Show the military base checkbox",c,"militaryCheckbox","i-mil"));
    else if(c.type==="phone_email")box.append(fi("Page title",tx(c,"pageTitle","i-"+FS.sel+"-pt"),"i-"+FS.sel+"-pt"),swr("Ask for an email address",c,"includeEmail","i-em"));
    else if(c.type==="list_loop")box.append(
      fi("Singular noun",tx(c,"nounSingular","i-ns"),"i-ns","For example: dependent"),
      fi("Plural noun",tx(c,"nounPlural","i-np"),"i-np","For example: dependents"),
      fi("Label for the item name",tx(c,"itemNameLabel","i-inl",{structural:false}),"i-inl","For example: Dependent’s name"),
      fi("Most items allowed",tx(c,"maxItems","i-max",{num:true}),"i-max"),
      swr("Veterans can skip this section",c,"optional","i-opt"),
      fi("Section introduction",tx(c,"sectionIntro","i-si",{area:true}),"i-si","Explain why you ask, in one sentence."),
      fel("div",{class:"fi"},fel("p",{class:"fhint",text:"The library adds the yes/no summary page and the item name page. Add the pages that collect each item’s details in the outline."})));
    else box.append(fel("div",{class:"fi"},fel("p",{class:"fhint",text:"Select a page in the outline to edit its fields, or add a page."})));
    return;
  }
  const c=m.chapters[p.ch],pg=c.pages[p.pg];
  box.append(inspHead("Page",c.title),
    fi("Page title",tx(pg,"title","i-"+pg.id+"-t"),"i-"+pg.id+"-t","Put the question here. Keep field labels short."),
    fi("Text under the title",tx(pg,"body","i-"+pg.id+"-b",{area:true,rows:2}),"i-"+pg.id+"-b"));
  /* conditional */
  const el=eligible(p.ch,p.pg);
  const cond=fel("div",{class:"fi"});
  const mode=sl([["always","Always shown"],["if","Only when an earlier answer is…"]],pg.showIf?"if":"always",v=>{
    snap();
    if(v==="always")pg.showIf=null;
    else if(el.length)pg.showIf={component:el[0].id,value:el[0].values[0]||""};
    afterStruct();
  },"i-"+pg.id+"-mode");
  if(!el.length&&!pg.showIf)mode.disabled=true;
  cond.append(fel("label",{for:"i-"+pg.id+"-mode",text:"Show this page"}),mode);
  if(pg.showIf){
    const opts=el.map(x=>[x.id,x.label]);
    if(!el.some(x=>x.id===pg.showIf.component))opts.push([pg.showIf.component,"(missing field)"]);
    const cur=el.find(x=>x.id===pg.showIf.component);
    const vals=(cur?cur.values:[pg.showIf.value]).map(v=>[v,v]);
    const f1=sl(opts,pg.showIf.component,v=>{const t=el.find(x=>x.id===v);pg.showIf={component:v,value:t&&t.values[0]||""};touch(true)},"i-"+pg.id+"-c1");
    const f2=sl(vals,pg.showIf.value,v=>{pg.showIf.value=v;touch(false)},"i-"+pg.id+"-c2");
    cond.append(fel("div",{class:"cond"},fel("div",{},fel("label",{for:"i-"+pg.id+"-c1",text:"Field"}),f1),fel("div",{},fel("label",{for:"i-"+pg.id+"-c2",text:"Equals"}),f2)));
  }else if(!el.length)cond.append(fel("p",{class:"fhint",text:"To show a page only sometimes, add a yes/no, choice, or dropdown question on an earlier page first."}));
  box.append(cond);
  /* fields */
  box.append(inspHead("Fields",pg.components.length+""));
  if(!pg.components.length)box.append(fel("div",{class:"fi"},fel("p",{class:"fhint",text:"No fields yet. Add one below."})));
  pg.components.forEach((q,i)=>box.append(compCard(pg,q,i)));
  const ts=fel("select",{id:"add-comp-type","aria-label":"Field type"},Object.keys(CTYPES).map(k=>fel("option",{value:k,text:CTYPES[k].label})));
  box.append(fel("div",{class:"addrow"},ts,fel("button",{class:"btn small",type:"button",text:"Add field",onclick:()=>{
    if(pg.components.length>=10){toast("Ten fields is the limit on one page. Add another page instead.");return}
    snap();pg.components.push(mkComp(ts.value));touch(true);
    const last=box.querySelectorAll(".cc");const t=last[last.length-1];if(t){const i=t.querySelector("input");if(i)i.focus()}
  }})));
}
function compCard(pg,q,i){
  const T=CTYPES[q.type],arr=pg.components,id="i-"+q.id;
  const card=fel("div",{class:"cc"});
  card.append(fel("div",{class:"cc-h"},fel("span",{class:"pill",text:T.label}),fel("span",{class:"nm",text:q.label||""}),fel("span",{class:"sp"}),
    mini("↑","Move field up",()=>{snap();[arr[i-1],arr[i]]=[arr[i],arr[i-1]];touch(true)},{disabled:i===0}),
    mini("↓","Move field down",()=>{snap();[arr[i+1],arr[i]]=[arr[i],arr[i+1]];touch(true)},{disabled:i===arr.length-1}),
    mini("✕","Delete field",()=>{snap();arr.splice(i,1);cleanShowIf();touch(true)},{del:true})));
  const lab=tx(q,"label",id+"-l");
  const prev=lab.oninput;lab.oninput=()=>{prev();const nm=card.querySelector(".nm");if(nm)nm.textContent=q.label};
  card.append(fi("Label",lab,id+"-l"));
  card.append(fi("Type",sl(Object.keys(CTYPES).map(k=>[k,CTYPES[k].label]),q.type,v=>{
    snap();q.type=v;
    if(CTYPES[v].opts&&q.options.length<2)q.options=[{label:"Option 1",description:""},{label:"Option 2",description:""}];
    cleanShowIf();touch(true);
  },id+"-t"),id+"-t"));
  card.append(fi("Hint",tx(q,"hint",id+"-h"),id+"-h","Optional. Say how to answer, not what the label already says."));
  if(T.opts)card.append(fi("Choices (one per line, add “ | ” then a short description if needed)",tx(q,"options",id+"-o",{area:true,rows:4,
    get:()=>q.options.map(o=>o.label+(o.description?" | "+o.description:"")).join("\n"),
    set:v=>{q.options=v.split("\n").map(x=>x.trim()).filter(Boolean).map(l=>{const [a,...b]=l.split("|");return {label:a.trim(),description:b.join("|").trim()}})}}),id+"-o"));
  card.append(swr("Required",q,"required",id+"-r"));
  return card;
}

/* ---------- Checks ---------- */
function lint(m){
  const L=[];
  const w=t=>L.push({k:"warn",t}),i=t=>L.push({k:"info",t});
  let unsup=new Set(),cond=0;
  m.chapters.forEach(c=>(c.pages||[]).forEach(p=>{
    if(!p.components.length)w("“"+p.title+"” has no fields.");
    else if(p.components.length>4)w("“"+p.title+"” has "+p.components.length+" fields. VA guidance favors one question, or a few closely related ones, per page.");
    if(p.showIf)cond++;
    p.components.forEach(q=>{
      if(!String(q.label).trim())w("A field on “"+p.title+"” has no label.");
      if(CTYPES[q.type].opts&&q.options.length<2)w("“"+q.label+"” needs at least two choices.");
      if(CTYPES[q.type].opts&&q.options.some(o=>!o.label))w("“"+q.label+"” has an empty choice.");
      if(!CTYPES[q.type].engine)unsup.add(q.type);
    });
  }));
  if(m.chapters.length>8)w("This form has "+m.chapters.length+" chapters. Check that every one is needed.");
  if(m.chapters.some(c=>c.type==="personal"&&c.includeServiceNumber))i("Service number is asked for. Confirm VA needs it for this form.");
  if(unsup.size)i("Not in the form engine yet: "+[...unsup].map(t=>CTYPES[t].label.toLowerCase()).join(", ")+". Form JSON marks them; Page code uses the platform patterns.");
  if(cond)i(cond+" conditional page"+(cond===1?"":"s")+". Page code adds a depends function; the engine JSON carries it as dependsOn.");
  if(!L.some(x=>x.k==="warn"))L.unshift({k:"ok",t:"No problems found."});
  (m.notes||[]).forEach(n=>L.push({k:"info",t:n}));
  return L;
}
function renderLint(){
  const ul=$("#flint");ul.innerHTML="";
  lint(FS.m).forEach(x=>ul.append(fel("li",{},fel("span",{class:"dot "+(x.k==="info"?"":x.k),"aria-hidden":"true"}),fel("span",{text:x.t}))));
}

/* ---------- Exports ---------- */
function toEngine(m){
  const comp=c=>{
    const T=CTYPES[c.type];
    const o={id:c.id,type:T.engine||"digital_form_"+c.type,label:c.label,hint:c.hint||null,required:!!c.required};
    if(T.opts)o.responseOptions=c.options.map(x=>({label:x.label,description:x.description||null}));
    if(c.type==="monthyear")o.dateFormat="month_year";
    if(!T.engine)o._notInFormEngineYet=true;
    return o;
  };
  const page=p=>{
    const o={id:p.id,pageTitle:p.title,bodyText:p.body||null,components:p.components.map(comp)};
    if(p.showIf){
      const t=allComps().find(x=>x.id===p.showIf.component);
      o.dependsOn={operator:"and",conditions:[{field:"component"+p.showIf.component,value:t&&t.type==="yesno"?p.showIf.value==="Yes":p.showIf.value}]};
    }
    return o;
  };
  return {
    formId:m.formId,title:m.formName||m.title,plainLanguageHeader:m.title,introParagraph:m.intro,whatToKnowBullets:m.whatToKnow,
    chapters:m.chapters.map((c,i)=>{
      const b={id:i+1,type:CHTYPES[c.type].engine,chapterTitle:c.title};
      if(c.type==="personal")b.pages=[{pageTitle:"Name",includeDateOfBirth:!!c.includeDob},{pageTitle:"Identification information",includeServiceNumber:!!c.includeServiceNumber}];
      else if(c.type==="address"){b.pageTitle=c.pageTitle;b.additionalFields={militaryAddressCheckbox:!!c.militaryCheckbox}}
      else if(c.type==="phone_email"){b.pageTitle=c.pageTitle;b.additionalFields={includeEmail:!!c.includeEmail}}
      else{
        if(c.type==="list_loop")Object.assign(b,{itemNameLabel:c.itemNameLabel,maxItems:c.maxItems,nounPlural:c.nounPlural,nounSingular:c.nounSingular,optional:!!c.optional,sectionIntro:c.sectionIntro});
        b.pages=c.pages.map(page);
      }
      return b;
    })
  };
}

function genCode(m){
  const used=new Set(["titleUI"]);
  const U=n=>{used.add(n);return n};
  const KEYS={};
  const unique=(base,set)=>{let k=base,n=2;while(set.has(k))k=base+n++;set.add(k);return k};
  function dep(sf){
    const r=KEYS[sf.component];if(!r)return null;
    if(r.type==="yesno")return "formData."+r.key+" === "+(sf.value==="Yes");
    if(r.type==="checkbox")return "formData."+r.key+"?."+camel(sf.value)+" === true";
    return "formData."+r.key+" === "+qs(camel(sf.value));
  }
  function field(c,set){
    const key=unique(camel(c.label||c.type),set);
    KEYS[c.id]={key,type:c.type};
    const t=qs(c.label),h=c.hint?", hint: "+qs(c.hint):"";
    const keys=c.options.map(o=>camel(o.label));
    const labels=()=>"{ "+c.options.map(o=>camel(o.label)+": "+qs(o.label)).join(", ")+" }";
    const hasD=c.options.some(o=>o.description);
    let ui,sc;
    switch(c.type){
      case"textarea":ui=U("textareaUI")+"({ title: "+t+h+" })";sc=U("textareaSchema");break;
      case"radio":ui=U("radioUI")+"({ title: "+t+h+", labels: "+labels()+(hasD?", descriptions: { "+c.options.filter(o=>o.description).map(o=>camel(o.label)+": "+qs(o.description)).join(", ")+" }, tile: true":"")+" })";sc=U("radioSchema")+"(["+keys.map(qs).join(", ")+"])";break;
      case"checkbox":ui=U("checkboxGroupUI")+"({ title: "+t+h+", required: "+!!c.required+", labels: { "+c.options.map(o=>camel(o.label)+": { title: "+qs(o.label)+(o.description?", description: "+qs(o.description):"")+" }").join(", ")+" } })";sc=U("checkboxGroupSchema")+"(["+keys.map(qs).join(", ")+"])";break;
      case"select":ui=U("selectUI")+"({ title: "+t+h+", labels: "+labels()+" })";sc=U("selectSchema")+"(["+keys.map(qs).join(", ")+"])";break;
      case"yesno":ui=U("yesNoUI")+"({ title: "+t+h+" })";sc=U("yesNoSchema");break;
      case"date":ui=U("currentOrPastDateUI")+"({ title: "+t+h+" })";sc=U("currentOrPastDateSchema");break;
      case"monthyear":ui=U("currentOrPastMonthYearDateUI")+"({ title: "+t+h+" })";sc=U("currentOrPastMonthYearDateSchema");break;
      case"number":ui=U("numberUI")+"({ title: "+t+h+" })";sc=U("numberSchema");break;
      case"currency":ui=U("currencyUI")+"({ title: "+t+h+" })";sc=U("currencySchema");break;
      case"ssn":ui=U("ssnUI")+"("+t+")";sc=U("ssnSchema");break;
      case"email":ui=U("emailUI")+"("+t+")";sc=U("emailSchema");break;
      case"phone":ui=U("phoneUI")+"("+t+")";sc=U("phoneSchema");break;
      case"file":ui=U("fileInputUI")+"({ title: "+t+h+" })";sc=U("fileInputSchema")+"()";break;
      case"fullname":ui=U("fullNameUI")+"()";sc=U("fullNameSchema");break;
      default:ui=U("textUI")+"({ title: "+t+h+" })";sc=U("textSchema");
    }
    return {key,ui,sc,req:!!c.required};
  }
  /* body of a page object, as lines */
  function body(path,title,uiLines,propLines,req,dp,I){
    const L=[];
    L.push("path: "+qs(path)+",","title: "+qs(title)+",");
    if(dp)L.push("depends: formData => "+dp+",");
    L.push("uiSchema: {",...uiLines.map(x=>"  "+x),"},");
    L.push("schema: {","  type: 'object',","  properties: {",...propLines.map(x=>"    "+x),"  },");
    if(req.length)L.push("  required: ["+req.map(qs).join(", ")+"],");
    L.push("},");
    return L.map(x=>I+x).join("\n");
  }
  function custom(p,mode,ctx){
    const set=new Set();
    const fs=p.components.map(c=>field(c,set));
    const ui=[mode==="item"?U("arrayBuilderItemSubsequentPageTitleUI")+"("+qs(p.title)+(p.body?", "+qs(p.body):"")+"),":U("titleUI")+"("+qs(p.title)+(p.body?", "+qs(p.body):"")+"),"].map(x=>"..."+x);
    fs.forEach(f=>ui.push(f.key+": "+f.ui+","));
    const props=fs.map(f=>f.key+": "+f.sc+",");
    const req=fs.filter(f=>f.req).map(f=>f.key);
    return {ui,props,req,dp:p.showIf?dep(p.showIf):null,path:mode==="item"?ctx.plural+"/:index/"+kebab(p.title):kebab(p.title)};
  }
  const out=[];
  m.chapters.forEach((c,i)=>{
    const name="chapter"+(i+1);
    out.push("// "+(i+1)+". "+c.title+" ("+CHTYPES[c.type].label.toLowerCase()+")");
    if(c.type==="personal"){
      U("fullNameUI");U("fullNameSchema");U("ssnUI");U("ssnSchema");U("vaFileNumberUI");U("vaFileNumberSchema");
      if(c.includeDob){U("dateOfBirthUI");U("dateOfBirthSchema")}
      if(c.includeServiceNumber){U("serviceNumberUI");U("serviceNumberSchema")}
      out.push("const "+name+" = {\n  title: "+qs(c.title)+",\n  pages: {\n    nameAndDateOfBirth: {\n"+
        body("name","Your name",["...titleUI('Your name'),","fullName: fullNameUI(),"].concat(c.includeDob?["dateOfBirth: dateOfBirthUI(),"]:[]),
          ["fullName: fullNameSchema,"].concat(c.includeDob?["dateOfBirth: dateOfBirthSchema,"]:[]),["fullName"].concat(c.includeDob?["dateOfBirth"]:[]),null,"      ")+
        "\n    },\n    identificationInformation: {\n"+
        body("identification-information","Identification information",["...titleUI('Identification information'),","ssn: ssnUI(),","vaFileNumber: vaFileNumberUI(),"].concat(c.includeServiceNumber?["serviceNumber: serviceNumberUI(),"]:[]),
          ["ssn: ssnSchema,","vaFileNumber: vaFileNumberSchema,"].concat(c.includeServiceNumber?["serviceNumber: serviceNumberSchema,"]:[]),["ssn"],null,"      ")+
        "\n    },\n  },\n};");
    }else if(c.type==="address"){
      const nm=c.militaryCheckbox?"address":"addressNoMilitary";
      U(nm+"UI");U(nm+"Schema");
      out.push("const "+name+" = {\n  title: "+qs(c.title)+",\n  pages: {\n    address: {\n"+
        body(kebab(c.pageTitle||"address"),c.pageTitle||c.title,["...titleUI("+qs(c.pageTitle||c.title)+"),","address: "+nm+"UI(),"],["address: "+nm+"Schema(),"],[],null,"      ")+"\n    },\n  },\n};");
    }else if(c.type==="phone_email"){
      U("phoneUI");U("phoneSchema");
      const ui=["...titleUI("+qs(c.pageTitle||c.title)+"),","homePhone: phoneUI('Home phone number'),","mobilePhone: phoneUI('Mobile phone number'),"];
      const pr=["homePhone: phoneSchema,","mobilePhone: phoneSchema,"],rq=["homePhone"];
      if(c.includeEmail){U("emailUI");U("emailSchema");ui.push("emailAddress: emailUI(),");pr.push("emailAddress: emailSchema,");rq.push("emailAddress")}
      out.push("const "+name+" = {\n  title: "+qs(c.title)+",\n  pages: {\n    phoneAndEmail: {\n"+body(kebab(c.pageTitle||"contact"),c.pageTitle||c.title,ui,pr,rq,null,"      ")+"\n    },\n  },\n};");
    }else if(c.type==="custom"){
      const ps=c.pages.map((p,j)=>{
        const r=custom(p,"page");
        return "    "+camel("page "+(j+1)+" "+p.title)+": {\n"+body(r.path,p.title,r.ui,r.props,r.req,r.dp,"      ")+"\n    },";
      });
      out.push("const "+name+" = {\n  title: "+qs(c.title)+",\n  pages: {\n"+ps.join("\n")+"\n  },\n};");
    }else{
      ["arrayBuilderPages","arrayBuilderYesNoUI","arrayBuilderYesNoSchema","arrayBuilderItemFirstPageTitleUI","textUI","textSchema"].forEach(U);
      const sg=c.nounSingular,pl=c.nounPlural,op=camel(pl+" options"),sumKey="view:"+camel("has "+pl);
      const lines=[];
      lines.push("const "+op+" = {\n  arrayPath: "+qs(camel(pl))+",\n  nounSingular: "+qs(sg)+",\n  nounPlural: "+qs(pl)+",\n  required: "+!c.optional+",\n  maxItems: "+c.maxItems+",\n  text: {\n    getItemName: item => item?.name,\n  },\n};\n");
      lines.push("const "+name+"Pages = arrayBuilderPages("+op+", pageBuilder => ({");
      if(!c.optional)lines.push("  "+camel(sg+" intro")+": pageBuilder.introPage({\n"+body(kebab(pl),c.title,["...titleUI("+qs(c.title)+(c.sectionIntro?", "+qs(c.sectionIntro):"")+"),"],[],[],null,"    ")+"\n  }),");
      lines.push("  "+camel(sg+" summary")+": pageBuilder.summaryPage({\n"+body(kebab(c.optional?pl:pl+" summary"),c.optional?c.title:"Review your "+pl,[
        qs(sumKey)+": arrayBuilderYesNoUI("+op+", {}, {}),"],[qs(sumKey)+": arrayBuilderYesNoSchema,"],[sumKey],null,"    ")+"\n  }),");
      lines.push("  "+camel(sg+" name page")+": pageBuilder.itemPage({\n"+body(kebab(pl)+"/:index/name",c.itemNameLabel,[
        "...arrayBuilderItemFirstPageTitleUI({ title: "+qs(c.itemNameLabel)+", nounSingular: "+qs(sg)+" }),","name: textUI('Name'),"],["name: textSchema,"],["name"],null,"    ")+"\n  }),");
      c.pages.forEach((p,j)=>{
        const r=custom(p,"item",{plural:kebab(pl)});
        lines.push("  "+camel(sg+" page "+(j+1)+" "+p.title)+": pageBuilder.itemPage({\n"+body(r.path,p.title,r.ui,r.props,r.req,r.dp,"    ")+"\n  }),");
      });
      lines.push("}));\n");
      lines.push("const "+name+" = {\n  title: "+qs(c.title)+",\n  pages: "+name+"Pages,\n};");
      out.push(lines.join("\n"));
    }
  });
  const head="// Starting point generated by the VADS Form Builder.\n// Check each import against the web-component patterns catalog before you ship.\nimport {\n"+[...used].sort().map(n=>"  "+n+",").join("\n")+"\n} from 'platform/forms-system/src/js/web-component-patterns';\n";
  const tail="\nexport const formConfigChapters = {\n"+m.chapters.map((c,i)=>"  chapter"+(i+1)+",").join("\n")+"\n};\n";
  return head+"\n"+out.join("\n\n")+"\n"+tail;
}

function renderFCode(){
  document.querySelectorAll("[data-ftab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.ftab===FS.tab)));
  const body=$("#fcode-body");body.innerHTML="";
  const pre=document.createElement("pre");
  try{pre.textContent=FS.tab==="json"?JSON.stringify(toEngine(FS.m),null,2):genCode(FS.m)}
  catch(e){pre.textContent="Couldn’t build this view from the current form. Check the fields for empty names."}
  body.append(pre);
}

/* ---------- Generate / refine ---------- */
function setFBusy(b){
  FS.busy=b;$("#fgen").disabled=b||!sample;$("#frefine-go").disabled=b||!sample;$("#fstop").hidden=!b;$("#f-veil").hidden=!b;
}
async function fRun(text,base){
  if(!sample||FS.busy||!text.trim())return;
  FS.ctl=new AbortController();setFBusy(true);
  fstatus("Thinking. A full form usually takes 40 to 90 seconds.",{live:true});
  try{
    const out=await sample.json(fBuildPrompt(text.trim(),base),{signal:FS.ctl.signal,cache:false,
      onText:({text:t})=>fstatus("Writing form… "+(t.length/1000).toFixed(1)+"k characters",{live:true})});
    snap();
    FS.m=normForm(out,base?(base.prompt+" → "+text.trim()):text.trim());
    if(!base){FS.ans={};FS.sel="intro"}
    validSel();FS.step=stepForSel(FS.sel);
    renderForms();saveDraft();
    fstatus(base?"Updated. Keep refining here or edit the pages directly.":"Done. Click through the preview, or edit any page in the outline.");
  }catch(e){
    const c=e&&e.code;
    if(c==="cancelled")fstatus("Stopped.");
    else{fstatus(ERR[c]||"Something went wrong reaching Claude. Try again.",{err:true});if(c==="not_granted"||c==="sampling_disabled"){sample=null}}
  }finally{setFBusy(false)}
}

/* ---------- Wiring ---------- */
$("#fgen").onclick=()=>fRun($("#fprompt").value);
$("#fprompt").addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey))fRun($("#fprompt").value)});
$("#fstop").onclick=()=>FS.ctl&&FS.ctl.abort();
$("#frefine-go").onclick=()=>{const v=$("#frefine").value;if(v.trim()){fRun(v,FS.m);$("#frefine").value=""}};
$("#frefine").addEventListener("keydown",e=>{if(e.key==="Enter")$("#frefine-go").click()});
document.querySelectorAll("[data-fp]").forEach(c=>c.onclick=()=>{$("#fprompt").value=c.dataset.fp;$("#fprompt").focus()});
document.querySelectorAll("[data-ftab]").forEach(b=>b.onclick=()=>{FS.tab=b.dataset.ftab;renderFCode()});
$("#fcopy").onclick=async()=>{
  const pre=$("#fcode-body pre");const txt=pre?pre.textContent:"";
  try{await navigator.clipboard.writeText(txt);toast("Copied")}
  catch(e){if(pre){const r=document.createRange();r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);toast("Selected. Press Ctrl+C or Cmd+C to copy.")}}
};
$("#f-restart").onclick=()=>{FS.ans={};FS.sel="intro";FS.step="intro";renderOutline();renderInspector();renderFrame();saveDraft()};
$("#f-mobile").onclick=e=>{FS.mobile=!FS.mobile;e.currentTarget.setAttribute("aria-pressed",String(FS.mobile));$("#f-wrap").classList.toggle("mobile",FS.mobile);setTimeout(renderFrame,340)};
$("#f-example").onclick=()=>{snap();FS.m=exampleForm();FS.ans={};FS.sel="intro";FS.step="intro";renderForms();saveDraft();toast("Example form loaded")};
$("#f-undo").onclick=()=>{
  const s=FS.hist.pop();if(!s)return;
  FS.m=JSON.parse(s);$("#f-undo").disabled=!FS.hist.length;afterStruct();toast("Undone");
};
function onFormMsg(d){
  if(d.set){FS.ans[d.set[0]]=d.set[1];saveDraft()}
  if(d.go){
    FS.step=d.go;FS.sel=mapStepToSel(d.go);validSel();renderOutline();renderInspector();
    const r=$("#f-wrap").getBoundingClientRect();if(r.top<70)window.scrollBy({top:r.top-84,behavior:"smooth"});
  }
}
try{new ResizeObserver(()=>{const h=$("#f-host");$("#f-dims").textContent=Math.round(h.clientWidth)+" \u00d7 "+Math.round(h.clientHeight)}).observe($("#f-host"))}catch(e){}
const REF_USAGE={"P":[["Shared platform code",null,"src/platform"],["Authenticated Experience Design Patterns","/mock-form-ae-design-patterns","src/applications/_mock-form-ae-design-patterns"],["Apply For DIC, Survivors Pension, Or Accrued Benefits Online","/family-and-caregiver-benefits/survivor-compensation/apply-for-dic-survivors-pension-accrued-benefits-form-21p-534ez","src/applications/survivors-benefits"],["21-527EZ pension benefits form","/pension/apply-for-veteran-pension-form-21p-527ez","src/applications/pensions"],["21-526EZ disability compensation claim form","/disability/file-disability-claim-form-21-526ez","src/applications/disability-benefits/all-claims"],["Static pages",null,"src/applications/static-pages"],["My Education Benefits","/education/apply-for-gi-bill-form-22-1990","src/applications/my-education-benefits"],["Appointments","/my-health/appointments","src/applications/vaos"],["1010ez Health Care Application form","/health-care/apply-for-health-care-form-10-10ez","src/applications/hca"],["Travel Pay","/my-health/travel-pay","src/applications/travel-pay"],["MHV Medications","/my-health/medications","src/applications/mhv-medications"],["Financial Status Report","/manage-va-debt/request-debt-help-form-5655","src/applications/financial-management/financial-status-report"],["21P-0969 Income and Asset Statement Form","/supporting-forms-for-claims/submit-income-and-asset-statement-form-21p-0969","src/applications/income-and-asset-statement"],["VA Profile","/profile","src/applications/personalization/profile"],["Survivor and Dependent Benefits 22-5490","/family-and-caregiver-benefits/education-and-careers/apply-for-dea-fry-form-22-5490","src/applications/survivor-dependent-education-benefit/22-5490"],["10-10EZR Update health benefits info form","/my-health/update-benefits-information-form-10-10ezr","src/applications/ezr"],["Accredited Representative Portal","/representative","src/applications/accredited-representative-portal"],["Apply to use transferred education benefits","/family-and-caregiver-benefits/education-and-careers/transferred-gi-bill-benefits/apply-form-22-1990e","src/applications/toe"],["10297","/education/other-va-education-benefits/vet-tec-2/apply-for-program-form-22-10297","src/applications/edu-benefits/10297"],["Dashboard","/my-va","src/applications/personalization/dashboard"],["1330M Apply for a medallion in a private cemetery","/burials-memorials/memorial-items/headstones-markers-medallions/request-medallion-form-40-1330m","src/applications/medallions"],["GI Bill Comparison Tool","/education/gi-bill-comparison-tool","src/applications/gi"],["MHV Medical Records","/my-health/medical-records","src/applications/mhv-medical-records"],["Apply for burial in a VA national cemetery","/burials-and-memorials/time-of-need","src/applications/time-of-need"],["Claims Status","/track-claims","src/applications/claims-status"],["Ask VA","/contact-us/ask-va","src/applications/ask-va"],["File a Supplemental Claim","/decision-reviews/supplemental-claim/file-supplemental-claim-form-20-0995","src/applications/appeals/995"],["21P-530EZ Burials benefits form","/burials-memorials/veterans-burial-allowance/apply-for-allowance-form-21p-530ez","src/applications/burials-ez"],["Request Help From A VA Accredited Representative Or VSO","/get-help-from-accredited-representative/appoint-rep","src/applications/representative-appoint"],["MHV Secure Messaging","/my-health/secure-messages","src/applications/mhv-secure-messaging"],["Representative Form Upload","/representative/representative-form-upload","src/applications/representative-form-upload"],["21a Apply to become a VA-accredited attorney or claims agent","/representative/accreditation/attorney-claims-agent-form-21a","src/applications/accreditation/21a"],["Submit Medical Expenses To Support A Pension or DIC Claim","/supporting-forms-for-claims/submit-medical-expense-report-form-21p-8416","src/applications/medical-expense-report"],["Debt and bills","/manage-va-debt/summary","src/applications/combined-debt-portal/combined"],["40-10007 pre need burial planning form","/burials-memorials/pre-need-eligibility/apply-for-eligibility-form-40-10007","src/applications/pre-need-integration"],["10-10CG","/family-and-caregiver-benefits/health-and-disability/comprehensive-assistance-for-family-caregivers/apply-form-10-10cg","src/applications/caregivers"],["0839","/school-administrators/submit-yellow-ribbon-program-agreement-form-22-0839","src/applications/edu-benefits/0839"],["Apply for additional compensation based on inability to work","/disability/eligibility/special-claims/unemployability/apply-unemployability-compensation-form-21-8940","src/applications/benefits-optimization-pingwind/21-8940"],["21-0538 Dependents verification","/manage-dependents/verify-dependents-form-21-0538","src/applications/dependents/dependents-verification"],["Verify Your Enrollment","/education/verify-school-enrollment/mgib-enrollments","src/applications/verify-your-enrollment"],["Request priority processing for an existing claim online","/forms/20-10207/request-priority-processing","src/applications/simple-forms/20-10207"],["10-10d Extended","/forms/10-10d/apply-champva-benefits","src/applications/ivc-champva/10-10d-extended"],["Program Apporval in a Foreign Country (VA Form 22-0976)","/school-administrators/apply-for-approval-program-in-foreign-country-form-22-0976","src/applications/edu-benefits/0976"],["Fry/DEA — VA Education Benefits For Survivors And Dependents","/fry-dea","src/applications/fry-dea"],["22-10215 Statement of Assurance of Compliance with 95 Percent Enrollment Ratios","/school-administrators/85-15-rule-enrollment-ratio","src/applications/edu-benefits/10215"],["Designation Of Certifying Official(S)","/school-administrators/update-certifying-officials","src/applications/edu-benefits/8794"],["22-0803 Request for reimbursement of licensing or certification test fees","/forms/22-0803/request-reimbursement-licensing-or-certification-test-fees","src/applications/edu-benefits/0803"],["Conflicting Interests Certification For Proprietary Schools","/school-administrators/report-conflicting-interests","src/applications/edu-benefits/1919"],["Apply for Certificate of Eligibility","/housing-assistance/home-loans/request-coe-form-26-1880","src/applications/lgy/coe/form"],["Request for Higher-Level Review","/decision-reviews/higher-level-review/request-higher-level-review-form-20-0996","src/applications/appeals/996"],["Simple Forms Patterns","/mock-simple-forms-patterns","src/applications/simple-forms/mock-simple-forms-patterns"],["Apply for Personalized Career Planning and Guidance with VA Form 25-8832","/careers-employment/education-and-career-counseling/apply-career-guidance-form-25-8832","src/applications/vre/25-8832"],["40-10007 pre need burial planning form","/burials-and-memorials/pre-need/form-10007-apply-for-eligibility","src/applications/pre-need"],["21-2680 House Bound Status","/pension/aid-attendance-housebound/apply-form-21-2680","src/applications/benefits-optimization-aquia/21-2680-house-bound-status"],["My HealtheVet on VA.gov","/my-health","src/applications/mhv-landing-page"],["Application for Accrued Amounts Due a Deceased Beneficiary","/family-and-caregiver-benefits/survivor-compensation/apply-for-accrued-benefits-form-21p-601","src/applications/simple-forms/21P-601"],["Discharge Wizard","/discharge-upgrade-instructions","src/applications/discharge-wizard"],["Order hearing aid or CPAP supplies","/health-care/order-hearing-aid-or-CPAP-supplies-form","src/applications/health-care-supply-reordering"],["35% exemption of the routine reporting","/school-administrators/35-percent-exemption","src/applications/edu-benefits/10216"],["Facility Locator","/find-locations","src/applications/facility-locator"],["View Dependents","/manage-dependents/view","src/applications/dependents/view-dependents"],["Track your VR&E benefits","/careers-employment/track-your-vre-benefits/vre-benefit-status","src/applications/vre/track-your-vre-benefits"],["Request a Board Appeal","/decision-reviews/board-appeal/request-board-appeal-form-10182","src/applications/appeals/10182"],["File a CHAMPVA claim","/forms/10-7959a/file-champva-claim","src/applications/ivc-champva/10-7959a"],["Letters","/records/download-va-letters/letters","src/applications/letters"],["22-0989 Request education benefit entitlement restoration online","/forms/22-0989/request-entitlement-restoration","src/applications/edu-benefits/0989"],["Income Limits","/health-care/income-limits","src/applications/income-limits"],["21-4192 Employment Information","/disability/eligibility/special-claims/unemployability/submit-employment-information-form-21-4192","src/applications/benefits-optimization-aquia/21-4192-employment-information"],["Request Licensing or Certification Test Prep Course Fees Reimbursement Online","/forms/22-10272/request-prep-course-reimbursement","src/applications/edu-benefits/10272"],["Connect Your Device","/health-care/connected-devices","src/applications/dhp-connected-devices"],["VASS","/service-member-benefits/solid-start/schedule","src/applications/vass"],["Request National Exam Fee Reimbursement Online","/forms/22-0810/request-reimbursement-national-exam-fee","src/applications/edu-benefits/0810"],["686C-674-v2","/manage-dependents/add-remove-form-21-686c-674","src/applications/dependents/686c-674"],["21P-530a Interment Allowance","/forms/21p-530a/submit-state-interment-allowance-request","src/applications/benefits-optimization-aquia/21p-530a-interment-allowance"],["Login Page","/sign-in","src/applications/login"],["10275","/school-administrators/commit-principles-of-excellence-form-22-10275","src/applications/edu-benefits/10275"],["Submit an intent to file online","/forms/21-0966/submit-intent-to-file","src/applications/simple-forms/21-0966"],["Authorize VA to Disclose Personal Information to a Third Party for Education Benefits","/education/disclose-information-to-third-party/authorize-disclosure-form-22-10278","src/applications/edu-benefits/10278"],["Submit a statement to support a claim","/supporting-forms-for-claims/submit-statement-form-21-4138","src/applications/simple-forms/21-4138"],["Dispute your VA debt","/manage-va-debt/dispute-debt","src/applications/financial-management/dispute-debt"],["Enrollment Verification","/education/verify-school-enrollment/enrollment-verifications","src/applications/enrollment-verification"],["Virtual Agent","/contact-us/virtual-agent","src/applications/virtual-agent"],["Resources for schools","/school-administrators","src/applications/sco"],["Submit alternate signer certification online","/forms/21-0972/submit-alternate-signer-certification","src/applications/simple-forms/21-0972"],["Apply for automobile or adaptive equipment online","/forms/21-4502/apply-automobile-and-adaptive-equipment","src/applications/benefits-optimization-pingwind/21-4502"],["Apply for apportionment of a beneficiary’s award online","/forms/21-0788/apply-for-apportionment-beneficiarys-award","src/applications/benefits-optimization-pingwind/21-0788"],["Decision Reviews Onramp Tool","/decision-reviews/explore-disability-claim-options","src/applications/appeals/onramp"],["10-7959C CHAMPVA Other Health Insurance Certification form","/forms/10-7959c/submit-other-health-insurance-information-champva","src/applications/ivc-champva/10-7959C"],["Order medical supplies","/my-health/order-medical-supplies","src/applications/mhv-supply-reordering"],["21-0779 Nursing Home Information","/supporting-forms-for-claims/submit-nursing-home-information-form-21-0779","src/applications/benefits-optimization-aquia/21-0779-nursing-home-information"],["Your VA home loan COE","/housing-assistance/home-loans/check-coe-status/your-coe","src/applications/lgy/coe/status"],["28-1900 Veteran Readiness","/careers-employment/vocational-rehabilitation/apply-vre-form-28-1900","src/applications/vre/28-1900"],["Request a Presidential Memorial Certificate","/burials-memorials/memorial-items/presidential-memorial-certificates/request-certificate-form-40-0247","src/applications/simple-forms/40-0247"],["Discover Your Benefits","/discover-your-benefits","src/applications/discover-your-benefits"],["View Payments","/va-payment-history/payments","src/applications/financial-management/view-payments"],["22-1995 Education benefits form","/education/apply-for-education-benefits/application/1995","src/applications/edu-benefits/1995"],["VRE CH31 Eligibility & Entitlement","/careers-employment/your-vre-eligibility","src/applications/vre/ch31-eligibility-entitlement"],["Find a VA accredited representative or VSO","/get-help-from-accredited-representative/find-rep","src/applications/representative-search"],["Search","/search","src/applications/search"],["Mock Form Patterns","/mock-form-patterns","src/applications/simple-forms/mock-simple-forms-patterns-v3"],["File a Foreign Medical Program (FMP) claim","/forms/10-7959f-2/file-foreign-medical-program-claim","src/applications/ivc-champva/10-7959f-2"],["Authorize VA to share your information with a third party online","/forms/21-0845/authorize-third-party-information-sharing","src/applications/simple-forms/21-0845"],["VA online services terms of use","/terms-of-use","src/applications/terms-of-use"],["Authorize the release of non-VA medical information to VA online","/forms/21-4142/authorize-release-medical-information-to-va","src/applications/simple-forms/21-4142"],["Rated Disabilities","/disability/view-disability-rating/rating","src/applications/rated-disabilities"],["Apply for Annual Clothing Allowance","/forms/10-8678/apply-annual-clothing-allowance","src/applications/benefits-optimization-pingwind/10-8678"],["Post 9/11 GI Bill Status","/education/check-remaining-post-9-11-gi-bill-benefits/status","src/applications/post-911-gib-status"],["22-10282 IBM Skillsbuild Training Program Intake Application","/education/other-va-education-benefits/ibm-skillsbuild-program/apply-form-22-10282","src/applications/edu-benefits/10282"],["Marital Status Questionnaire (21P-0537)","/family-and-caregiver-benefits/survivor-compensation/dependency-indemnity-compensation/verify-marital-status-21p-0537","src/applications/simple-forms/21p-0537"],["26-4555 Application in Acquiring Specially Adapted Housing or Special Home Adaptation Grant","/housing-assistance/disability-housing-grants/apply-for-grant-form-26-4555","src/applications/simple-forms/26-4555"],["check-in","/health-care/appointment-check-in","src/applications/check-in/day-of"],["After Visit Summary","/my-health/medical-records/summaries-and-notes/visit-summary","src/applications/avs"],["Travel Claim","/my-health/appointment-travel-claim","src/applications/check-in/travel-claim"],["Submit Employment Questionnaire","/disability/verify-individual-unemployability-status/submit-employment-questionnaire-form-21-4140","src/applications/simple-forms/21-4140"],["Authentication callback","/auth/login/callback","src/applications/auth"],["Personalized Career Planning and Guidance/Chapter 36 (VA Form 27-8832)","/temporary/apply-career-guidance-form-27-8832","src/applications/new-chapter-36-form"],["Education Letters","/education/download-letters/letters","src/applications/education-letters"],["Demo: File for disability compensation - Conditions","/user-testing/conditions","src/applications/user-testing/disability-benefits-all-claims-conditions-chapter"],["1330M2 Apply for a medallion in a private cemetery","/burials-memorials/memorial-items/headstones-markers-medallions-approver/request-medallion-form-40-1330m2","src/applications/medallions2"],["Appoint a representative from Representation Requests","/representative/representation-requests/appoint-rep","src/applications/representative-appoint-rep-initiated"],["PACT Act","/pact-act-eligibility","src/applications/pact-act"],["Submit a lay or witness statement to support a VA claim","/supporting-forms-for-claims/lay-witness-statement-form-21-10210","src/applications/simple-forms/21-10210"],["Contact Us","/ask-a-question","src/applications/ask-a-question"],["Your Recommended Benefits","/my-va/recommended-benefits","src/applications/your-recommended-benefits"],["Resources and support","/resources/search","src/applications/resources-and-support"],["Submitted Appeals view & download","/decision-reviews/test-download","src/applications/appeals/testing/download"],["Request personal records online","/forms/20-10206/request-personal-records","src/applications/simple-forms/20-10206"],["Form Upload","/forms/upload","src/applications/simple-forms/form-upload"],["Mock form minimal header","/mock-form-minimal-header","src/applications/simple-forms/mock-form-minimal-header"],["Veteran ID Card V1","/records/get-veteran-id-cards/apply","src/applications/veteran-id-card"],["GI Bill School Feedback Tool","/education/submit-school-feedback","src/applications/edu-benefits/feedback-tool"],["Pre-check-in","/health-care/appointment-pre-check-in","src/applications/check-in/pre-check-in"],["form-renderer","/my-va/submissions","src/applications/personalization/form-renderer"],["Mock Form","/mock-form","src/applications/_mock-form"],["22-0994 Education benefits form","/education/about-gi-bill-benefits/how-to-use-benefits/vettec-high-tech-program/apply-for-vettec-form-22-0994","src/applications/edu-benefits/0994"],["Request to be a substitute claimant online","/forms/21p-0847/request-substitute-claimant","src/applications/simple-forms/21P-0847"],["22-10203 Education benefits form","/education/other-va-education-benefits/stem-scholarship/apply-for-scholarship-form-22-10203","src/applications/edu-benefits/10203"],["Yellow Ribbon Schools","/education/yellow-ribbon-participating-schools","src/applications/yellow-ribbon"],["Welcome VA Setup Review Information Form","/my-va/welcome-va-setup","src/applications/personalization/review-information"],["sign-in-health-portal","/sign-in-health-portal","src/applications/sign-in-health-portal"],["Travel Pay Caregiver Claims","/health-care/file-travel-pay-reimbursement/caregiver-claims","src/applications/travel-pay/caregiver"],["Mock Form with Prefill","/mock-form-prefill","src/applications/simple-forms/mock-form-prefill"],["DS V3 Playground","/ds-v3-playground","src/applications/ds-v3-playground"],["Verify identity","/verify","src/applications/verify"],["Mock SIP Form","/mock-sip-form","src/applications/mock-sip-form"],["All VA offices","/office-directory","src/applications/office-directory"],["Travel Pay","/my-va/payments/travel-pay","src/applications/travel-pay/travel-pay-veterans"],["COVID-19 Screener","/covid19screen","src/applications/coronavirus-screener"]],"C":{"link":{"u":1299,"d":1299,"l":0,"n":107,"r":[[2,75,0],[5,61,0],[7,58,0],[0,55,0],[6,51,0],[9,48,0],[14,40,0],[19,37,0],[8,36,0],[17,35,0],[13,31,0],[4,30,0],[33,28,0],[16,26,0],[3,25,0],[26,24,0],[18,23,0],[24,22,0],[21,21,0],[32,19,0]]},"alert":{"u":877,"d":877,"l":0,"n":106,"r":[[0,88,0],[1,69,0],[6,28,0],[4,26,0],[20,24,0],[19,23,0],[14,22,0],[17,21,0],[9,20,0],[22,20,0],[16,19,0],[18,19,0],[13,18,0],[7,17,0],[11,17,0],[29,17,0],[30,17,0],[57,16,0],[3,14,0],[24,14,0]]},"text-input":{"u":870,"d":39,"l":831,"n":93,"r":[[0,1,107],[2,1,53],[3,1,49],[23,1,38],[12,2,33],[15,0,31],[37,0,22],[1,1,19],[8,0,19],[31,0,19],[35,0,19],[36,0,18],[27,0,17],[42,0,17],[20,3,13],[30,0,16],[32,0,16],[55,0,15],[11,13,0],[50,0,13]]},"radio":{"u":803,"d":105,"l":698,"n":78,"r":[[0,9,103],[3,0,68],[12,0,57],[2,3,52],[4,6,33],[11,18,8],[8,0,24],[15,0,20],[1,0,18],[25,4,14],[37,0,16],[23,0,15],[27,0,15],[9,14,0],[50,0,14],[18,0,12],[20,2,10],[26,5,6],[28,4,7],[51,5,6]]},"telephone":{"u":802,"d":802,"l":0,"n":105,"r":[[0,78,0],[13,45,0],[1,39,0],[8,25,0],[22,25,0],[10,23,0],[11,22,0],[33,22,0],[5,21,0],[24,20,0],[9,18,0],[54,16,0],[3,14,0],[4,14,0],[38,13,0],[35,12,0],[70,12,0],[15,11,0],[79,11,0],[6,10,0]]},"memorable-date":{"u":401,"d":4,"l":397,"n":69,"r":[[0,0,91],[3,0,23],[4,1,22],[1,0,20],[2,0,20],[15,0,16],[37,0,15],[8,0,14],[40,0,10],[23,1,7],[50,0,8],[12,0,7],[30,0,7],[27,0,6],[43,0,5],[73,0,5],[84,0,5],[14,0,4],[25,0,4],[32,0,4]]},"button":{"u":400,"d":400,"l":0,"n":83,"r":[[0,59,0],[1,21,0],[29,20,0],[6,18,0],[5,15,0],[17,15,0],[14,13,0],[20,13,0],[7,10,0],[18,10,0],[26,10,0],[38,9,0],[11,8,0],[39,8,0],[88,8,0],[2,7,0],[13,7,0],[16,6,0],[22,6,0],[70,6,0]]},"additional-info":{"u":381,"d":381,"l":0,"n":84,"r":[[0,38,0],[1,25,0],[11,23,0],[4,14,0],[10,14,0],[2,13,0],[6,13,0],[40,13,0],[5,10,0],[39,10,0],[17,9,0],[23,9,0],[34,9,0],[3,8,0],[14,8,0],[52,8,0],[7,7,0],[12,7,0],[21,7,0],[43,7,0]]},"loading-indicator":{"u":371,"d":371,"l":0,"n":98,"r":[[5,42,0],[0,35,0],[7,29,0],[9,15,0],[10,14,0],[1,11,0],[13,10,0],[21,10,0],[24,10,0],[25,9,0],[19,8,0],[4,7,0],[54,7,0],[22,5,0],[28,5,0],[39,5,0],[60,5,0],[3,4,0],[8,4,0],[17,4,0]]},"process-list":{"u":368,"d":368,"l":0,"n":57,"r":[[10,42,0],[46,14,0],[1,12,0],[18,12,0],[53,11,0],[31,10,0],[30,9,0],[42,9,0],[6,8,0],[11,8,0],[26,8,0],[36,8,0],[44,8,0],[45,8,0],[47,8,0],[62,8,0],[0,7,0],[9,7,0],[14,7,0],[56,7,0]]},"accordion":{"u":346,"d":346,"l":0,"n":56,"r":[[16,25,0],[0,20,0],[2,19,0],[4,17,0],[69,17,0],[83,15,0],[28,12,0],[82,11,0],[5,10,0],[21,10,0],[56,10,0],[3,9,0],[18,9,0],[26,9,0],[24,7,0],[29,7,0],[44,7,0],[46,6,0],[57,6,0],[58,6,0]]},"icon":{"u":268,"d":268,"l":0,"n":49,"r":[[0,35,0],[21,32,0],[1,24,0],[29,13,0],[16,11,0],[19,9,0],[43,9,0],[10,8,0],[25,8,0],[28,8,0],[6,7,0],[7,7,0],[54,7,0],[80,7,0],[14,6,0],[22,6,0],[39,6,0],[9,5,0],[98,5,0],[31,4,0]]}},"M":{"0":[55,88,108,112,78,91,59,38,35,7,20,35],"1":[14,69,20,18,39,20,21,25,11,12,2,24],"2":[75,10,54,55,6,20,7,13,2,5,19,2],"3":[25,14,50,68,14,23,2,8,4,4,9,0],"4":[30,26,11,39,14,23,2,14,7,5,17,2],"5":[61,13,0,0,21,0,15,10,42,0,10,3],"6":[51,28,3,6,10,0,18,13,1,8,5,7],"7":[58,17,1,4,10,0,10,7,29,0,3,7],"8":[36,11,19,24,25,14,3,5,4,4,0,0],"9":[48,20,1,14,18,0,3,0,15,7,5,5],"10":[16,12,0,0,23,0,0,14,14,42,1,8],"11":[7,17,13,26,22,0,8,23,3,8,2,0],"12":[8,4,35,57,1,7,0,7,3,0,5,0],"13":[31,18,0,0,45,0,7,0,10,3,5,2],"14":[40,22,3,3,2,4,13,8,1,7,2,6],"15":[10,11,31,20,11,16,1,4,2,0,0,1],"16":[26,19,2,0,4,0,6,3,2,3,25,11],"17":[35,21,3,4,2,1,15,9,4,4,0,1],"18":[23,19,3,12,2,1,10,6,1,12,9,0],"19":[37,23,0,0,10,0,5,0,8,0,4,9],"20":[7,24,16,12,5,2,13,2,4,5,2,0],"21":[21,7,0,0,4,0,1,7,10,0,10,32],"22":[18,20,0,2,25,0,6,5,5,0,3,6],"23":[1,1,39,15,4,8,0,9,0,5,2,0],"24":[22,14,0,0,20,0,4,2,10,2,7,3],"25":[5,14,9,18,10,4,4,0,9,0,2,8],"26":[24,5,4,11,9,1,10,0,2,8,9,0],"27":[18,4,17,15,10,6,1,2,3,4,0,0],"28":[6,4,11,11,7,2,3,3,5,4,12,8],"29":[5,17,3,0,2,0,20,2,1,0,7,13],"30":[7,17,16,2,2,7,1,0,2,9,0,1],"31":[11,8,19,8,0,3,1,0,0,10,0,4],"32":[19,2,16,9,4,4,0,5,0,4,0,0],"33":[28,5,0,0,22,0,0,0,4,0,0,4],"34":[5,12,5,4,9,3,4,9,4,0,4,3],"35":[4,5,19,7,12,0,3,5,3,4,0,0],"36":[17,3,18,5,0,1,1,2,2,8,3,0],"37":[4,0,22,16,0,15,0,0,0,0,0,0],"38":[8,8,3,2,13,0,9,2,2,5,2,0],"39":[5,13,1,0,6,0,8,10,5,0,0,6],"40":[10,0,7,7,6,10,0,13,1,0,0,0],"41":[12,8,10,2,6,4,1,2,2,4,0,0],"42":[6,2,17,8,0,2,0,2,1,9,3,0],"43":[0,12,3,1,8,5,0,7,1,4,0,9],"44":[15,3,9,0,0,2,1,2,1,8,7,0],"45":[9,5,12,3,0,2,1,2,1,8,3,2],"46":[12,2,4,2,2,1,1,1,0,14,6,1],"47":[7,3,12,4,0,0,1,5,1,8,3,0],"48":[6,6,2,8,10,3,1,0,1,4,3,0],"49":[18,0,1,9,5,0,4,0,1,4,0,0],"50":[0,0,13,14,0,8,1,3,0,0,0,0],"51":[2,2,9,11,7,3,2,0,2,0,0,0],"52":[0,7,1,1,7,4,5,8,0,0,4,1],"53":[0,5,6,3,2,3,2,1,1,11,3,0],"54":[4,2,0,0,16,0,0,0,7,0,0,7],"55":[5,2,15,9,2,3,0,0,0,0,0,0],"56":[11,2,0,0,2,0,3,0,0,7,10,0],"57":[0,16,2,0,6,0,1,3,1,0,6,0],"58":[10,4,6,0,0,2,1,0,1,4,6,0],"59":[10,10,0,0,7,0,3,0,2,0,0,2],"60":[8,8,0,0,8,0,4,0,5,0,0,1],"61":[14,5,0,0,5,0,1,0,2,0,4,0],"62":[7,1,0,7,4,0,1,0,1,8,2,0],"63":[12,3,0,0,9,0,1,5,1,0,0,0],"64":[6,9,0,0,10,0,0,0,3,0,3,0],"65":[0,1,4,10,2,3,1,0,0,5,3,1],"66":[14,2,0,0,2,0,2,1,2,0,6,0],"67":[2,1,8,4,4,4,0,0,2,4,0,0],"68":[6,0,6,3,2,2,0,1,0,5,3,1],"69":[1,2,0,0,5,0,0,1,3,0,17,0],"70":[1,6,2,0,12,0,6,0,1,0,0,0],"71":[7,0,4,2,4,1,0,1,0,5,3,1],"72":[10,2,0,0,4,0,1,1,3,7,0,0],"73":[2,3,8,0,2,5,0,0,2,5,0,0],"74":[15,3,1,0,2,0,3,0,3,0,0,0],"75":[3,1,10,4,0,1,1,2,2,0,3,0],"76":[1,2,2,10,1,4,1,5,1,0,0,0],"77":[3,0,13,3,2,2,0,1,0,0,3,0],"78":[9,3,3,4,2,2,0,2,1,0,0,0],"79":[3,3,0,0,11,0,5,1,2,0,0,0],"80":[0,8,0,2,3,0,1,2,1,0,0,7],"81":[1,2,0,0,7,0,2,1,3,0,4,3],"82":[11,0,0,0,1,0,0,0,0,0,11,0],"83":[0,0,5,1,0,1,0,1,0,0,15,0],"84":[0,0,6,6,0,5,0,2,0,4,0,0],"85":[0,0,5,9,2,2,0,1,0,4,0,0],"86":[17,0,0,0,4,0,1,0,0,0,0,0],"87":[4,6,2,0,4,0,1,4,1,0,0,0],"88":[0,7,2,0,4,0,8,0,1,0,0,0],"89":[2,2,4,5,2,4,1,0,1,0,0,0],"90":[6,6,1,0,2,0,1,0,4,0,0,0],"91":[5,0,3,1,5,1,0,1,0,4,0,0],"92":[1,0,3,2,2,2,4,1,0,4,0,0],"93":[7,0,0,7,2,0,0,1,1,0,0,0],"94":[0,7,0,0,9,0,0,0,2,0,0,0],"95":[10,2,0,0,2,0,0,1,1,0,0,1],"96":[3,3,0,0,3,0,0,3,1,0,0,4],"97":[1,1,2,3,3,0,1,1,1,0,0,3],"98":[7,2,0,0,0,0,0,0,2,0,0,5],"99":[2,0,4,0,2,4,0,0,0,4,0,0],"100":[7,0,3,0,4,1,0,0,1,0,0,0],"101":[1,0,3,5,3,2,0,0,0,0,0,1],"102":[1,3,0,0,4,0,5,0,0,0,2,0],"103":[0,0,10,3,0,2,0,0,0,0,0,0],"104":[5,4,0,0,4,0,0,0,1,0,0,0],"105":[0,0,6,1,2,0,0,1,0,4,0,0],"106":[2,2,0,0,7,0,1,0,1,0,0,0],"107":[0,1,1,9,1,0,0,1,0,0,0,0],"108":[1,0,5,3,0,3,0,0,0,0,0,0],"109":[1,0,2,3,2,3,0,1,0,0,0,0],"110":[0,4,0,0,1,0,2,2,3,0,0,0],"111":[0,1,0,0,3,0,0,1,1,0,5,1],"112":[0,3,0,0,0,0,2,1,3,3,0,0],"113":[0,0,7,2,0,2,0,0,1,0,0,0],"114":[2,1,0,0,1,0,6,0,1,0,0,0],"115":[2,0,3,0,0,1,0,1,0,4,0,0],"116":[1,6,0,0,0,0,0,1,2,0,0,1],"117":[0,1,2,3,0,4,1,0,0,0,0,0],"118":[0,1,2,0,0,1,1,0,0,5,0,0],"119":[1,1,0,1,2,0,0,0,0,4,0,0],"120":[1,0,0,0,0,0,5,1,0,0,2,0],"121":[0,0,5,2,0,2,0,0,0,0,0,0],"122":[0,0,3,0,4,2,0,0,0,0,0,0],"123":[6,1,0,0,0,0,0,0,1,0,0,0],"124":[2,1,0,2,0,0,0,0,1,0,0,2],"125":[2,1,0,0,2,0,3,0,0,0,0,0],"126":[0,0,3,1,0,2,0,1,1,0,0,0],"127":[1,0,1,1,2,0,0,1,0,0,0,0],"128":[0,1,2,1,0,2,0,0,0,0,0,0],"129":[0,3,1,0,0,0,2,0,0,0,0,0],"130":[0,0,3,1,0,1,1,0,0,0,0,0],"131":[0,1,0,0,2,0,1,0,1,0,0,0],"132":[0,1,0,0,2,0,0,0,2,0,0,0],"133":[0,0,0,0,0,0,0,0,0,5,0,0],"134":[0,1,1,0,0,1,0,1,0,0,0,0],"135":[0,0,3,0,0,1,0,0,0,0,0,0],"136":[0,0,1,0,1,0,0,1,0,0,0,1],"137":[0,0,0,0,0,0,1,1,1,0,0,1],"138":[1,1,0,0,0,0,0,1,0,0,0,0],"139":[1,0,0,0,0,0,0,1,1,0,0,0],"140":[2,0,0,0,0,0,0,0,1,0,0,0],"141":[0,0,0,1,0,0,0,0,1,0,0,0],"142":[0,0,0,0,0,0,0,2,0,0,0,0],"143":[0,1,0,0,0,0,0,0,0,0,0,0],"144":[0,0,1,0,0,0,0,0,0,0,0,0],"145":[0,0,0,0,0,0,0,1,0,0,0,0],"146":[0,0,0,0,0,0,0,0,1,0,0,0],"147":[0,0,0,0,0,0,0,0,0,0,0,1]},"order":["link","alert","text-input","radio","telephone","memorable-date","button","additional-info","loading-indicator","process-list","accordion","icon"]};
const REF_PROPS={"va-link":{"props":[["abbr-title","string","","The title used in the abbr element."],["active","boolean","false","If `true`, the anchor text will be bolded and include a right arrow icon."],["back","boolean","false","If 'true', renders a \"back arrow\" in front of the link text"],["calendar","boolean","false","If `true`, a calendar icon will be displayed before the anchor text."],["channel","boolean","false","If `true`, a channel icon will be displayed before the anchor text."],["disable-analytics","boolean","false","If `true`, the component-library-analytics event is disabled."],["download","boolean","false","If `true`, the link will be treated as a download, and a download icon will be displayed before the anchor text."],["external","boolean","false","If 'true', will open in a new tab and will have the text \"opens in a new tab\" appended to the link text in screen reader only span"],["filename","string","","The suggested filename."],["filetype","string","","The type of the file."],["href","string","","The href attribute of the anchor."],["icon-name","string","null","The name of the icon to be displayed in the link."],["icon-size","number","3","The size variant of the icon, an integer between 3 and 9 inclusive."],["label","string","null","Adds an aria-label attribute to the link element."],["language","string","","The lang attribute for the anchor tag in the Default va-link."],["pages","number","","The number of pages of the file."],["reverse","boolean","false","If 'true', will represent the link with white text instead of blue."],["text","string","","The anchor text."],["video","boolean","false","If `true`, a video icon will be displayed before the anchor text."]],"events":["component-library-analytics"],"mat":["use","deployed"]},"va-alert":{"props":[["close-btn-aria-label","string","","Aria-label text for the close button."],["closeable","boolean","false","If `true`, a close button will be displayed."],["disable-analytics","boolean","false","If `true`, doesn't fire the CustomEvent which can be used for analytics tracking."],["full-width","boolean","false","If `true`, the alert will be full width."],["slim","boolean","false","Displays the slim variation."],["status","continue | error | info | success | warning","info","Determines the icon and border/background color."],["visible","boolean","true","If `true`, the alert will be visible."]],"events":["closeEvent","component-library-analytics","vaAlertComponentDidLoad"],"mat":["use","best_practice"]},"va-text-input":{"props":[["autocomplete","string","","Allows the browser to automatically complete the input."],["charcount","boolean","false","Whether the component should show a character count message."],["currency","boolean","false","Whether this component will be used to accept a currency value."],["enable-analytics","boolean","false","Emit component-library-analytics events on the blur event."],["error","string","","The error message to render."],["error-has-pii","boolean","false","Adds a Datadog privacy class to the error message for cases when sensitive information is included, such as in va-statement-of-truth."],["form-heading","string","","The content of the heading if `useFormsPattern` is true."],["form-heading-level","number","3","The heading level for the heading if `useFormsPattern`is true."],["hide-required-text","boolean","false","Whether or not to show the (*Required) text."],["hint","string","","Optional hint text."],["input-icon-prefix","string","","This property displays a prefix that accepts a string which represents icon name."],["input-icon-suffix","string","","A string that represents the name of an icon passed to va-icon, which will be applied as a suffix to the input."],["input-prefix","string","","Displays a fixed prefix string at the start of the input field."],["input-suffix","string","","Displays a fixed suffix string at the end of the input field."],["inputmode","decimal | email | numeric | search | tel | t…","","The inputmode attribute."],["invalid","boolean","false","Whether or not `aria-invalid` will be set on the inner input."],["label","string","","The label for the text input."],["label-header-level","string","","Insert a header with defined level inside the label (legend)"],["max","number | string","","The max attribute specifies the maximum value for an input element if the inputmode is numeric."],["maxlength","number","","The maximum number of characters allowed in the input."],["message-aria-describedby","string","","An optional message that will be read by screen readers when the input is focused."],["min","number | string","","The min attribute specifies the minimum value for an input element if the inputmode is numeric."],["name","string","","The name to pass to the input element."],["pattern","string","","The regular expression that the input element's value is checked against on submission"],["reflect-input-error","boolean","false","Whether or not to add usa-input--error as class if error message is outside of component"],["required","boolean","false","Set the input to required and render the (Required) text."],["show-input-error","boolean","true","When `false`, hides the error message from view, but not from the screen reader."],["step","string","","The step attribute is a number, or the string 'any', that specifies the granularity of the value."],["success","boolean","false","Adds styling based on status value"],["type","email | number | password | search | tel | t…","text","The type attribute."],["use-forms-pattern","string","","Enabling this will add a heading and description for integrating into the forms pattern."],["value","string","","The value for the input."],["width","string","","Displays the input at a specific width."]],"events":["component-library-analytics","vaInput"],"mat":["use","best_practice"]},"va-radio":{"props":[["enable-analytics","boolean","false","Whether or not an analytics event will be fired."],["error","string","","A string with an error message."],["form-heading","string","","The content of the heading if `useFormsPattern` is true."],["form-heading-level","number","3","The heading level for the heading if `useFormsPattern` is true."],["header-aria-describedby","string","","An optional message that will be read by screen readers when the header is focused."],["hint","string","","Optional hint text."],["label","string","","The text label for the radio group."],["label-header-level","string","","Insert a header with defined level inside the label (legend)"],["message-aria-describedby","string","","An optional message that will be read by screen readers when a radio option is focused."],["required","boolean","false","Whether or not this input field is required."],["use-forms-pattern","string","","Enabling this will add a heading and description for integrating into the forms pattern."]],"events":["component-library-analytics","vaValueChange"],"mat":["use","best_practice"]},"va-radio-option":{"props":[["aria-describedby","string","","Optional string for the ariaDescribedBy attribute."],["checked","boolean","false","Whether or not the option is selected."],["description","string","","Description of the option displayed below the option label."],["disabled","boolean","false","Whether or not the radio option is disabled."],["label","string","","The text label for the input element."],["name","string","","The name attribute for the input element."],["tile","boolean","false","Whether or not the component will display as a tile."],["value","string","","The value attribute for the input element."]],"events":["radioOptionSelected"],"mat":[null,null]},"va-telephone":{"props":[["contact","string","","Numeric string representing the contact number."],["country-code","string","","Prepends the country code to the given contact number."],["disable-analytics","boolean","false","If `true`, doesn't fire the CustomEvent which can be used for analytics tracking."],["extension","string","","Optional numeric string phone number extension"],["international","boolean","false","Indicates if this is a number meant to be called from outside the US."],["message-aria-describedby","string","","An optional message that will be read by screen readers when the phone number is focused."],["not-clickable","boolean","false","Indicates if the phone number can be clicked or not"],["sms","boolean","false","Indicates if this is a number meant to be used to text."],["tty","boolean","false","Indicates if this is a number meant to be called from a teletypewriter for deaf users."],["vanity","string","","Optional vanity phone number."]],"events":["component-library-analytics"],"mat":["use","best_practice"]},"va-memorable-date":{"props":[["custom-day-error-message","string","","A custom error message to display if the day is invalid"],["custom-month-error-message","string","","A custom error message to display if the month is invalid"],["custom-year-error-message","string","","A custom error message to display if the year is invalid"],["enable-analytics","boolean","false","Whether or not an analytics event will be fired."],["error","string","","The error message to render (if any) This prop should be leveraged to display any custom validations needed for this component"],["external-validation","boolean","false","Set this flag to true if component will recieve external validation that might conflict  with internal validation due to race conditions, i.e."],["form-heading","string","","The content of the heading if `useFormsPattern`."],["form-heading-level","number","3","The heading level for the heading if `useFormsPattern`."],["header-aria-describedby","string","","An optional message that will be read by screen readers when the header is focused."],["hint","string","","Hint text string"],["invalid-day","boolean","false",""],["invalid-month","boolean","false",""],["invalid-year","boolean","false",""],["label","string","","Label for the field."],["label-header-level","string","","Insert a header with defined level inside the label (legend)"],["month-select","boolean","false","Whether or not to use the month as an input or select."],["name","string","","Used to create unique name attributes for each input."],["remove-date-hint","boolean","false","Removes the default date hint text"],["required","boolean","false","Render marker indicating field is required."],["use-forms-pattern","string","","Enabling this will add a heading and description for integrating into the forms pattern."],["value","string","","Set the default date value must be in YYYY-MM-DD format."],["max-year","number","","The latest year the field accepts. Defaults to the current year plus 100."],["min-year","number","","The earliest year the field accepts. Defaults to 1900."]],"events":["component-library-analytics","dateBlur","dateChange"],"mat":["use","deployed"]},"va-button":{"props":[["back","boolean","false","If `true`, the button will use `Back` as its text and an icon to represent going back in form flows."],["big","boolean","false","If `true`, the button will use the big variant."],["continue","boolean","false","If `true`, the button will use `Continue` as its text and an icon to represent proceeding forward in form flows."],["disable-analytics","boolean","false","If `true`, the component-library-analytics event is disabled."],["disabled","boolean","false","If `true`, the click event will not fire."],["full-width","boolean","false","If `true`, the button will expand to the full available width of its container."],["label","string","","The aria-label of the component."],["loading","boolean","false","If `true`, the button will appear disabled, a loading icon will show next to the text, and the click event will not fire."],["message-aria-describedby","string","","An optional message that will be read by screen readers when the input is focused."],["primary-alternate","boolean","false","If `true`, the button will use the primary alternate variant."],["secondary","boolean","false","If `true`, the button will use the secondary variant."],["submit","string","","Having this attribute present will set the [button type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit) to `submit`."],["text","string","","The text displayed on the button."]],"events":["component-library-analytics"],"mat":["use","deployed"]},"va-additional-info":{"props":[["disable-analytics","boolean","false","If `true`, doesn't fire the CustomEvent which can be used for analytics tracking."],["disable-border","boolean","false","If `true`, left blue border and padding is removed."],["trigger","string","","The text to trigger the expansion"]],"events":["component-library-analytics"],"mat":["use","best_practice"]},"va-loading-indicator":{"props":[["enable-analytics","boolean","false","Analytics tracking function(s) will be called."],["inline","boolean","false","Set to true if the loading indicator should be displayed inline"],["label","string","Loading","An aria label"],["message","string","","The message visible on screen when loading"],["set-focus","boolean","false","Set to true if the loading indicator should capture focus"]],"events":["component-library-analytics"],"mat":["use","deployed"]},"va-process-list":{"props":[],"events":[],"mat":["use","best_practice"]},"va-process-list-item":{"props":[["active","boolean","false","Whether or not the item is active"],["checkmark","boolean","false","Whether or not the item should display the checkmark icon"],["header","string","","The process list item header text"],["level","number","3","Header level for item header."],["pending","boolean","false","Whether or not the item is pending"],["status-text","string","","Text to display in the eyebrow of an item if active, pending, or checkmark is true."]],"events":[],"mat":[null,null]},"va-accordion":{"props":[["bordered","boolean","false","Whether all accordion items should display a border."],["disable-analytics","boolean","false","If `true`, doesn't fire the CustomEvent which can be used for analytics tracking."],["open-single","boolean","false","True if only a single item can be opened at once"],["section-heading","string","null","Optional accordion section heading text."]],"events":["accordionExpandCollapseAll","component-library-analytics"],"mat":["use","best_practice"]},"va-accordion-item":{"props":[["bordered","boolean","false","Whether accordion items should display a border."],["header","string","","The accordion item header text"],["header-sr-only","string","","Optional text that will be read by screen readers in addition to the header text."],["level","number","2","Header level for button wrapper."],["open","boolean","false","True if the item is open"],["subheader","string","null","Optional accordion item subheader text."]],"events":["accordionItemToggled"],"mat":[null,null]},"va-icon":{"props":[["icon","string","","The name of the icon to use"],["size","number","","The size variant of the icon, an integer between 3 and 9 inclusive"],["sprite-location","string","","The location (url) of the icon sprite file."],["srtext","string","","Screen-reader text if the icon has semantic meaning and is not purely decorative."]],"events":[],"mat":["caution","available"]}};
const REF_CSS=" html{line-height: 1.15;-webkit-text-size-adjust: 100%;}body{margin: 0;}main{display: block;}h1{font-size: 2em;margin: 0.67em 0;}hr{box-sizing: content-box;height: 0;overflow: visible;}pre{font-family: monospace,monospace;font-size: 1em;}a{background-color: transparent;}abbr[title]{border-bottom: none;text-decoration: underline;text-decoration: underline dotted;}b,strong{font-weight: bolder;}code,kbd,samp{font-family: monospace,monospace;font-size: 1em;}small{font-size: 80%;}sub,sup{font-size: 75%;line-height: 0;position: relative;vertical-align: baseline;}sub{bottom: -0.25em;}sup{top: -0.5em;}img{border-style: none;}button,input,optgroup,select,textarea{font-family: inherit;font-size: 100%;line-height: 1.15;margin: 0;}button,input{overflow: visible;}button,select{text-transform: none;}button,[type=button],[type=reset],[type=submit]{-webkit-appearance: button;}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style: none;padding: 0;}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline: 1px dotted ButtonText;}fieldset{padding: 0.35em 0.75em 0.625em;}legend{box-sizing: border-box;color: inherit;display: table;max-width: 100%;padding: 0;white-space: normal;}progress{vertical-align: baseline;}textarea{overflow: auto;}[type=checkbox],[type=radio]{box-sizing: border-box;padding: 0;}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height: auto;}[type=search]{-webkit-appearance: textfield;outline-offset: -2px;}[type=search]::-webkit-search-decoration{-webkit-appearance: none;}::-webkit-file-upload-button{-webkit-appearance: button;font: inherit;}details{display: block;}summary{display: list-item;}template{display: none;}[hidden]{display: none;}.row{max-width: 39.0625rem;}.row .row{margin: 0 -0.5859375rem;}.column,.columns{padding-left: 0.5859375rem;padding-right: 0.5859375rem;}[class*=block-grid-]{margin: 0 -0.390625rem;}[class*=block-grid-]>li{padding: 0 0.390625rem 0.78125rem;}.usa-sr-only{position: absolute;left: -999em;}.full-width{width: 100%;}.no-text-transform{text-transform: none;}.no-bottom-margin{margin-bottom: 0;}.va-button-link{background: none;background-color: transparent !important;border: 0;border-radius: 0;outline: 0;padding: 0 !important;margin: 0;text-align: left;-webkit-font-smoothing: auto;color: #005ea2 !important;font-weight: normal;text-decoration: underline;display: inline;width: auto !important;line-height: inherit;}.va-button-link:hover{background: none;border: 0;border-radius: 0;outline: 0;padding: 0 !important;color: #005ea2;text-decoration: underline;background-color: rgba(0,0,0,0.05) !important;-webkit-transition-duration: 0.3s;transition-duration: 0.3s;-webkit-transition-timing-function: ease-in-out;transition-timing-function: ease-in-out;-webkit-transition-property: color,background-color,border-color;transition-property: color,background-color,border-color;}.va-button-link:active{background: rgba(0,0,0,0.05);}.va-button-link:focus{outline: 2px solid #face00;outline-offset: 2px;outline-offset: 0;}.va-button-link:disabled{text-decoration: none;color: #aeb0b5 !important;}.dashed-underline{text-decoration: none;border-bottom: 1px dashed;}.dashed-underline:hover{text-decoration: none;border-bottom: 1px dashed;}.clickable:hover{cursor: pointer;}html{box-sizing: border-box;}*,*::before,*::after{box-sizing: inherit;}body{background-color: #ffffff;color: #1b1b1b;overflow-x: hidden;}.lt-ie9 *{filter: none !important;}[hidden]{display: none !important;}input:not([disabled]):focus,select:not([disabled]):focus,textarea:not([disabled]):focus,button:not([disabled]):focus{outline: 2px solid #face00;outline-offset: 2px;}iframe:focus,[href]:focus,[tabindex]:focus,[contentEditable=true]:focus{outline: 2px solid #face00;outline-offset: 2px;}.usa-focus{outline: 2px solid #face00;outline-offset: 2px;}.usa-button,.usa-button-primary,.usa-button:visited,.usa-button-primary:visited,button,[type=button],[type=submit],[type=reset],[type=image]{-moz-osx-font-smoothing: grayscale;-webkit-font-smoothing: antialiased;margin-top: 0.5em;margin-right: 0.5em;margin-bottom: 0.5em;appearance: none;background-color: #005ea2;border: 0;border-radius: 5px;color: #ffffff;cursor: pointer;display: inline-block;font-family: \"Source Sans 3 Web\",\"Source Sans 3\",\"Helvetica Neue\",Helvetica,Roboto,Arial,sans-serif;font-size: 16px;font-weight: 700;line-height: 1;padding: 0.625rem 1.25rem;text-align: center;text-decoration: none;width: 100%;}.usa-button:hover,.usa-button.usa-button-hover,.usa-button-primary:hover,.usa-button-primary.usa-button-hover,.usa-button:visited:hover,.usa-button:visited.usa-button-hover,.usa-button-primary:visited:hover,.usa-button-primary:visited.usa-button-hover,button:hover,button.usa-button-hover,[type=button]:hover,[type=button].usa-button-hover,[type=submit]:hover,[type=submit].usa-button-hover,[type=reset]:hover,[type=reset].usa-button-hover,[type=image]:hover,[type=image].usa-button-hover{background-color: #1a4480;border-bottom: 0;color: #ffffff;text-decoration: none;}.usa-button:active,.usa-button.usa-button-active,.usa-button-primary:active,.usa-button-primary.usa-button-active,.usa-button:visited:active,.usa-button:visited.usa-button-active,.usa-button-primary:visited:active,.usa-button-primary:visited.usa-button-active,button:active,button.usa-button-active,[type=button]:active,[type=button].usa-button-active,[type=submit]:active,[type=submit].usa-button-active,[type=reset]:active,[type=reset].usa-button-active,[type=image]:active,[type=image].usa-button-active{background-color: #162e51;}.usa-button.usa-button-secondary,.usa-button-primary.usa-button-secondary,.usa-button:visited.usa-button-secondary,.usa-button-primary:visited.usa-button-secondary,button.usa-button-secondary,[type=button].usa-button-secondary,[type=submit].usa-button-secondary,[type=reset].usa-button-secondary,[type=image].usa-button-secondary{background-color: #ffffff;box-shadow: inset 0 0 0 2px #005ea2;color: #005ea2;}.usa-button.usa-button-secondary:hover,.usa-button.usa-button-secondary.usa-button-hover,.usa-button-primary.usa-button-secondary:hover,.usa-button-primary.usa-button-secondary.usa-button-hover,.usa-button:visited.usa-button-secondary:hover,.usa-button:visited.usa-button-secondary.usa-button-hover,.usa-button-primary:visited.usa-button-secondary:hover,.usa-button-primary:visited.usa-button-secondary.usa-button-hover,button.usa-button-secondary:hover,button.usa-button-secondary.usa-button-hover,[type=button].usa-button-secondary:hover,[type=button].usa-button-secondary.usa-button-hover,[type=submit].usa-button-secondary:hover,[type=submit].usa-button-secondary.usa-button-hover,[type=reset].usa-button-secondary:hover,[type=reset].usa-button-secondary.usa-button-hover,[type=image].usa-button-secondary:hover,[type=image].usa-button-secondary.usa-button-hover{box-shadow: inset 0 0 0 2px #1a4480;color: #1a4480;}.usa-button.usa-button-secondary:active,.usa-button.usa-button-secondary.usa-button-active,.usa-button-primary.usa-button-secondary:active,.usa-button-primary.usa-button-secondary.usa-button-active,.usa-button:visited.usa-button-secondary:active,.usa-button:visited.usa-button-secondary.usa-button-active,.usa-button-primary:visited.usa-button-secondary:active,.usa-button-primary:visited.usa-button-secondary.usa-button-active,button.usa-button-secondary:active,button.usa-button-secondary.usa-button-active,[type=button].usa-button-secondary:active,[type=button].usa-button-secondary.usa-button-active,[type=submit].usa-button-secondary:active,[type=submit].usa-button-secondary.usa-button-active,[type=reset].usa-button-secondary:active,[type=reset].usa-button-secondary.usa-button-active,[type=image].usa-button-secondary:active,[type=image].usa-button-secondary.usa-button-active{box-shadow: inset 0 0 0 2px #162e51;color: #162e51;}.usa-button.usa-button-secondary-inverse,.usa-button.usa-button-outline-inverse,.usa-button-primary.usa-button-secondary-inverse,.usa-button-primary.usa-button-outline-inverse,.usa-button:visited.usa-button-secondary-inverse,.usa-button:visited.usa-button-outline-inverse,.usa-button-primary:visited.usa-button-secondary-inverse,.usa-button-primary:visited.usa-button-outline-inverse,button.usa-button-secondary-inverse,button.usa-button-outline-inverse,[type=button].usa-button-secondary-inverse,[type=button].usa-button-outline-inverse,[type=submit].usa-button-secondary-inverse,[type=submit].usa-button-outline-inverse,[type=reset].usa-button-secondary-inverse,[type=reset].usa-button-outline-inverse,[type=image].usa-button-secondary-inverse,[type=image].usa-button-outline-inverse{background: transparent;box-shadow: inset 0 0 0 2px #ffffff;color: #ffffff;}.usa-button.usa-button-secondary-inverse:hover,.usa-button.usa-button-secondary-inverse.usa-button-hover,.usa-button.usa-button-outline-inverse:hover,.usa-button.usa-button-outline-inverse.usa-button-hover,.usa-button-primary.usa-button-secondary-inverse:hover,.usa-button-primary.usa-button-secondary-inverse.usa-button-hover,.usa-button-primary.usa-button-outline-inverse:hover,.usa-button-primary.usa-button-outline-inverse.usa-button-hover,.usa-button:visited.usa-button-secondary-inverse:hover,.usa-button:visited.usa-button-secondary-inverse.usa-button-hover,.usa-button:visited.usa-button-outline-inverse:hover,.usa-button:visited.usa-button-outline-inverse.usa-button-hover,.usa-button-primary:visited.usa-button-secondary-inverse:hover,.usa-button-primary:visited.usa-button-secondary-inverse.usa-button-hover,.usa-button-primary:visited.usa-button-outline-inverse:hover,.usa-button-primary:visited.usa-button-outline-inverse.usa-button-hover,button.usa-button-secondary-inverse:hover,button.usa-button-secondary-inverse.usa-button-hover,button.usa-button-outline-inverse:hover,button.usa-button-outline-inverse.usa-button-hover,[type=button].usa-button-secondary-inverse:hover,[type=button].usa-button-secondary-inverse.usa-button-hover,[type=button].usa-button-outline-inverse:hover,[type=button].usa-button-outline-inverse.usa-button-hover,[type=submit].usa-button-secondary-inverse:hover,[type=submit].usa-button-secondary-inverse.usa-button-hover,[type=submit].usa-button-outline-inverse:hover,[type=submit].usa-button-outline-inverse.usa-button-hover,[type=reset].usa-button-secondary-inverse:hover,[type=reset].usa-button-secondary-inverse.usa-button-hover,[type=reset].usa-button-outline-inverse:hover,[type=reset].usa-button-outline-inverse.usa-button-hover,[type=image].usa-button-secondary-inverse:hover,[type=image].usa-button-secondary-inverse.usa-button-hover,[type=image].usa-button-outline-inverse:hover,[type=image].usa-button-outline-inverse.usa-button-hover{box-shadow: inset 0 0 0 2px #dfe1e2;color: #dfe1e2;}.usa-button.usa-button-secondary-inverse:active,.usa-button.usa-button-secondary-inverse.usa-button-active,.usa-button.usa-button-outline-inverse:active,.usa-button.usa-button-outline-inverse.usa-button-active,.usa-button-primary.usa-button-secondary-inverse:active,.usa-button-primary.usa-button-secondary-inverse.usa-button-active,.usa-button-primary.usa-button-outline-inverse:active,.usa-button-primary.usa-button-outline-inverse.usa-button-active,.usa-button:visited.usa-button-secondary-inverse:active,.usa-button:visited.usa-button-secondary-inverse.usa-button-active,.usa-button:visited.usa-button-outline-inverse:active,.usa-button:visited.usa-button-outline-inverse.usa-button-active,.usa-button-primary:visited.usa-button-secondary-inverse:active,.usa-button-primary:visited.usa-button-secondary-inverse.usa-button-active,.usa-button-primary:visited.usa-button-outline-inverse:active,.usa-button-primary:visited.usa-button-outline-inverse.usa-button-active,button.usa-button-secondary-inverse:active,button.usa-button-secondary-inverse.usa-button-active,button.usa-button-outline-inverse:active,button.usa-button-outline-inverse.usa-button-active,[type=button].usa-button-secondary-inverse:active,[type=button].usa-button-secondary-inverse.usa-button-active,[type=button].usa-button-outline-inverse:active,[type=button].usa-button-outline-inverse.usa-button-active,[type=submit].usa-button-secondary-inverse:active,[type=submit].usa-button-secondary-inverse.usa-button-active,[type=submit].usa-button-outline-inverse:active,[type=submit].usa-button-outline-inverse.usa-button-active,[type=reset].usa-button-secondary-inverse:active,[type=reset].usa-button-secondary-inverse.usa-button-active,[type=reset].usa-button-outline-inverse:active,[type=reset].usa-button-outline-inverse.usa-button-active,[type=image].usa-button-secondary-inverse:active,[type=image].usa-button-secondary-inverse.usa-button-active,[type=image].usa-button-outline-inverse:active,[type=image].usa-button-outline-inverse.usa-button-active{box-shadow: inset 0 0 0 2px #aeb0b5;color: #dfe1e2;}.usa-button.usa-button-big,.usa-button-primary.usa-button-big,.usa-button:visited.usa-button-big,.usa-button-primary:visited.usa-button-big,button.usa-button-big,[type=button].usa-button-big,[type=submit].usa-button-big,[type=reset].usa-button-big,[type=image].usa-button-big{border-radius: 8px;font-size: 1.5rem;padding: 0.9375rem 1.875rem;}.usa-button:disabled,.usa-button-primary:disabled,.usa-button:visited:disabled,.usa-button-primary:visited:disabled,button:disabled,[type=button]:disabled,[type=submit]:disabled,[type=reset]:disabled,[type=image]:disabled{background-color: #dfe1e2;pointer-events: none;}.usa-button:disabled:hover,.usa-button:disabled.usa-button-hover,.usa-button:disabled:active,.usa-button:disabled.usa-button-active,.usa-button:disabled:focus,.usa-button:disabled.usa-focus,.usa-button-primary:disabled:hover,.usa-button-primary:disabled.usa-button-hover,.usa-button-primary:disabled:active,.usa-button-primary:disabled.usa-button-active,.usa-button-primary:disabled:focus,.usa-button-primary:disabled.usa-focus,.usa-button:visited:disabled:hover,.usa-button:visited:disabled.usa-button-hover,.usa-button:visited:disabled:active,.usa-button:visited:disabled.usa-button-active,.usa-button:visited:disabled:focus,.usa-button:visited:disabled.usa-focus,.usa-button-primary:visited:disabled:hover,.usa-button-primary:visited:disabled.usa-button-hover,.usa-button-primary:visited:disabled:active,.usa-button-primary:visited:disabled.usa-button-active,.usa-button-primary:visited:disabled:focus,.usa-button-primary:visited:disabled.usa-focus,button:disabled:hover,button:disabled.usa-button-hover,button:disabled:active,button:disabled.usa-button-active,button:disabled:focus,button:disabled.usa-focus,[type=button]:disabled:hover,[type=button]:disabled.usa-button-hover,[type=button]:disabled:active,[type=button]:disabled.usa-button-active,[type=button]:disabled:focus,[type=button]:disabled.usa-focus,[type=submit]:disabled:hover,[type=submit]:disabled.usa-button-hover,[type=submit]:disabled:active,[type=submit]:disabled.usa-button-active,[type=submit]:disabled:focus,[type=submit]:disabled.usa-focus,[type=reset]:disabled:hover,[type=reset]:disabled.usa-button-hover,[type=reset]:disabled:active,[type=reset]:disabled.usa-button-active,[type=reset]:disabled:focus,[type=reset]:disabled.usa-focus,[type=image]:disabled:hover,[type=image]:disabled.usa-button-hover,[type=image]:disabled:active,[type=image]:disabled.usa-button-active,[type=image]:disabled:focus,[type=image]:disabled.usa-focus{background-color: #dfe1e2;border: 0;box-shadow: none;}.usa-button-disabled{background-color: #dfe1e2;pointer-events: none;}.usa-button-disabled:hover,.usa-button-disabled.usa-button-hover,.usa-button-disabled:active,.usa-button-disabled.usa-button-active,.usa-button-disabled:focus,.usa-button-disabled.usa-focus{background-color: #dfe1e2;border: 0;box-shadow: none;}.usa-button-secondary-disabled,.usa-button-secondary-inverse-disabled,.usa-button-secondary:disabled,.usa-button-secondary-inverse:disabled,.usa-button-outline-inverse:disabled{box-shadow: inset 0 0 0 2px #dfe1e2;pointer-events: none;color: #dfe1e2;}.usa-button-secondary-disabled:hover,.usa-button-secondary-disabled.usa-button-hover,.usa-button-secondary-disabled:active,.usa-button-secondary-disabled.usa-button-active,.usa-button-secondary-disabled:focus,.usa-button-secondary-disabled.usa-focus,.usa-button-secondary-inverse-disabled:hover,.usa-button-secondary-inverse-disabled.usa-button-hover,.usa-button-secondary-inverse-disabled:active,.usa-button-secondary-inverse-disabled.usa-button-active,.usa-button-secondary-inverse-disabled:focus,.usa-button-secondary-inverse-disabled.usa-focus,.usa-button-secondary:disabled:hover,.usa-button-secondary:disabled.usa-button-hover,.usa-button-secondary:disabled:active,.usa-button-secondary:disabled.usa-button-active,.usa-button-secondary:disabled:focus,.usa-button-secondary:disabled.usa-focus,.usa-button-secondary-inverse:disabled:hover,.usa-button-secondary-inverse:disabled.usa-button-hover,.usa-button-secondary-inverse:disabled:active,.usa-button-secondary-inverse:disabled.usa-button-active,.usa-button-secondary-inverse:disabled:focus,.usa-button-secondary-inverse:disabled.usa-focus,.usa-button-outline-inverse:disabled:hover,.usa-button-outline-inverse:disabled.usa-button-hover,.usa-button-outline-inverse:disabled:active,.usa-button-outline-inverse:disabled.usa-button-active,.usa-button-outline-inverse:disabled:focus,.usa-button-outline-inverse:disabled.usa-focus{background-color: #ffffff;border: 0;}html .usa-button-secondary-disabled,.usa-button-secondary:disabled{background-color: #ffffff;}html .usa-button-secondary-inverse-disabled,.usa-button-secondary-inverse:disabled{background-color: transparent;color: #5b616b;box-shadow: inset 0 0 0 2px #5b616b;}.usa-button-unstyled{background-color: transparent;border: 0;border-radius: 0;font-weight: 400;margin: 0;padding: 0;text-align: left;-webkit-font-smoothing: auto;}.usa-button-unstyled:hover{background-color: transparent;}input,textarea,select{appearance: none;border: 1px solid #5b616b;border-radius: 0;box-sizing: border-box;color: #1b1b1b;display: block;font-size: 16px;height: 42px;line-height: 1.3;margin: 0.2em 0;max-width: 460px;padding: 10px 11.2px;width: 100%;}input.usa-input-success,textarea.usa-input-success,select.usa-input-success{border: 3px solid #4aa564;}.usa-input-error{border-left: 4px solid #cd2026;margin-top: 1.875rem;padding-bottom: 0.5rem;padding-left: 0.9375rem;padding-top: 0.5rem;position: relative;right: 1.1875rem;}.usa-input-error input,.usa-input-error textarea,.usa-input-error select{border: 3px solid #cd2026;width: calc(100% + 1.1875rem);}.usa-input-error label{margin-top: 0;}.usa-input-error .usa-input-inline{border: 0.0625rem solid #5b616b;width: inherit;}.usa-input-error .usa-input-inline-error{border: 3px solid #cd2026;}.usa-input-error-label{display: block;font-size: 1rem;font-weight: 700;}.usa-input-error-message{color: #cd2026;display: block;font-size: 1rem;font-weight: 700;padding-bottom: 3px;padding-top: 3px;}.usa-input-required:after{color: #981b1e;content: \" (*required)\";}.usa-input-optional:after{color: #757575;content: \" (optional)\";}.usa-input-label-helper{color: #757575;}.usa-input-label-required{color: #981b1e;}label{display: block;margin-top: 1.875rem;max-width: 28.75rem;}textarea{height: 10rem;}select{appearance: none;background-color: #ffffff;background-image: url(~@department-of-veterans-affairs/css-library/dist/img/arrow-both.png);background-image: none,url(~@department-of-veterans-affairs/css-library/dist/img/arrow-both.svg),url(~@department-of-veterans-affairs/css-library/dist/img/arrow-both.png);background-position: right 0.8125rem center;background-repeat: no-repeat;background-size: 0.625rem;padding-right: 1.875rem;}select::-ms-expand{display: none;}select:-webkit-autofill{appearance: menulist;}select:-moz-focusring{color: transparent;text-shadow: 0 0 0 #000000;}option:first-child{font-weight: 700;}legend{font-size: 2rem;font-weight: 700;}.usa-fieldset-inputs label{margin-top: 0;}.usa-form-hint{color: #757575;font-family: \"Source Sans 3 Web\",\"Source Sans 3\",\"Helvetica Neue\",Helvetica,Roboto,Arial,sans-serif;margin-bottom: 0;}[type=checkbox],[type=radio]{position: absolute;left: -999em;}.lt-ie9 [type=checkbox],.lt-ie9 [type=radio]{border: 0;float: left;margin: 0.4em 0.4em 0 0;position: static;width: auto;}[type=checkbox] + label,[type=radio] + label{cursor: pointer;font-weight: 400;margin-bottom: 0.65em;}[type=checkbox] + label::before,[type=radio] + label::before{background: #ffffff;content: \" \";display: inline-block;text-indent: 0.15em;vertical-align: middle\\0;}[type=checkbox] + label::before{border-radius: 2px;box-shadow: 0 0 0 1px #757575;height: 1.25rem;line-height: 1.25rem;margin-left: 1px;margin-right: 0.6em;width: 1.25rem;}[type=radio] + label::before{border-radius: 100%;box-shadow: 0 0 0 2px #ffffff,0 0 0 3px #757575;height: 0.875rem;line-height: 0.875rem;margin-left: 3px;margin-right: 0.75em;width: 0.875rem;}[type=checkbox]:checked + label::before,[type=radio]:checked + label::before{background-color: #005ea2;box-shadow: 0 0 0 1px #005ea2;}[type=radio]:checked + label::before{box-shadow: 0 0 0 2px #ffffff,0 0 0 4px #005ea2;}[type=checkbox]:checked + label::before,[type=checkbox]:checked:disabled + label::before{background-image: url(~@department-of-veterans-affairs/css-library/dist/img/correct8.png);background-image: url(~@department-of-veterans-affairs/css-library/dist/img/correct8.svg);background-position: 50%;background-repeat: no-repeat;}[type=radio]:focus + label::before{outline: 2px solid #face00;outline-offset: 4px;}[type=checkbox]:disabled + label{color: #d6d7d9;}[type=checkbox]:focus + label::before{outline: 2px solid #face00;outline-offset: 2px;}[type=checkbox]:disabled + label::before,[type=radio]:disabled + label::before{background: #f1f1f1;box-shadow: 0 0 0 1px #aeb0b5;cursor: not-allowed;}[type=range]{appearance: none;border: none;padding-left: 0;overflow: hidden;width: 100%;}[type=range]:focus{outline: none;}[type=range]:focus::-webkit-slider-thumb{box-shadow: 0 0 0 2px #005ea2;}[type=range]:focus::-moz-range-thumb{box-shadow: 0 0 0 2px #005ea2;}[type=range]:focus::-ms-thumb{box-shadow: 0 0 0 2px #005ea2;}[type=range]::-webkit-slider-runnable-track{background: #d6d7d9;border: 1px solid #757575;cursor: pointer;height: 1rem;width: 100%;}[type=range]::-moz-range-track{background: #d6d7d9;border: 1px solid #757575;cursor: pointer;height: 1rem;width: 100%;}[type=range]::-ms-track{background: #d6d7d9;border: 1px solid #757575;cursor: pointer;height: 1rem;width: 100%;}[type=range]::-webkit-slider-thumb{background: #f1f1f1;box-shadow: 0 0 0 1px #757575;border-radius: 0.9375rem;cursor: pointer;height: 1.5625rem;width: 1.5625rem;appearance: none;margin-top: -0.375rem;}[type=range]::-moz-range-thumb{background: #f1f1f1;box-shadow: 0 0 0 1px #757575;border-radius: 0.9375rem;cursor: pointer;height: 1.5625rem;width: 1.5625rem;}[type=range]::-ms-thumb{background: #f1f1f1;box-shadow: 0 0 0 1px #757575;border-radius: 0.9375rem;cursor: pointer;height: 1.5625rem;width: 1.5625rem;}[type=range]::-ms-fill-lower{background: #aeb0b5;border: 1px solid #757575;border-radius: 1.25rem;}[type=range]::-ms-fill-upper{background: #aeb0b5;border: 1px solid #757575;border-radius: 1.25rem;}[type=file]{border: none;padding-left: 0;}.usa-date-of-birth{}.usa-date-of-birth label{margin-top: 0;}.usa-date-of-birth [type=number]{-moz-appearance: textfield;}.usa-date-of-birth [type=number]::-webkit-inner-spin-button{appearance: none;}.usa-date-of-birth [type=number]::-webkit-contacts-auto-fill-button{visibility: hidden;display: none !important;pointer-events: none;height: 0;width: 0;margin: 0;}.usa-form-group-day,.usa-form-group-month,.usa-form-group-year{clear: none;float: left;margin-right: 0.9375rem;width: 3.125rem;}.usa-form-group-year{width: 4.375rem;}.usa-label,.usa-label-big{background-color: #565c65;border-radius: 2px;color: #ffffff;font-size: 0.938rem;margin-right: 0.3125rem;padding: 0.0625rem 0.4375rem;text-transform: uppercase;}.usa-label:only-of-type,.usa-label-big:only-of-type{margin-right: 0;}.usa-label-big{font-size: 1.06rem;padding-left: 0.5625rem;padding-right: 0.5625rem;}html{font-family: \"Source Sans 3 Web\",\"Source Sans 3\",\"Helvetica Neue\",Helvetica,Roboto,Arial,sans-serif;font-size: 100%;}body{font-size: 16px;}p{line-height: 1.5;margin-bottom: 1em;margin-top: 1em;}a{color: #005ea2;text-decoration: underline;}a:hover,a:active{color: #1a4480;}a:focus{outline: 2px solid #face00;outline-offset: 2px;}a:visited{color: #54278f;}h1,h2,h3,h4,h5,h6{clear: both;font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;line-height: 1.3;margin-bottom: 0.5em;margin-top: 1.5em;}h1{font-size: 2.5rem;font-weight: 700;}h1 a{font-size: 2.5rem;font-weight: 700;font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;}h2{font-size: 2rem;font-weight: 700;}h2 a{font-size: 2rem;font-weight: 700;font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;}h3{font-size: 1.25rem;font-weight: 700;}h3 a{font-size: 1.25rem;font-weight: 700;font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;}h4{font-size: 1.063rem;font-weight: 700;}h4 a{font-size: 1.063rem;font-weight: 700;font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;}h5{font-size: 0.938rem;font-weight: 700;}h5 a{font-size: 0.938rem;font-weight: 700;font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;}h6{font-size: 0.938rem;font-weight: 400;line-height: 1.5;text-transform: none;font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;}h6 a{font-size: 0.938rem;font-weight: 400;line-height: 1.5;text-transform: none;font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;}cite,var,address,dfn{font-style: normal;}.usa-content{max-width: 43.75rem;}.usa-content p,.usa-content ul:not(.usa-accordion):not(.usa-accordion-bordered),.usa-content ol:not(.usa-accordion):not(.usa-accordion-bordered){max-width: 43.75rem;}.usa-content-list{max-width: 43.75rem;}.usa-sans p,.usa-sans a,.usa-sans li,.usa-sans span{font-family: \"Source Sans 3 Web\",\"Source Sans 3\",\"Helvetica Neue\",Helvetica,Roboto,Arial,sans-serif;}.usa-sans a{border-bottom: none;font-weight: 700;}.usa-serif p,.usa-serif a,.usa-serif li,.usa-serif span{font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;}.usa-display{font-size: 1.25rem;font-weight: 700;margin-bottom: 0;}.usa-font-lead{font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;font-size: 1.25rem;font-weight: 400;line-height: 1.7;max-width: 48.125rem;}.usa-background-dark{background-color: #323a45;}.usa-background-dark p,.usa-background-dark span{color: #ffffff;}.usa-background-dark a{color: #d6d7d9;}.usa-background-dark a:hover{color: #ffffff;}.usa-text-small{font-size: 0.938rem;margin-top: 0;}.usa-section>:first-child,.usa-grid>:first-child,.usa-grid-full>:first-child{margin-top: 0;}.usa-section>:last-child,.usa-grid>:last-child,.usa-grid-full>:last-child{margin-bottom: 0;}.usa-width-one-whole:first-child>:first-child,.usa-width-one-half:first-child>:first-child,.usa-width-one-third:first-child>:first-child,.usa-width-two-thirds:first-child>:first-child,.usa-width-one-fourth:first-child>:first-child,.usa-width-three-fourths:first-child>:first-child,.usa-width-one-sixth:first-child>:first-child,.usa-width-five-sixths:first-child>:first-child,.usa-width-one-twelfth:first-child>:first-child{margin-top: 0;}.usa-width-one-whole:last-child>:last-child,.usa-width-one-half:last-child>:last-child,.usa-width-one-third:last-child>:last-child,.usa-width-two-thirds:last-child>:last-child,.usa-width-one-fourth:last-child>:last-child,.usa-width-three-fourths:last-child>:last-child,.usa-width-one-sixth:last-child>:last-child,.usa-width-five-sixths:last-child>:last-child,.usa-width-one-twelfth:last-child>:last-child{margin-bottom: 0;}.usa-alert{background-color: #f1f1f1;background-position: 1.25rem 1.25rem;background-repeat: no-repeat;background-size: scale(5.2rem);padding-bottom: 0.875rem;padding-left: 1.875rem;padding-right: 1.25rem;padding-top: 1.25rem;position: relative;}.usa-alert::before{background-color: #8b8b8b;content: \"\";height: 100%;left: 0;position: absolute;top: 0;width: 0.625rem;}.usa-alert a{color: #1a4480;}.usa-alert a:focus,.usa-alert a:hover{color: #162e51;}.usa-alert ul{margin-bottom: 0;margin-top: 0.625rem;padding-left: 0.625rem;}.usa-alert-slim{background-position: 1.25rem 0.625rem;padding-bottom: 0.625rem;padding-top: 0.625rem;}.usa-alert-slim .usa-alert-text:only-child{margin-bottom: 0.3125rem;padding-top: 0.3125rem;}.usa-alert-icon{display: table-cell;padding-right: 0.625rem;}.usa-alert-body{display: table-cell;vertical-align: top;}.usa-alert-heading{margin-top: 0;margin-bottom: 0;}.usa-alert-text{font-family: \"Source Sans 3 Web\",\"Source Sans 3\",\"Helvetica Neue\",Helvetica,Roboto,Arial,sans-serif;margin-bottom: 0;margin-top: 0;}.usa-alert-text:only-child{margin-bottom: 0.625rem;padding-top: 0.3125rem;}.usa-alert-success{background-color: #ecf3ec;background-image: url(~@department-of-veterans-affairs/css-library/dist/img/success.png);background-image: url(~@department-of-veterans-affairs/css-library/dist/img/success.svg);}.usa-alert-success::before{background-color: #008817;}.usa-alert-success .usa-alert-body{padding-left: 3.125rem;}.usa-alert-warning{background-color: #fef0c8;background-image: url(~@department-of-veterans-affairs/css-library/dist/img/warning.png);background-image: url(~@department-of-veterans-affairs/css-library/dist/img/warning.svg);}.usa-alert-warning::before{background-color: #ffbe2e;}.usa-alert-warning .usa-alert-body{padding-left: 3.125rem;}.usa-alert-error{background-color: #f8dfe2;background-image: url(~@department-of-veterans-affairs/css-library/dist/img/error.png);background-image: url(~@department-of-veterans-affairs/css-library/dist/img/error.svg);}.usa-alert-error::before{background-color: #d83933;}.usa-alert-error .usa-alert-body{padding-left: 3.125rem;}.usa-alert-info{background-color: #e1f3f8;background-image: url(~@department-of-veterans-affairs/css-library/dist/img/info.png);background-image: url(~@department-of-veterans-affairs/css-library/dist/img/info.svg);}.usa-alert-info::before{background-color: #00bde3;}.usa-alert-info .usa-alert-body{padding-left: 3.125rem;}.usa-alert-no_icon{background-image: none;}.usa-alert-paragraph{width: 43.75rem;}.usa-alert{margin-top: 1.5em;}.usa-banner{background-color: #f1f1f1;padding-bottom: 0.4375rem;}.usa-banner-content{padding-right: 0.9375rem;padding-bottom: 3px;padding-left: 0.9375rem;background-color: transparent;font-size: 0.938rem;padding-top: 1.25rem;width: 100%;}.usa-banner-content p:first-child{margin-top: 0.625rem;}.usa-banner-inner{max-width: 1000px;margin-left: auto;margin-right: auto;padding-right: 0.9375rem;padding-left: 0.9375rem;}.usa-banner-inner::after{clear: both;content: \"\";display: table;}.usa-banner-header{padding-top: 0.34375rem;padding-bottom: 0.34375rem;font-size: 0.75rem;font-weight: 400;}.usa-banner-header p{margin-top: 0;margin-bottom: 0;display: inline;overflow: hidden;vertical-align: middle;}.usa-banner-header img{float: left;margin-right: 0.625rem;margin-top: 1px;width: 1.5rem;}.usa-banner-header-expanded{align-items: center;border-bottom: 1px solid #aeb0b5;display: flex;font-size: 0.938rem;min-height: 3.5rem;padding-right: 1.875rem;}.usa-banner-header-expanded>.usa-banner-inner{margin-left: 0;}.usa-banner-header-expanded img{margin-right: 1.5rem;}.usa-banner-header-expanded p{line-height: 1.3;vertical-align: top;}.usa-banner-button{background-color: transparent;border: 0;border-radius: 0;font-weight: 400;margin: 0;padding: 0;text-align: left;-webkit-font-smoothing: auto;padding-top: 13px;padding-left: 48px;background-position-x: right;color: #005ea2;display: block;font-size: 12px;height: 2.6875rem;left: 0;position: absolute;text-decoration: underline;top: 0;width: 100%;}.usa-banner-button:hover{background-color: transparent;}.usa-banner-button:hover{color: #1a4480;text-decoration: underline;}.usa-banner-button[aria-expanded=false]{background-image: none;}.usa-banner-button[aria-expanded=false]::after{background-image: url(~@department-of-veterans-affairs/css-library/dist/img/angle-arrow-down-primary.png);background-image: url(~@department-of-veterans-affairs/css-library/dist/img/angle-arrow-down-primary.svg);background-size: 100%;content: \"\";display: inline-block;height: 0.625rem;width: 0.625rem;margin-left: 0;}.usa-banner-button[aria-expanded=false]:hover::after{background-image: url(~@department-of-veterans-affairs/css-library/dist/img/angle-arrow-down-primary-hover.png);background-image: url(~@department-of-veterans-affairs/css-library/dist/img/angle-arrow-down-primary-hover.svg);}.usa-banner-button[aria-expanded=false]::after{background-position-y: 1px;}.usa-banner-button[aria-expanded=true]{background-image: none;height: 3.5rem;}.usa-banner-button[aria-expanded=true]::after{background-image: url(~@department-of-veterans-affairs/css-library/dist/img/close.png);background-image: url(~@department-of-veterans-affairs/css-library/dist/img/close.svg);background-size: 100%;content: \"\";display: inline-block;height: 0.8125rem;width: 0.8125rem;margin-left: 0;}.usa-banner-button[aria-expanded=true]::after{position: absolute;right: 0.9375rem;top: 1.34375rem;}.usa-banner-button[aria-expanded=true] .usa-banner-button-text{display: none;}.usa-banner-icon{width: 38px;}fieldset{border: none;margin: 0;padding: 0;}.usa-form-note{float: right;font-family: \"Source Sans 3 Web\",\"Source Sans 3\",\"Helvetica Neue\",Helvetica,Roboto,Arial,sans-serif;font-size: 0.938rem;margin: 0 0 scale(1.5rem);}.usa-form-note + *{clear: both;}.usa-input-grid-small input{margin-bottom: 1.875rem;}.usa-input-grid-small select{margin-bottom: 1.875rem;}.usa-input-grid-medium input{margin-bottom: 1.875rem;}.usa-input-grid-medium select{margin-bottom: 1.875rem;}.usa-input-grid-large input{margin-bottom: 1.875rem;}.usa-input-grid-large select{margin-bottom: 1.875rem;}.usa-additional_text{font-weight: normal;}.usa-checklist{list-style: none;margin-left: 0;padding-left: 0;}.usa-checklist li{display: inline-block;list-style: none;margin-bottom: 0;margin-top: 0;padding-left: 3em;text-indent: -2em;}.usa-checklist li::before{content: \" \";display: inline-block;height: 0.8em;margin-right: 0.2em;width: 1.8em;}.usa-checklist-checked::before{background-image: url(~@department-of-veterans-affairs/css-library/dist/img/correct9.png);background-image: url(~@department-of-veterans-affairs/css-library/dist/img/correct9.svg);background-position: 100%;background-repeat: no-repeat;background-size: 100%;}.usa-media_block-img{float: left;margin-right: 0.625rem;}.usa-media_block-body{overflow: hidden;}.usa-sidenav-list{margin-top: 0;margin-bottom: 0;list-style-type: none;padding-left: 0;border-bottom: 1px solid;border-top: 1px solid;}.usa-sidenav-list>li{margin-bottom: 0;}.usa-sidenav-list>li{background-color: transparent;border-top: 1px solid #5b616b;font-size: 1.063rem;}.usa-sidenav-list>li:first-child{border-top: none;}.usa-sidenav-list a{border: none;color: #212121;display: block;font-family: \"Source Sans 3 Web\",\"Source Sans 3\",\"Helvetica Neue\",Helvetica,Roboto,Arial,sans-serif;line-height: 1.3;padding: 0.53125rem 0.625rem 0.53125rem 0.5859375rem;text-decoration: none;}.usa-sidenav-list a:hover{background-color: #f1f1f1;color: #005ea2;text-decoration: none;}.usa-sidenav-list a:focus{outline-offset: 0;position: relative;z-index: 1;}.usa-sidenav-list a.usa-current{border-left: 0.25rem solid #005ea2;color: #005ea2;font-weight: 700;padding-left: 0.6875rem;}.usa-grid .usa-sidenav-list{margin-right: -0.9375rem;margin-left: -0.9375rem;}.usa-sidenav-sub_list{margin-top: 0;margin-bottom: 0;list-style-type: none;padding-left: 0;margin: 0;width: 100%;}.usa-sidenav-sub_list>li{margin-bottom: 0;}.usa-sidenav-sub_list li{border: none;font-size: 0.938rem;}.usa-sidenav-sub_list a{padding-left: 1.75rem;line-height: 1.3;}.usa-sidenav-sub_list a:hover,.usa-sidenav-sub_list a.usa-current{border: none;padding-left: 1.75rem;}.usa-sidenav-sub_list .usa-sidenav-sub_list a{padding-left: 2.375rem;}.usa-sidenav-sub_list .usa-sidenav-sub_list a:focus{outline-offset: 0;}.usa-sidenav-sub_list .usa-sidenav-sub_list a:hover{padding-left: 2.375rem;}.usa-layout-docs-sidenav{padding-top: 1.5rem;}ul,ol{margin-bottom: 1em;margin-top: 1em;line-height: 1.5;padding-left: 3ch;}ul:last-child,ol:last-child{margin-bottom: 0;}ul ul,ul ol,ol ul,ol ol{margin-top: 0.25em;}ul li,ol li{margin-bottom: 0.25em;max-width: 68ex;}ul li:last-child,ol li:last-child{margin-bottom: 0;}.usa-unstyled-list{margin-bottom: 0;margin-top: 0;list-style-type: none;padding-left: 0;}.usa-unstyled-list>li{margin-bottom: 0;max-width: unset;}.usa-media-block{align-items: flex-start;display: flex;}.usa-media-block__img{flex-shrink: 0;margin-right: 0.5rem;}.usa-media-block__body{flex: 1 1 0%;}html,body{padding: 0;margin: 0;}html{font-size: 100%;font-weight: 500;}body{background: #ffffff;color: #1b1b1b;font-size: 16px;font-family: inherit;line-height: 1.5;}body.modal-open{overflow: hidden;}h1{margin-top: 0;}.show-on-focus{position: absolute;top: -10em;background: #ffffff;padding: 1em;margin: 1em;color: #162e51;display: block;font-weight: 600;}.show-on-focus:focus{position: inherit;top: auto;outline: 2px solid #ffbe2e;}body .row.full{width: 100%;max-width: 100%;}.sr-only{border: 0;clip: rect(0,0,0,0);clip-path: inset(50%);height: 1px;margin: -1px;overflow: hidden;padding: 0;position: absolute !important;width: 1px;word-wrap: normal !important;}.no-print-no-sr{display: none !important;}#content abbr{border-bottom: 0px;text-decoration: none;font-weight: inherit;font-style: inherit;color: inherit;cursor: pointer;}a{color: #005ea2;text-decoration: underline;-webkit-transition-duration: 0.3s;transition-duration: 0.3s;-webkit-transition-timing-function: ease-in-out;transition-timing-function: ease-in-out;-webkit-transition-property: color,background-color,border-color;transition-property: color,background-color,border-color;}a:hover{background-color: rgba(0,0,0,0.05);color: inherit;text-decoration: underline;}a:active{background: rgba(0,0,0,0.05);}a:visited,a:visited abbr{color: #54278f;}dd{margin-left: 0;}dd + dt{margin-top: 1.5em;}figure{font-size: 0.85em;margin-left: -15px;margin-right: -15px;}figcaption{color: #162e51;}input::-webkit-input-placeholder{color: #565c65;}input::-moz-placeholder{color: #565c65;}input:-ms-input-placeholder{color: #565c65;}input:focus::-webkit-input-placeholder{color: transparent;}input:focus::-moz-placeholder{color: transparent;}input:focus:-ms-input-placeholder{color: transparent;}input.va-input-medium-large{max-width: 11.25rem;}hr{margin: 2.5em 0;margin: 48px 0 40px;border: 1px solid #a9aeb1;}table{width: 100%;}.va-pos-fixed{position: fixed;}.header{background: #162e51;clear: both;margin: 0;padding: 0;min-height: 189.19px;}.header .login-container{background: #162e51;flex-wrap: wrap;white-space: nowrap;}.header .login-container .row{padding: 0;}#va-header-logo-menu{flex-wrap: wrap;padding: 1em 0.75em 0;}.va-header-logo-wrapper{flex: 1 0 164px;}.va-header-logo{background-color: transparent;border-bottom: none;display: block;height: 40px;margin: 0;width: 164px;}.va-header-logo:hover .vets-logo-va path{fill: #ffbe2e;}.va-notice--banner{background: #ffffff;margin: 0 0 0.75em 0;padding: 0;font-weight: 400;}.va-notice--banner-inner{margin: auto;max-width: 1000px;position: relative;}.va-notice--banner p{margin: 0;}.va-notice--banner a{background-image: none;color: inherit;padding: 0;}.vets-logo{display: block;height: inherit;width: inherit;}.vets-logo-vetsdotgov path,.vets-logo-vetsdotgov rect,.vets-logo-va path,.vets-logo-va rect{fill: #ffffff;}article>h1{margin-top: 0;}#content{margin: 0;padding: 0;color: #1b1b1b;overflow: hidden;}.va-introtext{font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;font-size: 1.25rem;font-weight: 400;line-height: 1.7;max-width: 48.125rem;}.va-introtext p,.va-introtext a{font-family: Bitter,Georgia,Cambria,\"Times New Roman\",Times,serif;font-size: 1.25rem;font-weight: 400;line-height: 1.7;}.va-h-ruled--stars{display: flex;justify-content: center;align-items: center;background: url(~@department-of-veterans-affairs/css-library/dist/img/stars.png) no-repeat center;background-size: 6.875rem auto;margin: 1rem auto auto;padding: 1.25rem 0 0;text-align: center;}.va-h-ruled--stars::before{margin-right: 7.5rem;}.va-h-ruled--stars::before,.va-h-ruled--stars::after{border-top: 1px solid #aeb0b5;content: \" \";flex: 1 1 50%;padding: 0.625rem 0;}.va-button-primary{background: #008817 !important;}.va-button-primary:hover,.va-button-primary:focus{background-color: #154c21 !important;text-decoration: none !important;}.va-button-primary svg{display: inline-block;height: 0.75rem;margin-left: 0.3125rem;width: 0.75rem;vertical-align: -1px;}.va-address-block{margin-left: 3.125rem;border-left: 3px solid #005ea2;padding-left: 0.625rem;}.last-updated{margin-top: 1.5em;border-top: 2px solid #aeb0b5;padding: 1em 0;}.last-updated p{color: #323a45 !important;}.feature{background: #e1f3f8;padding: 1em;clear: both;margin: 1.5em 0 1.5em 0;}.feature h2{margin-top: 0;}.feature h3{margin-top: 0;}.feature h4{margin-top: 0;}.feature ul{margin: 0 0 0.5em 1.5em;padding: 0;}@media only screen and (min-width: 40.0625em){.column,.columns{padding-left: 0.5859375rem;padding-right: 0.5859375rem;}.row.medium-uncollapse>.column,.row.medium-uncollapse>.columns{padding-left: 0.5859375rem;padding-right: 0.5859375rem;}.column,.columns{padding-left: 0.5859375rem;padding-right: 0.5859375rem;}.row.large-uncollapse>.column,.row.large-uncollapse>.columns{padding-left: 0.5859375rem;padding-right: 0.5859375rem;}}@media only screen{.column,.columns{padding-left: 0.5859375rem;padding-right: 0.5859375rem;}.row.small-uncollapse>.column,.row.small-uncollapse>.columns{padding-left: 0.5859375rem;padding-right: 0.5859375rem;}}@media print{[type=checkbox]:checked + label::before,[type=checkbox]:checked:disabled + label::before{background-image: none;background-color: #ffffff;content: url(~@department-of-veterans-affairs/css-library/dist/img/correct8-alt.png);content: url(~@department-of-veterans-affairs/css-library/dist/img/correct8-alt.svg);text-indent: 0;}[type=radio]:checked:disabled + label::before,[type=radio]:checked + label::before{box-shadow: 0 0 0 2px #ffffff,inset 0 0 0 14px #005ea2,0 0 0 4px #005ea2;}}@media screen and (min-width: 1024px),print and (min-width: 1024px){.va-notice--banner .usa-banner-inner{padding-left: 0;font-size: 12px;}.va-notice--banner .usa-banner-inner p{font-size: 12px;}}@media screen and (min-width: 1201px),print and (min-width: 1201px){.usa-sidenav-list{border-bottom: none;border-top: none;}.usa-layout-docs-sidenav{padding-top: 0;}figure{margin-left: -16.66667%;margin-right: -16.66667%;}}@media screen and (min-width: 481px),print and (min-width: 481px){.usa-button,.usa-button-primary,.usa-button:visited,.usa-button-primary:visited,button,[type=button],[type=submit],[type=reset],[type=image]{width: auto;}.usa-display{font-size: 2.5rem;font-weight: 700;}.usa-banner{font-size: 0.938rem;padding-bottom: 0;}.usa-banner-header{padding-top: 0;padding-bottom: 0;}.usa-banner-header p{margin-top: 2px;margin-bottom: 2px;display: inline-block;}.usa-banner-header img{margin-right: 7px;width: 20px;}.usa-banner-header-expanded{border-bottom: none;display: block;font-size: 0.75rem;font-weight: 400;min-height: 0;padding-right: 0;}.usa-banner-header-expanded>.usa-banner-inner{margin-left: auto;}.usa-banner-header-expanded img{margin-right: 0.4375rem;}.usa-banner-header-expanded p{line-height: 1.5;vertical-align: middle;}.usa-banner-button{padding-top: 0;padding-left: 0;display: inline;height: auto;margin-left: 3px;position: relative;vertical-align: middle;width: auto;}.usa-banner-button[aria-expanded=true]{height: initial;padding: 0;position: relative;}.usa-banner-button[aria-expanded=true]::after{background-image: url(~@department-of-veterans-affairs/css-library/dist/img/angle-arrow-up-primary.png);background-image: url(~@department-of-veterans-affairs/css-library/dist/img/angle-arrow-up-primary.svg);background-size: 100%;content: \"\";display: inline-block;height: 0.625rem;width: 0.625rem;margin-left: 0;}.usa-banner-button[aria-expanded=true]:hover::after{background-image: url(~@department-of-veterans-affairs/css-library/dist/img/angle-arrow-up-primary-hover.png);background-image: url(~@department-of-veterans-affairs/css-library/dist/img/angle-arrow-up-primary-hover.svg);}.usa-banner-button[aria-expanded=true]::after{background-position-y: 1px;}.usa-banner-button[aria-expanded=true]::after{position: static;}.usa-banner-button[aria-expanded=true] .usa-banner-button-text{display: inline;}.header{min-height: 167.19px;}}@media screen and (min-width: 640px),print and (min-width: 640px){.header .login-container{flex: 1 0 100%;}#va-header-logo-menu{padding-bottom: 0;}.va-header-logo-wrapper{flex-basis: 3.75rem;}}@media screen and (min-width: 768px),print and (min-width: 768px){.usa-display{font-size: 3.25rem;font-weight: 700;}.usa-width-one-whole>:first-child,.usa-width-one-half>:first-child,.usa-width-one-third>:first-child,.usa-width-two-thirds>:first-child,.usa-width-one-fourth>:first-child,.usa-width-three-fourths>:first-child,.usa-width-one-sixth>:first-child,.usa-width-five-sixths>:first-child,.usa-width-one-twelfth>:first-child{margin-top: 0;}.usa-width-one-whole>:last-child,.usa-width-one-half>:last-child,.usa-width-one-third>:last-child,.usa-width-two-thirds>:last-child,.usa-width-one-fourth>:last-child,.usa-width-three-fourths>:last-child,.usa-width-one-sixth>:last-child,.usa-width-five-sixths>:last-child,.usa-width-one-twelfth>:last-child{margin-bottom: 0;}.usa-banner-content{padding-bottom: 23px;padding-top: 40px;}.usa-banner-content p:first-child{margin-top: 0;}[type=submit]{margin-top: calc(1.875rem - 0.2em);}.usa-form{max-width: 32rem;}.usa-input-tiny{max-width: 3.75rem;}.usa-input-medium{max-width: 7.5rem;}.usa-form-large{max-width: 28.75rem;}.usa-input-grid{padding-right: 5%;}.usa-input-grid:last-of-type{padding-right: 0;}.usa-input-grid-small{float: left;width: 35%;}.usa-input-grid-medium{float: left;width: 65%;}.usa-input-grid-large{float: left;width: 100%;}.usa-grid .usa-sidenav-list{margin-right: 0;margin-left: 0;}.header{position: relative;min-height: 159px;}.va-notice--banner{background: #f1f1f1;}.va-notice--banner .usa-banner-inner{font-size: 12px;padding-left: 0.9375rem;}.va-notice--banner .usa-banner-inner p{font-size: 12px;}.va-notice--banner .usa-banner-content{padding-left: 0;padding-right: 0;}.va-h-ruled--stars{padding-left: 0;}}@media screen and (min-width: 951px),print and (min-width: 951px){.usa-banner-content{padding-right: 1.875rem;padding-left: 1.875rem;}.usa-banner-inner{padding-right: 1.875rem;padding-left: 1.875rem;}}va-modal p:first-child{margin-top:0}.usa-sr-only{position:absolute;left:-999em;right:auto}:is(va-alert)>:is(h1,h2,h3,h4,h5,h6){font-size:1.33rem;margin-top:var(--vads-spacing-neg-2px);margin-bottom:var(--vads-spacing-1);line-height:var(--vads-font-line-height-2)}va-alert p{max-width:100%;margin-bottom:var(--vads-spacing-2);margin-top:var(--vads-spacing-2);word-wrap:break-word}va-table>va-table-row[slot] button{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;border-radius:0}va-table>va-table-row[slot] button:hover{background-color:var(--vads-link-color-background-hover) !important;-webkit-transition-duration:0.3s;transition-duration:0.3s;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-property:color,background-color,border-color;transition-property:color,background-color,border-color}va-table>va-table-row[slot] button svg{width:1.5rem}@media screen and (min-width: 768px){va-table-row span.text-align-right{text-align:right !important}}va-breadcrumbs .va-breadcrumbs-li{display:inline-block;line-height:var(--vads-font-line-height-default);margin:var(--vads-spacing-0p5) 0;padding:var(--vads-spacing-0p5) 0 var(--vads-spacing-0p5) 0;vertical-align:middle}va-breadcrumbs .va-breadcrumbs-li::after{content:\" \u203a\";display:inline-block;padding:0 5.6px}va-breadcrumbs .va-breadcrumbs-li:last-child::after{content:\"\"}@media screen and (max-width: 481px){va-breadcrumbs .va-breadcrumbs-li{display:none}va-breadcrumbs .va-breadcrumbs-li:nth-last-child(2){display:-ms-flexbox;display:flex}va-breadcrumbs .va-breadcrumbs-li:nth-last-child(2)::before{content:\" \u2039\";display:inline-block;padding:0 2.4px}va-breadcrumbs .va-breadcrumbs-li:nth-last-child(2)::after{content:\"\";display:none;padding:0}}va-breadcrumbs li>a{background-color:transparent;color:var(--vads-color-link);display:inline-block;padding:var(--vads-spacing-2px);-webkit-transition-duration:0.3s;transition-duration:0.3s;-webkit-transition-property:color,background-color,border-color;transition-property:color,background-color,border-color;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out}va-breadcrumbs li>a:hover{background:var(--vads-link-color-background-hover)}va-breadcrumbs li>a:focus{outline:var(--vads-border-width-2px) solid var(--vads-color-action-focus-on-light);outline-offset:var(--vads-spacing-2px)}va-breadcrumbs li>a[aria-current=page]{color:var(--vads-color-base-darker);cursor:default;font-weight:var(--font-weight-bold);pointer-events:none;text-decoration:none}va-action-list-item>p{margin-top:0;margin-bottom:0}va-action-list-item>p:not(:last-child){margin-bottom:var(--vads-spacing-2px)}:host{--vads-border-radius-0:0;--vads-border-radius-1:0.5rem;--vads-border-radius-2:1rem;--vads-border-radius-3:1.5rem;--vads-border-radius-2px:2px;--vads-border-radius-0p5:0.25rem;--vads-border-radius-1p5:0.75rem;--vads-border-radius-2p5:1.25rem;--vads-border-radius-round:99rem;--vads-border-radius-sm:2px;--vads-border-radius-md:0.25rem;--vads-border-radius-lg:0.5rem;--vads-border-width-0:0;--vads-border-width-1:0.5rem;--vads-border-width-2:1rem;--vads-border-width-3:1.5rem;--vads-border-width-1px:1px;--vads-border-width-2px:2px;--vads-border-width-0p5:0.25rem;--vads-border-width-1p5:0.75rem;--vads-border-width-2p5:1.25rem;--xsmall-screen:320px;--small-screen:481px;--tablet:640px;--medium-screen:768px;--tablet-lg:880px;--small-desktop-screen:1024px;--large-screen:1201px;--mobile:320px;--mobile-lg:480px;--desktop:1024px;--desktop-lg:1201px;--widescreen:1400px;--vads-breakpoint-mobile:320px;--vads-breakpoint-mobile-lg:480px;--vads-breakpoint-tablet:640px;--vads-breakpoint-tablet-lg:880px;--vads-breakpoint-desktop:1024px;--vads-breakpoint-desktop-lg:1201px;--vads-breakpoint-widescreen:1400px;--vads-clinical-charts-color-muted-1:#4f97d1;--vads-clinical-charts-color-muted-2:#face00;--vads-clinical-charts-color-muted-3:#f2938c;--vads-clinical-charts-color-muted-4:#a3b72c;--vads-clinical-charts-color-muted-5:#449dac;--vads-clinical-charts-color-muted-6:#ad8b65;--vads-clinical-charts-color-muted-7:#8889db;--vads-clinical-charts-color-muted-8:#e0699f;--vads-clinical-charts-color-vibrant-1:#d83933;--vads-clinical-charts-color-vibrant-2:#f09860;--vads-clinical-charts-color-vibrant-3:#fc906d;--vads-clinical-charts-color-vibrant-4:#ffbe2e;--vads-clinical-charts-color-vibrant-5:#face00;--vads-clinical-charts-color-vibrant-6:#146947;--vads-clinical-charts-color-vibrant-7:#008817;--vads-clinical-charts-color-vibrant-8:#04c585;--vads-clinical-charts-color-vibrant-9:#70e17b;--vads-clinical-charts-color-vibrant-10:#2491ff;--vads-clinical-charts-color-vibrant-11:#28a0cb;--vads-clinical-charts-color-vibrant-12:#00bde3;--vads-clinical-charts-color-vibrant-13:#d85bef;--vads-clinical-charts-color-vibrant-14:#4a50c4;--vads-clinical-charts-color-vibrant-15:#967efb;--vads-clinical-charts-color-vibrant-16:#711e6c;--vads-clinical-charts-color-vibrant-17:#d72d79;--vads-clinical-charts-color-vibrant-18:#ff87b2;--color-link-default-hover:rgba(0,0,0,0.05);--vads-link-color-background-hover:rgba(0,0,0,0.05);--vads-button-color-background-primary-on-light:#005ea2;--vads-button-color-background-primary-alt-active-on-light:#154c21;--vads-button-color-background-secondary-on-light:#ffffff;--vads-button-color-background-disabled-on-light:#c9c9c9;--vads-button-color-text-primary-alt-on-light:#ffffff;--vads-button-color-text-primary-on-light:#ffffff;--vads-alert-color-background-info-on-light:#e7f6f8;--vads-alert-color-background-success-on-light:#ecf3ec;--vads-alert-color-background-warning-on-light:#faf3d1;--vads-alert-color-background-error-on-light:#f4e3db;--vads-color-white:#ffffff;--vads-label-hint-text-color-on-light:#757575;--vads-process-list-color-text-pending-on-light:#757575;--vads-color-gray-medium:#757575;--vads-color-gray-light-alt:#edeff0;--vads-color-gray-warm-light:#e6e6e2;--vads-color-gray-warm-dark:#454540;--vads-color-gray-cool-light:#e1e7f1;--vads-color-action-focus-on-light:#face00;--vads-color-base:#1b1b1b;--vads-color-base-dark:#565c65;--vads-color-base-darker:#3d4551;--vads-color-base-darkest:#1b1b1b;--vads-color-base-medium:#71767a;--vads-color-base-light:#a9aeb1;--vads-color-base-lighter:#dfe1e2;--vads-color-base-lightest:#f0f0f0;--vads-color-emergency:#9c3d10;--vads-color-emergency-dark:#332d29;--vads-color-error:#d54309;--vads-color-error-dark:#b21d38;--vads-color-error-darker:#6f3331;--vads-color-error-light:#f39268;--vads-color-error-lighter:#f4e3db;--vads-color-gibill-accent:#fef0c8;--vads-color-hub-burials:#2378c3;--vads-color-hub-careers:#bd5727;--vads-color-hub-disability:#a23737;--vads-color-hub-education:#162e51;--vads-color-hub-health-care:#3f57a6;--vads-color-hub-housing:#8e704f;--vads-color-hub-life-insurance:#6f7a41;--vads-color-hub-pension:#4d8055;--vads-color-hub-records:#6f7a41;--vads-color-hub-service-member:#162e51;--vads-color-hub-family-member:#162e51;--vads-color-info:#00bde3;--vads-color-info-dark:#009ec1;--vads-color-info-darker:#2e6276;--vads-color-info-light:#99deea;--vads-color-info-lighter:#e7f6f8;--vads-color-ink:#1b1b1b;--vads-color-text:#1b1b1b;--vads-color-text-muted:#71767a;--vads-color-inset-bg:#e7f6f8;--vads-color-link:#005ea2;--vads-color-link-active:#0b4778;--vads-color-link-visited:#54278f;--vads-color-primary:#005ea2;--vads-color-primary-alt:#00bde3;--vads-color-primary-alt-dark:#28a0cb;--vads-color-primary-alt-darkest:#07648d;--vads-color-primary-alt-light:#97d4ea;--vads-color-primary-alt-lightest:#e1f3f8;--vads-color-primary-dark:#1a4480;--vads-color-primary-darker:#162e51;--vads-color-primary-light:#73b3e7;--vads-color-primary-lighter:#d9e8f6;--vads-color-secondary:#d83933;--vads-color-secondary-dark:#b50909;--vads-color-secondary-darkest:#8b0a03;--vads-color-secondary-light:#f2938c;--vads-color-secondary-lightest:#f8dfe2;--vads-color-success:#00a91c;--vads-color-success-dark:#008817;--vads-color-success-darker:#216e1f;--vads-color-success-light:#70e17b;--vads-color-success-lighter:#ecf3ec;--vads-color-green-light:#5e9f69;--vads-color-va-accent:#8a7237;--vads-color-warning:#ffbe2e;--vads-color-warning-dark:#e5a000;--vads-color-warning-darker:#936f38;--vads-color-warning-light:#fee685;--vads-color-warning-lighter:#faf3d1;--vads-color-gold-lighter:#ffe396;--vads-color-gold-lightest:#fef0c8;--vads-color-black:#000000;--vads-color-orange:#dd7533;--vads-color-green-lighter:#b4d0b9;--vads-color-blue-cool:#345d96;--vads-color-blue-cool-light:#4a77b4;--vads-color-blue-cool-lightest:#98afd2;--vads-color-action-surface-default-on-dark:#58b4ff;--vads-color-action-surface-destructive-on-dark:#fb5a47;--vads-color-action-border-base-active-on-light:#2e2e2e;--vads-color-action-border-base-active-on-dark:#adadad;--vads-color-feedback-foreground-success-on-dark:#21c834;--vads-color-feedback-foreground-success-on-light:#008817;--vads-color-feedback-foreground-warning-on-dark:#e5a000;--vads-color-feedback-foreground-warning-on-light:#c2850c;--vads-color-feedback-surface-info-on-dark:#112f4e;--vads-color-feedback-surface-success-on-dark:#19311e;--vads-color-feedback-surface-warning-on-dark:#422d19;--vads-color-feedback-surface-error-on-dark:#5c1111;--vads-color-feedback-border-warning-on-dark:#face00;--vads-color-background:#ffffff;--vads-color-background-muted:#f0f0f0;--vads-color-background-default-on-dark:#171716;--vads-color-forms-surface-active-on-light:#ecf1f7;--vads-color-forms-surface-active-on-dark:#252f3e;--vads-input-background-color-on-light:#ffffff;--vads-input-border-color-on-light:#565c65;--vads-input-prefix-color-fill-on-light:#757575;--vads-input-prefix-color-text-on-light:#757575;--vads-input-suffix-color-text-on-light:#757575;--vads-input-tile-background-active-on-light:rgba(0,94,162,0.1);--vads-input-tile-border-active-on-light:#005ea2;--vads-input-tile-border-on-light:rgba(27,27,27,0.03);--vads-elevation-shadow-1:0px 1px 4px 0px rgba(0,0,0,0.1);--vads-elevation-shadow-2:0px 4px 8px 0px rgba(0,0,0,0.1);--vads-elevation-shadow-3:0px 8px 16px 0px rgba(0,0,0,0.1);--vads-elevation-shadow-4:0px 12px 24px 0px rgba(0,0,0,0.1);--vads-elevation-shadow-5:0px 16px 32px 0px rgba(0,0,0,0.1);--vads-elevation-shadow-none:none;--vads-elevation-z-index-0:0;--vads-elevation-z-index-100:100;--vads-elevation-z-index-200:200;--vads-elevation-z-index-300:300;--vads-elevation-z-index-400:400;--vads-elevation-z-index-500:500;--vads-elevation-z-index-auto:auto;--vads-elevation-z-index-bottom:-100;--vads-elevation-z-index-top:99999;--vads-elevation-z-index-base:0;--vads-elevation-z-index-level-1:100;--vads-elevation-z-index-level-2:200;--vads-elevation-z-index-level-3:300;--vads-elevation-z-index-level-4:400;--vads-elevation-z-index-level-5:500;--vads-font-family-sans:'Source Sans 3 Web','Source Sans 3','Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;--vads-font-family-serif:Bitter,Georgia,Cambria,'Times New Roman',Times,serif;--vads-font-family-mono:'Roboto Mono Web','Bitstream Vera Sans Mono','Consolas','Courier',monospace;--vads-font-family-heading:Bitter,Georgia,Cambria,'Times New Roman',Times,serif;--vads-font-weight-normal:400;--vads-font-weight-medium:500;--vads-font-weight-semibold:600;--vads-font-weight-bold:700;--vads-font-style-normal:normal;--vads-font-style-italic:italic;--font-family-sans:'Source Sans 3 Web','Source Sans 3','Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;--font-family-serif:Bitter,Georgia,Cambria,'Times New Roman',Times,serif;--font-family-mono:'Roboto Mono Web','Bitstream Vera Sans Mono','Consolas','Courier',monospace;--font-serif:Bitter,Georgia,Cambria,'Times New Roman',Times,serif;--font-source-sans:'Source Sans 3 Web','Source Sans 3','Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;--font-mono:'Roboto Mono Web','Bitstream Vera Sans Mono','Consolas','Courier',monospace;--font-weight-normal:400;--font-weight-bold:700;--font-style-normal:normal;--font-style-italic:italic;--font-size-sm:0.938rem;--font-size-root:1rem;--font-size-md:1.063rem;--font-size-lg:1.25rem;--font-size-xl:2rem;--font-size-2xl:2.5rem;--font-size-h1:2.5rem;--font-size-h2:2rem;--font-size-h3:1.25rem;--font-size-h4:1.063rem;--font-size-h5:0.938rem;--font-size-h6:0.938rem;--v3-font-base-size:16px;--vads-font-letter-spacing-looser:0.02em;--vads-font-letter-spacing-loose:0.01em;--vads-font-letter-spacing-tight:-0.01em;--vads-font-letter-spacing-tighter:-0.02em;--vads-font-line-height-1:1;--vads-font-line-height-2:1.15;--vads-font-line-height-3:1.35;--vads-font-line-height-4:1.5;--vads-font-line-height-5:1.62;--vads-font-line-height-6:1.75;--vads-font-line-height-body-lead:1.75;--vads-font-line-height-default:1.5;--vads-font-line-height-heading:1.2;--vads-font-line-height-serif:1.9;--vads-font-line-height-mono:1.7;--vads-font-size-source-sans-normalized:1.06rem;--vads-font-size-root:1rem;--vads-font-size-3xs:0.75rem;--vads-font-size-2xs:0.8125rem;--vads-font-size-xs:0.875rem;--vads-font-size-sm:0.938rem;--vads-font-size-md:1.063rem;--vads-font-size-lg:1.25rem;--vads-font-size-xl:2rem;--vads-font-size-2xl:2.5rem;--vads-font-size-3xl:3rem;--vads-font-size-body-default:1.06rem;--vads-font-size-body-large:1.25rem;--vads-font-size-body-lead:1.25rem;--vads-font-size-body-medium:1.063rem;--vads-font-size-body-small:0.938rem;--vads-font-size-eyebrow:1.063rem;--vads-font-size-heading-level-1:2.5rem;--vads-font-size-heading-level-2:2rem;--vads-font-size-heading-level-3:1.25rem;--vads-font-size-heading-level-4:1.063rem;--vads-font-size-heading-level-5:0.938rem;--vads-font-size-heading-level-6:0.938rem;--vads-size-line-length-1:44ex;--vads-size-line-length-2:60ex;--vads-size-line-length-3:64ex;--vads-size-line-length-4:68ex;--vads-size-line-length-5:72ex;--vads-size-line-length-6:88ex;--vads-size-line-length-none:inherit;--vads-opacity-0:0;--vads-opacity-5:0.05;--vads-opacity-10:0.1;--vads-opacity-20:0.2;--vads-opacity-30:0.3;--vads-opacity-40:0.4;--vads-opacity-50:0.5;--vads-opacity-60:0.6;--vads-opacity-70:0.7;--vads-opacity-80:0.8;--vads-opacity-90:0.9;--vads-opacity-100:1;--units-0:0;--units-1:0.5rem;--units-2:1rem;--units-3:1.5rem;--units-4:2rem;--units-5:2.5rem;--units-6:3rem;--units-7:3.5rem;--units-8:4rem;--units-9:4.5rem;--units-10:5rem;--units-15:7.5rem;--units-1px:1px;--units-0p25:2px;--units-0p5:0.25rem;--units-1p5:0.75rem;--units-2p5:1.25rem;--units-neg-1px:-1px;--units-neg-0p25:-2px;--units-neg-0p5:-0.25rem;--units-neg-1:-0.5rem;--units-neg-1p5:-0.75rem;--units-neg-2:-1rem;--units-neg-2p5:-1.25rem;--units-neg-3:-1.5rem;--units-neg-4:-2rem;--units-neg-5:-2.5rem;--units-neg-6:-3rem;--units-neg-7:-3.5rem;--units-neg-8:-4rem;--units-neg-9:-4.5rem;--units-neg-10:-5rem;--units-neg-15:-7.5rem;--vads-spacing-0:0;--vads-spacing-1:0.5rem;--vads-spacing-2:1rem;--vads-spacing-3:1.5rem;--vads-spacing-4:2rem;--vads-spacing-5:2.5rem;--vads-spacing-6:3rem;--vads-spacing-7:3.5rem;--vads-spacing-8:4rem;--vads-spacing-9:4.5rem;--vads-spacing-10:5rem;--vads-spacing-15:7.5rem;--vads-spacing-1px:1px;--vads-spacing-2px:2px;--vads-spacing-0p5:0.25rem;--vads-spacing-1p5:0.75rem;--vads-spacing-2p5:1.25rem;--vads-spacing-neg-1px:-1px;--vads-spacing-neg-2px:-2px;--vads-spacing-neg-0p5:-0.25rem;--vads-spacing-neg-1:-0.5rem;--vads-spacing-neg-1p5:-0.75rem;--vads-spacing-neg-2:-1rem;--vads-spacing-neg-2p5:-1.25rem;--vads-spacing-neg-3:-1.5rem;--vads-spacing-neg-4:-2rem;--vads-spacing-neg-5:-2.5rem;--vads-spacing-neg-6:-3rem;--vads-spacing-neg-7:-3.5rem;--vads-spacing-neg-8:-4rem;--vads-spacing-neg-9:-4.5rem;--vads-spacing-neg-10:-5rem;--vads-spacing-neg-15:-7.5rem;--vads-spacing-inset-l:2rem;--vads-spacing-inset-m:1.5rem;--vads-spacing-inset-s:1rem;--vads-spacing-vertical-stack-l:2rem;--vads-spacing-vertical-stack-m:1.5rem;--vads-spacing-vertical-stack-s:1rem;--vads-spacing-vertical-stack-default:1rem;--vads-forms-spacing-vertical-stack-default:2rem;--vads-site-margins-mobile-width:1rem;--vads-site-margins-width:2rem;--vads-site-margins-breakpoint:1024px;--vads-grid-container-max-width:1024px}va-header-navigation:not(:defined),va-header-navigation:not(.hydrated){display:block;min-height:var(--vads-spacing-8);background-color:var(--vads-color-primary-darker)}va-process-list li :is(h2,h3,h4,h5){margin-top:0;clear:none;padding-top:0.188rem}va-promo-banner[href]:focus,va-link-action[href]:not([type=primary-entry]):focus{outline:none}";

/* ---------- Reference: content ---------- */
const REF_WC_VER="24.21.0";
const REF_WC="https://unpkg.com/@department-of-veterans-affairs/web-components@"+REF_WC_VER+"/";
const REF_SB="https://design.va.gov/storybook/?path=/story/";
const REF_DS="https://design.va.gov";
const REF_META={asof:"Oct 14, 2026",commit:"803653962d",apps:148};
const rP="margin:0";
function RS(name,id,html,note){return{n:name,id:id||null,h:html,note:note||""}}

const REF_COMPS=[
{id:"link",name:"Link",tag:"va-link",kids:[],page:"/components/link",
 blurb:"Takes someone to another page, a file, or an external site.",
 stories:[
  RS("Default","components-va-link--default",'<va-link href="#" text="Find a VA facility near you"></va-link>'),
  RS("Back","components-va-link--back",'<va-link href="#" text="Back to your claims" back></va-link>'),
  RS("Active","components-va-link--active",'<va-link href="#" text="Check your claim status" active></va-link>'),
  RS("Calendar","components-va-link--calendar",'<va-link href="#" text="Add to calendar" calendar filename="appointment"></va-link>'),
  RS("Channel","components-va-link--channel",'<va-link href="#" text="Watch on the VA YouTube channel" channel></va-link>'),
  RS("Download","components-va-link--download",'<va-link href="#" text="Download VA Form 21-526EZ" download filename="VA-Form-21-526EZ" filetype="PDF" pages="12"></va-link>'),
  RS("External","components-va-link--external",'<va-link href="#" text="Visit the Social Security Administration" external></va-link>'),
  RS("Video","components-va-link--video",'<va-link href="#" text="Watch: how to file a claim" video></va-link>')],
 a11y:{sections:[
  {h:"Additional considerations for VA",items:[
   "Don't style a link to look or behave like a button.",
   "Wrap <va-link> in a semantic tag such as <p>. It doesn't resize properly for screen magnification inside a <div>.",
   "People must be able to reach links with the Tab key and activate them with Enter.",
   "Link text has to say where it goes. Vague text is hard for everyone, and especially for screen reader users.",
   "Links to sites outside VA.gov must say where they go, following the content style guide.",
   "Links that open in a new tab must say so. The External variation adds “(opens in a new tab)” text instead of an icon."]},
  {h:"Choose the right element: buttons vs. links",items:[
   "Links are for navigation. Buttons are for actions. Screen reader users move through a page by element type, so a link coded as a button (or the reverse) is hard to find.",
   "Use a button to submit a form, open a modal, change state or expand content. Use a link for internal and external pages, skip links and PDFs."]}],
  status:["Isolated component tests on v56.4.0: 16 passed, 0 failed, 4 conditional.","Teams still need to test links inside their own product, because context can introduce new issues."],
  tests:"/components/link/accessibility-tests/"}},

{id:"alert",name:"Alert",tag:"va-alert",kids:[],page:"/components/alert",
 blurb:"Draws attention to information people need to see. Info, warning, error and success statuses.",
 stories:[
  RS("Informational (default)","uswds-va-alert--default",'<va-alert status="info"><h3 slot="headline">Your claim is in review</h3><p style="'+rP+'">We’ll update your status within 5 business days.</p></va-alert>'),
  RS("Warning","uswds-va-alert--warning",'<va-alert status="warning"><h3 slot="headline">Your application is missing information</h3><p style="'+rP+'">Add your mailing address so we can send your decision letter.</p></va-alert>'),
  RS("Error","uswds-va-alert--error",'<va-alert status="error"><h3 slot="headline">We couldn’t save your changes</h3><p style="'+rP+'">Try again in a few minutes.</p></va-alert>'),
  RS("Success","uswds-va-alert--success",'<va-alert status="success"><h3 slot="headline">We received your request</h3><p style="'+rP+'">You’ll get a confirmation by email.</p></va-alert>'),
  RS("With action link","uswds-va-alert--with-action-link",'<va-alert status="info"><h3 slot="headline">You have a decision available</h3><p style="margin:0 0 12px">Your decision letter is ready to view.</p><va-link-action href="#" text="Review your decision letter" type="secondary"></va-link-action></va-alert>'),
  RS("Heading level","uswds-va-alert--heading-level",'<va-alert status="info"><h4 slot="headline">This alert uses an h4</h4><p style="'+rP+'">Pick the heading level that fits the page outline.</p></va-alert>'),
  RS("Dismissible","uswds-va-alert--dismissable",'<va-alert status="info" closeable close-btn-aria-label="Close notification"><h3 slot="headline">New: track your benefits here</h3><p style="'+rP+'">You can dismiss this message.</p></va-alert>',"Try the close button. After a dismissal, move focus somewhere sensible."),
  RS("Slim","uswds-va-alert--slim",'<va-alert status="warning" slim><p style="'+rP+'">Your session ends in 5 minutes.</p></va-alert>')],
 variants:{h:"Statuses used in code",note:"Counts of status=\"…\" written directly in markup.",rows:[["info",259],["warning",222],["error",206],["success",104],["continue",12]]},
 a11y:{sections:[
  {h:"Additional considerations for VA",items:[
   "No auto-dismissal: alerts shouldn't close on a timer or time limit.",
   "Focusable content inside an alert can include the heading, body copy, phone numbers and buttons."]},
  {h:"Pick an appropriate ARIA role",items:[
   "Static alert present when the page loads: no role needed.",
   "Time-sensitive alert after a user action: role=\"alert\". It can be intrusive, so use it sparingly.",
   "Alert that also needs interaction, such as acknowledging before going on: role=\"alertdialog\".",
   "Advisory message after a user action: role=\"status\". It informs assistive technology without interrupting.",
   "Must-read content on page load: consider a Summary box instead of an alert."]},
  {h:"Alt text for icons and images",items:[
   "Decorative images need no alt text. Informative images need meaningful alt text.",
   "The test: is information lost if the image is removed? The page applies this to the icons in Alert and points to the content style guide."]},
  {h:"Dismissible alerts",items:[
   "Dismissing removes the element, so keyboard and screen reader users can lose focus, and some browsers jump to the top of the page.",
   "Move focus to the next logical place, such as the next heading or the h1."]},
  {h:"Mobile app",items:[
   "Prefer native components (alerts, dialogs, action sheets, snackbars) when they fit better than an in-content alert.",
   "Announce expanded and collapsed states. Don't disable buttons inside an alert. Use accessibilityLabel and accessibilityLabelledBy where they help."]}],
  status:["Web checklist: 9 of 10 complete. Mobile app: 0 of 13.","Tested against older criteria and not yet audited against the updated testing criteria.","No dedicated accessibility tests page."],
  tests:null}},

{id:"text-input",name:"Text input",tag:"va-text-input",kids:[],page:"/components/form/text-input",
 blurb:"A single-line field. Most uses come in through the forms library (textUI and friends).",
 stories:[
  RS("Required","uswds-va-text-input--required",'<va-text-input label="First name" name="first" required></va-text-input>'),
  RS("Hint text","uswds-va-text-input--with-hint-text",'<va-text-input label="Service number" name="svc" hint="You can find this on your DD214."></va-text-input>'),
  RS("Error","uswds-va-text-input--error",'<va-text-input label="Email address" name="email" error="Enter a valid email address" value="marisa@" required></va-text-input>'),
  RS("Success","uswds-va-text-input--success",'<va-text-input label="Email address" name="email2" success value="marisa@example.com"></va-text-input>'),
  RS("Character count","uswds-va-text-input--with-character-count",'<va-text-input label="Tell us more" name="more" maxlength="60" charcount></va-text-input>'),
  RS("Currency","uswds-va-text-input--with-currency",'<va-text-input label="Monthly income" name="inc" currency inputmode="decimal"></va-text-input>'),
  RS("Prefix (icon)","uswds-va-text-input--with-icon",'<va-text-input label="Search" name="q" input-icon-prefix="search"></va-text-input>'),
  RS("Suffix (text)","uswds-va-text-input--with-suffix",'<va-text-input label="Weight" name="wt" input-suffix="lbs" inputmode="numeric"></va-text-input>'),
  RS("Widths","uswds-va-text-input--widths",'<va-text-input label="ZIP code" name="zip" width="sm"></va-text-input>',"Width options come from the width prop, such as 2xs, xs, sm, md and lg.")],
 a11y:{sections:[
  {h:"Additional considerations for VA",items:[
   "Avoid placeholder text, except in the max characters variation (v1).",
   "Browsers' default placeholder rendering often doesn't give enough contrast.",
   "Placeholder text disappears once someone clicks into the field, so it isn't there when they review what they entered.",
   "It adds further problems for people with cognitive or visual disabilities."]}],
  status:["No accessibility tests page for this component (those pages exist for Button, Details, Link and Tag - Status)."],tests:null}},

{id:"radio",name:"Radio button",tag:"va-radio",kids:["va-radio-option"],page:"/components/form/radio-button",
 blurb:"One choice from a short list. Yes/no questions and most choice fields in forms use it.",
 stories:[
  RS("Default","uswds-va-radio--default",'<va-radio label="Which best describes your service?" required><va-radio-option label="Active duty" name="svc" value="active"></va-radio-option><va-radio-option label="National Guard or Reserves" name="svc" value="guard"></va-radio-option><va-radio-option label="Veteran" name="svc" value="vet"></va-radio-option></va-radio>'),
  RS("Tile","uswds-va-radio--tile",'<va-radio label="How would you like us to contact you?"><va-radio-option label="Email" name="ct" value="email" tile></va-radio-option><va-radio-option label="Phone" name="ct" value="phone" tile></va-radio-option></va-radio>'),
  RS("Hint text","uswds-va-radio--hint",'<va-radio label="Do you have a dependent?" hint="Include a spouse, child or parent."><va-radio-option label="Yes" name="dep" value="y"></va-radio-option><va-radio-option label="No" name="dep" value="n"></va-radio-option></va-radio>'),
  RS("Label header","uswds-va-radio--label-header",'<va-radio label="Marital status" label-header-level="3"><va-radio-option label="Married" name="ms" value="m"></va-radio-option><va-radio-option label="Not married" name="ms" value="n"></va-radio-option></va-radio>'),
  RS("Error","uswds-va-radio--error",'<va-radio label="Do you have a dependent?" error="Select yes or no" required><va-radio-option label="Yes" name="dep2" value="y"></va-radio-option><va-radio-option label="No" name="dep2" value="n"></va-radio-option></va-radio>')],
 a11y:{sections:[],
  status:["The radio button page on design.va.gov has an “Accessibility considerations” heading with no text under it yet.","No component-specific accessibility tests page."],tests:null,
  gap:"This is a gap worth knowing about. Check the Storybook docs and the general accessibility testing guidance for design system components before you rely on it."}},

{id:"telephone",name:"Telephone",tag:"va-telephone",kids:[],page:"/components/telephone",
 blurb:"Formats a phone number and makes it tappable. Used everywhere contact info appears.",
 stories:[
  RS("Default","components-va-telephone--default",'<va-telephone contact="8008271000"></va-telephone>'),
  RS("Three digit number","components-va-telephone--three-digit-number",'<va-telephone contact="988"></va-telephone>'),
  RS("Extension","components-va-telephone--extension",'<va-telephone contact="8005551234" extension="123"></va-telephone>'),
  RS("Not clickable","components-va-telephone--not-clickable",'<va-telephone contact="8005551234" not-clickable></va-telephone>'),
  RS("International","components-va-telephone--international",'<va-telephone contact="2079460958" country-code="44" international></va-telephone>'),
  RS("Aria described by","components-va-telephone--aria-described-by",'<va-telephone contact="8005551234" message-aria-describedby="Call the main benefits line"></va-telephone>'),
  RS("TTY","components-va-telephone--tty",'<va-telephone contact="711" tty></va-telephone>'),
  RS("SMS","components-va-telephone--sms",'<va-telephone contact="838255" sms></va-telephone>'),
  RS("Vanity number","components-va-telephone--vanity-number",'<va-telephone contact="8005551234" vanity="VA-HELP"></va-telephone>')],
 a11y:{sections:[
  {h:"Accessibility considerations",items:[
   "Don't add ARIA labels to phone numbers or TTY numbers. Questions go to the Accessibility Design Experience (ADE) team.",
   "Avoid message-aria-describedby when a label or nearby text already explains the number. Use it only when screen reader users need context that sighted users get visually."]}],
  status:["No accessibility tests page for this component."],tests:null}},

{id:"memorable-date",name:"Memorable date",tag:"va-memorable-date",kids:[],page:"/components/form/memorable-date",
 blurb:"Month, day and year fields for a date people know by heart, like a birth date.",
 stories:[
  RS("Default","uswds-va-memorable-date--default",'<va-memorable-date label="Date of birth" name="dob" required></va-memorable-date>'),
  RS("Month select","uswds-va-memorable-date--with-month-select",'<va-memorable-date label="Date of birth" name="dob2" month-select></va-memorable-date>'),
  RS("Extra hint text","uswds-va-memorable-date--extra-hint-text",'<va-memorable-date label="Date you left active duty" name="sep" hint="If you’re not sure, enter your best guess."></va-memorable-date>'),
  RS("Error","uswds-va-memorable-date--error",'<va-memorable-date label="Date of birth" name="dob3" error="Enter a valid date" required></va-memorable-date>'),
  RS("Error with month select","uswds-va-memorable-date--error-with-month-select",'<va-memorable-date label="Date of birth" name="dob4" error="Enter a valid date" month-select required></va-memorable-date>')],
 a11y:{sections:[],
  status:["The page's “Accessibility considerations” heading has no text under it yet.","The checklist says it was tested against older criteria and hasn't been audited against the updated ones.","Interactive states listed in the checklist: hover, active, focus, keyboard focus, disabled. The remove-date-hint attribute hides the default hint text."],tests:null,
  gap:"Written guidance is missing for this component today, so use the checklist and Storybook docs as your starting point."}},

{id:"button",name:"Button",tag:"va-button",kids:[],page:"/components/button",
 blurb:"Starts an action: submit, continue, back, or load. Primary, secondary and big sizes.",
 stories:[
  RS("Primary","uswds-va-button--primary",'<va-button text="Save"></va-button>'),
  RS("Secondary","uswds-va-button--secondary",'<va-button text="Cancel" secondary></va-button>'),
  RS("Big","uswds-va-button--big",'<va-button text="Start your application" big></va-button>'),
  RS("Continue","uswds-va-button--continue",'<va-button text="Continue" continue></va-button>'),
  RS("Back","uswds-va-button--back",'<va-button text="Back" back></va-button>'),
  RS("Loading","uswds-va-button--loading",'<va-button text="Saving" loading></va-button>')],
 a11y:{sections:[
  {h:"Additional considerations for VA",items:[
   "Target size follows WCAG 2.2 Level AA: pointer targets are at least 24 by 24 CSS pixels.",
   "Leave at least one spacing unit between tappable elements.",
   "Don't change a button's label dynamically, and don't use labels to convey status.",
   "Use message-aria-describedby only when extra context helps. Don't use it to repeat the label or to carry essential information."]},
  {h:"Choose the right element: buttons vs. links",items:[
   "Buttons are for actions. Links are for navigation. Buttons should look like buttons and links should look like links.",
   "PDF links are usually links, but an explicit trigger such as “Generate PDF” calls for a button."]}],
  status:["Isolated component tests on v56.4.0: 15 passed, 0 failed, 4 conditional.","Test buttons in your own product too, because surrounding context can introduce issues."],
  tests:"/components/button/accessibility-tests/"}},

{id:"additional-info",name:"Additional info",tag:"va-additional-info",kids:[],page:"/components/additional-info",
 blurb:"A trigger link that opens extra detail without leaving the page.",
 stories:[
  RS("Default","uswds-va-additional-info--default",'<va-additional-info trigger="What is a service-connected condition?"><p style="'+rP+'">A condition that was caused or made worse by your active military service.</p></va-additional-info>',"Click the trigger to expand."),
  RS("No border","uswds-va-additional-info--no-border",'<va-additional-info trigger="What counts as proof of service?" disable-border><p style="'+rP+'">Your DD214 or other separation papers work for most applications.</p></va-additional-info>')],
 notice:"design.va.gov says va-additional-info will be deprecated. The text I could read doesn't name the replacement, so check the page before you start something new with it.",
 a11y:{sections:[
  {h:"Accessibility considerations",items:[
   "Validate against WCAG 2.2 AA.",
   "It uses aria-controls and aria-expanded to tell assistive technology about expand and collapse.",
   "The close button (button role) must close the component.",
   "The trigger link has the heading role so people can find it on the page. Setting an aria-level is recommended.",
   "Wrap all text inside va-additional-info in an element such as <p>, <span> or <div>. NVDA may ignore unwrapped plain text."]}],
  status:["Checklist: 9 of 13 items complete (69%).","Tested against older criteria and not yet audited against the updated ones.","No accessibility tests page for this component."],tests:null}},

{id:"loading-indicator",name:"Loading indicator",tag:"va-loading-indicator",kids:[],page:"/components/loading-indicator",
 blurb:"Tells people the page is loading more content.",
 stories:[
  RS("Default","components-va-loading-indicator--default",'<va-loading-indicator message="Loading your claims…"></va-loading-indicator>'),
  RS("Inline","",'<va-loading-indicator message="Saving…" inline></va-loading-indicator>',"Built from the inline prop. Not a Storybook story.")],
 a11y:{sections:[
  {h:"Accessibility considerations",items:[
   "On the web it uses aria-live=\"polite\", aria-label and aria-valuetext so screen reader users get the same information as everyone else.",
   "Write the message as a present-participle verb, an object and an ellipsis, like “Saving your draft…”.",
   "Mobile app: use equivalent accessibility hints and labels in React Native."]}],
  status:["No component-specific accessibility tests page."],tests:null}},

{id:"process-list",name:"Process list",tag:"va-process-list",kids:["va-process-list-item"],page:"/components/process-list",
 blurb:"Numbered steps, each with a heading and a short description.",
 stories:[
  RS("Default","uswds-va-process-list--default",'<va-process-list><va-process-list-item header="Gather your documents"><p style="'+rP+'">Find your DD214 and any medical records.</p></va-process-list-item><va-process-list-item header="Fill out the application"><p style="'+rP+'">It takes about 20 minutes.</p></va-process-list-item><va-process-list-item header="Wait for your decision"><p style="'+rP+'">We’ll contact you if we need more information.</p></va-process-list-item></va-process-list>'),
  RS("Status","uswds-va-process-list--status",'<va-process-list><va-process-list-item header="Submit your application" checkmark status-text="Complete"><p style="'+rP+'">We received it on June 3.</p></va-process-list-item><va-process-list-item header="We review your claim" active status-text="In progress"><p style="'+rP+'">A reviewer is looking at your evidence.</p></va-process-list-item><va-process-list-item header="Get your decision" pending status-text="Not started"><p style="'+rP+'">We’ll send a letter.</p></va-process-list-item></va-process-list>'),
  RS("Header size","uswds-va-process-list--header-size",'<va-process-list><va-process-list-item header="Smaller heading level" level="4"><p style="'+rP+'">Set the level prop to fit the page outline.</p></va-process-list-item><va-process-list-item header="Second step" level="4"><p style="'+rP+'">Keep levels consistent inside one list.</p></va-process-list-item></va-process-list>')],
 a11y:{sections:[
  {h:"Additional considerations for VA",items:[
   "Each step needs both a heading and content that describes the step in more detail. Headings alone aren't enough.",
   "If the list shows status updates, the eyebrow (status text) is required for accessibility."]}],
  status:["Tested against older criteria and not yet audited against the updated ones.","No component-specific accessibility tests page."],tests:null}},

{id:"accordion",name:"Accordion",tag:"va-accordion",kids:["va-accordion-item"],page:"/components/accordion",
 blurb:"Headings that expand to show more content. Good for long reference pages.",
 stories:[
  RS("Default","uswds-va-accordion--default",'<va-accordion section-heading="Eligibility"><va-accordion-item header="Who can apply?" level="3"><p style="'+rP+'">Veterans, service members and some family members.</p></va-accordion-item><va-accordion-item header="What documents do I need?" level="3"><p style="'+rP+'">Your DD214 and proof of any dependents.</p></va-accordion-item></va-accordion>',"Items open and close in the preview."),
  RS("Bordered","uswds-va-accordion--bordered",'<va-accordion bordered section-heading="Eligibility"><va-accordion-item header="Who can apply?" level="3"><p style="'+rP+'">Veterans, service members and some family members.</p></va-accordion-item><va-accordion-item header="What documents do I need?" level="3"><p style="'+rP+'">Your DD214 and proof of any dependents.</p></va-accordion-item></va-accordion>'),
  RS("Single select","uswds-va-accordion--single-select",'<va-accordion open-single section-heading="Eligibility"><va-accordion-item header="Who can apply?" level="3"><p style="'+rP+'">Opening one item closes the other.</p></va-accordion-item><va-accordion-item header="What documents do I need?" level="3"><p style="'+rP+'">Your DD214 and proof of any dependents.</p></va-accordion-item></va-accordion>'),
  RS("Subheader","uswds-va-accordion--subheader",'<va-accordion section-heading="Eligibility"><va-accordion-item header="Who can apply?" subheader="Applies to most Veterans" level="3"><p style="'+rP+'">Veterans, service members and some family members.</p></va-accordion-item></va-accordion>')],
 a11y:{sections:[
  {h:"Additional considerations for VA",items:[
   "When a page has more than one va-accordion group, set section-heading on each one. That gives each group's Expand all and Collapse all buttons a unique name, such as “Expand all eligibility requirements”.",
   "The component handles English, Spanish and Tagalog phrasing for those buttons.",
   "Interactive elements inside a collapsed accordion item are not focusable."]}],
  status:["Tested against older criteria and not yet audited against the updated ones.","No component-specific accessibility tests page."],tests:null}},

{id:"icon",name:"Icon",tag:"va-icon",kids:[],page:"/components/icon",
 blurb:"Icons from the VA sprite. Decorative by default, semantic when given text.",
 stories:[
  RS("Sizes","uswds-va-icon--icons",'<div style="display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap"><va-icon icon="check_circle" size="3"></va-icon><va-icon icon="check_circle" size="4"></va-icon><va-icon icon="check_circle" size="5"></va-icon><va-icon icon="check_circle" size="6"></va-icon><va-icon icon="check_circle" size="7"></va-icon><va-icon icon="check_circle" size="8"></va-icon></div>',"Sizes 3 to 8 are 24, 32, 40, 48, 56 and 64 px. With no size it is 1em. The Storybook story lists every available icon."),
  RS("Decorative","uswds-va-icon--icons",'<p style="display:flex;align-items:center;gap:8px;margin:0"><va-icon icon="info" size="3"></va-icon>Your claim is in review.</p>',"No srtext. The component hides it from assistive technology."),
  RS("Semantic","uswds-va-icon--icons",'<p style="display:flex;align-items:center;gap:8px;margin:0"><va-icon icon="warning" size="3" srtext="Warning"></va-icon>Missing information</p>',"srtext gives screen readers the meaning the icon carries.")],
 variants:{h:"Icons named in markup",note:"Counts of icon=\"…\" written directly in markup (values set in code aren't counted).",rows:[["chevron_right",18],["warning",18],["check_circle",17],["error",13],["file_download",11],["close",10],["autorenew",9],["navigate_next",8],["account_circle",8],["attach_file",7]]},
 a11y:{sections:[
  {h:"Decorative vs. semantic",items:[
   "Icon use falls into two categories: decorative and semantic.",
   "Decorative icons only reinforce visuals. If removing them wouldn't stop anyone understanding or using the page, don't add srtext. The component adds aria-hidden for you.",
   "Icons in buttons usually aren't necessary. Icon buttons with a visible label are supported in limited, case-by-case ways through Button - Icon."]},
  {h:"Semantic icons",items:[
   "Semantic icons carry meaning, including icon-only interactive elements.",
   "Avoid icons alone as links or buttons: links and buttons should always have a visible label.",
   "The exceptions are a modal or alert close button. Use the design system component, which has the right accessibility attributes."]}],
  status:["Tested against older criteria and not yet audited against the updated ones.","No component-specific accessibility tests page."],tests:null}}
];

/* ---------- Reference: logic ---------- */
const R={mode:"comp",comp:"link",tab:"states",prod:0,pq:"",uq:"",all:false,tok:0,inited:false};
const rx=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const rnum=n=>Number(n).toLocaleString("en-US");
const rComp=id=>REF_COMPS.find(c=>c.id===id);
const rIdx=id=>REF_USAGE.order.indexOf(id);
const rUrl=p=>p&&p[1]?"https://www.va.gov"+p[1]:null;
const rTotal=k=>REF_USAGE.M[k].reduce((a,b)=>a+b,0);
const rMat=t=>{const m=(REF_PROPS[t]||{}).mat||[];return m[0]?(m[0]+" · "+String(m[1]||"").replace(/_/g," ")):""};
const rCode=s=>rx(s).replace(/`([^`]+)`/g,"<code>$1</code>");

function rPretty(h){
  const t=document.createElement("template");t.innerHTML=h;
  const f=(n,d)=>{const pad="  ".repeat(d);
    if(n.nodeType===3){const s=n.textContent.trim();return s?pad+s:""}
    const tag=n.localName,at=[...n.attributes].filter(a=>a.name!=="style").map(a=>a.value===""?a.name:a.name+'="'+a.value+'"').join(" ");
    const open="<"+tag+(at?" "+at:"")+">";
    const kids=[...n.childNodes].filter(k=>k.nodeType===1||k.textContent.trim());
    if(!kids.length)return pad+open+"</"+tag+">";
    if(kids.every(k=>k.nodeType===3))return pad+open+kids.map(k=>k.textContent.trim()).join(" ")+"</"+tag+">";
    return pad+open+"\n"+kids.map(k=>f(k,d+1)).join("\n")+"\n"+pad+"</"+tag+">"};
  return [...t.content.childNodes].map(k=>f(k,0)).filter(Boolean).join("\n");
}

/* ----- live components (real VA web components from unpkg, styled inside each preview's shadow root) ----- */
let rLive=null,rSheet=undefined;
const R_FONT=':host,:root{--vads-font-family-sans:"Public Sans","Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;--vads-font-family-heading:"Public Sans","Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;--font-family-sans:"Public Sans","Helvetica Neue",Helvetica,Roboto,Arial,sans-serif}html,body,.usa-sans,.usa-sans *{font-family:var(--vads-font-family-sans)}h1,h2,h3,h4,h5,h6{font-family:var(--vads-font-family-heading)!important}';
const R_PREFIX=':host{display:block;font-family:"Public Sans","Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;font-size:16px;line-height:1.5;color:#1b1b1b}';
function rLoadLive(){
  if(rLive)return rLive;
  rLive=new Promise(res=>{
    const t=setTimeout(()=>{rLive=null;res(false)},12000);
    try{globalThis.getVaIconSpriteLocation=()=>REF_WC+"dist/img/sprite.svg"}catch(e){}
    import(REF_WC+"dist/component-library/component-library.esm.js")
      .then(()=>customElements.whenDefined("va-alert")).then(()=>{clearTimeout(t);res(true)})
      .catch(()=>{clearTimeout(t);rLive=null;res(false)});
  });
  return rLive;
}
function rSheetGet(){
  if(rSheet!==undefined)return rSheet;
  try{rSheet=new CSSStyleSheet();rSheet.replaceSync(R_PREFIX+REF_CSS+R_FONT)}catch(e){rSheet=null}
  return rSheet;
}
function rMountPreview(el,html,opts){
  const root=el.attachShadow({mode:"open"});
  const sh=rSheetGet();
  if(sh)root.adoptedStyleSheets=[sh];else{const st=document.createElement("style");st.textContent=R_PREFIX+REF_CSS+R_FONT;root.append(st)}
  const w=document.createElement("div");w.innerHTML=html;root.append(w);
  if(opts&&opts.spec){
    /* Spec view: the same real components, with the dot grid, dashed outlines and size labels drawn over them */
    const st=document.createElement("style");
    st.textContent=".__w{position:relative;background-color:#fbfcfd;background-image:radial-gradient(rgba(0,94,162,.18) 1px,transparent 1.2px);background-size:12px 12px}.__w *{outline:1px dashed rgba(0,94,162,.55)!important;outline-offset:-1px}.__spec{position:absolute;font:500 10px/1 'Roboto Mono',ui-monospace,monospace;color:#005ea2;background:#fff;padding:2px 4px;pointer-events:none;z-index:99;white-space:nowrap;border:1px solid rgba(0,94,162,.3);outline:0!important}";
    root.append(st);w.className="__w";
    const label=()=>{
      w.querySelectorAll(".__spec").forEach(x=>x.remove());
      const wr=w.getBoundingClientRect();let n=0;
      w.querySelectorAll(":scope *").forEach(e=>{
        if(n>=22||e.classList.contains("__spec"))return;
        const r=e.getBoundingClientRect();if(r.width<44||r.height<14)return;n++;
        const l=document.createElement("span");l.className="__spec";l.textContent=Math.round(r.width)+"\u00d7"+Math.round(r.height);
        l.style.left=(r.left-wr.left)+"px";l.style.top=Math.max(0,r.top-wr.top)+"px";w.append(l);
      });
    };
    setTimeout(label,300);setTimeout(label,1200);
    try{new ResizeObserver(()=>{clearTimeout(w.__t);w.__t=setTimeout(label,120)}).observe(w)}catch(e){}
  }
  root.addEventListener("click",e=>{if(e.composedPath().some(n=>n&&n.localName==="a"))e.preventDefault()});
}
window.__rMount=rMountPreview; /* test hook */
async function rMountAll(){
  const tok=++R.tok,note=$("#r-live");
  if(note)note.textContent="Loading the real VA web components…";
  const ok=await rLoadLive();
  if(tok!==R.tok)return;
  const c=rComp(R.comp);
  document.querySelectorAll("#r-panel .rprev").forEach(el=>{
    const s=c.stories[+el.dataset.i];
    if(!ok){el.innerHTML='<p class="rfb">Live preview isn’t available here. The markup is below, and the Storybook link shows the real thing.</p>';const d=el.closest(".rstate").querySelector("details");if(d)d.open=true;return}
    if(!el.shadowRoot)rMountPreview(el,s.h);
  });
  if(note)note.textContent=ok?"These previews are the real VA web components (v"+REF_WC_VER+"), loaded live. Fonts and spacing can differ slightly from VA.gov.":"Couldn’t load the live components here, so only the markup is shown. The Storybook links open the real components.";
  if(!ok&&note)note.className="rnote warn";
}

/* ----- sidebar ----- */
function rSide(){
  const U=REF_USAGE;
  $("#r-mode").querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.rm===R.mode)));
  $("#r-search").hidden=R.mode!=="prod";
  $("#r-list").classList.toggle("r-list-scroll",R.mode==="prod");
  $("#r-asof").textContent="Counted in vets-website at commit "+REF_META.commit+" ("+REF_META.asof+"): VA web component tags in src/applications and src/platform, plus forms-library fields like textUI and radioUI that render them. Tests, mocks and content-build pages aren’t counted. A “use” is one place in the code, not a page view.";
  if(R.mode==="comp"){
    $("#r-list-h").textContent="Most used on VA.gov";
    const max=Math.max(...REF_COMPS.map(c=>U.C[c.id].u));
    const list=[...REF_COMPS].sort((a,b)=>U.C[b.id].u-U.C[a.id].u);
    $("#r-list").innerHTML=list.map(c=>{const u=U.C[c.id];
      return '<button class="rrow" data-c="'+c.id+'" aria-current="'+(R.comp===c.id)+'"><span class="rt"><span class="rn">'+rx(c.name)+'</span><span class="rbar split"><i style="width:'+(u.d/max*100)+'%"></i><i class="lib" style="width:'+(u.l/max*100)+'%"></i></span><span class="rm">'+rnum(u.u)+' uses · '+u.n+' products</span></span></button>'}).join("");
  }else{
    $("#r-list-h").textContent="Products, by components used";
    const q=R.pq.trim().toLowerCase();
    const ks=Object.keys(U.M).map(Number).filter(k=>!q||(U.P[k][0]+" "+U.P[k][2]).toLowerCase().includes(q)).sort((a,b)=>rTotal(b)-rTotal(a));
    $("#r-list").innerHTML=ks.length?ks.map(k=>'<button class="rrow" data-p="'+k+'" aria-current="'+(R.prod===k)+'"><span class="rt"><span class="rn">'+rx(U.P[k][0])+'</span><span class="rm">'+rnum(rTotal(k))+' uses · '+rx(U.P[k][2].replace("src/applications/","").replace("src/",""))+'</span></span></button>').join(""):'<p class="rnote" style="padding:14px 18px">No products match.</p>';
  }
}

/* ----- main: component ----- */
const R_TABS=[["states","States"],["used","Where it’s used"],["a11y","Accessibility"],["props","Props & code"]];
function rMainComp(){
  const c=rComp(R.comp),u=REF_USAGE.C[c.id],first=c.stories.find(s=>s.id);
  const pills='<span class="rpill">&lt;'+c.tag+'&gt;</span>'+(rMat(c.tag)?'<span class="rpill">'+rx(rMat(c.tag))+'</span>':"");
  $("#r-main").innerHTML=
   '<div class="titlebar"><div style="min-width:0"><h2>'+rx(c.name)+'</h2><p class="sum">'+rx(c.blurb)+'</p><div style="margin-top:10px">'+pills+'</div>'
   +'<div class="rlinks"><a href="'+REF_DS+c.page+'" target="_blank" rel="noopener">design.va.gov page ↗</a>'+(first?'<a href="'+REF_SB+first.id+'" target="_blank" rel="noopener">Storybook ↗</a>':"")+'</div></div></div>'
   +'<div class="rtabs"><div class="seg" role="group" aria-label="Component sections">'+R_TABS.map(t=>'<button data-rt="'+t[0]+'" aria-pressed="'+(R.tab===t[0])+'">'+t[1]+'</button>').join("")+'</div></div>'
   +'<div id="r-panel" style="display:grid;gap:16px;min-width:0"></div>';
  rPanel();
}
function rPanel(){
  const c=rComp(R.comp),p=$("#r-panel");
  document.querySelectorAll("#r-main [data-rt]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.rt===R.tab)));
  R.tok++;
  if(R.tab==="states"){p.innerHTML=pStates(c);rMountAll()}
  else if(R.tab==="used")p.innerHTML=pUsed(c);
  else if(R.tab==="a11y")p.innerHTML=pA11y(c);
  else p.innerHTML=pProps(c);
}
function pStates(c){
  return (c.notice?'<p class="rnote warn">'+rx(c.notice)+'</p>':"")
   +'<p class="rnote" id="r-live" role="status"></p><div class="rgrid">'+c.stories.map((s,i)=>
    '<article class="rstate"><div class="rsh"><h3>'+rx(s.n)+'</h3>'+(s.id?'<a href="'+REF_SB+s.id+'" target="_blank" rel="noopener" aria-label="'+rx(s.n)+' in Storybook">Storybook ↗</a>':'')+'</div>'
    +'<div><div class="rprev" data-i="'+i+'" role="group" aria-label="'+rx(c.name+": "+s.n)+' preview"></div>'+(s.note?'<p class="rsn">'+rx(s.note)+'</p>':'')+'</div>'
    +'<details><summary>Markup</summary><button class="cp" data-cp="'+i+'">Copy</button><pre>'+rx(rPretty(s.h))+'</pre></details></article>').join("")+'</div>';
}
function rUsedRows(c){
  const U=REF_USAGE,i=rIdx(c.id),q=R.uq.trim().toLowerCase();
  let rows=Object.keys(U.M).map(Number).map(k=>({k,n:U.M[k][i]})).filter(r=>r.n>0);
  rows.sort((a,b)=>b.n-a.n||U.P[a.k][0].localeCompare(U.P[b.k][0]));
  const max=rows.length?rows[0].n:1,sp=new Map(U.C[c.id].r.map(r=>[r[0],r]));
  const total=rows.length;
  if(q)rows=rows.filter(r=>(U.P[r.k][0]+" "+U.P[r.k][2]).toLowerCase().includes(q));
  const shown=(R.all||q)?rows:rows.slice(0,15);
  const html=shown.map(r=>{const p=U.P[r.k],s=sp.get(r.k),u=rUrl(p);
    const bar=s&&s[2]>0?'<span class="rbar split"><i style="width:'+(s[1]/max*100)+'%"></i><i class="lib" style="width:'+(s[2]/max*100)+'%"></i></span>':'<span class="rbar"><i style="width:'+(r.n/max*100)+'%"></i></span>';
    return '<li class="rp"><div class="rp-top"><button class="rp-name" data-gop="'+r.k+'">'+(r.k===0?'<span class="rpill">Shared</span>':'')+rx(p[0])+'</button><span class="rp-n">'+rnum(r.n)+'</span></div>'+bar
      +'<div class="rp-meta"><code>'+rx(p[2])+'</code>'+(u?'<a href="'+u+'" target="_blank" rel="noopener">va.gov'+rx(p[1].length>48?p[1].slice(0,46)+"…":p[1])+' ↗</a>':'')+'</div></li>'}).join("");
  return {html:html||'<li class="rp"><span class="rnote">No products match.</span></li>',more:!R.all&&!q&&rows.length>15?rows.length:0,total};
}
function pUsed(c){
  const U=REF_USAGE,u=U.C[c.id],rr=rUsedRows(c);
  let h='<section class="rcard"><h3 class="rh">Across VA.gov code</h3><div class="rstat"><div><b>'+rnum(u.u)+'</b><span>uses</span></div><div><b>'+u.n+'</b><span>products</span></div>'
   +(u.l>0?'<div><b>'+rnum(u.d)+'</b><span>direct tags</span></div><div><b>'+rnum(u.l)+'</b><span>through forms-library patterns</span></div>':'<div><b>'+rnum(u.d)+'</b><span>direct tags</span></div>')+'</div>'
   +(u.l>0?'<p class="rnote" style="padding:0 18px 16px">Most form fields reach this component through the forms library, so the lighter bar shows those. Shared platform code is counted as one product.</p>':'<p class="rnote" style="padding:0 18px 16px">Shared platform code is counted as one product, even though many products reuse it.</p>')+'</section>';
  if(c.variants){h+='<section class="rcard"><h3 class="rh">'+rx(c.variants.h)+'</h3><div class="rvar">'+(()=>{const m=Math.max(...c.variants.rows.map(r=>r[1]));return c.variants.rows.map(r=>'<div class="vr"><code>'+rx(r[0])+'</code><span class="rbar"><i style="width:'+(r[1]/m*100)+'%"></i></span><b>'+r[1]+'</b></div>').join("")})()+'</div><p class="rnote" style="padding:0 18px 16px">'+rx(c.variants.note)+'</p></section>'}
  h+='<section class="rcard"><h3 class="rh">Products that use it</h3><div class="rfilter"><input id="r-uq" type="search" placeholder="Filter products" aria-label="Filter products" value="'+rx(R.uq)+'"></div><ul class="rp-list" id="r-rows">'+rr.html+'</ul>'+(rr.more?'<button class="rmore" id="r-more">Show all '+rr.more+' products</button>':'<span id="r-more" hidden></span>')+'</section>';
  return h;
}
function pA11y(c){
  const a=c.a11y;
  let h='<p class="rnote">Summarized from the design.va.gov '+rx(c.name)+' page on '+REF_META.asof+'. The page is the source of truth, so check it for exact wording. <a href="'+REF_DS+c.page+'" target="_blank" rel="noopener" style="color:var(--tint)">Open it ↗</a></p>';
  if(a.gap)h+='<p class="rnote warn">'+rx(a.gap)+'</p>';
  h+=a.sections.map(s=>'<section class="rcard ra-sec"><h3 class="rh">'+rx(s.h)+'</h3><ul>'+s.items.map(i=>'<li>'+rx(i).replace(/&lt;[^&]*?&gt;/g,m=>"<code>"+m+"</code>")+'</li>').join("")+'</ul></section>').join("");
  h+='<section class="rcard ra-sec"><h3 class="rh">Status</h3><ul>'+a.status.map(i=>'<li>'+rx(i)+'</li>').join("")+'</ul>'
   +(a.tests?'<div class="rb"><div class="rlinks" style="margin:0"><a href="'+REF_DS+a.tests+'" target="_blank" rel="noopener">Accessibility tests ↗</a></div></div>':'')+'</section>';
  return h;
}
function pProps(c){
  const tags=[c.tag,...c.kids];
  let h=tags.map(t=>{const d=REF_PROPS[t];if(!d)return"";
    return '<section class="rcard"><h3 class="rh"><code>&lt;'+t+'&gt;</code></h3>'+(d.props.length?'<p class="rprop-h">Properties</p>'+d.props.map(p=>'<div class="rprop"><div class="pt"><code>'+rx(p[0])+'</code><span class="ty">'+rx(p[1])+'</span>'+(p[2]?'<span class="df">default: '+rx(p[2])+'</span>':'')+'</div>'+(p[3]?'<p class="pd">'+rCode(p[3])+'</p>':'')+'</div>').join(""):'<p class="rnote" style="padding:6px 18px 12px">No properties.</p>')
      +(d.events.length?'<p class="rprop-h">Events</p><div class="rprop"><div class="pt">'+d.events.map(e=>'<code>'+rx(e)+'</code>').join(" ")+'</div></div>':'')+'</section>'}).join("");
  const s=c.stories[0];
  h+='<section class="rcard rcode"><h3 class="rh">Starter markup</h3><button class="cp" data-cp="start">Copy</button><pre class="rpre">'+rx(rPretty(s.h))+'</pre></section>';
  h+='<p class="rnote">Properties come from the web-components package (v'+REF_WC_VER+') docs. Class names and slots can differ in the React bindings.</p>';
  return h;
}

/* ----- main: product ----- */
function rMainProd(){
  const U=REF_USAGE,k=R.prod,p=U.P[k],row=U.M[k],u=rUrl(p);
  const ids=U.order.map((id,i)=>({id,n:row[i]})),used=ids.filter(x=>x.n>0).sort((a,b)=>b.n-a.n),none=ids.filter(x=>!x.n);
  const max=used.length?used[0].n:1;
  $("#r-main").innerHTML=
   '<div class="titlebar"><div style="min-width:0"><h2>'+rx(p[0])+'</h2><p class="sum"><code>'+rx(p[2])+'</code></p>'+(u?'<div class="rlinks"><a href="'+u+'" target="_blank" rel="noopener">Open on va.gov ↗</a></div>':'')+'</div></div>'
   +'<section class="rcard"><h3 class="rh">Components it uses</h3><div class="rstat"><div><b>'+rnum(rTotal(k))+'</b><span>uses of these 12 components</span></div><div><b>'+used.length+'</b><span>of 12 components</span></div></div>'
   +used.map(x=>{const c=rComp(x.id);return '<button class="rprodrow" data-goc="'+x.id+'"><span class="rp-top"><span class="rp-name">'+rx(c.name)+'</span><span class="rp-n">'+rnum(x.n)+'</span></span><span class="rbar"><i style="width:'+(x.n/max*100)+'%"></i></span></button>'}).join("")
   +(none.length?'<p class="rnote" style="padding:12px 18px 16px">Not used here: '+none.map(x=>rx(rComp(x.id).name)).join(", ")+'.</p>':'')+'</section>'
   +'<p class="rnote">Pick a component to see its states, other products that use it and accessibility guidance. Counts cover this product’s own code only. Shared platform code is listed separately.</p>';
}

function rRender(){
  rSide();
  if(R.mode==="comp")rMainComp();else rMainProd();
}
function renderRef(){if(!R.inited){R.inited=true;rLoadLive()}rRender()}
function rScrollMain(){if(window.matchMedia("(max-width:979px)").matches){const m=$("#r-main");m.scrollIntoView({behavior:"smooth",block:"start"})}}
function rCopy(txt){
  const done=()=>toast("Copied");
  try{navigator.clipboard.writeText(txt).then(done,()=>{rCopyFallback(txt);done()})}catch(e){rCopyFallback(txt);done()}
}
function rCopyFallback(t){const a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0";document.body.append(a);a.select();try{document.execCommand("copy")}catch(e){}a.remove()}

(function rWire(){
  const v=$("#view-ref");
  v.addEventListener("click",e=>{
    const t=e.target.closest("button,a");if(!t||!v.contains(t))return;
    if(t.dataset.rm){R.mode=t.dataset.rm;rRender();return}
    if(t.dataset.c){R.comp=t.dataset.c;R.uq="";R.all=false;rRender();rScrollMain();return}
    if(t.dataset.p){R.prod=+t.dataset.p;rRender();rScrollMain();return}
    if(t.dataset.rt){R.tab=t.dataset.rt;rPanel();return}
    if(t.dataset.gop){R.mode="prod";R.prod=+t.dataset.gop;rRender();rScrollMain();return}
    if(t.dataset.goc){R.mode="comp";R.comp=t.dataset.goc;R.tab="used";R.uq="";R.all=false;rRender();rScrollMain();return}
    if(t.id==="r-more"){R.all=true;$("#r-panel").innerHTML=pUsed(rComp(R.comp));return}
    if(t.dataset.cp){const c=rComp(R.comp);const s=t.dataset.cp==="start"?c.stories[0]:c.stories[+t.dataset.cp];rCopy(rPretty(s.h));return}
  });
  v.addEventListener("input",e=>{
    if(e.target.id==="r-q"){R.pq=e.target.value;rSide()}
    if(e.target.id==="r-uq"){R.uq=e.target.value;const rr=rUsedRows(rComp(R.comp));$("#r-rows").innerHTML=rr.html;const m=$("#r-more");if(m)m.hidden=!rr.more}
  });
})();

/* ---------- Prototype: state and model ---------- */
const PT_KEY="vads-proto-v1";
const PT_TYPES=[
  ["form","Standard form flow","Introduction, steps, review and confirmation. Pages come from the Forms tab."],
  ["subtask","Sub-task","One to three steps inside a larger application. Pages come from the Forms tab."],
  ["page","Application page","A dashboard, detail view or settings page. You compose it from components."],
  ["mix","Mix","A form flow plus pages you compose."]
];
const PT_TYPE_LABEL={form:"Standard form flow",subtask:"Sub-task",page:"Application page",mix:"Mix"};

/* ---------- Templates that follow "What are you building?" ----------
   Page templates add composed pages (VADS blocks, in order). Form templates replace the form on the Forms tab (Undo is there). */
const PT_PAGE_TEMPLATES=[
  {id:"dash",name:"Benefits dashboard",desc:"What a Veteran needs first, then where to go next.",blocks:[["va-alert","Important update"],["va-summary-box","Key information"],["va-card","Benefit or claim card"],["va-link-action","Main action"],["va-need-help","Need help"]]},
  {id:"status",name:"Claim or request status",desc:"Where things stand, what is done, and what happens next.",blocks:[["va-tag-status","Current status"],["va-process-list","Steps"],["va-table","Documents and updates"],["va-accordion","What happens next"],["va-need-help","Need help"]]},
  {id:"detail",name:"Detail view",desc:"One record in full, with a way to jump around the page.",blocks:[["va-on-this-page","On this page"],["va-summary-box","Main facts"],["va-accordion","Full details"],["va-additional-info","Term or rule help"],["va-button","Next step"]]},
  {id:"settings",name:"Settings page",desc:"Choices a Veteran can change and save.",blocks:[["va-radio","Single choice"],["va-checkbox-group","Several choices"],["va-text-input","Editable value"],["va-button-pair","Save and Cancel"],["va-alert","Saved confirmation"]]},
  {id:"search",name:"Search and results",desc:"Find something, then browse a long list.",blocks:[["va-search-input","Search box"],["va-table","Results"],["va-pagination","Page controls"]]}
];
const PT_FORM_TEMPLATES=[
  {id:"f-blank",name:"Blank form",desc:"An empty introduction and one empty chapter.",kinds:["form","subtask","mix"],make:()=>blankForm()},
  {id:"f-core",name:"Personal, address and contact",desc:"Three chapters most VA forms start with. Review and confirmation pages come with every form.",kinds:["form","mix"],make:()=>normForm({title:"New form",formName:"",formId:"XX-XXXX",intro:"",whatToKnow:[],chapters:[{type:"personal",title:"Your personal information",includeDob:true,includeServiceNumber:false},{type:"address",title:"Mailing address",militaryCheckbox:true},{type:"phone_email",title:"Contact information",includeEmail:true}]},"")},
  {id:"f-example",name:"Example: request military service records",desc:"A finished five-chapter form to learn from or edit.",kinds:["form","mix"],make:()=>exampleForm()},
  {id:"f-contact",name:"Update contact information",desc:"Two steps: mailing address, then phone and email.",kinds:["subtask"],make:()=>normForm({title:"Update your contact information",formName:"",formId:"XX-XXXX",intro:"",whatToKnow:[],chapters:[{type:"address",title:"Mailing address",militaryCheckbox:true},{type:"phone_email",title:"Phone and email",includeEmail:true}]},"")},
  {id:"f-confirm",name:"Confirm personal information",desc:"One step: check name and date of birth.",kinds:["subtask"],make:()=>normForm({title:"Confirm your personal information",formName:"",formId:"XX-XXXX",intro:"",whatToKnow:[],chapters:[{type:"personal",title:"Your personal information",includeDob:true,includeServiceNumber:false}]},"")}
];
function ptApplyPageTemplate(t){if(window.__applyPageTemplate)window.__applyPageTemplate(t)} /* defined with the Compose code, which owns the block format */
function ptApplyFormTemplate(t){
  snap();FS.m=t.make();FS.ans={};FS.sel="intro";FS.step="intro";afterStruct();ptRender();
  toast(t.name+" is now the form. Undo is on the Forms tab.");
}
function ptTemplateGroup(){
  const forms=PT_FORM_TEMPLATES.filter(t=>t.kinds.includes(PT.type)),pages=(PT.type==="page"||PT.type==="mix")?PT_PAGE_TEMPLATES:[];
  const row=(t,kind,fn)=>fel("div",{class:"cell"},fel("div",{class:"tx"},fel("b",{text:t.name}),fel("p",{class:"fhint",text:t.desc+(kind==="form"?" Replaces the form on the Forms tab.":" Adds a page.")})),
    (b=>{b.onclick=()=>fn(t);return b})(fel("button",{class:"tool",type:"button","aria-label":"Use the "+t.name+" template",text:"Use"})));
  const rows=[].concat(forms.map(t=>row(t,"form",ptApplyFormTemplate)),pages.map(t=>row(t,"page",ptApplyPageTemplate)));
  return fel("div",{class:"group"},fel("p",{class:"ghead",id:"pt-tmpl-h",text:"Start from a template"}),
    fel("div",{class:"inset",role:"group","aria-labelledby":"pt-tmpl-h"},rows),
    fel("p",{class:"gfoot",text:"Templates match what you are building. Choose a different type above to see its templates."}));
}
const PT_SRC=[["user","Veteran enters it"],["prefill","Prefilled from profile"],["api","Looked up from another system"],["derived","Worked out from other answers"],["static","Static content"]];
const PT_SRC_LABEL=Object.fromEntries(PT_SRC);
const PT_VADS=[["va-accordion","Accordion"],["va-additional-info","Additional info"],["va-alert","Alert"],["va-alert-expandable","Alert, expandable"],["va-banner","Banner"],["va-breadcrumbs","Breadcrumbs"],["va-button","Button"],["va-button-pair","Button pair"],["va-card","Card"],["va-checkbox","Checkbox"],["va-checkbox-group","Checkbox group"],["va-date","Date"],["va-file-input","File input"],["va-link","Link"],["va-link-action","Link, action"],["va-memorable-date","Memorable date"],["va-need-help","Need help"],["va-search-input","Search input"],["va-modal","Modal"],["va-on-this-page","On this page"],["va-pagination","Pagination"],["va-process-list","Process list"],["va-radio","Radio"],["va-segmented-progress-bar","Segmented progress bar"],["va-select","Select"],["va-summary-box","Summary box"],["va-table","Table"],["va-tag-status","Tag, status"],["va-telephone","Telephone"],["va-text-input","Text input"],["va-textarea","Textarea"]];
const PT_FIELD_TAG={text:"va-text-input",textarea:"va-textarea",radio:"va-radio",checkbox:"va-checkbox-group",select:"va-select",yesno:"va-radio",date:"va-memorable-date",monthyear:"va-date",number:"va-text-input",currency:"va-text-input",ssn:"va-text-input",email:"va-text-input",phone:"va-text-input",file:"va-file-input",fullname:"va-text-input"};
const PT_PREFILLABLE=["Name","Date of birth","Address","Phone number","Email address","Social Security number","VA identifier"];
const PT_WHO_ORDER=["Backend","Engineering","Design","Design system","Research"];

const PT=(function(){
  const d={type:"page",name:"",team:"",creator:"",viewport:"mobile",problem:"",research:"",figma:"",url:"",
    pages:[],deps:{},qs:{},manual:[],mode:"review",snap:"",mobile:true};
  try{const raw=localStorage.getItem(PT_KEY);if(raw){const o=JSON.parse(raw);if(o&&typeof o==="object")Object.assign(d,o)}}catch(e){}
  if(!Array.isArray(d.pages))d.pages=[];
  if(!Array.isArray(d.manual))d.manual=[];
  if(!d.deps||typeof d.deps!=="object")d.deps={};
  if(!d.qs||typeof d.qs!=="object")d.qs={};
  return d;
})();
function ptSave(){try{localStorage.setItem(PT_KEY,JSON.stringify(PT))}catch(e){}}
const ptUid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const ptUsesForm=()=>PT.type==="form"||PT.type==="subtask"||PT.type==="mix";
const ptUsesPages=()=>PT.type==="page"||PT.type==="mix";
function ptTitle(){
  if(ptUsesForm()&&FS.m&&FS.m.title)return FS.m.title;
  const p=PT.pages[0];return p&&p.title?p.title:"New prototype";
}
function ptName(){
  const n=kebab(PT.name||"");
  if(PT.name.trim()&&n)return n;
  return kebab(ptTitle())||"new-prototype";
}

/* Personal-information class for a field, from its type and label. */
function ptPii(q){
  const l=String(q.label||"").toLowerCase(),t=q.type;
  if(t==="ssn"||/social security|\bssn\b/.test(l))return"Social Security number";
  if(/va file number|service number|claim number|member id|\bicn\b/.test(l))return"VA identifier";
  if(/date of birth|birth date|\bdob\b/.test(l))return"Date of birth";
  if(t==="phone"||/phone/.test(l))return"Phone number";
  if(t==="email"||/email/.test(l))return"Email address";
  if(/street|address|\bcity\b|\bzip\b|postal/.test(l))return"Address";
  if(/diagnos|medication|condition|treatment|disabilit/.test(l))return"Health information";
  if(/\bname\b/.test(l))return"Name";
  return"";
}

/* Pages that come from the Forms tab, in flow order. */
function ptFormPages(){
  if(!ptUsesForm()||!FS.m)return[];
  const M=FS.m,out=[];
  const labelOf=id=>{const q=allComps().find(x=>x.id===id);return q?(q.label||q.id):id};
  flatten(M).forEach(s=>{
    const pg={id:s.id,title:s.title,src:"form",stage:s.kind==="page"?"step":s.kind,cond:null,loop:null,fields:[],tags:[],template:"",shellKey:"form"};
    if(s.kind==="intro"){pg.tags=["va-process-list","va-button"];pg.template="src/templates/form-step/intro.html"}
    else if(s.kind==="review"){pg.tags=["va-accordion","va-accordion-item","va-link","va-button-pair"];pg.template="src/templates/form-step/review.html"}
    else if(s.kind==="sot"){pg.tags=["va-statement-of-truth","va-button-pair"];pg.template="src/templates/form-step/review.html (statement of truth sits on the review page in the kit)"}
    else if(s.kind==="confirm"){pg.tags=["va-alert","va-button"];pg.template="src/templates/form-step/confirmation.html"}
    else{
      pg.template="src/templates/form-step/step.html";
      const c=M.chapters[s.ch];
      if(s.showIf)pg.cond={id:s.showIf.component,label:labelOf(s.showIf.component),value:s.showIf.value};
      if(c&&c.type==="list_loop")pg.loop={title:c.title,noun:c.nounPlural,max:c.maxItems,optional:!!c.optional};
      const comps=compsFor(s,M)||[];
      pg.fields=comps.map(q=>({id:q.id,label:q.label||(q.options&&q.options[0]?q.options[0].label:"(unlabeled)"),type:q.type,required:!!q.required,hint:q.hint||"",
        tag:PT_FIELD_TAG[q.type]||"va-text-input",pii:ptPii(q),options:(q.options||[]).map(o=>o.label)}));
      pg.tags=["va-segmented-progress-bar"].concat([...new Set(pg.fields.map(f=>f.tag))],["va-button-pair"]);
    }
    out.push(pg);
  });
  return out;
}
/* Pages the designer composes from components. */
function ptComposedPages(){
  if(!ptUsesPages())return[];
  return PT.pages.map(p=>({id:p.id,title:p.title||"Untitled page",src:"compose",stage:"page",cond:null,loop:null,fields:[],
    blocks:p.blocks,template:"src/templates/default/base.html",shellKey:"page",
    tags:[...new Set(p.blocks.map(b=>b.kind==="custom"?"custom: "+(b.name||"unnamed"):(b.tag||"")).filter(Boolean))]}));
}
const ptAllPages=()=>ptFormPages().concat(ptComposedPages());

const PT_SHELL={
  form:{label:"Form pages",banner:"va-prototype-banner",header:"va-prototype-header-minimal",footer:"va-prototype-footer",extra:["va-back-to-top","va-segmented-progress-bar on step pages"],grid:"vads-grid-container > vads-grid-row > vads-grid-col-12 medium-screen:vads-grid-col-8",state:"FormState (src/utils/form-state.ts), form-validation.ts"},
  page:{label:"Composed pages",banner:"va-prototype-banner",header:"va-prototype-header",footer:"va-prototype-footer",extra:["va-breadcrumbs","va-back-to-top"],grid:"vads-grid-container > vads-grid-row > vads-grid-col-12 medium-screen:vads-grid-col-8",state:"None unless the brief says otherwise"}
};

/* Data dependency rows: one per form field and per composed component. */
function ptDepRows(){
  const rows=[],drivers=new Set();
  ptFormPages().forEach(p=>{if(p.cond)drivers.add(p.cond.id)});
  ptFormPages().forEach(p=>p.fields.forEach(f=>{
    const d=PT.deps[f.id]||{};
    rows.push({key:f.id,page:p.title,label:f.label,tag:f.tag,req:f.required,pii:f.pii,kind:"field",type:f.type,
      src:d.src||"user",sys:d.sys||"",drives:drivers.has(f.id),loop:!!p.loop});
  }));
  ptComposedPages().forEach(p=>p.blocks.forEach(b=>{
    const d=PT.deps[b.id]||{};
    rows.push({key:b.id,page:p.title,label:b.what||(b.kind==="custom"?b.name:ptTagName(b.tag))||"Component",tag:b.kind==="custom"?"custom":b.tag,req:false,pii:"",kind:"block",type:"",
      src:d.src||"static",sys:d.sys||"",drives:false,loop:false});
  }));
  return rows;
}
function ptTagName(tag){const r=PT_VADS.find(x=>x[0]===tag);return r?r[1]:(tag||"")}

/* Questions the page can work out from the brief, plus the ones people add. */
function ptAutoQuestions(){
  const Q=[],add=(key,who,text)=>Q.push({key,who,text,auto:true});
  const fp=ptFormPages(),cp=ptComposedPages(),rows=ptDepRows();
  const fieldRows=rows.filter(r=>r.kind==="field");
  if(ptUsesForm()){
    const sub=PT.deps.__submit||{};
    if(!String(sub.sys||"").trim())add("submit-dest","Backend","Where does the submission go? Name the API and the downstream system that receives it.");
    const pii=fieldRows.filter(r=>r.pii);
    if(pii.length){
      const cats=[...new Set(pii.map(r=>r.pii))];
      add("pii","Engineering",pii.length+" field"+(pii.length===1?"":"s")+" collect personal information ("+cats.join(", ")+"). What is stored while the Veteran fills the form, what is logged, and how long is it kept?");
    }
    const pre=fieldRows.filter(r=>r.src==="user"&&PT_PREFILLABLE.includes(r.pii));
    if(pre.length){
      const cats=[...new Set(pre.map(r=>r.pii))];
      add("prefill","Backend","Can these be prefilled from the Veteran’s profile instead of asked again: "+cats.join(", ")+"? If yes, which fields arrive and how do we handle a mismatch?");
    }
    const noSys=fieldRows.filter(r=>(r.src==="prefill"||r.src==="api")&&!String(r.sys).trim());
    if(noSys.length)add("src-sys","Backend","Name the source system for "+noSys.length+" field"+(noSys.length===1?"":"s")+" marked prefilled or looked up: "+noSys.slice(0,4).map(r=>"“"+r.label+"”").join(", ")+(noSys.length>4?", and more":"")+".");
    if(fieldRows.some(r=>r.type==="file"))add("files","Backend","File upload: what file types and sizes are allowed, where do files go, and how are they scanned?");
    const cond=fp.filter(p=>p.cond);
    if(cond.length)add("cond","Engineering",cond.length+" page"+(cond.length===1?" is":"s are")+" conditional ("+cond.map(p=>"“"+p.title+"”").join(", ")+"). Does the backend validate the same conditions?");
    const loopSeen=new Set();
    fp.filter(p=>p.loop).forEach(p=>{
      if(loopSeen.has(p.loop.title))return;loopSeen.add(p.loop.title);
      add("loop-"+p.loop.title,"Backend","“"+p.loop.title+"” repeats up to "+p.loop.max+" times. Does the backend schema accept that many?");
    });
    const unsup=[...new Set(fieldRows.filter(r=>!CTYPES[r.type]||!CTYPES[r.type].engine).map(r=>CTYPES[r.type]?CTYPES[r.type].label.toLowerCase():r.type))];
    if(unsup.length)add("engine","Engineering","These field types are not in the form engine yet: "+unsup.join(", ")+". How will production build them?");
    lint(FS.m).filter(x=>x.k==="warn").forEach((x,i)=>add("lint-"+i+"-"+x.t.slice(0,24),"Design","Design check: "+x.t));
  }
  if(cp.length>1)add("nav","Design","How do the composed pages connect? Add the links and back behavior before the build.");
  cp.forEach(p=>p.blocks.forEach(b=>{
    if(b.kind!=="custom")return;
    const nm=b.name||"unnamed component";
    if(!String(b.why||"").trim())add("cust-why-"+b.id,"Design","Custom component “"+nm+"”: which VADS components did you check, and why does none fit?");
    else add("cust-ds-"+b.id,"Design system","Custom component “"+nm+"”: contribute it to VADS, or keep it product-specific?");
  }));
  const blockRows=rows.filter(r=>r.kind==="block"&&(r.src==="api"||r.src==="prefill")&&!String(r.sys).trim());
  if(blockRows.length)add("blk-sys","Backend","Name the data source for "+blockRows.length+" composed component"+(blockRows.length===1?"":"s")+" that read data: "+blockRows.slice(0,4).map(r=>"“"+r.label+"”").join(", ")+".");
  if(!ptAllPages().length)add("empty","Design","No pages yet. Build the form in the Forms tab or compose a page here.");
  if(!String(PT.research||"").trim())add("research","Research","No prior research is linked. Add links, or mark this as exploratory.");
  if(!String(PT.url||"").trim())add("url","Design","Add the prototype preview URL after the kit build so reviewers can click through the real thing.");
  return Q;
}
function ptQuestions(){
  const out=ptAutoQuestions().map(q=>{const s=PT.qs[q.key]||{};return Object.assign(q,{done:!!s.done,note:s.note||""})});
  PT.manual.forEach(m=>out.push({key:m.id,who:m.who||"Design",text:m.text,auto:false,done:!!m.done,note:m.note||""}));
  return out;
}

/* ---------- Prototype: setup panel ---------- */
let ptTimer=null;
const ptLater=fn=>{clearTimeout(ptTimer);ptTimer=setTimeout(fn,260)};
function ptMove(arr,i,d){const j=i+d;if(j<0||j>=arr.length)return;const t=arr[i];arr[i]=arr[j];arr[j]=t}
function ptField(label,id,key,{area=false,rows=3,ph="",hint=""}={}){
  const n=fel(area?"textarea":"input",{id,placeholder:ph});
  if(!area)n.type="text";else n.rows=rows;
  n.value=PT[key]||"";
  n.oninput=()=>{PT[key]=n.value;ptSave();ptLater(ptRenderMain)};
  return fi(label,n,id,hint);
}
function ptBlockCard(pg,b,j){
  const isCustom=b.kind==="custom";
  const known=PT_VADS.some(x=>x[0]===b.tag);
  const sel=sl(PT_VADS.map(([t,n])=>[t,n+" ("+t+")"]).concat([["other","Other VADS tag…"],["custom","Custom component (needs a reason)"]]),
    isCustom?"custom":(known?b.tag:"other"),v=>{
      if(v==="custom"){b.kind="custom"}
      else if(v==="other"){b.kind="vads";if(known)b.tag=""}
      else{b.kind="vads";b.tag=v}
      ptSave();ptRenderSide();ptRenderMain();
    },"pt-b-"+b.id);
  const card=fel("div",{class:"pt-blk"},
    fel("div",{class:"pt-blk-h"},
      fel("span",{class:"pill",text:isCustom?"Custom":"VADS"}),fel("span",{class:"sp"}),
      mini("↑","Move component up",()=>{ptMove(pg.blocks,j,-1);ptSave();ptRenderSide();ptRenderMain()},{disabled:j===0}),
      mini("↓","Move component down",()=>{ptMove(pg.blocks,j,1);ptSave();ptRenderSide();ptRenderMain()},{disabled:j===pg.blocks.length-1}),
      mini("✕","Remove component",()=>{pg.blocks.splice(j,1);delete PT.deps[b.id];ptSave();ptRenderSide();ptRenderMain()},{del:true})),
    fi("Component",sel,"pt-b-"+b.id));
  if(!isCustom&&!known){
    const t=fel("input",{id:"pt-bt-"+b.id,type:"text",placeholder:"va-example"});t.value=b.tag||"";
    t.oninput=()=>{b.tag=t.value.trim();ptSave();ptLater(ptRenderMain)};
    card.append(fi("VADS tag",t,"pt-bt-"+b.id,"The kit’s agent checks it with find-components and get-component."));
  }
  const what=fel("input",{id:"pt-bw-"+b.id,type:"text",placeholder:"Claim status and next step"});what.value=b.what||"";
  what.oninput=()=>{b.what=what.value;ptSave();ptLater(ptRenderMain)};
  card.append(fi("What it shows or collects",what,"pt-bw-"+b.id));
  if(isCustom){
    const nm=fel("input",{id:"pt-bn-"+b.id,type:"text",placeholder:"Name of the custom component"});nm.value=b.name||"";
    nm.oninput=()=>{b.name=nm.value;ptSave();ptLater(ptRenderMain)};
    const why=fel("textarea",{id:"pt-by-"+b.id,rows:3,placeholder:"For example: I checked va-card and va-summary-box. Neither shows two values side by side."});why.value=b.why||"";
    why.oninput=()=>{b.why=why.value;ptSave();ptLater(ptRenderMain)};
    card.append(fi("Custom component name",nm,"pt-bn-"+b.id),
      fi("Which VADS components did you check, and why do none fit?",why,"pt-by-"+b.id),
      fel("p",{class:"pt-warn",text:"Custom components are a last resort. Check the Reference tab and Storybook first. This reason goes to the engineer."}));
  }
  return card;
}
function ptPageCard(pg,i){
  const t=fel("input",{id:"pt-pt-"+pg.id,type:"text","aria-label":"Page title",placeholder:"Page title"});t.value=pg.title||"";
  t.oninput=()=>{pg.title=t.value;ptSave();ptLater(ptRenderMain)};
  const add=fel("select",{id:"pt-add-"+pg.id,"aria-label":"Add a component to "+(pg.title||"this page")},
    fel("option",{value:"",text:"Add a component…"}),
    PT_VADS.map(([tag,n])=>fel("option",{value:tag,text:n+" ("+tag+")"})),
    fel("option",{value:"custom",text:"Custom component (needs a reason)"}));
  add.onchange=()=>{
    const v=add.value;if(!v)return;
    pg.blocks.push(v==="custom"?{id:ptUid("b"),kind:"custom",tag:"",name:"",what:"",why:""}:{id:ptUid("b"),kind:"vads",tag:v,name:"",what:"",why:""});
    ptSave();ptRenderSide();ptRenderMain();
  };
  return fel("div",{class:"pt-pg"},
    fel("div",{class:"pt-pg-h"},t,
      mini("↑","Move page up",()=>{ptMove(PT.pages,i,-1);ptSave();ptRenderSide();ptRenderMain()},{disabled:i===0}),
      mini("↓","Move page down",()=>{ptMove(PT.pages,i,1);ptSave();ptRenderSide();ptRenderMain()},{disabled:i===PT.pages.length-1}),
      mini("✕","Remove page",()=>{pg.blocks.forEach(b=>delete PT.deps[b.id]);PT.pages.splice(i,1);ptSave();ptRenderSide();ptRenderMain()},{del:true})),
    pg.blocks.map((b,j)=>ptBlockCard(pg,b,j)),
    fel("div",{class:"pt-add"},add));
}
function ptRenderSide(){
  const side=$("#pt-side");if(!side)return;
  side.innerHTML="";
  if(ptUsesPages()){
    const addPage=fel("button",{class:"btn",type:"button",text:"Add a page"});
    addPage.onclick=()=>{PT.pages.push({id:ptUid("pg"),title:"New page",blocks:[]});ptSave();ptRenderSide();ptRenderMain()};
    side.append(fel("div",{class:"group"},
      fel("p",{class:"ghead",text:"Pages you compose"}),
      PT.pages.length?PT.pages.map((p,i)=>ptPageCard(p,i)):fel("div",{class:"inset"},fel("div",{class:"cell"},fel("p",{class:"fhint",text:"No pages yet. Add one, then add the components it needs. Use VADS components first."}))),
      addPage,
      fel("p",{class:"gfoot",text:"Pick from the VADS list wherever you can. A custom component needs a written reason and goes to the engineer as an open question."})));
  }


  const vp=sl([["mobile","Mobile, 320px"],["desktop","Desktop, 1024px"],["both","Both, mobile first"]],PT.viewport,v=>{PT.viewport=v;ptSave();ptRenderMain()},"pt-viewport");
  side.append(fel("div",{class:"group"},
    fel("p",{class:"ghead",text:"Prototype details"}),
    fel("div",{class:"inset"},
      ptField("Folder name","pt-name","name",{ph:ptName(),hint:"Lowercase with hyphens. It becomes src/prototypes/"+ptName()+"/."}),
      ptField("Team","pt-team","team",{ph:"Innovation Unit"}),
      ptField("GitHub username","pt-creator","creator",{ph:"your-username",hint:"The kit records this as the creator and checks it on pull requests."}),
      fi("Viewport",vp,"pt-viewport"),
      ptField("Problem we’re exploring","pt-problem","problem",{area:true,rows:3,ph:"The Veteran problem, hypothesis or research question."}))));

  side.append(fel("div",{class:"group"},
    fel("p",{class:"ghead",text:"Links"}),
    fel("div",{class:"inset"},
      ptField("Prior research","pt-research","research",{area:true,rows:2,ph:"Links to research, one per line"}),
      ptField("Figma","pt-figma","figma",{ph:"https://www.figma.com/…"}),
      ptField("Prototype preview URL","pt-url","url",{ph:"https://…",hint:"Add this after the kit build, from the pull request preview."}))));
  const figBtn=fel("button",{class:"btn small",type:"button",id:"pt-figauto",text:"Send to Figma"});
  figBtn.onclick=()=>figPush(false);
  side.append(fel("div",{class:"group"},
    fel("p",{class:"ghead",text:"Figma"}),
    fel("div",{class:"inset"},fel("div",{class:"fi"},figBtn,fel("p",{class:"fhint",text:"Sends the pages to the Figma link above. Without a connection, it downloads an SVG to import."})))));

  if(ptUsesForm()){
    const fp=ptFormPages(),steps=fp.filter(p=>p.stage==="step").length;
    const go=fel("button",{class:"btn plain",type:"button",text:"Edit in the Forms tab"});go.onclick=()=>setTab("forms");
    side.append(fel("div",{class:"group"},
      fel("p",{class:"ghead",text:"Form pages"}),
      fel("div",{class:"inset"},
        fel("div",{class:"cell"},fel("p",{style:"margin:0 0 4px;font-size:16px;font-weight:600",text:(FS.m.title||"Untitled form")}),
          fel("p",{class:"fhint",text:fp.length+" pages in the flow, "+steps+" of them question pages."})),
        fel("div",{class:"cell"},go)),
      PT.type==="subtask"&&steps>3?fel("p",{class:"gfoot",text:"A sub-task is one to three steps. This form has "+steps+". Consider the Standard form flow type."}):null));
  }
}

/* ---------- Prototype: engineer review ---------- */
const ptCode=t=>fel("code",{text:t});
function ptCard(title,pill){return fel("section",{class:"rcard"},fel("h3",{class:"rh"},title,pill?fel("span",{class:"pill",text:pill}):null))}
function ptTable(head,rows){
  return fel("div",{class:"tablewrap"},fel("table",{class:"pt-t"},
    fel("thead",{},fel("tr",{},head.map(h=>fel("th",{text:h})))),
    fel("tbody",{},rows.map(r=>fel("tr",{},r.map(c=>fel("td",{},c)))))));
}
const ptIsUrl=s=>/^https?:\/\//i.test(String(s||"").trim());
function ptLink(s){return ptIsUrl(s)?fel("a",{href:s.trim(),target:"_blank",rel:"noopener",text:s.trim()}):(s||"Not added")}
function ptOpenCount(){return ptQuestions().filter(q=>!q.done).length}
function ptSum(){
  const n=ptAllPages().length,o=ptOpenCount();
  $("#pt-sum").textContent=PT_TYPE_LABEL[PT.type]+". "+n+" page"+(n===1?"":"s")+", "+o+" open question"+(o===1?"":"s")+".";
}
function ptRenderMain(){
  if(!$("#pt-main"))return;
  $("#pt-title").textContent=ptTitle();
  ptSum();
  const main=$("#pt-main");main.innerHTML="";
  const sn=$("#pt-subnav");if(sn)sn.hidden=CS.tab!=="proto"||(CS.role==="engineer"&&!CS.viewV);
  const sec=$("#pt-secnav");if(sec){sec.hidden=CS.role==="engineer"&&!CS.viewV;if(sec.hidden)sec.innerHTML=""}
  if(PT.mode==="bundle"&&CS.role!=="engineer")ptSec="bundle";else if(ptSec==="bundle")ptSec="overview";
  ptRenderReview(main);
}
function ptRender(){ptRenderSide();ptRenderMain()}

let ptSec="overview",PT_SECIDS=[];
function ptRenderReview(main){
  const pages=ptAllPages();
  const secs=[];
  /* Overview */
  const ov=ptCard("Engineer review",PT_TYPE_LABEL[PT.type]);
  ov.append(fel("dl",{class:"pt-meta"},
    [["Prototype",ptTitle()],["Folder","src/prototypes/"+ptName()+"/"],["Team",PT.team||"Not added"],["Viewport",{mobile:"Mobile, 320px",desktop:"Desktop, 1024px",both:"Both, mobile first"}[PT.viewport]],
     ["Preview",ptLink(PT.url)],["Figma",ptLink(PT.figma)],["Research",ptLink((PT.research||"").split("\n")[0])]].map(([k,v])=>fel("div",{},fel("dt",{text:k}),fel("dd",{},v)))),
    fel("div",{style:"padding:0 18px 16px"},fel("p",{class:"rnote",text:PT.problem||"No problem statement yet. Add one under Prototype details."})));
  secs.push(["overview","Overview",ov]);

  /* Snapshot */
  const snap=ptCard("Snapshot","Design-time render");
  snap.append(fel("div",{id:"pt-snap-box"}));
  snap.append(fel("p",{class:"rnote",style:"padding:0 18px 16px",text:"This is the Component Builder’s render of the design, not the kit build. Once the kit build exists, the preview URL above is the source of truth."}));
  secs.push(["snap","Snapshot",snap]);

  /* Specs */
  const sp=ptCard("Specs");
  const shells=[];
  if(pages.some(p=>p.shellKey==="form"))shells.push(PT_SHELL.form);
  if(pages.some(p=>p.shellKey==="page"))shells.push(PT_SHELL.page);
  shells.forEach(s=>{
    sp.append(fel("p",{class:"rprop-h",text:s.label+": page shell"}),
      fel("dl",{class:"pt-meta"},[["Banner",s.banner],["Header",s.header],["Footer",s.footer],["Also on the page",s.extra.join(", ")],["Layout",s.grid],["State and validation",s.state]].map(([k,v])=>fel("div",{},fel("dt",{text:k}),fel("dd",{},ptCode(v))))));
  });
  if(!shells.length)sp.append(fel("p",{class:"rnote",style:"padding:6px 18px 16px",text:"No pages yet."}));
  if(pages.length){
    sp.append(fel("p",{class:"rprop-h",text:"Pages"}),ptTable(["#","Page","Template","VADS and custom components","Logic"],pages.map((p,i)=>[
      String(i+1),fel("b",{text:p.title}),ptCode(p.template.split(" (")[0]),
      fel("span",{},p.tags.flatMap((t,k)=>[k?" ":null,fel("code",{text:t})])),
      p.cond?"Shown if “"+p.cond.label+"” is “"+p.cond.value+"”":(p.loop?"Repeats, up to "+p.loop.max:"")])));
    const inv=ptInventory();
    sp.append(fel("p",{class:"rprop-h",text:"Component inventory"}),ptTable(["Component","Kind","Pages","Note"],inv.map(e=>[
      ptCode(e.key.replace(/^custom: /,"")),fel("span",{class:"pt-flag"+(e.kind==="VADS"?" ok":""),text:e.kind}),String(e.pages.size),e.note||""])));
  }
  sp.append(fel("p",{class:"rprop-h",text:"Accessibility notes"}),fel("ul",{class:"notes"},ptA11y().map(t=>fel("li",{text:t}))));
  secs.push(["specs","Specs",sp]);

  /* Data dependencies */
  const dc=ptCard("Data dependencies");
  dc.append(fel("div",{id:"pt-deps"}));
  secs.push(["data","Data dependencies",dc]);

  /* Flows */
  const fc=ptCard("Process flows");
  fc.append(fel("div",{id:"pt-flows"}));
  secs.push(["flows","Process flows",fc]);

  /* Questions */
  const qc=ptCard("Outstanding questions");
  qc.append(fel("div",{id:"pt-qs"}));
  secs.push(["qs","Questions",qc]);
  if(CS.role!=="engineer"&&window.CSX&&CSX.engNotes){const en=ptCard("Engineer notes");const nb=CSX.engNotes();if(nb)en.append(nb);secs.push(["eng","Engineer notes",en])}
  if(CS.role!=="engineer"){const bw=fel("div",{class:"pt-bundle"});ptRenderBundle(bw);secs.push(["bundle","Bundle files",bw])}
  const nav=fel("div",{class:"seg pt-subtabs",role:"tablist","aria-label":"Review sections"});
  if(!secs.some(x=>x[0]===ptSec))ptSec="overview";
  secs.forEach(([id,label])=>{
    const b=fel("button",{type:"button",role:"tab",id:"pt-st-"+id,"data-sec":id,"aria-controls":"pt-sp-"+id,"aria-selected":String(id===ptSec),tabindex:id===ptSec?"0":"-1",text:label});
    nav.append(b);
  });
  const subnav=$("#pt-secnav");if(subnav){subnav.innerHTML="";subnav.hidden=CS.role==="engineer"&&!CS.viewV}
  PT_SECIDS=secs.map(x=>x[0]);
  if(subnav&&!subnav.dataset.wired){
    subnav.dataset.wired="1";
    subnav.addEventListener("click",e=>{const b=e.target.closest("[data-sec]");if(b)ptShowSec(b.dataset.sec)});
    subnav.addEventListener("keydown",e=>{
      if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft"&&e.key!=="Home"&&e.key!=="End")return;
      const ids=PT_SECIDS;let i=ids.indexOf(ptSec);
      if(e.key==="ArrowRight")i=(i+1)%ids.length;else if(e.key==="ArrowLeft")i=(i-1+ids.length)%ids.length;else if(e.key==="Home")i=0;else i=ids.length-1;
      e.preventDefault();ptShowSec(ids[i]);$("#pt-st-"+ids[i]).focus();
    });
  }
  if(subnav)subnav.append(...nav.childNodes);
  secs.forEach(([id,label,card])=>{
    const panel=fel("div",{role:"tabpanel",id:"pt-sp-"+id,"aria-labelledby":"pt-st-"+id,class:"pt-secpanel"});
    panel.append(card);panel.hidden=id!==ptSec;
    main.append(panel);
  });

  ptRenderSnap();ptRenderDeps();ptRenderFlows();ptRenderQs();
}
function ptShowSec(id){
  ptSec=id;
  if(PT.mode!==(id==="bundle"?"bundle":"review")){PT.mode=id==="bundle"?"bundle":"review";ptSave()}
  document.querySelectorAll(".pt-subtabs [role=tab]").forEach(b=>{const on=b.dataset.sec===id;b.setAttribute("aria-selected",String(on));b.tabIndex=on?0:-1});
  document.querySelectorAll(".pt-secpanel").forEach(pn=>{pn.hidden=pn.id!=="pt-sp-"+id});
}

function ptInventory(){
  const m=new Map();
  ptAllPages().forEach(p=>{
    const add=(key,kind,note)=>{const e=m.get(key)||{key,kind,pages:new Set(),note:""};e.pages.add(p.title);if(note&&!e.note)e.note=note;m.set(key,e)};
    if(p.src==="form")p.tags.forEach(t=>add(t,"VADS"));
    else p.blocks.forEach(b=>{
      if(b.kind==="custom")add("custom: "+(b.name||"unnamed"),"Custom",b.why||"No reason given yet.");
      else if(b.tag)add(b.tag,"VADS");
    });
  });
  return[...m.values()].sort((a,b)=>(a.kind===b.kind?0:a.kind==="Custom"?-1:1)||b.pages.size-a.pages.size||a.key.localeCompare(b.key));
}
function ptA11y(){
  const N=[],types=new Set(),pages=ptAllPages();
  pages.forEach(p=>p.fields.forEach(f=>types.add(f.type)));
  if(ptUsesForm()){
    N.push("Errors show on Continue or Submit only, clear as the Veteran types, and focus moves to the first invalid field (form-validation.ts in the kit).");
  }
  if(["radio","yesno","checkbox"].some(t=>types.has(t)))N.push("Group choices in a fieldset with a legend. On a one-question page the h1 is the legend, as in the kit’s step template.");
  if(types.has("date")||types.has("monthyear"))N.push("Date fields use va-memorable-date or va-date. Check the error text for a missing or partial date.");
  if(types.has("file"))N.push("File upload: put accepted file types and the size limit in the hint text, and confirm success and error messages are announced.");
  if(pages.some(p=>p.cond))N.push("Conditional pages change the progress bar total. Check that the progress bar heading announces the new step count.");
  if(pages.some(p=>p.loop))N.push("List and loop pages: after adding or removing an item, move focus to the new item or the summary, and announce the change.");
  if(pages.some(p=>p.blocks&&p.blocks.some(b=>b.kind==="custom")))N.push("Custom components are not covered by VADS accessibility tests. Test keyboard, focus and screen reader behavior for each one.");
  N.push("Test on mobile with VoiceOver and on desktop with NVDA or JAWS. The kit’s accessibility-testing skill (docs/skills/accessibility-testing.md) runs the checks before review.");
  return N;
}

/* Snapshot */
function ptRenderSnap(){
  const box=$("#pt-snap-box");if(!box)return;
  box.innerHTML="";
  const cp=ptComposedPages();
  if(!cp.length){box.append(fel("p",{class:"rnote",style:"padding:6px 18px 16px",text:"Nothing to show yet. Compose a page in Pages, or start from a page template."}));return}
  const opts=cp.map(p=>["c:"+p.id,"Page: "+p.title]);
  if(!opts.some(o=>o[0]===PT.snap))PT.snap=opts[0][0];
  const sel=sl(opts,PT.snap,v=>{PT.snap=v;ptSave();ptMountSnap()},"pt-snap-sel");
  sel.setAttribute("aria-label","Page to preview");
  const mob=fel("button",{class:"tool",type:"button","aria-pressed":String(!!PT.mobile),text:"iPhone width"});
  mob.onclick=()=>{PT.mobile=!PT.mobile;mob.setAttribute("aria-pressed",String(!!PT.mobile));ptSave();const h=$("#pt-snap-host");if(h)h.classList.toggle("mobile",!!PT.mobile)};
  box.append(fel("div",{class:"ptsnapbar"},sel,mob),fel("div",{class:"ptcanvas"},fel("div",{id:"pt-snap-host",class:"ptframe"+(PT.mobile?" mobile":"")})));
  ptMountSnap();
}
let ptSnapTok=0;
async function ptMountSnap(){
  const old=$("#pt-snap-host");if(!old)return;
  const tok=++ptSnapTok;
  const host=fel("div",{id:"pt-snap-host",class:"ptframe"+(PT.mobile?" mobile":"")});
  old.replaceWith(host);
  const kind=PT.snap.slice(0,1),id=PT.snap.slice(2);
  if(kind==="f"){
    if(!document.getElementById("vf-fonts")){const l=document.createElement("link");l.id="vf-fonts";l.rel="stylesheet";l.href=FORM_FONTS;document.head.append(l)}
    const sr=host.attachShadow({mode:"open"});
    sr.innerHTML="<style>"+formShadowCss()+'</style><div class="wrap"><div class="fm" id="root"></div></div>';
    try{
      previewRuntime(sr.getElementById("root"),{m:JSON.parse(JSON.stringify(FS.m)),step:id,ans:JSON.parse(JSON.stringify(FS.ans||{}))},d=>{
        if(d&&d.go){PT.snap="f:"+d.go;const s=$("#pt-snap-sel");if(s&&[...s.options].some(o=>o.value===PT.snap))s.value=PT.snap;ptSave()}
      });
    }catch(e){console.error(e);sr.getElementById("root").textContent="The preview couldn’t be drawn for this page."}
    return;
  }
  const pg=ptComposedPages().find(p=>p.id===id);
  if(!pg)return;
  const shell=fel("div",{class:"ptshell"},fel("div",{class:"bar",text:"va-prototype-banner · va-prototype-header"}));
  const bd=fel("div",{class:"bd"});
  bd.append(fel("div",{class:"bar",style:"margin:-16px -16px 12px",text:"va-breadcrumbs"}));
  bd.append(fel("h1",{text:pg.title}));
  const mounts=[];
  if(!pg.blocks.length)bd.append(fel("div",{class:"ph",text:"No components on this page yet."}));
  pg.blocks.forEach(b=>{
    const isC=b.kind==="custom";
    const nm=isC?(b.name||"Unnamed custom component"):(b.tag||"no tag");
    bd.append(fel("div",{class:"cap"+(isC?" custom":"")},ptCode(nm),fel("span",{text:(isC?"Custom. ":"")+(b.what||"")})));
    const slot=fel("div",{});bd.append(slot);
    const ref=!isC&&REF_COMPS.find(c=>c.tag===b.tag);
    if(ref)mounts.push([slot,ref.stories[0].h]);
    else slot.append(fel("div",{class:"ph",text:isC?"Custom component. No render yet. The engineer sees the reason in the specs.":"No render for "+nm+" in this reference. The kit build shows the real component."}));
  });
  shell.append(bd,fel("div",{class:"bar ft",text:"va-back-to-top · va-prototype-footer"}));
  host.append(shell);
  if(mounts.length){
    const ok=await rLoadLive();
    if(tok!==ptSnapTok)return;
    mounts.forEach(([slot,html])=>{
      if(!ok){slot.append(fel("div",{class:"ph",text:"The live VA components didn’t load here."}));return}
      rMountPreview(slot,html);
    });
  }
}

/* Data dependencies */
function ptRenderDeps(){
  const host=$("#pt-deps");if(!host)return;
  host.innerHTML="";
  const rows=ptDepRows();
  if(!rows.length&&!ptUsesForm()){host.append(fel("p",{class:"rnote",style:"padding:6px 18px 16px",text:"Add components to a composed page to list what data they need."}));return}
  host.append(fel("p",{class:"rnote",style:"padding:0 18px 8px",text:"Set where each value comes from. Anything you leave on its default shows up as a question below."}));
  const upd=()=>{ptSave();ptRenderFlows();ptRenderQs();ptSum()};
  const trs=rows.map(r=>{
    const d=PT.deps[r.key]||(PT.deps[r.key]={});
    const s=sl(PT_SRC,r.src,v=>{d.src=v;upd()},"pt-ds-"+r.key);s.setAttribute("aria-label","Source of "+r.label);
    const sys=fel("input",{id:"pt-dy-"+r.key,type:"text","aria-label":"System or endpoint for "+r.label,placeholder:r.src==="user"||r.src==="static"?"Not needed":"System or endpoint"});
    sys.value=d.sys||"";sys.oninput=()=>{d.sys=sys.value;ptSave();clearTimeout(sys._t);sys._t=setTimeout(()=>{ptRenderFlows();ptRenderQs();ptSum()},300)};
    const tags=[];
    if(r.pii)tags.push(fel("span",{class:"pt-flag",text:r.pii}));
    if(r.drives)tags.push(fel("span",{class:"pt-flag ok",text:"Controls page logic"}));
    if(r.loop)tags.push(fel("span",{class:"pt-flag ok",text:"In a loop"}));
    return[r.page,fel("span",{},r.label,r.req?fel("span",{class:"pill",style:"margin-left:6px",text:"Required"}):null),ptCode(r.tag),fel("span",{style:"display:flex;flex-wrap:wrap;gap:4px"},tags),s,sys];
  });
  if(rows.length)host.append(ptTable(["Page","Field or component","VADS tag","Flags","Source","System or endpoint"],trs));
  if(ptUsesForm()){
    const sub=PT.deps.__submit||(PT.deps.__submit={});
    const sys=fel("input",{id:"pt-dy-submit",type:"text",placeholder:"API and downstream system",style:"width:100%"});
    sys.value=sub.sys||"";
    sys.oninput=()=>{sub.sys=sys.value;ptSave();clearTimeout(sys._t);sys._t=setTimeout(()=>{ptRenderFlows();ptRenderQs();ptSum()},300)};
    host.append(fi("Where the submission goes",sys,"pt-dy-submit","The API and the system behind it. The prototype sends nothing."));
  }
}

/* Process flows */
function ptRenderFlows(){
  const host=$("#pt-flows");if(!host)return;
  host.innerHTML="";
  const fp=ptFormPages(),cp=ptComposedPages();
  if(fp.length){
    host.append(fel("p",{class:"rprop-h",text:"Page flow"}));
    host.append(fel("ol",{class:"pt-flow","aria-label":"Page flow"},fp.map(p=>fel("li",{class:(p.cond?"ptc ":"")+(p.loop?"ptl":"")},
      fel("b",{text:p.title}),
      p.cond?fel("small",{text:"Only if “"+p.cond.label+"” is “"+p.cond.value+"”. Otherwise skipped."}):null,
      p.loop?fel("small",{text:"Repeats for each item, up to "+p.loop.max+"."+(p.loop.optional?" The Veteran can skip it.":"")}):null,
      p.fields.length?fel("small",{text:p.fields.length+" field"+(p.fields.length===1?"":"s")+": "+p.fields.map(f=>f.label).join(", ")}):null))));
    host.append(fel("p",{class:"rnote",style:"padding:0 18px 12px",text:"A filled circle is a page everyone sees. A hollow circle is conditional. A square marks a repeating section."}));
  }
  if(cp.length){
    host.append(fel("p",{class:"rprop-h",text:"Composed pages"}));
    host.append(fel("ol",{class:"pt-flow","aria-label":"Composed pages"},cp.map(p=>fel("li",{},fel("b",{text:p.title}),fel("small",{text:p.blocks.length+" component"+(p.blocks.length===1?"":"s")+(p.blocks.length?": "+p.blocks.map(b=>b.kind==="custom"?(b.name||"custom"):b.tag).join(", "):"")})))));
    if(cp.length>1)host.append(fel("p",{class:"rnote",style:"padding:0 18px 12px",text:"How these pages connect is not defined yet. See the questions below."}));
  }
  /* Data flow */
  const rows=ptDepRows(),groups={};
  rows.filter(r=>r.src!=="static").forEach(r=>{(groups[r.src]||(groups[r.src]={n:0,sys:new Set()})).n++;if(String(r.sys).trim())groups[r.src].sys.add(r.sys.trim())});
  const srcBoxes=Object.keys(groups).map(k=>{
    const g=groups[k],needSys=(k==="api"||k==="prefill")&&!g.sys.size;
    return fel("div",{class:"box"+(needSys?" tbd":"")},fel("b",{text:PT_SRC_LABEL[k]}),g.n+" item"+(g.n===1?"":"s")+(g.sys.size?" · "+[...g.sys].join(", "):(needSys?" · source not named":"")));
  });
  if(!srcBoxes.length)srcBoxes.push(fel("div",{class:"box"},fel("b",{text:"Sources"}),"Static content only"));
  const mid=[];
  if(ptUsesForm()){
    mid.push(fel("div",{class:"box"},fel("b",{text:"Prototype"}),"Answers held in the browser by FormState. Nothing leaves the page."));
    mid.push(fel("div",{class:"box"},fel("b",{text:"Review page"}),"The Veteran checks every answer, signs, and submits."));
  }else mid.push(fel("div",{class:"box"},fel("b",{text:"Prototype"}),"Pages render example data. Nothing is sent."));
  const dest=[];
  const sub=(PT.deps.__submit||{}).sys;
  if(ptUsesForm()){
    dest.push(fel("div",{class:"box"+(String(sub||"").trim()?"":" tbd")},fel("b",{text:"Submission"}),String(sub||"").trim()||"Destination not named"));
    dest.push(fel("div",{class:"box"},fel("b",{text:"Confirmation page"}),"Shows the Veteran what happens next."));
  }else dest.push(fel("div",{class:"box"},fel("b",{text:"Destination"}),"Read only. No data is written."));
  host.append(fel("p",{class:"rprop-h",text:"Data flow"}),
    fel("div",{class:"pt-data"},fel("div",{class:"col"},srcBoxes),fel("span",{class:"arr","aria-hidden":"true",text:"→"}),fel("div",{class:"col"},mid),fel("span",{class:"arr","aria-hidden":"true",text:"→"}),fel("div",{class:"col"},dest)),
    fel("p",{class:"rnote",style:"padding:0 18px 16px",text:"An outlined box means a source or destination is still unnamed."}));
}

/* Outstanding questions */
function ptRenderQs(){
  const host=$("#pt-qs");if(!host)return;
  host.innerHTML="";
  const qs=ptQuestions();
  const rank=w=>{const i=PT_WHO_ORDER.indexOf(w);return i<0?99:i};
  qs.sort((a,b)=>(a.done-b.done)||(rank(a.who)-rank(b.who)));
  const open=qs.filter(q=>!q.done).length;
  host.append(fel("p",{class:"rnote",style:"padding:0 18px 8px",text:open+" open, "+(qs.length-open)+" resolved. Tick a question when it has an answer, and write the answer next to it."}));
  qs.forEach(q=>{
    const cb=fel("input",{type:"checkbox",class:"chk",id:"pt-qc-"+q.key.replace(/[^a-z0-9_-]/gi,"_"),"aria-label":"Resolved: "+q.text.slice(0,60)});
    cb.checked=q.done;
    const note=fel("input",{type:"text","aria-label":"Answer or link",placeholder:"Answer or link",id:"pt-qn-"+q.key.replace(/[^a-z0-9_-]/gi,"_")});note.value=q.note;
    const store=()=>q.auto?(PT.qs[q.key]||(PT.qs[q.key]={})):PT.manual.find(m=>m.id===q.key);
    cb.onchange=()=>{const s=store();if(s)s.done=cb.checked;ptSave();ptRenderQs();ptSum()};
    note.oninput=()=>{const s=store();if(s)s.note=note.value;ptSave()};
    const row=fel("div",{class:"pt-q"+(q.done?" done":"")},
      fel("div",{class:"top"},cb,fel("p",{text:q.text}),fel("span",{class:"pill",text:q.who})),note);
    if(!q.auto){
      const del=mini("✕","Delete question",()=>{PT.manual=PT.manual.filter(m=>m.id!==q.key);ptSave();ptRenderQs();ptSum()},{del:true});
      row.querySelector(".top").append(del);
    }
    host.append(row);
  });
  const txt=fel("input",{id:"pt-newq",type:"text",placeholder:"Add a question for the team","aria-label":"New question"});
  const who=sl(PT_WHO_ORDER.map(w=>[w,w]),"Engineering",()=>{},"pt-newq-who");who.setAttribute("aria-label","Who should answer");
  who.style.cssText="border:0;background:var(--fill);border-radius:10px;padding:9px 10px;min-height:40px;font:inherit;font-size:15px;color:inherit";
  const go=fel("button",{class:"btn small",type:"button",text:"Add"});
  const submit=()=>{const t=txt.value.trim();if(!t)return;PT.manual.push({id:ptUid("mq"),text:t,who:who.value,done:false,note:""});ptSave();ptRenderQs();ptSum();const n=$("#pt-newq");if(n)n.focus()};
  go.onclick=submit;txt.onkeydown=e=>{if(e.key==="Enter")submit()};
  host.append(fel("div",{class:"pt-addq"},txt,who,go));
}

/* ---------- Prototype: bundle ---------- */
const mdc=s=>String(s==null?"":s).replace(/\|/g,"\\|").replace(/\s*\n\s*/g," ");
function ptMdTable(head,rows){
  return["| "+head.join(" | ")+" |","| "+head.map(()=>"---").join(" | ")+" |"].concat(rows.map(r=>"| "+r.map(mdc).join(" | ")+" |")).join("\n");
}
const ptOne=s=>String(s||"").replace(/\s*\n\s*/g," ").trim();
function ptSummaryLine(){
  if(ptUsesForm()&&FS.m){
    const bits=[(FS.m.formName||FS.m.title)+(FS.m.formId&&FS.m.formId!=="XX-XXXX"?" (VA Form "+FS.m.formId+")":""),ptOne(FS.m.intro)].filter(Boolean);
    return bits.join(". ")+(ptUsesPages()?" Plus "+PT.pages.length+" composed page"+(PT.pages.length===1?"":"s")+".":"");
  }
  return ptTitle()+". "+PT.pages.length+" composed page"+(PT.pages.length===1?"":"s")+".";
}
function ptPageDescription(p){
  if(p.stage==="intro")return"Introduction. "+ptOne(FS.m.intro)+((FS.m.whatToKnow||[]).length?" What to know: "+FS.m.whatToKnow.map(ptOne).join("; ")+".":"");
  if(p.stage==="review")return"Review page. The Veteran checks and edits each answer.";
  if(p.stage==="sot")return"Statement of truth. In the kit this sits on the review page.";
  if(p.stage==="confirm")return"Confirmation. Tells the Veteran what happens next.";
  if(p.src==="compose")return p.blocks.length?"Components: "+p.blocks.map(b=>(b.kind==="custom"?"custom "+(b.name||"component"):b.tag)+(b.what?" ("+ptOne(b.what)+")":"")).join("; ")+".":"No components yet.";
  return"Asks: "+(p.fields.length?p.fields.map(f=>f.label+(f.required?" (required)":"")).join("; "):"nothing yet")+"."+(p.cond?" Shown only if “"+p.cond.label+"” is “"+p.cond.value+"”.":"")+(p.loop?" Repeats, up to "+p.loop.max+".":"");
}
function ptMermaid(){
  const fp=ptFormPages();if(!fp.length)return"";
  const L=["flowchart TD","  classDef cond stroke-dasharray: 4 3"],q=s=>String(s).replace(/"/g,"'");
  fp.forEach((p,i)=>L.push("  n"+i+'["'+q(p.title)+(p.loop?" (repeats)":"")+'"]'+(p.cond?":::cond":"")));
  let main=-1,between=false;
  const nextMain=i=>{for(let j=i+1;j<fp.length;j++)if(!fp[j].cond)return j;return-1};
  fp.forEach((p,i)=>{
    if(p.cond){
      if(main>=0)L.push("  n"+main+' -->|"if '+q(p.cond.label)+" is "+q(p.cond.value)+'"| n'+i);
      const nx=nextMain(i);if(nx>=0)L.push("  n"+i+" --> n"+nx);
      between=true;
    }else{
      if(main>=0)L.push("  n"+main+(between?' -->|"otherwise"| n':" --> n")+i);
      main=i;between=false;
    }
  });
  return L.join("\n");
}
function ptYml(){
  const desc=ptOne(PT.problem)||ptOne(ptUsesForm()&&FS.m&&FS.m.intro)||ptTitle();
  return["creator: "+(PT.creator.trim()||"YOUR-GITHUB-USERNAME"),"# collaborators: alice, bob   # optional — usernames who can also edit","team: "+(PT.team.trim()||"YOUR-TEAM"),"description: "+desc].join("\n")+"\n";
}
function ptPrd(){
  const P=ptAllPages(),L=[],vp=PT.viewport;
  L.push("# "+ptTitle()+" PRD","");
  L.push("## Problem we’re exploring","",PT.problem.trim()||"[TBD]","");
  L.push("## Prior research","",PT.research.trim()?PT.research.trim().split("\n").filter(Boolean).map(s=>"- "+s.trim()).join("\n"):"[TBD]","");
  L.push("## Product outline","","[TBD]","");
  L.push("## What are we prototyping?","",ptSummaryLine(),"");
  L.push("## Viewport","","- ["+(vp==="mobile"?"x":" ")+"] **Mobile** (320px)","- ["+(vp==="desktop"?"x":" ")+"] **Desktop** (1024px, `--desktop` breakpoint)","- ["+(vp==="both"?"x":" ")+"] **Both** (mobile-first, with desktop layout at 1024px)","");
  L.push("## Prototype Type","");
  [["form","Standard form flow"],["subtask","Sub-task"],["page","Application page"],["mix","Mix"]].forEach(([k,t])=>L.push("- ["+(PT.type===k?"x":" ")+"] **"+t+"**"));
  L.push("");
  L.push("## Pages","");
  P.forEach((p,i)=>L.push((i+1)+". **"+p.title+"** — "+ptPageDescription(p)));
  if(!P.length)L.push("[TBD]");
  L.push("");
  L.push("## User States / Scenarios","");
  if(ptUsesForm()){
    L.push("- **Default:** the Veteran starts with no saved answers and completes the flow.");
    P.filter(p=>p.cond).forEach(p=>L.push("- **Branch:** “"+p.title+"” appears only if “"+p.cond.label+"” is “"+p.cond.value+"”."));
    [...new Set(P.filter(p=>p.loop).map(p=>p.loop.title))].forEach(t=>{const p=P.find(x=>x.loop&&x.loop.title===t);L.push("- **Loop:** “"+t+"” repeats up to "+p.loop.max+" times"+(p.loop.optional?" and can be skipped":"")+".")});
    L.push("- **Error:** required fields left empty when the Veteran selects Continue.");
  }
  if(ptUsesPages())L.push("- **Default:** composed pages show example data.","- **Empty, loading and error states:** [TBD]");
  L.push("");
  L.push("## Key Interactions","");
  if(ptUsesForm()){
    const req=P.flatMap(p=>p.fields.filter(f=>f.required).map(f=>f.label));
    L.push("- Continue validates required fields"+(req.length?": "+req.slice(0,12).join(", ")+(req.length>12?", and "+(req.length-12)+" more":""):"")+".");
    L.push("- Errors show on Continue or Submit only, clear as the Veteran types, and focus moves to the first invalid field.");
    L.push("- Back is the link at the top of each page. Answers persist across pages with FormState.");
    L.push("- Submit on the review page goes to the confirmation page. Nothing is sent.");
  }
  if(ptUsesPages())L.push("- Navigation between composed pages: [TBD]");
  L.push("");
  L.push("## Components Needed","","Run `find-components` and `get-component` for each tag before writing markup.","");
  const inv=ptInventory();
  inv.filter(e=>e.kind==="VADS").forEach(e=>L.push("- `"+e.key+"` — on "+e.pages.size+" page"+(e.pages.size===1?"":"s")));
  const cust=inv.filter(e=>e.kind==="Custom");
  if(cust.length){L.push("","**Custom components** (last resort; each has a reason):","");cust.forEach(e=>L.push("- "+e.key.replace(/^custom: /,"")+" — "+(e.note||"No reason given yet.")))}
  L.push("");
  L.push("## Page Structure","");
  const forms=P.some(p=>p.shellKey==="form"),pgs=P.some(p=>p.shellKey==="page");
  if(forms)L.push("**Form flows and sub-tasks** (templates in `src/templates/form-step/`):","","- `<va-prototype-banner>`","- `<va-prototype-header-minimal>` with the form name as subheader","- Back link, then `va-segmented-progress-bar` on step pages","- Main content in `vads-grid-container` > `vads-grid-row` > `vads-grid-col-12 medium-screen:vads-grid-col-8`","- `va-back-to-top`","- `<va-prototype-footer>`","");
  if(pgs)L.push("**Application pages** (`src/templates/default/base.html`):","","- `<va-prototype-banner>`","- `<va-prototype-header>`","- `va-breadcrumbs`","- Main content in `vads-grid-container` > `vads-grid-row` > `vads-grid-col-12 medium-screen:vads-grid-col-8`","- `va-back-to-top`","- `<va-prototype-footer>`","");
  L.push("## Accessibility","");
  L.push("- Viewport tested with assistive technology: [ ] Mobile VoiceOver  [ ] Desktop JAWS/NVDA");
  ptA11y().forEach(t=>L.push("- "+t));
  L.push("");
  L.push("## Reference","");
  L.push("- Figma: "+(PT.figma.trim()||"[TBD]"));
  L.push("- Prototype preview: "+(PT.url.trim()||"[add after the kit build]"));
  L.push("- Component Builder files: `component-builder/brief.json`"+(ptUsesForm()?", `component-builder/form.json`":"")+", `component-builder/engineer-review.md`");
  return L.join("\n")+"\n";
}
function ptBrief(){
  const rows=ptDepRows();
  return{
    generatedBy:"VADS Component Builder",
    prototype:{name:ptName(),title:ptTitle(),type:PT_TYPE_LABEL[PT.type],typeKey:PT.type,viewport:PT.viewport,team:PT.team||null,creator:PT.creator||null,
      problem:PT.problem||null,research:PT.research.split("\n").map(s=>s.trim()).filter(Boolean),figma:PT.figma||null,previewUrl:PT.url||null},
    shells:{form:ptUsesForm()?PT_SHELL.form:undefined,page:ptUsesPages()?PT_SHELL.page:undefined},
    pages:ptAllPages().map((p,i)=>({order:i+1,id:p.id,title:p.title,source:p.src==="form"?"forms-tab":"composed",stage:p.stage,template:p.template,
      conditional:p.cond?{fieldId:p.cond.id,label:p.cond.label,equals:p.cond.value}:null,repeats:p.loop?{section:p.loop.title,max:p.loop.max,optional:p.loop.optional}:null,
      components:p.tags,
      fields:p.fields.map(f=>({id:f.id,label:f.label,type:f.type,vadsTag:f.tag,required:f.required,personalInfo:f.pii||null,options:f.options})),
      blocks:(p.blocks||[]).map(b=>({id:b.id,kind:b.kind,vadsTag:b.kind==="vads"?b.tag:null,customName:b.kind==="custom"?b.name:null,shows:b.what||null,customReason:b.kind==="custom"?b.why||null:null}))})),
    dataDependencies:rows.map(r=>({id:r.key,page:r.page,label:r.label,vadsTag:r.tag,personalInfo:r.pii||null,source:r.src,system:r.sys||null,controlsPageLogic:r.drives})),
    submission:ptUsesForm()?{destination:((PT.deps.__submit||{}).sys||"").trim()||null}:null,
    openQuestions:ptQuestions().filter(q=>!q.done).map(q=>({for:q.who,question:q.text,note:q.note||null})),
    rules:["Use a VADS component before writing custom HTML.","Custom components only where kind is custom and a reason is given.","Verify every tag with find-components, get-component and validate-component."]
  };
}
function ptReviewMd(){
  const P=ptAllPages(),L=[],rows=ptDepRows(),qs=ptQuestions();
  L.push("# Engineer review: "+ptTitle(),"");
  L.push("- **Type:** "+PT_TYPE_LABEL[PT.type],"- **Folder:** `src/prototypes/"+ptName()+"/`","- **Team:** "+(PT.team||"not added"),"- **Viewport:** "+PT.viewport,"- **Preview:** "+(PT.url.trim()||"not added yet"),"- **Figma:** "+(PT.figma.trim()||"not added"),"");
  if(PT.problem.trim())L.push("**Problem:** "+ptOne(PT.problem),"");
  L.push("## Snapshot","");
  L.push(PT.url.trim()?"Open the preview: "+PT.url.trim():"The preview URL is not added yet. Pages in this prototype:","");
  P.forEach((p,i)=>L.push((i+1)+". "+p.title+" — "+ptPageDescription(p)));
  L.push("");
  L.push("## Specs","","### Page shell","");
  if(P.some(p=>p.shellKey==="form"))L.push("- Form pages: `va-prototype-banner`, `va-prototype-header-minimal`, `va-prototype-footer`, `va-segmented-progress-bar` on steps. State: FormState. Validation: form-validation.ts.");
  if(P.some(p=>p.shellKey==="page"))L.push("- Composed pages: `va-prototype-banner`, `va-prototype-header`, `va-breadcrumbs`, `va-back-to-top`, `va-prototype-footer`.");
  L.push("","### Pages","",ptMdTable(["#","Page","Template","Components","Logic"],P.map((p,i)=>[i+1,p.title,"`"+p.template.split(" (")[0]+"`",p.tags.map(t=>"`"+t+"`").join(" "),p.cond?"Shown if “"+p.cond.label+"” is “"+p.cond.value+"”":(p.loop?"Repeats, up to "+p.loop.max:"")])),"");
  L.push("### Component inventory","",ptMdTable(["Component","Kind","Pages","Note"],ptInventory().map(e=>["`"+e.key.replace(/^custom: /,"")+"`",e.kind,e.pages.size,e.note||""])),"");
  L.push("### Accessibility","");ptA11y().forEach(t=>L.push("- "+t));L.push("");
  L.push("## Data dependencies","");
  L.push(rows.length?ptMdTable(["Page","Field or component","VADS tag","Personal info","Source","System or endpoint"],rows.map(r=>[r.page,r.label+(r.req?" (required)":""),"`"+r.tag+"`",r.pii||"",PT_SRC_LABEL[r.src],r.sys||(r.src==="user"||r.src==="static"?"":"not named")])):"None yet.");
  if(ptUsesForm())L.push("","**Submission destination:** "+(((PT.deps.__submit||{}).sys||"").trim()||"not named"));
  L.push("");
  L.push("## Process flows","");
  const mm=ptMermaid();
  if(mm)L.push("### Page flow","","```mermaid",mm,"```","");
  const cp=ptComposedPages();
  if(cp.length)L.push("### Composed pages","",cp.map(p=>"- "+p.title+": "+(p.blocks.length?p.blocks.map(b=>b.kind==="custom"?(b.name||"custom"):b.tag).join(", "):"no components yet")).join("\n"),"");
  L.push("### Data flow","");
  const groups={};
  rows.filter(r=>r.src!=="static").forEach(r=>{(groups[r.src]||(groups[r.src]={n:0,sys:new Set()})).n++;if(String(r.sys).trim())groups[r.src].sys.add(r.sys.trim())});
  Object.keys(groups).forEach(k=>L.push("- "+PT_SRC_LABEL[k]+": "+groups[k].n+" item"+(groups[k].n===1?"":"s")+(groups[k].sys.size?" from "+[...groups[k].sys].join(", "):((k==="api"||k==="prefill")?" (source not named)":""))));
  L.push("- In the prototype, answers are held in the browser by FormState and nothing is sent.");
  if(ptUsesForm())L.push("- On submit: "+(((PT.deps.__submit||{}).sys||"").trim()||"destination not named")+".");
  L.push("");
  L.push("## Outstanding questions","");
  qs.filter(q=>!q.done).forEach(q=>L.push("- [ ] **"+q.who+":** "+q.text+(q.note?" — "+q.note:"")));
  qs.filter(q=>q.done).forEach(q=>L.push("- [x] **"+q.who+":** "+q.text+(q.note?" — "+q.note:"")));
  if(!qs.length)L.push("None.");
  return L.join("\n")+"\n";
}
function ptPrompt(){
  const n=ptName();
  const L=[];
  L.push("Create a prototype from a VADS Component Builder bundle.","");
  L.push("The bundle is already in `src/prototypes/"+n+"/`:","- `prd.md` and `prototype.yml`, filled in","- `component-builder/brief.json`, the pages, components, fields and data sources"+(ptUsesForm()?"\n- `component-builder/form.json`, the form model from the Form Builder":""),"- `component-builder/engineer-review.md`, the review page for engineering","");
  L.push("Follow `docs/skills/prototype-workflow.md`. Do not ask again for the name, type, viewport, team or description. They are in `prototype.yml` and `prd.md`."+(PT.creator.trim()?"":" `creator` is a placeholder, so detect it with `gh api user --jq .login` as Step 3 describes."),"");
  L.push(PT.research.trim()&&PT.problem.trim()?"The PRD’s problem and research sections are written. At Step 4.6 choose Full depth. Do not rewrite `prd.md`.":"The PRD’s "+(PT.problem.trim()?"prior research":(PT.research.trim()?"problem statement":"problem and prior research"))+" "+(PT.problem.trim()||PT.research.trim()?"section is":"sections are")+" still [TBD]. Run Step 4.5 discovery before you build, and keep the rest of `prd.md`.","");
  L.push("Rules for this build:","");
  L.push("1. Use a VADS component before custom HTML. Run `find-components` and `get-component` for every tag in `brief.json`, and `validate-component` on the markup you write.");
  L.push("2. Build a custom component only where a block has `kind: \"custom\"`. Each has a reason in `customReason`. Style it with VADS tokens only, and keep it inside the prototype folder.");
  if(ptUsesForm()){
    L.push("3. Form pages: start from `src/templates/form-step/`. Follow `docs/form-prototype-guide.md`. Run `get-guide form-patterns`, and `list-patterns` and `get-pattern` for name, address and contact groups. Use FormState and form-validation.ts. Put the statement of truth on the review page.");
    L.push("4. Honor each page’s `conditional` and `repeats` entries in `brief.json`.");
  }
  if(ptUsesPages())L.push((ptUsesForm()?"5":"3")+". Composed pages: start from `src/templates/default/base.html`. Place the components in the order listed. Use example data. Do not call any real endpoint.");
  L.push("- Data sources in `dataDependencies` describe the real product. In the prototype, use mock data and say so in the page footer or the PRD.");
  L.push("- Do not invent answers to `openQuestions`. Leave them in `engineer-review.md`.");
  L.push("- Take a `playwright-cli` screenshot of every page and compare it with `prd.md` before you report done.");
  L.push("- Run `npm run lint` before any commit. Do not commit or push until I ask.","");
  L.push("When you finish, tell me the preview URL so I can add it to the engineer review.");
  return L.join("\n")+"\n";
}
/* One json-render spec per composed page, built from the page's blocks. Props are empty because blocks do not carry props; this is the page structure, not a finished render. */
function ptSpecs(){
  const byTag={};if(SNAP)SNAP.entries.forEach(e=>{byTag[e.tagName]=e.key});
  return {note:"Structure only: each block becomes an element of the matching Va* key with empty props. Blocks with no matching key are listed in warnings.",
    snapshot:SNAP?{generatedAt:SNAP.generatedAt,webComponents:(SNAP.versions||{}).webComponentsInstalled}:null,
    pages:PT.pages.map(pg=>{
      const elements={},children=[],warnings=[];
      pg.blocks.forEach((b,i)=>{
        const key=byTag[b.tag];
        if(!key){warnings.push((b.tag||"custom block")+(b.kind==="custom"?" (custom: "+(b.why||"no reason given")+")":" has no entry in the snapshot"));return}
        const id=b.tag.replace(/^va-/,"")+"-"+(i+1);elements[id]={type:key,props:{},children:[]};children.push(id);
      });
      elements.page={type:"Section",props:{},children};
      return {id:pg.id,title:pg.title||"Untitled page",spec:{root:"page",elements},warnings};
    })};
}
function ptFiles(){
  const n=ptName(),F={};
  F["README.md"]=["# Prototype bundle: "+ptTitle(),"","Made with the VADS Component Builder.","","1. Copy the `"+n+"/` folder into `va-prototype-kit/src/prototypes/`.","2. Open the kit in Claude Code and paste the contents of `"+n+"/component-builder/claude-code-prompt.md`.","3. Review `"+n+"/component-builder/engineer-review.md` with engineering.","","`prototype.yml` and `prd.md` follow the kit’s format. The `component-builder/` files are inputs to the build and are safe to delete after it.",""].join("\n");
  F[n+"/prd.md"]=ptPrd();
  F[n+"/prototype.yml"]=ptYml();
  F[n+"/component-builder/brief.json"]=JSON.stringify(ptBrief(),null,2)+"\n";
  if(ptUsesForm())F[n+"/component-builder/form.json"]=JSON.stringify(toModelJSON(FS.m),null,2)+"\n";
  F[n+"/component-builder/engineer-review.md"]=ptReviewMd();
  F[n+"/component-builder/spec.json"]=JSON.stringify(ptSpecs(),null,2)+"\n";
  F[n+"/component-builder/claude-code-prompt.md"]=ptPrompt();
  return F;
}
function ptTreeText(paths){
  const seen=new Set(),out=["bundle/"];
  paths.slice().sort((a,b)=>a.localeCompare(b)).forEach(p=>{
    const parts=p.split("/");
    parts.forEach((part,i)=>{
      const key=parts.slice(0,i+1).join("/");
      if(seen.has(key))return;seen.add(key);
      out.push("  ".repeat(i+1)+part+(i<parts.length-1?"/":""));
    });
  });
  return out.join("\n");
}
function ptRenderBundle(main){
  const F=ptFiles(),paths=Object.keys(F);
  const tree=ptCard("What’s in the bundle");
  tree.append(fel("p",{class:"rnote",style:"padding:0 18px 6px",text:"Copy the folder into va-prototype-kit/src/prototypes/, open the kit in Claude Code, and paste the prompt."}),fel("pre",{class:"pt-tree",text:ptTreeText(paths)}));
  main.append(tree);
  paths.forEach(p=>{
    const copy=fel("button",{class:"tool",type:"button",text:"Copy"});copy.onclick=()=>rCopy(F[p]);
    const save=fel("button",{class:"tool",type:"button",text:"Save file"});save.onclick=()=>ptSaveFile(p,F[p]);
    const card=ptCard(p);
    card.append(fel("div",{style:"display:flex;gap:8px;padding:4px 18px 8px"},copy,save),fel("pre",{class:"rpre",text:F[p]}));
    main.append(card);
  });
}
async function ptSaveFile(path,text){
  const dl=await use("downloads");
  if(!dl){toast("Saving files isn’t available here. Use Copy.");return}
  let name=path.split("/").pop();
  if(!/\.(md|json|txt|csv|html|zip)$/i.test(name))name+=".txt";
  try{await dl.save({filename:name,data:text})}catch(e){if(!e||e.code!=="declined")toast("The file couldn’t be saved. Use Copy.")}
}
/* ---------- Figma: push to a Figma file on command or automatically; download an SVG when Figma isn't connected ---------- */
const FIG_INLINE=new Set(["A","SPAN","STRONG","EM","B","I","CODE","ABBR","SMALL","BR"]);
const FIG_HSIZE={H1:32,H2:28,H3:24,H4:20,H5:18,H6:16};
const FIG_PRE=["server_not_connected","needs_reauth","selection_required","not_in_manifest","not_granted","capability_disabled","capability_removed","blocked_by_policy","approval_required","bad_request","user_changed"];
function figKey(url){const m=String(url||"").match(/figma\.com\/(?:design|file|board|make)\/([0-9a-zA-Z]{22,128})/);return m?m[1]:""}
function figLeaf(el,text){
  const t=el.localName||"",up=t.toUpperCase();
  return{kind:"text",name:t==="text"?"Text":t,text,size:FIG_HSIZE[up]||16,bold:/^h[1-6]$/.test(t)||up==="STRONG"||up==="B",color:up==="A"?"#005ea2":"#1b1b1b",underline:up==="A"};
}
function figEl(el){
  const up=el.tagName.toUpperCase();
  if(["SCRIPT","STYLE","NOSCRIPT","TEMPLATE"].includes(up))return[];
  const block=[...el.children].some(c=>!FIG_INLINE.has(c.tagName.toUpperCase()));
  const text=el.textContent.replace(/\s+/g," ").trim();
  if(!block)return text?[figLeaf(el,text)]:[];
  return[{kind:"frame",name:el.localName,children:figKids(el)}];
}
function figKids(el){
  const out=[];
  el.childNodes.forEach(n=>{
    if(n.nodeType===3){const t=n.textContent.replace(/\s+/g," ").trim();if(t)out.push(figLeaf(el,t))}
    else if(n.nodeType===1)out.push(...figEl(n));
  });
  return out;
}
function figT(text,size,bold,color){return{kind:"text",name:text.slice(0,32),text,size:size||16,bold:!!bold,color:color||"#1b1b1b",underline:false}}
function figTree(){
  const w=PT.viewport==="desktop"?1024:360;
  return ptAllPages().map(pg=>{
    const kids=[figT(pg.title||"Untitled page",24,true)];
    if(pg.src==="form"){
      if(!pg.fields.length)kids.push(figT(pg.stage==="intro"?"Introduction":pg.title,16));
      pg.fields.forEach(f=>{
        const c=[figT(f.label+(f.required?" (required)":""),16,true)];
        if(f.hint)c.push(figT(f.hint,14,false,"#4d4d4d"));
        if(f.options&&f.options.length)c.push(figT(f.options.join(" · "),14,false,"#4d4d4d"));
        kids.push({kind:"frame",name:f.tag,children:c});
      });
      if(!pg.fields.length)pg.tags.forEach(t=>kids.push({kind:"frame",name:t,children:[figT("Component on this page",14,false,"#4d4d4d")]}));
    }else{
      if(!pg.blocks.length)kids.push(figT("No components on this page yet.",16,false,"#4d4d4d"));
      pg.blocks.forEach(b=>{
        const name=b.kind==="custom"?"custom: "+(b.name||"unnamed"):(b.tag||"component");
        if(b.html){
          const doc=new DOMParser().parseFromString("<body>"+b.html+"</body>","text/html");
          kids.push({kind:"frame",name,children:figKids(doc.body)});
        }else kids.push({kind:"frame",name,children:[figT(b.what||name,14,false,"#4d4d4d")]});
      });
    }
    return{name:pg.title||"Untitled page",width:w,children:kids};
  });
}
const FIG_RUNNER=`
const hex=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
let FAM="Public Sans";
try{await figma.loadFontAsync({family:"Public Sans",style:"Regular"});await figma.loadFontAsync({family:"Public Sans",style:"Bold"})}
catch(e){FAM="Inter";await figma.loadFontAsync({family:"Inter",style:"Regular"});await figma.loadFontAsync({family:"Inter",style:"Bold"})}
function build(n,parent){
  if(n.kind==="text"){
    const t=figma.createText();t.fontName={family:FAM,style:n.bold?"Bold":"Regular"};t.fontSize=n.size;
    t.fills=[{type:"SOLID",color:hex(n.color)}];t.characters=n.text;if(n.underline)t.textDecoration="UNDERLINE";
    t.name=n.name;t.textAutoResize="HEIGHT";parent.appendChild(t);t.layoutSizingHorizontal="FILL";return[t.id];
  }
  const f=figma.createAutoLayout("VERTICAL");f.name=n.name;f.itemSpacing=12;f.fills=[];
  parent.appendChild(f);f.layoutSizingHorizontal="FILL";
  const ids=[f.id];n.children.forEach(c=>ids.push(...build(c,f)));return ids;
}
const ids=[];
for(const p of PAGES){
  let maxX=0;for(const c of figma.currentPage.children)maxX=Math.max(maxX,c.x+c.width);
  const root=figma.createAutoLayout("VERTICAL");root.name=p.name;root.resize(p.width,100);
  root.primaryAxisSizingMode="AUTO";root.counterAxisSizingMode="FIXED";root.itemSpacing=24;
  root.paddingLeft=24;root.paddingRight=24;root.paddingTop=24;root.paddingBottom=24;
  root.fills=[{type:"SOLID",color:hex("#ffffff")}];
  figma.currentPage.appendChild(root);root.x=maxX?maxX+100:0;root.y=0;ids.push(root.id);
  for(const c of p.children)ids.push(...build(c,root));
}
return{createdNodeIds:ids,pages:PAGES.length};
`;
function figCode(pages){return"const PAGES="+JSON.stringify(pages)+";\n"+FIG_RUNNER}
function figSvg(pages){
  const GAP=80,PAD=24,FONT="Public Sans, Arial, sans-serif";
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  let x0=0,H=0;const groups=[];
  pages.forEach(p=>{
    const W=p.width,items=[];let y=PAD;
    const walk=(nodes,x,w)=>nodes.forEach(n=>{
      if(n.kind==="text"){
        const cpl=Math.max(8,Math.floor(w/(n.size*0.5)));const lines=[];let line="";
        n.text.split(" ").forEach(word=>{if((line+" "+word).trim().length>cpl){lines.push(line.trim());line=word}else line+=" "+word});
        if(line.trim())lines.push(line.trim());
        lines.forEach(l=>{y+=n.size*1.4;items.push('<text x="'+x+'" y="'+y+'" font-family="'+FONT+'" font-size="'+n.size+'" font-weight="'+(n.bold?700:400)+'" fill="'+n.color+'"'+(n.underline?' text-decoration="underline"':'')+'>'+esc(l)+'</text>')});
        y+=6;
      }else{y+=4;walk(n.children,x,w);y+=12}
    });
    walk(p.children,PAD,W-2*PAD);
    const h=y+PAD;
    groups.push('<g transform="translate('+x0+',0)"><text x="0" y="-12" font-family="'+FONT+'" font-size="14" font-weight="700" fill="#1b1b1b">'+esc(p.name)+'</text><rect width="'+W+'" height="'+h+'" rx="8" fill="#ffffff" stroke="#d6d7d9"/>'+items.join("")+'</g>');
    x0+=W+GAP;H=Math.max(H,h);
  });
  const total=Math.max(0,x0-GAP);
  return'<svg xmlns="http://www.w3.org/2000/svg" width="'+total+'" height="'+(H+24)+'" viewBox="0 0 '+total+' '+(H+24)+'"><rect width="100%" height="100%" fill="#f0f0f0"/><g transform="translate(0,24)">'+groups.join("")+'</g></svg>';
}
async function figDownload(pages,note){
  const dl=await use("downloads");
  if(!dl){toast("Downloads aren’t available here. Connect Figma to send the design directly.");return}
  try{await dl.save({filename:ptName()+"-figma.svg",data:figSvg(pages)});toast(note||"Downloaded an SVG. Import it in Figma from File, then Import.")}
  catch(e){if(!e||e.code!=="declined")toast("The file couldn’t be saved.")}
}
async function figPush(auto){
  const pages=figTree();
  if(!pages.length){if(!auto)toast("There are no pages to send yet.");return}
  const key=figKey(PT.figma),mcp=await use("mcp");
  if(!key||!mcp){
    if(auto){toast("Not sent to Figma. Add a Figma file link and connect Figma.");return}
    figDownload(pages,!key?"Add the Figma file link to send directly. Downloaded an SVG instead.":"Figma isn’t connected here. Downloaded an SVG instead.");
    return;
  }
  const b=$("#pt-figpush");if(b)b.disabled=true;
  try{
    const ses=await mcp.callTool("Figma","create_session",{fileKey:key,description:"Push the approved Component Builder prototype to this file"});
    const sid=ses&&ses.payload&&ses.payload.sessionId;
    await mcp.callTool("Figma","use_figma",{fileKey:key,sessionId:sid,description:"Build the prototype pages as editable layers",code:figCode(pages)});
    toast("Sent to Figma. Check the file.");
  }catch(e){
    const c=e&&e.code;
    const msg=({server_not_connected:"Connect Figma in claude.ai Settings → Connectors.",needs_reauth:"Reconnect Figma in claude.ai Settings → Connectors.",selection_required:"Choose a Figma connector in claude.ai.",not_in_manifest:"This page isn’t allowed to use Figma. Allow it in the Permissions menu.",approval_required:"Figma needs your approval. Send again and allow it."})[c]||"Figma didn’t confirm the update. Check the file before sending again.";
    if(auto)toast("Not sent to Figma. "+msg);
    else if(FIG_PRE.includes(c))figDownload(pages,msg+" Downloaded an SVG instead.");
    else toast(msg);
  }finally{if(b)b.disabled=false}
}
const ptFigBtn=$("#pt-figpush");if(ptFigBtn)ptFigBtn.onclick=()=>figPush(false);

async function ptZip(){
  const btn=$("#pt-zip"),dl=await use("downloads");
  if(!dl){toast("Downloads aren’t available here. Use Copy on each file.");return}
  if(!window.JSZip){toast("The zip tool didn’t load. Save the files one at a time.");return}
  btn.disabled=true;
  try{
    const z=new JSZip(),F=ptFiles();
    Object.keys(F).forEach(p=>z.file(p,F[p]));
    const blob=await z.generateAsync({type:"blob"});
    await dl.save({filename:ptName()+"-bundle.zip",data:blob});
  }catch(e){if(!e||e.code!=="declined")toast("The bundle couldn’t be saved. Save the files one at a time.")}
  btn.disabled=false;
}
$("#pt-zip").onclick=ptZip;
$("#pt-copyprompt").onclick=()=>rCopy(ptPrompt());
$("#tab-proto").onclick=()=>setTab("proto");


/* ---------- Records: spec gate, component records, governance view ---------- */
const RC_STATUS=["Provisional","Under review","Accepted","Implemented","Operational","Deprecated","Retired"];
const RC_DS=["Open","Recommend existing component","Extend design system","Stays product-specific"];
const RC_NATIVE=new Set(["h1","h2","h3","h4","p","ul","ol","li","section","div","span"]);
const RC_DOC=new Set(Object.keys(REF_PROPS));
const RC_TAGS=new Set([...Object.keys(VADS_SPEC),...RC_DOC]);
const RC_LS="vads-records-local";
const RC={mode:"design",cur:null,busy:false,ctl:null,db:[],local:[],f:{status:"",kind:"",q:""},wired:false};
try{RC.local=JSON.parse(localStorage.getItem(RC_LS)||"[]")}catch(e){RC.local=[]}

/* Gate: every element in a spec is checked against the registry. */
function rcName(t){return String(t).replace(/^unmet:/,"")}
function rcKind(t){
  if(RC_DOC.has(t))return "documented";
  if(RC_TAGS.has(t))return "known";
  if(RC_NATIVE.has(t))return "native";
  return "unmet";
}
function rcGate(spec){
  const els=spec.elements||{},rows=[],seen=new Set();
  const walk=(k,d)=>{
    if(seen.has(k)||!els[k]||rows.length>40)return;
    seen.add(k);
    const el=els[k],t=String(el.type||""),kind=rcKind(t),w=[],props=el.props||{};
    if(kind==="documented"){
      const ok=new Set(REF_PROPS[t].props.map(p=>p[0]));
      Object.keys(props).forEach(p=>{if(!ok.has(p))w.push("Prop "+p+" is not documented for "+t)});
    }
    if(kind==="native")Object.keys(props).forEach(p=>{if(["text","slot","id"].indexOf(p)<0)w.push("Native element "+t+" should not carry "+p)});
    if(kind==="known"&&Object.keys(props).length)w.push("Props for "+t+" are not documented here, so they were not checked");
    rows.push({key:k,type:t,kind,depth:d,props,warnings:w});
    (Array.isArray(el.children)?el.children:[]).forEach(c=>walk(String(c),d+1));
  };
  walk(String(spec.root||""),0);
  const missing=Object.keys(els).filter(k=>!seen.has(k));
  const n=f=>rows.filter(f).length;
  return {rows,missing,counts:{registered:n(r=>r.kind==="documented"||r.kind==="known"),native:n(r=>r.kind==="native"),unmet:n(r=>r.kind==="unmet"),warnings:rows.reduce((a,r)=>a+r.warnings.length,0)}};
}
function rcRecords(cur,gate){
  const uses={};(cur.uses||[]).forEach(u=>{if(u&&u.element)uses[String(u.element)]=u});
  const now=Date.now(),out=[],arr=x=>Array.isArray(x)?x.map(String).slice(0,6):[];
  gate.rows.forEach(r=>{
    if(r.kind==="native")return;
    const u=uses[r.key]||{},un=r.kind==="unmet";
    out.push({id:"rec-"+Math.random().toString(36).slice(2,8),version:1,kind:un?"unmet":"registered",component:rcName(r.type),element:r.key,
      need:String(u.need||cur.need||""),reason:String(u.reason||""),
      rejected:Array.isArray(u.rejected)?u.rejected.slice(0,4).map(x=>({component:String(x&&x.component||""),why:String(x&&x.why||"")})):[],
      states:arr(u.states),a11y:arr(u.a11y),data:arr(u.data),props:r.props,
      status:"Provisional",reuse:un?"Not yet assessed":"Reusable",ds:un?"Open":"",
      warnings:r.warnings.slice(0,6),spec:cur.title,created:now,updated:now,history:[{at:now,status:"Provisional"}]});
  });
  return out;
}
function rcUsage(c){const u=REF_USAGE.C[String(c).replace(/^va-/,"")];return u?{uses:u.u,products:u.n}:null}

/* Generation */
function rcCatalogText(){
  const doc=[...RC_DOC].map(t=>t+": "+(REF_PROPS[t].props.map(p=>p[0]+(p[1].indexOf("|")>-1?"="+p[1].replace(/\s+/g,""):"")).join(", ")||"(no props)")).join("\n");
  return doc+"\nKNOWN TAGS (props not documented, so use only props you are sure of): "+[...RC_TAGS].filter(t=>!RC_DOC.has(t)).join(", ");
}
function rcPrompt(text){
  const rules=VADS_KNOWLEDGE.split("\n").filter(l=>/^(CONTENT|ACCESSIBILITY):/.test(l)).join("\n");
  return "You are the VADS Component Builder agent. You turn a user need into a page SPEC (not code) built only from registered VADS components, and you record why each component was chosen.\n\n"+
  "REGISTERED COMPONENTS (type: allowed props). Use only these va-* types:\n"+rcCatalogText()+"\n\n"+
  "NATIVE ELEMENTS, for text and layout only: h1, h2, h3, h4, p, ul, ol, li, section, div, span. They take only the props text, slot and id.\n\n"+
  "RULES:\n- The spec is a flat tree. spec.root names one element key. spec.elements maps each key to {type, props, children}. children is an array of element keys. Text content always goes in props.text, never in children.\n- Never write HTML, classes, styles or code inside the spec.\n- Use a registered component whenever one covers the need. When none does, emit an element with type \"unmet:<kebab-name>\" whose props describe what is needed, and explain in its uses entry why no registered component fits. Never fake a missing component with native elements.\n- Every va-* element and every unmet element needs one entry in uses. Keep the page small: 12 elements or fewer.\n- reason says why this component and not another. rejected lists up to 2 registered components you considered, with why not.\n\n"+rules+"\n\n"+
  "Reply with ONLY one JSON object, no prose, shaped like:\n"+
  "{\"title\":\"Sentence case name, 6 words max\",\"need\":\"One sentence: what the Veteran needs, in plain words\",\"summary\":\"One sentence on what the page does\",\n"+
  "\"spec\":{\"root\":\"root\",\"elements\":{\"root\":{\"type\":\"section\",\"props\":{},\"children\":[\"h\"]},\"h\":{\"type\":\"h2\",\"props\":{\"text\":\"Your claim status\"}}}},\n"+
  "\"uses\":[{\"element\":\"key\",\"need\":\"What the user needs from this element\",\"reason\":\"Why this component and not another\",\"rejected\":[{\"component\":\"va-summary-box\",\"why\":\"...\"}],\"states\":[\"error\",\"loading\"],\"a11y\":[\"short note\"],\"data\":[\"data or capability it depends on, such as claim status from the claims API\"]}],\n"+
  "\"preview\":{\"html\":\"<section class=\\\"rc-p\\\">...</section>\",\"css\":\".rc-p{...}\"}}\n"+
  "The preview is an illustrative lookalike using the VADS CSS tokens (web components cannot load in the preview). It is not the record. Keep it short and prefix classes with rc-.\n\nNEED: "+text;
}
function rcNormalize(o,text){
  if(!o||typeof o!=="object"||!o.spec||!o.spec.elements||typeof o.spec.elements!=="object"||!o.spec.elements[o.spec.root])throw{code:"invalid_json"};
  const els={};
  Object.keys(o.spec.elements).slice(0,30).forEach(k=>{const e=o.spec.elements[k]||{};els[k]={type:String(e.type||""),props:(e.props&&typeof e.props==="object"&&!Array.isArray(e.props))?e.props:{},children:Array.isArray(e.children)?e.children.map(String):[]}});
  return {title:String(o.title||"Untitled page"),need:String(o.need||""),summary:String(o.summary||""),prompt:text,
    spec:{root:String(o.spec.root),elements:els},uses:Array.isArray(o.uses)?o.uses.slice(0,20):[],
    preview:(o.preview&&typeof o.preview.html==="string"&&o.preview.html.trim())?{html:o.preview.html,css:String(o.preview.css||""),js:""}:null};
}
function rcBuild(out,text){const cur=rcNormalize(out,text);cur.gate=rcGate(cur.spec);cur.records=rcRecords(cur,cur.gate);cur.saved=false;return cur}
function rcStatus(msg,live,err){const s=$("#rc-status");s.className="status"+(err?" err":"");s.innerHTML="";if(live){const d=document.createElement("span");d.className="spin";d.setAttribute("aria-hidden","true");s.append(d)}s.append(document.createTextNode(msg))}
function rcBusy(b){RC.busy=b;$("#rc-gen").disabled=b;$("#rc-stop").hidden=!b}
async function rcRun(text){
  if(RC.busy)return;
  if(!text.trim()){rcStatus("Describe the need first, or pick a starter.",false,true);return}
  if(!sample){rcStatus("Claude isn't available to this page right now. Open it in Claude and allow access when asked, or use Load an example.",false,true);return}
  RC.ctl=new AbortController();rcBusy(true);rcStatus("Writing the spec. This usually takes 30 to 60 seconds.",true);
  try{
    const out=await sample.json(rcPrompt(text.trim()),{signal:RC.ctl.signal,cache:false,onText:({text:t})=>rcStatus("Writing the spec… "+(t.length/1000).toFixed(1)+"k characters",true)});
    RC.cur=rcBuild(out,text.trim());RC.mode="design";
    const u=RC.cur.gate.counts.unmet;
    rcStatus(u?"Done. "+u+" unmet need"+(u>1?"s":"")+" recorded. Review the records, then save them.":"Done. Every component is registered. Review the records, then save them.");
  }catch(e){
    const c=e&&e.code;
    if(c==="cancelled")rcStatus("Stopped.");
    else{rcStatus(ERR[c]||"Something went wrong reaching Claude. Try again.",false,true);if(c==="not_granted"||c==="sampling_disabled")sample=null}
  }finally{rcBusy(false);rcRender()}
}

/* Storage: shared through db when signed in, this browser otherwise */
async function rcSave(){
  const c=RC.cur;if(!c||!c.records.length||c.saved)return;
  const recs=c.records.map(r=>Object.assign({},r,{updated:Date.now()}));
  try{
    if(db&&uid){
      const ref=db.doc("records/"+uid),snap=await ref.get();
      const items=snap.exists&&Array.isArray(snap.data().items)?snap.data().items.slice():[];
      const next=recs.concat(items).slice(0,80);
      if(JSON.stringify({items:next}).length>240000){toast("Your saved records are too large. Remove older ones first.");return}
      await ref.set({items:next});
    }else{
      RC.local=recs.map(r=>Object.assign(r,{owner:"local"})).concat(RC.local).slice(0,80);
      localStorage.setItem(RC_LS,JSON.stringify(RC.local));
    }
    c.saved=true;toast(db&&uid?"Saved to the governance view":"Saved in this browser");rcRender();
  }catch(e){toast("Couldn't save. You may need Contributor access to this page.")}
}
async function rcPatch(id,patch,msg){
  const at=Date.now();
  const bump=r=>{const n=Object.assign({},r,patch,{updated:at});if(patch.status&&patch.status!==r.status)n.history=(r.history||[]).concat([{at,status:patch.status}]).slice(-20);return n};
  try{
    if(db&&uid){
      const ref=db.doc("records/"+uid),snap=await ref.get();
      const items=snap.exists&&Array.isArray(snap.data().items)?snap.data().items:[];
      await ref.set({items:items.map(r=>r.id===id?bump(r):r)});
    }else{
      RC.local=RC.local.map(r=>r.id===id?bump(r):r);localStorage.setItem(RC_LS,JSON.stringify(RC.local));rcRender();
    }
    toast(msg);
  }catch(e){toast("Couldn't update the record.");rcRender()}
}
function rcWatch(){
  try{db.collection("records").onSnapshot(snap=>{
    const out=[];snap.docs.forEach(d=>{((d.data()&&d.data().items)||[]).forEach(it=>out.push(Object.assign({},it,{owner:d.id})))});
    RC.db=out;rcNames();if(!$("#view-rec").hidden)rcRender();
  },()=>{RC.db=[]})}catch(e){}
}
async function rcNames(){
  if(!user)return;const ids=[...new Set(RC.db.map(r=>r.owner))].filter(id=>!(id in names));if(!ids.length)return;
  try{const ps=await user.profiles(ids);ids.forEach(id=>names[id]=(ps&&ps[id]&&ps[id].name)||"A teammate");if(!$("#view-rec").hidden)rcRender()}catch(e){}
}
function rcBoot(){
  rcRegistry();
  if(sample){$("#rc-gen").disabled=false;rcStatus("Ready. Pick a starter or describe your own.")}
  else rcStatus("Checking a need works when this page is opened in Claude. You can still load the example and browse the governance view.");
  if(db)rcWatch();
}

/* Sample records so the governance view is not empty. Clearly marked. */
const RC_T0=Date.UTC(2026,9,13),RC_D=864e5;
function rcS(n,kind,comp,need,reason,status,spec,day,ds){return{id:"rec-sample"+n,version:1,kind,component:comp,need,reason,rejected:[],states:[],a11y:[],data:[],props:{},status,reuse:kind==="unmet"?"Not yet assessed":"Reusable",ds:ds||(kind==="unmet"?"Open":""),warnings:[],spec,created:RC_T0+day*RC_D,updated:RC_T0+day*RC_D,history:[],sample:true,owner:"sample"}}
const RC_SAMPLES=[
  rcS(1,"registered","va-alert","Tell a Veteran their claim moved to evidence gathering","Status messages that need attention use va-alert so announcements and focus behave consistently.","Accepted","Example product A",0),
  rcS(2,"registered","va-process-list","Show the next steps after a form is submitted","A numbered sequence of steps is the documented use of va-process-list.","Implemented","Example product A",1),
  rcS(3,"registered","va-radio","Pick a preferred contact method","One choice from a short list, with a visible label and hint.","Under review","Example product B",2),
  rcS(4,"registered","va-button","Continue to the next form step","Primary action on a step; label starts with a verb.","Implemented","Example product B",3),
  rcS(5,"unmet","claim-timeline-scrubber","Show every claim status change on a draggable, time-scaled timeline","No registered component shows a time-scaled timeline; va-process-list is sequential only.","Under review","Example product A",4,"Open"),
  rcS(6,"unmet","claim-timeline-scrubber","Let a caregiver scrub through a claim's history by date","Same need as another team: sequential steps hide how long each stage took.","Provisional","Example product C",6,"Open"),
  rcS(7,"unmet","status-tile-grid","Compare several claims at a glance in a grid of status tiles","Cards do not carry a status and progress together.","Under review","Example product B",5,"Recommend existing component"),
  rcS(8,"registered","va-memorable-date","Ask for a date of birth","Documented component for known dates; handles month, day and year errors.","Operational","Example product C",2)
];
function rcAll(){return (db?RC.db:RC.local).concat(RC_SAMPLES).sort((a,b)=>(b.updated||0)-(a.updated||0))}
function rcMine(r){return !r.sample&&(r.owner==="local"||(uid&&r.owner===uid))}
function rcWho(r){return r.sample?"Sample":(rcMine(r)?"You":(r.owner==="local"?"This browser":(names[r.owner]||"A teammate")))}
function rcDate(t){return t?new Date(t).toLocaleDateString(undefined,{month:"short",day:"numeric"}):""}
function rcOpts(list,val){return list.map(o=>'<option'+(o===val?' selected':'')+'>'+rx(o)+'</option>').join("")}
function rcList(a){return a&&a.length?'<ul style="margin:4px 0 0;padding-left:18px;display:grid;gap:3px">'+a.map(x=>'<li>'+rx(x)+'</li>').join("")+'</ul>':'<span class="rnote" style="padding:0">None given</span>'}

/* Rendering */
function rcRegistry(){
  const known=[...RC_TAGS].filter(t=>!RC_DOC.has(t)).length;
  $("#rc-reg").innerHTML=
   '<li><b>'+RC_DOC.size+'</b> components with documented props, checked prop by prop</li>'+
   '<li><b>'+known+'</b> more VADS tags, checked by name only</li>'+
   '<li>Native text and layout elements are allowed. Anything else is recorded as an unmet need.</li>';
}
function rcHead(){
  const c=RC.cur,gov=RC.mode==="gov";
  $("#rc-title").textContent=gov?"Governance view":(c?c.title:"Records");
  $("#rc-sum").textContent=gov?"Every component choice and unmet need across saved records, with status and reuse. Records marked Sample are examples.":(c?c.summary||c.need:"A record for every component choice, with its reason and status.");
  document.querySelectorAll("#rc-mode button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.rcm===RC.mode)));
  const sv=$("#rc-save");sv.hidden=gov;sv.disabled=!(c&&c.records.length&&!c.saved);sv.textContent=c&&c.saved?"Saved":"Save records";
  $("#rc-copy").textContent=gov?"Copy all as JSON":"Copy record JSON";$("#rc-copy").disabled=!gov&&!c;
}
function rcRender(){rcHead();if(RC.mode==="gov")rcRenderGov();else rcRenderDesign()}
function rcRecCard(r,edit){
  const un=r.kind==="unmet",use=!un&&rcUsage(r.component);
  let h='<article class="rcard" data-rid="'+rx(r.id)+'"><h3 class="rh"><code>'+rx(r.component)+'</code><span class="pill" style="'+(un?'background:color-mix(in srgb,#c77700 18%,transparent);color:var(--label)':'')+'">'+(un?'Unmet need':'Registered')+'</span><span class="pill">'+rx(r.id)+' · v'+r.version+'</span></h3><div style="padding:0 0 8px">';
  const f=(l,body)=>'<div class="fi"><label>'+l+'</label><div style="font-size:15px;line-height:1.4;min-width:0;overflow-wrap:anywhere">'+body+'</div></div>';
  h+=f("Presentation need",rx(r.need||"Not stated"));
  h+=edit?'<div class="fi"><label for="rr-'+rx(r.id)+'">Reason chosen</label><textarea id="rr-'+rx(r.id)+'" data-rr="'+rx(r.id)+'" placeholder="Why this component, and not another">'+rx(r.reason)+'</textarea><p class="fhint">Edit before saving. This is what the design system team sees.</p></div>':f("Reason chosen",rx(r.reason||"Not stated"));
  if(r.rejected.length)h+=f("Considered and not used",'<ul style="margin:0;padding-left:18px;display:grid;gap:3px">'+r.rejected.map(x=>'<li><code>'+rx(x.component)+'</code>: '+rx(x.why)+'</li>').join("")+'</ul>');
  h+=f("States to cover",rcList(r.states))+f("Accessibility",rcList(r.a11y))+f("Data it depends on",rcList(r.data));
  if(use)h+=f("On VA.gov",rnum(use.uses)+' uses in '+use.products+' products (Reference data)');
  if(r.warnings.length)h+='<div class="fi"><div class="pt-warn" style="margin:0">'+r.warnings.map(rx).join("<br>")+'</div></div>';
  h+='<div class="fi"><label>Status</label>'+(edit?'<select data-rs="'+rx(r.id)+'" aria-label="Status for '+rx(r.id)+'">'+rcOpts(RC_STATUS,r.status)+'</select>':'<div style="font-size:15px">'+rx(r.status)+'</div>')+'</div>';
  if(un)h+='<div class="fi"><label>Design system decision</label>'+(edit?'<select data-rd="'+rx(r.id)+'" aria-label="Design system decision for '+rx(r.id)+'">'+rcOpts(RC_DS,r.ds)+'</select>':'<div style="font-size:15px">'+rx(r.ds)+'</div>')+'<p class="fhint">Sent through the design system’s existing intake process. This page does not send it for you.</p></div>';
  h+='<div class="rlinks" style="padding:6px 18px 8px"><button class="tool" data-rj="'+rx(r.id)+'">Copy record JSON</button>'+(un?'<button class="tool" data-ri="'+rx(r.id)+'">Copy intake request</button>':'')+'</div></div></article>';
  return h;
}
function rcRenderDesign(){
  const c=RC.cur,m=$("#rc-main");
  if(!c){
    m.innerHTML='<section class="rcard"><h3 class="rh">Nothing checked yet</h3><div class="rb"><p class="rnote" style="padding:0">Describe a need on the left. The agent writes a spec from registered VADS components, every component is checked against the registry, and each choice becomes a record with its reason and status. Anything VADS does not cover becomes an unmet need.</p><div class="rlinks"><button class="tool" id="rc-load">Load an example</button></div></div></section>';return;
  }
  const g=c.gate,k=g.counts;let h="";
  h+='<section class="rcard"><h3 class="rh">Spec check</h3><div class="rstat"><div><b>'+k.registered+'</b><span>registered</span></div><div><b>'+k.unmet+'</b><span>unmet needs</span></div><div><b>'+k.native+'</b><span>native text and layout</span></div><div><b>'+k.warnings+'</b><span>prop warnings</span></div></div>'+
    (g.missing.length?'<p class="rnote" style="padding:0 18px 16px">'+g.missing.length+' element'+(g.missing.length>1?'s are':' is')+' not reachable from the root and was ignored.</p>':'')+'</section>';
  h+='<section class="rcard"><h3 class="rh">Spec</h3><div class="rb" style="padding:0 0 8px">'+g.rows.map(r=>{
    const cls=r.kind==="unmet"?"un":(r.kind==="native"?"nat":"ok"),pp=Object.keys(r.props).map(p=>p+"="+(typeof r.props[p]==="string"?r.props[p]:JSON.stringify(r.props[p]))).join(" · ");
    return '<div class="rc-row"><span class="rc-ind" style="--d:'+r.depth+'"></span><code class="rc-ty '+cls+'">'+rx(rcName(r.type))+'</code><span class="rc-pp">'+rx(pp.length>110?pp.slice(0,110)+"…":pp)+'</span></div>'+
      r.warnings.map(w=>'<div class="rc-row"><span class="rc-ind" style="--d:'+(r.depth+1)+'"></span><span class="rc-w">'+rx(w)+'</span></div>').join("");
  }).join("")+'</div></section>';
  h+='<div class="rtabs"><p class="rnote" style="padding:0 4px">'+(c.saved?'Saved. Change status later in the Governance view.':'Not saved yet. Review each record, then choose Save records.')+'</p></div>';
  h+=c.records.map(r=>rcRecCard(r,!c.saved)).join("");
  if(c.preview)h+='<section class="rcard"><h3 class="rh">Illustrative preview</h3><div class="rb" style="padding-top:0"><p class="rnote" style="padding:0 0 10px">A lookalike drawn from the spec. The spec and records are the source of truth, not this picture.</p><iframe title="Illustrative preview" sandbox="allow-scripts" style="width:100%;height:340px;border:0;background:#fff;border-radius:12px" srcdoc="'+rx(buildDoc({preview:c.preview}))+'"></iframe></div></section>';
  h+='<section class="rcard rcode"><h3 class="rh">Spec JSON</h3><button class="cp" data-rcopy="spec">Copy</button><pre class="rpre">'+rx(JSON.stringify(c.spec,null,2))+'</pre></section>';
  m.innerHTML=h;
}
function rcGovRows(){
  const f=RC.f,q=f.q.trim().toLowerCase();
  return rcAll().filter(r=>(!f.status||r.status===f.status)&&(!f.kind||r.kind===f.kind)&&(!q||(r.component+" "+r.need+" "+r.reason+" "+r.spec).toLowerCase().indexOf(q)>-1));
}
function rcGovBody(){
  const all=rcAll(),rows=rcGovRows(),un=all.filter(r=>r.kind==="unmet");
  const group=(list)=>{const m={};list.forEach(r=>{(m[r.component]=m[r.component]||[]).push(r)});return Object.keys(m).map(k=>({name:k,recs:m[k]})).sort((a,b)=>b.recs.length-a.recs.length)};
  let h='<section class="rcard"><h3 class="rh">Unmet needs, most requested</h3><ul class="rp-list">';
  const ug=group(un);
  h+=ug.length?ug.map(g=>{const specs=[...new Set(g.recs.map(r=>r.spec))],ds=[...new Set(g.recs.map(r=>r.ds||"Open"))];
    return '<li class="rp"><div class="rp-top"><span class="rp-name" style="cursor:default"><code>'+rx(g.name)+'</code></span><span class="rp-n">'+g.recs.length+(g.recs.length>1?' requests':' request')+'</span></div><div class="rp-meta"><span>'+specs.length+' product'+(specs.length>1?'s':'')+': '+rx(specs.join(", "))+'</span><span>Decision: '+rx(ds.join(", "))+'</span></div></li>'}).join(""):'<li class="rp"><span class="rnote" style="padding:0">No unmet needs yet.</span></li>';
  h+='</ul></section>';
  const rg=group(all.filter(r=>r.kind==="registered"));
  h+='<section class="rcard"><h3 class="rh">Components chosen</h3><ul class="rp-list">'+(rg.length?rg.map(g=>{const u=rcUsage(g.name);return '<li class="rp"><div class="rp-top"><span class="rp-name" style="cursor:default"><code>'+rx(g.name)+'</code></span><span class="rp-n">'+g.recs.length+' record'+(g.recs.length>1?'s':'')+'</span></div>'+(u?'<div class="rp-meta"><span>'+rnum(u.uses)+' uses in '+u.products+' products on VA.gov</span></div>':'')+'</li>'}).join(""):'<li class="rp"><span class="rnote" style="padding:0">No records yet.</span></li>')+'</ul></section>';
  h+='<section class="rcard"><h3 class="rh">Records<span class="pill">'+rows.length+' of '+all.length+'</span></h3><div class="tablewrap" style="padding:0 6px 10px"><table class="pt-t"><thead><tr><th>Record</th><th>Component</th><th>Need and reason</th><th>Status</th><th>Decision</th><th>Added by</th></tr></thead><tbody>'+
   (rows.length?rows.map(r=>{
     const mine=rcMine(r),un=r.kind==="unmet";
     return '<tr><td><code>'+rx(r.id)+'</code><br><span class="rnote" style="padding:0">v'+r.version+(r.sample?' · <span class="pt-flag">Sample</span>':'')+'</span></td>'+
     '<td><code>'+rx(r.component)+'</code>'+(un?'<br><span class="pt-flag">Unmet</span>':'')+'</td>'+
     '<td><b style="font-weight:600">'+rx(r.need)+'</b><br><span class="rnote" style="padding:0">'+rx(r.reason||"No reason recorded")+'</span></td>'+
     '<td>'+(mine?'<select data-gs="'+rx(r.id)+'" aria-label="Status for '+rx(r.id)+'">'+rcOpts(RC_STATUS,r.status)+'</select>':rx(r.status))+'</td>'+
     '<td>'+(un?(mine?'<select data-gd="'+rx(r.id)+'" aria-label="Decision for '+rx(r.id)+'">'+rcOpts(RC_DS,r.ds)+'</select>':rx(r.ds||"Open")):'<span class="rnote" style="padding:0">Reuse: '+rx(r.reuse)+'</span>')+'</td>'+
     '<td>'+rx(rcWho(r))+'<br><span class="rnote" style="padding:0">'+rx(rcDate(r.updated))+'</span></td></tr>'}).join(""):'<tr><td colspan="6"><span class="rnote" style="padding:0">No records match.</span></td></tr>')+
   '</tbody></table></div></section>';
  $("#rc-gov-body").innerHTML=h;
}
function rcRenderGov(){
  const all=rcAll(),un=all.filter(r=>r.kind==="unmet"),open=un.filter(r=>(r.ds||"Open")==="Open");
  const mine=all.filter(rcMine).length;
  $("#rc-main").innerHTML=
   '<section class="rcard"><h3 class="rh">Overview</h3><div class="rstat"><div><b>'+all.length+'</b><span>records</span></div><div><b>'+un.length+'</b><span>unmet needs</span></div><div><b>'+[...new Set(un.map(r=>r.component))].length+'</b><span>distinct gaps</span></div><div><b>'+open.length+'</b><span>awaiting a decision</span></div><div><b>'+mine+'</b><span>yours</span></div></div>'+
   '<p class="rnote" style="padding:0 18px 16px">'+(db?'Records you save are visible to everyone with access to this page. You can change the status and decision on your own records.':'You are not signed in to claude.ai, so saved records stay in this browser.')+' Records marked Sample are examples.</p></section>'+
   '<div class="inset"><div class="fi"><label for="rc-fs">Status</label><select id="rc-fs"><option value="">All statuses</option>'+rcOpts(RC_STATUS,RC.f.status)+'</select></div><div class="fi"><label for="rc-fk">Kind</label><select id="rc-fk"><option value="">Registered and unmet</option><option value="registered"'+(RC.f.kind==="registered"?" selected":"")+'>Registered</option><option value="unmet"'+(RC.f.kind==="unmet"?" selected":"")+'>Unmet needs</option></select></div><div class="fi"><label for="rc-fq">Search</label><input id="rc-fq" type="search" value="'+rx(RC.f.q)+'" placeholder="Component, need, or product"></div></div>'+
   '<div id="rc-gov-body" style="display:grid;gap:16px;min-width:0"></div>';
  rcGovBody();
}
function rcIntake(r){
  return "Design system intake: unmet presentation need\n\nRequested component: "+r.component+"\nNeed: "+r.need+"\nWhy no registered component fits: "+(r.reason||"Not stated")+
   "\nClosest registered options considered: "+(r.rejected.length?r.rejected.map(x=>x.component+" ("+x.why+")").join("; "):"None listed")+
   "\nStates to cover: "+(r.states.join(", ")||"Not stated")+"\nAccessibility: "+(r.a11y.join("; ")||"Not stated")+"\nData it depends on: "+(r.data.join("; ")||"Not stated")+
   "\nRecord: "+r.id+" v"+r.version+" ("+r.spec+")";
}
function rcWire(){
  if(RC.wired)return;RC.wired=true;
  $("#tab-rec").onclick=()=>setTab("rec");
  document.querySelectorAll("[data-rcp]").forEach(c=>c.onclick=()=>{$("#rc-prompt").value=c.dataset.rcp;$("#rc-prompt").focus()});
  $("#rc-gen").onclick=()=>rcRun($("#rc-prompt").value);
  $("#rc-prompt").addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey))rcRun($("#rc-prompt").value)});
  $("#rc-stop").onclick=()=>RC.ctl&&RC.ctl.abort();
  $("#rc-save").onclick=rcSave;
  $("#rc-copy").onclick=()=>rCopy(JSON.stringify(RC.mode==="gov"?rcAll().filter(r=>!r.sample):(RC.cur?RC.cur.records:[]),null,2));
  document.querySelectorAll("#rc-mode button").forEach(b=>b.onclick=()=>{RC.mode=b.dataset.rcm;rcRender()});
  const m=$("#rc-main");
  const find=id=>(RC.cur?RC.cur.records:[]).find(r=>r.id===id)||rcAll().find(r=>r.id===id);
  m.addEventListener("click",e=>{
    const t=e.target.closest("button");if(!t)return;
    if(t.id==="rc-load"){RC.cur=rcBuild(RC_EXAMPLE,RC_EXAMPLE.need);RC.mode="design";rcStatus("Loaded the example. It includes one unmet need.");rcRender();return}
    if(t.dataset.rcopy==="spec"&&RC.cur){rCopy(JSON.stringify(RC.cur.spec,null,2));return}
    if(t.dataset.rj){const r=find(t.dataset.rj);if(r)rCopy(JSON.stringify(r,null,2));return}
    if(t.dataset.ri){const r=find(t.dataset.ri);if(r)rCopy(rcIntake(r));return}
  });
  m.addEventListener("input",e=>{
    const t=e.target;
    if(t.dataset&&t.dataset.rr&&RC.cur){const r=RC.cur.records.find(x=>x.id===t.dataset.rr);if(r)r.reason=t.value}
    if(t.id==="rc-fq"){RC.f.q=t.value;rcGovBody()}
  });
  m.addEventListener("change",e=>{
    const t=e.target,d=t.dataset||{};
    if(d.rs&&RC.cur){const r=RC.cur.records.find(x=>x.id===d.rs);if(r){r.status=t.value;r.history=[{at:Date.now(),status:t.value}]}}
    if(d.rd&&RC.cur){const r=RC.cur.records.find(x=>x.id===d.rd);if(r)r.ds=t.value}
    if(d.gs)rcPatch(d.gs,{status:t.value},"Status set to "+t.value);
    if(d.gd)rcPatch(d.gd,{ds:t.value},"Decision set to "+t.value);
    if(t.id==="rc-fs"){RC.f.status=t.value;rcGovBody()}
    if(t.id==="rc-fk"){RC.f.kind=t.value;rcGovBody()}
  });
}
const RC_EXAMPLE={title:"Claim status summary",need:"A Veteran wants to know where their claim stands and what happens next.",summary:"An alert states the current status, a process list shows the next steps, and a link goes to claim details. A timeline would help but VADS has no component for it.",
 spec:{root:"root",elements:{
  root:{type:"section",props:{},children:["h","alert","steps","timeline","link"]},
  h:{type:"h2",props:{text:"Your claim status"},children:[]},
  alert:{type:"va-alert",props:{status:"info",slim:true,visible:true},children:["alert-t"]},
  "alert-t":{type:"p",props:{text:"We’re gathering evidence for your claim."},children:[]},
  steps:{type:"va-process-list",props:{},children:["s1","s2","s3"]},
  s1:{type:"va-process-list-item",props:{header:"Claim received",checkmark:true},children:[]},
  s2:{type:"va-process-list-item",props:{header:"Evidence gathering",active:true},children:[]},
  s3:{type:"va-process-list-item",props:{header:"Decision",pending:true},children:[]},
  timeline:{type:"unmet:claim-timeline-scrubber",props:{purpose:"Show each status change on a time-scaled timeline"},children:[]},
  link:{type:"va-link",props:{href:"/track-claims",text:"Review claim details",active:true},children:[]}}},
 uses:[
  {element:"alert",need:"Tell the Veteran the current status without taking over the page",reason:"A status message that matters but is not an error uses a slim info va-alert, which announces itself to screen readers.",rejected:[{component:"va-summary-box",why:"Meant for key points, not a status change."}],states:["info","success","error"],a11y:["Announced as a status message","Does not rely on color alone"],data:["Current claim status from the claims API"]},
  {element:"steps",need:"Show what has happened and what comes next",reason:"The documented component for an ordered sequence of steps with a current step.",rejected:[{component:"va-accordion",why:"Hides the sequence behind clicks."}],states:["complete","active","pending"],a11y:["Current step is exposed to assistive technology"],data:["Claim phase and dates from the claims API"]},
  {element:"s1",need:"Mark a finished step",reason:"Checkmark variant of va-process-list-item.",rejected:[],states:["complete"],a11y:[],data:[]},
  {element:"s2",need:"Mark the current step",reason:"Active variant of va-process-list-item.",rejected:[],states:["active"],a11y:[],data:[]},
  {element:"s3",need:"Mark an upcoming step",reason:"Pending variant of va-process-list-item.",rejected:[],states:["pending"],a11y:[],data:[]},
  {element:"timeline",need:"Show every status change on a time-scaled timeline so the Veteran sees how long each stage took",reason:"No registered component shows time. va-process-list is sequential and has no dates or spacing.",rejected:[{component:"va-process-list",why:"Sequential only, no dates."},{component:"va-accordion",why:"Hides history instead of showing it."}],states:["empty","loading","many events"],a11y:["Needs a text equivalent for every event","Keyboard operable if interactive"],data:["Status history with dates from the claims API"]},
  {element:"link",need:"Take the Veteran to full claim details",reason:"Active va-link for a primary navigation to a related page.",rejected:[{component:"va-button",why:"A button is for actions, not navigation."}],states:["default","focus"],a11y:["Link text names the destination"],data:[]}],
 preview:{html:'<section class="rc-p"><h2>Your claim status</h2><div class="rc-a"><p>We’re gathering evidence for your claim.</p></div><ol class="rc-s"><li class="d">Claim received</li><li class="n">Evidence gathering</li><li>Decision</li></ol><p class="rc-u">Timeline: no registered component yet</p><a href="#">Review claim details</a></section>',
  css:'.rc-p{width:min(100%,420px);display:grid;gap:14px}.rc-p h2{margin:0;font-size:1.5rem}.rc-a{border-left:8px solid var(--vads-color-info);background:var(--vads-color-info-lighter);padding:10px 14px}.rc-a p{margin:0}.rc-s{margin:0;padding-left:20px;display:grid;gap:6px}.rc-s .d{color:var(--vads-color-success)}.rc-s .n{font-weight:700}.rc-u{margin:0;padding:10px 12px;border:1px dashed var(--vads-color-gray-medium);color:var(--vads-color-base);font-size:.875rem}.rc-p a{color:var(--vads-color-primary);font-weight:700}',js:""}};

rcWire();

/* =====================================================================
   STUDY LAYER
   One study record that the design half (Components, Forms, Prototype)
   and the research half (Research Assistant steps) both read and write.
   Working copies stay in this browser; the study record lives in the
   artifact database so versions, reviews, sessions, findings, the
   decisions log and notifications are kept and shared.
   ===================================================================== */
(function(){
"use strict";
const RA_KEY="va-research-assistant-v1";
const LS=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){return null}};
const now=()=>Date.now();
const cid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const clone=o=>o==null?o:JSON.parse(JSON.stringify(o));
const fmtD=t=>t?new Date(t).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"}):"";
const fmtDT=t=>t?new Date(t).toLocaleString(undefined,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):"";
const hq=s=>{let h=5381;s=String(s||"").trim().replace(/\s+/g," ").toLowerCase();for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return "q"+(h>>>0).toString(36)};
const NEED="[NEEDS INPUT]";
const PT_DEF={type:"page",name:"",team:"",creator:"",viewport:"mobile",problem:"",research:"",figma:"",url:"",pages:[],deps:{},qs:{},manual:[],mode:"review",snap:"",mobile:true};
const MAXDOC=250000;

const CS={library:[],ptab:"pages",on:false,ready:false,role:LS("cs-role")==="engineer"?"engineer":"designer",studies:[],versions:[],reviews:[],notes:[],sessions:[],
  sid:LS("cs-active")||null,lastD:"",lastR:"",live:null,viewV:null,dec:null,selSession:null,sugg:null,busy:false,ctl:null,tab:"study",syncing:false,sizeWarn:{},newOpen:false,fuOpen:false,lastTouch:0};
window.CS=CS;
const ST=()=>CS.studies.find(s=>s.id===CS.sid)||null;
const studyById=id=>CS.studies.find(s=>s.id===id)||null;
const myVersions=sid=>CS.versions.filter(v=>v.sid===sid).sort((a,b)=>(b.n||0)-(a.n||0));
const latestV=sid=>myVersions(sid)[0]||null;
const reviewOf=v=>v?CS.reviews.find(r=>r.id===v.sid+"__v"+v.n)||null:null;
const mySessions=sid=>CS.sessions.filter(s=>s.sid===sid).sort((a,b)=>(a.at||0)-(b.at||0));

/* ---------- research state (the Research Assistant's working copy) ---------- */
function raGet(){try{return JSON.parse(LS(RA_KEY)||"null")}catch(e){return null}}
function raSet(o){LS(RA_KEY,JSON.stringify(o));raReload()}
function raReload(){const f=document.getElementById("cs-ra");if(f&&f.dataset.loaded){f.dataset.loaded="";loadRA(f.dataset.hash||"")}}
function plan(){const s=raGet();return (s&&s.plan)||{}}
function goals(){const p=plan();return [p.goal1,p.goal2,p.goal3].map((g,i)=>({id:"G"+(i+1),n:i+1,text:String(g||"").trim()})).filter(g=>g.text)}
function rqs(){const p=plan();return (Array.isArray(p.rq)?p.rq:[]).map(t=>String(t||"").trim()).filter(Boolean).map((t,i)=>({id:hq(t),n:i+1,text:t}))}
function linkOptions(){
  const st=ST(),qm=(st&&st.qmap)||{};
  return goals().map(g=>({id:g.id,label:"Goal "+g.n+": "+g.text})).concat(rqs().map(q=>({id:"Q:"+q.id,label:"Question "+q.n+": "+q.text,goal:(qm[q.id]||{}).goal||""})));
}
function linkLabel(id){const o=linkOptions().find(x=>x.id===id);return o?o.label:(id?"A goal or question that has changed in the plan":"Not linked")}

/* ---------- design state ---------- */
function designStr(){return JSON.stringify({pt:PT,fm:FS.m,fa:FS.ans})}
function setPT(src){Object.keys(PT).forEach(k=>delete PT[k]);Object.assign(PT,clone(PT_DEF),clone(src||{}));
  if(!Array.isArray(PT.pages))PT.pages=[];if(!Array.isArray(PT.manual))PT.manual=[];if(!PT.deps||typeof PT.deps!=="object")PT.deps={};if(!PT.qs||typeof PT.qs!=="object")PT.qs={}}
function applyDesign(json){
  let o=null;try{o=json?JSON.parse(json):null}catch(e){o=null}
  setPT(o&&o.pt);
  FS.m=o&&o.fm&&Array.isArray(o.fm.chapters)&&o.fm.chapters.length?o.fm:blankForm();
  FS.ans=(o&&o.fa)||{};FS.sel="intro";FS.step="intro";FS.hist=[];
  try{$("#f-undo").disabled=true}catch(e){}
  _ptSave();try{localStorage.setItem(DRAFT_KEY,JSON.stringify({m:FS.m,ans:FS.ans}))}catch(e){}
}
function applyResearch(json){if(json)LS(RA_KEY,json);else LS(RA_KEY,null);raReload()}

/* Saving is paused while an engineer looks at a submitted version, so the designer's draft is never overwritten. */
const _ptSave=ptSave;
ptSave=function(){if(window.__csLock)return;_ptSave()};
const _saveDraft=saveDraft;
saveDraft=function(){if(window.__csLock)return;_saveDraft()};

/* ---------- database helpers ---------- */
function entry(who,what,why,source,ref){return {id:cid("d"),at:now(),who,what,why:why||"",source:source||"",ref:ref||""}}
async function patchStudy(id,fields){fields.updatedAt=now();const st=studyById(id);if(st)Object.assign(st,clone(fields));await db.doc("studies/"+id).update(fields)}
async function addLog(st,who,what,why,source,ref){
  const log=clone(st.log||[]);log.push(entry(who,what,why,source,ref));
  await patchStudy(st.id,{log});
}
async function addNote(n){try{await db.collection("notes").add(Object.assign({at:now(),read:false},n))}catch(e){}}
function fail(e,msg){console.error(e);toast(msg||"That didn’t save. You may need edit access to this page.")}

async function sync(){
  if(!CS.on||!CS.sid||window.__csLock||CS.syncing)return;
  CS.syncing=true;
  try{
    const d=designStr();
    if(d!==CS.lastD){
      if(d.length>MAXDOC){if(!CS.sizeWarn.d){CS.sizeWarn.d=1;toast("The prototype is too large to save to the study. Remove some pages or fields.")}}
      else{await db.doc("design/"+CS.sid).set({json:d,at:now()});CS.lastD=d;touch()}
    }
    const r=LS(RA_KEY)||"";
    if(r!==CS.lastR){
      if(r.length>MAXDOC){if(!CS.sizeWarn.r){CS.sizeWarn.r=1;toast("The research draft is too large to save to the study. Unpin some evidence.")}}
      else{await db.doc("research/"+CS.sid).set({json:r,at:now()});CS.lastR=r;touch()}
    }
  }catch(e){if(!CS.sizeWarn.e){CS.sizeWarn.e=1;console.error(e);toast("Couldn’t save the study just now. It will keep trying.")}}
  finally{CS.syncing=false}
}
function touch(){if(now()-CS.lastTouch<30000)return;CS.lastTouch=now();patchStudy(CS.sid,{}).catch(()=>{})}

function watch(){
  const sub=(name,key,sort)=>{try{db.collection(name).onSnapshot(snap=>{
      CS[key]=snap.docs.map(d=>Object.assign({id:d.id},d.data()));if(sort)CS[key].sort(sort);refresh(key);
    },e=>console.error(name,e))}catch(e){console.error(e)}};
  sub("studies","studies",(a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
  sub("versions","versions");sub("reviews","reviews");sub("library","library",(a,b)=>(b.at||0)-(a.at||0));sub("notes","notes",(a,b)=>(b.at||0)-(a.at||0));sub("sessions","sessions");
}

/* ---------- opening, creating and following up studies ---------- */
async function openStudy(sid,{boot=false}={}){
  if(CS.sid&&CS.sid!==sid)await sync();
  if(CS.live)restoreLive();
  const keepLocal=boot&&LS("cs-local-sid")===sid;
  if(!keepLocal){
    try{
      const [d,r]=await Promise.all([db.doc("design/"+sid).get(),db.doc("research/"+sid).get()]);
      applyDesign(d.exists?d.data().json:null);applyResearch(r.exists?r.data().json:null);
    }catch(e){fail(e,"Couldn’t open that study. Try again.");return}
  }
  CS.sid=sid;LS("cs-active",sid);LS("cs-local-sid",sid);
  CS.lastD=keepLocal?"":designStr();CS.lastR=keepLocal?"":(LS(RA_KEY)||"");
  CS.selSession=null;CS.sugg=null;CS.newOpen=false;CS.fuOpen=false;
  rerenderCurrent();
}
function blankResearch(name,product){return JSON.stringify({tab:"scan",plan:{title:name?"Research plan for "+name:"",product:product||"",rq:[""],roles:{}}})}
async function createStudy(name,product,parent,reason){
  if(!CS.on){toast("Studies save when this page is opened in Claude while you’re signed in.");return}
  const id=cid("st"),t=now(),first=!CS.studies.length;
  let dj,rj;
  if(parent){
    const lv=latestV(parent.id);
    if(lv)dj=JSON.stringify({pt:lv.pt,fm:lv.fm,fa:lv.fa||{}});
    else{try{const d=await db.doc("design/"+parent.id).get();dj=d.exists?d.data().json:null}catch(e){dj=null}}
    let pr=null;try{const r=await db.doc("research/"+parent.id).get();pr=r.exists?JSON.parse(r.data().json||"null"):null}catch(e){pr=null}
    const p=clone((pr&&pr.plan)||{});p.title=name?"Research plan for "+name:p.title;
    rj=JSON.stringify({tab:"scan",plan:p,guide:clone((pr&&pr.guide)||{sections:[],tmpl:""}),pins:clone((pr&&pr.pins)||[])});
  }else if(first){
    await sync();dj=designStr();rj=LS(RA_KEY)||blankResearch(name,product);
  }else{
    dj=JSON.stringify({pt:PT_DEF,fm:exampleForm(),fa:{}});rj=blankResearch(name,product);
  }
  const log=[entry("Designer",parent?"Started as a follow-up to “"+parent.name+"”":"Started the study",reason||"",parent?"Follow-up":"Study",parent?parent.id:"")];
  try{
    await db.doc("studies/"+id).set({name:name||"Untitled study",product:product||"",parentId:parent?parent.id:null,createdAt:t,updatedAt:t,qmap:{},recruit:null,findings:[],log,stake:null,owner:uid||null});
    await db.doc("design/"+id).set({json:dj||JSON.stringify({pt:PT_DEF,fm:exampleForm(),fa:{}}),at:t});
    await db.doc("research/"+id).set({json:rj,at:t});
    if(parent)await addLog(parent,"Designer","Started follow-up study “"+(name||"Untitled study")+"”",reason||"","Follow-up",id);
  }catch(e){fail(e);return}
  if(!CS.studies.some(s=>s.id===id))CS.studies.unshift({id,name:name||"Untitled study",product:product||"",parentId:parent?parent.id:null,createdAt:t,updatedAt:t,qmap:{},findings:[],log});
  await openStudy(id);
  if(!window.__implicit)toast(parent?"Follow-up study started":"Study created");
  setTab("pages");
}

/* ---------- prototype versions and engineer review ---------- */
async function submitVersion(note){
  const st=ST();if(!st){toast("Create or open a study first.");return}
  await sync();
  const n=1+Math.max(0,...myVersions(st.id).map(v=>v.n||0));
  const v={sid:st.id,n,title:ptTitle(),pt:clone(PT),fm:clone(FS.m),fa:clone(FS.ans),note:note||"",at:now(),status:"pending"};
  if(JSON.stringify(v).length>MAXDOC){toast("This prototype is too large to save as a version.");return}
  try{
    await db.doc("versions/"+st.id+"__v"+n).set(v);
    await addLog(st,"Designer","Sent prototype v"+n+" to engineering for review",note,"Prototype","v"+n);
    await addNote({sid:st.id,to:"engineer",kind:"submitted",title:st.name+": prototype v"+n+" is ready for review",body:note||"",ref:"v"+n});
    toast("Version "+n+" sent for engineer review");
  }catch(e){fail(e)}
}
function engItems(){
  const out=[],idx={};
  const add=(key,label,detail)=>{if(idx[key]){if(detail&&idx[key].detail.indexOf(detail)<0)idx[key].detail+="; "+detail;return}idx[key]={key,label,detail:detail||""};out.push(idx[key])};
  ptDepRows().forEach(r=>{
    if(r.src!=="api"&&r.src!=="prefill")return;
    const s=String(r.sys||"").trim();
    if(s)add("sys:"+s.toLowerCase(),s,(r.src==="prefill"?"Prefills ":"Supplies ")+"“"+r.label+"”");
    else add("nosys:"+r.key,"Unnamed source for “"+r.label+"”",PT_SRC_LABEL[r.src]+". The designer hasn’t named the system.");
  });
  if(ptUsesForm()){const s=String((PT.deps.__submit||{}).sys||"").trim();add("submit","Submission: "+(s||"destination not named"),"Where the completed form goes")}
  ptInventory().filter(e=>e.kind==="Custom").forEach(e=>add("custom:"+e.key,"Custom component: "+e.key.replace(/^custom: /,""),e.note||"No reason given yet."));
  const eng=ptAutoQuestions().find(q=>q.key==="engine");if(eng)add("engine","Field types the form engine doesn’t support yet",eng.text);
  if(!out.length)add("none","No outside systems","The prototype names no data source or destination.");
  return out;
}
function loadVersion(id){
  const v=CS.versions.find(x=>x.id===id);if(!v)return;
  if(!CS.live)CS.live={pt:clone(PT),fm:clone(FS.m),fa:clone(FS.ans)};
  window.__csLock=true;
  setPT(v.pt);PT.mode="review";FS.m=clone(v.fm);FS.ans=clone(v.fa||{});
  CS.viewV=v;
  const rv=reviewOf(v);
  CS.dec={vid:v.id,items:rv?clone(rv.items||{}):{},decision:rv?rv.decision:"",summary:rv?rv.summary||"":"",edit:!rv};
  if(rv&&rv.qa){if(rv.qa.qs)PT.qs=clone(rv.qa.qs);if(Array.isArray(rv.qa.manual))PT.manual=clone(rv.qa.manual)}
  ptRender();window.scrollTo({top:0});
}
function restoreLive(){
  if(!CS.live){window.__csLock=false;return}
  setPT(CS.live.pt);FS.m=CS.live.fm;FS.ans=CS.live.fa;CS.live=null;CS.viewV=null;CS.dec=null;window.__csLock=false;
}
async function submitDecision(){
  const v=CS.viewV,d=CS.dec;if(!v||!d)return;
  if(d.decision!=="go"&&d.decision!=="nogo"){toast("Choose Go or No-go first.");return}
  if(d.decision==="nogo"&&!String(d.summary||"").trim()){toast("Say what has to change before this can be tested.");$("#cs-dsum")&&$("#cs-dsum").focus();return}
  const st=studyById(v.sid);if(!st){toast("That study isn’t available.");return}
  const items=engItems(),open=items.filter(i=>!(d.items[i.key]||{}).st).length;
  const qa={qs:clone(PT.qs),manual:clone(PT.manual)};
  const answered=ptQuestions().filter(q=>q.note||q.done).length;
  const go=d.decision==="go";
  try{
    await db.doc("reviews/"+v.sid+"__v"+v.n).set({sid:v.sid,n:v.n,decision:d.decision,items:d.items,itemList:items,summary:d.summary||"",qa,answered,at:now(),by:uid||null});
    await db.doc("versions/"+v.id).update({status:d.decision,decidedAt:now()});
    await addLog(st,"Engineer",(go?"Go":"No-go")+" on prototype v"+v.n+(open?" ("+open+" item"+(open===1?"":"s")+" not marked)":""),d.summary||"","Engineer review","v"+v.n);
    await addNote({sid:v.sid,to:"designer",kind:"decision",title:st.name+": engineering said "+(go?"Go":"No-go")+" on v"+v.n,body:(d.summary||"")+(answered?" "+answered+" question"+(answered===1?"":"s")+" answered.":""),ref:"v"+v.n});
    d.edit=false;toast("Decision sent to the designer");engSide();
  }catch(e){fail(e)}
}
async function applyAnswers(rid){
  const rv=CS.reviews.find(r=>r.id===rid);if(!rv||!rv.qa)return;
  if(CS.live){toast("Switch to the Designer view first.");return}
  Object.keys(rv.qa.qs||{}).forEach(k=>{const s=rv.qa.qs[k]||{};if(s.note||s.done){PT.qs[k]=Object.assign({},PT.qs[k]||{},{note:s.note||"",done:!!s.done})}});
  (rv.qa.manual||[]).forEach(m=>{const cur=PT.manual.find(x=>x.id===m.id);if(cur){cur.note=m.note||cur.note;cur.done=!!m.done}else PT.manual.push(clone(m))});
  ptSave();
  const st=ST();if(st)try{await addLog(st,"Designer","Added engineering’s answers from v"+rv.n+" to the prototype","","Engineer review","v"+rv.n)}catch(e){}
  toast("Answers added to your prototype’s open questions");renderStudy();
}

/* ---------- transcripts to findings ---------- */
function normMap(s){let out="",map=[],sp=false;
  for(let i=0;i<s.length;i++){let c=s[i];
    if(/[\s ]/.test(c)){if(!sp&&out.length){out+=" ";map.push(i)}sp=true;continue}
    sp=false;c=c.replace(/[‘’‛′]/g,"'").replace(/[“”‟″]/g,'"').replace(/[–—]/g,"-").replace(/…/g,"...").toLowerCase();
    for(const ch of c){out+=ch;map.push(i)}}
  return {s:out,map}}
function normQ(q){return normMap(String(q||"").trim().replace(/^["'“”‘’\s]+|["'“”‘’\s]+$/g,"")).s.trim()}
const TSRE=/(?:^|[\s\[(])(\d{1,2}:\d{2}(?::\d{2})?)(?=[\s\])\-–,.]|$)/g;
function verifyQuote(transcript,quote){
  const T=normMap(transcript),q=normQ(quote);
  if(q.length<8)return null;
  const at=T.s.indexOf(q);if(at<0)return null;
  const raw=T.map[at]||0;
  let ts="",m;TSRE.lastIndex=0;
  const head=transcript.slice(0,raw+1);
  while((m=TSRE.exec(head)))ts=m[1];
  return {raw,ts};
}
function piiHit(s){return /[\w.+-]+@[\w-]+\.[\w.]+/.test(s)||/\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/.test(s)||/\b\d{3}-\d{2}-\d{4}\b/.test(s)}
function findPrompt(sess){
  const G=goals(),Q=rqs(),st=ST(),qm=(st&&st.qmap)||{};
  const pages=(CS.live?[]:ptAllPages()).map(p=>p.title).slice(0,30);
  return "You help a VA.gov researcher pull early findings from ONE usability session transcript.\n\n"+
  "RULES\n- Use only what the transcript says. Never invent, combine participants, or guess at what someone meant.\n"+
  "- Each finding is one observation that answers exactly one research goal or research question listed below. Put its id in \"link\".\n"+
  "- \"quote\" must be copied character for character from the transcript: the participant’s own words, 1 to 3 sentences, no edits, no ellipses, no moderator speech.\n"+
  "- Skip anything that doesn’t bear on a goal or question. If nothing does, return an empty list.\n"+
  "- At most 10 findings. \"statement\" is plain language, under 30 words, says what the participant did, said or struggled with. It is not a recommendation.\n"+
  "- Never put names, emails, phone numbers, ID numbers or health details in a statement.\n"+
  "- \"screen\" is the prototype screen the finding is about, copied from the list below, or \"\" if unclear.\n"+
  "- \"strength\": \"clear\" when the participant says or does it plainly, \"tentative\" when it is a hint.\n\n"+
  "Reply with ONLY one JSON object: {\"findings\":[{\"statement\":\"...\",\"quote\":\"...\",\"link\":\"G1\",\"screen\":\"\",\"strength\":\"clear\"}]}\n\n"+
  "RESEARCH GOALS\n"+(G.length?G.map(g=>g.id+": "+g.text).join("\n"):"(none written yet)")+"\n\n"+
  "RESEARCH QUESTIONS\n"+(Q.length?Q.map(q=>"Q:"+q.id+": "+q.text+((qm[q.id]||{}).goal?" (serves "+qm[q.id].goal+")":"")).join("\n"):"(none written yet)")+"\n\n"+
  "PROTOTYPE SCREENS\n"+(pages.length?pages.join("\n"):"(not listed)")+"\n\n"+
  "TRANSCRIPT (participant "+(sess.participant||"unknown")+")\n<<<\n"+sess.transcript+"\n>>>";
}
async function suggestFindings(){
  const sess=CS.sessions.find(s=>s.id===CS.selSession);if(!sess)return;
  if(!sample){toast("Suggesting findings works when this page is opened in Claude.");return}
  if(!goals().length&&!rqs().length){toast("Write at least one research goal or question in the plan first.");return}
  CS.busy=true;CS.ctl=new AbortController();CS.sugg={sid:sess.id,items:[],dropped:0,status:"Reading the transcript…"};renderTesting();
  try{
    const out=await sample.json(findPrompt(sess),{signal:CS.ctl.signal,cache:false,onText:({text:t})=>{if(CS.sugg){CS.sugg.status="Writing suggestions… "+(t.length/1000).toFixed(1)+"k characters";const s=$("#cs-sstat");if(s)s.textContent=CS.sugg.status}}});
    const list=(out&&Array.isArray(out.findings)?out.findings:[]).slice(0,12);
    const ids=new Set(linkOptions().map(o=>o.id));
    let dropped=0;const items=[];
    list.forEach(f=>{
      const quote=String(f&&f.quote||"").trim(),ver=verifyQuote(sess.transcript,quote);
      if(!ver){dropped++;return}
      let link=String(f.link||"");if(/^q[0-9a-z]+$/.test(link))link="Q:"+link;if(!ids.has(link))link="";
      items.push({id:cid("s"),statement:String(f.statement||"").trim(),quote,ts:ver.ts,link,screen:String(f.screen||""),strength:f.strength==="tentative"?"tentative":"clear",state:"open"});
    });
    CS.sugg={sid:sess.id,items,dropped,status:items.length?"":(dropped?"":"No findings tied to your goals or questions in this transcript.")};
  }catch(e){
    const c=e&&e.code;CS.sugg={sid:sess.id,items:[],dropped:0,status:c==="cancelled"?"Stopped.":(ERR[c]||"Something went wrong reaching Claude. Try again."),err:c!=="cancelled"};
    if(c==="not_granted"||c==="sampling_disabled")sample=null;
  }finally{CS.busy=false;renderTesting()}
}
async function acceptFinding(it,sess){
  const st=ST();if(!st)return;
  if(!it.link){toast("Link the finding to a goal or question first.");return}
  if(!String(it.statement||"").trim()){toast("Write the finding first.");return}
  const f={id:cid("f"),sessionId:sess.id,participant:sess.participant||"",date:sess.date||"",statement:it.statement.trim(),quote:it.quote,ts:it.ts||"",link:it.link,screen:it.screen||"",strength:it.strength||"",at:now(),manual:!!it.manual};
  const findings=clone(st.findings||[]);findings.push(f);
  try{await patchStudy(st.id,{findings})}catch(e){fail(e);return}
  /* Hand the finding to the Research Assistant's early findings, so the final report can include it. */
  const s=raGet()||{};s.early=s.early||{items:[],hyp:{}};s.early.items=s.early.items||[];
  s.early.items.push({id:f.id,kind:"Observation",statement:f.statement,quote:f.quote,parts:f.participant,ts:f.ts,date:f.date,notes:"Transcript for session "+(f.participant||"")+" in the study record",include:true,strength:it.strength==="tentative"?"Single observation":"",link:f.link,linkText:linkLabel(f.link)});
  raSet(s);
  it.state="accepted";toast("Finding added. It’s also in Research › Findings.");
}

/* ---------- recruitment ---------- */
function recPrompt(){
  const p=plan(),G=goals(),Q=rqs(),st=ST();
  const f=(l,v)=>l+": "+((v||"").trim()||NEED);
  return "You draft recruitment materials for a VA.gov usability study. Perigean recruits the participants. The researcher will review and send everything; you never send anything.\n\n"+
  "RULES\n- Use only the plan details below. Where something is missing, write "+NEED+" with what is needed, never a guess.\n"+
  "- Screener questions turn each criterion into a question with answer choices and a clear qualifying answer. Ask about experience and situation, not identity, unless a criterion asks for it.\n"+
  "- Never ask for names, contact details, Social Security numbers, health conditions or other personal details in the screener.\n"+
  "- Preferred traits are short labels a recruiter can scan (for example: lives in a rural area, uses a screen reader, has filed a claim online in the last year). Split into required and nice to have, taken from the primary and secondary criteria.\n"+
  "- The email is to the Perigean recruiting team, plain and short: study name, what the sessions are, how many participants and completed sessions, dates, session length, the traits, and the screener. Sign it with "+NEED+" for the researcher’s name.\n"+
  "- Plain language. Sentence case.\n\n"+
  "Reply with ONLY one JSON object: {\"screener\":[{\"question\":\"...\",\"answers\":[\"...\"],\"qualifies\":\"which answers qualify\",\"from\":\"the criterion it comes from\"}],\"traits\":{\"required\":[\"...\"],\"preferred\":[\"...\"]},\"email\":{\"subject\":\"...\",\"body\":\"...\"}}\n\n"+
  "PLAN\n"+[f("Study",(st&&st.name)||p.title),f("Product",p.product),f("Problem",p.bg_problem),
    "Goals: "+(G.length?G.map(g=>"("+g.n+") "+g.text).join(" "):NEED),"Research questions: "+(Q.length?Q.map(q=>"("+q.n+") "+q.text).join(" "):NEED),
    f("Method",p.method),f("Location",p.location),f("Recruitment approach",p.recruit),f("Primary criteria",p.crit_p),f("Secondary criteria",p.crit_s),
    f("Veterans",p.n_vets),f("Caregivers",p.n_cg),f("Dependents",p.n_dep),f("Total participants to request",p.n_total),f("Ideal completed sessions",p.n_ideal),
    f("Planned dates",p.dates),f("Session length",p.len),f("Availability (Eastern)",p.avail)].join("\n");
}
function screenerText(o){return (o.screener||[]).map((q,i)=>(i+1)+". "+q.question+"\n"+(q.answers||[]).map(a=>"   - "+a).join("\n")+"\n   Qualifies: "+(q.qualifies||NEED)+(q.from?"\n   From: "+q.from:"")).join("\n\n")}
function traitsText(o){const t=o.traits||{};return "Required:\n"+((t.required||[]).map(x=>"- "+x).join("\n")||"- "+NEED)+"\n\nNice to have:\n"+((t.preferred||[]).map(x=>"- "+x).join("\n")||"- (none)")}
async function draftRecruit(){
  const st=ST();if(!st)return;
  if(!sample){toast("Drafting works when this page is opened in Claude.");return}
  CS.busy=true;CS.recStatus="Drafting. This usually takes 20 to 40 seconds.";renderTesting();
  try{
    const o=await sample.json(recPrompt(),{cache:false,onText:({text:t})=>{const s=$("#cs-rstat");if(s)s.textContent="Writing… "+(t.length/1000).toFixed(1)+"k characters"}});
    const rec={screener:screenerText(o),traits:traitsText(o),subject:String(o&&o.email&&o.email.subject||""),body:String(o&&o.email&&o.email.body||""),at:now()};
    await patchStudy(st.id,{recruit:rec});
    await addLog(st,"Designer","Drafted the screener, tester traits and Perigean email","","Recruitment");
    CS.recStatus="Drafted. Edit anything, then copy the email or open it in your mail app.";
  }catch(e){const c=e&&e.code;CS.recStatus=ERR[c]||"Something went wrong reaching Claude. Try again.";if(c==="not_granted"||c==="sampling_disabled")sample=null}
  finally{CS.busy=false;renderTesting()}
}

/* ---------- early findings report ---------- */
function earlyMd(){
  const st=ST();if(!st)return "";
  const p=plan(),F=st.findings||[],G=goals(),Q=rqs(),qm=st.qmap||{},sess=mySessions(st.id),v=latestV(st.id),rv=reviewOf(v);
  const L=[];
  L.push("# Early findings: "+((p.title||"").trim()||st.name),"");
  L.push("- **Study:** "+st.name+(st.product?" ("+st.product+")":""));
  if(v)L.push("- **Prototype tested:** v"+v.n+(rv?" (engineering: "+(rv.decision==="go"?"Go":"No-go")+")":" (engineer review pending)"));
  L.push("- **Sessions:** "+sess.length+(sess.length?" ("+sess.map(s=>s.participant||"?").join(", ")+")":""));
  L.push("- **Findings so far:** "+F.length,"- **Status:** Early findings. These are preliminary and can change as sessions finish.","");
  const fLine=f=>"- **"+f.statement+"** "+[f.participant,f.ts].filter(Boolean).join(", ")+(f.screen?" · Screen: "+f.screen:"")+"\n  > “"+f.quote+"”";
  const used=new Set();
  G.forEach(g=>{
    L.push("## Goal "+g.n+": "+g.text,"");
    const direct=F.filter(f=>f.link===g.id);direct.forEach(f=>{used.add(f.id);L.push(fLine(f))});
    Q.filter(q=>(qm[q.id]||{}).goal===g.id).forEach(q=>{
      const qf=F.filter(f=>f.link==="Q:"+q.id);
      L.push("","### Research question "+q.n+": "+q.text,"");
      if(qf.length)qf.forEach(f=>{used.add(f.id);L.push(fLine(f))});else L.push("- No findings yet.");
    });
    if(!direct.length&&!Q.some(q=>(qm[q.id]||{}).goal===g.id))L.push("- No findings yet.");
    L.push("");
  });
  const unlinkedQ=Q.filter(q=>!(qm[q.id]||{}).goal);
  if(unlinkedQ.length){
    L.push("## Questions not yet linked to a goal","");
    unlinkedQ.forEach(q=>{const qf=F.filter(f=>f.link==="Q:"+q.id);L.push("### Research question "+q.n+": "+q.text,"");if(qf.length)qf.forEach(f=>{used.add(f.id);L.push(fLine(f))});else L.push("- No findings yet.");L.push("")});
  }
  const rest=F.filter(f=>!used.has(f.id));
  if(rest.length){L.push("## Findings whose goal or question changed in the plan","");rest.forEach(f=>L.push(fLine(f)));L.push("")}
  const gaps=G.filter(g=>!F.some(f=>f.link===g.id||Q.some(q=>(qm[q.id]||{}).goal===g.id&&f.link==="Q:"+q.id)));
  L.push("## For stakeholders","");
  if(gaps.length)gaps.forEach(g=>L.push("- No evidence yet for Goal "+g.n+". Is that expected at this point?"));
  L.push("- What would change your decision about this design?","- Anything we should look for in the remaining sessions?","");
  L.push("_Participants are identified by ID only. Quotes are verbatim from session transcripts, with the session timestamp._");
  return L.join("\n")+"\n";
}
async function stakeDecision(kind){
  const st=ST();if(!st)return;
  const note=(($("#cs-stnote")||{}).value||"").trim();
  if(kind!=="approved"&&!note){toast("Add the stakeholder feedback first.");$("#cs-stnote")&&$("#cs-stnote").focus();return}
  const label={approved:"Stakeholders approved the early findings",changes:"Stakeholders asked for changes to the early findings",redesign:"Stakeholders said the design needs rework"}[kind];
  try{
    await patchStudy(st.id,{stake:{decision:kind,note,at:now()}});
    await addLog(st,"Stakeholders",label,note,"Early findings");
  }catch(e){fail(e);return}
  toast(kind==="approved"?"Logged. Next: the final report in Research › Report.":kind==="redesign"?"Logged. Start a follow-up study from the Study tab.":"Logged.");
  if(kind==="redesign"){CS.fuOpen=true;setTab("study")}else renderTesting();
}

/* ---------- stages ---------- */
function stages(){
  const st=ST();if(!st)return [];
  const s=raGet()||{},p=s.plan||{},v=latestV(st.id),rv=reviewOf(v),sess=mySessions(st.id),F=st.findings||[],reg=s.reg||{};
  const pins=(s.pins||[]).length,gq=(s.guide&&s.guide.sections||[]).some(x=>(x.qs||[]).some(q=>String(q.text||"").trim()));
  const R=[];
  R.push({t:"Prior research",tab:"research",hash:"scan",st:pins?"done":"todo",d:pins?pins+" item"+(pins===1?"":"s")+" pinned as evidence":"Search past VA research and pin what applies"});
  R.push({t:"Prototype",tab:"proto",st:v?"done":(PT.pages.length||ptUsesForm()?"doing":"todo"),d:v?"v"+v.n+" sent "+fmtD(v.at):"Build it, then send it for engineer review"});
  R.push({t:"Engineer review",tab:"study",st:!v?"todo":(v.status==="go"?"done":v.status==="nogo"?"warn":"wait"),d:!v?"Happens once you send a version":(v.status==="go"?"Go on v"+v.n:v.status==="nogo"?"No-go on v"+v.n+". Revise and resend":"v"+v.n+" is with engineering")});
  const planOk=String(p.goal1||"").trim()&&(p.rq||[]).some(x=>String(x||"").trim());
  R.push({t:"Plan and conversation guide",tab:"research",hash:"plan",st:planOk&&gq?"done":(planOk||gq?"doing":"todo"),d:planOk&&gq?"Goals, questions and guide written":"From the VA templates"});
  R.push({t:"Recruit",tab:"testing",st:st.recruit&&st.recruit.body?"done":"todo",d:st.recruit&&st.recruit.body?"Perigean email drafted "+fmtD(st.recruit.at):"Screener, tester traits and the Perigean email"});
  R.push({t:"Sessions and findings",tab:"testing",st:F.length?"done":(sess.length?"doing":"todo"),d:sess.length+" session"+(sess.length===1?"":"s")+", "+F.length+" finding"+(F.length===1?"":"s")});
  const sk=st.stake&&st.stake.decision;
  R.push({t:"Stakeholder review",tab:"testing",st:sk==="approved"?"done":sk?"warn":"todo",d:sk==="approved"?"Approved "+fmtD(st.stake.at):sk==="changes"?"Changes requested":sk==="redesign"?"Needs rework: start a follow-up":"Share the early findings report"});
  const regOk=reg.team&&String(reg.cc||"").trim()&&String(reg.folder||"").trim()&&String(reg.summary||"").trim();
  R.push({t:"Final report and research repo",tab:"research",hash:"report",st:regOk?"done":"todo",d:regOk?"Intake card ready with labels":"Final report, then the repo intake card and tags"});
  return R;
}
const CHIP={done:["Done","ok"],doing:["In progress",""],todo:["Not started",""],wait:["Waiting",""],warn:["Needs attention","warn"]};

/* ---------- rendering helpers ---------- */
function paint(el,html){
  if(!el)return;
  const a=document.activeElement;
  if(a&&el.contains(a)&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)){el.dataset.dirty="1";return}
  el.dataset.dirty="";el.innerHTML=html;
}
function card(title,body,pill){return '<section class="rcard"><h3 class="rh">'+rx(title)+(pill?'<span class="pill">'+rx(pill)+'</span>':'')+'</h3>'+body+'</section>'}
function note(t,warn){return '<p class="rnote'+(warn?' warn':'')+'" style="'+(warn?'margin:0 18px 14px':'padding:0 18px 14px')+'">'+t+'</p>'}
function offNote(){return CS.on?"":'<p class="rnote warn">Studies save when this page is opened in Claude while you’re signed in. Until then, your work stays in this browser.</p>'}
function rerenderCurrent(){setTab(CS.tab||"study")}
function refresh(){
  if(!CS.ready)return;
  if(CS.tab==="study")renderStudy();
  else if(CS.tab==="testing")renderTesting();
  else if(CS.tab==="research")renderGate();
  else if(CS.tab==="proto"){if(CS.role==="engineer")engSide();vstat()}
  else if(CS.tab==="pages"&&window.pgLibChanged)window.pgLibChanged();
}

/* ---------- Study tab ---------- */
function renderStudy(){
  const side=$("#cs-sside"),main=$("#cs-smain");if(!side||!main)return;
  const st=ST();
  let s='<div class="group"><p class="ghead">Studies</p><div class="inset">';
  if(!CS.on)s+='<div class="cell"><p class="fhint">'+(window.__csBooted?"Studies save when this page is opened in Claude while you’re signed in.":"Connecting…")+'</p></div>';
  else if(!CS.studies.length)s+='<div class="cell"><p class="fhint">No studies yet. Create the first one below. It keeps what you’ve already built in this browser.</p></div>';
  else s+=CS.studies.map(x=>{const v=latestV(x.id),par=x.parentId&&studyById(x.parentId);return '<button class="rrow" data-open="'+rx(x.id)+'" aria-current="'+(x.id===CS.sid)+'"><span class="rt"><span class="rn">'+rx(x.name)+'</span><span class="rm">'+rx([x.product,v?"v"+v.n+" · "+({go:"Go",nogo:"No-go",pending:"in review"}[v.status]||""):"no version yet",par?"follows "+par.name:""].filter(Boolean).join(" · "))+'</span></span></button>'}).join("");
  s+='</div></div>';
  if(CS.on){
    s+='<div class="group"><p class="ghead">New study</p><div class="inset">'+(CS.newOpen?
      '<div class="fi"><label for="cs-nn">Study name</label><input id="cs-nn" type="text" placeholder="Supplemental claim upload, round 1"></div><div class="fi"><label for="cs-np">Product</label><input id="cs-np" type="text" placeholder="Disability claims"></div><div class="fi"><div class="rlinks" style="margin:0"><button class="btn small" type="button" data-act="create">Create study</button><button class="tool" type="button" data-act="new-cancel">Cancel</button></div></div>'
      :'<div class="cell"><button class="tool" type="button" data-act="new">New study</button></div>')+'</div>'+
      (CS.studies.length?'':'<p class="gfoot">Your first study adopts the prototype and research draft already in this browser.</p>')+'</div>';
  }
  paint(side,s);
  if(!st){
    paint(main,offNote()+card("No study open",'<div class="rb"><p class="rnote" style="padding:0">A study holds the whole flow: prior research, prototype versions, the engineer review, the plan and guide, recruitment, sessions, findings, stakeholder feedback and the final report. Create one, or pick one on the left.</p></div>'));
    return;
  }
  const par=st.parentId&&studyById(st.parentId),kids=CS.studies.filter(x=>x.parentId===st.id);
  let h='<div class="titlebar"><div style="min-width:0"><h2>'+rx(st.name)+'</h2><p class="sum">'+rx([st.product,"Started "+fmtD(st.createdAt)].filter(Boolean).join(" · "))+'</p>'+
    (par||kids.length?'<div class="rlinks">'+(par?'<button class="tool" type="button" data-open="'+rx(par.id)+'">Builds on: '+rx(par.name)+'</button>':'')+kids.map(k=>'<button class="tool" type="button" data-open="'+rx(k.id)+'">Follow-up: '+rx(k.name)+'</button>').join("")+'</div>':'')+
    '</div></div>'+offNote();
  /* stage list */
  h+=card("Where this study is",'<ol class="cs-stages">'+stages().map((x,i)=>{const c=CHIP[x.st];return '<li class="cs-stage '+x.st+'"><span class="cs-n" aria-hidden="true">'+(x.st==="done"?"✓":(i+1))+'</span><span class="cs-st"><b>'+rx(x.t)+'</b><small>'+rx(x.d)+'</small></span><span class="pt-flag'+(c[1]==="ok"?" ok":c[1]==="warn"?" cs-warn":" cs-neutral")+'">'+c[0]+'</span><button class="tool" type="button" data-go="'+x.tab+'" data-hash="'+(x.hash||"")+'">Open</button></li>'}).join("")+'</ol>');
  /* notifications for this study */
  const ns=CS.notes.filter(n=>n.sid===st.id&&n.to==="designer").slice(0,6);
  if(ns.length)h+=card("Notifications",'<ul class="rp-list">'+ns.map(n=>'<li class="rp'+(n.read?'':' cs-unread')+'"><div class="rp-top"><span class="rp-name" style="cursor:default">'+rx(n.title)+'</span><span class="rnote" style="padding:0">'+rx(fmtDT(n.at))+'</span></div>'+(n.body?'<p class="rnote" style="padding:0">'+rx(n.body)+'</p>':'')+(n.read?'':'<div><button class="tool" type="button" data-read="'+rx(n.id)+'">Mark as read</button></div>')+'</li>').join("")+'</ul>');
  /* engineer reviews */
  const vs=myVersions(st.id);
  h+=card("Prototype versions and engineer review",vs.length?'<ul class="rp-list">'+vs.map(v=>{const rv=reviewOf(v);
    let b='<li class="rp"><div class="rp-top"><span class="rp-name" style="cursor:default">v'+v.n+' · '+rx(v.title||"Prototype")+'</span><span class="pt-flag'+(v.status==="go"?" ok":v.status==="nogo"?" cs-warn":" cs-neutral")+'">'+({go:"Go",nogo:"No-go",pending:"Waiting for engineering"}[v.status]||v.status)+'</span></div><div class="rp-meta"><span>Sent '+rx(fmtDT(v.at))+'</span>'+(v.note?'<span>Your note: '+rx(v.note)+'</span>':'')+'</div>';
    if(rv){
      b+=(rv.summary?'<p class="cs-quote">'+rx(rv.summary)+'</p>':'');
      const il=rv.itemList||[];
      if(il.length)b+='<ul class="cs-items">'+il.map(it=>{const m=(rv.items||{})[it.key]||{};const lab={ok:"Feasible",change:"Feasible with changes",no:"Not feasible"}[m.st]||"Not marked";return '<li><span class="pt-flag'+(m.st==="ok"?" ok":m.st==="no"||m.st==="change"?" cs-warn":" cs-neutral")+'">'+lab+'</span> <b>'+rx(it.label)+'</b>'+(m.note?' — '+rx(m.note):'')+'</li>'}).join("")+'</ul>';
      if(rv.answered)b+='<div class="rlinks" style="margin-top:8px"><button class="tool" type="button" data-apply="'+rx(rv.id)+'">Add '+rv.answered+' answer'+(rv.answered===1?"":"s")+' to my open questions</button></div>';
    }
    return b+'</li>'}).join("")+'</ul>':'<div class="rb"><p class="rnote" style="padding:0">No version yet. When the prototype is ready to test, choose <b>Send for engineer review</b> on the Prototype tab. Engineering checks feasibility before you write the plan.</p></div>');
  /* questions to goals */
  const G=goals(),Q=rqs(),qm=st.qmap||{},pages=CS.live?[]:ptAllPages().filter(p=>p.stage==="step"||p.src==="compose");
  h+=card("Research questions and goals",(Q.length?'<ul class="rp-list">'+Q.map(q=>{const m=qm[q.id]||{},sel=(m.screens||[]).filter(t=>pages.some(p=>p.title===t));
    return '<li class="rp cs-qrow"><b class="cs-qt">'+rx(q.n+". "+q.text)+'</b><div class="cs-qgoal"><select data-qgoal="'+q.id+'" aria-label="Goal for question '+q.n+'"><option value="">Choose the goal it serves</option>'+G.map(g=>'<option value="'+g.id+'"'+(m.goal===g.id?" selected":"")+'>Goal '+g.n+': '+rx(g.text.length>70?g.text.slice(0,68)+"…":g.text)+'</option>').join("")+'</select></div>'+
    (pages.length?'<details class="cs-scr"'+(CS.openScr===q.id?" open":"")+' data-scr="'+q.id+'"><summary>Prototype screens it tests: '+(sel.length?rx(sel.join(", ")):"none chosen")+'</summary><div class="cs-chips">'+pages.map(p=>{const on=sel.indexOf(p.title)>-1;return '<button type="button" class="cs-chip" data-qscr="'+q.id+'" data-t="'+rx(p.title)+'" aria-pressed="'+on+'">'+rx(p.title)+'</button>'}).join("")+'</div></details>':'')+'</li>'}).join("")+'</ul>'+note("Goals and questions come from your research plan. Change their wording in Research › Plan."):'<div class="rb"><p class="rnote" style="padding:0">No research questions yet. Write goals and questions in Research › Plan, then link each question to the goal it serves here.</p></div>'));
  /* follow-up */
  h+=card("Follow-up study",CS.fuOpen?'<div class="fi"><label for="cs-fn">Name of the follow-up study</label><input id="cs-fn" type="text" value="'+rx(st.name.replace(/,? round \d+$/i,"")+", round "+(2+CS.studies.filter(x=>x.parentId===st.id).length))+'"></div><div class="fi"><label for="cs-fr">Why a follow-up</label><textarea id="cs-fr" rows="3" placeholder="Stakeholders asked for a redesign of the upload step"></textarea><p class="fhint">The new study starts from this study’s latest prototype version, plan, guide and pinned evidence, and links back here. Findings and the report start fresh.</p></div><div class="fi"><div class="rlinks" style="margin:0"><button class="btn small" type="button" data-act="followup">Start follow-up study</button><button class="tool" type="button" data-act="fu-cancel">Cancel</button></div></div>'
    :'<div class="rb"><p class="rnote" style="padding:0 0 10px">When the design needs rework, start a new study that builds on this one instead of reopening it.</p><button class="tool" type="button" data-act="fu-open">Start a follow-up study</button></div>');
  /* decisions log */
  const log=(st.log||[]).slice().sort((a,b)=>(b.at||0)-(a.at||0));
  const inh=par?(par.log||[]).slice().sort((a,b)=>(b.at||0)-(a.at||0)):[];
  h+=card("Decisions log",'<div class="cs-logadd"><div class="fi"><label for="cs-lw">Decision</label><input id="cs-lw" type="text" placeholder="Dropped the optional address step"></div><div class="fi"><label for="cs-ly">Why</label><input id="cs-ly" type="text" placeholder="Engineering can prefill it from the profile"></div><div class="fi"><label for="cs-lb">Who decided</label><select id="cs-lb"><option>Designer</option><option>Engineer</option><option>Researcher</option><option>Stakeholders</option><option>Product</option></select></div><div class="fi"><button class="btn small" type="button" data-act="log">Add to log</button></div></div>'+
    '<ul class="rp-list">'+(log.length?log.map(logLi).join(""):'<li class="rp"><span class="rnote" style="padding:0">Nothing logged yet.</span></li>')+'</ul>'+
    (inh.length?'<details class="cs-inh"><summary>From “'+rx(par.name)+'” ('+inh.length+')</summary><ul class="rp-list">'+inh.map(logLi).join("")+'</ul></details>':''),log.length+"");
  paint(main,h);
}
function logLi(e){return '<li class="rp"><div class="rp-top"><span class="rp-name" style="cursor:default">'+rx(e.what)+'</span><span class="pill">'+rx(e.who)+'</span></div>'+(e.why?'<p class="rnote" style="padding:0">'+rx(e.why)+'</p>':'')+'<div class="rp-meta"><span>'+rx(fmtDT(e.at))+'</span>'+(e.source?'<span>'+rx(e.source)+'</span>':'')+'</div></li>'}

async function setQmap(qid,fn){
  const st=ST();if(!st)return;const qm=clone(st.qmap||{});qm[qid]=Object.assign({goal:"",screens:[]},qm[qid]||{});fn(qm[qid]);
  try{await patchStudy(st.id,{qmap:qm});if(CS.tab==="study")renderStudy()}catch(e){fail(e)}
}
function wireStudy(){
  const v=$("#view-study");
  v.addEventListener("click",async e=>{
    const b=e.target.closest("button");if(!b||!v.contains(b))return;
    if(b.dataset.open){await openStudy(b.dataset.open);setTab("study");return}
    if(b.dataset.go){openTab(b.dataset.go,b.dataset.hash);return}
    if(b.dataset.read){try{await db.doc("notes/"+b.dataset.read).update({read:true})}catch(er){}return}
    if(b.dataset.apply){applyAnswers(b.dataset.apply);return}
    if(b.dataset.qscr){CS.openScr=b.dataset.qscr;const t=b.dataset.t;setQmap(b.dataset.qscr,m=>{const i=m.screens.indexOf(t);if(i>-1)m.screens.splice(i,1);else m.screens.push(t)});return}
    const a=b.dataset.act;
    if(a==="new"){CS.newOpen=true;renderStudy();const n=$("#cs-nn");n&&n.focus();return}
    if(a==="new-cancel"){CS.newOpen=false;renderStudy();return}
    if(a==="create"){const n=$("#cs-nn").value.trim();if(!n){toast("Give the study a name.");$("#cs-nn").focus();return}b.disabled=true;await createStudy(n,$("#cs-np").value.trim(),null);return}
    if(a==="fu-open"){CS.fuOpen=true;renderStudy();const n=$("#cs-fr");n&&n.focus();return}
    if(a==="fu-cancel"){CS.fuOpen=false;renderStudy();return}
    if(a==="followup"){const st=ST(),n=$("#cs-fn").value.trim(),r=$("#cs-fr").value.trim();if(!n){toast("Name the follow-up study.");return}if(!r){toast("Say why you’re starting a follow-up.");$("#cs-fr").focus();return}b.disabled=true;await createStudy(n,st.product,st,r);return}
    if(a==="log"){const st=ST(),w=$("#cs-lw").value.trim();if(!w){toast("Write the decision first.");$("#cs-lw").focus();return}
      try{await addLog(st,$("#cs-lb").value,w,$("#cs-ly").value.trim(),"Added by hand");$("#cs-lw").value="";$("#cs-ly").value="";$("#cs-lw").blur();toast("Added to the log");renderStudy()}catch(er){fail(er)}return}
  });
  v.addEventListener("change",e=>{const t=e.target;if(t.dataset.qgoal)setQmap(t.dataset.qgoal,m=>{m.goal=t.value})});
  v.addEventListener("focusout",()=>setTimeout(()=>{if($("#cs-smain").dataset.dirty||$("#cs-sside").dataset.dirty)renderStudy()},0));
}

/* ---------- Research tab ---------- */
function loadRA(hash){
  const f=$("#cs-ra");if(!f)return;
  f.dataset.hash=hash||"";f.dataset.loaded="1";
  f.src="research.html?s="+encodeURIComponent(CS.sid||"local")+"&t="+now()+(hash?"#"+hash:"");
}
function renderGate(){
  const g=$("#cs-rgate");if(!g)return;
  const st=ST();
  if(!st){g.innerHTML='<p class="rnote warn">No study is open, so this research draft isn’t saved to a study. Open or create one on the Study tab.</p>';return}
  const v=latestV(st.id);
  let cls="",t;
  if(!v)t="Scan prior research any time. Write the plan once engineering has reviewed the prototype. No version has been sent yet.";
  else if(v.status==="pending"){t="Prototype v"+v.n+" is with engineering. Scan prior research now, and write the plan after their decision.";}
  else if(v.status==="nogo"){cls=" warn";t="Engineering said No-go on v"+v.n+". Revise the prototype and send a new version before you write the plan, so you don’t test something that can’t be built.";}
  else{cls=" ok";t="Engineering said Go on v"+v.n+". The plan is unlocked.";}
  g.innerHTML='<div class="cs-gate'+cls+'"><span><b>'+rx(st.name)+'.</b> '+rx(t)+'</span><span class="rlinks" style="margin:0">'+[["scan","Prior research"],["plan","Plan"],["guide","Guide"],["report","Report"],["register","Repo"]].map(x=>'<button class="tool" type="button" data-rh="'+x[0]+'">'+x[1]+'</button>').join("")+'</span></div>';
}
function renderResearch(){
  renderGate();
  const f=$("#cs-ra"),h=CS.pendHash||"";CS.pendHash="";
  if(h||!f.dataset.loaded)loadRA(h);
}

/* ---------- Testing tab ---------- */
function renderTesting(){
  const side=$("#cs-tside"),main=$("#cs-tmain");if(!side||!main)return;
  const st=ST();
  if(!st){paint(side,'<div class="group"><p class="ghead">Sessions</p><div class="inset"><div class="cell"><p class="fhint">Open a study first.</p></div></div></div>');paint(main,offNote()+card("No study open",'<div class="rb"><p class="rnote" style="padding:0">Recruitment, sessions and findings belong to a study. Create or open one on the Study tab.</p></div>'));return}
  const sess=mySessions(st.id),F=st.findings||[];
  let s='<div class="group"><p class="ghead">Sessions</p><div class="inset">'+(sess.length?sess.map(x=>{const n=F.filter(f=>f.sessionId===x.id).length;return '<button class="rrow" data-sess="'+rx(x.id)+'" aria-current="'+(x.id===CS.selSession)+'"><span class="rt"><span class="rn">'+rx(x.participant||"Participant")+'</span><span class="rm">'+rx([x.date,Math.round((x.transcript||"").length/1000)+"k characters",n+" finding"+(n===1?"":"s")].filter(Boolean).join(" · "))+'</span></span></button>'}).join(""):'<div class="cell"><p class="fhint">No sessions yet.</p></div>')+'</div></div>';
  s+='<div class="group"><p class="ghead">Add a session</p><div class="inset">'+
   '<div class="fi"><label for="cs-sp">Participant ID</label><input id="cs-sp" type="text" placeholder="P1"></div>'+
   '<div class="fi"><label for="cs-sd">Session date</label><input id="cs-sd" type="text" placeholder="MM/DD/YYYY"></div>'+
   '<div class="fi"><label for="cs-stx">Transcript</label><textarea id="cs-stx" rows="8" placeholder="Paste the transcript. Keep the timestamps, like [00:12:30]."></textarea><p class="fhint">Paste text only. Use participant IDs, and take out names, emails, phone numbers and anything else that identifies someone. Never upload recordings.</p></div>'+
   '<div class="fi" id="cs-piirow" hidden><label class="chk" style="display:flex;gap:8px;align-items:flex-start;font-size:14px;color:var(--label)"><input type="checkbox" id="cs-piiok" style="margin-top:3px"> This transcript seems to contain an email, phone number or ID number. I’ve checked it and removed personal details.</label></div>'+
   '<div class="fi"><button class="btn small" type="button" data-act="addsess">Save session</button></div></div></div>';
  paint(side,s);
  let h=offNote();
  /* recruitment */
  const p=plan(),rec=st.recruit,miss=[["Goals",goals().length],["Primary criteria",String(p.crit_p||"").trim()],["Total participants",String(p.n_total||"").trim()],["Planned dates",String(p.dates||"").trim()],["Session length",String(p.len||"").trim()]].filter(x=>!x[1]).map(x=>x[0]);
  let r='<div class="rb" style="padding-top:0"><p class="rnote" style="padding:0 0 10px">Built from the Recruitment and Timeline sections of your plan. The tool drafts the email. You send it.</p>'+
    (miss.length?'<p class="rnote warn" style="margin:0 0 10px">Missing from the plan: '+rx(miss.join(", "))+'. These will show as '+NEED+'.</p>':'')+
    '<div class="rlinks" style="margin:0"><button class="btn small" type="button" data-act="rec"'+(CS.busy?" disabled":"")+'>'+(rec?"Draft again":"Draft screener, traits and email")+'</button><button class="tool" type="button" data-go="research" data-hash="plan">Open the plan</button></div>'+
    '<p class="status" id="cs-rstat" role="status" style="padding:8px 0 0">'+rx(CS.recStatus||"")+'</p></div>';
  if(rec){
    const mail="mailto:?subject="+encodeURIComponent(rec.subject||"")+"&body="+encodeURIComponent(rec.body||"");
    r+='<div class="fi"><label for="cs-rsc">Screener questions</label><textarea id="cs-rsc" rows="9" data-rec="screener">'+rx(rec.screener||"")+'</textarea></div>'+
       '<div class="fi"><label for="cs-rtr">Preferred tester traits</label><textarea id="cs-rtr" rows="6" data-rec="traits">'+rx(rec.traits||"")+'</textarea></div>'+
       '<div class="fi"><label for="cs-rsu">Email subject</label><input id="cs-rsu" type="text" data-rec="subject" value="'+rx(rec.subject||"")+'"></div>'+
       '<div class="fi"><label for="cs-rbo">Email to Perigean</label><textarea id="cs-rbo" rows="12" data-rec="body">'+rx(rec.body||"")+'</textarea><p class="fhint">Add Perigean’s address in your mail app. Your OCTO/VA lead must approve materials before you send a recruitment request.</p></div>'+
       '<div class="fi"><div class="rlinks" style="margin:0"><a href="'+rx(mail)+'" target="_blank" rel="noopener">Open in mail app</a><button class="tool" type="button" data-copy="email">Copy email</button><button class="tool" type="button" data-copy="screener">Copy screener</button></div></div>';
  }
  h+=card("Recruit with Perigean",r);
  /* findings from a session */
  const sel=sess.find(x=>x.id===CS.selSession);
  let f='';
  if(!sel)f='<div class="rb"><p class="rnote" style="padding:0">Pick a session on the left, or add one. Claude suggests findings tied to your goals and questions. Each suggestion keeps its quote only if the words appear in the transcript exactly, and the timestamp comes from the transcript itself. Nothing is added until you accept it.</p></div>';
  else{
    const opts=linkOptions();
    f='<div class="rb" style="padding-top:0"><p class="rnote" style="padding:0 0 10px"><b>'+rx(sel.participant||"Participant")+'</b>'+(sel.date?' · '+rx(sel.date):'')+' · '+Math.round((sel.transcript||"").length/1000)+'k characters</p>'+
      (opts.length?'':'<p class="rnote warn" style="margin:0 0 10px">Your plan has no goals or research questions yet. Add them in Research › Plan so findings have something to answer.</p>')+
      '<div class="rlinks" style="margin:0"><button class="btn small" type="button" data-act="suggest"'+(CS.busy||!opts.length?" disabled":"")+'>Suggest findings</button>'+(CS.busy?'<button class="tool" type="button" data-act="stop">Stop</button>':'')+'<button class="tool" type="button" data-act="manual">Add a finding by hand</button><button class="tool" type="button" data-act="showtx">'+(CS.showTx?"Hide transcript":"Show transcript")+'</button><button class="tool cs-del" type="button" data-act="delsess">Delete session</button></div>'+
      '<p class="status" id="cs-sstat" role="status" style="padding:8px 0 0">'+(CS.busy?'<span class="spin" aria-hidden="true"></span>':'')+rx(CS.sugg&&CS.sugg.sid===sel.id?CS.sugg.status||"":"")+'</p></div>';
    if(CS.showTx)f+='<pre class="rpre cs-tx">'+rx(sel.transcript||"")+'</pre>';
    const sg=CS.sugg&&CS.sugg.sid===sel.id?CS.sugg:null;
    if(sg&&sg.dropped)f+=note(sg.dropped+" suggestion"+(sg.dropped===1?" was":"s were")+" dropped because the quote isn’t in the transcript word for word.",true);
    if(sg&&sg.items.length)f+='<ul class="rp-list">'+sg.items.map(it=>sugLi(it,opts)).join("")+'</ul>';
  }
  h+=card("Findings from a session",f);
  /* findings so far */
  h+=card("Findings so far",F.length?'<ul class="rp-list">'+F.slice().sort((a,b)=>String(a.link).localeCompare(String(b.link))).map(x=>'<li class="rp"><div class="rp-top"><span class="rp-name" style="cursor:default">'+rx(x.statement)+'</span><button class="mini del" type="button" data-delf="'+rx(x.id)+'" aria-label="Remove finding" title="Remove finding">✕</button></div><p class="cs-quote">“'+rx(x.quote)+'”</p><div class="rp-meta"><span>'+rx(x.participant||"")+(x.ts?" · "+rx(x.ts):" · no timestamp")+'</span><span>'+rx(linkLabel(x.link))+'</span>'+(x.screen?'<span>Screen: '+rx(x.screen)+'</span>':'')+'</div></li>').join("")+'</ul>':'<div class="rb"><p class="rnote" style="padding:0">No findings yet.</p></div>',F.length+"");
  /* early findings + stakeholders */
  const md=earlyMd(),sk=st.stake||{};
  h+=card("Early findings report and stakeholder review",'<div class="rb" style="padding-top:0"><p class="rnote" style="padding:0 0 10px">Grouped by research goal, then by question. Share it, collect feedback, and log the outcome.</p><div class="rlinks" style="margin:0"><button class="tool" type="button" data-copy="early">Copy</button><button class="tool" type="button" data-act="dlearly">Download .md</button></div></div><pre class="rpre cs-md">'+rx(md)+'</pre>'+
    '<div class="fi"><label for="cs-stnote">Stakeholder feedback</label><textarea id="cs-stnote" rows="4" placeholder="What stakeholders said, and who said it">'+rx(sk.note||"")+'</textarea>'+(sk.decision?'<p class="fhint">Last outcome: '+rx({approved:"Approved",changes:"Changes requested",redesign:"Needs rework"}[sk.decision])+', '+rx(fmtD(sk.at))+'.</p>':'')+'</div>'+
    '<div class="fi"><div class="rlinks" style="margin:0"><button class="btn small" type="button" data-stake="approved">Approved: write the final report</button><button class="tool" type="button" data-stake="changes">Changes requested</button><button class="tool" type="button" data-stake="redesign">Needs rework: start a follow-up</button></div></div>');
  paint(main,h);
}
function sugLi(it,opts){
  const dis=it.state!=="open";
  return '<li class="rp cs-sug'+(dis?' cs-done':'')+'" data-sug="'+rx(it.id)+'">'+
   '<div class="fi" style="padding:0"><label for="sg-'+it.id+'">Finding'+(it.manual?' (added by hand)':'')+'</label><textarea id="sg-'+it.id+'" rows="2" data-sg="statement"'+(dis?" disabled":"")+'>'+rx(it.statement)+'</textarea></div>'+
   (it.manual?'<div class="fi" style="padding:0"><label for="sq-'+it.id+'">Quote, copied exactly from the transcript</label><textarea id="sq-'+it.id+'" rows="2" data-sg="quote"'+(dis?" disabled":"")+'>'+rx(it.quote)+'</textarea></div>':'<p class="cs-quote">“'+rx(it.quote)+'”</p>')+
   '<div class="rp-meta"><span class="pt-flag'+(it.verified===false?' cs-warn':' ok')+'">'+(it.verified===false?'Quote not found in the transcript':'Quote matches the transcript')+'</span><span>'+(it.ts?'Timestamp '+rx(it.ts)+' (from the transcript)':'No timestamp before this quote')+'</span>'+(it.strength==="tentative"?'<span>Tentative</span>':'')+'</div>'+
   '<div class="cs-sugrow"><select data-sg="link" aria-label="Goal or question this finding answers"'+(dis?" disabled":"")+'><option value="">Link to a goal or question</option>'+opts.map(o=>'<option value="'+rx(o.id)+'"'+(o.id===it.link?" selected":"")+'>'+rx(o.label.length>90?o.label.slice(0,88)+"…":o.label)+'</option>').join("")+'</select>'+
   (it.state==="open"?'<button class="btn small" type="button" data-sgact="accept">Accept</button><button class="tool" type="button" data-sgact="dismiss">Dismiss</button>':'<span class="pill">'+(it.state==="accepted"?"Accepted":"Dismissed")+'</span>')+'</div></li>';
}
function wireTesting(){
  const v=$("#view-testing");
  v.addEventListener("input",e=>{
    const t=e.target;
    if(t.id==="cs-stx"){const r=$("#cs-piirow");if(r)r.hidden=!piiHit(t.value)}
    const li=t.closest("[data-sug]");if(li&&t.dataset.sg&&CS.sugg){const it=CS.sugg.items.find(x=>x.id===li.dataset.sug);if(it){it[t.dataset.sg]=t.value;if(t.dataset.sg==="quote"&&it.manual){const s=CS.sessions.find(x=>x.id===CS.selSession);const ver=s&&verifyQuote(s.transcript,t.value);it.verified=!!ver;it.ts=ver?ver.ts:it.ts}}}
  });
  v.addEventListener("change",async e=>{
    const t=e.target;
    const li=t.closest("[data-sug]");if(li&&t.dataset.sg&&CS.sugg){const it=CS.sugg.items.find(x=>x.id===li.dataset.sug);if(it)it[t.dataset.sg]=t.value;if(t.dataset.sg==="quote")renderTesting();return}
    if(t.dataset.rec){const st=ST();if(!st||!st.recruit)return;const rec=Object.assign({},st.recruit);rec[t.dataset.rec]=t.value;try{await patchStudy(st.id,{recruit:rec})}catch(er){fail(er)}}
  });
  v.addEventListener("click",async e=>{
    const b=e.target.closest("button,a");if(!b||!v.contains(b))return;
    if(b.dataset.sess){CS.selSession=b.dataset.sess;CS.showTx=false;renderTesting();return}
    if(b.dataset.go){openTab(b.dataset.go,b.dataset.hash);return}
    if(b.dataset.stake){stakeDecision(b.dataset.stake);return}
    if(b.dataset.copy){const st=ST();if(!st)return;const k=b.dataset.copy;rCopy(k==="early"?earlyMd():k==="email"?"Subject: "+(st.recruit.subject||"")+"\n\n"+(st.recruit.body||""):(st.recruit.screener||"")+"\n\n"+(st.recruit.traits||""));return}
    if(b.dataset.delf){const st=ST();const findings=(st.findings||[]).filter(f=>f.id!==b.dataset.delf);try{await patchStudy(st.id,{findings});const s=raGet();if(s&&s.early&&s.early.items){s.early.items=s.early.items.filter(i=>i.id!==b.dataset.delf);raSet(s)}toast("Finding removed")}catch(er){fail(er)}return}
    const li=b.closest("[data-sug]");
    if(li&&b.dataset.sgact){const it=CS.sugg&&CS.sugg.items.find(x=>x.id===li.dataset.sug),sess=CS.sessions.find(x=>x.id===CS.selSession);if(!it||!sess)return;
      if(b.dataset.sgact==="dismiss"){it.state="dismissed";renderTesting();return}
      if(it.manual&&!verifyQuote(sess.transcript,it.quote)){toast("That quote isn’t in the transcript word for word. Copy it exactly.");return}
      b.disabled=true;await acceptFinding(it,sess);renderTesting();return}
    const a=b.dataset.act;
    if(a==="rec"){draftRecruit();return}
    if(a==="suggest"){suggestFindings();return}
    if(a==="stop"){CS.ctl&&CS.ctl.abort();return}
    if(a==="showtx"){CS.showTx=!CS.showTx;renderTesting();return}
    if(a==="manual"){if(!CS.sugg||CS.sugg.sid!==CS.selSession)CS.sugg={sid:CS.selSession,items:[],dropped:0,status:""};CS.sugg.items.unshift({id:cid("s"),statement:"",quote:"",ts:"",link:"",state:"open",manual:true,verified:false});renderTesting();return}
    if(a==="delsess"){if(b.dataset.sure!=="1"){b.dataset.sure="1";b.textContent="Click again to delete";setTimeout(()=>{b.dataset.sure="";b.textContent="Delete session"},4000);return}
      try{await db.doc("sessions/"+CS.selSession).delete();CS.selSession=null;toast("Session deleted. Findings already accepted stay in the study.")}catch(er){fail(er)}return}
    if(a==="dlearly"){const dl=await use("downloads");if(!dl){toast("Downloads aren’t available here. Use Copy.");return}try{await dl.save({filename:"early-findings.md",data:earlyMd()})}catch(er){if(!er||er.code!=="declined")toast("The file couldn’t be saved. Use Copy.")}return}
    if(a==="addsess"){
      const st=ST(),p=$("#cs-sp").value.trim(),d=$("#cs-sd").value.trim(),tx=$("#cs-stx").value;
      if(!/^P\d{1,3}$/i.test(p)){toast("Use a participant ID like P1, not a name.");$("#cs-sp").focus();return}
      if(tx.trim().length<200){toast("Paste the full transcript.");$("#cs-stx").focus();return}
      if(tx.length>240000){toast("That transcript is too long to save. Split it into two sessions.");return}
      if(piiHit(tx)&&!$("#cs-piiok").checked){toast("Check the transcript for personal details first.");$("#cs-piirow").hidden=false;return}
      b.disabled=true;
      try{const ref=await db.collection("sessions").add({sid:st.id,participant:p.toUpperCase(),date:d,transcript:tx,at:now()});CS.selSession=ref.id;await addLog(st,"Researcher","Added session "+p.toUpperCase(),d,"Sessions");toast("Session saved")}
      catch(er){fail(er);b.disabled=false}
      return}
  });
  v.addEventListener("focusout",()=>setTimeout(()=>{if($("#cs-tmain").dataset.dirty||$("#cs-tside").dataset.dirty)renderTesting()},0));
}

/* ---------- Prototype tab: send for review, engineer view ---------- */
function vstat(){
  const el=$("#cs-vstat");if(!el)return;
  if(CS.role==="engineer"||!ST()){el.hidden=true;return}
  const v=latestV(CS.sid);el.hidden=!v;if(!v)return;
  el.textContent="v"+v.n+" · "+({go:"Go",nogo:"No-go",pending:"with engineering"}[v.status]||v.status);
  el.className="pt-flag"+(v.status==="go"?" ok":v.status==="nogo"?" cs-warn":" cs-neutral");
}
const _ptRenderSide=ptRenderSide;
ptRenderSide=function(){if(CS.role==="engineer"){engSide();return}_ptRenderSide()};
const _ptRenderMain=ptRenderMain;
ptRenderMain=function(){
  if(CS.role==="engineer"&&!CS.viewV){
    $("#pt-title").textContent="Pick a version to review";$("#pt-sum").textContent="Versions designers send for review appear in the queue.";
    $("#pt-main").innerHTML='<section class="rcard"><h3 class="rh">Nothing open yet</h3><div class="rb"><p class="rnote" style="padding:0">Choose a prototype version from the review queue. You’ll see its snapshot, specs, data dependencies, process flows and open questions, then mark each system as feasible or not and give a Go or No-go.</p></div></section>';return;
  }
  _ptRenderMain();
  if(CS.role==="engineer"&&CS.viewV){
    const v=CS.viewV,st=studyById(v.sid);
    $("#pt-title").textContent=(st?st.name+" · ":"")+"v"+v.n;
    document.querySelectorAll("#pt-deps select,#pt-deps input,#pt-dy-submit").forEach(x=>x.disabled=true);
    const m=$("#pt-main"),b=document.createElement("p");b.className="rnote warn";
    b.textContent="You’re reviewing v"+v.n+", sent "+fmtDT(v.at)+(v.note?". Designer’s note: "+v.note:"")+". Answer open questions in the Questions tab. Your answers go back with your decision.";
    m.prepend(b);
  }
  vstat();
};
function engSide(){
  const side=$("#pt-side");if(!side)return;
  const vs=CS.versions.slice().sort((a,b)=>((a.status==="pending")===(b.status==="pending")?(b.at||0)-(a.at||0):(a.status==="pending"?-1:1)));
  let s='<div class="group"><p class="ghead">Review queue</p><div class="inset">';
  if(!CS.on)s+='<div class="cell"><p class="fhint">'+(window.__csBooted?"Reviews work when this page is opened in Claude while you’re signed in.":"Connecting…")+'</p></div>';
  else if(!vs.length)s+='<div class="cell"><p class="fhint">Nothing to review yet. Designers send versions from the Prototype tab.</p></div>';
  else s+=vs.map(v=>{const st=studyById(v.sid);return '<button class="rrow" type="button" data-csv="'+rx(v.id)+'" aria-current="'+(!!CS.viewV&&CS.viewV.id===v.id)+'"><span class="rt"><span class="rn">'+rx((st?st.name:"Study")+" · v"+v.n)+'</span><span class="rm">'+rx(({pending:"Waiting for you",go:"Go",nogo:"No-go"}[v.status]||v.status)+" · sent "+fmtD(v.at))+'</span></span></button>'}).join("");
  s+='</div></div>';
  const v=CS.viewV,d=CS.dec;
  if(v&&d){
    const items=engItems(),lock=!d.edit;
    s+='<div class="group"><p class="ghead">Systems and feasibility</p><div class="inset">'+items.map(it=>{const m=d.items[it.key]||{};return '<div class="fi cs-ei"><label for="ei-'+rx(it.key)+'">'+rx(it.label)+'</label><p class="fhint" style="margin:0 0 4px">'+rx(it.detail)+'</p><select id="ei-'+rx(it.key)+'" data-ei="'+rx(it.key)+'"'+(lock?" disabled":"")+'><option value="">Not marked</option><option value="ok"'+(m.st==="ok"?" selected":"")+'>Feasible</option><option value="change"'+(m.st==="change"?" selected":"")+'>Feasible with changes</option><option value="no"'+(m.st==="no"?" selected":"")+'>Not feasible</option></select><input type="text" data-en="'+rx(it.key)+'" aria-label="Note on '+rx(it.label)+'" placeholder="What has to change, or why" value="'+rx(m.note||"")+'"'+(lock?" disabled":"")+'></div>'}).join("")+'</div><p class="gfoot">Taken from the prototype’s data dependencies, submission destination and custom components.</p></div>';
    s+='<div class="group"><p class="ghead">Decision</p><div class="inset"><div class="fi"><div class="seg" role="radiogroup" aria-label="Decision" style="display:grid;grid-template-columns:1fr 1fr"><button type="button" role="radio" data-dec="go" aria-checked="'+(d.decision==="go")+'" aria-pressed="'+(d.decision==="go")+'"'+(lock?" disabled":"")+'>Go</button><button type="button" role="radio" data-dec="nogo" aria-checked="'+(d.decision==="nogo")+'" aria-pressed="'+(d.decision==="nogo")+'"'+(lock?" disabled":"")+'>No-go</button></div></div>'+
      '<div class="fi"><label for="cs-dsum">Summary for the designer</label><textarea id="cs-dsum" rows="4" placeholder="Go, once the address is prefilled from VA Profile"'+(lock?" disabled":"")+'>'+rx(d.summary||"")+'</textarea></div>'+
      '<div class="fi">'+(lock?'<p class="fhint" style="margin:0 0 8px">Sent. The designer has it.</p><button class="tool" type="button" data-act="dec-edit">Change decision</button>':'<button class="btn small" type="button" data-act="dec-send">Send decision to the designer</button>')+'</div></div><p class="gfoot">Go means this version can be tested with Veterans. No-go sends it back with your notes.</p></div>';
  }
  side.innerHTML=s;
}
function wireEng(){
  const side=$("#pt-side");
  side.addEventListener("click",e=>{
    if(CS.role!=="engineer")return;
    const b=e.target.closest("button");if(!b)return;
    if(b.dataset.csv){loadVersion(b.dataset.csv);return}
    if(b.dataset.dec&&CS.dec){CS.dec.decision=b.dataset.dec;engSide();return}
    if(b.dataset.act==="dec-send"){b.disabled=true;submitDecision().finally(()=>{b.disabled=false});return}
    if(b.dataset.act==="dec-edit"&&CS.dec){CS.dec.edit=true;engSide();return}
  });
  side.addEventListener("input",e=>{
    if(CS.role!=="engineer"||!CS.dec)return;const t=e.target;
    if(t.dataset.ei){(CS.dec.items[t.dataset.ei]=CS.dec.items[t.dataset.ei]||{}).st=t.value}
    if(t.dataset.en){(CS.dec.items[t.dataset.en]=CS.dec.items[t.dataset.en]||{}).note=t.value}
    if(t.id==="cs-dsum")CS.dec.summary=t.value;
  });
  side.addEventListener("change",e=>{if(CS.role!=="engineer"||!CS.dec)return;const t=e.target;if(t.dataset.ei)(CS.dec.items[t.dataset.ei]=CS.dec.items[t.dataset.ei]||{}).st=t.value});
}
function setRole(r){
  if(r===CS.role)return;
  CS.role=r;LS("cs-role",r);
  document.body.classList.toggle("cs-eng",r==="engineer");
  document.querySelectorAll("#cs-role button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.role===r)));
  $("#tab-proto").textContent=r==="engineer"?"Engineer review":"Review and export";
  if(r==="designer"){restoreLive();setTab(CS.lastDesignerTab||"study")}
  else{CS.lastDesignerTab=CS.tab;setTab("proto")}
}

/* ---------- tabs ---------- */
const CSHEAD={study:["Study","One record for the whole study: prior research, prototype versions, the engineer review, the plan, sessions, findings and every decision along the way."],
  research:["Research","Search past VA research, write the plan and conversation guide from the VA templates, then the final report and the research repo entry."],
  pages:["Pages","A page is built from components and forms. Make them in Components and Forms, save them to the study, then drag them here with the VADS page template items. Spacing comes from the VADS scale, and the heading outline is checked as you go."],
  testing:["Testing","Draft the screener and the email to Perigean, paste session transcripts, pull findings with their quotes and timestamps, and share early findings."]};
const MINE=["study","research","testing","pages"],PGRP=["pages","build","forms","ref"],THEIRS=["build","forms","proto","ref","rec","comm"];
const _setTab=setTab;
setTab=function(which){
  if(CS.role==="engineer"&&which!=="proto")which="proto";
  if(which!=="proto"&&CS.live)restoreLive();
  MINE.forEach(t=>{const tb=$("#tab-"+t);if(tb)tb.setAttribute("aria-selected",String(t===which));$("#view-"+t).hidden=t!==which});
  CS.tab=which;
  if(MINE.indexOf(which)>-1){
    THEIRS.forEach(t=>{$("#tab-"+t).setAttribute("aria-selected","false");$("#view-"+t).hidden=true});
    $("#h-title").textContent=CSHEAD[which][0];$("#h-sub").textContent=CSHEAD[which][1];
    if(which==="study")renderStudy();else if(which==="testing")renderTesting();else if(which==="pages"){if(window.renderPages)window.renderPages()}else renderResearch();
    LS("vads-tab",which);
  }else{
    _setTab(which);
    if(which==="proto"&&CS.role!=="engineer"){$("#h-title").textContent="Review and export";$("#h-sub").textContent="The engineer review page and the Prototype Kit bundle for this prototype. Send a version for review when it’s ready to test."}
    if(which==="proto"&&CS.role==="engineer"){$("#h-title").textContent="Engineer review";$("#h-sub").textContent="Check that a prototype version can be built before it’s tested with Veterans. Mark each system, answer open questions, and send a Go or No-go back to the designer."}
  }
};
function psub(which){
  const on=PGRP.indexOf(which)>-1&&CS.role!=="engineer",ps=$("#cs-psub");
  if(ps){ps.hidden=!on;ps.querySelectorAll("button").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.pt===which)))}
  if(PGRP.indexOf(which)>-1){if(CS.role!=="engineer")CS.ptab=which;$("#tab-pages").setAttribute("aria-selected","true")}
}
const _setTab2=setTab;
setTab=function(which){_setTab2(which);psub(CS.tab);if(CS.tab!=="proto"){const sn=$("#pt-subnav");if(sn)sn.hidden=true;const sec=$("#pt-secnav");if(sec)sec.innerHTML=""}};
function openTab(t,hash){if(t==="research")CS.pendHash=hash||"";setTab(t)}

/* ---------- wiring ---------- */
$("#tab-study").onclick=()=>setTab("study");
$("#tab-research").onclick=()=>setTab("research");
$("#tab-testing").onclick=()=>setTab("testing");
$("#tab-proto").onclick=()=>setTab("proto");
$("#tab-pages").onclick=()=>setTab(CS.ptab||"pages");
document.querySelectorAll("#cs-psub button").forEach(b=>b.onclick=()=>setTab(b.dataset.pt));
document.querySelectorAll("#cs-role button").forEach(b=>b.onclick=()=>setRole(b.dataset.role));
$("#cs-rgate").addEventListener("click",e=>{const b=e.target.closest("[data-rh]");if(b){CS.pendHash=b.dataset.rh;renderResearch()}});
$("#cs-submit").onclick=()=>{const p=$("#cs-subpop");p.hidden=!p.hidden;if(!p.hidden)$("#cs-subnote").focus()};
$("#cs-subcancel").onclick=()=>{$("#cs-subpop").hidden=true};
$("#cs-subsend").onclick=async()=>{const b=$("#cs-subsend");b.disabled=true;await submitVersion($("#cs-subnote").value.trim());b.disabled=false;$("#cs-subnote").value="";$("#cs-subpop").hidden=true;vstat()};
window.addEventListener("storage",e=>{if(e.key===RA_KEY&&CS.tab==="research")renderGate()});
wireStudy();wireTesting();wireEng();
document.body.classList.toggle("cs-eng",CS.role==="engineer");
$("#tab-proto").textContent=CS.role==="engineer"?"Engineer review":"Review and export";
document.querySelectorAll("#cs-role button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.role===CS.role)));

window.CSX={ST,studyById,addLog,patchStudy,fail,cid,clone,now,LS};
/* Engineer notes for the designer: the same review records the Study tab lists, shown on Review and export. */
window.CSX.engNotes=function(){
  const st=ST();if(!st)return null;
  const vs=myVersions(st.id);
  const wrap=document.createElement("div");wrap.className="rb";
  if(!vs.length){wrap.innerHTML='<p class="rnote" style="padding:0">No version has gone to engineering yet. Choose <b>Send for engineer review</b>. The engineer’s notes will show here.</p>';return wrap}
  wrap.innerHTML='<ul class="rp-list">'+vs.map(v=>{const rv=reviewOf(v);
    let b='<li class="rp"><div class="rp-top"><span class="rp-name" style="cursor:default">v'+v.n+' · '+rx(v.title||"Prototype")+'</span><span class="pt-flag'+(v.status==="go"?" ok":v.status==="nogo"?" cs-warn":" cs-neutral")+'">'+({go:"Go",nogo:"No-go",pending:"Waiting for engineering"}[v.status]||v.status)+'</span></div><div class="rp-meta"><span>Sent '+rx(fmtDT(v.at))+'</span>'+(v.note?'<span>Your note: '+rx(v.note)+'</span>':'')+'</div>';
    if(rv){
      b+=(rv.summary?'<p class="cs-quote">'+rx(rv.summary)+'</p>':'');
      const il=rv.itemList||[];
      if(il.length)b+='<ul class="cs-items">'+il.map(it=>{const m=(rv.items||{})[it.key]||{};const lab={ok:"Feasible",change:"Feasible with changes",no:"Not feasible"}[m.st]||"Not marked";return '<li><span class="pt-flag'+(m.st==="ok"?" ok":m.st==="no"||m.st==="change"?" cs-warn":" cs-neutral")+'">'+lab+'</span> <b>'+rx(it.label)+'</b>'+(m.note?' — '+rx(m.note):'')+'</li>'}).join("")+'</ul>';
      if(rv.answered)b+='<div class="rlinks" style="margin-top:8px"><button class="tool" type="button" data-apply="'+rx(rv.id)+'">Add '+rv.answered+' answer'+(rv.answered===1?"":"s")+' to my open questions</button></div>';
    }else b+='<p class="rnote" style="padding:0">No engineer notes yet.</p>';
    return b+'</li>'}).join("")+'</ul>';
  wrap.addEventListener("click",e=>{const b=e.target.closest("[data-apply]");if(b)applyAnswers(b.dataset.apply)});
  return wrap;
};
window.csBoot=async function(){
  window.__csBooted=true;
  if(!db){CS.ready=true;refresh();rerenderCurrent();return}
  CS.on=true;
  try{
    const snap=await db.collection("studies").get();
    CS.studies=snap.docs.map(d=>Object.assign({id:d.id},d.data())).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
  }catch(e){console.error(e)}
  watch();
  if(CS.sid&&CS.studies.some(s=>s.id===CS.sid))await openStudy(CS.sid,{boot:true});
  else if(CS.studies.length)await openStudy(CS.studies[CS.studies.length-1].id,{boot:true});
  else{CS.sid=null;LS("cs-active",null);window.__implicit=true;try{await createStudy("Component Builder workspace","")}catch(e){console.error(e)}window.__implicit=false}
  CS.ready=true;
  setInterval(sync,3000);
  addEventListener("pagehide",()=>{sync()});
  rerenderCurrent();
};
})();


/* =====================================================================
   PAGES COMPOSER + STUDY LIBRARY
   A composed page is an ordered list of blocks. Each block is plain
   markup made of VADS web components (the same markup the Prototype Kit
   gets), a spacing step from the VADS scale, and the heading levels its
   components carry. Previews mount the real VA web components.
   ===================================================================== */
(function(){
"use strict";
const X=window.CSX,CS=window.CS;
const SCALE=[0,8,16,24,32,40,48];
let DRAG=null;
const PG={page:null,sel:null,seg:"study",mobile:false,tok:0,lib:null,libWhy:""};
const pid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const LEVEL_ATTRS=["level","label-header-level","header-level","heading-level"];
const EXTRA=[
  {key:"heading",name:"Heading",kind:"text",grp:"Text",html:"<h2>Section heading</h2>"},
  {key:"para",name:"Paragraph",kind:"text",grp:"Text",html:"<p>Write the content for this part of the page.</p>"},
  {key:"summary-box",name:"Summary box",kind:"vads",grp:"Page template",html:'<va-summary-box><h3 slot="headline">Key points</h3><p>Put the one or two facts a Veteran needs first.</p></va-summary-box>'},
  {key:"pagination",name:"Pagination",kind:"vads",grp:"Page template",html:'<va-pagination page="1" pages="5"></va-pagination>'},
  {key:"on-this-page",name:"On this page",kind:"vads",grp:"Page template",html:'<va-on-this-page></va-on-this-page>'},
  {key:"link-action",name:"Link, action",kind:"vads",grp:"Page template",html:'<va-link-action href="#" text="Start your application"></va-link-action>'},
  {key:"table",name:"Table",kind:"vads",grp:"Page template",html:'<va-table table-title="Benefit amounts"><va-table-row><span>Benefit</span><span>Monthly amount</span></va-table-row><va-table-row><span>Example benefit</span><span>$0.00</span></va-table-row></va-table>'},
  {key:"need-help",name:"Need help?",kind:"vads",grp:"Page template",html:'<va-need-help><div slot="content"><p>Call us at <va-telephone contact="8008271000"></va-telephone>. We’re here Monday through Friday, 8:00 a.m. to 9:00 p.m. ET.</p></div></va-need-help>'},
  {key:"search",name:"Search input",kind:"vads",grp:"Page template",html:'<va-search-input label="Search" button-text="Search"></va-search-input>'},
  {key:"nav",name:"Back and Continue",kind:"vads",grp:"Page template",html:'<va-button-pair left-button-text="Back" right-button-text="Continue" continue></va-button-pair>'},
  {key:"file",name:"File input",kind:"vads",grp:"Components",html:'<va-file-input label="Upload your document" hint="PDF, JPG or PNG, up to 50 MB" accept=".pdf,.jpg,.png"></va-file-input>'},
  {key:"card",name:"Card",kind:"vads",grp:"Components",html:"<va-card><h3>Card heading</h3><p>Short supporting text.</p></va-card>"}];
function palette(){return EXTRA.concat(REF_COMPS.map(c=>({key:"ref:"+c.id,name:c.name,kind:"vads",html:c.stories[0].h,grp:"Components",note:c.notice||""})))}

/* ---------- markup helpers ---------- */
function clean(html){return String(html||"").replace(/<style[\s\S]*?<\/style>/gi,"").replace(/<script[\s\S]*?<\/script>/gi,"").replace(/<!--[\s\S]*?-->/g,"").trim()}
function frag(html){const t=document.createElement("template");t.innerHTML=clean(html);return t}
const MARGIN=/margin[a-z-]*\s*:\s*(?!0(px|rem|em)?\s*(;|!|$))[^;]+;?/gi;
function hasMargin(st){MARGIN.lastIndex=0;return MARGIN.test(st||"")}
function stripMargins(html){
  const t=frag(html);let n=0;
  t.content.querySelectorAll("[style]").forEach(el=>{const st=el.getAttribute("style");if(hasMargin(st)){n++;const v=st.replace(MARGIN,"").trim();if(v)el.setAttribute("style",v);else el.removeAttribute("style")}});
  return {html:t.innerHTML.trim(),n};
}
function headNodes(t){
  const out=[];let hi=0;
  t.content.querySelectorAll("*").forEach(el=>{
    const n=el.localName,m=/^h([1-6])$/.exec(n);
    if(m){out.push({el,level:+m[1],text:el.textContent.trim()||"(empty heading)",key:"h:"+(hi++),kind:"h"});return}
    let attr=LEVEL_ATTRS.find(a=>el.hasAttribute(a)),lv=null,def=false;
    if(attr)lv=parseInt(el.getAttribute(attr),10);
    else{const d=((REF_PROPS[n]||{}).props||[]).find(p=>p[0]==="level");if(d&&el.hasAttribute("header")){attr="level";lv=parseInt(d[2],10);def=true}}
    if(attr&&lv>=1&&lv<=6)out.push({el,level:lv,text:el.getAttribute("header")||el.getAttribute("label")||n,key:"t:"+n+":"+attr,attr,tag:n,kind:"t",def});
  });
  return out;
}
function analyze(html){
  const t=frag(html),tags=new Set(),custom=new Set(),margins=[];
  t.content.querySelectorAll("*").forEach(el=>{
    const n=el.localName;
    if(n.indexOf("-")>-1){if(n.indexOf("va-")===0)tags.add(n);else custom.add(n)}
    if(hasMargin(el.getAttribute("style")))margins.push(n);
  });
  const known=t=>!!VADS_SPEC[t]||!!REF_PROPS[t]||RC_TAGS.has(t)||PT_VADS.some(x=>x[0]===t);
  return {tags:[...tags],custom:[...custom],unknown:[...tags].filter(x=>!known(x)),margins,heads:headNodes(t),deprecated:[...tags].filter(x=>{const c=REF_COMPS.find(r=>r.tag===x);return c&&c.notice})};
}
function setLevel(b,key,lv){
  const t=frag(b.html);
  headNodes(t).forEach(h=>{
    if(h.key!==key)return;
    if(h.kind==="t")h.el.setAttribute(h.attr,String(lv));
    else{const e=document.createElement("h"+lv);[...h.el.attributes].forEach(a=>e.setAttribute(a.name,a.value));while(h.el.firstChild)e.append(h.el.firstChild);h.el.replaceWith(e)}
  });
  b.html=t.innerHTML.trim();
}
function rootEl(html){const t=frag(html);return t.content.firstElementChild}
function setRootAttr(b,name,val){
  const t=frag(b.html),el=t.content.firstElementChild;if(!el)return;
  if(val===false||val===null||val==="")el.removeAttribute(name);else el.setAttribute(name,val===true?"":String(val));
  b.html=t.innerHTML.trim();
}

/* ---------- page structure ---------- */
function libFor(sid){const st=X.ST();const par=st&&st.parentId;return CS.library.filter(x=>x.sid===sid||(par&&x.sid===par))}
function normBlock(b,i){
  if(b&&b.html!=null)return b;
  const tag=(b&&b.tag)||"",pal=palette().find(x=>x.html.indexOf("<"+tag+" ")===0||x.html.indexOf("<"+tag+">")===0);
  const custom=b&&b.kind==="custom";
  return {id:(b&&b.id)||pid("b"),kind:custom?"custom":"vads",name:(b&&(b.what||b.name))||tag||"Block",html:custom?"<p>Custom component: "+rx((b&&b.name)||"unnamed")+"</p>":(pal?pal.html:(tag?"<"+tag+"></"+tag+">":"<p></p>")),space:i?3:0,why:(b&&b.why)||""};
}
function pages(){if(!Array.isArray(PT.pages))PT.pages=[];PT.pages.forEach(p=>{p.blocks=(p.blocks||[]).map(normBlock)});return PT.pages}
function curPage(){const ps=pages();let p=ps.find(x=>x.id===PG.page);if(!p&&ps.length){p=ps[0];PG.page=p.id}return p||null}
function curBlock(){const p=curPage();return p&&p.blocks.find(b=>b.id===PG.sel)||null}
function commit(){ptSave();renderPages()}
function newPage(title){
  if(PT.type==="form"||PT.type==="subtask")PT.type="mix";
  const p={id:pid("pg"),title:title||"New page",blocks:[{id:pid("b"),kind:"text",name:"Page heading",html:"<h1>"+rx(title||"New page")+"</h1>",space:0}]};
  pages().push(p);PG.page=p.id;PG.sel=p.blocks[0].id;commit();
}
window.__applyPageTemplate=function(t){
  if(PT.type==="form"||PT.type==="subtask")PT.type="mix"; /* same rule as Add page: composed pages need a type that includes them */
  const p={id:pid("pg"),title:t.name,blocks:[{id:pid("b"),kind:"text",name:"Page heading",html:"<h1>"+rx(t.name)+"</h1>",space:0}]};
  const STARTER={"va-tag-status":'<va-tag-status status="info" text="In progress"></va-tag-status>',"va-checkbox-group":'<va-checkbox-group label="Choose all that apply" hint="Select every option you want."><va-checkbox label="Email" value="email"></va-checkbox><va-checkbox label="Text message" value="text"></va-checkbox><va-checkbox label="Mail" value="mail"></va-checkbox></va-checkbox-group>'};
  t.blocks.forEach(([tag,name],i)=>{const b=normBlock({id:pid("b"),tag,what:name,kind:"vads"},i+1);if(STARTER[tag]&&b.html==="<"+tag+"></"+tag+">")b.html=STARTER[tag];p.blocks.push(b)});
  pages().push(p);PG.page=p.id;PG.sel=p.blocks[0].id;
  ptSave();ptRender();renderPages();toast("Added the "+t.name+" page. Change, reorder or remove its components.");
};
window.__palette=palette;
function addBlock(src,at){
  const p=curPage();if(!p){newPage("New page");return addBlock(src,at)}
  const s=stripMargins(clean(src.html));
  const b={id:pid("b"),kind:src.kind,name:src.name,html:s.html,space:p.blocks.length?3:0,libId:src.libId||null,why:src.why||""};
  let i=at;if(i==null){const k=p.blocks.findIndex(x=>x.id===PG.sel);i=k>-1?k+1:p.blocks.length}
  p.blocks.splice(i,0,b);PG.sel=b.id;commit();
}
function moveBlock(id,to){
  const p=curPage();if(!p)return;const i=p.blocks.findIndex(b=>b.id===id);if(i<0)return;
  const [b]=p.blocks.splice(i,1);if(to>i)to--;p.blocks.splice(Math.max(0,Math.min(p.blocks.length,to)),0,b);commit();
}
function srcFrom(token){
  if(token.indexOf("vads:")===0){const x=palette().find(p=>p.key===token.slice(5));return x&&{kind:x.kind,name:x.name,html:x.html}}
  if(token.indexOf("libp:")===0){const a=token.split(":"),l=CS.library.find(x=>x.id===a[1]),pt=l&&(l.parts||[])[+a[2]];return pt&&{kind:"lib",name:pt.name,html:pt.html,libId:l.id,why:""}}
  if(token.indexOf("lib:")===0){const l=CS.library.find(x=>x.id===token.slice(4));return l&&{kind:l.custom&&l.custom.length?"custom":"lib",name:l.name,html:l.html,libId:l.id,why:l.why||""}}
  return null;
}

/* ---------- outline and checks ---------- */
function outline(p){
  const out=[];
  (p?p.blocks:[]).forEach(b=>headNodes(frag(b.html)).forEach(h=>out.push({bid:b.id,key:h.key,level:h.level,text:h.text,def:h.def})));
  let prev=0;out.forEach(o=>{o.skip=prev&&o.level>prev+1;o.fixTo=prev+1;prev=o.level});
  return out;
}
function checks(p){
  const I=[];if(!p)return I;
  const o=outline(p),h1=o.filter(x=>x.level===1);
  if(!h1.length)I.push({k:"warn",t:"This page has no H1. Every page needs one, as its first heading.",fix:"addh1",fl:"Add an H1"});
  else if(h1.length>1)I.push({k:"warn",t:"This page has "+h1.length+" H1 headings. Keep one.",bid:h1[1].bid});
  else if(o[0].level!==1)I.push({k:"warn",t:"The first heading is an H"+o[0].level+". The H1 should come first.",bid:o[0].bid});
  o.filter(x=>x.skip).forEach(x=>I.push({k:"warn",t:"“"+x.text+"” is an H"+x.level+" after an H"+(x.fixTo-1)+". Screen reader users lose a level.",fix:"lvl",bid:x.bid,key:x.key,lv:x.fixTo,fl:"Make it H"+x.fixTo}));
  const defs=[...new Set(o.filter(x=>x.def).map(x=>x.bid))];
  if(defs.length)I.push({k:"info",t:defs.length+" block"+(defs.length===1?" uses":"s use")+" its component’s default heading level. Set it on purpose so the kit build matches."});
  p.blocks.forEach(b=>{const a=analyze(b.html);
    if(a.margins.length)I.push({k:"warn",t:"“"+b.name+"” sets its own margin. Use the spacing steps instead.",fix:"margin",bid:b.id,fl:"Remove its margin"});
    if(a.custom.length||b.kind==="custom")I.push({k:"warn",t:"“"+b.name+"” includes something that isn’t VADS"+(a.custom.length?" ("+a.custom.join(", ")+")":"")+". It goes to engineer review as a custom component."+(b.why?"":" No reason is recorded yet."),bid:b.id});
    if(a.unknown.length)I.push({k:"info",t:"“"+b.name+"” uses "+a.unknown.join(", ")+", which this tool can’t check. Confirm it in Storybook.",bid:b.id});
    a.deprecated.forEach(d=>I.push({k:"info",t:"“"+b.name+"” uses "+d+", which design.va.gov marks for deprecation.",bid:b.id}));
  });
  return I;
}

/* ---------- rendering ---------- */
function libRows(){
  const L=libFor(CS.sid);
  if(PG.seg==="vads"){
    const row=x=>'<div class="cs-prow" draggable="true" data-drag="vads:'+rx(x.key)+'"><span class="cs-grip" aria-hidden="true">⋮⋮</span><span class="cs-pn"><span>'+rx(x.name)+'</span><span class="cs-ps">'+rx(x.kind==="text"?"Text":(rootEl(x.html)||{}).localName||"")+'</span></span><button class="tool cs-sm" type="button" data-add="vads:'+rx(x.key)+'" aria-label="Add '+rx(x.name)+' to the page">Add</button></div>';
    return ["Page template","Text","Components"].map(g=>{const xs=palette().filter(x=>x.grp===g);return xs.length?'<p class="ghead" style="padding:10px 16px 4px">'+g+'</p>'+xs.map(row).join(""):""}).join("");
  }
  if(!X.ST())return '<div class="cell"><p class="fhint">Open a study to use its library.</p></div>';
  if(!L.length)return '<div class="cell"><p class="fhint">Nothing saved yet. In Components or Forms, choose <b>Save to study library</b>.</p></div>';
  return L.map(l=>{if(l.kind==="form")return formRows(l);const c=(l.custom||[]).length;return '<div class="cs-prow" draggable="true" data-drag="lib:'+rx(l.id)+'"><span class="cs-grip" aria-hidden="true">⋮⋮</span><span class="cs-pn"><span>'+rx(l.name)+'</span><span class="cs-ps">'+rx((l.tags||[]).join(" · ")||"No VADS tags")+(l.sid!==CS.sid?" · from the earlier study":"")+'</span>'+(c?'<span class="pt-flag cs-warn" style="justify-self:start">'+c+' custom part'+(c===1?"":"s")+'</span>':'')+'</span><button class="tool cs-sm" type="button" data-add="lib:'+rx(l.id)+'" aria-label="Add '+rx(l.name)+' to the page">Add</button></div>'}).join("");
}
function renderLeft(){
  const el=$("#cs-pl");if(!el)return;
  const ps=pages();
  let h='<div class="group"><p class="ghead">Pages in this prototype</p><div class="inset">';
  h+=ps.map(p=>{const n=checks(p).filter(x=>x.k==="warn").length;return '<button class="rrow" type="button" data-page="'+rx(p.id)+'" aria-current="'+(p.id===PG.page)+'"><span class="rt"><span class="rn">'+rx(p.title||"Untitled page")+'</span><span class="rm">'+p.blocks.length+' block'+(p.blocks.length===1?"":"s")+'</span></span><span class="pt-flag'+(n?" cs-warn":" ok")+'">'+(n?n+" to fix":"OK")+'</span></button>'}).join("");
  h+='<div class="cell"><button class="tool" type="button" data-act="newpage">Add page</button></div></div><p class="gfoot">Composed pages use the kit’s default page template, so the header, breadcrumbs and footer are fixed.</p></div>';
  h+='<div class="group"><p class="ghead">Add to this page</p><div class="seg" role="group" aria-label="Library" style="display:grid;grid-template-columns:1fr 1fr"><button type="button" data-seg="study" aria-pressed="'+(PG.seg==="study")+'">This study</button><button type="button" data-seg="vads" aria-pressed="'+(PG.seg==="vads")+'">VADS</button></div><div class="inset cs-plib" id="cs-plib">'+libRows()+'</div><p class="gfoot">Drag onto the page, or choose Add to place it after the selected block.</p></div>';
  el.innerHTML=h;LIBSIG=PG.seg+"|"+CS.sid+"|"+CS.library.map(x=>x.id).join(",");
}
function frameShell(p,{edit}){
  const wrap=fel("div",{class:"cs-frame"+(PG.mobile&&edit?" mobile":"")});
  wrap.append(fel("div",{class:"cs-tbar",text:"Prototype header · from the kit template"}),fel("div",{class:"cs-crumb",text:"Breadcrumbs · from the kit template"}));
  const body=fel("div",{class:"cs-pbody"}),hosts=[];
  p.blocks.forEach((b,i)=>{
    const px=SCALE[b.space]||0;
    if(edit&&i>0)body.append(fel("button",{class:"cs-gap",type:"button","data-pick":b.id,style:"height:"+Math.max(px,22)+"px","aria-label":"Space above "+b.name+": step "+b.space+", "+px+"px"},fel("span",{text:"↕ space "+b.space+" · "+px+"px"})));
    const w=fel("div",{class:"cs-blk"+(edit&&PG.sel===b.id?" sel":""),"data-bid":b.id});
    if(!edit&&i>0)w.style.marginTop=px+"px";
    if(edit){w.setAttribute("draggable","true");w.setAttribute("data-drag","move:"+b.id)}
    if(edit&&PG.sel===b.id){
      w.append(fel("div",{class:"cs-bbar"},
        fel("span",{class:"cs-bname",text:b.name}),
        fel("button",{type:"button","data-mv":"-1","aria-label":"Move "+b.name+" up",text:"↑"}),
        fel("button",{type:"button","data-mv":"1","aria-label":"Move "+b.name+" down",text:"↓"}),
        fel("button",{type:"button","data-act":"dup",text:"Duplicate"}),
        fel("button",{type:"button","data-act":"rm",text:"Remove"})));
    }
    const host=fel("div",{class:"cs-host"});w.append(host);hosts.push([host,b.html]);body.append(w);
  });
  if(edit)body.append(fel("div",{class:"cs-dropend","data-dropend":"1",text:p.blocks.length?"Drop here to add at the end":"Drag a component here, or choose Add on the left"}));
  wrap.append(body,fel("div",{class:"cs-fbar",text:"Prototype footer · from the kit template"}));
  return {el:wrap,hosts};
}
function mountAll(hosts,tok){
  rLoadLive().then(ok=>{if(tok!==PG.tok)return;hosts.forEach(([h,html])=>{if(h.isConnected&&!h.shadowRoot)rMountPreview(h,clean(html))});
    const n=$("#cs-live");if(n)n.textContent=ok?"Drawn with the real VA web components (v"+REF_WC_VER+"). This markup is what the Prototype Kit gets.":"The live VA components didn’t load here, so blocks show without their styles. The markup is unchanged.";});
}
function renderCenter(){
  const c=$("#cs-pc");if(!c)return;const p=curPage();
  c.innerHTML="";
  if(!p){c.append(fel("section",{class:"rcard"},fel("h3",{class:"rh",text:"No composed pages yet"}),fel("div",{class:"rb"},fel("p",{class:"rnote",style:"padding:0 0 10px",text:"Add a page, then drag in what you saved from Components and Forms, plus VADS page template items such as summary box and pagination."}),fel("button",{class:"btn small",type:"button","data-act":"newpage",text:"Add page"}),
    fel("p",{class:"rnote",style:"padding:14px 0 8px",text:"Or start from a template. Each adds a page with its components in order."}),
    fel("div",{class:"rlinks",style:"margin:0"},PT_PAGE_TEMPLATES.map(t=>{const b=fel("button",{class:"tool",type:"button",title:t.desc,text:t.name});b.onclick=()=>ptApplyPageTemplate(t);return b})))));return}
  const title=fel("input",{type:"text",id:"cs-ptitle",value:p.title||"","aria-label":"Page name"});
  c.append(fel("div",{class:"cs-phead"},title,
    fel("div",{class:"seg",role:"group","aria-label":"Preview width"},fel("button",{type:"button","data-w":"d","aria-pressed":String(!PG.mobile),text:"Desktop"}),fel("button",{type:"button","data-w":"m","aria-pressed":String(PG.mobile),text:"Phone"})),
    fel("button",{class:"tool cs-del",type:"button","data-act":"delpage",text:"Delete page"})));
  const tok=++PG.tok,f=frameShell(p,{edit:true});
  c.append(fel("div",{class:"cs-canvas"},f.el),fel("p",{class:"rnote",id:"cs-live",style:"text-align:center;padding:10px 0 0",text:"Loading the VA web components…"}));
  mountAll(f.hosts,tok);
}
function renderRight(){
  const r=$("#cs-pi");if(!r)return;const p=curPage(),b=curBlock();
  let h="";
  if(b){
    const a=analyze(b.html),root=rootEl(b.html),rt=root&&root.localName,docs=rt&&REF_PROPS[rt];
    h+='<div class="group"><p class="ghead">Selected block</p><div class="inset">'+
      '<div class="fi"><label for="cs-bn">Name</label><input id="cs-bn" type="text" value="'+rx(b.name)+'"></div>'+
      '<div class="fi"><span class="cs-lab">What’s inside</span><div class="cs-chips">'+(a.tags.length?a.tags.map(t=>'<span class="cs-tag">'+rx(t)+'</span>').join(""):'<span class="fhint" style="margin:0">Text only</span>')+a.custom.map(t=>'<span class="cs-tag cs-tcustom">'+rx(t)+' · custom</span>').join("")+'</div>'+(b.libId?'<p class="fhint" style="margin:4px 0 0">From this study’s library. Changes here affect this page only.</p>':'')+'</div>';
    if(a.heads.length){const seen={};h+='<div class="fi"><span class="cs-lab">Heading levels</span>'+a.heads.filter(x=>seen[x.key]?false:(seen[x.key]=1)).map(x=>'<div class="cs-hrow"><span>'+rx(x.kind==="t"?"Each "+x.tag.replace(/^va-/,"").replace(/-/g," ")+" ("+x.attr+")":"“"+(x.text.length>40?x.text.slice(0,38)+"…":x.text)+"”")+'</span><select data-hl="'+rx(x.key)+'" aria-label="Heading level">'+[1,2,3,4,5,6].map(n=>'<option value="'+n+'"'+(n===x.level?" selected":"")+'>H'+n+(x.def&&n===x.level?" (default)":"")+'</option>').join("")+'</select></div>').join("")+'<p class="fhint" style="margin:4px 0 0">Sets the component’s own heading setting, so the kit build gets the same outline.</p></div>'}
    h+='<div class="fi"><span class="cs-lab">Space above</span><div class="cs-step"><button type="button" data-sp="-1" aria-label="Less space"'+(b.space<=0?" disabled":"")+'>−</button><span>Step '+b.space+' · '+(SCALE[b.space]||0)+'px</span><button type="button" data-sp="1" aria-label="More space"'+(b.space>=6?" disabled":"")+'>+</button></div><p class="fhint" style="margin:4px 0 0">VADS scale only. Exports as <code>vads-u-margin-top--'+b.space+'</code>.</p></div>';
    if(docs){const props=docs.props.filter(x=>x[0]!=="disable-analytics"&&LEVEL_ATTRS.indexOf(x[0])<0).slice(0,8);
      h+='<div class="fi"><span class="cs-lab">'+rx(rt)+' settings</span>'+props.map(x=>{const v=root.getAttribute(x[0]);const id="cs-pp-"+x[0];
        return x[1]==="boolean"?'<label class="cs-chk"><input type="checkbox" id="'+id+'" data-prop="'+rx(x[0])+'"'+(v!==null?" checked":"")+'> '+rx(x[0])+'</label>':'<label class="cs-lab" for="'+id+'">'+rx(x[0])+'</label><input id="'+id+'" type="text" data-prop="'+rx(x[0])+'" value="'+rx(v||"")+'" placeholder="'+rx(x[2]||"")+'">'}).join("")+'</div>'}
    if(b.kind==="custom"||a.custom.length)h+='<div class="fi"><label for="cs-bwhy">Why no VADS component fits</label><textarea id="cs-bwhy" rows="3">'+rx(b.why||"")+'</textarea></div>';
    h+='<details class="fi cs-mk"><summary>Edit markup</summary><textarea id="cs-bhtml" rows="8" spellcheck="false">'+rx(b.html)+'</textarea><p class="fhint" style="margin:4px 0 0">Change text, items or attributes. Applies when you leave the field.</p></details></div></div>';
  }else h+='<div class="group"><p class="ghead">Selected block</p><div class="inset"><div class="cell"><p class="fhint">Select a block on the page to change its settings, heading levels and spacing.</p></div></div></div>';
  const o=outline(p);
  h+='<div class="group"><p class="ghead">Heading outline</p><div class="inset"><ul class="cs-ol">'+(o.length?o.map(x=>'<li style="padding-left:'+(10+(x.level-1)*14)+'px"><button type="button" data-pick="'+rx(x.bid)+'"><span class="cs-lv'+(x.skip?" bad":"")+'">H'+x.level+'</span>'+rx(x.text)+(x.def?' <span class="fhint">default</span>':'')+'</button></li>').join(""):'<li class="fhint" style="padding:10px 14px">No headings yet.</li>')+'</ul></div></div>';
  const I=checks(p),nw=I.filter(x=>x.k==="warn").length;
  h+='<div class="group"><p class="ghead">Checks <span class="pt-flag'+(nw?" cs-warn":" ok")+'" style="margin-left:6px">'+(nw?nw+" to fix":"All clear")+'</span></p><div class="inset">'+(I.length?I.map(x=>'<div class="cs-issue"><span>'+(x.k==="info"?'<span class="pt-flag cs-neutral">Note</span> ':'')+rx(x.t)+'</span>'+(x.fix?'<button class="tool cs-sm" type="button" data-fix="'+x.fix+'" data-bid="'+rx(x.bid||"")+'" data-key="'+rx(x.key||"")+'" data-lv="'+(x.lv||"")+'">'+rx(x.fl)+'</button>':(x.bid?'<button class="tool cs-sm" type="button" data-pick="'+rx(x.bid)+'">Show</button>':''))+'</div>').join(""):'<div class="cs-issue"><span><span class="pt-flag ok">OK</span> Headings are in order, spacing is on the scale, and every block is VADS.</span></div>')+'</div></div>';
  r.innerHTML=h;
}
window.renderPages=function(){
  const v=$("#view-pages");if(!v||v.hidden)return;
  const p=curPage();if(p&&!p.blocks.some(b=>b.id===PG.sel))PG.sel=p.blocks.length?p.blocks[0].id:null;
  renderLeft();renderCenter();renderRight();
};
let LIBSIG="";
window.pgLibChanged=function(){
  const sig=PG.seg+"|"+CS.sid+"|"+CS.library.map(x=>x.id).join(",");
  if(sig===LIBSIG||DRAG)return;LIBSIG=sig;
  const l=$("#cs-plib");if(l&&!l.contains(document.activeElement))l.innerHTML=libRows();
};

/* ---------- events ---------- */
const v=$("#view-pages");
v.addEventListener("click",e=>{
  const t=e.target.closest("button,[data-pick]");if(!t||!v.contains(t))return;
  const d=t.dataset;
  if(d.page){PG.page=d.page;PG.sel=null;renderPages();return}
  if(d.goforms){setTab("forms");return}
  if(d.seg){PG.seg=d.seg;renderLeft();return}
  if(d.add){const s=srcFrom(d.add);if(s)addBlock(s);return}
  if(d.w){PG.mobile=d.w==="m";renderCenter();return}
  if(d.pick){PG.sel=d.pick;renderCenter();renderRight();return}
  if(d.mv){const p=curPage(),i=p.blocks.findIndex(b=>b.id===PG.sel),j=i+(+d.mv);if(i<0||j<0||j>=p.blocks.length)return;const x=p.blocks[i];p.blocks[i]=p.blocks[j];p.blocks[j]=x;commit();const f=document.querySelector('#cs-pc .cs-bbar [data-mv="'+d.mv+'"]');f&&f.focus();return}
  if(d.sp){const b=curBlock();if(!b)return;b.space=Math.max(0,Math.min(6,(b.space||0)+(+d.sp)));commit();return}
  if(d.fix){const p=curPage(),b=p&&p.blocks.find(x=>x.id===d.bid);
    if(d.fix==="addh1"){p.blocks.unshift({id:pid("b"),kind:"text",name:"Page heading",html:"<h1>"+rx(p.title||"Page title")+"</h1>",space:0});if(p.blocks[1])p.blocks[1].space=Math.max(p.blocks[1].space,3);PG.sel=p.blocks[0].id;commit();return}
    if(!b)return;
    if(d.fix==="lvl"){setLevel(b,d.key,+d.lv);PG.sel=b.id;commit();return}
    if(d.fix==="margin"){b.html=stripMargins(b.html).html;PG.sel=b.id;commit();return}
  }
  const a=d.act;
  if(a==="newpage"){newPage("New page");const i=$("#cs-ptitle");if(i){i.focus();i.select()}return}
  if(a==="delpage"){if(d.sure!=="1"){t.dataset.sure="1";t.textContent="Click again to delete";setTimeout(()=>{t.dataset.sure="";t.textContent="Delete page"},4000);return}
    PT.pages=pages().filter(x=>x.id!==PG.page);PG.page=null;PG.sel=null;commit();return}
  if(a==="dup"){const p=curPage(),i=p.blocks.findIndex(b=>b.id===PG.sel);if(i<0)return;const c=Object.assign({},p.blocks[i],{id:pid("b")});p.blocks.splice(i+1,0,c);PG.sel=c.id;commit();return}
  if(a==="rm"){const p=curPage(),i=p.blocks.findIndex(b=>b.id===PG.sel);if(i<0)return;p.blocks.splice(i,1);PG.sel=(p.blocks[i]||p.blocks[i-1]||{}).id||null;commit();return}
});
v.addEventListener("click",e=>{const w=e.target.closest(".cs-blk");if(!w||e.target.closest(".cs-bbar"))return;if(PG.sel!==w.dataset.bid){PG.sel=w.dataset.bid;renderCenter();renderRight()}});
v.addEventListener("change",e=>{
  const t=e.target,b=curBlock(),p=curPage();
  if(t.id==="cs-ptitle"&&p){const old=p.title,nt=t.value.trim()||"Untitled page";p.title=nt;
    /* keep the H1 in step with the page name while it still matches */
    const h=p.blocks.find(b=>/^<h1[\s>]/.test(b.html));if(h){const tt=frag(h.html),e=tt.content.querySelector("h1");if(e&&e.textContent.trim()===(old||"").trim()){e.textContent=nt;h.html=tt.innerHTML.trim()}}
    commit();return}
  if(!b)return;
  if(t.id==="cs-bn"){b.name=t.value.trim()||b.name;commit();return}
  if(t.id==="cs-bwhy"){b.why=t.value;ptSave();return}
  if(t.id==="cs-bhtml"){b.html=clean(t.value);commit();return}
  if(t.dataset.hl){setLevel(b,t.dataset.hl,+t.value);commit();return}
  if(t.dataset.prop){setRootAttr(b,t.dataset.prop,t.type==="checkbox"?t.checked:t.value.trim());commit();return}
});
/* drag and drop: palette and library rows add, blocks move */
v.addEventListener("dragstart",e=>{const d=e.target.closest&&e.target.closest("[data-drag]");if(!d)return;DRAG=d.dataset.drag;try{e.dataTransfer.setData("text/plain",DRAG);e.dataTransfer.effectAllowed=DRAG.indexOf("move:")===0?"move":"copy"}catch(x){}});
v.addEventListener("dragend",()=>{DRAG=null;v.querySelectorAll(".drop-before,.drop-after,.drop-end").forEach(x=>x.classList.remove("drop-before","drop-after","drop-end"))});
function dropTarget(e){
  const end=e.target.closest&&e.target.closest("[data-dropend]");if(end)return {el:end,at:"end"};
  const w=e.target.closest&&e.target.closest(".cs-blk");if(!w)return null;
  const r=w.getBoundingClientRect();return {el:w,at:e.clientY<r.top+r.height/2?"before":"after"};
}
v.addEventListener("dragover",e=>{if(!DRAG)return;const t=dropTarget(e);if(!t)return;e.preventDefault();
  v.querySelectorAll(".drop-before,.drop-after,.drop-end").forEach(x=>x.classList.remove("drop-before","drop-after","drop-end"));
  t.el.classList.add(t.at==="end"?"drop-end":"drop-"+t.at)});
v.addEventListener("drop",e=>{
  const t=dropTarget(e);if(!t||!DRAG)return;e.preventDefault();
  const p=curPage();let at=p?p.blocks.length:0;
  if(t.at!=="end"){const i=p.blocks.findIndex(b=>b.id===t.el.dataset.bid);at=t.at==="before"?i:i+1}
  const tok=DRAG;DRAG=null;
  if(tok.indexOf("move:")===0)moveBlock(tok.slice(5),at);else{const s=srcFrom(tok);if(s)addBlock(s,at)}
});

/* ---------- Prototype hooks: review page, engineer snapshot, kit export ---------- */
ptComposedPages=function(){
  if(!ptUsesPages())return[];
  return pages().map(p=>{
    const tags=new Set(),blocks=p.blocks.map(b=>{const a=analyze(b.html);a.tags.forEach(t=>tags.add(t));const custom=a.custom.length>0||b.kind==="custom";if(custom)tags.add("custom: "+(b.name||"unnamed"));
      return {id:b.id,kind:custom?"custom":"vads",tag:a.tags[0]||(rootEl(b.html)||{}).localName||"",name:b.name,what:b.name,why:b.why||""}});
    return {id:p.id,title:p.title||"Untitled page",src:"compose",stage:"page",cond:null,loop:null,fields:[],blocks,template:"src/templates/default/base.html",shellKey:"page",tags:[...tags]};
  });
};
ptPageCard=function(pg){
  return fel("div",{class:"pt-pg"},fel("div",{class:"pt-pg-h",style:"padding:10px 14px"},fel("span",{style:"flex:1;font-weight:600",text:pg.title||"Untitled page"}),fel("span",{class:"pill",text:(pg.blocks||[]).length+" blocks"})),
    fel("div",{class:"pt-add"},fel("button",{class:"tool",type:"button",text:"Edit in Pages",onclick:()=>{PG.page=pg.id;setTab("pages")}})));
};
const _snap=ptMountSnap;
ptMountSnap=async function(){
  if(String(PT.snap||"").indexOf("c:")!==0)return _snap();
  const old=$("#pt-snap-host");if(!old)return;
  const p=pages().find(x=>x.id===PT.snap.slice(2));
  const host=fel("div",{id:"pt-snap-host",class:"ptframe"+(PT.mobile?" mobile":"")});old.replaceWith(host);
  if(!p)return;
  const f=frameShell(p,{edit:false});host.append(f.el);mountAll(f.hosts,++PG.tok);
};
function kitPage(p){
  const L=["<!-- "+(p.title||"Page")+". From the Component Builder page composer. Place inside the main content area of src/templates/default/base.html. -->",
    '<div class="vads-grid-container">','  <div class="vads-grid-row">','    <div class="vads-grid-col-12 medium-screen:vads-grid-col-8">'];
  p.blocks.forEach((b,i)=>{L.push('      <div class="vads-u-margin-top--'+(i?b.space:0)+'">');clean(b.html).split("\n").forEach(l=>L.push("        "+l));L.push("      </div>")});
  L.push("    </div>","  </div>","</div>");return L.join("\n")+"\n";
}
const _files=ptFiles;
ptFiles=function(){
  const F=_files(),n=ptName();
  if(ptUsesPages()&&pages().length){
    pages().forEach(p=>{F[n+"/pages/"+kebab(p.title||"page")+".html"]=kitPage(p)});
    F[n+"/component-builder/pages.json"]=JSON.stringify(pages().map(p=>({title:p.title,template:"src/templates/default/base.html",blocks:p.blocks.map((b,i)=>({name:b.name,kind:b.kind,spacing:"vads-u-margin-top--"+(i?b.space:0),markup:clean(b.html),customReason:b.why||null}))})),null,2)+"\n";
  }
  return F;
};


/* ---------- Forms: save to the study library ---------- */
function ffOne(c){
  const L=rx(c.label||""),h=c.hint?' hint="'+rx(c.hint)+'"':'',r=c.required?' required':'',o=c.options||[];
  const ro=x=>'<va-radio-option label="'+rx(x.label)+'" value="'+rx(x.label)+'"'+(x.description?' description="'+rx(x.description)+'"':'')+'></va-radio-option>';
  switch(c.type){
    case"textarea":return '<va-textarea label="'+L+'"'+h+r+'></va-textarea>';
    case"radio":return '<va-radio label="'+L+'"'+h+r+'>'+o.map(ro).join("")+'</va-radio>';
    case"yesno":return '<va-radio label="'+L+'"'+h+r+'>'+ro({label:"Yes"})+ro({label:"No"})+'</va-radio>';
    case"checkbox":return '<va-checkbox-group label="'+L+'"'+h+r+'>'+o.map(x=>'<va-checkbox label="'+rx(x.label)+'" value="'+rx(x.label)+'"></va-checkbox>').join("")+'</va-checkbox-group>';
    case"select":return '<va-select label="'+L+'"'+h+r+'>'+o.map(x=>'<option value="'+rx(x.label)+'">'+rx(x.label)+'</option>').join("")+'</va-select>';
    case"date":return '<va-memorable-date label="'+L+'"'+h+r+'></va-memorable-date>';
    case"monthyear":return '<va-date label="'+L+'"'+h+r+' month-year-only></va-date>';
    case"number":return '<va-text-input label="'+L+'"'+h+r+' inputmode="numeric"></va-text-input>';
    case"currency":return '<va-text-input label="'+L+'"'+h+r+' currency inputmode="decimal"></va-text-input>';
    case"ssn":return '<va-text-input label="'+L+'"'+h+r+' inputmode="numeric" autocomplete="off" width="md"></va-text-input>';
    case"email":return '<va-text-input label="'+L+'"'+h+r+' type="email" autocomplete="email"></va-text-input>';
    case"phone":return '<va-text-input label="'+L+'"'+h+r+' type="tel" inputmode="tel" autocomplete="tel"></va-text-input>';
    case"file":return '<va-file-input label="'+L+'"'+h+'></va-file-input>';
    case"fullname":return '<va-text-input label="First name" required></va-text-input>\n<va-text-input label="Last name" required></va-text-input>';
    default:return '<va-text-input label="'+L+'"'+h+r+'></va-text-input>';
  }
}
function formParts(M){
  const parts=[];
  flatten(M).forEach(st=>{
    if(st.kind==="intro"){
      parts.push({name:"Intro: "+(M.title||"Form"),html:'<h2>'+rx(M.title||"Form")+'</h2>\n<p>'+rx(M.intro||"")+'</p>',fields:0});return;
    }
    if(st.kind!=="page")return;
    let comps=[];try{comps=compsFor(st,M)||[]}catch(e){comps=[]}
    if(!comps.length)return;
    const fields=comps.map((q,i)=>i?'<div class="vads-u-margin-top--3">'+ffOne(q)+'</div>':ffOne(q));
    parts.push({name:st.title+(st.showIf?" (conditional)":""),html:'<h2>'+rx(st.title)+'</h2>\n'+fields.join("\n"),fields:comps.length});
  });
  return parts;
}
function formRows(l){
  const ps=l.parts||[];
  let h='<div class="cs-prow"><span class="cs-pn"><span>'+rx(l.name)+'</span><span class="cs-ps">Form · '+ps.length+' block'+(ps.length===1?"":"s")+(l.sid!==CS.sid?" · from the earlier study":"")+'</span></span></div>';
  h+=ps.map((p,i)=>'<div class="cs-prow" draggable="true" data-drag="libp:'+rx(l.id)+':'+i+'" style="padding-left:28px"><span class="cs-grip" aria-hidden="true">⋮⋮</span><span class="cs-pn"><span>'+rx(p.name)+'</span><span class="cs-ps">'+(p.fields?p.fields+' field'+(p.fields===1?"":"s"):"Intro text")+'</span></span><button class="tool cs-sm" type="button" data-add="libp:'+rx(l.id)+':'+i+'" aria-label="Add '+rx(p.name)+' to the page">Add</button></div>').join("");
  return h;
}
function openFormLib(on){
  const m=$("#cs-lib-modal"),sc=$("#cs-scrim");
  if(!on){m.hidden=true;sc.hidden=true;PG.lib=null;$("#f-libsave").focus();return}
  if(!X.ST()){toast("Saving needs this page opened in Claude while you’re signed in.");return}
  const parts=formParts(FS.m);
  if(!parts.length){toast("This form has no pages with fields to save.");return}
  PG.lib={form:true,name:FS.m.title||"Untitled form",use:FS.m.intro||"",parts,fm:X.clone(FS.m)};
  renderLibModal();m.hidden=false;sc.hidden=false;setTimeout(()=>{const n=$("#cs-ln");n&&n.focus()},0);
}

/* ---------- Components: save to the study library ---------- */
function renderLibModal(){
  const m=$("#cs-lib-body");if(!m||!PG.lib)return;
  if(PG.lib.form){const F=PG.lib;$("#cs-lib-h").textContent="Save form to study library";
    m.innerHTML='<div class="fi"><label for="cs-ln">Name</label><input id="cs-ln" type="text" value="'+rx(F.name)+'"></div>'+
    '<div class="fi"><label for="cs-lu">When to use it</label><textarea id="cs-lu" rows="2" placeholder="Pages that collect a Veteran’s service records request">'+rx(F.use)+'</textarea></div>'+
    '<div class="fi"><span class="cs-lab">Saved as '+F.parts.length+' block'+(F.parts.length===1?"":"s")+' for Pages</span><ul class="cs-inside">'+F.parts.map(p=>'<li><span class="cs-tag">'+rx(p.name)+'</span><span class="fhint" style="margin:0">'+(p.fields?p.fields+' field'+(p.fields===1?"":"s"):"Intro text")+'</span></li>').join("")+'</ul>'+
    '<p class="fhint" style="margin:6px 0 0">Each form page becomes one block with its fields as VADS components. Set the heading level on the page. The full form model is saved too, so you can see what it came from.</p></div>';return}
  $("#cs-lib-h").textContent="Save to study library";
  const L=PG.lib,a=L.a;
  m.innerHTML='<div class="fi"><label for="cs-ln">Name</label><input id="cs-ln" type="text" value="'+rx(L.name)+'"></div>'+
    '<div class="fi"><label for="cs-lu">When to use it</label><textarea id="cs-lu" rows="2" placeholder="Any page where a Veteran uploads discharge papers">'+rx(L.use)+'</textarea></div>'+
    '<div class="fi"><span class="cs-lab">What’s inside</span>'+(a.tags.length||a.custom.length?'<ul class="cs-inside">'+a.tags.map(t=>'<li><span class="cs-tag">'+rx(t)+'</span><span class="pt-flag '+(a.unknown.indexOf(t)>-1?"cs-neutral":"ok")+'">'+(a.unknown.indexOf(t)>-1?"Check in Storybook":"VADS")+'</span>'+(a.deprecated.indexOf(t)>-1?'<span class="fhint" style="margin:0">Marked for deprecation on design.va.gov</span>':'')+'</li>').join("")+a.custom.map(t=>'<li><span class="cs-tag cs-tcustom">'+rx(t)+'</span><span class="pt-flag cs-warn">Not VADS</span></li>').join("")+'</ul>':'<p class="fhint" style="margin:0">No VA web components found in the production code.</p>')+'</div>'+
    '<div class="fi"><span class="cs-lab">Cleaned up for pages</span><ul class="cs-inside">'+
      '<li><span class="pt-flag ok">Done</span><span>'+(L.styles?"Motion styles stay in Components. Pages get the plain markup the Prototype Kit uses.":"No styles to remove.")+'</span></li>'+
      '<li><span class="pt-flag ok">Done</span><span>'+(L.margins?"Removed "+L.margins+" margin setting"+(L.margins===1?"":"s")+". You set spacing on the page, from the VADS scale.":"No margins of its own.")+'</span></li>'+
      '<li><span class="pt-flag '+(a.heads.length?"cs-neutral":"ok")+'">'+(a.heads.length?"Note":"Done")+'</span><span>'+(a.heads.length?a.heads.length+" heading"+(a.heads.length===1?"":"s")+" inside. You can set their levels on each page.":"No headings inside, so it won’t change the page outline.")+'</span></li></ul></div>'+
    (a.custom.length?'<div class="fi"><label for="cs-lw">Why no VADS component fits (required)</label><textarea id="cs-lw" rows="3" placeholder="I checked va-process-list and va-card. Neither shows dates on a timeline.">'+rx(PG.libWhy)+'</textarea><p class="fhint" style="margin:4px 0 0">Every page that uses it is flagged for engineer review and the design system intake.</p></div>':'');
}
function openLib(on){
  const m=$("#cs-lib-modal"),sc=$("#cs-scrim");
  if(!on){m.hidden=true;sc.hidden=true;PG.lib=null;$("#cs-libsave").focus();return}
  if(!X.ST()){toast("Saving needs this page opened in Claude while you’re signed in.");return}
  const raw=String(current.production||"");
  const styles=/<style[\s\S]*?<\/style>/i.test(raw),s=stripMargins(clean(raw));
  if(!s.html){toast("This component has no production code to save.");return}
  PG.lib={name:current.title||"Untitled component",use:current.summary||"",html:s.html,styles,margins:s.n,a:analyze(s.html)};PG.libWhy="";
  renderLibModal();m.hidden=false;sc.hidden=false;setTimeout(()=>{const n=$("#cs-ln");n&&n.focus()},0);
}
async function saveLib(){
  const L=PG.lib;if(!L)return;
  L.name=$("#cs-ln").value.trim();L.use=$("#cs-lu").value.trim();const w=$("#cs-lw");PG.libWhy=w?w.value.trim():"";
  if(!L.name){toast("Give it a name.");$("#cs-ln").focus();return}
  if(L.form){
    if(!db){toast("The library saves when this page is opened in Claude while you’re signed in.");return}
    const st=X.ST(),b=$("#cs-lib-save");b.disabled=true;
    try{
      const doc={sid:st.id,kind:"form",name:L.name,use:L.use,html:L.parts[0].html,parts:L.parts,fm:L.fm,tags:[],custom:[],why:"",source:"Forms",at:Date.now(),by:uid||null};
      if(JSON.stringify(doc).length>250000){toast("This form is too large to save to the library.");return}
      await db.collection("library").add(doc);
      await X.addLog(st,"Designer","Saved form “"+L.name+"” to the study library","","Forms");
      openFormLib(false);toast("Saved to the library. Find it under This study in Pages.");
    }catch(e){X.fail(e)}finally{b.disabled=false}
    return;
  }
  if(L.a.custom.length&&!PG.libWhy){toast("Say why no VADS component fits.");w.focus();return}
  if(!db){toast("The library saves when this page is opened in Claude while you’re signed in.");return}
  const st=X.ST(),b=$("#cs-lib-save");b.disabled=true;
  try{
    await db.collection("library").add({sid:st.id,name:L.name,use:L.use,html:L.html,tags:L.a.tags,custom:L.a.custom,why:PG.libWhy,source:"Components",at:Date.now(),by:uid||null});
    await X.addLog(st,"Designer","Saved “"+L.name+"” to the study library",L.a.custom.length?"Includes "+L.a.custom.join(", ")+": "+PG.libWhy:"","Components");
    openLib(false);toast("Saved to the library. Find it under This study in Pages.");
  }catch(e){X.fail(e)}finally{b.disabled=false}
}
$("#cs-libsave").onclick=()=>openLib(true);
$("#f-libsave").onclick=()=>openFormLib(true);
$("#cs-lib-cancel").onclick=()=>{if(PG.lib&&PG.lib.form)openFormLib(false);else openLib(false)};
$("#cs-lib-save").onclick=saveLib;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#cs-lib-modal").hidden){if(PG.lib&&PG.lib.form)openFormLib(false);else openLib(false)}});
})();


/* ---------- Boot ---------- */
const use=n=>(window.claude&&window.claude.use)?window.claude.use(n).catch(()=>null):Promise.resolve(null);
renderAll();
try{const t=localStorage.getItem("vads-tab");setTab(["build","forms","ref","proto","pages"].indexOf(t)>-1?t:"pages")}catch(e){setTab("pages")}
(async()=>{
  const [s,d,u]=await Promise.all([use("sample"),use("db"),use("user")]);
  sample=s;db=d;user=u;
  if(sample){$("#gen").disabled=false;status("Ready. Pick a starter or describe your own.");sampleReady()}
  else{status("Generating works when this page is opened in Claude. You can still explore the examples.");fstatus("Generating works when this page is opened in Claude. You can still edit and preview the example form.")}
  if(user){try{uid=await user.id()}catch(e){uid=null}}
  renderAll();
  rcBoot();
  if(window.csBoot)csBoot();
  if(db){
    db.collection("gallery").onSnapshot(snap=>{
      const out=[];snap.docs.forEach(doc=>{const items=(doc.data()&&doc.data().items)||[];items.forEach(it=>out.push({owner:doc.id,item:it}))});
      out.sort((a,b)=>(b.item.createdAt||0)-(a.item.createdAt||0));shared=out;
      $("#comm-count").textContent=String(shared.length+EXAMPLES.length);
      if(!$("#view-comm").hidden)renderCommunity();resolveNames();
    },()=>{db=null;renderCommunity();renderMeta()});
  }
})();
