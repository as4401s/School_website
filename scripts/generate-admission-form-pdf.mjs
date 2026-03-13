import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import "regenerator-runtime/runtime.js";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";

const PAGE = {
  width: 595.28,
  height: 841.89,
  marginX: 42,
  top: 792,
  bottom: 44,
};

const COLORS = {
  ink: rgb(0.17, 0.2, 0.27),
  muted: rgb(0.4, 0.46, 0.56),
  accent: rgb(0.79, 0.38, 0.19),
  line: rgb(0.85, 0.86, 0.9),
  fill: rgb(1, 1, 1),
};

const LABEL_SIZE = 8.4;
const BODY_SIZE = 10;
const TITLE_SIZE = 19;
const SECTION_SIZE = 13;
const FIELD_HEIGHT = 24;
const GUTTER = 18;
const CONTENT_WIDTH = PAGE.width - PAGE.marginX * 2;
const COLUMN_WIDTH = (CONTENT_WIDTH - GUTTER) / 2;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function drawWatermark(page, logoImage) {
  const scale = Math.min((PAGE.width * 0.52) / logoImage.width, (PAGE.height * 0.34) / logoImage.height);
  const width = logoImage.width * scale;
  const height = logoImage.height * scale;

  page.drawImage(logoImage, {
    x: (PAGE.width - width) / 2,
    y: (PAGE.height - height) / 2,
    width,
    height,
    opacity: 0.055,
  });
}

function drawText(page, text, options) {
  page.drawText(text, {
    color: COLORS.ink,
    ...options,
  });
}

function drawMuted(page, text, options) {
  page.drawText(text, {
    color: COLORS.muted,
    ...options,
  });
}

function drawHeader(page, regularFont, boldFont) {
  drawText(page, "Krishnarati Montessori School (KMS)", {
    x: PAGE.marginX,
    y: PAGE.top,
    size: TITLE_SIZE,
    font: boldFont,
  });

  drawText(page, "Admission Form / ভর্তি ফর্ম", {
    x: PAGE.marginX,
    y: PAGE.top - 28,
    size: 13,
    font: boldFont,
  });

  drawMuted(
    page,
    "Humania Pota, West Bengal 741238, India | +91-8756339237 | info@kmschool.co.in",
    {
      x: PAGE.marginX,
      y: PAGE.top - 48,
      size: 9,
      font: regularFont,
    },
  );

  page.drawLine({
    start: { x: PAGE.marginX, y: PAGE.top - 62 },
    end: { x: PAGE.width - PAGE.marginX, y: PAGE.top - 62 },
    thickness: 1,
    color: COLORS.line,
  });

  return PAGE.top - 84;
}

function drawSection(page, title, y, boldFont) {
  drawText(page, title, {
    x: PAGE.marginX,
    y,
    size: SECTION_SIZE,
    font: boldFont,
  });

  return y - 22;
}

function addTextField(form, page, regularFont, {
  name,
  label,
  x,
  y,
  width,
  height = FIELD_HEIGHT,
  multiline = false,
}) {
  drawMuted(page, label, {
    x,
    y: y + height + 7,
    size: LABEL_SIZE,
    font: regularFont,
  });

  const field = form.createTextField(name);
  if (multiline) {
    field.enableMultiline();
  }
  field.addToPage(page, {
    x,
    y,
    width,
    height,
    textColor: COLORS.ink,
    backgroundColor: COLORS.fill,
    borderColor: COLORS.line,
    borderWidth: 1,
  });

  return y - (multiline ? height + 28 : height + 24);
}

function addCheckbox(form, page, regularFont, {
  name,
  label,
  x,
  y,
}) {
  const checkbox = form.createCheckBox(name);
  checkbox.addToPage(page, {
    x,
    y: y - 2,
    width: 14,
    height: 14,
    borderColor: COLORS.line,
    borderWidth: 1,
    backgroundColor: COLORS.fill,
  });

  drawMuted(page, label, {
    x: x + 22,
    y,
    size: LABEL_SIZE,
    font: regularFont,
  });

  return y - 24;
}

