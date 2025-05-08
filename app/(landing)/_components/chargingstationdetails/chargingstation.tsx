import "./chargingstation.css"

interface chargingstation {
  height: string;
  status: boolean;
}

export default function ChargingStatus({height, status}: chargingstation) {
    return (
      <div>
        <svg
          id="Layer_2"

          data-name="Layer 2"
          viewBox="0 0 82.68 229.94"
          className={`charging-svg ${height}`}
        >
          <defs>
          <linearGradient id="linear-gradient" x1="69.59" y1="62.98" x2="30.45" y2="130.76" gradientUnits="userSpaceOnUse">
      <stop offset=".53" stop-color="#940004"/>
      <stop offset=".53" stop-color="#950005"/>
      <stop offset=".6" stop-color="#bb0722"/>
      <stop offset=".67" stop-color="#d90d38"/>
      <stop offset=".74" stop-color="#ee1149"/>
      <stop offset=".8" stop-color="#fa1452"/>
      <stop offset=".87" stop-color="#ff1556"/>
    </linearGradient>
    <linearGradient id="linear-gradient-2" x1="64.47" y1="31.17" x2="38.11" y2="57.53" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#221e1e"/>
      <stop offset=".52" stop-color="#332d2d"/>
      <stop offset=".53" stop-color="#221e1e"/>
    </linearGradient>
    <linearGradient id="linear-gradient-3" x1="53.22" y1="138.54" x2="53.22" y2="175.37" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#940014"/>
      <stop offset="1" stop-color="#e90041"/>
    </linearGradient>
    <linearGradient id="linear-gradient-4" x1="69.59" y1="62.98" x2="30.45" y2="130.76" gradientUnits="userSpaceOnUse">
      <stop offset=".53" stop-color="#6a7f0b"/>
      <stop offset=".59" stop-color="#7b8f16"/>
      <stop offset=".68" stop-color="#90a323"/>
      <stop offset=".78" stop-color="#9cae2c"/>
      <stop offset=".87" stop-color="#a1b32f"/>
    </linearGradient>
    <linearGradient id="linear-gradient-5" x1="53.22" y1="138.54" x2="53.22" y2="175.37" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#81b539"/>
      <stop offset="1" stop-color="#476e1d"/>
    </linearGradient>
  </defs>
  <g id="_0" data-name="0">
    <g id="_1" data-name="1">
      <g id="_14" data-name="14">
        <g id="Axonometric_Cube" data-name="Axonometric Cube">
          <polygon id="Cube_face_-_left" data-name="Cube face - left" className="cls-8" points="24.49 229.94 0 215.8 0 208.16 24.49 222.3 24.49 229.94"/>
          <polygon id="Cube_face_-_right" data-name="Cube face - right" className="cls-3" points="82.68 196.35 24.49 229.94 24.49 222.3 82.68 188.7 82.68 196.35"/>
          <polygon id="Cube_face_-_top" data-name="Cube face - top" className="cls-4" points="24.49 222.3 0 208.16 58.18 174.56 82.68 188.7 24.49 222.3"/>
          <polygon className="cls-11" points="23.9 219.39 56.59 188.23 58.18 174.56 0 208.16 19.46 219.39 23.9 219.39"/>
        </g>
        <g className="cls-19">
          <path className={`cls-1 ${status ? "chargingavailable" : "chargingnotavailable"}`} d="m70.52,66.45c0-1.9-.68-3.25-1.76-3.88l-19.48-11.32c1.08.63,1.76,1.97,1.76,3.88l.11,38.76c.01,3.83-2.67,8.48-6,10.4l-27.7,15.99c-1.68.97-3.2,1.06-4.3.42l19.48,11.32c1.1.64,2.62.55,4.3-.42l27.7-15.99c3.33-1.92,6.01-6.57,6-10.4l-.11-38.76Z"/>
          <g className="cls-19">
            <path className="cls-2" d="m60.45,13.62L40.96,2.29c4.65-2.68,8.86-2.93,11.9-1.17l19.48,11.32c-3.04-1.77-7.25-1.52-11.9,1.17h0Z"/>
          </g>
          <polygon className="cls-17 " points="23.83 219.53 4.35 208.21 4.37 42.66 23.85 53.99 23.83 219.53"/>
          <polygon className="cls-5" points="40.52 25.12 21.03 13.8 40.96 2.29 60.45 13.62 40.52 25.12"/>
          <path className="cls-6" d="m60.45,13.62c9.24-5.33,16.74-1.05,16.77,9.56l-.02,165.55-53.37,30.81.02-165.55c-.03-10.61,7.43-23.53,16.66-28.86l19.93-11.51Zm10.18,91.59l-.11-38.76c-.01-3.83-2.71-5.38-6.04-3.46l-27.7,15.99c-3.33,1.92-6.03,6.59-6.02,10.42l.11,38.76c.01,3.83,2.73,5.36,6.06,3.44l27.7-15.99c3.33-1.92,6.01-6.57,6-10.4h0Z"/>
          <g className="cls-19">
            <path className="cls-2" d="m23.85,53.99l-19.48-11.32c-.03-10.61,7.43-23.53,16.66-28.86l19.48,11.32c-9.24,5.33-16.69,18.25-16.66,28.86h0Z"/>
          </g>
        </g>

        <g className="cls-19">
          <path className="cls-14" d="m15.17,57.72c-.24-.54-.57-1.06-.95-1.5-.32-.37-.68-.68-1.07-.9-.68-.39-1.3-.43-1.74-.17l-2.29,1.33c.44-.26,1.06-.22,1.74.17.38.22.74.53,1.07.9.38.44.71.95.95,1.5.27.61.43,1.25.42,1.84,0,.77-.27,1.32-.71,1.57l2.29-1.33c.44-.25.71-.8.71-1.57,0-.59-.16-1.23-.42-1.84Z"/>
          <path className="cls-7" d="m10.86,56.66c-1.36-.79-2.45-.15-2.46,1.4,0,1.56,1.08,3.44,2.44,4.23,1.35.78,2.45.16,2.46-1.4,0-1.55-1.09-3.45-2.44-4.23Z"/>
        </g>
        <g className="cls-19">
          <path className="cls-14" d="m15.17,74.24c-.24-.54-.57-1.06-.95-1.5-.32-.37-.68-.68-1.07-.9-.68-.39-1.3-.43-1.74-.17l-2.29,1.33c.44-.26,1.06-.22,1.74.17.38.22.74.53,1.07.9.38.44.71.96.95,1.5.27.61.43,1.25.42,1.84,0,.77-.27,1.32-.71,1.57l2.29-1.33c.44-.25.71-.8.71-1.57,0-.59-.16-1.23-.42-1.84Z"/>
          <path className="cls-7" d="m10.86,73.18c-1.36-.79-2.45-.15-2.46,1.4,0,1.56,1.08,3.44,2.44,4.23,1.35.78,2.45.16,2.46-1.4,0-1.55-1.09-3.45-2.44-4.23Z"/>
        </g>
        <g>
          <path className="cls-12" d="m62.94,46.21l-22.78,13.15c-1.14.66-2.06.27-2.06-.87v-13.26c0-1.14.92-2.6,2.06-3.25l22.78-13.15c1.14-.66,2.06-.27,2.06.87v13.26c0,1.14-.92,2.6-2.06,3.25Z"/>
          <polygon className={`cls-13 ${status ? "chargingavailablecls-13" : "chargingnotavailablecls-13"}`} points="62.14 32.71 40.97 44.93 40.97 55.75 62.14 43.53 62.14 32.71"/>
          <polygon className={`cls-9 ${status ? "chargingavailablecls-9" : "chargingnotavailablecls-9"}`} points="61.54 33.06 61.54 43.19 40.97 55.06 40.97 55.75 62.14 43.53 62.14 32.71 61.54 33.06"/>
        </g>
      </g>
    </g>
    <g>
      <g>
        <g>
          <g>
            <path className="cls-18" d="m66.21,150.24c0,5.37-2.09,11.33-5.31,16.13v-24.01l5.3-3.12v10.53c0,.16,0,.32,0,.48Z"/>
            <polygon className="cls-18" points="56.72 144.82 56.72 153.51 49.36 157.77 49.36 149.16 56.72 144.82"/>
            <path className="cls-18" d="m45.29,151.56v23.57c-3.08-1.19-5.05-4.7-5.05-9.92,0-.16,0-.31,0-.47v-10.21l5.05-2.97Z"/>
            <path className="cls-18" d="m56.72,158.68v8.7c0,2.53-1.64,5.51-3.66,6.64-.01,0-.03.01-.04.02s-.03.01-.04.02c-2.01,1.11-3.63-.04-3.63-2.54v-8.62l7.36-4.22Z"/>
          </g>
          <g>
            <path className="cls-18" d="m49.36,143.48v5.67l-4.07,2.4v-5.64c0-1.41.91-3.09,2.03-3.77h0c1.13-.67,2.04-.07,2.04,1.34Z"/>
            <path className="cls-18" d="m60.9,136.6v5.75l-4.18,2.46v-5.72c0-1.43.93-3.14,2.09-3.84h0c1.16-.69,2.1-.09,2.1,1.34Z"/>
          </g>
        </g>
        <g>
          <g>
            <g>
              <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m66.21,150.24c0,5.37-2.09,11.33-5.31,16.13v-24.01l5.3-3.12v10.53c0,.16,0,.32,0,.48Z"/>
              <polygon className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} points="56.72 144.82 56.72 153.51 49.36 157.77 49.36 149.16 56.72 144.82"/>
              <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m45.29,151.56v23.57c-3.08-1.19-5.05-4.7-5.05-9.92,0-.16,0-.31,0-.47v-10.21l5.05-2.97Z"/>
              <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m56.72,158.68v8.7c0,2.53-1.64,5.51-3.66,6.64-.01,0-.03.01-.04.02s-.03.01-.04.02c-2.01,1.11-3.63-.04-3.63-2.54v-8.62l7.36-4.22Z"/>
            </g>
            <g>
              <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m66.21,150.24c0,5.37-2.09,11.33-5.31,16.13v-24.01l5.3-3.12v10.53c0,.16,0,.32,0,.48Z"/>
              <polygon className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} points="56.72 144.82 56.72 153.51 49.36 157.77 49.36 149.16 56.72 144.82"/>
              <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m45.29,151.56v23.57c-3.08-1.19-5.05-4.7-5.05-9.92,0-.16,0-.31,0-.47v-10.21l5.05-2.97Z"/>
              <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m56.72,158.68v8.7c0,2.53-1.64,5.51-3.66,6.64-.01,0-.03.01-.04.02s-.03.01-.04.02c-2.01,1.11-3.63-.04-3.63-2.54v-8.62l7.36-4.22Z"/>
            </g>
            <g>
              <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m66.21,150.24c0,5.37-2.09,11.33-5.31,16.13v-24.01l5.3-3.12v10.53c0,.16,0,.32,0,.48Z"/>
              <polygon className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} points="56.72 144.82 56.72 153.51 49.36 157.77 49.36 149.16 56.72 144.82"/>
              <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m45.29,151.56v23.57c-3.08-1.19-5.05-4.7-5.05-9.92,0-.16,0-.31,0-.47v-10.21l5.05-2.97Z"/>
              <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m56.72,158.68v8.7c0,2.53-1.64,5.51-3.66,6.64-.01,0-.03.01-.04.02s-.03.01-.04.02c-2.01,1.11-3.63-.04-3.63-2.54v-8.62l7.36-4.22Z"/>
            </g>
          </g>
          <g>
            <g>
              <g>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m49.36,143.48v5.67l-4.07,2.4v-5.64c0-1.41.91-3.09,2.03-3.77h0c1.13-.67,2.04-.07,2.04,1.34Z"/>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m49.36,143.48v5.67l-4.07,2.4v-5.64c0-1.41.91-3.09,2.03-3.77h0c1.13-.67,2.04-.07,2.04,1.34Z"/>
              </g>
              <g>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m60.9,136.6v5.75l-4.18,2.46v-5.72c0-1.43.93-3.14,2.09-3.84h0c1.16-.69,2.1-.09,2.1,1.34Z"/>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m60.9,136.6v5.75l-4.18,2.46v-5.72c0-1.43.93-3.14,2.09-3.84h0c1.16-.69,2.1-.09,2.1,1.34Z"/>
              </g>
            </g>
            <g>
              <g>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m49.36,143.48v5.67l-4.07,2.4v-5.64c0-1.41.91-3.09,2.03-3.77h0c1.13-.67,2.04-.07,2.04,1.34Z"/>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m49.36,143.48v5.67l-4.07,2.4v-5.64c0-1.41.91-3.09,2.03-3.77h0c1.13-.67,2.04-.07,2.04,1.34Z"/>
              </g>
              <g>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m60.9,136.6v5.75l-4.18,2.46v-5.72c0-1.43.93-3.14,2.09-3.84h0c1.16-.69,2.1-.09,2.1,1.34Z"/>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m60.9,136.6v5.75l-4.18,2.46v-5.72c0-1.43.93-3.14,2.09-3.84h0c1.16-.69,2.1-.09,2.1,1.34Z"/>
              </g>
            </g>
            <g>
              <g>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m49.36,143.48v5.67l-4.07,2.4v-5.64c0-1.41.91-3.09,2.03-3.77h0c1.13-.67,2.04-.07,2.04,1.34Z"/>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m49.36,143.48v5.67l-4.07,2.4v-5.64c0-1.41.91-3.09,2.03-3.77h0c1.13-.67,2.04-.07,2.04,1.34Z"/>
              </g>
              <g>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m60.9,136.6v5.75l-4.18,2.46v-5.72c0-1.43.93-3.14,2.09-3.84h0c1.16-.69,2.1-.09,2.1,1.34Z"/>
                <path className={`cls-16 ${status ? "chargingavailablecls-16" : "chargingnotavailablecls-16"}`} d="m60.9,136.6v5.75l-4.18,2.46v-5.72c0-1.43.93-3.14,2.09-3.84h0c1.16-.69,2.1-.09,2.1,1.34Z"/>
              </g>
            </g>
          </g>
        </g>
      </g>
      <path className="cls-10" d="m60.9,142.36v20.2c-.07.14-.15.28-.23.42-1,1.81-2.17,3.43-3.46,4.84-.16.18-.33.35-.5.52v-9.66l-7.36,4.22v9.57c-.16.02-.33.03-.49.03-1.26.04-2.39-.28-3.36-.95-.07-.05-.15-.11-.22-.16v-19.83l4.07-2.4v8.61l7.36-4.26v-8.69l4.18-2.46Z"/>
    </g>
  </g>
        </svg>
      </div>
    );
  }
  