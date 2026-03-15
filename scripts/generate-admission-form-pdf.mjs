import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const PAGE = {
  width: 595.28,
  height: 841.89,
  marginX: 38,
  topInset: 18,
  footerInset: 24,
};

const LAYOUT = {
  gutter: 14,
  panelGap: 12,
  panelHeaderHeight: 22,
  panelBodyTopGap: 16,
  panelPaddingX: 14,
  fieldHeight: 18,
  fieldGap: 5,
  labelGap: 3,
  labelLineHeight: 9.2,
  checkboxSize: 13,
  checkboxGap: 8,
  headerHeight: 142,
};

const COLORS = {
  ink: rgb(0.21, 0.28, 0.39),
  muted: rgb(0.43, 0.51, 0.61),
  line: rgb(0.8, 0.84, 0.89),
  fieldBg: rgb(0.95, 0.98, 1),
  panelBg: rgb(0.995, 0.996, 0.998),
  fieldLine: rgb(0.77, 0.83, 0.92),
  blue: rgb(0.13, 0.53, 0.82),
  blueSoft: rgb(0.9, 0.96, 0.99),
  pink: rgb(0.93, 0.33, 0.47),
  pinkSoft: rgb(1, 0.94, 0.96),
  green: rgb(0.47, 0.72, 0.23),
  greenSoft: rgb(0.95, 0.98, 0.9),
  orange: rgb(0.94, 0.56, 0.21),
  orangeSoft: rgb(1, 0.95, 0.91),
  yellow: rgb(0.96, 0.8, 0.18),
  yellowSoft: rgb(1, 0.98, 0.9),
  graySoft: rgb(0.95, 0.96, 0.98),
};

const TYPE = {
  title: 18.5,
  subtitle: 11.4,
  section: 10.8,
  label: 8.1,
  body: 9.6,
  small: 7.6,
};

const CONTENT_WIDTH = PAGE.width - PAGE.marginX * 2;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function wrapText(text, font, size, maxWidth) {
  const paragraphs = text.split("\n");
  const lines = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);

    if (words.length === 0) {
      lines.push("");
      continue;
    }

    let current = words[0];

    for (const word of words.slice(1)) {
      const candidate = `${current} ${word}`;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        current = candidate;
      } else {
        lines.push(current);
        current = word;
      }
    }

    lines.push(current);
  }

  return lines;
}

function drawLines(page, lines, options) {
  const {
    color = COLORS.muted,
    font,
    lineHeight,
    size,
    x,
    y,
  } = options;

  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * lineHeight,
      size,
      font,
      color,
    });
  });
}

function drawWrappedText(page, text, options) {
  const {
    font,
    maxWidth,
    size,
  } = options;
  const lineHeight = options.lineHeight ?? size * 1.35;
  const lines = wrapText(text, font, size, maxWidth);
  drawLines(page, lines, {
    ...options,
    lineHeight,
  });
  return options.y - Math.max(lines.length, 1) * lineHeight;
}

function getColumns(x, width, ratios, gap = LAYOUT.gutter) {
  const totalRatio = ratios.reduce((sum, ratio) => sum + ratio, 0);
  const usableWidth = width - gap * (ratios.length - 1);
  const columns = [];
  let cursor = x;

  ratios.forEach((ratio) => {
    const columnWidth = (usableWidth * ratio) / totalRatio;
    columns.push({ x: cursor, width: columnWidth });
    cursor += columnWidth + gap;
  });

  return columns;
}

function drawWatermark(page, logoImage) {
  const scale = Math.min(
    (PAGE.width * 0.78) / logoImage.width,
    (PAGE.height * 0.62) / logoImage.height,
  );
  const width = logoImage.width * scale;
  const height = logoImage.height * scale;

  page.drawImage(logoImage, {
    x: (PAGE.width - width) / 2,
    y: (PAGE.height - height) / 2 - 20,
    width,
    height,
    opacity: 0.075,
  });
}

function preparePage(page) {
  page.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE.width,
    height: PAGE.height,
    color: rgb(1, 1, 1),
  });
}

function drawTopColorBand(page) {
  const bandHeight = 8;
  const segmentWidth = PAGE.width / 5;
  const colors = [COLORS.pink, COLORS.yellow, COLORS.orange, COLORS.blue, COLORS.green];

  colors.forEach((color, index) => {
    page.drawRectangle({
      x: segmentWidth * index,
      y: PAGE.height - bandHeight,
      width: segmentWidth,
      height: bandHeight,
      color,
    });
  });
}