async function main() {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const [regularBytes, boldBytes, logoBytes] = await Promise.all([
    fs.readFile(path.join(projectRoot, "src/app/fonts/noto-sans-bengali-regular.ttf")),
    fs.readFile(path.join(projectRoot, "src/app/fonts/noto-sans-bengali-bold.ttf")),
    fs.readFile(path.join(projectRoot, "public/media/logo.jpg")),
  ]);

  const regularFont = await pdfDoc.embedFont(regularBytes, { subset: false });
  const boldFont = await pdfDoc.embedFont(boldBytes, { subset: false });
  const logoImage = await pdfDoc.embedJpg(logoBytes);

  const form = pdfDoc.getForm();

  const pageOne = pdfDoc.addPage([PAGE.width, PAGE.height]);
  drawWatermark(pageOne, logoImage);
  let y = drawHeader(pageOne, regularFont, boldFont);

  y = drawSection(pageOne, "Student Details / শিক্ষার্থীর তথ্য", y, boldFont);
  const leftX = PAGE.marginX;
  const rightX = PAGE.marginX + COLUMN_WIDTH + GUTTER;

  y = addTextField(form, pageOne, regularFont, {
    name: "student_name",
    label: "Student Name / শিক্ষার্থীর নাম",
    x: leftX,
    y,
    width: COLUMN_WIDTH,
  });

  let rightY = addTextField(form, pageOne, regularFont, {
    name: "student_dob",
    label: "Date of Birth / জন্মতারিখ",
    x: rightX,
    y: y + FIELD_HEIGHT + 24,
    width: COLUMN_WIDTH,
  });

  y = addTextField(form, pageOne, regularFont, {
    name: "admission_class",
    label: "Class for Admission / ভর্তি প্রার্থিত শ্রেণি",
    x: leftX,
    y,
    width: COLUMN_WIDTH,
  });

  rightY = addTextField(form, pageOne, regularFont, {
    name: "student_aadhaar",
    label: "Aadhaar Number / আধার নম্বর",
    x: rightX,
    y: rightY,
    width: COLUMN_WIDTH,
  });

  y = Math.min(y, rightY) - 6;
  y = drawSection(pageOne, "Parent Details / অভিভাবকের তথ্য", y, boldFont);

  y = addTextField(form, pageOne, regularFont, {
    name: "father_name",
    label: "Father's Name / পিতার নাম",
    x: leftX,
    y,
    width: COLUMN_WIDTH,
  });

  rightY = addTextField(form, pageOne, regularFont, {
    name: "mother_name",
    label: "Mother's Name / মাতার নাম",
    x: rightX,
    y: y + FIELD_HEIGHT + 24,
    width: COLUMN_WIDTH,
  });

  y = addTextField(form, pageOne, regularFont, {
    name: "parent_phone",
    label: "Contact Number / যোগাযোগ নম্বর",
    x: leftX,
    y,
    width: COLUMN_WIDTH,
  });

  rightY = addTextField(form, pageOne, regularFont, {
    name: "parent_email",
    label: "Email / ইমেল",
    x: rightX,
    y: rightY,
    width: COLUMN_WIDTH,
  });

  y = Math.min(y, rightY);
  y = addTextField(form, pageOne, regularFont, {
    name: "residential_address",
    label: "Residential Address / আবাসিক ঠিকানা",
    x: leftX,
    y,
    width: CONTENT_WIDTH,
    height: 54,
    multiline: true,
  });

  y = drawSection(pageOne, "Local Guardian Details (if applicable) / স্থানীয় অভিভাবকের তথ্য (যদি প্রযোজ্য হয়)", y, boldFont);

  y = addTextField(form, pageOne, regularFont, {
    name: "guardian_name",
    label: "Guardian Name / স্থানীয় অভিভাবকের নাম",
    x: leftX,
    y,
    width: COLUMN_WIDTH,
  });

  rightY = addTextField(form, pageOne, regularFont, {
    name: "guardian_phone",
    label: "Guardian Contact / যোগাযোগ নম্বর",
    x: rightX,
    y: y + FIELD_HEIGHT + 24,
    width: COLUMN_WIDTH,
  });

  y = Math.min(y, rightY) - 4;
  y = drawSection(pageOne, "School Interaction Note / বিদ্যালয়ের প্রাথমিক সাক্ষাৎ", y, boldFont);

  y = addTextField(form, pageOne, regularFont, {
    name: "interaction_notes",
    label: "Optional notes for school interaction / বিদ্যালয়ের নোট",
    x: leftX,
    y,
    width: CONTENT_WIDTH,
    height: 78,
    multiline: true,
  });

  const pageTwo = pdfDoc.addPage([PAGE.width, PAGE.height]);
  drawWatermark(pageTwo, logoImage);
  y = drawHeader(pageTwo, regularFont, boldFont);

  y = drawSection(pageTwo, "Documents Checklist / প্রয়োজনীয় নথিপত্র", y, boldFont);

  const documentLabels = [
    "Student's Aadhaar card / শিক্ষার্থীর আধার কার্ড",
    "Birth certificate (original + photocopies) / জন্ম সনদপত্র (মূল ও ফটোকপি)",
    "Parents' Aadhaar card / অভিভাবকের আধার কার্ড",
    "Parents' academic qualification certificates / অভিভাবকের শিক্ষাগত যোগ্যতার সনদপত্র",
    "Passport-size photographs / পাসপোর্ট সাইজ ছবি",
    "Local guardian proof, if applicable / প্রযোজ্য ক্ষেত্রে স্থানীয় অভিভাবকের নথি",
  ];

  documentLabels.forEach((label, index) => {
    y = addCheckbox(form, pageTwo, regularFont, {
      name: `document_${index + 1}`,
      label,
      x: PAGE.marginX,
      y,
    });
  });

  y -= 8;
  y = drawSection(pageTwo, "Declaration / ঘোষণা", y, boldFont);

  const declaration =
    "I confirm that the information provided in this form is correct to the best of my knowledge. / এই ফর্মে প্রদত্ত তথ্য আমার জানা মতে সঠিক।";
  drawMuted(pageTwo, declaration, {
    x: PAGE.marginX,
    y,
    size: 9.4,
    font: regularFont,
    maxWidth: CONTENT_WIDTH,
    lineHeight: 15,
  });

  y -= 42;
  y = addTextField(form, pageTwo, regularFont, {
    name: "parent_signature",
    label: "Parent/Guardian Signature / অভিভাবকের স্বাক্ষর",
    x: leftX,
    y,
    width: COLUMN_WIDTH,
  });

  rightY = addTextField(form, pageTwo, regularFont, {
    name: "submission_date",
    label: "Date / তারিখ",
    x: rightX,
    y: y + FIELD_HEIGHT + 24,
    width: COLUMN_WIDTH,
  });

  y = Math.min(y, rightY) - 6;
  y = drawSection(pageTwo, "For School Office Use / বিদ্যালয়ের অফিস ব্যবহারের জন্য", y, boldFont);

  y = addTextField(form, pageTwo, regularFont, {
    name: "office_remarks",
    label: "Office remarks / অফিস মন্তব্য",
    x: leftX,
    y,
    width: CONTENT_WIDTH,
    height: 76,
    multiline: true,
  });

  y = addTextField(form, pageTwo, regularFont, {
    name: "office_receiver",
    label: "Received by / গ্রহণকারী",
    x: leftX,
    y,
    width: COLUMN_WIDTH,
  });

  addTextField(form, pageTwo, regularFont, {
    name: "office_receipt_date",
    label: "Receipt date / গ্রহণের তারিখ",
    x: rightX,
    y: y + FIELD_HEIGHT + 24,
    width: COLUMN_WIDTH,
  });

  form.updateFieldAppearances(regularFont);

  pdfDoc.setTitle("KMS Admission Form");
  pdfDoc.setAuthor("KMS");
  pdfDoc.setSubject("Admission Form");
  pdfDoc.setKeywords(["admission", "school", "form", "fillable pdf"]);

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(projectRoot, "public/forms/kms-admission-form.pdf");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, pdfBytes);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
