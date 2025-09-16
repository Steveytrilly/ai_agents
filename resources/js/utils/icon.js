export class icons {
    constructor() {
        var height = 60;
        var width = 60;
        var color = "#222";
    }

    loader(height = 14, width = 14, color = "#000") {
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" style="margin:auto;background:transparent;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"> <g transform="rotate(0 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="10" fill="transparent"> <animate attributeName="opacity" values="10" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(30 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${color}"> <animate attributeName="opacity" values="10" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(60 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${color}"> <animate attributeName="opacity" values="10" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(90 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${color}"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(120 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${color}"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(150 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${color}"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(180 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${color}"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(210 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${color}"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(240 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${color}"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(270 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${color}"> <animate attributeName="opacity" values="10" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(300 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${color}"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate> </rect> </g><g transform="rotate(330 50 50)"> <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="${color}"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate> </rect> </g> </svg>`;
    }

    star(height = 14, width = 14, color = "#000") {
        return `<svg width="${width}" height="${height}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="star"><path d="m29.911 13.75-6.229 6.072 1.471 8.576c.064.375-.09.754-.398.978-.174.127-.381.191-.588.191-.159 0-.319-.038-.465-.115l-7.702-4.049-7.701 4.048c-.336.178-.745.149-1.053-.076-.308-.224-.462-.603-.398-.978l1.471-8.576-6.23-6.071c-.272-.266-.371-.664-.253-1.025s.431-.626.808-.681l8.609-1.25 3.85-7.802c.337-.683 1.457-.683 1.794 0l3.85 7.802 8.609 1.25c.377.055.69.319.808.681s.019.758-.253 1.025z"  fill="${color}"/></g></svg>
			  `;
    }

    check(height = 14, width = 14, color = "#000") {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="${color}" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;
    }

    edit(height = 14, width = 14, color = "#000") {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="${color}" viewBox="0 0 12 12" >
		<path d="M6 10H10.5" stroke="#C6CCD8" stroke-linecap="round" stroke-linejoin="round" />
		<path
		  d="M8.25 1.75011C8.44891 1.5512 8.7187 1.43945 9 1.43945C9.13929 1.43945 9.27721 1.46689 9.4059 1.52019C9.53458 1.57349 9.65151 1.65162 9.75 1.75011C9.84849 1.8486 9.92662 1.96553 9.97992 2.09422C10.0332 2.2229 10.0607 2.36083 10.0607 2.50011C10.0607 2.6394 10.0332 2.77733 9.97992 2.90601C9.92662 3.0347 9.84849 3.15162 9.75 3.25011L3.5 9.50011L1.5 10.0001L2 8.00011L8.25 1.75011Z"
		  stroke="#C6CCD8" stroke-linecap="round" stroke-linejoin="round" />
	  </svg>`;
    }

    delete(height = 14, width = 14, color = "#000") {
        return `  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="${color}" viewBox="0 0 12 12">
		<path d="M1.5 3H2.5H10.5" stroke="#C6CCD8" stroke-linecap="round" stroke-linejoin="round" />
		<path
		  d="M9.5 3V10C9.5 10.2652 9.39464 10.5196 9.20711 10.7071C9.01957 10.8946 8.76522 11 8.5 11H3.5C3.23478 11 2.98043 10.8946 2.79289 10.7071C2.60536 10.5196 2.5 10.2652 2.5 10V3M4 3V2C4 1.73478 4.10536 1.48043 4.29289 1.29289C4.48043 1.10536 4.73478 1 5 1H7C7.26522 1 7.51957 1.10536 7.70711 1.29289C7.89464 1.48043 8 1.73478 8 2V3"
		  stroke="#C6CCD8" stroke-linecap="round" stroke-linejoin="round" />
		<path d="M5 5.5V8.5" stroke="#C6CCD8" stroke-linecap="round" stroke-linejoin="round" />
		<path d="M7 5.5V8.5" stroke="#C6CCD8" stroke-linecap="round" stroke-linejoin="round" />
	  </svg>`;
    }

    remove(height = 14, width = 14, color = "#000") {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="${color}" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
    }

    voice(height = 14, width = 14, color = "#575566", background = "#313133") {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 40 40" fill="none">
		<rect width="40" height="40" rx="12" fill="${background}"/>
		<path d="M24.375 13C24.375 10.5838 22.4163 8.625 20 8.625C17.5838 8.625 15.625 10.5838 15.625 13V20C15.625 22.4163 17.5838 24.375 20 24.375C22.4163 24.375 24.375 22.4163 24.375 20V13Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M20 27.875V31.375" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M27.8314 20.875C27.6044 22.7925 26.6818 24.5602 25.2384 25.8428C23.795 27.1254 21.9311 27.8338 20.0002 27.8338C18.0692 27.8338 16.2054 27.1254 14.762 25.8428C13.3186 24.5602 12.396 22.7925 12.1689 20.875" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	  </svg>`;
    }

    attachment(
        height = 14,
        width = 14,
        color = "#575566",
        background = "#313133"
    ) {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="12" fill="${background}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5164 12.1118C26.307 12.8956 26.75 14.0132 26.75 15.3441L26.75 22.2993C26.75 25.9667 23.6538 29 19.9733 29C16.2428 29 13.25 25.8074 13.25 22.1903L13.25 15.4461C13.25 14.7301 13.8349 14.1497 14.5565 14.1497C15.278 14.1497 15.8629 14.7301 15.8629 15.4461L15.8629 22.1903C15.8629 24.4609 17.7706 26.4071 19.9733 26.4071C22.2259 26.4071 24.1371 24.5197 24.1371 22.2993L24.1371 15.3441C24.1371 14.5964 23.8996 14.1741 23.6696 13.946C23.4295 13.708 23.1022 13.5849 22.7535 13.5933C22.1222 13.6085 21.3065 14.0796 21.3065 15.4531V22.1903C21.3065 22.9063 20.7215 23.4868 20 23.4868C19.2785 23.4868 18.6935 22.9063 18.6935 22.1903V15.4531C18.6935 12.7135 20.5995 11.0515 22.6901 11.0012C23.7022 10.9768 24.7358 11.3379 25.5164 12.1118Z" fill="#575566"/>
        </svg>`;
    }

    send(height = 14, width = 14, color = "#0000", background = "#313133") {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 40 40" fill="none">
		<rect width="40" height="40" rx="12" fill="${background}"/>
		<path d="M33.3306 20.4009C33.3437 19.4682 32.838 18.6128 32.0184 18.1633L12.92 7.66861C12.0636 7.18604 11.0551 7.24544 10.25 7.79495C9.42908 8.35467 9.00799 9.68801 9.23747 10.6504L11.0214 18.1196C11.2035 18.8865 11.8891 19.4258 12.6778 19.4225L23.3066 19.3895C23.8518 19.3777 24.2932 19.8191 24.2814 20.3643C24.2806 20.8984 23.8448 21.3343 23.3005 21.3452L12.6626 21.3689C11.8729 21.3714 11.1849 21.9122 10.9962 22.6803L9.1502 30.1801C8.92699 31.0655 9.18161 31.9512 9.80695 32.5765C9.88052 32.6501 9.96329 32.7328 10.047 32.7962C10.8559 33.4219 11.9175 33.5007 12.823 33.0182L31.9862 22.6282C32.8085 22.1921 33.3185 21.3326 33.3306 20.4009Z" fill="${color}"/>
	  </svg>`;
    }

    image(height = 14, width = 14, color = "#0000", background = "#313133") {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"/></svg>`;
    }

    regen() {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
		<path d="M0.791992 3.33325V8.33325H5.54199" stroke="#C6CCD8" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M18.208 16.6667V11.6667H13.458" stroke="#C6CCD8" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M16.2216 7.49998C15.8201 6.30564 15.1377 5.23782 14.2381 4.39616C13.3385 3.55451 12.251 2.96645 11.0771 2.68686C9.9032 2.40727 8.68115 2.44527 7.52497 2.79729C6.36879 3.14932 5.31617 3.80391 4.46533 4.69998L0.791992 8.33331M18.2087 11.6666L14.5353 15.3C13.6845 16.1961 12.6319 16.8506 11.4757 17.2027C10.3195 17.5547 9.09745 17.5927 7.92355 17.3131C6.74965 17.0335 5.66217 16.4455 4.76257 15.6038C3.86297 14.7621 3.18058 13.6943 2.77908 12.5" stroke="#C6CCD8" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
	  </svg>`;
    }
    chevup(height = 14, width = 14, color = "#575566", background = "#313133") {
        return `
        <svg width="${width}" height="${height}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="12" fill="${background}"/>
           <path fill-rule="evenodd" clip-rule="evenodd" d="M29.4142 25.4142C28.6332 26.1953 27.3668 26.1953 26.5858 25.4142L20 18.8284L13.4142 25.4142C12.6332 26.1953 11.3668 26.1953 10.5858 25.4142C9.80474 24.6332 9.80474 23.3668 10.5858 22.5858L18.5858 14.5858C19.3668 13.8047 20.6332 13.8047 21.4142 14.5858L29.4142 22.5858C30.1953 23.3668 30.1953 24.6332 29.4142 25.4142Z" fill="${color}"/>
        </svg>
        `;
    }
    chevdown(
        height = 14,
        width = 14,
        color = "#575566",
        background = "#313133"
    ) {
        return `
        <svg
        width="${width}" height="${height}"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="40" height="40" rx="12" fill="#705CF6" />
        <g clip-path="url(#clip0_2213_26157)">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.5858 14.5858C11.3668 13.8047 12.6332 13.8047 13.4142 14.5858L20 21.1716L26.5858 14.5858C27.3668 13.8047 28.6332 13.8047 29.4142 14.5858C30.1953 15.3668 30.1953 16.6332 29.4142 17.4142L21.4142 25.4142C20.6332 26.1953 19.3668 26.1953 18.5858 25.4142L10.5858 17.4142C9.80474 16.6332 9.80474 15.3668 10.5858 14.5858Z"
                fill="white"
            />
        </g>

    </svg>
    `;
    }

    dashboard(
        height = 56,
        width = 56,
        color = "#575566",
        background = "#313133"
    ) {
        return `<svg width="${width}" height="${height}" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.8995 5.30526H33.5879C35.3246 5.30526 36.7474 6.72667 36.7474 8.50073V14.2372C36.7474 16.0113 35.3246 17.4327 33.5879 17.4327H27.8995C26.1628 17.4327 24.74 16.0113 24.74 14.2372V8.50073C24.74 6.72667 26.1628 5.30526 27.8995 5.30526Z" stroke="${color}" stroke-width="2.21053"/>
        <path d="M14.2057 24.5673C15.9424 24.5673 17.3652 25.9887 17.3652 27.7628V33.4993C17.3652 35.272 15.9421 36.6947 14.2057 36.6947H8.51728C6.78091 36.6947 5.35783 35.272 5.35783 33.4993V27.7628C5.35783 25.9887 6.78064 24.5673 8.51728 24.5673H14.2057ZM33.5878 24.5673C35.3245 24.5673 36.7473 25.9887 36.7473 27.7628V33.4993C36.7473 35.272 35.3242 36.6947 33.5878 36.6947H27.8994C26.163 36.6947 24.74 35.272 24.74 33.4993V27.7628C24.74 25.9887 26.1628 24.5673 27.8994 24.5673H33.5878ZM14.2057 5.30526C15.9424 5.30526 17.3652 6.72667 17.3652 8.50074V14.2372C17.3652 16.0113 15.9424 17.4327 14.2057 17.4327H8.51728C6.78064 17.4327 5.35783 16.0113 5.35783 14.2372V8.50074C5.35783 6.72667 6.78064 5.30526 8.51728 5.30526H14.2057Z" stroke="${color}" stroke-width="2.21053"/>
        </svg>`;
    }

    chat(height = 56, width = 56, color = "#575566", background = "#313133") {
        return `<svg width="${width}" height="${height}" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.9167 32.3381L6.9102 29.0115C7.14898 28.3162 7.12502 27.5149 6.71986 26.8364C5.48689 24.5608 4.80005 22.0975 4.80005 19.7376C4.80005 12.2478 10.7858 5.51477 19.0305 5.51477C27.0883 5.51477 33.2001 12.1219 33.2001 19.6919C33.2001 28.4562 26.0661 33.9148 19 33.9148C16.669 33.9148 14.0855 33.2848 12.0367 32.0777C11.2887 31.6233 10.2669 31.0113 8.95968 31.4329L5.9167 32.3381Z" stroke="${color}" stroke-width="2"/>
        <path d="M14.7243 17.34C16.0412 17.34 17.0985 18.3988 17.0985 19.7177C17.0985 21.0181 16.0412 22.0769 14.7243 22.0955C13.4259 22.0955 12.3501 21.0181 12.3501 19.7177C12.3501 18.3988 13.4074 17.34 14.7243 17.34ZM23.2759 17.34C24.5928 17.34 25.6501 18.3988 25.6501 19.7177C25.6501 21.0181 24.5928 22.0955 23.2759 22.0955C21.959 22.0769 20.9017 21.0181 20.9017 19.6992C20.9017 18.3988 21.9775 17.3214 23.2759 17.34Z" fill="${color}"/>
        </svg>`;
    }

    wizard(height = 56, width = 56, color = "#575566", background = "#313133") {
        return `<svg width="${width}" height="${height}"  viewBox="0 0 38 39" fill="none">
  <g clip-path="url(#clip0_7178_1044)">
    <path d="M20.3114 18.9244L12.5065 32.4429M11.5838 24.3969L6.03095 24.5627C5.42002 24.5809 5.02682 23.9218 5.33111 23.3925L8.37139 18.1266C8.57562 17.7728 8.9113 17.5116 9.30711 17.4023L13.9786 16.1069M18.4408 9.16856C22.5627 10.6114 26.385 12.8182 29.6955 15.6664M19.9343 29.2194L22.5672 34.1112C22.8569 34.6494 23.6243 34.6603 23.9305 34.1322L26.9708 28.8662C27.175 28.5125 27.2335 28.0911 27.1302 27.6937L25.9163 23.0004M29.9331 12.9763L29.5806 6.78656C29.4848 5.10217 27.6951 4.06887 26.1885 4.82815L20.6518 7.61768C19.0212 8.43925 17.6669 9.71858 16.7555 11.2995L13.2335 17.3976C11.8899 19.7246 11.3332 22.4243 11.6443 25.0935L11.6573 25.208C11.8582 26.9111 12.8504 28.4183 14.3346 29.2765C15.8184 30.1332 17.6213 30.2384 19.1963 29.5594L19.3019 29.5133C21.7695 28.4497 23.8287 26.6162 25.1722 24.2892L28.6927 18.1915C29.6061 16.6117 30.0369 14.7991 29.9331 12.9763Z" stroke="${color}" stroke-width="2.21053" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_7178_1044">
      <rect width="38" height="38" fill="${background}" transform="translate(0 0.25)"/>
    </clipPath>
  </defs>
</svg>`;
    }

    dfy(height = 56, width = 56, color = "#575566", background = "#313133") {
        return `<svg width="${width}" height="${height}" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.4184 5.51477H25.5969C27.9303 5.51477 29.8096 6.32825 31.1077 7.68698C32.4097 9.04976 33.2001 11.0383 33.2001 13.5132V25.9316C33.2001 28.3981 32.4102 30.3829 31.1081 31.744C29.8098 33.1012 27.9303 33.9148 25.5969 33.9148H12.4184C10.0848 33.9148 8.20097 33.1011 6.8987 31.7431C5.59294 30.3815 4.80005 28.3969 4.80005 25.9316V13.5132C4.80005 11.0395 5.59339 9.0511 6.89912 7.68789C8.20126 6.32841 10.0848 5.51477 12.4184 5.51477Z" stroke="${color}" stroke-width="2"/>
        <path d="M17.196 24.6518C16.8555 24.6518 16.5151 24.5226 16.2551 24.2627L12.6482 20.6557C12.1283 20.1359 12.1283 19.2938 12.6482 18.7755C13.168 18.2556 14.0086 18.2541 14.5284 18.7739L17.196 21.4415L23.4706 15.167C23.9904 14.6471 24.831 14.6471 25.3508 15.167C25.8707 15.6868 25.8707 16.5289 25.3508 17.0487L18.1369 24.2627C17.877 24.5226 17.5365 24.6518 17.196 24.6518Z" fill="${color}"/>
        </svg>`;
    }

    client(height = 56, width = 56, color = "#575566", background = "#313133") {
        return `<svg width="${width}" height="${height}" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.4107 10.2493H26.4493L26.4878 10.2464C28.215 10.1128 29.929 10.6304 31.2917 11.6961C31.4252 11.8106 31.5495 11.9353 31.6635 12.0691L31.6649 12.0708C32.069 12.5433 32.3815 13.0864 32.5867 13.6725C33.0322 15.01 33.2384 16.4154 33.1958 17.8242L33.1954 17.8393V17.8544V25.8374C33.1935 26.4603 33.1476 27.0823 33.058 27.6987C32.8931 28.7422 32.5256 29.7436 31.9761 30.6468L31.9704 30.6561L31.9649 30.6656C31.7271 31.0763 31.4392 31.4561 31.1079 31.7962C29.507 33.256 27.386 34.0157 25.2188 33.904L25.1931 33.9027H25.1673H12.8146H12.7891L12.7636 33.904C10.5932 34.0148 8.46902 33.2562 6.86254 31.7979C6.53641 31.458 6.25339 31.0794 6.01984 30.6706L6.01358 30.6596L6.00704 30.6488C5.46165 29.7478 5.10289 28.7468 4.95188 27.7052L4.95063 27.6965L4.94922 27.6879C4.84971 27.0771 4.80005 26.4588 4.80005 25.839V17.8544C4.80005 17.2272 4.83354 16.6009 4.90103 15.9781C4.91146 15.9011 4.92508 15.8328 4.94408 15.7374C4.95261 15.6946 4.96222 15.6463 4.97312 15.5893C4.99993 15.4493 5.03289 15.2618 5.04129 15.0535C5.16484 14.3717 5.38155 13.7098 5.68549 13.0865L5.68898 13.0793L5.69236 13.0721C6.12798 12.1413 6.77627 11.4591 7.68689 10.9951C8.61724 10.521 9.87331 10.2493 11.5442 10.2493H26.4107ZM26.7869 21.5886V21.5885H26.7756H11.355C10.1104 21.5885 9.09806 22.5959 9.09806 23.8429C9.09806 25.0898 10.1104 26.0972 11.355 26.0972H26.6625C27.2559 26.1165 27.8337 25.9013 28.27 25.4973C28.7085 25.0913 28.9678 24.528 28.9909 23.931C29.0213 23.3942 28.8475 22.8662 28.5054 22.4523C28.0968 21.9152 27.4627 21.5962 26.7869 21.5886Z" stroke="${color}" stroke-width="2"/>
        </svg>`;
    }

    starGrad() {
        return `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5379 3.30992C10.7087 2.89927 11.2905 2.89927 11.4613 3.30992L13.5009 8.2138C13.5729 8.38692 13.7357 8.5052 13.9226 8.52019L19.2168 8.94462C19.6601 8.98016 19.8399 9.53341 19.5021 9.82275L15.4685 13.2779C15.3261 13.3999 15.2639 13.5913 15.3074 13.7737L16.5398 18.9399C16.6429 19.3725 16.1723 19.7144 15.7928 19.4826L11.2602 16.7141C11.1002 16.6164 10.899 16.6164 10.739 16.7141L6.20645 19.4826C5.8269 19.7144 5.35627 19.3725 5.45946 18.9399L6.69179 13.7737C6.7353 13.5913 6.67311 13.3999 6.53072 13.2779L2.49713 9.82275C2.15936 9.53341 2.33912 8.98016 2.78245 8.94462L8.0766 8.52019C8.2635 8.5052 8.4263 8.38692 8.49831 8.2138L10.5379 3.30992Z" stroke="url(#paint0_linear_1103_5452)" stroke-width="1.67"/>
        <defs>
        <linearGradient id="paint0_linear_1103_5452" x1="0.999633" y1="1.99994" x2="31.9996" y2="36.9999" gradientUnits="userSpaceOnUse">
        <stop offset="0.100048" stop-color="var(--primary)"/>
        <stop offset="1" stop-color="#EC4899"/>
        </linearGradient>
        </defs>
        </svg>`;
    }

    checkGrad() {
        return ` <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
         >
        <path
            d="M18.0275 4.50113C17.3326 4.13804 16.5575 4.83828 16.1031 5.25324C15.0608 6.23876 14.1788 7.37989 13.1898 8.41728C12.0939 9.55841 11.0783 10.6995 9.95571 11.8148C9.31424 12.4372 8.61931 13.1115 8.19167 13.8896C7.22946 12.9818 6.4009 11.9963 5.33178 11.1923C4.55667 10.6218 3.27373 10.2068 3.30046 11.5814C3.35392 13.3709 4.98432 15.2901 6.18707 16.509C6.6949 17.0277 7.3631 17.5723 8.13821 17.5982C9.07369 17.6501 10.0359 16.5608 10.5972 15.9643C11.5862 14.927 12.388 13.7598 13.2967 12.6966C14.4727 11.2961 15.6755 9.9215 16.8248 8.49509C17.5464 7.6133 19.8183 5.43474 18.0275 4.50113Z"
            fill="var(--primary)"
        />
       </svg>`;
    }
}