function drawHeader(page, fonts, logoImage) {
  drawTopColorBand(page);

  const titleY = PAGE.height - 52;
  const headerBottom = PAGE.height - PAGE.topInset - LAYOUT.headerHeight;

  const title = "Student Admission Form";
  const titleWidth = fonts.bold.widthOfTextAtSize(title, TYPE.title);

  page.drawText(title, {
    x: (PAGE.width - titleWidth) / 2,
    y: titleY,
    size: TYPE.title,
    font: fonts.bold,
    color: COLORS.blue,
  });

  page.drawLine({
    start: { x: PAGE.marginX, y: titleY - 16 },
    end: { x: PAGE.width - PAGE.marginX, y: titleY - 16 },
    thickness: 1.2,
    color: COLORS.blue,
  });

  page.drawRectangle({
    x: PAGE.marginX,
    y: headerBottom,
    width: CONTENT_WIDTH,
    height: LAYOUT.headerHeight - 10,
    color: COLORS.fieldBg,
    borderColor: COLORS.line,
    borderWidth: 1,
  });

  page.drawRectangle({
    x: PAGE.marginX + 10,
    y: headerBottom + 52,
    width: 58,
    height: 58,
    color: COLORS.fieldBg,
    borderColor: COLORS.line,
    borderWidth: 1,
  });

  page.drawImage(logoImage, {
    x: PAGE.marginX + 14,
    y: headerBottom + 56,
    width: 50,
    height: 50,
  });

  page.drawText("KMS", {
    x: PAGE.marginX + 80,
    y: headerBottom + 88,
    size: 22,
    font: fonts.bold,
    color: COLORS.ink,
  });

  page.drawText("Krishnarati Montessori School", {
    x: PAGE.marginX + 80,
    y: headerBottom + 68,
    size: TYPE.subtitle,
    font: fonts.bold,
    color: COLORS.ink,
  });

  page.drawText("A joyful early-years school admission application", {
    x: PAGE.marginX + 80,
    y: headerBottom + 50,
    size: TYPE.small,
    font: fonts.regular,
    color: COLORS.muted,
  });

  page.drawText("Humania Pota, West Bengal 741238", {
    x: PAGE.marginX + 80,
    y: headerBottom + 32,
    size: TYPE.small,
    font: fonts.regular,
    color: COLORS.muted,
  });

  const photoWidth = 98;
  const photoHeight = 116;
  const photoX = PAGE.width - PAGE.marginX - photoWidth - 14;
  const photoY = headerBottom + 8;
  page.drawRectangle({
    x: photoX,
    y: photoY,
    width: photoWidth,
    height: photoHeight,
    color: COLORS.fieldBg,
    borderColor: COLORS.line,
    borderWidth: 1,
  });

  const photoText = wrapText(
    "Attach a recent passport-size photograph",
    fonts.regular,
    TYPE.body,
    photoWidth - 20,
  );
  drawLines(page, photoText, {
    x: photoX + 12,
    y: photoY + 72,
    size: TYPE.body,
    lineHeight: 13,
    font: fonts.regular,
    color: COLORS.muted,
  });

  return headerBottom - 18;
}

function drawFooter(page, fonts, pageNumber, pageCount) {
  const lineY = PAGE.footerInset + 16;

  page.drawLine({
    start: { x: PAGE.marginX, y: lineY },
    end: { x: PAGE.width - PAGE.marginX, y: lineY },
    thickness: 1,
    color: COLORS.line,
  });

  page.drawText("KMS Admission Application Form", {
    x: PAGE.marginX,
    y: PAGE.footerInset,
    size: TYPE.small,
    font: fonts.regular,
    color: COLORS.muted,
  });

  const pageText = `Page ${pageNumber} of ${pageCount}`;
  const pageWidth = fonts.bold.widthOfTextAtSize(pageText, TYPE.small);
  page.drawText(pageText, {
    x: PAGE.width - PAGE.marginX - pageWidth,
    y: PAGE.footerInset,
    size: TYPE.small,
    font: fonts.bold,
    color: COLORS.muted,
  });
}

function drawContinuationTop(page) {
  drawTopColorBand(page);

  page.drawLine({
    start: { x: PAGE.marginX, y: PAGE.height - 22 },
    end: { x: PAGE.width - PAGE.marginX, y: PAGE.height - 22 },
    thickness: 1,
    color: COLORS.line,
  });

  return PAGE.height - 34;
}

