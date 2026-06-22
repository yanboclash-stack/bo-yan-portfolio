export const profile = {
  name: "Bo Yan",
  shortName: "BY",
  role: "Electrical Engineering Student",
  university: "University of California, Davis",
  graduation: "Expected June 2027",
  email: "boyan@ucdavis.edu",
  phone: "626-677-7078",
  location: "Davis, California",
  summary:
    "I build, test, and debug systems at the boundary of hardware and software—from sound-seeking robots to signal-processing tools.",
};

export const projects = [
  {
    id: "01",
    slug: "sound-seeking-robot",
    title: "Sound-Seeking Robot",
    subtitle: "Audio sensing translated into autonomous motion.",
    description:
      "Built and debugged an autonomous robot that detects an audio source and drives toward it using microphone inputs, op-amp circuitry, and motor control.",
    outcome:
      "Tuned the integrated hardware-software system until it reliably moved toward a sound source from approximately two feet away.",
    tags: ["Embedded Systems", "Op-Amps", "Soldering", "Motor Control"],
    accent: "#1E5BFF",
    visual: "robot",
  },
  {
    id: "02",
    slug: "audio-compression",
    title: "Python Audio Compression",
    subtitle: "Exploring the tradeoff between fidelity and data.",
    description:
      "Programmed DFT- and DCT-based audio compression workflows, then reconstructed compressed audio and evaluated the result.",
    outcome:
      "Compared retained energy, mean squared error, SNR, listening results, pitch perception, and distortion.",
    tags: ["Python", "NumPy", "SciPy", "Signal Processing"],
    accent: "#52A8FF",
    visual: "wave",
  },
  {
    id: "03",
    slug: "matlab-cloud-app",
    title: "MATLAB Cloud App",
    subtitle: "An interactive system with connected state.",
    description:
      "Developed an interactive MATLAB application with GUI controls, live display updates, player tracking, and automated turn-based logic.",
    outcome:
      "Connected ThingSpeak cloud read/write functions to the application workflow for selected online data tracking.",
    tags: ["MATLAB", "App Designer", "ThingSpeak", "GUI"],
    accent: "#2563EB",
    visual: "cloud",
  },
] as const;

export const experience = [
  {
    period: "Feb 2025 — Present",
    role: "Market Vendor / Online Storefront Support",
    company: "Family Business",
    location: "California",
    detail:
      "Track inventory and pricing, create eBay listings, answer customer messages, package orders, and support fulfillment.",
    index: "04",
  },
  {
    period: "Sep 2024 — Apr 2025",
    role: "Land Stewardship Intern",
    company: "College Corps, UC Davis",
    location: "Davis, CA",
    detail:
      "Collaborated on sustainability and campus land-stewardship projects with an emphasis on safety, planning, and team communication.",
    index: "03",
  },
  {
    period: "Jun 2024 — Sep 2025",
    role: "HVAC Technician",
    company: "Family Business",
    location: "Los Angeles, CA",
    detail:
      "Diagnosed and repaired residential HVAC systems, including compressors, fan motors, control boards, wiring, capacitors, and refrigerant systems.",
    index: "02",
  },
  {
    period: "2020 — 2024",
    role: "Sales Associate",
    company: "Joy Badminton",
    location: "Los Angeles, CA",
    detail:
      "Provided product guidance, customer service, inventory support, restocking, and point-of-sale transactions.",
    index: "01",
  },
] as const;

export const skillGroups = [
  {
    label: "Hardware",
    value: 86,
    items: ["Circuit analysis", "Soldering", "Board troubleshooting", "Multimeter testing", "Motors & control boards"],
  },
  {
    label: "Simulation + Code",
    value: 78,
    items: ["LTspice", "Cadence", "MATLAB", "Python", "NumPy / SciPy", "JavaScript basics"],
  },
  {
    label: "Signals + RF",
    value: 74,
    items: ["Signals & systems", "DSP concepts", "Electromagnetics", "Transmission lines", "Antenna fundamentals"],
  },
  {
    label: "Engineering Practice",
    value: 90,
    items: ["Organized debugging", "Test documentation", "Teamwork", "Customer communication", "Independent learning"],
  },
] as const;

export const coursework = {
  completed: ["Circuit Analysis", "Signals & Systems", "Digital Signals & Systems", "Electromagnetics I", "Electromagnetics II"],
  planned: ["RF & Microwave Engineering", "Antenna Engineering"],
  foundations: ["Electrical Measurements", "Signal Processing", "Power Conversion Fundamentals", "Controls Concepts"],
};
