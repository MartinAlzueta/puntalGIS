import { MlCreatePdfForm } from "@mapcomponents/react-maplibre";
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

					if (textChunks.length) {
						textChunksSeperator.forEach((chunk: string) => {
							const limitChunks: RegExpMatchArray | null = chunk.match(/.{1,34}/g);
							if (limitChunks) {
								textChunks.push(...limitChunks);
							}
						});
					}
					//Render infobox
					pdf.setFillColor('white');
					const infoBoxSize =
						textChunks.length * lineHeight +
						marginTop +
						marginBottom +
						lineHeight * 2 +
						innerMargin * 2 +
						textBuffer;

					pdf.rect(offsetX, 2, 66.5, infoBoxSize, 'F');

					pdf.setFontSize(10);
					pdf.text(props.titulo?? "Mapa:", 6, offsetY + marginTop);

					//Render inner infobox
					pdf.rect(6, 7, 60, textChunks.length * lineHeight + innerMargin * 2 + textBuffer);
					pdf.setFontSize(10);


					//Write out address
					textChunks.forEach((text, i) => {
						pdf.text(text.trim(), 8, 10 + i * 3.5 + innerMargin);
					});

					//Add Logo
					pdf.addImage(
						logo,
						'png',
						4,
						//offsetY + marginTop + lineHeight * 2 + textChunks.length * 3 + innerMargin * 2,
                       12,
						8,
						8,
						undefined,
						'FAST'
					);

					//Add Url
					pdf.setFontSize(10);
					pdf.text(
						'puntalagro.com',
						40,
						offsetY +
							marginTop +
							lineHeight * 2 +
							textChunks.length * lineHeight +
							innerMargin * 2 +
							textBuffer
					);

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
  

    </>)
}