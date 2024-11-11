import { MlCreatePdfForm } from "@mapcomponents/react-maplibre";
import { TextField, Drawer, Box } from "@mui/material";

import { logoToBase64 } from "./logo";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexto/AppContext";

export interface exportPDFProps {
  showForm: boolean;
}

const translations = [
  { id: "quality-select-label", originalText: "Quality", newText: "Calidad" },
  { id: "scale-select-label", originalText: "Scale", newText: "Escala" },
  { id: "format-select-label", originalText: "Format", newText: "Formato" },
  { id: "orientation-portrait", originalText: "Portrait", newText: "Vertical" },
  {
    id: "orientation-landscape",
    originalText: "Landscape",
    newText: "Horizontal",
  },
  { id: "create-pdf-button", originalText: "CREATE PDF", newText: "crear PDF" },
];

export default function ExportPDF(props: exportPDFProps) {

  useEffect(() => {
    const observer = new MutationObserver(() => {
        translations.forEach(({ id, originalText, newText }) => {
            const elementById = document.getElementById(id);
                // Select Labels
            if (elementById && (elementById as HTMLElement).innerText === originalText) {                
                (elementById as HTMLElement).innerText = newText;
            } else if (id === "orientation-portrait" || id === "orientation-landscape") {
                // radio buttons
                const radioLabel = Array.from(document.querySelectorAll(".MuiFormControlLabel-root .MuiTypography-root"))
                    .find((el) => (el as HTMLElement).innerText === originalText);
                
                if (radioLabel) {
                    (radioLabel as HTMLElement).innerText = newText;
                }
            } else if (id === "create-pdf-button") {
                // button text
                const buttonElement = Array.from(document.querySelectorAll('button'))
                    .find((btn) => (btn as HTMLElement).innerText.trim() === originalText);
                
                if (buttonElement) {
                    (buttonElement as HTMLElement).innerText = newText;
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect(); 
}, []);

  return (
    <>
      <Drawer
          sx={{
          width: 450,
          maxWidth: "50%",
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: 450,
            height: "auto",
            backgroundColor: "#ffff",          
            marginTop: "100px",
            right: "50px",
            padding: "20px"
          },
        }}
        variant="persistent"
        anchor="right"
        open={props.showForm}
      >
        {props.showForm && (
          <>
           
            <MlCreatePdfForm
              additionalFields={
                <>
                  <TextField
                    name="title"
                    id="optional-title"
                    label="Agregar un título"
                    variant="outlined"
                    sx={{
                      paddingBottom: "15px",
                      marginRight: "15px",
                      width: "100%",
                    }}
                  />
                  <TextField
                    name="description"
                    id="optional-comment"
                    label="Agregar descripción"
                    variant="outlined"
                    multiline
                    sx={{ width: "100%" }}
                  />
                </>
              }
              onCreatePdf={(options) => {
                const pdf = options.pdf;
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const isLandscape = pageWidth > pageHeight;
                const title = options.formData.get("title") as string;
                const text = options.formData.get("description") as string;
                const centerY = pageWidth / 2;
                const fontSizes = {
                  a4: {
                    width: 210,
                    textSize: 10,
                    textOffset: 16,
                    titleSize: 18,
                    titleOffset: 6,
                    boxWidth: isLandscape ? 297 : 210,
                    lineH: 3.75,
                    divider: 1,
                  },
                  a3: {
                    width: 297,
                    textSize: 12,
                    textOffset: 18,
                    titleSize: 28,
                    titleOffset: 9,
                    boxWidth: isLandscape ? 420 : 297,
                    lineH: 4.75,
                    divider: 0.8,
                  },
                  a2: {
                    width: 420,
                    textSize: 15,
                    textOffset: 22,
                    titleSize: 38,
                    titleOffset: 12,
                    boxWidth: isLandscape ? 594 : 420,
                    lineH: 5.75,
                    divider: 0.7,
                  },
                  a1: {
                    width: 594,
                    textSize: 20,
                    textOffset: 26,
                    titleSize: 48,
                    titleOffset: 15,
                    boxWidth: isLandscape ? 4841 : 594,
                    lineH: 6.75,
                    divider: 0.6,
                  },
                  a0: {
                    width: 841,
                    textSize: 26,
                    textOffset: 30,
                    titleSize: 58,
                    titleOffset: 18,
                    boxWidth: isLandscape ? 1189 : 841,
                    lineH: 7.75,
                    divider: 0.6,
                  },
                };

                const infoBoxWidth = fontSizes[options.format].boxWidth;
                const offsetY = 4.5;
                const linkOffsetY = 6;
                const marginTop = 3;
                const innerMargin = 2;
                const logo = logoToBase64();
                const lineHeight = fontSizes[options.format].lineH;
                const logoHeight = -4.5;
                const textChunksSeperator = text.split(",");
                const textChunks: string[] = [];

                textChunksSeperator.forEach((chunk: string) => {
                  const limitChunks: RegExpMatchArray | null =
                    chunk.match(/.{1,34}/g);
                  console.log("Limit Chunks:", limitChunks);
                  if (limitChunks) {
                    textChunks.push(...limitChunks);
                  }
                });

                const titleHeight =
                  lineHeight +
                  fontSizes[options.format].titleSize +
                  innerMargin;
                const descriptionHeight =
                  textChunks.length * lineHeight * (isLandscape ? 0.2 : 0.255);
                const totalHeight =
                  (titleHeight + descriptionHeight + innerMargin) *
                  fontSizes[options.format].divider;

                //Render infobox
                pdf.setFillColor("white");
                pdf.rect(0, 0.5, infoBoxWidth, totalHeight, "F");

                // Ad Wheregroup link
                pdf.setFontSize(10);
                pdf.text("puntalagro.com", 10, linkOffsetY + marginTop);

                //Add WG Logo
                pdf.addImage(
                  logo,
                  "png",
                  3,
                  offsetY + logoHeight + innerMargin * 2,
                  6,
                  6,
                  undefined,
                  "FAST"
                );

                //Add Title
                pdf.setFontSize(fontSizes[options.format].titleSize);
                const titleWidth =
                  (pdf.getStringUnitWidth(title) * pdf.getFontSize()) /
                  pdf.internal.scaleFactor;
                pdf.internal.scaleFactor;
                const titleX = isLandscape
                  ? centerY - titleWidth / 2
                  : (pageWidth - titleWidth) / 2;
                pdf.text(title, titleX, fontSizes[options.format].titleOffset);

                //Add Description
                pdf.setFontSize(fontSizes[options.format].textSize);
                const maxWidth = infoBoxWidth * 0.8;
                const lines = pdf.splitTextToSize(text, maxWidth);
                const startY = fontSizes[options.format].textOffset;
                lines.forEach((line: string, index: number) => {
                  const lineWidth =
                    (pdf.getStringUnitWidth(line) * pdf.getFontSize()) /
                    pdf.internal.scaleFactor;
                  const xValueToUse = isLandscape
                    ? centerY - lineWidth / 2
                    : (pageWidth - lineWidth) / 2;
                  const y = startY + index * lineHeight;
                  pdf.text(line, xValueToUse, y);               
                });

                //Set pdfs props
                pdf.setProperties({
                  title: "Map export",
                  subject: "Map export",
                  creator: "WhereGroup GmbH",
                  author: "(c)WhereGroup GmbH, (c)OpenStreetMap",
                });
                return options;
              }}
            />
          </>
        )}
      </Drawer>
    </>
  );
}
