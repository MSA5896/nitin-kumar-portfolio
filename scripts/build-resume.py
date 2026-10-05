"""Builds public/resume.pdf (2 pages, ATS-friendly text). Run: python scripts/build-resume.py"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether, PageBreak

INK, MUTED, ACC = HexColor('#1a2233'), HexColor('#4a5568'), HexColor('#0b6b8a')
base = ParagraphStyle('b', fontName='Helvetica', fontSize=9.1, leading=12.3, textColor=INK)
S = {
    'name': ParagraphStyle('n', parent=base, fontName='Helvetica-Bold', fontSize=22, leading=26),
    'role': ParagraphStyle('r', parent=base, fontSize=10.5, leading=14, textColor=ACC, fontName='Helvetica-Bold'),
    'contact': ParagraphStyle('c', parent=base, fontSize=8.8, textColor=MUTED),
    'h': ParagraphStyle('h', parent=base, fontName='Helvetica-Bold', fontSize=10.5, textColor=ACC, spaceBefore=7, spaceAfter=1),
    'job': ParagraphStyle('j', parent=base, fontName='Helvetica-Bold', fontSize=9.8),
    'right': ParagraphStyle('rt', parent=base, alignment=2, textColor=MUTED, fontSize=9.2),
    'org': ParagraphStyle('o', parent=base, textColor=MUTED, fontSize=9.2),
    'b': ParagraphStyle('bl', parent=base, leftIndent=10, bulletIndent=0, spaceAfter=0.8),
}
W = A4[0] - 30 * mm


def bullets(items):
    return [Paragraph(t, S['b'], bulletText='•') for t in items]


def head(t):
    return [Paragraph(t.upper(), S['h']), HRFlowable(width='100%', thickness=0.6, color=ACC, spaceAfter=3)]


def row(left, right, style='job'):
    t = Table([[Paragraph(left, S[style]), Paragraph(right, S['right'])]], colWidths=[W * 0.7, W * 0.3])
    t.setStyle(TableStyle([('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                           ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0)]))
    return t


def job(title, period, org, pts):
    return KeepTogether([Spacer(1, 3), row(title, period), Paragraph(org, S['org'])] + bullets(pts))


def kv(k, v):
    return Paragraph(f'<b>{k}:</b> {v}', ParagraphStyle('kv', parent=base, spaceAfter=1.5))


f = []
LINKEDIN = 'https://www.linkedin.com/in/nitin-kumar-iitbhilai/'
PORTFOLIO = 'https://msa5896.github.io/nitin-kumar-portfolio/'


def qr(url, label):
    """QR code (clickable) with a small caption underneath."""
    from reportlab.graphics.barcode.qr import QrCodeWidget
    from reportlab.graphics.shapes import Drawing
    size = 19 * mm
    w = QrCodeWidget(url, barBorder=0)
    x0, y0, x1, y1 = w.getBounds()
    d = Drawing(size, size, transform=[size / (x1 - x0), 0, 0, size / (y1 - y0), 0, 0])
    d.add(w)
    cap = ParagraphStyle('qc', parent=base, fontSize=7.5, leading=9, alignment=1, textColor=MUTED)
    t = Table([[d], [Paragraph(f'<link href="{url}">{label}</link>', cap)]], colWidths=[size + 2 * mm])
    t.setStyle(TableStyle([('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                           ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0), ('ALIGN', (0, 0), (-1, -1), 'CENTER')]))
    return t


link = ParagraphStyle('lk', parent=S['contact'], textColor=ACC)
left = [Paragraph('NITIN KUMAR', S['name']),
        Paragraph('QA &amp; Manufacturing Engineer &nbsp;|&nbsp; AI Automation · Data · IoT · Robotics', S['role']),
        Paragraph('Gurugram, Haryana, India &nbsp;|&nbsp; +91 75368 55614 &nbsp;|&nbsp; ernitinkumar14@gmail.com', S['contact']),
        Paragraph(f'Portfolio: <link href="{PORTFOLIO}">Visit my portfolio</link>', link),
        Paragraph(f'LinkedIn: <link href="{LINKEDIN}">Visit my profile</link>', link)]
header = Table([[left, qr(LINKEDIN, 'LinkedIn'), qr(PORTFOLIO, 'Portfolio')]], colWidths=[W - 52 * mm, 26 * mm, 26 * mm])
header.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                            ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0)]))
f.append(header)

f += head('Professional Summary')
f += [Paragraph('Quality engineer with <b>9+ years</b> in medical-device and precision manufacturing and currently pursuing an <b>M.Tech in Applied Mechatronics &amp; Robotics (IIT Bhilai, 2025 – 2027)</b>. '
                'Experienced in ISO 13485 quality systems, validation (IQ/OQ/PQ), supplier quality, CAPA and audits. Builds practical Python, data and IoT tools that remove repetitive work and make engineering data easier to act on. GATE 2024 qualified (XE).', base)]

f += head('Key Highlights')
f += bullets(['<b>100%</b> ISO 13485 compliance maintained across <b>4</b> production lines; <b>zero</b> major audit findings in 4 years',
              '<b>15%</b> production-efficiency gain through validation of <b>12+</b> new product launches',
              'Managed <b>30+</b> suppliers at <b>95%</b> on-time delivery with zero major non-conformances',
              'Designed an automated leak / pressure-decay test device, eliminating manual testing errors'])

f += head('Professional Experience')
f.append(job('IPQC Engineer / Quality Inspector', 'Feb 2025 – Present', 'SS Innovations Pvt. Ltd., Gurugram, Haryana',
             ['In-process quality control, incoming inspection and first-piece inspection in medical-device manufacturing',
              'Inspection and evaluation of robotics-related components, including robot arm parts and Tool Interface (TI)',
              'Measurement with Vernier caliper, micrometer and bore gauge; plating thickness inspection',
              'Quality documentation, process quality monitoring, root cause analysis and CAPA-related activities']))
f.append(job('Senior Quality Engineer', 'Jun 2020 – Feb 2025', 'Allied Medical Limited, Bhiwadi, Rajasthan',
             ['Managed QA for OT equipment: surgical tables, operating lights, patient monitors and precision devices',
              'Maintained 100% compliance with ISO 13485 and international regulatory standards across 4 production lines',
              'Boosted production efficiency by 15% via process validation and verification for 12+ new product launches',
              'Reduced manufacturing error rates through cross-functional quality risk mitigation programs',
              'Designed a mechanical assembly testing device for leak and pressure testing (pressure decay method)',
              'Managed supplier quality for 30+ vendors: 95% on-time delivery, zero major non-conformances',
              'Wrote IQ/OQ/PQ protocols, implemented SPC, and led internal and external audits with zero major findings',
              'Maintained DHR, DMR, batch records and validation reports to ISO 13485, 21 CFR Part 820, BIS and CDSCO standards']))
f.append(job('QC Inspector', 'Jul 2017 – May 2020', 'Allied Health Technology Ltd, Gurugram, Haryana',
             ['Validated dimensional accuracy of 5,000+ CNC/VMC/lathe-machined medical components with a 100% approval rate',
              'Improved product yields by 10% through rejection analysis and corrective actions; reduced scrap by 8%',
              'Held tolerances of ±0.01 mm; performed FAI, final inspection, NCR/CAPA, GD&amp;T interpretation and AQL sampling']))

f += head('Education')
f.append(row('M.Tech, Applied Mechatronics &amp; Robotics', '2025 – 2027'))
f.append(Paragraph('Indian Institute of Technology (IIT) Bhilai', S['org']))
f.append(Paragraph('Mechatronics, robotics, automation, embedded systems, IoT, control systems', S['org']))
f.append(Spacer(1, 2))
f.append(row('B.Tech, Mechanical Engineering', '2013 – 2017'))
f.append(Paragraph('Dr. A.P.J. Abdul Kalam Technical University (AKTU), Uttar Pradesh', S['org']))
f.append(Spacer(1, 2))
f.append(row('GATE 2024: Qualified', 'Engineering Sciences (XE)'))

f += head('Technical Skills')
f += [kv('Quality &amp; Regulatory', 'ISO 13485, ISO 9001:2015, ISO 14971, 21 CFR Part 820, CDSCO, BIS, GMP, IQ/OQ/PQ, Process Validation, Supplier Quality, CAPA, RCA (5-Why, Fishbone), FMEA, SPC, MSA, PPAP, GD&amp;T, CMM Metrology, DHF/DMR/DHR, Change Control, Internal &amp; External Audits, Lean Six Sigma, OEE &amp; Quality Dashboards'),
      kv('AI &amp; Data', 'Python, Pandas, NumPy, SQL, Streamlit, Data Visualization, Excel &amp; Report Automation, Generative AI, Prompt Engineering, AI API Integration; learning Machine Learning (Scikit-learn)'),
      kv('IoT &amp; Embedded', 'Raspberry Pi, Arduino, ESP32, NodeMCU, sensor integration, I2C, UART, IoT monitoring'),
      kv('Robotics &amp; Electronics', 'ROS2, Mechatronics, Control Systems, Actuators, Microcontrollers, Basic Electronics, MOSFET, SMPS, DC-DC conversion')]

f.append(PageBreak())
f += head('Selected Projects')
f += bullets(['<b>Smart OT Environmental Monitoring System</b> (in development): Raspberry Pi with SCD30, BME280 and PM sensors, data logging, dashboard and threshold alerts for operating-theatre conditions',
              '<b>AI Quality Data Analyzer:</b> Python/Streamlit workflow turning inspection data into rejection trends, Pareto charts and an AI-drafted management summary',
              '<b>AI Report Automation:</b> Excel reporting automated with Python, charts, AI summary and PDF/HTML export',
              '<b>IoT Environmental Monitoring:</b> Raspberry Pi sensor logging, dashboard and alerts',
              '<b>Arduino Day/Night &amp; Rain Detection; ROS2 Robotics</b> (nodes, topics, services, actions, launch files)'])

f += head('Certifications')
f += bullets(['Entrepreneurship Development Programme (EDP), Institute For Industrial Development (Samadhan, Ministry of MSME, Govt. of India), Jul 2026',
              'IoT and Robotics, Launched Global (Jul 2026)',
              'Lean Six Sigma Green Belt (Apr 2025) and Yellow Belt (Jul 2024), The Knowledge Academy',
              'Python Workshop, United Latino Students Association (Sep 2025); Arduino Programming, Udemy (Jul 2025); Advanced Excel, Udemy (Dec 2022)',
              'AutoCAD + CNC Milling, Ministry of MSME, Government of India (2015)'])

doc = SimpleDocTemplate('public/resume.pdf', pagesize=A4, leftMargin=15 * mm, rightMargin=15 * mm, topMargin=13 * mm,
                        bottomMargin=12 * mm, title='Nitin Kumar - Resume', author='Nitin Kumar')
doc.build(f)
from pypdf import PdfReader  # noqa: E402

print('pages:', len(PdfReader('public/resume.pdf').pages))