function drawPanel(page, fonts, options) {
  const {
    fill,
    height,
    title,
    titleColor,
    x,
    yTop,
    width,
  } = options;

  page.drawRectangle({
    x,
    y: yTop - height,
    width,
    height,
    color: COLORS.panelBg,
    borderColor: COLORS.line,
    borderWidth: 1,
  });

  page.drawRectangle({
    x,
    y: yTop - LAYOUT.panelHeaderHeight,
    width,
    height: LAYOUT.panelHeaderHeight,
    color: fill,
    borderColor: COLORS.line,
    borderWidth: 1,
  });

  page.drawText(title, {
    x: x + 12,
    y: yTop - 17,
    size: TYPE.section,
    font: fonts.bold,
    color: titleColor,
  });

  return {
    innerTop: yTop - LAYOUT.panelHeaderHeight - LAYOUT.panelBodyTopGap,
    x: x + LAYOUT.panelPaddingX,
    width: width - LAYOUT.panelPaddingX * 2,
  };
}

function createTextField(form, page, fonts, options) {
  const {
    fontSize = 10,
    height = LAYOUT.fieldHeight,
    label,
    multiline = false,
    name,
    topY,
    width,
    x,
  } = options;

  const labelLines = wrapText(label, fonts.bold, TYPE.label, width);
  drawLines(page, labelLines, {
    x,
    y: topY,
    size: TYPE.label,
    lineHeight: LAYOUT.labelLineHeight,
    font: fonts.bold,
    color: COLORS.muted,
  });

  const labelHeight = Math.max(labelLines.length, 1) * LAYOUT.labelLineHeight;
  const fieldY = topY - labelHeight - LAYOUT.labelGap - height;

  const field = form.createTextField(name);
  if (multiline) {
    field.enableMultiline();
  }
  field.addToPage(page, {
    x,
    y: fieldY,
    width,
    height,
    textColor: COLORS.ink,
    backgroundColor: COLORS.fieldBg,
    borderColor: COLORS.fieldLine,
    borderWidth: 1,
  });
  field.setFontSize(fontSize);

  return fieldY - LAYOUT.fieldGap;
}

function drawWritingLine(page, fonts, options) {
  const {
    label,
    topY,
    width,
    x,
  } = options;

  const labelLines = wrapText(label, fonts.bold, TYPE.label, width);
  drawLines(page, labelLines, {
    x,
    y: topY,
    size: TYPE.label,
    lineHeight: LAYOUT.labelLineHeight,
    font: fonts.bold,
    color: COLORS.muted,
  });

  const labelHeight = Math.max(labelLines.length, 1) * LAYOUT.labelLineHeight;
  const lineY = topY - labelHeight - 6;

  page.drawLine({
    start: { x, y: lineY },
    end: { x: x + width, y: lineY },
    thickness: 1,
    color: COLORS.line,
  });

  return lineY - 12;
}

function addFieldRow(form, page, fonts, options) {
  const {
    fields,
    gap = LAYOUT.gutter,
    topY,
    width,
    x,
  } = options;
  const ratios = fields.map((field) => field.ratio ?? 1);
  const columns = getColumns(x, width, ratios, gap);

  return fields.reduce((nextY, field, index) => {
    const column = columns[index];
    const fieldNextY = createTextField(form, page, fonts, {
      ...field,
      topY,
      width: column.width,
      x: column.x,
    });
    return Math.min(nextY, fieldNextY);
  }, Number.POSITIVE_INFINITY);
}

function addCheckBox(form, page, x, y, name) {
  const checkbox = form.createCheckBox(name);
  checkbox.addToPage(page, {
    x,
    y,
    width: LAYOUT.checkboxSize,
    height: LAYOUT.checkboxSize,
    borderColor: COLORS.fieldLine,
    borderWidth: 1,
    backgroundColor: COLORS.fieldBg,
  });
}

function drawProgramChooser(page, form, fonts, yTop) {
  page.drawText("Admission Seeking In:", {
    x: PAGE.marginX,
    y: yTop,
    size: TYPE.body,
    font: fonts.bold,
    color: COLORS.pink,
  });

  const options = [
    { key: "program_montessori", label: "Montessori" },
    { key: "program_nursery", label: "Nursery" },
    { key: "program_ukg", label: "UKG" },
  ];

  let x = PAGE.marginX + 118;
  for (const option of options) {
    addCheckBox(form, page, x, yTop - 3, option.key);
    page.drawText(option.label, {
      x: x + 20,
      y: yTop,
      size: TYPE.body,
      font: fonts.regular,
      color: COLORS.ink,
    });
    x += 92;
  }

  return yTop - 20;
}

