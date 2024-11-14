import { MlCreatePdfForm } from "@mapcomponents/react-maplibre";
<<<<<<< HEAD
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
  { id: "orientation-radio-buttons-group-label", originalText: "Orientation", newText: "Orientación" },
  {
    id: "orientation-landscape",
    originalText: "Landscape",
    newText: "Horizontal",
  },
  { id: "create-pdf-button", originalText: "CREATE PDF", newText: "crear PDF" },
];

export default function ExportPDF(props: exportPDFProps) {
=======
import { IconButton, Typography, Modal, Button, Box } from '@mui/material';
import { logoToBase64 } from "./logo";
import { useState } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Stack from '@mui/material/Stack';

export interface exportPDFProps{
titulo?: string,
showForm: boolean
}


export default function ExportPDF(props: exportPDFProps){
	const [orientation, setOrientation] = useState("portrait");
	const [pageSize, setPageSize] = useState("A4");
	  const [isModalOpen, setOpen] = useState(false);

	function toggleModal(){
		var modal_opened = isModalOpen;
		let div_seleccion_mapa = document.querySelector('.moveable-control-box');
		if (div_seleccion_mapa) {
		  div_seleccion_mapa.style.display = isModalOpen ? 'none' : 'block';
		  div_seleccion_mapa.style.visibility = isModalOpen ? 'hidden' : 'visible';
		}		
		setOpen(!modal_opened);					
	}

	const handleClick = () => {
		var hiddenButton = Array.from(document.querySelectorAll('#divPDF button'));
		if (Array.isArray(hiddenButton) && hiddenButton.length <= 0) {
			return;
		}
		if (Array.isArray(hiddenButton) && hiddenButton.length > 0) {
			hiddenButton = hiddenButton[0];
		  }
		if (hiddenButton) {
		  hiddenButton.click();
		}
	};

    return(<>{<Modal
        open={isModalOpen}
        onClose={toggleModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Opciones de Impresión
          </Typography>
          <Box sx={{ mt: 2 }}>
  <Stack spacing={1}>

        <label>
          Orientación:
          <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
            <option value="portrait">Vertical</option>
            <option value="landscape">Horizontal</option>
          </select>
        </label>
        <br />
        <label>
          Tamaño de página:
          <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
            <option value="A4">A4</option>
            <option value="A5">A5</option>
            <option value="Letter">Carta</option>
          </select>
        </label>
		</Stack>
          </Box>
		  <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
  <Button
    onClick={() => {
      toggleModal();
      handleClick();
    }}
    variant="contained"
    color="primary"
  >
    Imprimir
  </Button>
  
  <Button
    onClick={toggleModal}
    variant="contained"
    color="primary"
  >
    Cerrar
  </Button>
</Stack>
        </Box>
      </Modal>}
	  {/*props.showForm &&*/ <IconButton
        onClick={toggleModal}
        sx={{
          backgroundColor: '#ff985d',
          color: 'white',
          width: 40,
          height: 40,
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: '#e57d48',
          }
        }}
      >
        <PictureAsPdfIcon />
      </IconButton> },
 { /* si no carga el boton de divPDF, poner una coma despues de la llave o algo así y ahi aparece. 
 ver porque!! */}
   {/*props.showForm &&  */
   
	<div id="divPDF" style={{ display: 'none' }}>
   <MlCreatePdfForm
				onCreatePdf={(options) => {
                    
					const pdf = options.pdf;

					const offsetX = 2.5;
					const offsetY = 2.5;
					const marginTop = 3;
					const marginBottom = 3;
					const innerMargin = 2;
					const logo = logoToBase64();
                    const textBuffer = 1;
					const lineHeight = 3.25;
					const text = '';
					const textChunksSeperator = text.split(',');
					const textChunks: string[] = [];
>>>>>>> 41cbaed3712e0c28fcd9ebb1e433327188d3b96e

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
          width: 400,
          maxWidth: "50%",
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: 400,
            height: "auto",
            backgroundColor: "#ffff",          
            marginTop: "60px",
            right: "50px",
            padding: "20px"
          },

          "& #orientation-radio-buttons-group-label": {
            color: "grey"
          }
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
                    rows={4}
 
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
                //  console.log("Limit Chunks:", limitChunks);
                  if (limitChunks) {
                    textChunks.push(...limitChunks);
                  }
                });

<<<<<<< HEAD
                const titleHeight =
                  lineHeight +
                  fontSizes[options.format].titleSize +
                  innerMargin;
                const descriptionHeight =
                  textChunks.length * lineHeight * (isLandscape ? 0.2 : 0.255);
                const totalHeight =
                  (titleHeight + descriptionHeight + innerMargin) *
                  fontSizes[options.format].divider;
=======
					//Set pdfs props
					pdf.setProperties({
						title: props.titulo?? "Mapa",
						subject: props.titulo?? "Mapa",
						creator: 'Puntal Agro'
					//	orientation: orientation, 
      					//pageSize: pageSize, 
					//	  format: pageSize, 							
					});
				//	pdf.setPageSize(pageSize, orientation);  // Aplica el tamaño de página
    //pdf.setOrientation(orientation);         // Aplica la orientación de la página
             //       console.log('pdf',pdf);
                    return options;
				}}
			/>  </div>	}
  
>>>>>>> 41cbaed3712e0c28fcd9ebb1e433327188d3b96e

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
