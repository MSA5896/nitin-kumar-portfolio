/**
 * Quality documentation and dashboard experience.
 * Images in public/images/dashboards/ are illustrations with placeholder shapes,
 * not real company data. Replace them with your own sanitised screenshots
 * (no confidential data) and delete `illustration: true`.
 */
export const documentGroups = [
  {
    title: 'Procedures & instructions',
    items: ['SOP (Standard Operating Procedures)', 'WI (Work Instructions)', 'Control Plan'],
  },
  {
    title: 'Quality planning & analysis',
    items: ['SPC (Statistical Process Control)', 'MSA (Measurement System Analysis)', 'PPAP', 'FMEA', 'RCA (Root Cause Analysis)', 'CAPA'],
  },
  {
    title: 'Inspection reports',
    items: ['First piece inspection', 'In-process inspection', 'Final inspection', 'Incoming inspection'],
  },
]

export const dashboards = [
  {
    title: 'Rejection Analysis Dashboard',
    description: 'Rejection rate, defect Pareto, machine-wise and part-wise defects and monthly trends in one view.',
    tags: ['Pareto', 'Defect categories', 'Trends'],
    image: '/images/dashboards/rejection-analysis.svg',
    illustration: true,
  },
  {
    title: 'Vendor Analysis Dashboard',
    description: 'Vendor-wise rejection, lot acceptance, delivery performance and supplier scorecards.',
    tags: ['Supplier quality', 'Lot acceptance', 'Scorecards'],
    image: '/images/dashboards/vendor-analysis.svg',
    illustration: true,
  },
  {
    title: 'Production Analysis Dashboard',
    description: 'Output against target, shift-wise performance, yield and downtime reasons.',
    tags: ['Output vs target', 'Shift-wise', 'Downtime'],
    image: '/images/dashboards/production-analysis.svg',
    illustration: true,
  },
  {
    title: 'Customer Complaint & Growth Tracking Dashboard',
    description: 'Complaint intake, status and ageing, complaint types and closure time, tracked alongside improvement and growth over time.',
    tags: ['Complaint tracking', 'Closure time', 'Growth trend'],
    image: '/images/dashboards/complaint-growth.svg',
    illustration: true,
  },
  {
    title: 'OEE Dashboard',
    description: 'Availability, performance and quality, overall OEE, major losses and trend over time.',
    tags: ['OEE', 'Availability', 'Loss analysis'],
    image: '/images/dashboards/oee.svg',
    illustration: true,
  },
]

/** Documentation experience across the NPD (new product development) lifecycle. */
export const npdStages = [
  { title: 'Product Planning', items: ['Product Development Plan', 'Business / Market Requirement', 'Intended Use', 'User Requirements (URS)', 'Regulatory Strategy'] },
  { title: 'Design Inputs', items: ['Design Input Specification (DIS)', 'Functional Requirements', 'Performance Requirements', 'Safety Requirements', 'Regulatory Requirements', 'Applicable Standards'] },
  { title: 'Risk Management', items: ['Risk Management Plan', 'Hazard Analysis', 'Risk Analysis', 'FMEA / DFMEA', 'Risk Control', 'Risk Management Report'] },
  { title: 'Design & Development', items: ['Design Outputs', 'Drawings', 'Schematics', 'BOM', 'Software Documentation', 'Firmware', 'Specifications'] },
  { title: 'Design Reviews', items: ['Design Review Plan', 'Design Review Minutes', 'Action Items', 'Review Approval'] },
  { title: 'Verification', items: ['Verification Plan', 'Test Protocol', 'Test Reports', 'Verification Summary'] },
  { title: 'Validation', items: ['Validation Plan', 'User / Intended-use Validation', 'Software Validation', 'Process Validation', 'Validation Report'] },
  { title: 'Design Transfer', items: ['Manufacturing BOM', 'Work Instructions', 'SOPs', 'Inspection Standards', 'Production Documentation'] },
  { title: 'Production', items: ['DMR (Device Master Record)', 'DHR (Device History Record)', 'Batch / Production Records', 'Inspection Records', 'Test Records'] },
  { title: 'Design History', items: ['DHF (Design History File) / Dossier'] },
  { title: 'Post-Market', items: ['Complaint Handling', 'CAPA', 'PMS (Post-Market Surveillance)', 'Change Control', 'Periodic Review'] },
]

/** Departments worked with closely. Expand an acronym only when you are certain of its meaning. */
export const departments = [
  { name: 'SQC' },
  { name: 'IQC', full: 'Incoming Quality Control' },
  { name: 'FQC', full: 'Final Quality Control' },
  { name: 'Production' },
  { name: 'R&D' },
  { name: 'PMS' },
  { name: 'QA', full: 'Quality Assurance' },
  { name: 'QMS', full: 'Quality Management System' },
]

/** Standards worked with (experience, not certification). */
export const standards = [
  { code: 'CDSCO', title: 'Medical device regulations (India)' },
  { code: '21 CFR Part 820', title: 'US FDA Quality System Regulation' },
  { code: 'BIS', title: 'Bureau of Indian Standards' },
  { code: 'ISO 9001:2015', title: 'Quality management systems' },
  { code: 'ISO 13485', title: 'Quality management systems for medical devices' },
  { code: 'ISO 14971', title: 'Risk management for medical devices' },
]

export const auditExperience = {
  title: 'Audit representation',
  text: 'Represented the quality department in both internal and external audits of the company, including leading internal audits and external certification audits.',
}