function addCheckboxList(form, page, fonts, options) {
  const {
    items,
    topY,
    width,
    x,
  } = options;
  let y = topY;

  for (const item of items) {
    const labelWidth = width - LAYOUT.checkboxSize - LAYOUT.checkboxGap;
    const lines = wrapText(item.label, fonts.regular, TYPE.body, labelWidth);
    addCheckBox(form, page, x, y - 2, item.name);
    drawLines(page, lines, {
      x: x + LAYOUT.checkboxSize + LAYOUT.checkboxGap,
      y: y + 1,
      size: TYPE.body,
      lineHeight: 12.5,
      font: fonts.regular,
      color: COLORS.ink,
    });
    y -= Math.max(lines.length, 1) * 12.5 + 8;
  }

  return y;
}

async function main() {
  const pdfDoc = await PDFDocument.create();

  const fonts = {
    regular: await pdfDoc.embedFont(StandardFonts.Helvetica),
    bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    italic: await pdfDoc.embedFont(StandardFonts.HelveticaOblique),
  };

  const logoBytes = await fs.readFile(path.join(projectRoot, "public/media/logo.jpg"));
  const logoImage = await pdfDoc.embedJpg(logoBytes);
  const form = pdfDoc.getForm();
  const totalPages = 2;

  const pageOne = pdfDoc.addPage([PAGE.width, PAGE.height]);
  preparePage(pageOne);
  drawWatermark(pageOne, logoImage);
  let y = drawHeader(pageOne, fonts, logoImage);
  drawFooter(pageOne, fonts, 1, totalPages);

  y = drawProgramChooser(pageOne, form, fonts, y);
  y -= 6;

  pageOne.drawText("To be completed by Parent / Guardian.", {
    x: PAGE.marginX + 160,
    y,
    size: 9.8,
    font: fonts.bold,
    color: COLORS.pink,
  });

  y -= 18;

  const candidatePanel = drawPanel(pageOne, fonts, {
    fill: COLORS.blueSoft,
    height: 198,
    title: "Candidate's Personal Details",
    titleColor: COLORS.blue,
    x: PAGE.marginX,
    yTop: y,
    width: CONTENT_WIDTH,
  });

  let panelY = candidatePanel.innerTop;
  panelY = createTextField(form, pageOne, fonts, {
    label: "Student's Full Name",
    name: "student_full_name",
    topY: panelY,
    width: candidatePanel.width,
    x: candidatePanel.x,
  });
  panelY = addFieldRow(form, pageOne, fonts, {
    fields: [
      { label: "Date of Birth", name: "student_dob", ratio: 0.9 },
      { label: "Place of Birth", name: "student_place_of_birth", ratio: 1.15 },
      { label: "Gender", name: "student_gender", ratio: 0.7 },
    ],
    topY: panelY,
    width: candidatePanel.width,
    x: candidatePanel.x,
  });
  panelY = addFieldRow(form, pageOne, fonts, {
    fields: [
      { label: "Nationality", name: "student_nationality", ratio: 0.85 },
      { label: "Student Aadhaar Number", name: "student_aadhaar", ratio: 1.15 },
    ],
    topY: panelY,
    width: candidatePanel.width,
    x: candidatePanel.x,
  });
  addFieldRow(form, pageOne, fonts, {
    fields: [
      { label: "First Language", name: "student_first_language", ratio: 0.9 },
      { label: "Other Languages Known", name: "student_other_languages", ratio: 1.1 },
    ],
    topY: panelY,
    width: candidatePanel.width,
    x: candidatePanel.x,
  });

  y -= 198 + LAYOUT.panelGap;

  const addressPanel = drawPanel(pageOne, fonts, {
    fill: COLORS.greenSoft,
    height: 140,
    title: "Residential Address",
    titleColor: COLORS.green,
    x: PAGE.marginX,
    yTop: y,
    width: CONTENT_WIDTH,
  });

  panelY = addressPanel.innerTop;
  panelY = createTextField(form, pageOne, fonts, {
    fontSize: 9.8,
    height: 38,
    label: "Address",
    multiline: true,
    name: "residential_address",
    topY: panelY,
    width: addressPanel.width,
    x: addressPanel.x,
  });
  addFieldRow(form, pageOne, fonts, {
    fields: [
      { label: "City / Town", name: "address_city", ratio: 0.9 },
      { label: "District", name: "address_district", ratio: 0.9 },
      { label: "State", name: "address_state", ratio: 0.8 },
      { label: "PIN Code", name: "address_pin", ratio: 0.8 },
    ],
    topY: panelY,
    width: addressPanel.width,
    x: addressPanel.x,
    gap: 10,
  });

  y -= 140 + LAYOUT.panelGap;

  const fatherPanel = drawPanel(pageOne, fonts, {
    fill: COLORS.orangeSoft,
    height: 198,
    title: "Father's Details",
    titleColor: COLORS.orange,
    x: PAGE.marginX,
    yTop: y,
    width: CONTENT_WIDTH,
  });

  panelY = fatherPanel.innerTop;
  panelY = createTextField(form, pageOne, fonts, {
    label: "Full Name",
    name: "father_name",
    topY: panelY,
    width: fatherPanel.width,
    x: fatherPanel.x,
  });
  panelY = createTextField(form, pageOne, fonts, {
    label: "Father's Aadhaar Number",
    name: "father_aadhaar",
    topY: panelY,
    width: fatherPanel.width,
    x: fatherPanel.x,
  });
  panelY = addFieldRow(form, pageOne, fonts, {
    fields: [
      { label: "E-mail", name: "father_email", ratio: 1.1 },
      { label: "Educational Qualification", name: "father_qualification", ratio: 0.9 },
    ],
    topY: panelY,
    width: fatherPanel.width,
    x: fatherPanel.x,
  });
  addFieldRow(form, pageOne, fonts, {
    fields: [
      { label: "Profession", name: "father_profession", ratio: 1.1 },
      { label: "Phone", name: "father_phone", ratio: 0.9 },
    ],
    topY: panelY,
    width: fatherPanel.width,
    x: fatherPanel.x,
    gap: 10,
  });

  const pageTwo = pdfDoc.addPage([PAGE.width, PAGE.height]);
  preparePage(pageTwo);
  drawWatermark(pageTwo, logoImage);
  y = drawContinuationTop(pageTwo);
  drawFooter(pageTwo, fonts, 2, totalPages);

  const motherPanel = drawPanel(pageTwo, fonts, {
    fill: COLORS.pinkSoft,
    height: 198,
    title: "Mother's Details",
    titleColor: COLORS.pink,
    x: PAGE.marginX,
    yTop: y,
    width: CONTENT_WIDTH,
  });

  panelY = motherPanel.innerTop;
  panelY = createTextField(form, pageTwo, fonts, {
    label: "Full Name",
    name: "mother_name",
    topY: panelY,
    width: motherPanel.width,
    x: motherPanel.x,
  });
  panelY = createTextField(form, pageTwo, fonts, {
    label: "Mother's Aadhaar Number",
    name: "mother_aadhaar",
    topY: panelY,
    width: motherPanel.width,
    x: motherPanel.x,
  });
  panelY = addFieldRow(form, pageTwo, fonts, {
    fields: [
      { label: "E-mail", name: "mother_email", ratio: 1.1 },
      { label: "Educational Qualification", name: "mother_qualification", ratio: 0.9 },
    ],
    topY: panelY,
    width: motherPanel.width,
    x: motherPanel.x,
  });
  addFieldRow(form, pageTwo, fonts, {
    fields: [
      { label: "Profession", name: "mother_profession", ratio: 1.1 },
      { label: "Phone", name: "mother_phone", ratio: 0.9 },
    ],
    topY: panelY,
    width: motherPanel.width,
    x: motherPanel.x,
    gap: 10,
  });

  y -= 198 + LAYOUT.panelGap;

  const guardianPanel = drawPanel(pageTwo, fonts, {
    fill: COLORS.yellowSoft,
    height: 158,
    title: "Local Guardian (If Applicable)",
    titleColor: COLORS.orange,
    x: PAGE.marginX,
    yTop: y,
    width: CONTENT_WIDTH,
  });

  panelY = guardianPanel.innerTop;
  panelY = createTextField(form, pageTwo, fonts, {
    label: "Full Name",
    name: "guardian_name",
    topY: panelY,
    width: guardianPanel.width,
    x: guardianPanel.x,
  });
  panelY = createTextField(form, pageTwo, fonts, {
    label: "Guardian Aadhaar Number",
    name: "guardian_aadhaar",
    topY: panelY,
    width: guardianPanel.width,
    x: guardianPanel.x,
  });
  addFieldRow(form, pageTwo, fonts, {
    fields: [
      { label: "E-mail", name: "guardian_email", ratio: 1.1 },
      { label: "Relation with Student", name: "guardian_relation", ratio: 1 },
      { label: "Phone", name: "guardian_phone", ratio: 0.9 },
    ],
    topY: panelY,
    width: guardianPanel.width,
    x: guardianPanel.x,
    gap: 10,
  });

  y -= 158 + LAYOUT.panelGap;

  const documentsPanel = drawPanel(pageTwo, fonts, {
    fill: COLORS.blueSoft,
    height: 118,
    title: "Documents Checklist",
    titleColor: COLORS.blue,
    x: PAGE.marginX,
    yTop: y,
    width: CONTENT_WIDTH,
  });

  panelY = documentsPanel.innerTop;
  const docsColumns = getColumns(documentsPanel.x, documentsPanel.width, [1, 1], 18);
  const leftDocs = [
    { name: "document_birth_certificate", label: "Birth Certificate" },
    { name: "document_student_aadhaar", label: "Student Aadhaar Copy" },
    { name: "document_parent_aadhaar", label: "Parents' Aadhaar Copy" },
  ];
  const rightDocs = [
    { name: "document_parent_photos", label: "Passport Size Photos" },
    { name: "document_parent_qualification", label: "Parents' Qualification Records" },
    { name: "document_guardian_proof", label: "Guardian Proof (if applicable)" },
  ];
  addCheckboxList(form, pageTwo, fonts, {
    items: leftDocs,
    topY: panelY,
    width: docsColumns[0].width,
    x: docsColumns[0].x,
  });
  addCheckboxList(form, pageTwo, fonts, {
    items: rightDocs,
    topY: panelY,
    width: docsColumns[1].width,
    x: docsColumns[1].x,
  });

  y -= 118 + LAYOUT.panelGap;

  const bottomColumns = getColumns(PAGE.marginX, CONTENT_WIDTH, [1.28, 0.72]);
  const declarationPanel = drawPanel(pageTwo, fonts, {
    fill: COLORS.pinkSoft,
    height: 170,
    title: "Declaration",
    titleColor: COLORS.pink,
    x: bottomColumns[0].x,
    yTop: y,
    width: bottomColumns[0].width,
  });

  const officePanel = drawPanel(pageTwo, fonts, {
    fill: COLORS.graySoft,
    height: 170,
    title: "For School Office Use Only",
    titleColor: COLORS.ink,
    x: bottomColumns[1].x,
    yTop: y,
    width: bottomColumns[1].width,
  });

  panelY = drawWrappedText(
    pageTwo,
    "I confirm that the information provided in this application is correct to the best of my knowledge.",
    {
      x: declarationPanel.x,
      y: declarationPanel.innerTop,
      size: TYPE.body,
      font: fonts.regular,
      color: COLORS.ink,
      maxWidth: declarationPanel.width,
      lineHeight: 13,
    },
  ) - 8;
  const declarationColumns = getColumns(
    declarationPanel.x,
    declarationPanel.width,
    [0.7, 1.3],
    16,
  );
  drawWritingLine(pageTwo, fonts, {
    label: "Date",
    topY: panelY,
    width: declarationColumns[0].width,
    x: declarationColumns[0].x,
  });
  drawWritingLine(pageTwo, fonts, {
    label: "Signature (Parent / Guardian)",
    topY: panelY,
    width: declarationColumns[1].width,
    x: declarationColumns[1].x,
  });

  panelY = officePanel.innerTop;
  panelY = createTextField(form, pageTwo, fonts, {
    label: "Received By",
    name: "office_received_by",
    topY: panelY,
    width: officePanel.width,
    x: officePanel.x,
  });
  panelY = createTextField(form, pageTwo, fonts, {
    label: "Receipt Date",
    name: "office_receipt_date",
    topY: panelY,
    width: officePanel.width,
    x: officePanel.x,
  });
  createTextField(form, pageTwo, fonts, {
    fontSize: 9.8,
    height: 28,
    label: "Remarks",
    multiline: true,
    name: "office_remarks",
    topY: panelY,
    width: officePanel.width,
    x: officePanel.x,
  });

  form.updateFieldAppearances(fonts.regular);

  pdfDoc.setTitle("KMS Student Admission Form");
  pdfDoc.setAuthor("KMS");
  pdfDoc.setSubject("Student admission application");
  pdfDoc.setKeywords(["admission", "school", "student", "fillable pdf"]);

  const outputPath = path.join(projectRoot, "public/forms/kms-admission-form.pdf");
  const pdfBytes = await pdfDoc.save();
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, pdfBytes);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
