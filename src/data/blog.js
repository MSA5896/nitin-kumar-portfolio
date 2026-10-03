/**
 * TECHNICAL NOTES (blog)
 *
 * Add a post by copying an object. Fields:
 *  slug      URL id → /notes/<slug>
 *  status    'Draft' | 'Published'  (Drafts show a clear "Draft" banner)
 *  date      'YYYY-MM-DD' or null
 *  image     cover image path in /public/images/blog/ or null
 *  sections  [{ heading, paragraphs: [], points: [] }]
 *
 * These starter posts are outlines. Expand them before marking 'Published'.
 */
export const posts = [
  {
    slug: 'ai-automation-in-manufacturing',
    title: 'AI Automation in Manufacturing',
    summary: 'Where AI-assisted automation can realistically help on a manufacturing floor, and where it should not be used.',
    status: 'Draft',
    date: null,
    tags: ['AI', 'Manufacturing', 'Automation'],
    image: null,
    sections: [
      {
        heading: 'Why this topic',
        paragraphs: [
          'Manufacturing teams generate large amounts of routine documentation and data. Some of that work is repetitive and well suited to automation.',
        ],
      },
      {
        heading: 'Practical starting points',
        points: [
          'Summarising inspection and shift data',
          'Drafting routine reports for human review',
          'Classifying free-text defect descriptions',
          'Searching internal procedures and documents',
        ],
      },
      {
        heading: 'Where caution is needed',
        paragraphs: [
          'In regulated environments, AI output should support people, not replace verification. Numbers should come from code, and final decisions stay with qualified staff.',
        ],
      },
      { heading: 'To be written', paragraphs: ['Worked example and lessons learned.'] },
    ],
  },
  {
    slug: 'python-for-quality-data-analysis',
    title: 'Using Python for Quality Data Analysis',
    summary: 'A step-by-step approach to turning inspection spreadsheets into rejection trends and Pareto charts with Pandas.',
    status: 'Draft',
    date: null,
    tags: ['Python', 'Pandas', 'Quality'],
    image: null,
    sections: [
      {
        heading: 'Outline',
        points: [
          'Loading and cleaning inspection data',
          'Calculating rejection and defect rates',
          'Pareto analysis of defect categories',
          'Machine-wise and part-wise breakdowns',
          'Monthly trend charts',
        ],
      },
      { heading: 'To be written', paragraphs: ['Code walkthrough with a sample dataset.'] },
    ],
  },
  {
    slug: 'raspberry-pi-environmental-monitoring',
    title: 'Raspberry Pi Environmental Monitoring',
    summary: 'Building a sensor-to-dashboard monitoring pipeline with a Raspberry Pi, I2C sensors and Python.',
    status: 'Draft',
    date: null,
    tags: ['Raspberry Pi', 'IoT', 'Sensors'],
    image: null,
    sections: [
      {
        heading: 'Outline',
        points: [
          'Choosing sensors (SCD30, BME280, PM sensors)',
          'Wiring and I2C basics',
          'Reading sensors with Python',
          'Logging data with timestamps',
          'Building a simple dashboard and alerts',
        ],
      },
      { heading: 'To be written', paragraphs: ['Build notes, wiring photos and code samples.'] },
    ],
  },
  {
    slug: 'ai-assisted-qc-reporting',
    title: 'AI-Assisted QC Reporting',
    summary: 'Combining Python calculations with AI-drafted summaries to speed up QC reporting while keeping numbers reliable.',
    status: 'Draft',
    date: null,
    tags: ['AI', 'Reporting', 'Quality'],
    image: null,
    sections: [
      {
        heading: 'Outline',
        points: [
          'What a typical QC report contains',
          'Separating calculation from narrative',
          'Prompting an AI model with computed metrics only',
          'Human review before distribution',
        ],
      },
      { heading: 'To be written', paragraphs: ['Example pipeline and template.'] },
    ],
  },
  {
    slug: 'introduction-to-ros2-for-engineers',
    title: 'Introduction to ROS2 for Engineers',
    summary: 'ROS2 concepts explained for mechanical and manufacturing engineers: nodes, topics, services, actions and launch files.',
    status: 'Draft',
    date: null,
    tags: ['ROS2', 'Robotics'],
    image: null,
    sections: [
      {
        heading: 'Outline',
        points: [
          'What ROS2 is and why it is used',
          'Workspaces and packages',
          'Nodes and topics',
          'Services and actions',
          'Launch files',
        ],
      },
      { heading: 'To be written', paragraphs: ['Simple examples with Python (rclpy).'] },
    ],
  },
]

export const getPost = (slug) => posts.find((p) => p.slug === slug)
