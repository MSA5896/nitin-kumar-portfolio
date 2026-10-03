/**
 * PROJECTS
 *
 * Add a project by copying an object below. Fields:
 *  slug         URL id → /projects/<slug>
 *  status       'Prototype' | 'In Development' | 'Portfolio Project' | 'Learning Project' | 'Concept'
 *  filters      any of: 'AI & Data', 'IoT', 'Robotics', 'Quality', 'Manufacturing', 'Embedded'
 *  links        { github, demo, docs } — leave '' to hide the button
 *  image        hero image path in /public (null shows a clean placeholder)
 *  imageIsIllustration  true adds a small "Illustration" tag (remove it when you use a real photo/screenshot)
 *  screenshots  [{ src: null | '/images/projects/...', caption }]
 *  architecture [{ label, detail }] rendered as a flow diagram
 *  futureArchitecture { title, note, steps } — clearly labelled as planned
 *
 * Do not add results, metrics or deployments that have not actually happened.
 */

export const projectFilters = ['All', 'AI & Data', 'IoT', 'Robotics', 'Quality', 'Manufacturing', 'Embedded']

export const projects = [
  {
    slug: 'smart-ot-environmental-monitoring',
    featured: true,
    title: 'Smart OT Environmental Monitoring System',
    product: 'MSA-OT-PRO-01',
    category: 'Healthcare IoT',
    filters: ['IoT', 'Embedded', 'AI & Data', 'Quality'],
    status: 'In Development',
    summary:
      'A Raspberry Pi based system that continuously monitors operating-theatre environmental conditions and presents them on a centralized dashboard with logging and alerts.',
    tags: ['Raspberry Pi', 'Python', 'IoT', 'SCD30', 'BME280', 'PM Sensors', 'Dashboard', 'Data Logging'],
    links: { github: '', demo: '', docs: '' },
    image: '/images/projects/smart-ot-environmental-monitoring.svg',
    imageIsIllustration: true,
    screenshots: [
      { src: null, caption: 'Monitoring dashboard' },
      { src: null, caption: 'Sensor hardware assembly' },
      { src: null, caption: 'Historical trend view' },
    ],
    disclaimer:
      'Development / prototype initiative. No regulatory approval, clinical validation, certification or hospital deployment is claimed.',
    parameters: [
      'Temperature',
      'Humidity',
      'CO2',
      'Pressure Difference',
      'Light Intensity',
      'PM1',
      'PM2.5',
      'PM10',
    ],
    problem:
      'Hospitals and critical-care environments require continuous monitoring of environmental conditions. Manual monitoring can make it difficult to maintain continuous visibility, identify abnormal conditions quickly and maintain useful historical records.',
    objective:
      'Provide continuous, centralized visibility of key environmental parameters, with historical records and timely alerts when values move outside configured limits.',
    solution:
      'A smart environmental monitoring system that continuously measures important environmental parameters at the edge and presents the information through a centralized digital monitoring system.',
    architecture: [
      { label: 'Sensors', detail: 'SCD30, BME280, PM, differential pressure and light sensors' },
      { label: 'Raspberry Pi / Edge Controller', detail: 'Reads sensors over I2C / UART' },
      { label: 'Data Processing', detail: 'Python validation, smoothing and unit handling' },
      { label: 'Database', detail: 'Time-stamped data logging' },
      { label: 'Dashboard', detail: 'Live values and historical trends' },
      { label: 'Alerts & Analytics', detail: 'Threshold-based alerts and summaries' },
    ],
    futureArchitecture: {
      title: 'Planned AI layer',
      note: 'Planned / future development. Not yet implemented.',
      steps: [
        { label: 'Sensor Data' },
        { label: 'AI / ML' },
        { label: 'Anomaly Detection' },
        { label: 'Predictive Alerts' },
        { label: 'Environmental Intelligence' },
      ],
    },
    technology: [
      'Raspberry Pi',
      'Python',
      'IoT',
      'SCD30 (CO2, temperature, humidity)',
      'BME280 (temperature, humidity, pressure)',
      'PM sensors (PM1 / PM2.5 / PM10)',
      'Pressure sensors',
      'Light sensors',
      'Dashboard',
      'Data logging',
      'Alerts',
    ],
    implementation: [
      'Explored and evaluated sensors for each monitored parameter.',
      'Raspberry Pi selected as the edge controller, with Python for acquisition.',
      'Designed the data flow from sensor reads through logging to the dashboard.',
      'Defined alert behaviour around configurable thresholds.',
    ],
    results:
      'Project is in development. Measured results will be published here once testing is complete.',
    challenges: [
      'Combining sensors with different interfaces and sampling behaviours on one controller.',
      'Accurate differential pressure measurement between rooms.',
      'Keeping readings stable and trustworthy over long periods.',
      'Designing alerts that are useful without creating alarm fatigue.',
    ],
    future: [
      'AI-based anomaly detection on historical sensor data (planned).',
      'Predictive alerts before values drift out of range (planned).',
      'Multi-room monitoring from one central dashboard.',
      'Automated periodic environmental reports.',
    ],
  },
  {
    slug: 'ai-quality-data-analyzer',
    featured: false,
    title: 'AI Quality Data Analyzer',
    category: 'Quality Analytics',
    filters: ['AI & Data', 'Quality', 'Manufacturing'],
    status: 'Portfolio Project',
    summary:
      'An AI-assisted analytics workflow that turns raw inspection data from Excel/CSV into rejection trends, Pareto charts and a plain-language management summary.',
    tags: ['Python', 'Pandas', 'Data Visualization', 'Streamlit', 'Generative AI', 'Excel'],
    links: { github: '', demo: '', docs: '' },
    image: '/images/projects/ai-quality-data-analyzer.svg',
    imageIsIllustration: true,
    screenshots: [
      { src: null, caption: 'Upload and data cleaning view' },
      { src: null, caption: 'Pareto and defect trend charts' },
    ],
    disclaimer: 'Portfolio prototype / demo built with sample data. Not connected to any company data.',
    problem:
      'Inspection data is often kept in spreadsheets and summarised manually. That takes time, and patterns across machines, parts and months are easy to miss.',
    objective:
      'Turn raw inspection data into clear quality metrics and a readable summary with minimal manual effort.',
    solution:
      'A Python workflow that cleans inspection data, computes quality metrics, visualises them and uses an AI model to draft a short written insight summary for review.',
    architecture: [
      { label: 'Excel / CSV' },
      { label: 'Python / Pandas' },
      { label: 'Data Cleaning' },
      { label: 'Quality Analysis' },
      { label: 'Visualization' },
      { label: 'AI-generated Insights' },
      { label: 'Management Report' },
    ],
    analysis: [
      'Rejection rate',
      'Defect rate',
      'Defect categories',
      'Machine-wise defects',
      'Part-wise defects',
      'Monthly trends',
      'Pareto analysis',
      'Inspection trends',
      'Process variation',
    ],
    technology: ['Python', 'Pandas', 'NumPy', 'Matplotlib / Plotly', 'Streamlit', 'AI API'],
    implementation: [
      'Column mapping and cleaning for typical inspection spreadsheets.',
      'Metric calculations for rejection rate, defect categories and trends.',
      'Charts for Pareto, machine-wise and part-wise analysis.',
      'AI prompt that summarises computed metrics only, so numbers come from code, not the model.',
    ],
    results: 'Demo project using sample data. No production results are claimed.',
    challenges: [
      'Handling inconsistent spreadsheet formats and naming.',
      'Keeping AI summaries factual and tied to computed values.',
    ],
    future: ['SPC charts and control limits', 'Downloadable PDF reports', 'Configurable defect taxonomy'],
  },
  {
    slug: 'ai-report-automation',
    featured: false,
    title: 'AI Report Automation',
    category: 'Automation',
    filters: ['AI & Data', 'Manufacturing', 'Quality'],
    status: 'Portfolio Project',
    summary:
      'Automates repetitive Excel/data reporting with Python: process the data, generate charts, add an AI-drafted summary and export a ready-to-share PDF/HTML report.',
    tags: ['Python', 'Pandas', 'Excel Automation', 'Report Automation', 'AI API', 'PDF / HTML'],
    links: { github: '', demo: '', docs: '' },
    image: '/images/projects/ai-report-automation.svg',
    imageIsIllustration: true,
    screenshots: [{ src: null, caption: 'Generated report sample' }],
    disclaimer: 'Portfolio prototype / demo built with sample data.',
    problem:
      'Weekly and monthly reports are often rebuilt by hand from the same spreadsheets: copying data, updating charts and writing the same kind of summary each time.',
    objective: 'Generate consistent, repeatable reports from raw data with one command.',
    solution:
      'A Python pipeline that reads Excel/CSV, processes the data, builds charts, adds an AI-drafted summary for human review and exports a PDF or HTML report.',
    architecture: [
      { label: 'Excel / CSV' },
      { label: 'Python' },
      { label: 'Data Processing' },
      { label: 'Charts' },
      { label: 'AI Summary' },
      { label: 'PDF / HTML Report' },
    ],
    useCases: ['QC reports', 'Production reports', 'Inspection reports', 'Management summaries', 'Weekly reports'],
    technology: ['Python', 'Pandas', 'Matplotlib', 'Jinja2 templates', 'AI API', 'PDF / HTML export'],
    implementation: [
      'Template-based report layout separated from data logic.',
      'Reusable chart functions for common report visuals.',
      'AI summary step with a review checkpoint before export.',
    ],
    results: 'Demo project. No production results are claimed.',
    challenges: ['Supporting different input formats', 'Consistent layout across PDF and HTML'],
    future: ['Scheduled report generation', 'Email delivery', 'Multi-template support'],
  },
  {
    slug: 'iot-environmental-monitoring',
    featured: false,
    title: 'IoT Environmental Monitoring',
    category: 'IoT',
    filters: ['IoT', 'Embedded', 'AI & Data'],
    status: 'Prototype',
    summary:
      'A general-purpose Raspberry Pi monitoring platform: read sensors with Python, log readings, visualise them on a dashboard and trigger alerts on thresholds.',
    tags: ['Raspberry Pi', 'Sensors', 'Python', 'Data Logging', 'Dashboard', 'Alerts'],
    links: { github: '', demo: '', docs: '' },
    image: '/images/projects/iot-environmental-monitoring.svg',
    imageIsIllustration: true,
    screenshots: [
      { src: null, caption: 'Hardware setup' },
      { src: null, caption: 'Dashboard screenshot' },
    ],
    problem:
      'Many small facilities and labs need simple, low-cost visibility of environmental conditions, without an expensive commercial system.',
    objective: 'Build a reusable sensor-to-dashboard pipeline that can be adapted to different environments.',
    solution:
      'Python on Raspberry Pi reads connected sensors, stores time-stamped readings and serves a dashboard with threshold alerts.',
    architecture: [
      { label: 'Sensors', detail: 'Temperature, humidity, air quality' },
      { label: 'Raspberry Pi', detail: 'Python acquisition' },
      { label: 'Data Logging', detail: 'Time-stamped storage' },
      { label: 'Dashboard', detail: 'Live and historical view' },
      { label: 'Alerts', detail: 'Threshold notifications' },
    ],
    technology: ['Raspberry Pi', 'Python', 'I2C / UART sensors', 'SQLite / CSV logging', 'Web dashboard'],
    implementation: [
      'Sensor reading scripts over I2C and UART.',
      'Logging of readings with timestamps.',
      'Dashboard for current and historical values.',
      'Configurable threshold alerts.',
    ],
    results: 'Prototype stage. Results will be added after testing.',
    challenges: ['Sensor calibration and drift', 'Reliable long-running operation'],
    future: ['Remote access', 'Multi-node support with ESP32', 'Anomaly detection (planned)'],
  },
  {
    slug: 'arduino-day-night-rain-detection',
    featured: false,
    title: 'Arduino Smart Day/Night & Rain Detection',
    category: 'Embedded',
    filters: ['Embedded', 'IoT'],
    status: 'Learning Project',
    summary:
      'An Arduino circuit that detects day/night with an LDR and rainfall with a rain sensor, signalling each state with LEDs and a buzzer.',
    tags: ['Arduino', 'LDR', 'Rain Sensor', 'LEDs', 'Buzzer', 'Embedded C++'],
    links: { github: '', demo: '', docs: '' },
    image: '/images/projects/arduino-day-night-rain-detection.svg',
    imageIsIllustration: true,
    screenshots: [
      { src: null, caption: 'Circuit / breadboard photo' },
      { src: null, caption: 'Wiring diagram' },
    ],
    disclaimer: 'Hands-on learning build. No laboratory validation is claimed.',
    problem: 'Demonstrate simple, automatic environmental sensing and indication using low-cost components.',
    objective: 'Detect light level and rainfall, and indicate each condition clearly with visual and audible outputs.',
    solution:
      'An LDR reading determines day or night, a rain sensor detects water, and the Arduino drives LEDs and a buzzer accordingly.',
    components: ['Arduino', 'LDR', 'Rain sensor', 'Red LED', 'Green LED', 'Buzzer'],
    behavior: [
      { condition: 'Day', output: 'Red LED (or indicator as configured)' },
      { condition: 'Night', output: 'Green LED (or indicator as configured)' },
      { condition: 'Rain detected', output: 'Rain indicator and buzzer' },
    ],
    architecture: [
      { label: 'LDR + Rain Sensor' },
      { label: 'Arduino Analog / Digital Inputs' },
      { label: 'Threshold Logic' },
      { label: 'LEDs + Buzzer' },
    ],
    technology: ['Arduino', 'Arduino IDE (C++)', 'LDR', 'Rain sensor module', 'LEDs', 'Buzzer'],
    implementation: [
      'Read LDR value through an analog input and compare it with a light threshold.',
      'Read the rain sensor and trigger the rain indicator and buzzer.',
      'Drive LEDs to indicate day or night.',
    ],
    results: 'Working learning build. No formal testing or validation is claimed.',
    challenges: ['Choosing stable light thresholds', 'Avoiding buzzer chatter near the threshold'],
    future: ['Hysteresis on thresholds', 'Wi-Fi notifications with ESP32'],
  },
  {
    slug: 'ros2-robotics',
    featured: false,
    title: 'ROS2 Robotics',
    category: 'Robotics',
    filters: ['Robotics', 'Embedded'],
    status: 'Learning Project',
    summary:
      'Hands-on work with ROS2 fundamentals: workspaces, nodes, topics, services, actions and launch files, applied toward robotics and mechatronics integration.',
    tags: ['ROS2', 'Python', 'Robotics', 'Mechatronics', 'Linux'],
    links: { github: '', demo: '', docs: '' },
    image: '/images/projects/ros2-robotics.svg',
    imageIsIllustration: true,
    screenshots: [
      { src: null, caption: 'ROS2 node graph (rqt_graph)' },
      { src: null, caption: 'Terminal / launch output' },
    ],
    disclaimer: 'Learning and experimental work. Completed and in-progress items are listed separately below.',
    problem: 'Build a solid foundation in ROS2, the standard framework for modern robot software.',
    objective: 'Understand ROS2 communication patterns and apply them toward robot integration.',
    solution: 'Structured practice with ROS2 concepts, building small nodes and connecting them into working systems.',
    progress: {
      completed: [
        'ROS2 workspace setup and package creation',
        'Writing publisher and subscriber nodes',
        'Working with topics and message types',
      ],
      learning: [
        'Services and actions',
        'Launch files for multi-node systems',
        'Robot integration and hardware interfaces',
      ],
    },
    architecture: [
      { label: 'Sensor / Input Node' },
      { label: 'Topics' },
      { label: 'Processing Node' },
      { label: 'Services / Actions' },
      { label: 'Actuator / Output Node' },
    ],
    technology: ['ROS2', 'Python (rclpy)', 'Linux', 'Launch files'],
    implementation: [
      'Created a ROS2 workspace and packages.',
      'Built nodes that communicate over topics.',
      'Exploring services, actions and launch files.',
    ],
    results: 'Learning project. No production results are claimed.',
    challenges: ['Understanding the ROS2 build and package system', 'Designing clean node boundaries'],
    future: ['Simulation with Gazebo', 'Connecting ROS2 to real sensors and actuators'],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
